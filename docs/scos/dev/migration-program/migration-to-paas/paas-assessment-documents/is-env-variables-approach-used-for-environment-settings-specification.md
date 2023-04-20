---
title: Is ENV variables approach used for environment settings specification?
description: This document allows you to assess if ENV variables approach is used for environment settings specification.
template: howto-guide-template
---

# Is ENV variables approach used for environment settings specification?

{% info_block infoBox %}

Resources: Backend, DevOps

{% endinfo_block %}

## Description

It should be checked in the `config/Shared/config_{service-name}-{environment-name}.php` files. In order to search for
env variables usage in the config files, go through `config_{service-name}-{environment-name}.php` files and check if
custom environment variables are used for sensitive configurations such as 3rd party integration tokens, encryption keys, etc.

Env variables usage example:
```php
$config[ServiceApiConstants::BASE_URL] = env('SERVICE_API_BASE_URL');
$config[ServiceApiConstants::API_KEY] = env('SERVICE_API_KEY');
$config[ServiceApiConstants::API_SECRET] = env('SERVICE_API_SECRET');
```

By default, the `env()` function is used to get the environment variable value, but it is also possible that a custom
function might be used for this purpose. The main idea is to have all sensitive values in the environment variables.

## Formula

1. If the ENV variables approach is used in the project then we need to create variables with values on `Spryker Cloud`
    for all the environments such as production, staging, testing, etc. Approximately 4h per environment.
2. If If the ENV variables approach is not used then it must be implemented and effort should be estimated depending on
   existing implementation, the number of configuration values that need to be reworked, etc. Approximately 10 minutes per config item.
