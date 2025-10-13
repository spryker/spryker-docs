

## Upgrading from version 1.* to version 2.0.0

The main point of the `MerchantRelationshipProductListGui` v2.0.0 is the following: exclusive ownership for product lists was removed from the merchant relations.

So, `MerchantRelationshipProductListGui` currently provides plugins to extend the `ProductListGui` module with information about domain entities that use Product Lists (Merchant Relationships).

Here is the change list for the `MerchantRelationshipProductListGui` v2.0.0:

- Added `spryker/util-text` module to dependencies.
- Added `spryker/merchant-relationship-product-list` module to dependencies.
- Introduced `ProductListMerchantRelationshipEditFormExpanderPlugin` and `ProductListMerchantRelationshipCreateFormExpanderPlugin` form expander plugins for the `MerchantRelationshipGui` module.
- Introduced `MerchantRelationshipProductListUsedByTableExpanderPlugin` and `MerchantRelationListProductListTopButtonsExpanderPlugin` expander plugins for the `ProductListGui` module.
- Added Zed translations for form elements and labels.
- Deprecated `MerchantRelationshipProductListOwnerTypeFormExpanderPlugin`.
- Deprecated `MerchantRelationshipTableExpanderPlugin`.

*Estimated migration time: 1hour*

To upgrade to the new version of the module, do the following:

1. Update the `MerchantRelationshipProductListGui` module version and its dependencies by running the following command:

```bash
composer require spryker/merchant-relationship-product-list-gui:"^2.0.0" --update-with-dependencies
```

2. Update transfer objects:

```bash
console transfer:generate
```

3. Generate translator cache by running the following command to get the latest Zed translations:

```bash
console translator:generate-cache
```
