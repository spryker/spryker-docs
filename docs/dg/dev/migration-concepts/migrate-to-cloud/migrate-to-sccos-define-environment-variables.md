---
title: 'Migrate to SCCOS: Define environment variables'
description: To migrate to SCCOS, one of the steps, is defining the environment variables.
template: howto-guide-template
redirect_from:
- /docs/scos/dev/migration-concepts/migrate-to-sccos/step-6-define-environment-variables.html
---

Having [defined the deployment strategy](/docs/scos/dev/migration-concepts/migrate-to-sccos/step-5-define-the-deployment-strategy.html), you must define the environment variables.

Spryker uses `config/Shared/config_*.php` files to configure applications for specific environments and stores. Inside those config files, we use `env()` function to get specific values, for example:

```php
$config[ServiceApiConstants::BASE_URL] = env('SERVICE_API_BASE_URL');
$config[ServiceApiConstants::API_KEY] = env('SERVICE_API_KEY');
$config[ServiceApiConstants::API_SECRET] = env('SERVICE_API_SECRET');
```
Follow the same configuration approach to define the variables in your application.

## Next step

[Restore Elasticsearch and Redis](/docs/scos/dev/migration-concepts/migrate-to-sccos/step-7-restore-es-and-redis.html)