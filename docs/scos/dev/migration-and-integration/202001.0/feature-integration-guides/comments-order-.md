---
title: Comments + Order Management Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/comments-order-management-feature-integration
redirect_from:
  - /v4/docs/comments-order-management-feature-integration
  - /v4/docs/en/comments-order-management-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Comment | 201907.0 |
| Order Management | 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/comment-sales-connector:"^1.0.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`CommentSalesConnector`</td><td>`vendor/spryker/comment-sales-connector`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Configuration
Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `SalesConfig::getSalesDetailExternalBlocksUrls()` | Used to display a block with comments related to the order. | `Pyz\Zed\Sales` |

Pyz\Zed\Sales\SalesConfig.php
    
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

### 3) Set up Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`Comment`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/Comment`</td></tr><tr><td>`CommentThread`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentThread`</td></tr><tr><td>`CommentFilter`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentFilter`</td></tr><tr><td>`CommentRequest`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CommentRequest`</td></tr></tbody></table>
{% endinfo_block %}

### 4) Set up Behavior
Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CommentThreadOrderExpanderPlugin` | Expands `OrderTransfer` with `CommentThread`. | None | `Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales` |
| `CommentThreadAttachedCommentOrderPostSavePlugin` | Duplicates `commentThread` from Quote to a new order. | None | `Spryker\Zed\CommentSalesConnector\Communication\Plugin\Sales` |

Pyz\Zed\Sales\SalesDependencyProvider.php

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

Pyz\Zed\Sales\SalesDependencyProvider.php

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
