---
title: CMS Blocks overview
description: With the CMS Block feature, you can easily add promotional banners and define validity date ranges to emphasize specific, time-limited content.
last_updated: Mar 26, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/cms-block
originalArticleId: e03c56fa-eb63-44cd-ae6c-cdcbd685f309
redirect_from:
  - /v4/docs/cms-block
  - /v4/docs/en/cms-block
  - /v4/docs/multi-store-cms-block
  - /v4/docs/en/multi-store-cms-block
  - /v4/docs/category-block
  - /v4/docs/en/category-block
---

Embed custom blocks of content into your shop. Blocks come with full management and control capabilities. You can easily add promotional banners and define validity date ranges to emphasize specific, time limited content. You can create connections to other objects (e.g. Customer Groups (show a block only for a specific group), Countries (show a block for products from a specific country), etc.

Valid from-to dates help you to easily define how long a block should appear in the shop frontend. For example, when you want to build a promotion banner for a limited time.

If you have an international store set-up, you can define which CMS Blocks appear in which stores. Block templates are handled separately from CMS content and local content, so you can build different blocks for different languages.

Global activation allows you to globally activate or deactivate a given block, so you can disable a certain block and it will be disabled throughout all locales.

Each placeholder in the block has locale specific content (for as many locales as you have).

You can also assign categories and products to a given block, add Blocks to product and category pages. Alternatively, you can use blocks for static content by placing them in a page template.

Blocks help to place content in certain places in your template, so you can easily create for example, banners on the top of a page or add SEO text to the bottom of a page.

## If you are:

- Developer:
    - [Install and configure a Product Block](/docs/scos/dev/feature-integration-guides/{{page.version}}/installing-the-product-cms-block.html)
    - [Install and configure a Category Block](/docs/scos/dev/feature-integration-guides/{{page.version}}/installing-the-category-cms-blocks.html)
    - [Migrate the CMS Collector module from version 1.* to version 2.*](/docs/scos/dev/module-migration-guides/migration-guide-cmscollector.html)
    - [Migrate the CMS Block module from version 1.* to version 2.*](/docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html#upgrading-from-version-1-to-version-2)
    - [Migrate the CMS Block Category Connector module from version 1.* to version 2.*](/docs/scos/dev/module-migration-guides/migration-guide-cms-block-category-connector.html)
    - [Migrate the CMS Block Category Connector Console module from version 1.* to version 2.*](/docs/scos/dev/module-migration-guides/migration-guide-cmsblockcategoryconnector-migration-console.html)
    - [Migrate the CMS Block Collector  module from version 1.* to version 2.*](/docs/scos/dev/module-migration-guides/migration-guide-cms-block-collector.html)
    - [Migrate the CMS Block GUI  module from version 1.* to version 2.*](/docs/scos/dev/module-migration-guides/migration-guide-cmsblockgui.html)

- Back Office User:
    - [Create CMS Blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/creating-cms-blocks.html)
    - [Manage CMS Blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/managing-cms-blocks.html)
    - [Define validity period for CMS Blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/defining-validity-period-for-cms-blocks.html)
