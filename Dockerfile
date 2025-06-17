# Builder
FROM node:20-alpine3.22 AS builder
RUN apk update && \
    apk upgrade && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/Europe/Moscow /etc/localtime
RUN npm -g update npm
WORKDIR /build/backend
COPY ["./package.json", "./package-lock.json", "./tsconfig.json", "./tsconfig.build.json", "./nest-cli.json", "./"]
RUN npm ci
COPY ./src ./src
COPY ./scripts ./scripts
RUN npm run build

# Service
FROM node:20-alpine3.22
ARG DOCKER_USER
ARG DOCKER_GROUP
ARG DOCKER_USERNAME
ARG DOCKER_GROUPNAME
# prerare os
RUN apk update && \
    apk upgrade && \
    apk add tzdata bash && \
    cp /usr/share/zoneinfo/Europe/Moscow /etc/localtime
RUN npm -g update npm
RUN apk add sudo
RUN deluser --remove-home node && \
    addgroup --gid ${DOCKER_GROUP} ${DOCKER_GROUPNAME} && \
    adduser --uid ${DOCKER_USER} -G ${DOCKER_GROUPNAME} -H --disabled-password --gecos "" ${DOCKER_USERNAME} && \
    echo "${DOCKER_USERNAME} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${DOCKER_USERNAME} &&\
    chmod 0440 /etc/sudoers.d/${DOCKER_USERNAME}
# install and configure logrotate
RUN apk add logrotate
COPY ./app.logrotate /etc/logrotate.d/app.logrotate
RUN ln -s /etc/periodic/daily/logrotate /etc/periodic/hourly/logrotate
RUN ln -s /etc/periodic/daily/logrotate /etc/periodic/15min/logrotate
# install and configure App
WORKDIR /app
COPY --chown=${DOCKER_USERNAME}:${DOCKER_GROUPNAME} --chmod=711 ["wait-for-it.sh", "./"]
COPY --chown=${DOCKER_USERNAME}:${DOCKER_GROUPNAME} ["./package.json", "./package-lock.json", "./"]
RUN npm ci --omit=dev --silent
COPY --chown=${DOCKER_USERNAME}:${DOCKER_GROUPNAME} --from=builder /build/backend/dist ./
# Start services
USER ${DOCKER_USER}:${DOCKER_GROUP}
CMD [ "sh", "-c", "sudo crond -L /tmp/crond.log -l 0 -b ; ./wait-for-it.sh ${PG_HOST}:${PG_PORT} -- node main.js" ]
EXPOSE 3000
