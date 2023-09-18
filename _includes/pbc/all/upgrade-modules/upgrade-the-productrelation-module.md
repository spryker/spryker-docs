

## Upgrading from version 2.* to 3.0.0

From version 2.* we have added the possibility to assign product relations to stores.

*Estimated migration time: 30 minutes.*

To upgrade to the new version of the module, do the following:

1. Upgrade the `ProductRelation` module to the new version:

```bash
composer require spryker/product-relation:"^3.0.0" --update-with-dependencies
```

2. Prepare a database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```

3. Run the database migration:

```bash
console propel:install
console transfer:generate
```




## Upgrading from version 1.* to version 2.*

In version 2 we have added multi-currency support. First of all, make sure that you [migrated the Price module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html). We have changed Zed table to use `PriceProductFacade` for retrieving product prices. We have also changed `\Spryker\Client\ProductRelation\Storage\ProductRelationStorage` to resolve ProductRelation prices based on the selected currency, price mode combination. If you modified this class in project or extended it, you may want adapt to core version.
