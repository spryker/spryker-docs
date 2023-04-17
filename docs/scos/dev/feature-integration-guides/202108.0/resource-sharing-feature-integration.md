---
title: Resource Sharing feature integration
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/resource-sharing-feature-integration
originalArticleId: 59623dc6-5c8d-432d-8746-aa4d9ef3ede3
redirect_from:
  - /2021080/docs/resource-sharing-feature-integration
  - /2021080/docs/en/resource-sharing-feature-integration
  - /docs/resource-sharing-feature-integration
  - /docs/en/resource-sharing-feature-integration
---

## Install feature core

### Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/resource-sharing: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ResourceShare | vendor/spryker/resource-share |
| ResourceShareExtension | vendor/spryker/resource-share-extension |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_resource_share | table | created |

{% endinfo_block %}

{% info_block warningBox “Verification” %}

Make sure that the following changes in transfer objects have been applied:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| SpyResourceShareEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyResourceShareEntityTransfer |
| ResourceShare | class | created | src/Generated/Shared/Transfer/ResourceShareTransfer |
| ResourceShareData | class | created | src/Generated/Shared/Transfer/ResourceShareDataTransfer |
| ResourceShareRequest | class | created | src/Generated/Shared/Transfer/ResourceShareRequestTransfer |
| ResourceShareResponse | class | created | src/Generated/Shared/Transfer/ResourceShareResponseTransfer |

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/resource-sharing: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ResourceSharePage | vendor/spryker-shop/resource-share-page |
| ResourceSharePageExtension | vendor/spryker-shop/resource-share-page-extension |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
resource_share.activator.error.strategy_expects_logged_in_customer,Please login to access requested shared resource.,en_US
resource_share.activator.error.strategy_expects_logged_in_customer,"Bitte anmelden, um Zugand zu der angeforderten Ressource zu erhalten.",de_DE
resource_share.reader.error.resource_is_not_found_by_provided_uuid,Resource is not found by provided UUID.,en_US
resource_share.reader.error.resource_is_not_found_by_provided_uuid,Resource wurde nicht bei dem angegebenen UUID gefunden.,de_DE
resource_share.generation.error.resource_type_is_not_defined,Resource type is not defined.,en_US
resource_share.generation.error.resource_type_is_not_defined,Ressourcentyp wurde nicht definiert.,de_DE
resource_share.generation.error.customer_reference_is_not_defined,Customer reference is not defined.,en_US
resource_share.generation.error.customer_reference_is_not_defined,Kundenreferenz wurde nicht definiert.,de_DE
resource_share.validation.error.resource_share_is_expired,Resource share is expired.,en_US
resource_share.validation.error.resource_share_is_expired,Ressourcenteilung ist abgelaufen.,de_DE
resource-share.link.error.no-route,Redirect route should not be empty.,en_US
resource-share.link.error.no-route,Redirect Route kann nicht leer sein.,de_DE
```

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

#### Route list

Register the following route provider plugins:

| PROVIDER | NAMESPACE |
| --- | --- |
| ResourceSharePageRouteProviderPlugin | SprykerShop\Yves\ResourceSharePage\Plugin\Router |


**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\ResourceSharePage\Plugin\Router\ResourceSharePageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new ResourceSharePageRouteProviderPlugin(),
        ];
    }
}
```

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Go to `http://mysprykershop.com/resource-share/link/uuid` and make sure you see a non-existing resource error message displayed.

{% endinfo_block %}
