This document describes how to install the Company Account + Merchant B2B Contracts feature.

## Install feature core

Follow the steps below to install the Company Account + Merchant B2B Contracts feature.

## Prerequisites

To start feature integration, integrate the required features:

| NAME                   | VERSION          | INSTALLATION GUIDE                                                                                                                                                                             |
|------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Company Account        | {{page.version}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Merchant B2B Contracts | {{page.version}} | [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-feature.html)                 |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                               | SPECIFICATION                                                                         | PREREQUISITES | NAMESPACE                                                                |
|------------------------------------------------------|---------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------|
| CompanyUnitAddressMerchantRelationshipExpanderPlugin | Expands `MerchantRelationshipTransfer` with assignee company business unit addresses. |               | Spryker\Zed\CompanyUnitAddress\Communication\Plugin\MerchantRelationship |

**src/Pyz/Zed/MerchantRelationship/MerchantRelationshipDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationship;

use Spryker\Zed\CompanyUnitAddress\Communication\Plugin\MerchantRelationship\CompanyUnitAddressMerchantRelationshipExpanderPlugin;
use Spryker\Zed\MerchantRelationship\MerchantRelationshipDependencyProvider as SprykerMerchantRelationshipDependencyProvider;

class MerchantRelationshipDependencyProvider extends SprykerMerchantRelationshipDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantRelationshipExtension\Dependency\Plugin\MerchantRelationshipExpanderPluginInterface>
     */
    protected function getMerchantRelationshipExpanderPlugins(): array
    {
        return [
            new CompanyUnitAddressMerchantRelationshipExpanderPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

**Merchant Portal**

* Log in to the Merchant Portal.
* Go to **B2B Contracts** > **Merchant Relations** and select any merchant relation.
* Make sure that in **Company Details** section you can see Business Units with their names and addresses.

{% endinfo_block %}

