

By default abstract products are available in all stores. This feature provides additional configuration when:

* you have multiple stores
* you want to manage the appearance of abstract products per store.

## Prerequisites
To prepare your project to work with multi-store abstract products:

1. Update/install `spryker/collector` to at least 6.0.0 version. You can find additional help for feature migration in [Upgrade the Collector module](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/upgrade-modules/upgrade-the-collector-module.html).
2. Update/install `spryker/touch` to at least 4.0.0 version. You can find additional help for feature migration in [_Migration Guide - Touch](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-touch-module.html).
3. Update/install `spryker/store` to at least 1.3.0 version.
4. Update/install `spryker/product` to at least 6.0.0 version. You can find additional help for feature migration in [Migration Guide - Product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-product-module.html).
5. If you want to have Zed Admin UI support for the multi-store abstract product management:
* Update/install `spryker/productmanagement` to at least 0.10.0 version. You can find additional help for feature migration in [Upgrade the ProductManagement module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productmanagement-module.html).
* Override `Spryker\Zed\Store\StoreConfig::isMultiStorePerZedEnabled()` in your project to return `true`. This will enable the store management inside the Product Information Management (PIM) Zed Admin UI.

**Example override**

```php
<?php
namespace Pyz\Zed\Store;

use Spryker\Zed\Store\StoreConfig as SprykerStoreConfig;

class StoreConfig extends SprykerStoreConfig
{
    /**
     * @return bool
     */
    public function isMultiStorePerZedEnabled()
    {
        return true;
    }
}
```

* You should now be able to use the Product Information Management (PIM) Zed Admin UI to manage abstract product store relation.

Check out our [Legacy Demoshop implementation](https://github.com/spryker/demoshop) for implementation example and idea.
 
