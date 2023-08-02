---
title: Is ENV variables approach used for environment settings specification?
description: This document allows you to assess if ENV variables approach is used for environment settings specification.
template: howto-guide-template
---

In this step, you need to check if custom env variables are used for sensitive configuration, like third-party integration tokens or encryption keys. Defining env variables using the `env()` function is the default approach that doesn't require additional migration effort. 

## Resources for assessment

* Backend
* DevOps

## Check how variables are defined

Go through `config/Shared/config_{SERVICE_NAME}-{ENVIRONMENT_NAME}.php` files and check how variables are defined.

Example of env variables that *don't* require additional migration effor:

```php
$config[ServiceApiConstants::BASE_URL] = env('SERVICE_API_BASE_URL');
$config[ServiceApiConstants::API_KEY] = env('SERVICE_API_KEY');
$config[ServiceApiConstants::API_SECRET] = env('SERVICE_API_SECRET');
```

Environment variables should be created in the cloud environments by a Spryker Cloud engineer. To request environment variables creation you should create a ticket in [SalesForce portal](http://support.spryker.com) to the Operation team.



## Formula for calculating the migration effort

1. If sensitive information is defined as env variables using the `env()` function, respective variables with values need to be defined in the cloud environments. Approximately 4h per environment.

2. If sensitive information is defined using another approach, estimate the additional effort based on the current approach and the number of configuration values that need to be reworked. Approximately 10m per configuration it
