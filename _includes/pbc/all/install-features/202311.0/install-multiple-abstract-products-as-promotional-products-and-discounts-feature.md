

This document describes how to add *multiple abstract products as promotional products* to the [Promotions & Discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/promotions-discounts-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Promotions & Discounts | {{page.version}} | [Promotions & Discounts feature integration](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html) |
| Spryker Cart | {{page.version}}   | [Spryker Cart feature integration](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/discount-promotions-rest-api "^1.4.0"
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

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

Ensure that the following changes have been applied by checking your database:

| DATABASE ENTITY       | TYPE   | EVENT  |
|-----------------------|--------|--------|
| spy_discount.abstract_skus | column | added  |

Ensure that the following changes have been triggered in transfer objects:

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

Ensure that the *ABSTRACT PRODUCT SKU(S)** field is displayed, and it accepts a comma-separated list:
1. In the Back Office, go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount** and select **Create new discount**. 
2. On the **Create new discount** page, in the **Discount calculation** tab, for **DISCOUNT APPLICATION TYPE**, select **PROMOTIONAL PRODUCT**. 
3. Ensure that the **ABSTRACT PRODUCT SKU(S)** field appears and add to it a comma-separated list of abstract product SKUs.

{% endinfo_block %}

### 3) Add translations

Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```yaml
cart.title.available_discounts,Verfügbare Rabatte,de_DE
cart.title.available_discounts,Available discounts,en_US
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Ensure that in the database the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Ensure that all labels and help tooltips in the **Discount** form has English and German translation:

1. In the Back Office, go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.
2. **Create new discount** or **Edit** an existing one.
3. Check labels and help tooltips on the **Create new discount** or **Edit discount** page.

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
 
1. [Create a discount](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html).
2. On the **Discount calculation** tab, for **DISCOUNT APPLICATION TYPE**, select **PROMOTIONAL PRODUCT**. 
3. Add **ABSTRACT PRODUCT SKU**.
4. Create another discount with one or more identic promotional products.
5. To fulfill the discounts' requirements, add items to the cart.
6. Ensure that both discounts are displayed in the **Promotional Product** section on the **Cart** page.

{% endinfo_block %}

### 4) Build Zed UI frontend

Enable Javascript and CSS changes:

```bash
console frontend:zed:install-dependencies
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Ensure that you can create a discount with multiple promotional products:
1. In the Back Office, go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.
2. Click **Create new discount** or **Edit** next to the existing discount.
3. Check that you can see the **Discount** form on the **Create new discount** or **Edit discount** page.
4. On the **Discount calculation** tab, for **DISCOUNT APPLICATION TYPE**, select **PROMOTIONAL PRODUCT**.
5. Ensure that the **ABSTRACT PRODUCT SKU(S)** field is displayed and that it accepts a comma-separated list.
6. Enter several abstract product SKUs and save the discount.
7. To fulfill the discount's requirements, add items to the cart.
8. Ensure that on the cart page, the **Promotional Product** section displays a carousel containing all products in the discount.
9. Ensure that you can add a product from the **Promotional Product** section to the cart and that the discount is applied.

{% endinfo_block %}
