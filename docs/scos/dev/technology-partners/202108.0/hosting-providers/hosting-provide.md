---
title: Hosting Provider - Heroku
originalLink: https://documentation.spryker.com/2021080/docs/hosting-provider-continum-1
redirect_from:
  - /2021080/docs/hosting-provider-continum-1
  - /2021080/docs/en/hosting-provider-continum-1
---

This article describes the aspects you need to consider when using Heroku as an application hosting solution.

In the scenario described below, 3 applications will be sharing the Redis, Elasticsearch and database add-ons between them.

* Preconditions
* Applications
* Heroku Configuration Variables
* Configuration
* Build & Composer
* Setup shop with data

## Preconditions

In order to work closely with Heroku, make sure to [install heroku console](https://devcenter.heroku.com/articles/heroku-cli).

## Applications

In our example, Redis and Elasticsearch add-ons are attached to Yves (front-end application), while the database add-on is attached to Zed (back-end application).<br>
Please make sure to install proper version of ES and Redis, refer to [installation guide](http://documentation.spryker.com/installation/installation-guide-b2c.htm).<br>
Install required add-ons only in one application, and copy configuration string to the other one.

The application you setup will be sharing the add-ons between them so you are free to set it up to your needs.

## Yves

The front-end application uses Redis and Elasticsearch as data stores.

* nginx config: `nginx_Yves.conf`
* setup script: `setup-Yves.sh`

<b>Procfile</b> web: `vendor/bin/heroku-php-nginx -l data/DE/logs/application.log -C deploy/heroku/conf/nginx_Yves.conf -F deploy/heroku/conf/fpm_custom.conf public/Yves/`

Add-ons:

Redis
    Elasticsearch

## Zed

The back-end application must connect to the SQL database, Redis and Elasticsearch data stores.

nginx config: `nginx_Zed.conf`

setup script: `setup-Zed.sh`

<b>Procfile</b>: web:`phpvendor/bin/heroku-php-nginx -l data/DE/logs/application.log -C deploy/heroku/conf/nginx_Zed.conf -F deploy/heroku/conf/fpm_custom.conf public/Zed/`

Add-ons:

* Redis (the same instance as Yves)
* Elasticsearch (the same instance as Yves)
* Database

## Data (for Development Purposes Only)

It is not recommend to populate Heroku environment with data during build/deployment.

This application populates the database, Redis and Elasticsearch data stores with test data.

nginx config: `nginx_Data.conf`

setup script: `setup-Data.sh`

<b>Procfile</b>: irrelevant, as this is only a console application

Add-ons:

* Redis (the same instance as Yves and Zed)
* Elasticsearch (the same instance as Yves and Zed)
* Database (the same instance as Zed)

## Heroku Configuration Variables

In this example we'll be using Bonsai (for Elasticsearch), RedisCloud (for Redis) and PostgreSql (for the database) add-ons.

Besides strictly Heroku related settings, there is only one variable that is different per application: `APPLICATION_NAME`.

The others settings are required and must be specified for each application even though they share the same values.

### Configuration for Yves
```php
APPLICATION_ENV="development-heroku"
APPLICATION_NAME="Yves"
APPLICATION_STORE="DE"
BONSAI_URL="http://foo:bar@cloud"
DATABASE_URL="postgres://foo:bar@cloud:5432/dbname"
ELASTIC_SEARCH_URL_NAME="BONSAI_URL"
REDISCLOUD_URL="redis://foo:bar@cloud:15250"
REDIS_URL_NAME="REDISCLOUD_URL"
YVES_HOST="spryker-yves.herokuapp.com"
YVES_HOST_PROTOCOL="https://"
ZED_HOST="spryker-zed.herokuapp.com"
ZED_HOST_PROTOCOL="https://"
```

### Configuration for Zed
```php
APPLICATION_ENV="development-heroku"
APPLICATION_NAME="Zed"
APPLICATION_STORE="DE"
BONSAI_URL="http://foo:bar@cloud"
DATABASE_URL="postgres://foo:bar@cloud:5432/dbname"
ELASTIC_SEARCH_URL_NAME="BONSAI_URL"
REDISCLOUD_URL="redis://foo:bar@cloud:15250"
REDIS_URL_NAME="REDISCLOUD_URL"
YVES_HOST="spryker-yves.herokuapp.com"
YVES_HOST_PROTOCOL="https://"
ZED_HOST="spryker-zed.herokuapp.com"
ZED_HOST_PROTOCOL="https://"
```
Configuration for Data application (development environment only):
```php
APPLICATION_ENV="development-heroku"
APPLICATION_NAME="Data"
APPLICATION_STORE="DE"
BONSAI_URL="http://foo:bar@cloud"
DATABASE_URL="postgres://foo:bar@cloud:5432/dbname"
ELASTIC_SEARCH_URL_NAME="BONSAI_URL"
REDISCLOUD_URL="redis://foo:bar@cloud:15250"
REDIS_URL_NAME="REDISCLOUD_URL"
YVES_HOST="spryker-yves.herokuapp.com"
YVES_HOST_PROTOCOL="https://"
ZED_HOST="spryker-zed.herokuapp.com"
ZED_HOST_PROTOCOL="https://"
```
`REDIS_URL_NAME` and `ELASTIC_SEARCH_URL_NAME` should point to the Heroku add-on you decided to use.

Depending on your infrastructure, you might want to configure `GITHUB_AUTH_TOKEN` and `COMPOSER_GITHUB_OAUTH_TOKEN` as well.

 You should customize `APPLICATION_ENV` and use proper staging/production environments if you intend to use Heroku as your hosting environment.

### HEROKU NGINX Configuration and Procfile

Copy `deploy/heroku/conf/Procfile` to the root folder of your project. You can customize it according to your needs.

##

The general idea is that the Heroku specific configuration is read from the environment variables, which are configured in Heroku Config variables.

Check `config_default-development-heroku.php `and `config_default-development-heroku_DE.php` under the config/Shared/ folder, for configuration examples on how to use Heroku config variables inside Spryker config.

## Build & Composer

The build process on Heroku must trigger setup script for each of the applications.

 Add this to `composer.json` to trigger setup process during Heroku deployment (assuming your configuration is stored under development-heroku* configuration files).

```php
"scripts": {
 "compile": [
 "mkdir -p ./data/DE/logs",
 "echo '<?php return \"development-heroku\";' > config/Shared/console_env_local.php",
 "./deploy/heroku/run.sh"
 ]
 }
 ```

You might need to change `minimum-stability` from `dev` to `stable`, depending on your Heroku setup.

## Heroku Build Packs

heroku/nodejs

heroku/php

[https://github.com/weibeld/heroku-buildpack-graphviz.git](https://github.com/weibeld/heroku-buildpack-graphviz.git)

## Setup Shop With Data

In order to install demoshop data on the heroku, please login to zed application:
```php
heroku run bash --app spryker-zed
```

and run:
```php
./deploy/heroku/setup-Data-manually.sh -i
```



