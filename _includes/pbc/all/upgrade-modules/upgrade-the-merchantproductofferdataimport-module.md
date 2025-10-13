## Upgrading from version 1.* to version 2.0.0

In this version, we introduced a new importer type: `merchant-combined-product-offer`. This importer enables you to import the following entities with a single file:
- Product offers  
- Store relations  
- Prices  
- Stocks  
- Validity dates


You can find more details about the changes on the [MerchantProductOfferDataImport module](https://github.com/spryker/merchant-product-offer-data-import/releases/tag/2.0.0) release page.

To upgrade to the new version of the module, do the following:

1. Upgrade the `MerchantProductOfferDataImport` module:

```bash
composer require spryker/merchant-product-offer-data-import: "^2.0.0" --update-with-dependencies
```

2. Apply database changes and generate transfer changes:

```bash
vendor/bin/console propel:install
vendor/bin/console transfer:generate
```

3. Generate a new translation cache:

```bash
vendor/bin/console translator:generate-cache
```

## Upgrading from version 0.* to version 1.0.0

In this new version of the `MerchantProductOfferDataImport` module, we have split `ProductOffer` and `Merchant` context. You can find more details about the changes on the [MerchantProductOfferDataImport module](https://github.com/spryker/merchant-product-offer-data-import/releases) release page.

{% info_block errorBox %}

This release is a part of the *ProductOffer and Merchant context leakage* concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior.

{% endinfo_block %}

To upgrade to the new version of the module, do the following:

1. Upgrade the `MerchantProductOfferDataImport` module to the new version:

```bash
composer require spryker/merchant-product-offer-data-import: "^1.0.0" --update-with-dependencies
```

*Estimated migration time: 5 min*
