---
title: Creating a CMS Block
originalLink: https://documentation.spryker.com/v4/docs/creating-cms-block
redirect_from:
  - /v4/docs/creating-cms-block
  - /v4/docs/en/creating-cms-block
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
Templates are project-specific and are usually created by a developer and a business person. If you are missing a CMS Block template, contact them and refer to the [HowTo - Create a CMS Block template](https://documentation.spryker.com/v4/docs/ht-create-cms-templates#adding-a-template-for-a-cms-block
{% endinfo_block %}.)

See [CMS Blocks: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/blocks/references/cms-block-refer) to learn more about CMS blocks attributes.)

3. To save the changes, click **Save**. This will successfully create a block and take you to the **Edit Block Glossary** page.

***
**What's next?**

A new block has been created. Now, you can add the content if needed.

* To learn more about how to edit a CMS block, see the [Editing CMS Blocks](https://documentation.spryker.com/v4/docs/managing-cms-blocks#editing-blocks) section in _Managing CMS Blocks_.

* To know how you to add blocks to pages, see [Assigning Blocks to Category and Product details Pages](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/blocks/assigning-block).
