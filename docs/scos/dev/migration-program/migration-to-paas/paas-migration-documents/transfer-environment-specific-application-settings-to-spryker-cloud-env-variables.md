---
title: Transfer environment specific application settings to Spryker Cloud (ENV variables)
description: This document describes how to transfer environment specific application settings to Spryker Cloud.
template: howto-guide-template
---

## If the ENV variables approach is not used

Environment variables must be used for all the sensitive values such as 3rd party integration tokens, encryption keys, etc.

Examplary configuration:
```php
$config[ServiceApiConstants::BASE_URL] = 'https://api.base.url';
$config[ServiceApiConstants::API_KEY] = 'api-key-value';
$config[ServiceApiConstants::API_SECRET] = 'api-secret-value';
```
Example of updated configuration:
```php
$config[ServiceApiConstants::BASE_URL] = env('SERVICE_API_BASE_URL');
$config[ServiceApiConstants::API_KEY] = env('SERVICE_API_KEY');
$config[ServiceApiConstants::API_SECRET] = env('SERVICE_API_SECRET');
```

All the variables must be created on Spryker Cloud and all the values must be added there for all the environments
such as production, staging, sandboxes, etc.

It also might be useful to go through module configuration to be sure all the needed configurations are located in
the `config/Shared` folder.

## If the ENV variables approach is used

All the environment variables need to be created on Spryker Cloud for all the environments such as production, staging, sandboxes, etc.

### Action

In case necessity of moving sensitive data(values) to use as environment variables in runtime envs for Spryker Cloud
you need to create a SalesForce(SF) ticket on [Spryker support portal](http://support.spryker.com).
Then, follow the next instruction which clearly describe how to share your data in a secure way to add on env.

**Pre-requisite**: to create a SF ticket you have to be authorised on the support portal.

If you are a customer and do not have access to the Support Portal yet,
please use this [form](https://spryker.force.com/support/s/case-creation-form) to request access.

If you are a partner and do not have access to the Partner Portal you can request access [here](https://partners.spryker.com/s/request-access).

## Resources for migration

* Backend
* DevOps