

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Comment | {{page.version}} |
| Order Management | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/comment-sales-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CommentSalesConnector | vendor/spryker/comment-sales-connector |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

| CONFIURATION | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| SalesConfig::getSalesDetailExternalBlocksUrls() | Used to display a block with comments related to the order. | Pyz\Zed\Sales |

**Pyz\Zed\Sales\SalesConfig.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
	public function getSalesDetailExternalBlocksUrls()
	{
		$projectExternalBlocks = [
			'comment' => '/comment-sales-connector/sales/list',
		];

		$externalBlocks = parent::getSalesDetailExternalBlocksUrls();

		return array_merge($externalBlocks, $projectExternalBlocks);
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that the Order detail page in Zed contains a block with comments.

{% endinfo_block %}

### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| Comment | class | created | src/Generated/Shared/Transfer/Comment |
| CommentThread | class | created | src/Generated/Shared/Transfer/CommentThread |
| CommentFilter | class | created | src/Generated/Shared/Transfer/CommentFilter |
| CommentRequest | class | created | src/Generated/Shared/Transfer/CommentRequest |

{% endinfo_block %}

### 4) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CommentThreadOrderExpanderPlugin | Expands `OrderTransfer` with `CommentThread`. | None | Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales |
| CommentThreadAttachedCommentOrderPostSavePlugin | Duplicates `commentThread` from Quote to a new order. | None | Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales |

**Pyz\Zed\Sales\SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales\CommentThreadOrderExpanderPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface[]
	 */
	protected function getOrderHydrationPlugins()
	{
		return [
			new CommentThreadOrderExpanderPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that `OrderTransfer::commentThread` contains information about comments when you retrieve an order from the database.

{% endinfo_block %}

**Pyz\Zed\Sales\SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales\CommentThreadAttachedCommentOrderPostSavePlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface[]
	 */
	protected function getOrderPostSavePlugins()
	{
		return [
			new CommentThreadAttachedCommentOrderPostSavePlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that all comments from `QoteTransfer::commentThread` duplicate to a new order after the successful checkout.

{% endinfo_block %}
