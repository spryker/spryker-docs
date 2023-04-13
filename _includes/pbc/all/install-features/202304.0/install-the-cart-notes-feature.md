

{% info_block errorBox %}

This feature integration guide expects the basic feature to be in place.
The current feature integration guide adds the following functionalities:
* Translation TODO:

{% endinfo_block %}

## Prerequisites

Ensure that the related features are installed:

| NAME             | VERSION          | INTEGRATE GUIDE                                                                                                                              |
|------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Order Management | {{page.version}} | [Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-order-management-feature.html) |

## 1) Install the required modules using Composer

1. Install the required modules:

```bash
composer require spryker/cart-notes-backend-api:^1.0 --update-with-dependencies
```

Ensure that the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                      |
|-----------------------|-----------------------------------------|
| CartNotesBackendApi   | vendor/spryker/cart-notes-backend-api   |

## 2) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER             | TYPE  | EVENT   | PATH                                              |
|----------------------|-------|---------|---------------------------------------------------|
| ApiOrdersAttributes  | class | created | src/Generated/Shared/Transfer/ApiOrdersAttributes |

## 4) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                   | SPECIFICATION                                                          | PREREQUISITES | NAMESPACE                                                     |
|------------------------------------------|------------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| CartNoteApiOrdersAttributesMapperPlugin  | Expands `ApiOrdersAttributes.cartNote` with `Order.cartNote` property. |               | Spryker\Glue\CartNotesBackendApi\Plugin\SalesOrdersBackendApi |

**src/Pyz/Glue/SalesOrdersBackendApi/SalesOrdersBackendApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\SalesOrdersBackendApi;

use Spryker\Glue\CartNotesBackendApi\Plugin\SalesOrdersBackendApi\CartNoteApiOrdersAttributesMapperPlugin;
use Spryker\Glue\SalesOrdersBackendApi\SalesOrdersBackendApiDependencyProvider as SprykerSalesOrdersBackendApiDependencyProvider;

class SalesOrdersBackendApiDependencyProvider extends SprykerSalesOrdersBackendApiDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\SalesOrdersBackendApiExtension\Dependency\Plugin\ApiOrdersAttributesMapperPluginInterface>
     */
    protected function getApiOrdersAttributesMapperPlugins(): array
    {
        return [
            new CartNoteApiOrdersAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
TODO?
{% endinfo_block %}