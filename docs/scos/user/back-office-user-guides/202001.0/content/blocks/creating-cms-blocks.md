---
title: Creating CMS Blocks
description: The guide provides instructions on how to create a CMS block in the Back Office.
last_updated: Aug 13, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/creating-cms-block
originalArticleId: b01c2681-93cb-4a09-87df-1b3773c43e15
redirect_from:
  - /v4/docs/creating-cms-block
  - /v4/docs/en/creating-cms-block
related:
  - title: CMS Block
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/cms-block.html
  - title: Managing CMS Blocks
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/managing-cms-blocks.html
  - title: Defining Validity Period for CMS Blocks
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/defining-validity-period-for-cms-blocks.html
---

This topic provides a list of steps to create a CMS block in Back Office.
***
To start working with the CMS blocks, navigate to the **Content Management > Blocks** section.
***
Here you can create a new CMS block, specify for which store and how long it will be visible in the online store, as well as create category or product detail pages.

## Creating a CMS Block

To create a block:

1. On the **Overview of CMS Blocks** page,  click  **Create block** in the top right corner.
2. On the **Create CMS Block** page that opens, enter the block details:

{% info_block warningBox %}

**Store relation**, **Template**, and **Name** must be filled in. All other fields are optional.

{% endinfo_block %}

* Store relation
* Template
* Name
* Valid from and Valid to
* Categories: top
* Categories: middle
* Categories: bottom
* Products

{% info_block infoBox %}

Templates are project-specific and are usually created by a developer and a business person. If you are missing a CMS Block template, contact them and refer to the [HowTo - Create a CMS Block template](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html#cms-block-template).

{% endinfo_block %}

See [CMS Blocks: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/references/cms-block-reference-information.html) to learn more about CMS blocks attributes.)

3. To save the changes, click **Save**. This will successfully create a block and take you to the **Edit Block Glossary** page.

**What's next?**

A new block has been created. Now, you can add the content if needed.
* To learn more about how to edit a CMS block, see the [Editing CMS Blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/managing-cms-blocks.html#editing-blocks) section in _Managing CMS Blocks_.
* To know how you to add blocks to pages, see [Assigning Blocks to Category and Product details Pages](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/assigning-blocks-to-category-or-product-pages.html).
