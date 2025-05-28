# Boilerplate 
version 1.13

* nestjs
* typeorm
* nestjs-pino
* dayjs
* nestjs-prometheus
* @golevelup/nestjs-rabbitmq


## *TODO*
* Check for eslint using
* Add "@typescript-eslint/no-floating-promises": "error" to eslint
* Improve Dockerfile


## Changes

### Versions 1.13
* Add npm packages: axios-retry
* Add ListItems interface
* Add boilerplate/utils/sleep
* Fix build - ignore the "scrips" folder
* Remove the 'test' tag from Swagger (global)
* Optimization logging - set logging to trace for /health and /metrics handle
* fix misspelling in "boilerplate" folder
* update logging datetime format
* update npm packages
* Add axiosWithRetryHelper
* Add alias @boilerplate
* Add @boilerplate/app for Application consts and dto
* Improve messaging module

### Version 1.12
* Remove rabbitmq provisioning and enums
 
### Version 1.11
* Add Prometheus metrics support
