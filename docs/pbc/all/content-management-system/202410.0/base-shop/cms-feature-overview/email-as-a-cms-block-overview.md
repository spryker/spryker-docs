---
title: Email as a CMS block overview
description: An overview guide that explains the Spryker Cloud Commerce OS Emails as CMS block and how to create emails through this functionality.
last_updated: Mar 25, 2024
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/email-as-a-cms-block-overview
originalArticleId: a986b331-c2dd-4a91-be52-fabd837fd493
redirect_from:
  - /2021080/docs/email-as-a-cms-block-overview
  - /2021080/docs/en/email-as-a-cms-block-overview
  - /docs/email-as-a-cms-block-overview
  - /docs/en/email-as-a-cms-block-overview
  - /docs/scos/user/features/202311.0/cms-feature-overview/email-as-a-cms-block-overview.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html
---

Back Office users can manage the content of emails sent to customers through [CMS Blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html) in the Back Office. To use a CMS Block as an email, the Back Office user applies an email template.


## Types of email templates
There are two types of emails used to manage CMS Blocks as emails: CMS Block email template and the actual email template.


## CMS block email template
*CMS Block email template* is a [Twig](/docs/scos/dev/sdk/twig-and-twigextension.html) file that defines the design and layout of CMS Block in a way suitable for using it as an email.
The following CMS Block email templates are available by default:

* HTML email template with header and footer.
* Text email template with header and footer.
* Empty email template.

To learn how a Back Office User applies a CMS Block email template, see [Create email CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-email-cms-blocks.html).

A Developer can create more CMS Block email templates.


## Email template
*Email Template* is a Twig file that defines the content of a system email sent to customers. You can edit the template by editing the assigned Email CMS Block in the Back Office.


### Naming of email CMS blocks
Being a multi-purpose entity, CMS Blocks relies strongly on its naming when used as an email. The CMS Block name defines the email template it is assigned to.


#### Template assignment
When a developer creates an email template, inside the file, they enter the CMS Block's name, which is assigned to the template. If the name of an Email CMS Block changes, a developer must update it in the respective email template. For example, the `availability-notification-subscription--html` Email CMS Block is assigned to the [subscribed.html.twig](https://github.com/spryker-shop/suite/blob/master/src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/subscribed.html.twig) default email template.


#### Email format
There are two email formats by default: HTML and pure text. The format of the [default email templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html) is identified by one of the respective tales in the name of an Email CMS Block: `--html` or `--text`. For example, Email CMS Blocks with the following names are assigned to the customer registration email template:

* `customer-registration--html`
* `customer-registration--text`

The email format itself is defined on the code level, the tales serving as identifiers. If you create new email templates, you don’t have to add them to their Email CMS Block names.


### Default email templates
There is a number of email templates with the respective Email CMS Blocks available in the Demo Shops.

The following table contains the list of the default email templates, their Email CMS Blocks, and their purpose.

<details><summary>Default email templates</summary>

