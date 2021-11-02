---
title: Creating CMS Blocks
description: The guide provides instructions on how to create a CMS block in the Back Office.
last_updated: Dec 23, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/creating-cms-block
originalArticleId: dbb4ed18-78d4-4746-bb97-3a9a09a3edc2
redirect_from:
  - /v3/docs/creating-cms-block
  - /v3/docs/en/creating-cms-block
related:
  - title: CMS Block
    link: docs/scos/user/features/page.version/cms-feature-overview/cms-blocks-overview.html
  - title: CMS Block- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/references/cms-block-reference-information.html
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
Templates are project-specific and are usually created by a developer and a business person. If you are missing a CMS Block template, contact them and refer to the [HowTo - Create a CMS Block template](/docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/cms/howto-create-cms-templates.html#adding-a-template-for-a-cms-block).
{% endinfo_block %}

See [CMS Blocks: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/content-management/blocks/references/cms-block-reference-information.html) to learn more about CMS blocks attributes.)

3. To save the changes, click **Save**. This will successfully create a block and take you to the **Edit Block Glossary** page.

***
**What's next?**

A new block has been created. Now, you can add the content if needed.

* To learn more about how to edit a CMS block, see the [Editing CMS Blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/managing-cms-blocks.html#editing-blocks) section in _Managing CMS Blocks_.

* To know how you to add blocks to pages, see [Assigning Blocks to Category and Product details Pages](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/assigning-blocks-to-category-or-product-pages.html).
