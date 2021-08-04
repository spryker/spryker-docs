---
title: Managing CMS blocks
originalLink: https://documentation.spryker.com/v6/docs/managing-cms-blocks
redirect_from:
  - /v6/docs/managing-cms-blocks
  - /v6/docs/en/managing-cms-blocks
---

This topic describes how to manage CMS blocks.

{% info_block infoBox "Info" %}

If you want to manage a CMS block for [email](https://documentation.spryker.com/docs/email-as-a-cms-block-feature-overview), see [Managing content of emails via CMS blocks](https://documentation.spryker.com/docs/en/managing-content-of-emails-via-cms-blocks).

{% endinfo_block %}

---

## References

To start managing CMS blocks, go to **Content Management** > **Blocks**.

Each section contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

## Viewing CMS blocks

To view a block:

1. On the *Overview of CMS Blocks* page, click **View Block** in the _Actions_ column. 
2. On the *View CMS Block: Block ID* page that opens, the following information is available:

* General information
* Placeholders

**Tips & Tricks**
On the *View CMS Block: Block ID* page, you can do the following:

* Edit a block general information and layout by clicking **Edit block** in the top right corner of the page.
* Edit block content and insert CMS widgets by clicking **Edit placeholders** in the top right corner of the page.
* Make a CMS block invisible on the store website by clicking **Deactivate** in the top right corner of the page.
* Make a CMS block visible on the store website by clicking **Activate** in the top right corner of the page. 
* Return to the list of CMS blocks by clicking **Back to list** in the top right corner of the page.

## Reference information: Viewing CMS blocks

The following table describes the attributes you see when viewing a CMS block.

| ATTRIBUTE | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| General information | Section provides details regarding the locales for which the block is available, its current status, block template and time period during which it is visible in the online store. | *Template* defines the layout of the Email CMS Block. The rest is irrelevant.  |
| Placeholders | Section shows the translation of the block title and content per locale. | Displays the content of placeholders for each locale. |
| Category list  | Section contains a list of category pages which the block appears on. | Irrelevant. |
| Product lists | Section contains a list of product detail pages which the block appears on. | Irrelevant. |

## Editing placeholders

To edit a placeholder:

1. On the *Overview of CMS Blocks* page in the _Actions_ column, click *Edit Placeholder* next to the block you want to update. 
2. On the *Edit Block Glossary: Block ID* page, you can update a title or content of the CMS block, as well as insert a content item widget. See [Adding content item widgets to a block](https://documentation.spryker.com/docs/adding-content-items-to-cms-pages-and-blocks#adding-content-item-widgets-to-blocks) for more details.
3. To save the updates, click **Save**. The updated block will be displayed on the grid of List of CMS Blocks.

**Tips & tricks**

On the *Edit Block Glossary: Block ID* page, you can do the following:

* Edit a block general information and layout by clicking **Edit block** in the top right corner of the page.
* Make a CMS block invisible on the store website by clicking **Deactivate** in the top right corner of the page.
* Make a CMS block visible on the store website by clicking **Activate** in the top right corner of the page. 
* Return to the list of CMS blocks by clicking **Back to list** in the top right corner of the page.

### Reference information: Editing placeholders

The following table describes the attributes on the *Edit Block Glossary: [Block ID]* page.

 ATTRIBUTE | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| General information | Section provides details regarding the locales for which the block is available, its current status, block template and time period during which it is visible in the online store. | *Template* defines the layout of the Email CMS Block. The rest is irrelevant.  |
| Placeholders | Section shows the translation of the block title and content per locale. | Displays the content of placeholders for each locale. |
| Category list  | Section contains a list of category pages which the block appears on. | Irrelevant. |
| Product lists | Section contains a list of product detail pages which the block appears on. | Irrelevant. |

## Editing blocks

To edit a CMS block:
1. On the *Overview of CMS Blocks* page in the _Actions_ column, click **Edit Block** next to the block you want to update. 
2. On the **Edit CMS Block: Block ID** page that opens, you can perform the following actions on the CMS block:

* Specify a locale where the store will be available.
* Select a template of the block.
* Change the block name.
* Define the validity period for your block to be visible in the online store.

{% info_block infoBox %}
See [CMS Blocks: Reference Information](https://documentation.spryker.com/docs/cms-block-reference-information
{% endinfo_block %}  for more details.)

**Tips & Tricks**
On the *Edit CMS Block: Block ID* page, you can do the following:

* Return to the page where you can edit block title and content. For this, click **Edit placeholders** in the top right corner of the page.
* Make the CMS block invisible on the store website by clicking **Deactivate** in the top right corner of the page.
* Make the CMS block visible on the store website by clicking **Activate** in the top right corner of the page. 
* Return to a list of CMS blocks. To do this, click **Back to list**.

### Reference information: Editing blocks

The following table describes the attributes on the *Edit CMS Block: [Block ID]* page.

|ATTRIBUTE  | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| Store relation |  Store locale for which the block is available. | Irrelevant. |
| Template | Defines the layout of the CMS Block. | Defines the layout of the Email CMS Block.
| Name | Name of the block. | Name of the block. Should correspond to the name defined in the email template the block is assigned to. |
| Valid from and Valid to | Dates that specify how long your active block is visible in the online store. | Irrelevant. |
| Categories: top | Block or blocks assigned to a category page.  The block is displayed at the top of the page. | Irrelevant. |
| Categories: middle |  Block or blocks assigned to a category page. The block is displayed in the middle of the page. | Irrelevant. |
| Categories: bottom | Block or blocks assigned to a category page. The block is displayed at the bottom of the page. | Irrelevant. |
| Products | Block or blocks assigned to a product details page. | Irrelevant. |


## Activating or deactivating a CMS block
You can make a CMS block either active (visible on the store website) or inactive (invisible on the store website).

To activate a CMS block:
1. On the *Overview of CMS Blocks* page in the _Actions_ column, click **Activate** next to the block you want to update. 
2. The status will be changed from _Inactive_ to _Active_. The CMS block with the updated status will appear on the grid of CMS blocks.

To deactivate a CMS block:
1. On the *Overview of CMS Blocks* page in the _Actions_ column, click **Deactivate** next to the block you want to update. 
2. The status is changed from _Active_ to _Inactive_ and the block is removed from the store website. The CMS block with the updated status appears on the grid of CMS blocks.
