---
title: Resource Sharing Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/resource-sharing-feature-integration
redirect_from:
  - /v4/docs/resource-sharing-feature-integration
  - /v4/docs/en/resource-sharing-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/resource-sharing: "^201907.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
Make sure that the following modules were installed:
    
| Module | Expected Directory |
| --- | --- |
| `ResourceShare` | `vendor/spryker/resource-share` |
| `ResourceShareExtension` | `vendor/spryker/resource-share-extension` |

</div></section>

### 2) Set up Database Schema and Transfer Objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
Make sure that the following changes applied by checking your database:
    
| Database Entity | Type | Event |
| --- | --- | --- |
| `spy_resource_share` | table | created |

 </div></section>
 
<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
Make sure that the following changes in transfer objects have been applied:
    
| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `SpyResourceShareEntityTransfer` | class | created | `src/Generated/Shared/Transfer/SpyResourceShareEntityTransfer` |
| `ResourceShare` | class | created | `src/Generated/Shared/Transfer/ResourceShareTransfer` |
| `ResourceShareData` | class | created | `src/Generated/Shared/Transfer/ResourceShareDataTransfer` |
| `ResourceShareRequest` | class | created | `src/Generated/Shared/Transfer/ResourceShareRequestTransfer` |
| `ResourceShareResponse` | class | created | `src/Generated/Shared/Transfer/ResourceShareResponseTransfer` |

</div></section>
 
## Install Feature Frontend
### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/resource-sharing: "^201907.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
Make sure that the following modules were installed:
    
| Module | Expected Directory |
| --- | --- |
| `ResourceSharePage` | `vendor/spryker-shop/resource-share-page` |
| `ResourceSharePageExtension` | `vendor/spryker-shop/resource-share-page-extension` |

</div></section>

### 2) Add Translations
Append glossary according to your configuration:

src/data/import/glossary.csv

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

### 3) Enable Controllers
#### Controller Provider List
Register controller provider(s) to Yves application:

| Provider | Namespace |Enabled Controller | Controller Specification |
| --- | --- | --- | --- |
| `ResourceSharePageControllerProvider` | `SprykerShop\Yves\ResourceSharePage\Plugin\Provider` | `ResourceSharePageController` | Provides a starting point for all resource share links. |

src/Pyz/Yves/ShopApplication/YvesBootstrap.php

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\ResourceSharePage\Plugin\Provider\ResourceSharePageControllerProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
 
class YvesBootstrap extends SprykerYvesBootstrap
{
    /**
     * @param bool|null $isSsl
     *
     * @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
     */
    protected function getControllerProviderStack($isSsl)
    {
        return [
            new ResourceSharePageControllerProvider($isSsl),
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
