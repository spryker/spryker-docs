---
title: Install multi-store CMS blocks
description: This guide helps you to learn how to install and integrate multi-store CMS blocks in a Spryker project
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/multi-store-cms-block-feature-integration
originalArticleId: 23757501-8ab0-4f39-8183-5e2b15532926
redirect_from:
  - /2021080/docs/multi-store-cms-block-feature-integration
  - /2021080/docs/en/multi-store-cms-block-feature-integration
  - /docs/multi-store-cms-block-feature-integration
  - /docs/en/multi-store-cms-block-feature-integration
  - /docs/scos/dev/feature-integration-guides/202200.0/multi-store-cms-block-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202108.0/multi-store-cms-block-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202311.0/multi-store-cms-block-feature-integration.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/install-multi-store-cms-blocks.html
related:
  - title: Upgrade the CmsBlock module
    link: docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblock-module.html
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
