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

There is a number of default emails that are automatically sent on different occasions, like customer registration or order shipment. You can change the default emails by editing their email templates via respective CMS blocks. For the full list of the emails with their email CMS blocks, see [Default email templates](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html).

If a developer introduced a new email for your project, you need to create an email CMS Block for it. Blocks for the default email templates are already created, and you can adjust them to your needs.

## Prerequisites

To start working with email CMS blocks, go to **Content&nbsp;<span aria-label="and then">></span> Blocks**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Create an email CMS block

1. On the **Overview of CMS Blocks** page, select **Create block**.
2. On the **Create new CMS block** page, select a **TEMPLATE**.
3. Enter a **NAME**.
4. Click **Save**.
    This opens the **Edit CMS Block Glossary** page with a success message displayed.
5. Enter the content of your email for all the locales.

{% info_block warningBox "Content items in email blocks" %}

Content items are not rendered in emails.

{% endinfo_block %}

6. Click **Save**.
    This populates your email template with the provided content.

7. Pass the name of the created email CMS block to your development team to add to the respective Twig email template.

{% info_block warningBox "Note" %}

You don’t need to activate the email CMS block, as the deactivated status of the email CMS block does not prevent emails from being sent.

{% endinfo_block %}


## Edit an email CMS block

1. On the **Overview of CMS Blocks**, click **Edit Block** next to the email block you want to edit.

2. On the **Edit CMS Block** page, select a **TEMPLATED**.

3. Enter a **NAME**.

4. If you update the **NAME**, pass it to your development team to update the name of the respective [email template](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html).

5. Click **Save**.

The page refreshes with a success message displayed.


## Editing content of email CMS blocks

To edit the content of an Email CMS block:
1. Next to the email CMS block you want to edit click **Edit Placeholder**.

2. On the **Edit Block Glossary** page, update the content of the email CMS block. You can use plain text to create content of the emails, or apply glossary keys and variables. See **Tips and tricks** for details.

{% info_block warningBox "Note" %}

Content Items are not rendered in emails.

{% endinfo_block %}

3. Select **Save**.
The page refreshed displaying the message about the successful update.

**Tips and tricks**

* Add a [glossary key](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/glossary/managing-glossary.html) to the email CMS block. When the email is sent, the key is replaced with the translation you defined for the locale selected by the customer. To learn how to add translations, see [Managing glossary](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/glossary/managing-glossary.html)

* Add variables to the email CMS block to replace them with customer and order specific details. When the email is sent, the variables are replaced with the actual details. For example, add *firstName*, and it is replaced with the name of the customer the email is sent to. A developer can provide a full list of variables and create new ones.



### Reference information: Edit email CMS blocks

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
