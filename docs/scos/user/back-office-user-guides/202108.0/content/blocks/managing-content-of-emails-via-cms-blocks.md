---
title: Managing content of emails via CMS blocks
description: You can manage the content of emails you send to customers by editing email templates via CMS Blocks.
last_updated: Jun 17, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-content-of-emails-via-cms-blocks
originalArticleId: 082e03b7-4dce-4b06-b839-06e2e26a557b
redirect_from:
  - /2021080/docs/managing-content-of-emails-via-cms-blocks
  - /2021080/docs/en/managing-content-of-emails-via-cms-blocks
  - /docs/managing-content-of-emails-via-cms-blocks
  - /docs/en/managing-content-of-emails-via-cms-blocks
related:
  - title: Email as a CMS block
    link: docs/scos/user/features/page.version/cms-feature-overview/email-as-a-cms-block-overview.html
---

You can manage the content of emails you send to customers by editing [email templates via CMS Blocks](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html).

There is a number of default emails that are automatically sent on different occasions, like customer registration or order shipment. You can change the default emails by editing their email templates via respective CMS blocks. For the full list of the emails with their email CMS blocks, see [Default email templates](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html)

## Prerequisites

To start managing the content of emails, go to **Content > Blocks**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Creating an email CMS block

If your development team has introduced a new email for your project, you have to create an email CMS Block for it.

{% info_block infoBox "Info" %}

You don’t need to create new email CMS Blocks for the [default email templates](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html). Instead, you edit the available email CMS Blocks to adjust them to your needs.

{% endinfo_block %}

To create an email CMS Block:

1. On the *Overview of CMS Blocks* page, select **+ Create block**.
2. On the *Create CMS block* page, select a **Template**.
3. Enter a **Name**.
4. Click **Save**. This saves your block and takes you to the page.

{% info_block infoBox "Info" %}

On the *Create CMS block* page, you can ignore all the other fields, including *Store Relation*, as they do not affect the behavior of the email templates.

{% endinfo_block %}

5. Enter the content of your email for all the locales.

{% info_block warningBox "Note" %}

Content Items are not rendered in emails.

{% endinfo_block %}

6. Click **Save**. This populates your email template with the provided content.

7. Pass the name of the created email CMS block to your development team to add to the respective .twig email template.

{% info_block warningBox "Note" %}

You don’t need to activate the email CMS block, as the deactivated status of the email CMS block does not prevent emails from being sent.

{% endinfo_block %}

### Reference information: Creating an email CMS block

| ATTRIBUTE  | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| Store relation |  Store locale for which the block will be available. | Irrelevant. |
| Template | Defines the layout of the CMS Block. | Defines the layout of the Email CMS Block.
| Name | Name of the block. | Name of the block. Should correspond to the name defined in the email template the block will be assigned to. |
| Valid from and Valid to | Dates that specify how long your active block is visible on the Storefront. | Irrelevant. |
| Categories: top | Block or blocks that will be assigned to a category page.  The block will be displayed at the top of the page. | Irrelevant. |
| Categories: middle |  Block or blocks that will be assigned to a category page. The block will be displayed in the middle of the page. | Irrelevant. |
| Categories: bottom | Block or blocks that will be assigned to a category page. The block will appear at the bottom of the page. | Irrelevant. |
| Products | A block or blocks that will be assigned to a product details page. | Irrelevant. |

## Viewing email CMS blocks
You can view an email CMS block like a regular CMS block. See [Viewing CMS blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/managing-cms-blocks.html#viewing-cms-blocks) for details.

## Editing email CMS blocks

To edit an email CMS block:

1. On the *Overview of CMS Blocks* page in the *Actions* column, select **Edit Block** next to the block you want to update.

2. On the *Edit CMS Block: [Block ID]* page, you can update the **Name** or choose a different **Template**.

{% info_block warningBox "Note" %}

If you updated the **name**, pass it to your development team to update the name of the respective [.twig email template](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html).

{% endinfo_block %}

1. Click **Save**.
The page refreshes, displaying the message about the successful update of the email CMS block.


### Reference information: Editing email CMS blocks

| ATTRIBUTE  | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| Store relation |  Store locale for which the block is available. | Irrelevant. |
| Template | Defines the layout of the CMS Block. | Defines the layout of the Email CMS Block.
| Name | Name of the block. | Name of the block. Should correspond to the name defined in the email template the block is assigned to. |
| Valid from and Valid to | Dates that specify how long your active block will be visible on the Storefront. | Irrelevant. |
| Categories: top | Block or blocks assigned to a category page.  The block is displayed at the top of the page. | Irrelevant. |
| Categories: middle |  Block or blocks assigned to a category page. The block is displayed in the middle of the page. | Irrelevant. |
| Categories: bottom | Block or blocks assigned to a category page. The block is displayed at the bottom of the page. | Irrelevant. |
| Products | A block or blocks assigned to a product details page. | Irrelevant. |


## Editing content of email CMS blocks

To edit the content of an Email CMS block:
1. In the *Actions* column of the *Overview of CMS Blocks* page, select **Edit Placeholder** next to the email CMS block you want to update.

2. On the *Edit Block Glossary: [Block ID]* page, update the content of the email CMS block. You can use plain text to create content of the emails, or apply glossary keys and variables. See **Tips and tricks** for details.

{% info_block warningBox "Note" %}

Content Items are not rendered in emails.

{% endinfo_block %}

3. Select **Save**.
The page refreshed displaying the message about the successful update.

**Tips and tricks**

* Add a [glossary key](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/glossary/managing-glossary.html) to the email CMS block. When the email is sent, the key is replaced with the translation you defined for the locale selected by the customer. To learn how to add translations, see [Managing glossary](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/glossary/managing-glossary.html)

* Add variables to the email CMS block to replace them with customer and order specific details. When the email is sent, the variables are replaced with the actual details. For example, add *firstName*, and it is replaced with the name of the customer the email is sent to. A developer can provide a full list of variables and create new ones.
