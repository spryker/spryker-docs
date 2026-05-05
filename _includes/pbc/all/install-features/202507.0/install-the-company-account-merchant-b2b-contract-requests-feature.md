This document describes how to install the Company Account + Merchant B2B Contract Requests feature.

## Prerequisites

Install the required features:

| NAME                           | VERSION          | INSTALLATION GUIDE                                                                                                                                                                             |
|--------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Company Account                | 202507.0 | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Merchant B2B Contract Requests | 202507.0 | [Install the Merchant B2B Contract Requests feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-b2b-contract-requests-feature.html) |

## 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                  | SPECIFICATION                                                                                      | PREREQUISITES | NAMESPACE                                                                   |
|-------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------|
| AssigneeCompanyBusinessUnitAddressMerchantRelationRequestExpanderPlugin | Expands `MerchantRelationRequestCollectionTransfer` with an assignee company business unit addresses. |               | Spryker\Zed\CompanyUnitAddress\Communication\Plugin\MerchantRelationRequest |

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


1. In the Merchant Portal, go to **B2B Contracts** > **Merchant Relation Requests**.
2. Select a merchant relation request.
  Make sure that, in the **Company Details** section, business units with their names and addresses are displayed.

{% endinfo_block %}
