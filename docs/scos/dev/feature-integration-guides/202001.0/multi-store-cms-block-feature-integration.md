---
title: Multi-store CMS Block feature integration
description: This integration guide provides step-by-step instruction on integrating Multi-store CMS Block Feature into your project.
last_updated: Mar 6, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/multi-store-cms-block-feature-integration
originalArticleId: 1f21aaa8-d9fc-46e8-9562-38b4f6065c1d
redirect_from:
  - /v4/docs/multi-store-cms-block-feature-integration
  - /v4/docs/en/multi-store-cms-block-feature-integration
related:
  - title: CMS Block
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/cms-block.html
  - title: Migration Guide - CMS Block
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html
---

To prepare your project to work with multi-store CMS Blocks, the following minimum module versions are required:

| Module| Version |
| --- | --- |
| `spryker/cms-block` | 2.0.0 |
| `spryker/cms-block-collector` | 2.0.0 |
| `spryker/cms-block-gui` | 2.0.0 |
| `spryker/store` | 1.2.0 |
| `spryker/kernel` | 3.13.0 |
| `spryker/collector` | 6.0.0 |
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
