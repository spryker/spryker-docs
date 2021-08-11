---
title: Migration Guide - Availability
originalLink: https://documentation.spryker.com/v3/docs/mg-availability
redirect_from:
  - /v3/docs/mg-availability
  - /v3/docs/en/mg-availability
---

## Upgrading from version 6.* to 8.0.0

{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 5.* to Version 6.*

In **Availability** module version 6 we have added support for multi-store. The Back Office has undergone some changes to allow selecting stores and update database tables to store relations to store.

To upgrade, first you need to run database migrations:

```php
           ALTER TABLE "spy_availability"
               ADD "fk_store" INTEGER;

           ALTER TABLE "spy_availability" ADD CONSTRAINT "spy_availability-fk_store"
              FOREIGN KEY ("fk_store")
              REFERENCES "spy_store" ("id_store");

           ALTER TABLE "spy_availability_abstract"
              ADD "fk_store" INTEGER;

           ALTER TABLE "spy_availability_abstract" ADD CONSTRAINT "spy_availability_abstract-fk_store"
             FOREIGN KEY ("fk_store")
             REFERENCES "spy_store" ("id_store");
 ```
 
Then:

* Run `vendor/bin/console propel:model:build` - this will update models.
* Run  `vendor/bin/console transfer:generate` - this will create new transfer objects.

We have changed public API for methods in: `\Spryker\Zed\Availability\Business\AvailabilityFacade::findProductAbstractAvailability` received a third argument for `idStore`.

We have also changed the way data is collected by collector, now it has to filter data by current store.

Change: `\Pyz\Zed\Collector\Business\Storage\AvailabilityCollector`:

```php
$productConcreteAvailability = SpyAvailabilityQuery::create()
            ->filterByFkStore($this->getCurrentStore()->getIdStore()) //note the new filter by method.
            ->findByFkAvailabilityAbstract($idAvailabilityAbstract);
```

Change: `\Pyz\Zed\Collector\Persistence\Storage\Propel\AvailabilityCollectorQuery` to collect only current store availability: 

```php
$this->touchQuery->addJoin(
            [
                SpyAvailabilityAbstractTableMap::COL_ABSTRACT_SKU,
                SpyAvailabilityAbstractTableMap::COL_FK_STORE,
            ],
            [
                SpyProductAbstractTableMap::COL_SKU,
                $this->getStoreTransfer()->getIdStore(),
            ],
            Criteria::INNER_JOIN
        );
```

## Upgrading from Version 3.* to Version 4.*

All `Availability` UI has been moved to `AvailabilitGui` module, mostly Communication or Persistence were changed. If you have overwritten any of moved classes from those layers please change base class namespace from `Availability` to `AvailabilityGui` root.

## Upgrading from Version 2.* to Version 3.*
    
With Availability version 3 we have changed the way availability is calculated. 
Two new tables have been added:

```php
CREATE TABLE "spy_availability_abstract"
(
    "id_availability_abstract" INTEGER NOT NULL,
    "abstract_sku" VARCHAR(255) NOT NULL,
    "quantity" INTEGER DEFAULT 0 NOT NULL,
    PRIMARY KEY ("id_availability_abstract"),
    CONSTRAINT "spy_availability_abstract-sku" UNIQUE ("abstract_sku")
);

CREATE SEQUENCE "spy_availability_pk_seq";

CREATE TABLE "spy_availability"
(
    "id_availability" INTEGER NOT NULL,
    "fk_availability_abstract" INTEGER NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "is_never_out_of_stock" BOOLEAN DEFAULT \'f\',
    PRIMARY KEY ("id_availability"),
    CONSTRAINT "spy_availability-sku" UNIQUE ("sku")
);

ALTER TABLE "spy_availability" ADD CONSTRAINT "spy_availability-fk_spy_availability_abstract"
    FOREIGN KEY ("fk_availability_abstract")
    REFERENCES "spy_availability_abstract" ("id_availability_abstract");
',
```

As this involves more than availability module, to start using it some configuration needed per module basis.

Oms version >= 4 is required. See the [Migration Guide - OMS](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/migration-guide-oms.html) to version 4 step by step guide how to migrate OMS to have new availability integrated.

Cart > 2.1 and AvailabilityCartConnector > 2.0. To have cart availability pre check. You will need to add new plugin `Spryker\Zed\AvailabilityCartConnector\Communication\Plugin\CheckAvailabilityPlugin` into Cart project dependency provider. `Pyz\Zed\Cart\CartDependencyProvider::getCartPreCheckPlugins()` which is core implementation of cart availability check.
New availability collector is required. Take it from demoshop, `Pyz\Zed\Collector\Business\Storage\AvailabilityCollector`, this have to be added to `Pyz\Zed\Collector\CollectorDependencyProvider` storage plugin stack.


<!--**See also:**
Learn what Availability module does and how it works
-->

<!-- Last review date: Feb 26, 2018 by Aurimas Ličkus-->
