

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Comments | 202507.0 |
| Cart | 202507.0 |


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

### Prerequisites

Install the following required features:

| NAME | VERSION |
| --- | --- |
| Comments | 202507.0 |
| Cart | 202507.0 |

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
