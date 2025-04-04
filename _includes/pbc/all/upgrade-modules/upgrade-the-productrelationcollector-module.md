

## Upgrading from version 1.* to version 2.*

From version 2 we added support for multi-currency. First of all, make sure that you [migrated the Price module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html). We have changed collector dependency to use `PriceProduct` module instead of price,  update your code accordingly if you overwrote the core.
