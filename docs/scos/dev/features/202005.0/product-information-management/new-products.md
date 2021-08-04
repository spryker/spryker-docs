---
title: New Products
originalLink: https://documentation.spryker.com/v5/docs/new-products
redirect_from:
  - /v5/docs/new-products
  - /v5/docs/en/new-products
---

## Overview
New products feature extends product module by two date attributes: "new from" and "new to" dates. Between the defined date range the product is considered new. New products on the frontend appear with a label on it that displays this information for users who search for fresh stuff.

## Feature Integration
### Prerequisites
#### To prepare your project to work with New Products:

1. Make sure you have the correct versions of the required modules. To automatically update to the latest non-BC breaking versions, run the following command:
`composer update "spryker/*"`

2. Require the module in your `composer.json` by running:
`composer require spryker/product-new`

3. Install the database changes by running:
`vendor/bin/console propel:diff`
Propel should generate a migration file with the changes.

4. Apply the database changes, run:
`vendor/bin/console propel:migrate`

5. To re-generate ORM models, run:
`vendor/bin/console propel:model:build`

6. To get the transfer object changes, run:
`vendor/bin/console transfer:generate`

7. Set up a Product Label in your database that matches the label name from the module configuration which is called "NEW" by default (defined in `\Spryker\Shared\ProductNew\ProductNewConfig::getLabelNewName()`).

8. Activate the plugin that updates product label relations for new products:
Add `ProductNewLabelUpdaterPlugin` to the product label relation updater plugin stack, see example below:

```php
<?php

namespace Pyz\Zed\ProductLabel;

use Spryker\Zed\ProductLabel\ProductLabelDependencyProvider as SprykerProductLabelDependencyProvider;
use Spryker\Zed\ProductNew\Communication\Plugin\ProductNewLabelUpdaterPlugin;

class ProductLabelDependencyProvider extends SprykerProductLabelDependencyProvider
{

    /**
     * @return \Spryker\Zed\ProductLabel\Dependency\Plugin\ProductLabelRelationUpdaterPluginInterface[]
     */
    protected function getProductLabelRelationUpdaterPlugins()
    {
        return [
            // ...
            new ProductNewLabelUpdaterPlugin(),
        ];
    }

}
```


### Data Setup

You should now be able to run the `vendor/bin/console product-label:relations:update` console command that updates product label relations for new products as well based on their "new from - to" date range.

All you need to do now is just to set up your products with the appropriate "new from" and "new to" dates. After this your products should have the "NEW" label assigned to them that you can render on the frontend. If you need some examples and ideas about this feature, check out our [Demoshop implementation](https://github.com/spryker/demoshop).


