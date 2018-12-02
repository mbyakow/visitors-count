# Visits counter

[![CircleCI](https://circleci.com/gh/mbyakow/visits-counter/tree/master.svg?style=svg)](https://circleci.com/gh/mbyakow/visits-counter)

_NodeJS application, which shows the number of pageviews for the past 1 minute_.

[![image](https://api.monosnap.com/rpc/file/download?id=zwDLIreh8wdvmVwWaVIbI0G0TI5LSk)](http://35.187.126.169)

## Installation

1. Install [Node](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com).
1. Run `npm install`.
1. Create `.env` and put your settings for environment and database. 
1. Run `npm start`.

_(Alternatively) You can use [Docker](https://www.docker.com) to launch application. Use `docker-compose build` and `docker-compose up`. Application would be available on IP which you can find through `docker-machine env` command, for example, [192.168.99.100:8000](http://192.168.99.100:8000)._

## Configuration

Most important application options can be configured through environment variables. In root directory you can find `.env.example` file, which contains a list of available variables &mdash; use this as a template for your `.env`.

Application will choose set of variables depending on `NODE_ENV`. This variable have 2 available values &mdash; `dev` and `production`:
   * `dev` &mdash; set of variables with `DEV_` prefix would be used;
   * `production` &mdash; set of variables with `PROD_` prefix would be used.
   
##### Available variables
   
1. `APP_PORT` &mdash; port to access application. Default: `8000`.
1. `DB_URL` &mdash; database connection string.
1. `DB_NAME` &mdash; database name.
1. `COUNT_ONLY_UNIQUE` &mdash; flag to count only unique visits. Available values: `true` or `false`. Default: `false`. 
1. `SHOW_FOR_PERIOD` &mdash; A period to count visits, in minutes. Default: `1`.

## Contributing

1. Make fork of the project, checkout it to your local environment.
1. Make changes.
1. Push changes to your branch.
1. [Create pull request](https://github.com/mbyakow/visitors-count/compare?expand=1).



