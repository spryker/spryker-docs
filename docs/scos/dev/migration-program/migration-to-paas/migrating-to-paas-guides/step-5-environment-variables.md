---
title: 'Step 5: Environment variables'
description: 
template: howto-guide-template
---

## Environment specific configurations

Spryker uses `config/Shared/config_*.php` files to configure application for specific environments and stores. Inside of those config files we use `env()` function to get specific value, for example:
```php
$config[ServiceApiConstants::BASE_URL] = env('SERVICE_API_BASE_URL');
$config[ServiceApiConstants::API_KEY] = env('SERVICE_API_KEY');
$config[ServiceApiConstants::API_SECRET] = env('SERVICE_API_SECRET');
```
Therefore an application should follow the same configuration approach.
