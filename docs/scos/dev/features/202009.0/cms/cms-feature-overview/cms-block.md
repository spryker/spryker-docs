---
title: CMS block
originalLink: https://documentation.spryker.com/v6/docs/cms-block
redirect_from:
  - /v6/docs/cms-block
  - /v6/docs/en/cms-block
---

A *CMS block* is a piece of reusable content which you can add to multipe CMS pages and templates. For example, with the help of a block, you can add banners to the top of a page or add SEO text to the bottom of a page. 

## CMS block template

A *CMS block template* is a Twig file that, when applied to a block, defines its design, layout, and functionality.

You can create templates to effectively create similar content. However, as CMS block, is a multi-purpose  entity, you can create templates that allow you to manage the content of different functionalities in your shop. For example, you can [manage emails via CMS blocks](https://documentation.spryker.com/docs/email-as-a-cms-block).

The CMS feature is shipped with several block templates by default. A developer can create more templates.

## CMS block validity period

When creating a block, you can select validity dates. The dates define when the block starts and stops being displayed on the pages it is added to on the Storefront. For example, if you are planning to run a promotion campaign, you can create a banner beforehand and define when it starts and stops being displayed based on the promotion period.


## CMS block store relation

If you have an international store, you can define which stores each block is displayed in. Block templates are handled separately from CMS content and local content, so you can build different blocks for different languages.

Each placeholder in a block has locale-specific content (for as many locales as you have).


## Reusing CMS blocks

If you add a CMS block to multiple pages and edit it, the content is updated on all the pages you've added it to.
This applies to the content and the configuration of blocks. For example, if you update a picture in a block, the new picture will be displayed on all the pages the block is added to. Or, if you update the store relation, the block will stop being displayed on the pages of the store the block is not configured to be displayed on. 


<!---

You can create connections to other objects like Customer Groups (show a block only for a specific group) or Countries (show a block for products from a specific country).

## CMS block templates

### Category Blocks
Category blocks are blocks that can be embedded into the category template, for which we can specify on which specific categories we want them to be rendered.
		
For example, we have a Christmas sale that affects the categories  related to toys and sweets. We want to apply the following discount rule for these categories: "When you buy 3 products from this category, the product with a lower price is  free". 

We would like to promote this sale by placing a block that displays the discount rule on the affected categories only.

### Product Blocks
Product blocks are blocks that can be embedded in the product template, for which we can specify on which specific product we want them to be rendered.


--->

## If you are:
<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/cms-feature-integration-guide" class="mr-link">Enable CMS blocks in your project by integrating the CMS feature</a></li>
<li><a href="https://documentation.spryker.com/docs/enabling-category-cms-block" class="mr-link">Install and configure a Category Block</a></li>
                <li><a href="https://documentation.spryker.com/docs/enabling-cms-block-widget" class="mr-link">Enable CMS block widget</a></li>
<!-- <li><a href="https://documentation.spryker.com/docs/cms-block-multistore" class="mr-link">Enable multi-store management for CMS blocks</a></li>-->
                <li>
<li><a href="https://documentation.spryker.com/docs/mg-cms-collector#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the CMS Collector module from version 1.* to version 2.*</a></li>
<li><a href="https://documentation.spryker.com/docs/mg-cms-block#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the CMS Block module from version 1.* to version 2.*</a></li>
<li><a href="https://documentation.spryker.com/docs/mg-cms-block-category-connector#migration-guide---cms-block-category-connector" class="mr-link">Migrate the CMS Block Category Connector module from version 1.* to version 2.*</a></li>
<li><a href="https://documentation.spryker.com/docs/mg-cms-block-category-connector-console" class="mr-link">Migrate the CMS Block Category Connector Console module from version 1.* to version 2.*</a></li>
<li><a href="https://documentation.spryker.com/docs/mg-cms-block-collector#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the CMS Block Collector  module from version 1.* to version 2.*</a></li>
<li><a href="https://documentation.spryker.com/docs/mg-cms-block-gui#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the CMS Block GUI  module from version 1.* to version 2.*</a></li>
                <li><a href="https://documentation.spryker.com/docs/product-block" class="mr-link">Install and configure a Product Block</a></li>
    </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/creating-a-cms-block" class="mr-link">Create a CMS Block</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-cms-blocks" class="mr-link">Manage CMS Blocks</a></li>
            </ul>
        </div>  
</div>
</div>
                
## See next

* [Templates and slots](https://documentation.spryker.com/docs/templates-and-slots)
