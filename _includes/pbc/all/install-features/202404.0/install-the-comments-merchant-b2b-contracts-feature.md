This document describes how to install the Comments + Merchant B2B Contracts feature.

## Prerequisites

Install the required features:

| NAME                                | VERSION          | INSTALLATION GUIDE                                                                                                                                                             |
|-------------------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Comments                            | {{page.version}} | [Install the Comments feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-feature.html)              |
| Merchant B2B Contracts              | {{page.version}} | [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/comment-merchant-relationship-connector: "^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                               | EXPECTED DIRECTORY                                     |
|--------------------------------------|--------------------------------------------------------|
| CommentMerchantRelationshipConnector | vendor/spryker/comment-merchant-relationship-connector |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| Transfer                           | Type     | Event   | Path                                                       |
|------------------------------------|----------|---------|------------------------------------------------------------|
| MerchantRelationship.commentThread | property | created | src/Generated/Shared/Transfer/MerchantRelationshipTransfer |

{% endinfo_block %}

## 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                          | SPECIFICATION                                                                       | PREREQUISITES | NAMESPACE                                                                                  |
|-------------------------------------------------|-------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------|
| CommentThreadMerchantRelationshipExpanderPlugin | Populates `MerchantRelationshipTransfer.commentThread` with a related comment thread. |               | Spryker\Zed\CommentMerchantRelationshipConnector\Communication\Plugin\MerchantRelationship |

**src/Pyz/Zed/MerchantRelationship/MerchantRelationshipDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationship;

use Spryker\Zed\CommentMerchantRelationshipConnector\Communication\Plugin\MerchantRelationship\CommentThreadMerchantRelationshipExpanderPlugin;
use Spryker\Zed\MerchantRelationship\MerchantRelationshipDependencyProvider as SprykerMerchantRelationshipDependencyProvider;

class MerchantRelationshipDependencyProvider extends SprykerMerchantRelationshipDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantRelationshipExtension\Dependency\Plugin\MerchantRelationshipExpanderPluginInterface>
     */
    protected function getMerchantRelationshipExpanderPlugins(): array
    {
        return [
            new CommentThreadMerchantRelationshipExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Marketplace** > **Merchant Relations**
2. Click **Edit** next to any merchant relation.
    Make sure you can see, add, edit, and delete comments.

1. In the Merchant Portal, go to **B2B Contracts** > **Merchant Relations**
2. Select a merchant relation.
    Make sure you can see, add, edit, and delete comments.

{% endinfo_block %}
