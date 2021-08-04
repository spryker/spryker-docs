---
title: Migration Guide - QuickOrderPage
originalLink: https://documentation.spryker.com/v6/docs/mg-quick-order-page
redirect_from:
  - /v6/docs/mg-quick-order-page
  - /v6/docs/en/mg-quick-order-page
---

## Upgrading from Version 2.* to Version 4.0.0

{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 1.* to Version 2.*
At version 2.0.0 we've introduced a couple of features for the **Quick Order** page.
First of all, there is a brand new possibility to search for concrete products by name or SKU using a widget (reusable functionality). Now, a user is able to add items to a shopping list from the Quick Order form. After the user selected a certain product from the search field, price and measurement unit (if the module is installed and product already has unit) will be displayed. A price is getting recalculated on every quantity field change taking into account volume prices. Quantity is validated against quantity restrictions if configured. While adding to cart packaging units will be applied to a product if present.

**To perform the migration, follow the steps:**
1. This feature requires `ProductPageSearch` 3.x.x.
    * Update `spryker/product-page-search ^3.0.0`
    * Follow the steps from  [Migration guide - ProductPageSearch](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/migration-guide).
2. Generate transfers:

```yaml
vendor/bin/console transfer:generate
```
3. Build frontend:

```yaml
vendor/bin/console frontend:yves:install-dependencies  
vendor/bin/console frontend:yves:build
```
4. Some files were re-organized, so if you had overwritten classes and templates on project level please check our [release notes](https://github.com/spryker-shop/quick-order-page/releases).
* `quick-order-form-field-list.twig` was removed
* `components/molecules/quick-order-rows/quick-order-rows.twig` has changes
* `quick-order.twig` and `quick-order-form.twig` now use new data from controller
* `quick-order-async-render.twig` was renamed to quick-order-row-async.twig
* `TextOrderParser` was moved to `SprykerShop\Yves\QuickOrderPage\TextOrder`, `getParsedTextOrderItems()` was renamed to `parse()`.
5. Change the removed deprecated code with its substitution.
* Deprecated constants were removed `QuickOrderPageConstants::ALLOWED_SEPARATORS`, `QuickOrderPageConstants::PRODUCT_ROWS_NUMBER`. Use `QuickOrderPageConfig` instead.

*Estimated migration time: 2h*

