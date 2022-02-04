---
title: Multiple Abstract Products as Promotional Products & Discounts feature integration
description: Add support of multiple abstract products as promotional products in the Promotions & Discounts feature.
last_updated: Feb 04, 2022
template: feature-integration-guide-template
---

This document describes how to add the *multiple abstract products as promotional products* to the [Promotions & Discounts](/docs/scos/user/features/{{page.version}}/promotions-discounts-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Promotions & Discounts | {{page.version}} | [Promotions & Discounts feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/promotions-and-discounts-feature-integration.html) |
| Spryker Cart | {{page.version}}   | [Spryker Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.md.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/discount-promotions-rest-api "^1.4.0"
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY       |
|---------------------------|--------------------------|
| DiscountPromotionsRestApi | vendor/spryker/discount-promotions-rest-api  |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY       | TYPE   | EVENT  |
|-----------------------|--------|--------|
| spy_discount.abstract_skus | column | added  |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                            | TYPE     | EVENT   | PATH                                                                       |
|-------------------------------------|----------|---------|----------------------------------------------------------------------------|
| DiscountPromotionCriteria           | class    | created | src/Generated/Shared/Transfer/DiscountPromotionCriteriaTransfer            |
| DiscountPromotionCollection         | class    | created | src/Generated/Shared/Transfer/DiscountPromotionCollectionTransfer          |
| DiscountPromotionConditions         | class    | created | src/Generated/Shared/Transfer/DiscountPromotionConditionsTransfer          |
| PromotionItem                       | class    | created | src/Generated/Shared/Transfer/PromotionItemTransfer                        |
| DiscountPromotion                   | class    | created | src/Generated/Shared/Transfer/DiscountPromotionTransfer                    |
| ProductView                         | class    | created | src/Generated/Shared/Transfer/ProductViewTransfer                          |
| DiscountPromotion.abstractSkus      | property | created | src/Generated/Shared/Transfer/DiscountPromotionTransfer                    |
| Discount.idDiscount                 | property | created | src/Generated/Shared/Transfer/DiscountTransfer                             |
| Discount.displayName                | property | created | src/Generated/Shared/Transfer/DiscountTransfer                             |
| Discount.discountPromotion          | property | created | src/Generated/Shared/Transfer/DiscountTransfer                             |
| RestPromotionalItemsAttributes.skus | property | created | src/Generated/Shared/Transfer/RestPromotionalItemsAttributesTransfer       |
| ProductView.promotionItem           | property | created | src/Generated/Shared/Transfer/ProductViewTransfer                          |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that when the *Promotional Product* radio button in *Discount Calculation* form is selected, the *Abstract Product SKU(s)* field is displayed, and it accepts a comma-separated list.

{% endinfo_block %}

### 3) Add translations

Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```yaml
cart.title.available_discounts,Verfügbare Rabatte,de_DE
cart.title.available_discounts,Available discounts,en_US
```

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that all labels and help tooltips in the discount form has English and German translation.

{% endinfo_block %}

### 5) Set up behavior

Set up the following behaviors:

| PLUGIN                                                      | SPECIFICATION                                                        | PREREQUISITES | NAMESPACE                                                                                                            |
|-------------------------------------------------------------|----------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------|
| DiscountPromotionAddToCartFormWidgetParameterExpanderPlugin | Adds discount promotion form name postfix to the Add To Cart form.   | None          | SprykerShop\Yves\DiscountPromotionWidget\Plugin\CartPage\DiscountPromotionAddToCartFormWidgetParameterExpanderPlugin |

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerShop\Yves\DiscountPromotionWidget\Plugin\CartPage\DiscountPromotionAddToCartFormWidgetParameterExpanderPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CartPageExtension\Dependency\Plugin\AddToCartFormWidgetParameterExpanderPluginInterface>
     */
    protected function getAddToCartFormWidgetParameterExpanderPlugins(): array
    {
        return [
            new DiscountPromotionAddToCartFormWidgetParameterExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the plugin works correctly:

1. [Create a discount](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html) and select **Promotional Product** radio button in **Discount Calculation** form.
2. Add a product abstract sku into the **Abstract Product SKU(s)** field.
3. Create another discount with the at least one same **Promotional Product**.
4. To fulfill the discounts' requirements, add items to the cart.
5. Make sure that both discount are displayed in the the **Promotional Product** section on the cart page.

{% endinfo_block %}


### 4) Build Zed UI frontend

Enable Javascript and CSS changes:

```bash
console frontend:zed:install-dependencies
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Make sure that you can create a discount with multiple promotional products:
1. In the Back Office, go to **Merchandising** > **Discount**. 
2. Create a new discount or update an existing one, check that you can see the **Discount** form.
3. Open **Discount Calculation** form and select **Promotional Product** radio button.
4. Make sure that the **Abstract Product SKU(s)** field is displayed, and it accepts a comma-separated list.
5. Enter several product abstract SKUs and save the discount.
6. To fulfill the discount's requirements, add items to the cart.
7. Make sure that the **Promotional Product** section on the cart page displays a carousel containing all products in the discount.
8. Make sure that you can add a product from a **Promotional Product** section to the cart and discount is applied.

{% endinfo_block %}
