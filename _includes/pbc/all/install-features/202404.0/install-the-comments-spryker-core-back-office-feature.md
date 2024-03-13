This document describes how to install the Comments + Spryker Core Back Office feature.

## Install feature core

Follow the steps below to install the Comments + Spryker Core Back Office feature.

## Prerequisites

To start feature integration, integrate the required features:

| NAME                     | VERSION          | INSTALLATION GUIDE                                                                                                                                                |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Comments                 | {{page.version}} | [Install the Comments feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-feature.html) |
| Spryker Core Back Office | {{page.version}} | [Install the Spryker Core Back Office feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-back-office-feature-integration.html)      |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/comment-user-connector: "^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE                         | EXPECTED DIRECTORY                               |
|--------------------------------|--------------------------------------------------|
| CommentUserConnector           | vendor/spryker/comment-user-connector            |

{% endinfo_block %}

### 3) Set up database schema and transfer objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes by checking your database:

| DATABASE ENTITY     | TYPE   | EVENT   |
|---------------------|--------|---------|
| spy_comment.fk_user | column | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer       | Type     | Event   | Path                                          |
|----------------|----------|---------|-----------------------------------------------|
| Comment.fkUser | property | created | src/Generated/Shared/Transfer/CommentTransfer |
| Comment.user   | property | created | src/Generated/Shared/Transfer/CommentTransfer |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                    | SPECIFICATION                                                                     | PREREQUISITES | NAMESPACE                                                     |
|-------------------------------------------|-----------------------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| UserCommentAuthorValidationStrategyPlugin | Validates comment author when `CommentTransfer.fkUser` is provided.               |               | Spryker\Zed\CommentUserConnector\Communication\Plugin\Comment |
| UserCommentExpanderPlugin                 | Expands `CommentTransfer` with `UserTransfer` if `CommentTransfer.fkUser` is set. |               | Spryker\Zed\CommentUserConnector\Communication\Plugin\Comment |

**src/Pyz/Zed/Comment/CommentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Comment;

use Spryker\Zed\Comment\CommentDependencyProvider as SprykerCommentDependencyProvider;
use Spryker\Zed\CommentUserConnector\Communication\Plugin\Comment\UserCommentAuthorValidationStrategyPlugin;
use Spryker\Zed\CommentUserConnector\Communication\Plugin\Comment\UserCommentExpanderPlugin;

class CommentDependencyProvider extends SprykerCommentDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CommentExtension\Dependency\Plugin\CommentAuthorValidatorStrategyPluginInterface>
     */
    protected function getCommentAuthorValidatorStrategyPlugins(): array
    {
        return [
            new UserCommentAuthorValidationStrategyPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CommentExtension\Dependency\Plugin\CommentExpanderPluginInterface>
     */
    protected function getCommentExpanderPlugins(): array
    {
        return [
            new UserCommentExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

* Log in to Back Office.
* Go to **Marketplace** > **Merchant Relations** and press **Edit** button on any merchant relation.
* Write a comment and press **Save** button.
* Make sure that you can see user's information under the saved comment.

{% endinfo_block %}