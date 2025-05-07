# Boilerplate 
version 1.13-pre

* nestjs
* typeorm
* nestjs-pino
* dayjs
* nestjs-promethe



## Changes

### Versions 1.13
* Add ListItems interface
* Add boilerplate/utils/sleep
* Fix build - ignore the "scrips" folder
* Remove the 'test' tag from Swagger (global)
* Optimization logging - set logging to trace for /health and /metrics handle
* fix misspelling in "boilerplate" folder
* update logging datetime format
* update npm packages

*TODO*
* Check for eslint using
* Add "@typescript-eslint/no-floating-promises": "error" to eslint
* Extract app env variables to app folder
* Improve Dockerfile

### Version 1.12
* Remove rabbitmq provisioning and enums
 
### Version 1.11
* Add Prometheus metrics support
