---
title: CMS Blocks overview
description: With the CMS Block feature, you can easily add promotional banners and define validity date ranges to emphasize specific, time-limited content.
last_updated: Oct 23, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/cms-block
originalArticleId: a28c0dd9-99fb-4ccc-aab3-2eb250f4a62f
redirect_from:
  - /v5/docs/cms-block
  - /v5/docs/en/cms-block
  - /v5/docs/multi-store-cms-block
  - /v5/docs/en/multi-store-cms-block
  - /v5/docs/multi-store-cms-block
  - /v5/docs/en/multi-store-cms-block
---

Embed custom blocks of content into your shop. Blocks come with full management and control capabilities. You can easily add promotional banners and define validity date ranges to emphasize specific, time limited content. You can create connections to other objects (e.g. Customer Groups (show a block only for a specific group), Countries (show a block for products from a specific country), etc.

Valid from-to dates help you to easily define how long a block should appear in the shop frontend. For example, when you want to build a promotion banner for a limited time.

If you have an international store set-up, you can define which CMS Blocks appear in which stores. Block templates are handled separately from CMS content and local content, so you can build different blocks for different languages.

Global activation allows you to globally activate or deactivate a given block, so you can disable a certain block and it will be disabled throughout all locales.

Each placeholder in the block has locale specific content (for as many locales as you have).

You can also assign categories and products to a given block, add Blocks to product and category pages. Alternatively, you can use blocks for static content by placing them in a page template.

Blocks help to place content in certain places in your template, so you can easily create for example, banners on the top of a page or add SEO text to the bottom of a page.

## If you are:
<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="/docs/scos/dev/feature-integration-guides/{{page.version}}/installing-the-product-cms-block.html" class="mr-link">Install and configure a Product Block</a></li>
<li><a href="/docs/scos/dev/feature-integration-guides/{{page.version}}/installing-the-category-cms-blocks.html" class="mr-link">Install and configure a Category Block</a></li>
<li><a href="/docs/scos/dev/feature-integration-guides/{{page.version}}/multi-store-cms-block-feature-integration.html" class="mr-link">Enable multi-store management for CMS blocks</a></li>
<li><a href="/docs/scos/dev/module-migration-guides/migration-guide-cmscollector.html" class="mr-link">Migrate CMS Collector module from version 1.* to version 2.*</a></li>
<li><a href="/docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html" class="mr-link">Migrate CMS Block module from version 1.* to version 2.*</a></li>
<li><a href="/docs/scos/dev/module-migration-guides/migration-guide-cms-block-category-connector.html" class="mr-link">Migrate CMS Block Category Connector module from version 1.* to version 2.*</a></li>
<li><a href="/docs/scos/dev/module-migration-guides/migration-guide-cmsblockcategoryconnector-migration-console.html" class="mr-link">Migrate CMS Block Category Connector Console module from version 1.* to version 2.*</a></li>
<li><a href="/docs/scos/dev/module-migration-guides/migration-guide-cms-block-collector.html" class="mr-link">Migrate CMS Block Collector  module from version 1.* to version 2.*</a></li>
<li><a href="/docs/scos/dev/module-migration-guides/migration-guide-cmsblockgui.html" class="mr-link">Migrate CMS Block GUI  module from version 1.* to version 2.*</a></li>
    </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
            <li class="mr-title"> Back Office User</li>
            <li><a href="/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/creating-cms-blocks.html" class="mr-link">Create a CMS Block</a></li>
            <li><a href="/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/managing-cms-blocks.html" class="mr-link">Manage CMS Blocks</a></li>
            </ul>      
            </div>
