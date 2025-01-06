---
title: Create email CMS blocks
description: Learn how to create and implement CMS blocks for email in the Spryker Cloud Commerce OS Back Office.
last_updated: Jun 17, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-content-of-emails-via-cms-blocks
originalArticleId: 082e03b7-4dce-4b06-b839-06e2e26a557b
redirect_from:
  - /2021080/docs/managing-content-of-emails-via-cms-blocks
  - /2021080/docs/en/managing-content-of-emails-via-cms-blocks
  - /docs/managing-content-of-emails-via-cms-blocks
  - /docs/en/managing-content-of-emails-via-cms-blocks
  - /docs/scos/user/back-office-user-guides/202311.0/content/blocks/managing-content-of-emails-via-cms-blocks.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/blocks/create-email-cms-blocks.html
related:
  - title: Email as a CMS block
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html
---

You can manage the content of emails you send to customers by editing [email templates via CMS Blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html).

There is a number of default emails that are automatically sent on different occasions, like customer registration or order shipment. You can change the default emails by editing their email templates via respective CMS blocks. For the full list of the emails with their email CMS blocks, see [Default email templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html).

If a developer introduced a new email for your project, you need to create an email block for it. Blocks for the default email templates are already created, and you can [edit them as regular blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/edit-cms-blocks.html).

## Prerequisites

Review the [reference information](#reference-information-create-an-email-cms-block) before you start or look up the necessary information as you go through the process.

## Create an email CMS block

1. Go to **Content&nbsp;<span aria-label="and then">></span> Blocks**.
2. On the **Overview of CMS Blocks** page, select **Create block**.
3. On the **Create new CMS block** page, select a **TEMPLATE**.
4. Enter a **NAME**.
5. Click **Save**.
    This opens the **Edit CMS Block Glossary** page with a success message displayed.
6. For **CONTENT**, add the content of the email for the needed locales.

{% info_block warningBox "Content items in email blocks" %}

[Content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html) are not rendered in emails.

{% endinfo_block %}

7. Click **Save**.
    This refreshes the page with a success message displayed.

8. Pass the name of the created email CMS block to your development team to add to the respective Twig email template.

{% info_block warningBox "Activating email blocks" %}

You don’t need to activate the email CMS block, as the deactivated status of the email CMS block does not prevent emails from being sent.

{% endinfo_block %}

**Tips and tricks**

* Add a [glossary key](/docs/pbc/all/miscellaneous/{{page.version}}/manage-in-the-back-office/add-translations.html) to the email block. When the email is sent, the key is replaced with the translation you defined for the locale selected by the customer. To learn how to add translations, see [Managing glossary](/docs/pbc/all/miscellaneous/{{page.version}}/manage-in-the-back-office/add-translations.html).

* Add variables to the email CMS block to replace them with customer and order specific details. When the email is sent, the variables are replaced with the actual details. For example, add *firstName*, and it's replaced with the name of the customer the email is sent to. A developer can provide a full list of variables and create new ones.


## Reference information: Create an email CMS block

| ATTRIBUTE | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- |
| STORE RELATION | Irrelevant. |
| TEMPLATE | Defines the layout of the Email CMS Block. A developer can [create more templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#cms-block-template). |
| NAME | The name should correspond to the name defined in the email template the block will be assigned to. |
| VALID FROM and VALID TO | Irrelevant. |
| PRODUCTS | Irrelevant. |
