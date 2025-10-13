

## Upgrading from version 2.* to version 4.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. If you have any questions, [contact us](https://spryker.com/en/support/).

{% endinfo_block %}

## Upgrading from version 1.* to version 2.*

In version 2.0.0, we've introduced a couple of features for the **Quick Order** page.
First of all, there is a brand new possibility to search for concrete products by name or SKU using a widget (reusable functionality). Now, a user can add items to a shopping list from the **Quick Order** form. After the user selects a certain product from the search field, the price and measurement unit (if the module is installed and the product already has a unit) are displayed. The price is getting recalculated on every quantity field change taking into account volume prices. Quantity is validated against quantity restrictions if configured. While adding to the cart, packaging units are applied to a product if present.

*Estimated migration time: 2h*

To perform the migration, follow the steps:

1. This feature requires `ProductPageSearch` 3.x.x.

    - Update `spryker/product-page-search ^3.0.0`
    - Follow the steps from  [Upgrade the ProductPageSearch module](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpagesearch-module.html).

2. Generate transfers:

```yaml
vendor/bin/console transfer:generate
```

3. Build frontend:

```yaml
vendor/bin/console frontend:project:install-dependencies  
vendor/bin/console frontend:yves:build
```

1. Some files were reorganized, so if you had overwritten classes and templates on the project level, check our [release notes](https://github.com/spryker-shop/quick-order-page/releases).

   - `quick-order-form-field-list.twig` was removed.
   - `components/molecules/quick-order-rows/quick-order-rows.twig` has changes.
   - `quick-order.twig` and `quick-order-form.twig` now use new data from the controller.
   - `quick-order-async-render.twig` was renamed to `quick-order-row-async.twig`.
   - `TextOrderParser` was moved to `SprykerShop\Yves\QuickOrderPage\TextOrder`.
   - `getParsedTextOrderItems()` was renamed to `parse()`.

2. Change the removed deprecated code with its substitution.

   - Deprecated constants were removed `QuickOrderPageConstants::ALLOWED_SEPARATORS`, `QuickOrderPageConstants::PRODUCT_ROWS_NUMBER`. Use `QuickOrderPageConfig` instead.
