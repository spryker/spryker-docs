---
title: Alternative Products + Product Label feature integration
description: The guide describes the procedure that you need to perform in order to integrate the Alternative Products + Product Label feature into your project.
last_updated: Dec 24, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/alternative-products-product-labels-feature-integration
originalArticleId: 46019510-e789-4451-afb7-01af770bbcff
redirect_from:
  - /v3/docs/alternative-products-product-labels-feature-integration
  - /v3/docs/en/alternative-products-product-labels-feature-integration
related:
  - title: Product Label feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/product-label-feature-integration.html
---

## Install Feature Core
### Prerequisites
Please review and install the necessary features before beginning the integration.
|Name|Version|
|---|---|
|Alternative Products|201903.0|
|Product Label|201903.0|

### 1) Install the required modules using Composer
Run the following command to install the required modules:
```yaml
composer require spryker/product-alternative-product-label-connector:"^1.0.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`ProductAlternativeProductLabelConnector`</td><td>`vendor/spryker/product-alternative-product-label-connector`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Import Data
#### Add Infrastructural Data
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`ProductAlternativeProductLabelConnectorInstallerPlugin`|Installs the configured infrastructural alternative product labels.|None|`Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin\Installer`|

Add the following to your project:
<details open>
<summary markdown='span'>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>
    
 ```php   
<?php
 
namespace Pyz\Zed\Installer;
 
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin\Installer\ProductAlternativeProductLabelConnectorInstallerPlugin;
 
class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
	/**
	 * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
	 */
	public function getInstallerPlugins()
	{
		return [
			new ProductAlternativeProductLabelConnectorInstallerPlugin(),
		];
	}
}
```
<br>
</details>

Run the following console command to:
* Execute registered installer plugins
* Install the infrastructural data

```yaml
console setup:init-db
```
{% info_block warningBox "Verification" %}
Make sure that the configured infrastructural alternative product label has been added to the `spy_product_label` table in the database.
{% endinfo_block %}

### 3) Set up Behavior
#### Setup Alternative Products Labels Workflow
Enable the following behavior types by registering the plugins:
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`PostProductAlternativeCreatePlugin`|After the product alternative is created, adds product alternatives availability label to the abstract product.|None|`Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin`|
|`PostProductAlternativeDeletePlugin`|After the product alternative is deleted, removes product alternatives availability label from the abstract product.|None|`Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin`|
|`ProductAlternativeLabelUpdaterPlugin`|Used to persist alternative product label relation changes into the database. <br>The plugin is called when the `ProductLabelRelationUpdaterConsole` command is executed.|None|`Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin`|

<details open>
<summary markdown='span'>src/Pyz/Zed/ProductAlternative/ProductAlternativeDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductAlternative;
 
use Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin\PostProductAlternativeCreatePlugin;
use Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin\PostProductAlternativeDeletePlugin;
use Spryker\Zed\ProductAlternative\ProductAlternativeDependencyProvider as SprykerProductAlternativeDependencyProvider;
 
class ProductAlternativeDependencyProvider extends SprykerProductAlternativeDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductAlternativeExtension\Dependency\Plugin\PostProductAlternativeCreatePluginInterface[]
     */
    protected function getPostProductAlternativeCreatePlugins(): array
    {
        return [
            new PostProductAlternativeCreatePlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Zed\ProductAlternativeExtension\Dependency\Plugin\PostProductAlternativeDeletePluginInterface[]
     */
    protected function getPostProductAlternativeDeletePlugins(): array
    {
        return [
            new PostProductAlternativeDeletePlugin(),
        ];
    }
}
```
<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/ProductLabel/ProductLabelDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\ProductLabel;
 
use Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin\ProductAlternativeLabelUpdaterPlugin;
use Spryker\Zed\ProductLabel\ProductLabelDependencyProvider as SprykerProductLabelDependencyProvider;
 
class ProductLabelDependencyProvider extends SprykerProductLabelDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductLabel\Dependency\Plugin\ProductLabelRelationUpdaterPluginInterface[]
     */
    protected function getProductLabelRelationUpdaterPlugins()
    {
        return [
            new ProductAlternativeLabelUpdaterPlugin(),
        ];
    }
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
**Make sure, that**:<br>When you add product alternatives, it adds the corresponding label to the product.<br>When you remove product alternatives, it removes the corresponding label from the product.
{% endinfo_block %}

