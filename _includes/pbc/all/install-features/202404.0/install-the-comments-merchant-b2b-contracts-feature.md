This document describes how to install the Comments + Merchant B2B Contracts feature.

## Install feature core

Follow the steps below to install the Comments + Merchant B2B Contracts feature.

## Prerequisites

To start feature integration, integrate the required features:

| NAME                                | VERSION          | INSTALLATION GUIDE                                                                                                                                                             |
|-------------------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Comments                            | {{page.version}} | [Install the Comments feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-feature.html)              |
| Merchant B2B Contracts              | {{page.version}} | [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-feature.html) |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/comment-merchant-relationship-connector: "^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE                               | EXPECTED DIRECTORY                                     |
|--------------------------------------|--------------------------------------------------------|
| CommentMerchantRelationshipConnector | vendor/spryker/comment-merchant-relationship-connector |

{% endinfo_block %}

### 2) Set up transfer objects

Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer                           | Type     | Event   | Path                                                       |
|------------------------------------|----------|---------|------------------------------------------------------------|
| MerchantRelationship.commentThread | property | created | src/Generated/Shared/Transfer/MerchantRelationshipTransfer |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                          | SPECIFICATION                                                                       | PREREQUISITES | NAMESPACE                                                                                  |
|-------------------------------------------------|-------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------|
| CommentThreadMerchantRelationshipExpanderPlugin | Populates `MerchantRelationshipTransfer.commentThread` with related comment thread. |               | Spryker\Zed\CommentMerchantRelationshipConnector\Communication\Plugin\MerchantRelationship |

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

**Back Office**

* Log in to the Back Office.
* Go to **Marketplace** > **Merchant Relations** and press **Edit** button on any merchant relation.
* Make sure you can see, add, edit and delete comments.

**Merchant Portal**

* Log in to the Merchant Portal.
* Go to **B2B Contracts** > **Merchant Relations** and select any merchant relation.
* Make sure you can see, add, edit and delete comments.

{% endinfo_block %}

