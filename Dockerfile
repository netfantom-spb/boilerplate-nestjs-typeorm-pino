# Builder
FROM node:20-alpine3.18 AS Builder
RUN npm -g update npm
WORKDIR /build/backend
COPY ["./package.json", "./package-lock.json", "./tsconfig.json", "./tsconfig.build.json", "./"]
RUN npm i
COPY ./src ./src 
RUN npm run build

# Service
FROM node:20-alpine3.18
RUN apk update ; \
    apk upgrade ; \
    apk add tzdata bash; \
    cp /usr/share/zoneinfo/Europe/Moscow /etc/localtime
RUN npm -g update npm
RUN apk add openvpn iptables
WORKDIR /app
COPY ["wait-for-it.sh", "./"]
RUN chmod a+x "wait-for-it.sh"
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm i --production --silent
COPY --from=Builder /build/backend/dist ./
# CMD ["node", "./main.js"]
CMD [ "sh", "-c", "if [ -f /openvpn/client.ovpn ]; then openvpn --config /openvpn/client.ovpn --daemon > /app/logs/openvpn.log 2>&1; fi && iptables -A INPUT -i tun0 -j ACCEPT &&./wait-for-it.sh postgres:5432 -- node main.js" ]
EXPOSE 3000
