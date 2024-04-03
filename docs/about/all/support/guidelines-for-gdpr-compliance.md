---
title: GDPR guidelines
description: GDPR contains rules relating to the protection and control of personal data.
last_updated: March 1, 2024
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/guidelines-for-new-gdpr-rules
originalArticleId: 256c82f9-5bae-4788-ab23-1ed7398edb1a
redirect_from:
- /docs/scos/user/intro-to-spryker/support/guidelines-for-new-gdpr-rules.html
---

{% info_block errorBox %}

This document conforms to the GDPR.

{% endinfo_block %}

This document describes how the Spryker Services supports GDPR compliance of customers’ applications.

The General Data Protection Regulation (GDPR) is a set of rules related to the processing of personal data, which can be found [here](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:32016R0679)

Since Spryker has no complete access to customer implementations and has no control over systems that are implemented and deployed, Spryker can only provide partial aid with regard to GDPR compliance by providing features (like account deletion or consent withdrawal) to support customers in implementing their applications in a GDPR compliant manner. Please note that the actual GDPR compliance of each customer’s application is that respective customer’s responsibility accordingly.

In terms of functionality, compliance is supported, for example, through a customer’s ability to delete or allow deletion of account information and allow subscription  or unsubscription to newsletters. Shop owners can delete customer accounts through the Back Office. These actions do not affect billing and order-related information. Account deletion anonymizes end-customer information and address data but keeps the relevant transaction details.

To support our customers, Spryker compiled a few notes and guidelines that can help. This information does not replace official legal consulting, which we advise taking for each company. Moreover, all customers, especially those that use third-party and own integrations with their infrastructure (database, log files, CRM, mail providers), need to oversee GDPR compliance of those connections too.

## General GDPR e-commerce guidelines

|  WHAT TO DO | HOW | WHEN |
| --- | --- | --- |
|  1. Collect only what you need. | <ul><li>Only ask customers for the data necessary for processing a request. Avoid collecting as much as you can without a reason.</li><li> Review your forms, such as registration forms, subscription forms, contact forms, log files, and third-party integrations. Assess if you can justify each piece of information you collect.</li></ul> | During project implementation and before going live. Reassess regularly. |
|  2. Explain why the information collected is necessary.     | Review your data privacy statement, terms & conditions, newsletter subscription conditions, and promo campaign conditions. Tips: Explain why certain data is needed to be collected in simple language. Avoid very long texts. | During the Project implementation process and before going live with your project. Reassess regularly. |
| 3. Get customer consent                    | Replace preselected checkboxes to accept newsletter subscription with empty checkboxes. Inform yourself about local specifics regarding requirements on how to make privacy policies and T&C available. Offer a double opt-in process for newsletter subscription or other kinds of registration—for example, account or loyalty program) | Double Opt-in functionality is an out-of-the-box feature for the newsletter subscription. All other measures should be taken during the project implementation process and before going live with your project. |
| 4. Allow customers to withdraw consent              | Use the consent withdrawal feature for newsletter subscription. Spryker provides a Delete Account feature data privacy reasons. Without agreeing to terms there is no way to use the website. Add options to unsubscribe from newsletters and to delete an email address or other personal data from the database. | Delete Account is an out-of-the-box feature. All other measures should be taken during the project implementation process and before going live with your project. |
| 5. Allow customers get the copy of personal data in a readable form (PDF, text file) | Offer a *Copy of all data* feature, which includes information from all data sources (Spryker, CRM, log files, 3rd-party applications). Spryker has a **User Account** page that shows the customer information: profile, orders, preferences. The information on this page can be saved as a PDF file and shared upon request. | *User Accounts* is an out-of-the-box feature. All other measures should be taken during the project implementation process and before going live with your project. |
| 6. Allow deletion of personal data              | Use the Delete Account feature to anonymize customer information. Some information needs to be kept for other reasons (transactional information or order information for fiscal authorities). Review and establish an Unsubscribe option that will delete the email address from the respective database. Add an unsubscribe link to email communication. | *Delete Account* is an out-of-the-box feature. All other measures should be taken during the project implementation process and before going live with your project. |
| 7. Control 3rd Party Integration Permissions and Data Collection | Offer an option to review and revoke access for 3rd-party integrations (social media and payment providers). Review data which is shared with 3rd-parties and make sure it is reflected and represented in privacy policies and T&C—for example, IP address for 3rd party payment provider integration. Check all existing Data Processing Agreements for validity. | During the project implementation process and before going live with your project. |
