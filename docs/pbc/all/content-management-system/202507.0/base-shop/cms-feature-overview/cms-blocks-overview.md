---
title: CMS blocks overview
description: With the CMS Block feature, you can easily add promotional banners and define validity date ranges to emphasize specific, time-limited content.
last_updated: Jul 22, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/cms-blocks-overview
originalArticleId: 2b07c846-32ed-42b7-bf71-9c9ecc4f54ba
redirect_from:
  - /docs/scos/user/features/202108.0/cms-feature-overview/cms-blocks-overview.html
  - /docs/scos/user/features/202200.0/cms-feature-overview/cms-blocks-overview.html
  - /docs/scos/user/features/202311.0/cms-feature-overview/cms-blocks-overview.html  
  - /docs/pbc/all/content-management-system/202311.0/cms-feature-overview/cms-blocks-overview.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/cms-feature-overview/cms-blocks-overview.html
---

A *CMS block* is a piece of reusable content that you can add to multiple CMS pages and templates. For example, with the help of a block, you can add banners to the top of a page or add SEO text to the bottom of a page.

## CMS block template

A *CMS block template* is a Twig file that, when applied to a block, defines its design, layout, and functionality.

You can create templates to effectively create similar content. However, as far as CMS block is a multi-purpose entity, you can create templates that let you manage the content of different functionalities in your shop. For example, you can [manage emails using CMS blocks](/docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html).

The CMS feature is shipped with several block templates by default. A developer can create more templates.

## CMS block validity period

When creating a block, you can select validity dates. The dates define when the block starts and stops being displayed on the pages it's added to on the Storefront. For example, if you are planning to run a promotion campaign, you can create a banner beforehand and define when it starts and stops being displayed based on the promotion period.


## CMS block store relation

If you have an international store, you can define which stores each block is displayed in. Block templates are handled separately from CMS content and local content, so you can build different blocks for different languages.

Each placeholder in a block has locale-specific content (for as many locales as you have).


## Reusing CMS blocks

If you add a CMS block to multiple pages and edit it, the content is updated on all the pages you've added it to.
This applies to the content and the configuration of blocks. For example, if you update a picture in a block, the new picture is displayed on all the pages the block is added to. Or, if you update the store relation, the block stops being displayed on the pages of the store the block is not configured to be displayed on.


<!---

You can create connections to other objects like Customer Groups (show a block only for a specific group) or Countries (show a block for products from a specific country).

## CMS block templates

### Category Blocks
Category blocks are blocks that can be embedded into the category template, for which we can specify on which specific categories we want them to be rendered.

For example, we have a Christmas sale that affects the categories related to toys and sweets. We want to apply the following discount rule for these categories: "When you buy 3 products from this category, the product with a lower price is free".

We want to promote this sale by placing a block that displays the discount rule on the affected categories only.

### Product Blocks
Product blocks are blocks that can be embedded in the product template, for which we can specify on which specific product we want them to be rendered.


--->

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create CMS blocks](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html)  |
| [Edit CMS blocks](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/blocks/edit-cms-blocks.html)  |

## See next

- [Templates and slots](/docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/templates-and-slots-overview.html)
