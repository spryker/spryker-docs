

## Upgrading from version 1.* to version 2.0.0

In this new version of the `ProductMerchantPortalGui` module, we support the product approval feature. You can find more details about the changes on the [ProductMerchantPortalGui release](https://github.com/spryker/product-merchant-portal-gui/releases) page.

{% info_block errorBox %}

This release is a part of the *Product Approval* concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior.

{% endinfo_block %}

To upgrade to the new version of the module, do the following:

1. Upgrade the `ProductMerchantPortalGui` module to the new version:

```bash
composer require spryker/product-merchant-portal-gui: "^2.0.0" --update-with-dependencies
```

2. Update the generated classes:

```bash
console transfer:generate
```

3. Generate new translation cache for Zed:

```bash
console translator:generate-cache
```

4. Enable Javascript and CSS changes for Zed:

```bash
console frontend:zed:build
```

*Estimated migration time: 10 min*
