---
title: Multi-store CMS Block Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/cms-block-multistore-feature-integration
redirect_from:
  - /v1/docs/cms-block-multistore-feature-integration
  - /v1/docs/en/cms-block-multistore-feature-integration
---

To prepare your project to work with multi-store CMS Blocks, the following minimum module versions are required:


|Module  | Version |
| --- | --- |
| `spryker/cms-block` | 2.0.0 |
| `spryker/cms-block-collector` |2.0.0  |
| `spryker/cms-block-gui` | 2.0.0 |
| `spryker/store` | 1.2.0 |
|`spryker/kernel`  | 3.13.0 |
|  `spryker/collector`|6.0.0  |
| `spryker/touch` | 4.0.0 |

To enable multi-store management within the CMS Block Zed Admin UI, override `Spryker\Zed\Store\StoreConfig::isMultiStorePerZedEnabled()` in your project to return `true`. 

This will enable the store management inside the CMS Block Zed Admin UI.

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

You should now be able to use the CMS Block in the administration interface to manage CMS Block-store relations.

Check out our [Demoshop implementation](https://github.com/spryker/demoshop) for implementation example and idea. 
 
<!-- Last review date: Feb 15, 2019 -->

 [//]: # (by Karoly Gerner, Anastasija Datsun)
