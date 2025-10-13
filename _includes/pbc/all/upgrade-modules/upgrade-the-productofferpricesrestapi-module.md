

## Upgrading from version 1.* to version 2.0.0

In this new version of the `ProductOfferPricesRestApi* module`, we have split `ProductOffer` and `Merchant` context. You can find more details about the changes on the [ProductOfferPricesRestApi module](https://github.com/spryker/product-offer-prices-rest-api/releases) release page.

{% info_block errorBox %}

This release is a part of the *ProductOffer and Merchant context leakage* concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior.

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the `ProductOfferPricesRestApi` module to the new version:

```bash
composer require spryker/product-offer-prices-rest-api: "^2.0.0" --update-with-dependencies
```

2. Update the generated classes:

```bash
console transfer:generate
```

*Estimated migration time: 5 min*
