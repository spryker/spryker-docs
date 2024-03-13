This document describes how to install the Company Account + Merchant B2B Contract Requests feature.

## Install feature core

Follow the steps below to install the Company Account + Merchant B2B Contract Requests feature.

## Prerequisites

To start feature integration, integrate the required features:

| NAME                           | VERSION          | INSTALLATION GUIDE                                                                                                                                                                             |
|--------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Company Account                | {{page.version}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Merchant B2B Contract Requests | {{page.version}} | [Install the Merchant B2B Contract Requests feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contract-requests-feature.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                  | SPECIFICATION                                                                                      | PREREQUISITES | NAMESPACE                                                                   |
|-------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------|
| AssigneeCompanyBusinessUnitAddressMerchantRelationRequestExpanderPlugin | Expands `MerchantRelationRequestCollectionTransfer` with assignee company business unit addresses. |               | Spryker\Zed\CompanyUnitAddress\Communication\Plugin\MerchantRelationRequest |

**src/Pyz/Zed/MerchantRelationRequest/MerchantRelationRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationRequest;

use Spryker\Zed\CompanyUnitAddress\Communication\Plugin\MerchantRelationRequest\AssigneeCompanyBusinessUnitAddressMerchantRelationRequestExpanderPlugin;
use Spryker\Zed\MerchantRelationRequest\MerchantRelationRequestDependencyProvider as SprykerMerchantRelationRequestDependencyProvider;

class MerchantRelationRequestDependencyProvider extends SprykerMerchantRelationRequestDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantRelationRequestExtension\Dependency\Plugin\MerchantRelationRequestExpanderPluginInterface>
     */
    protected function getMerchantRelationRequestExpanderPlugins(): array
    {
        return [
            new AssigneeCompanyBusinessUnitAddressMerchantRelationRequestExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

**Merchant Portal**

* Log in to the Merchant Portal.
* Go to **B2B Contracts** > **Merchant Relation Requests** and select any merchant relation request.
* Make sure that in **Company Details** section you can see Business Units with their names and addresses.

{% endinfo_block %}

