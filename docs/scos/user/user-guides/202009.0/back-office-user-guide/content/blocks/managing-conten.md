---
title: Managing content of emails via CMS blocks
originalLink: https://documentation.spryker.com/v6/docs/managing-content-of-emails-via-cms-blocks
redirect_from:
  - /v6/docs/managing-content-of-emails-via-cms-blocks
  - /v6/docs/en/managing-content-of-emails-via-cms-blocks
---

You can manage the content of emails you send to customers by editing [email templates via CMS Blocks](https://documentation.spryker.com/docs/email-as-a-cms-block-feature-overview). 

There is a number of default emails that are automatically sent on different occasions like customer registration or order shipment. You can change the default emails by editing their email templates via respective CMS Blocks. See [Default Email Templates](https://documentation.spryker.com/docs/email-as-a-cms-block-feature-overview#default-email-templates) for the full list of the emails with their Email CMS Blocks.

To start managing the content of emails, go to **Content > Blocks**.

***

## Creating an Email CMS Block
If your development team has introduced a new email for your project, you have to create an email CMS Block for it.

{% info_block infoBox "Info" %}

You don’t need to create new email CMS Blocks for the [default email templates](https://documentation.spryker.com/docs/email-as-a-cms-block-feature-overview#default-email-templates), instead, you edit the available email CMS Blocks to adjust them to your needs.

{% endinfo_block %}

To create an email CMS Block:

1. On the *Overview of CMS Blocks* page, select **+ Create block**. 
2. On the *Create CMS block* page, select a **Template**.
3. Enter a **Name**.
4. Click **Save**. This saves your block and takes you to the 
page.

{% info_block infoBox "Info" %}

On the *Create CMS block* page, you can ignore all the other fields, including the **Store Relation**, as they do not affect the behavior of the email templates.

{% endinfo_block %}
5. Enter the content of your email for all the locales. 

{% info_block warningBox "Content items" %}


Content Items are not rendered in emails.

{% endinfo_block %}

6. Click **Save**. This populates your email template with the provided content.

7. Pass the name of the created Email CMS Block to your development team to add to the respective .twig email template.

{% info_block warningBox "Note" %}

You don’t need to activate the email CMS Block, as the deactivated status of the email CMS Block does not prevent emails from being sent. 

{% endinfo_block %}

## Viewing Email CMS Blocks
You can view an Email CMS block like a regular CMS block. See [Viewing CMS Blocks](https://documentation.spryker.com/docs/managing-cms-blocks#viewing-cms-blocks) for details.


## Editing Email CMS Blocks
To edit an email CMS block:

1. On the *Overview of CMS Blocks* page in the *Actions* column, select **Edit Block** next to the block you want to update.

2. On the *Edit CMS Block: {Block ID}* page, you can update the **Name** or choose a different **Template**.

{% info_block warningBox "Note" %}

If you updated the **name**, pass it to your development team to update the name of the respective [.twig email template](https://documentation.spryker.com/docs/en/email-as-a-cms-block-feature-overview#cms-block-email-template). 

{% endinfo_block %}

3. Click Save.
The page refreshes, displaying the message about the successful update of the Email CMS Block.


## Editing Content of Email CMS Blocks
To edit the content of an Email CMS Block:

1. In the *Actions* column of the *Overview of CMS Blocks* page, select **Edit Placeholder** next to the Email CMS Block you want to update.

2. On the *Edit Block Glossary: {Block ID}* page, update the content of the email CMS block. You can use plain text to create content of the emails, or apply glossary keys and variables. See **Tips & Tricks** for details.

{% info_block warningBox "Content items" %}

Content Items are not rendered in emails.

{% endinfo_block %}

3. Select **Save**. 
The page refreshed displaying the message about the successful update. 


#### Tips & Tricks

* Add a [glossary key](https://documentation.spryker.com/docs/en/glossary-creation) to the Email CMS Block. When the email is sent, the key is replaced with the translation you defined for the locale selected by the customer. See [Managing Glossary](https://documentation.spryker.com/docs/managing-glossary#managing-glossary) to learn how to add translations.

* Add variables to the Email CMS Block to replace them with customer and order specific details. When the email is sent, the variables are replaced with the actual details. For example, add *firstName*, and it is replaced with the name of the customer the email is sent to. A Developer can provide a full list of variables and create new ones.

**What's next?**

* To learn about the attributes on this page, see [CMS Block: Reference Information](https://documentation.spryker.com/docs/cms-block-reference-information).
