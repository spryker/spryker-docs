This document describes how to install the Comments + Merchant B2B Contract Requests feature.

## Install feature core

Follow the steps below to install the Comments + Merchant B2B Contract Requests feature core.

## Prerequisites

Install the required features:

| NAME                           | VERSION          | INSTALLATION GUIDE                                                                                                                                                                             |
|--------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Comments                       | {{page.version}} | [Install the Comments feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-feature.html)                              |
| Merchant B2B Contract Requests | {{page.version}} | [Install the Merchant B2B Contract Requests feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contract-requests-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/comment-merchant-relation-request-connector: "^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                  | EXPECTED DIRECTORY                                         |
|-----------------------------------------|------------------------------------------------------------|
| CommentMerchantRelationRequestConnector | vendor/spryker/comment-merchant-relation-request-connector |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| Transfer                              | Type     | Event   | Path                                                          |
|---------------------------------------|----------|---------|---------------------------------------------------------------|
| MerchantRelationRequest.commentThread | property | created | src/Generated/Shared/Transfer/MerchantRelationRequestTransfer |
| MerchantRelationship.commentThread    | property | created | src/Generated/Shared/Transfer/MerchantRelationshipTransfer    |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                  | SPECIFICATION                                                                          | PREREQUISITES | NAMESPACE                                                                                        |
|---------------------------------------------------------|----------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------|
| CommentThreadMerchantRelationRequestExpanderPlugin      | Populates `MerchantRelationRequestTransfer.commentThread` with a related comment thread. |               | Spryker\Zed\CommentMerchantRelationRequestConnector\Communication\Plugin\MerchantRelationRequest |
| CopyCommentThreadToMerchantRelationshipPostCreatePlugin | Copies a comment thread from a merchant relation request to a merchant relationship.         |               | Spryker\Zed\CommentMerchantRelationRequestConnector\Communication\Plugin\MerchantRelationship    |

**src/Pyz/Zed/MerchantRelationRequest/MerchantRelationRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationRequest;

use Spryker\Zed\CommentMerchantRelationRequestConnector\Communication\Plugin\MerchantRelationRequest\CommentThreadMerchantRelationRequestExpanderPlugin;
use Spryker\Zed\MerchantRelationRequest\MerchantRelationRequestDependencyProvider as SprykerMerchantRelationRequestDependencyProvider;

class MerchantRelationRequestDependencyProvider extends SprykerMerchantRelationRequestDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantRelationRequestExtension\Dependency\Plugin\MerchantRelationRequestExpanderPluginInterface>
     */
    protected function getMerchantRelationRequestExpanderPlugins(): array
    {
        return [
            new CommentThreadMerchantRelationRequestExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Merchant Portal, go to **B2B Contracts** > **Merchant Relation Requests**
2. Select a merchant relation request.
  Make sure you can see, add, edit and delete comments.

{% endinfo_block %}

**src/Pyz/Zed/MerchantRelationship/MerchantRelationshipDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationship;

use Spryker\Zed\CommentMerchantRelationRequestConnector\Communication\Plugin\MerchantRelationship\CopyCommentThreadToMerchantRelationshipPostCreatePlugin;
use Spryker\Zed\MerchantRelationship\MerchantRelationshipDependencyProvider as SprykerMerchantRelationshipDependencyProvider;

class MerchantRelationshipDependencyProvider extends SprykerMerchantRelationshipDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantRelationshipExtension\Dependency\Plugin\MerchantRelationshipPostCreatePluginInterface>
     */
    protected function getMerchantRelationshipPostCreatePlugins(): array
    {
        return [
            new CopyCommentThreadToMerchantRelationshipPostCreatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Merchant Portal, go to **B2B Contracts** > **Merchant Relation Requests**.
2. Select a pending merchant relation request.
3. Add some comments.
4. Approve the merchant relation request.
5. Go to **B2B Contracts** > **Merchant Relations** and select the merchant relation you've created.
    Make sure you can see the comments copied from the merchant relation request.

{% endinfo_block %}