| WHEN THE EMAIL IS SENT                                                                                                       | EMAIL CMS BLOCK NAME                                                               | TWIG TEMPLATE                                                                                                                                                                             |
|-----------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Customer registered in the shop.                                                                                             | customer-registration--html                                                        | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_registration.html.twig                                                                                                       |
| Customer registered in the shop.                                                                                             | customer-registration--text                                                        | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_registration.html.twig                                                                                                       |
| Customer confirmed the email address by clicking the link in the registration email.                                                     | customer-registration_token--html                                                  | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_registration_token.html.twig                                                                                                 |
| Customer confirmed the email address by clicking the link in the registration email.                                                     | customer-registration_token--text                                                  | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_registration_token.text.twig                                                                                                 |
| Customer submitted the password change form.                                                                                 | customer-restore-password--html                                                    | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_restore_password.html.twig                                                                                                   |
| Customer submitted the password change form.                                                                                 | customer-restore-password--text                                                    | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_restore_password.text.twig                                                                                                   |
| Customer clicked the password change link in the email and set up a new password.                                            | customer-restored-password-confirmation--html                                      | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_reset_password_confirmation.html.twig                                                                                        |
| Customer clicked the password change link in the email and set up a new password.                                            | customer-restored-password-confirmation--text                                      | Customer/src/Spryker/Zed/Customer/Presentation/Mail/customer_reset_password_confirmation.text.twig                                                                                        |
| Customer subscribed to a newsletter.                                                                                         | newsletter-subscribed--html                                                        | Newsletter/src/Spryker/Zed/Newsletter/Presentation/Mail/subscribed.html.twig                                                                                                              |
| Customer subscribed to a newsletter.                                                                                         | newsletter-subscribed--text                                                        | Newsletter/src/Spryker/Zed/Newsletter/Presentation/Mail/subscribed.text.twig                                                                                                              |
| Customer unsubscribed from a newsletter.                                                                                     | newsletter-unsubscribed--html                                                      | Newsletter/src/Spryker/Zed/Newsletter/Presentation/Mail/unsubscribed.html.twig                                                                                                            |
| Customer unsubscribed from a newsletter.                                                                                     | newsletter-unsubscribed--text                                                      | Newsletter/src/Spryker/Zed/Newsletter/Presentation/Mail/unsubscribed.text.twig                                                                                                            |
| Order was placed successfully.                                                                                          | order-confirmation--html                                                           | Oms/src/Spryker/Zed/Oms/Presentation/Mail/order_confirmation.html.twig                                                                                                                    |
| Order was placed successfully.                                                                                          | order-confirmation--text                                                           | Oms/src/Spryker/Zed/Oms/Presentation/Mail/order_confirmation.text.twig                                                                                                                    |
| Order was shipped.                                                                                                      | order-shipped--html                                                                | Oms/src/Spryker/Zed/Oms/Presentation/Mail/order_shipped.html.twig                                                                                                                         |
| Order was shipped.                                                                                                      | order-shipped--text                                                                | Oms/src/Spryker/Zed/Oms/Presentation/Mail/order_shipped.text.twig                                                                                                                         |
| Customer invited a new company user. The invited user receives the email.                                                | company-user-invitation--html                                                      | CompanyUserInvitation/src/Spryker/Zed/CompanyUserInvitation/Presentation/Mail/invitation.html.twig                                                                                        |
| Customer invited a new company user. The invited user receives the email.                                                | company-user-invitation--text                                                      | CompanyUserInvitation/src/Spryker/Zed/CompanyUserInvitation/Presentation/Mail/invitation.text.twig                                                                                        |
| Company’s status changed.                                                                                                | company-status--html                                                               | CompanyMailConnector/src/Spryker/Zed/CompanyMailConnector/Presentation/Mail/company_status.html.twig                                                                                      |
| Company’s status changed.                                                                                                | company-status--text                                                               | CompanyMailConnector/src/Spryker/Zed/CompanyMailConnector/Presentation/Mail/company_status.text.twig                                                                                      |
| Customer subscribed to notifications about product availability.                                                         | availability-notification-subscription--html                                       | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/subscribed.html.twig                                                                                  |
| Customer subscribed to notifications about product availability.                                                         | availability-notification-subscription--text                                       | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/subscribed.text.twig                                                                                  |
| Customer unsubscribed from notifications about product availability.                                                     | availability-notification-unsubscribed--html                                       | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/unsubscribed.html.twig                                                                                |
| Customer unsubscribed from notifications about product availability.                                                     | availability-notification-unsubscribed--text                                       | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/unsubscribed.text.twig                                                                                |
| A product that was unavailable becomes available. Customers who subscribed to availability notifications receive the email. | availability-notification--html                                                    | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/notification.html.twig                                                                                |
| A product that was unavailable becomes available. Customers who subscribed to availability notifications receive the email. | availability-notification--text                                                    | AvailabilityNotification/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail/notification.text.twig                                                                                |
| Back Office user submitted the password change form.                                                                         | restore-password--html                                                             | AuthMailConnector/src/Spryker/Zed/AuthMailConnector/Presentation/Mail/restore_password.html.twig                                                                                          |
| Back Office user submitted the password change form.                                                                         | restore-password--text                                                             | AuthMailConnector/src/Spryker/Zed/AuthMailConnector/Presentation/Mail/restore_password.text.twig                                                                                          |
| Gift Card was delivered to a customer.                                                                                  | gift-card-delivery--html                                                           | GiftCardMailConnector/src/Spryker/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_delivery.html.twig                                                                                |
| Gift Card was delivered to a customer.                                                                                  | gift-card-delivery--text                                                           | GiftCardMailConnector/src/Spryker/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_delivery.text.twig                                                                                |
| Customer used a gift card.                                                                                                   | gift-card-usage--html                                                              | GiftCardMailConnector/src/Spryker/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_usage.html.twig                                                                                   |
| Customer used a gift card.                                                                                                   | gift-card-usage--text                                                              | GiftCardMailConnector/src/Spryker/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_usage.text.twig                                                                                   |
| Merchant relation request was created.                                                                                        | cms-block-email--merchant_notification_of_merchant_relation_request_creation--html | MerchantRelationRequestMerchantPortalGui/src/Spryker/Zed/MerchantRelationRequestMerchantPortalGui/Presentation/Mail/merchant_notification_of_merchant_relation_request_creation.html.twig |
| Merchant relation request was created.                                                                                        | cms-block-email--merchant_notification_of_merchant_relation_request_creation--text | MerchantRelationRequestMerchantPortalGui/src/Spryker/Zed/MerchantRelationRequestMerchantPortalGui/Presentation/Mail/merchant_notification_of_merchant_relation_request_creation.text.twig |
| Merchant relation request status was changed.                                                                           | cms-block-email--merchant_relation_request_status_change--html                     | MerchantRelationRequest/src/Spryker/Zed/MerchantRelationRequest/Presentation/Mail/merchant_relation_request_status_change.html.twig                                                       |
| Merchant relation request status was changed.                                                                           | cms-block-email--merchant_relation_request_status_change--text                     | MerchantRelationRequest/src/Spryker/Zed/MerchantRelationRequest/Presentation/Mail/merchant_relation_request_status_change.text.twig                                                       |
| Merchant relation was deleted.                                                                                          | cms-block-email--merchant_relationship_delete--html                                | MerchantRelationship/src/Spryker/Zed/MerchantRelationship/Presentation/Mail/merchant_relationship_delete.html.twig                                                                        |
| Merchant relation was deleted.                                                                                          | cms-block-email--merchant_relationship_delete--text                                | MerchantRelationship/src/Spryker/Zed/MerchantRelationship/Presentation/Mail/merchant_relationship_delete.text.twig                                                                        |

