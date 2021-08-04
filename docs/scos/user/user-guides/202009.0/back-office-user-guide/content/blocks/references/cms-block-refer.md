---
title: Reference information- CMS block
originalLink: https://documentation.spryker.com/v6/docs/cms-block-reference-information
redirect_from:
  - /v6/docs/cms-block-reference-information
  - /v6/docs/en/cms-block-reference-information
---

This topic contains the reference information for working with CMS Blocks in **Content Management** > **Blocks**.
***
## CMS Blocks Page
On the **Overview of CMS Blocks** page, you see the following:

| Attribute | Description - regular CMS Block | Description - Email CMS Block |
| --- | --- | --- |
| **Block ID** | A sequence number. | A sequence number. |
| **Name** | The name of a CMS block. | The name of a CMS block. <br> This name is used by developers to assign the block to its [.twig email template](https://documentation.spryker.com/docs/email-as-a-cms-block-feature-overview#email-template).
| **Template** | Defines a placeholder structure of the CMS block. | Defines the placeholder structure of the Email CMS block. |
| **Status** | A block status that can be active (visible in the online store) or inactive (invisible in the online store). | Irrelevant. |
| **Stores** | Locale(s) for which the block will visible on the store website. | Irrelevant. |
| **Actions** |A set of actions that can be performed on a CMS block. | A set of actions that can be performed on an Email CMS block. |

On this page, you can also:

* Switch to the page where you can create a new CMS block.
* Sort blocks Block Id, Name, Template, and Status.
* Filter content items by Block Id, Name, and Template.
***
## Create and Edit CMS Block Page
The following table describes the attributes you enter when creating or editing a CMS block.

|Attribute  | Description - regular CMS Block | Description - Email CMS Block |
| --- | --- | --- |
| **Store relation** |  A store locale for which the block will be available. | Irrelevant. |
| **Template** | Defines the layout of the CMS Block. | Defines the layout of the Email CMS Block.
| **Name** | A name of the block. | A name of the block. Should correspond to the name defined in the email template the block is assigned to. |
| **Valid from** and **Valid to** | Dates that specify how long your active block will be visible in the online store. | Irrelevant. |
| **Categories: top** | A block or blocks assigned to a category page.  The block will be displayed on the top of the page. | Irrelevant. |
| **Categories: middle** |  A block or blocks assigned to a category page. The block will be displayed in the middle of the page. | Irrelevant. |
| **Categories: bottom** | A block or blocks assigned to a category page. The block will appear at the bottom of the page. | Irrelevant. |
| **Products** | A block or blocks assigned to a product details page. | Irrelevant. |
***
## View CMS Block page
The following table describes the attributes you see when viewing a CMS block.

| Attribute | Description - regular CMS Block | Description - Email CMS Block |
| --- | --- | --- |
| **General information** | The section provides details regarding the locales for which the block is available, its current status, block template and time period during which it is visible in the online store. | *Template* defines the layout of the Email CMS Block. The rest is irrelevant.  |
| **Placeholders** | The section shows the translation of the block title and content per locale. | Displays the content of placeholders for each locale. |
| **Category list**  | The section contains a list of category pages which the block appears on. | Irrelevant. |
| **Product lists** | The section contains a list of product detail pages which the block appears on. | Irrelevant. |
