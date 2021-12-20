---
title: Multi-store CMS Block feature integration
description: The guide describes the process of installing multi-store CMS Blocks into the project.
last_updated: Nov 4, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/cms-block-multistore-feature-integration
originalArticleId: 1068a0ec-b65f-47f9-a02b-7f18a3af335e
redirect_from:
  - /v1/docs/cms-block-multistore-feature-integration
  - /v1/docs/en/cms-block-multistore-feature-integration
related:
  - title: CMS Block
    link: docs/scos/user/features/page.version/cms-feature-overview/cms-blocks-overview.html
  - title: Migration Guide - CMS Block
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html
  - title: Migration Guide - CMS Block Collector
    link: docs/scos/dev/module-migration-guides/migration-guide-cms-block-collector.html
  - title: Migration Guide - CMS Block GUI
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblockgui.html
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