</details>

To learn how a Back Office User manages the content of email templates by editing Email CMS Block, see [Edit placeholders in CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/edit-placeholders-in-cms-blocks.html).

After creating email templates, a developer can [import](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block.csv.html) their assigned Email CMS Blocks. See [an example of the import file](https://github.com/spryker-shop/suite/blob/master/data/import/common/common/cms_block.csv) with the Email CMS Blocks in Spryker Master Suite.

## Email content

When [editing an email template using email CMS block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/edit-placeholders-in-cms-blocks.html), you work in the WYSIWYG editor. Apart from the regular WYSIWYG editor tools, you can add glossary keys and variables.

You can use the functionalities described in this section, regardless of the email format.

### Glossary keys in email templates

You can add [glossary keys](/docs/pbc/all/miscellaneous/{{page.version}}/manage-in-the-back-office/add-translations.html) directly to email templates, and the respective translations are fetched automatically. When an email with a glossary key is sent, the key is replaced with the translation you defined for the locale selected by the customer. For example, you add the `cart.price.grand.total` glossary key to an email template. When the email is sent to the customer with the `de_DE` locale, the key is replaced with Summe.

To learn how a Back Office User creates translations, see [Managing Glossary](/docs/pbc/all/miscellaneous/{{page.version}}/manage-in-the-back-office/add-translations.html).

### Variables in Email Templates

Also, you can use variables to adjust details like a customer name in the emails automatically. For example, if you add the `firstName` variable, when the email is sent, the variable is replaced with the first name of the customer it is sent to. Unlike glossary keys, variables are defined on the code level, namely in the transfer object definition.  

A developer can provide a full list of variables and create new ones.

### Content items in email templates

The CMS capability in Spryker lets you add [content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html) into CMS Blocks. Unlike the regular CMS Blocks, the Email CMS Blocks do not support content items. If you insert one, its content is not rendered when the email is sent.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create email CMS Blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-email-cms-blocks.html)  |
