---
title: Email as a CMS block
originalLink: https://documentation.spryker.com/v6/docs/email-as-a-cms-block
redirect_from:
  - /v6/docs/email-as-a-cms-block
  - /v6/docs/en/email-as-a-cms-block
---

Back Office Users can manage the content of emails sent to customers through [CMS Blocks](https://documentation.spryker.com/docs/cms-block) in the Back Office. To use a CMS Block as an email, the Back Office user applies an email template.


## Types of Email Templates
There are two types of emails used to manage CMS Blocks as emails: CMS Block email template and the actual email template. 


## CMS Block Email Template
*CMS Block email template* is a [Twig](https://documentation.spryker.com/docs/twig-and-twig-extension) file that defines the design and layout of CMS Block in a way suitable for using it as an email.
The following CMS Block email templates are available by default:

* *HTML email template with header and footer*
* *Text email template with header and footer*
* *Empty email template*

See [Creating an Email CMS Block](https://documentation.spryker.com/v6/docs/managing-content-of-emails-via-cms-blocks#creating-an-email-cms-block) to learn how a Back Office User applies a CMS Block email template.

A Developer can create more CMS Block email templates.

 
## Email Template
*Email Template* is a Twig file that defines the content of a system email sent customers. You can edit the template by editing the assigned Email CMS Block in the Back Office. 


### Naming of Email CMS Blocks
Being a multi-purpose entity, CMS Blocks relies strongly on its naming when used as an email. The CMS Block name defines the email template it is assigned to. 


#### Template Assignment 
When a developer creates an email template, inside the file, they enter the name of the CMS Block, which is assigned to the template. If the name of an Email CMS Block changes, a developer should update it in the respective email template. For example, the *availability-notification-subscription--html* Email CMS Block is assigned to the [subscribed.html.twig](https://github.com/spryker-shop/suite/blob/master/src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/subscribed.html.twig) default email template.


#### Email Format 
There are two email formats by default: HTML and pure text. The format of the [default email templates](https://documentation.spryker.com/docs/email-as-a-cms-block-feature-overview#default-email-templates) is identified by one of the respective tales in the name of an Email CMS Block: *--html* or *--text*. For example, Email CMS Blocks with the following names are assigned to the customer registration email template:

* customer-registration--html
* customer-registration--text

The email format itself is defined on the code level, the tales serving as identifiers. If you create new email templates, you don’t have to add them to their Email CMS Block names. 


### Default Email Templates
There is a number of email templates with the respective Email CMS Blocks available in the [Spryker Demo Shops](https://documentation.spryker.com/docs/en/about-spryker#spryker-b2b-b2c-demo-shops). 

The table below contains the list of the default email templates, their Email CMS Blocks, and purpose.

<details open>
    <summary>Default email templates</summary>

| When an email is sent | Email CMS Block name | Twig template |
| --- | --- | --- |
| Customer registered in the shop | customer-registration--html | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_registration.html.twig |
| Customer registered in the shop | customer-registration--text | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_registration.html.twig |
| Customer confirmed email by clicking the link in the registration email | customer-registration_token--html | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_registration_token.html.twig |
| Customer confirmed email by clicking the link in the registration email | customer-registration_token--text | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_registration_token.text.twig |
| Customer submitted the password change form | customer-restore-password--html | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_restore_password.html.twig |
| Customer submitted the password change form | customer-restore-password--text | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_restore_password.text.twig |
| Customer clicked the password change link in the email and set up a new password | customer-restored-password-confirmation--html | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_reset_password_confirmation.html.twig |
| Customer clicked the password change link in the email and set up a new password | customer-restored-password-confirmation--text | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_reset_password_confirmation.text.twig |
| Customer subscribed to a newsletter | newsletter-subscribed--html | Newsletter/src/Spryker/Zed/Newsletter/Presentation/Mail/subscribed.html.twig |
| Customer subscribed to a newsletter | newsletter-subscribed--text | Newsletter/src/Spryker/Zed/Newsletter/Presentation/Mail/subscribed.text.twig |
| Customer unsubscribed from a newsletter | newsletter-unsubscribed--html | Newsletter/src/Spryker/Zed/Newsletter/Presentation/Mail/unsubscribed.html.twig |
| Customer unsubscribed from a newsletter | newsletter-unsubscribed--text | Newsletter/src/Spryker/Zed/Newsletter/Presentation/Mail/unsubscribed.text.twig |
| Order has been placed successfully | order-confirmation--html | Oms/src/Spryker/Zed/Oms/Presentation/Mail/order_confirmation.html.twig |
| Order has been placed successfully | order-confirmation--text | Oms/src/Spryker/Zed/Oms/Presentation/Mail/order_confirmation.text.twig |
| Order has been shipped | order-shipped--html | Oms/src/Spryker/Zed/Oms/Presentation/Mail/order_shipped.html.twig |
| Order has been shipped | order-shipped--text | Oms/src/Spryker/Zed/Oms/Presentation/Mail/order_shipped.text.twig |
| Customer has invited a new Company User. The invited user receives the email | company-user-invitation--html | CompanyUserInvitation/src/Spryker/Zed/CompanyUserInvitation/Presentation/Mail/invitation.html.twig |
| Customer has invited a new Company User. The invited user receives the email | company-user-invitation--text | CompanyUserInvitation/src/Spryker/Zed/CompanyUserInvitation/Presentation/Mail/invitation.text.twig |
| Company’s status has changed | company-status--html | CompanyMailConnector/src/Spryker/Zed/CompanyMailConnector/Presentation/Mail/company_status.html.twig |
| Company’s status has changed | company-status--text | CompanyMailConnector/src/Spryker/Zed/CompanyMailConnector/Presentation/Mail/company_status.text.twig |
| Customer subscribed to notifications about the product availability | availability-notification-subscription--html | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/subscribed.html.twig |
| Customer subscribed to notifications about the product availability | availability-notification-subscription--text | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/subscribed.text.twig |
| Customer unsubscribed from notifications about the product availability | availability-notification-unsubscribed--html | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/unsubscribed.html.twig |
| Customer unsubscribed from notifications about the product availability | availability-notification-unsubscribed--text | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/unsubscribed.text.twig |
| A product that was unavailable, becomes available. Customers who subscribed to availability notifications receive the email | availability-notification--html | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/notification.html.twig |
| A product that was unavailable, becomes available. Customers who subscribed to availability notifications receive the email | availability-notification--text | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/notification.text.twig |
| Back Office User submitted the password change form | restore-password--html | AuthMailConnector/src/Spryker/Zed/AuthMailConnector/Presentation/Mail/restore_password.html.twig |
| Back Office User submitted the password change form | restore-password--text | AuthMailConnector/src/Spryker/Zed/AuthMailConnector/Presentation/Mail/restore_password.text.twig |
| Gift Card has been delivered to a customer | gift-card-delivery--html | GiftCardMailConnector/src/Spryker/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_delivery.html.twig |
| Gift Card has been delivered to a customer | gift-card-delivery--text | GiftCardMailConnector/src/Spryker/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_delivery.text.twig |
| Customer used a gift card | gift-card-usage--html | GiftCardMailConnector/src/Spryker/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_usage.html.twig |
| Customer used a gift card | gift-card-usage--text | GiftCardMailConnector/src/Spryker/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_usage.text.twig |

</details>
    
See [Managing Content of Emails via CMS Blocks](https://documentation.spryker.com/docs/managing-content-of-emails-via-cms-blocks) to learn how a Back Office User manages the content of email templates by editing Email CMS Blocks.

After creating email templates, a developer can [import](https://documentation.spryker.com/docs/file-details-cms-blockcsv#file-details--cms_block-csv) their assigned Email CMS Blocks. See [example of the import file](https://github.com/spryker-shop/suite/blob/master/data/import/common/common/cms_block.csv) with the Email CMS Blocks in Spryker Master Suite.

## Email Content

When [editing an email template via Email CMS Block](https://documentation.spryker.com/docs/managing-content-of-emails-via-cms-blocks#editing-email-cms-blocks), you work in the [WYSIWYG editor](https://documentation.spryker.com/docs/wysiwyg-editor). Apart from the regular WYSIWYG editor tools, you can add glossary keys and variables.

You can use the functionalities described in this section, regardless of the email format. 

### Glossary Keys in Email Templates

You can add [glossary keys](https://documentation.spryker.com/docs/en/glossary-creation) directly to email templates, and the respective translations are fetched automatically. When an email with a glossary key is sent, the key is replaced with the translation you defined for the locale selected by the customer. For example, you add the *cart.price.grand.total* glossary key to an email template. When the email is sent to the customer with de_DE locale, the key is replaced with Summe. 

See [Managing Glossary](https://documentation.spryker.com/docs/managing-glossary#managing-glossary) to learn how a Back Office User creates translations.

### Variables in Email Templates

Also, you can use variables to automatically adjust details like customer name in the emails. For example, if you add the *firstName* variable, when the email is sent, the variable is replaced with the first name of the customer it is sent to. Unlike glossary keys, variables are defined on the code level, namely in the transfer object definition.  

A developer can provide a full list of variables and create new ones. 

### Content Items in Email Templates

The CMS capability in Spryker allows you to add [content items](https://documentation.spryker.com/docs/content-items-feature-overview) into CMS Blocks. Unlike the regular CMS Blocks, the Email CMS Blocks do not support content items. If you insert one, its content is not rendered when the email is sent. 


## If you are:
<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/cms-feature-integration-guide" class="mr-link">Enable email as a CMS block in your project by integrate the CMS feature</a></li>
    </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/v6/docs/managing-content-of-emails-via-cms-blocks" class="mr-link">Manage content of emails via CMS Blocks</a></li>
            </ul>
        </div>  
</div>
</div>
