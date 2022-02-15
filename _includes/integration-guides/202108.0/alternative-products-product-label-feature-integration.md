---
title: Alternative products + Product Label feature integration
description: The guide describes the procedure that you need to perform in order to integrate the Alternative Products + Product Label feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/alternative-products-product-labels-feature-integration
originalArticleId: ad3a3385-381b-4dcf-a067-965b4d6e04cd
redirect_from:
  - /2021080/docs/alternative-products-product-labels-feature-integration
  - /2021080/docs/en/alternative-products-product-labels-feature-integration
  - /docs/alternative-products-product-labels-feature-integration
  - /docs/en/alternative-products-product-labels-feature-integration
---

## Install feature core

### Prerequisites

Please review and install the necessary features before beginning the integration.

| NAME | VERSION |
|---|---|
|Alternative Products| {{page.version}} |
|Product Label| {{page.version}} |

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```yaml
composer require spryker/product-alternative-product-label-connector:"^1.0.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductAlternativeProductLabelConnector | vendor/spryker/product-alternative-product-label-connector |

{% endinfo_block %}

### 2) Import data

#### Add infrastructural data

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|ProductAlternativeProductLabelConnectorInstallerPlugin|Installs the configured infrastructural alternative product labels.|None|Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin\Installer|

Add the following to your project:

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**
    
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

Run the following console command to:
* Execute registered installer plugins
* Install the infrastructural data

```bash
console setup:init-db
```
{% info_block warningBox "Verification" %}

Make sure that the configured infrastructural alternative product label has been added to the `spy_product_label` table in the database.

{% endinfo_block %}

### 3) Set up behavior

#### Setup alternative products labels workflow

Enable the following behavior types by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|PostProductAlternativeCreatePlugin|After the product alternative is created, adds product alternatives availability label to the abstract product.|None|Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin|
|PostProductAlternativeDeletePlugin|After the product alternative is deleted, removes product alternatives availability label from the abstract product.|None|Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin|
|ProductAlternativeLabelUpdaterPlugin|Used to persist alternative product label relation changes into the database. <br>The plugin is called when the `ProductLabelRelationUpdaterConsole` command is executed.|None|Spryker\Zed\ProductAlternativeProductLabelConnector\Communication\Plugin|

**src/Pyz/Zed/ProductAlternative/ProductAlternativeDependencyProvider.php**

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

**src/Pyz/Zed/ProductLabel/ProductLabelDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Make sure that:

- When you add product alternatives, it adds the corresponding label to the product.
- When you remove product alternatives, it removes the corresponding label from the product.

{% endinfo_block %}
