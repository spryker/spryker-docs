---
title: Is ENV variables approach used for environment settings specification?
description: This document allows you to assess if ENV variables approach is used for environment settings specification.
template: howto-guide-template
---

Go through `config/Shared/config_{service-name}-{environment-name}.php` files and check if custom environment variables are used for sensitive configuration, like third-party integration tokens or encryption keys.

Example of env variables:

```php
$config[ServiceApiConstants::BASE_URL] = env('SERVICE_API_BASE_URL');
$config[ServiceApiConstants::API_KEY] = env('SERVICE_API_KEY');
$config[ServiceApiConstants::API_SECRET] = env('SERVICE_API_SECRET');
```

By default, the `env()` function is used to get the environment variable value, but a custom
function may be used for this purpose too.

Environment variables should be created in the cloud environments by a Spryker Cloud engineer. To request environment variables creation you should create a ticket in [SalesForce portal](http://support.spryker.com) to the Operation team.

## Resources for assessment

* Backend
* DevOps

## Formula for calculating the migration effort

1. If sensitive information is defined as env variables, respective variables with values need to be defined in the cloud environments. Approximately 4h per environment.

2. If sensitive information is defined using another approach, estimate the additional effort based on the current approach and the number of configuration values that need to be reworked. Approximately 10m per configuration item.
