---
title: Migration Guide - Wishlist
originalLink: https://documentation.spryker.com/v5/docs/mg-wishlist
redirect_from:
  - /v5/docs/mg-wishlist
  - /v5/docs/en/mg-wishlist
---

## Upgrading from Version 6.* to Version 8.0.0

{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)
***
## Upgrading from Version 5.* to Version 6.*

With the implementation of the quote storage strategies, the new version 5.0.0 of the Cart module has been released. The Wishlist module is dependent on it, so make sure your Cart module's version is 5.0.0 or higher.
`CartClientInterface::storeQuote` is deprecated, you need to use `QuoteClientInterface::setQuote()` instead.
`addItem()`, `addItems()` methods of `Cart` module saves quote after making changes.
***
## Upgrading from Version 4.* to Version 5.*

From version 2 have we added support for multi-currency. First of all, make sure you migrated the Price module. We have changed `ProductStoreClient` to resolve product prices based on the currently selected price mode/currency.
We have added a new depedendecy to `ProductStoreClient`: now use `Spryker\Client\Wishlist\Dependency\Client\WishlistToPriceProductInterface`. If you have extended this class, merge your changes with core accordingly.
***
## Upgrading from Version 2.* to Version 3.*

If you’re migrating the Wishlist module from version 2 to version 3, you need to follow the steps described below.
Version 3 of the Wishlist module introduced new schema, and old tables have to be deleted while new created.
First you need to drop old tables:
```sql
DROP TABLE spy_wishlist_item;
DROP TABLE spy_wishlist;
```
Then you need to create new schema tables:
```sql
CREATE TABLE spy_wishlist
(
    id_wishlist INTEGER PRIMARY KEY NOT NULL,
    fk_customer INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT "spy_wishlist-fk_customer" FOREIGN KEY (fk_customer) REFERENCES spy_customer (id_customer)
);
CREATE UNIQUE INDEX "spy_wishlist-unique-fk_customer-name" ON spy_wishlist (fk_customer, name);


CREATE TABLE spy_wishlist_item
(
    id_wishlist_item INTEGER PRIMARY KEY NOT NULL,
    fk_product INTEGER NOT NULL,
    fk_wishlist INTEGER NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT "spy_wishlist_item-fk_product" FOREIGN KEY (fk_product) REFERENCES spy_product (id_product),
    CONSTRAINT "spy_wishlist_item-fk_wishlist" FOREIGN KEY (fk_wishlist) REFERENCES spy_wishlist (id_wishlist)
);
CREATE UNIQUE INDEX "spy_wishlist_item-unique-fk_wishlist-fk_product" ON spy_wishlist_item (fk_wishlist, fk_product);
```

Schema diagram:
![wishlist_schema.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Module+Migration+Guides/Migration+Guide+-+Wishlist/wishlist_schema.png){height="" width=""}
