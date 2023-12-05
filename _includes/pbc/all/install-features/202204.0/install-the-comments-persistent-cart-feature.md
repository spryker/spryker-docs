


This document describes how to install the Comments + Persistent Cart feature.

## Install feature core

Follow the steps below to install the Comments + Persistent Cart feature core.

### Prerequisites

To start feature integration, integrate the required features 

| NAME | VERSION | INSTALLATION GUIDES|
| --- | --- | --- |
| Comments | {{page.version}} | [Comments feature integration](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-feature.html) |
| Persistent Cart | {{page.version}} |

### 1) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CommentThreadQuoteExpanderPlugin | Expands quote transfer with `CommentThread`. | None | Spryker\Zed\Comment\Communication\Plugin\Quote |

**Pyz\Zed\Quote\QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Comment\Communication\Plugin\Quote\CommentThreadQuoteExpanderPlugin;
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteExpanderPluginInterface[]
	 */
	protected function getQuoteExpanderPlugins(): array
	{
		return [
			new CommentThreadQuoteExpanderPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that `QuoteTransfer::commentThread` contains information about comments when you retrieve a quote from the database.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Comments + Persistent Cart feature frontend.

### Prerequisites

To start feature integration, integrate the required features 

| NAME | VERSION | INSTALLATION GUIDES|
| --- | --- | --- |
| Comments | {{page.version}} | [Comments feature integration](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-feature.html) |
| Cart | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)|

### 1) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CartCommentThreadAfterOperationStrategyPlugin | Updates a session quote with the comment thread. | None | SprykerShop\Yves\CartPage\Plugin\CommentWidget |

**Pyz\Yves\CommentWidget\CommentWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CommentWidget;

use SprykerShop\Yves\CartPage\Plugin\CommentWidget\CartCommentThreadAfterOperationStrategyPlugin;
use SprykerShop\Yves\CommentWidget\CommentWidgetDependencyProvider as SprykerShopCommentDependencyProvider;

class CommentWidgetDependencyProvider extends SprykerShopCommentDependencyProvider
{
	/**
	 * @return \SprykerShop\Yves\CommentWidgetExtension\Dependency\Plugin\CommentThreadAfterOperationStrategyPluginInterface[]
	 */
	protected function getCommentThreadAfterOperationStrategyPlugins(): array
	{
		return [
			new CartCommentThreadAfterOperationStrategyPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that add/update/remove actions update a session quote with the latest comment thread.

{% endinfo_block %}
