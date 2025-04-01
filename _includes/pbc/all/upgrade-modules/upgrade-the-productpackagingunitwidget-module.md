

## Upgrading from version 0.4.* to version 0.5.0

In this new version of the `ProductPackagingUnitWidget` module, we have added support of decimal stock. You can find more details about the changes on the [ProductPackagingUnitWidget module](https://github.com/spryker-shop/product-packaging-unit-widget/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/decimal-stock-migration-concept.html).

{% endinfo_block %}


*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the `ProductPackagingUnitWidget` module to the new version:

```bash
composer require spryker-shop/product-packaging-unit-widget: "^0.5.0" --update-with-dependencies
```

2. Run the transfer object generation:

```bash
console propel:install
console transfer:generate
```


## Upgrading from version 0.2.* to version 0.4.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. [Contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}
