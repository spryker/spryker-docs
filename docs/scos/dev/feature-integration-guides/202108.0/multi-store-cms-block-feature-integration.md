---
title: Multi-store CMS block feature integration
description: This integration guide provides step-by-step instruction on integrating Multi-store CMS Block Feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/multi-store-cms-block-feature-integration
originalArticleId: 23757501-8ab0-4f39-8183-5e2b15532926
redirect_from:
  - /2021080/docs/multi-store-cms-block-feature-integration
  - /2021080/docs/en/multi-store-cms-block-feature-integration
  - /docs/multi-store-cms-block-feature-integration
  - /docs/en/multi-store-cms-block-feature-integration
related:
  - title: Migration Guide - CMS Block
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html
---

To prepare your project to work with multi-store CMS Blocks, the following minimum module versions are required:

| NAME | VERSION |
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
