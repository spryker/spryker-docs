---
title: GDPR compliance guidelines
description: A helpful guide on making your Spryker project compliant with the General Data Protection Regulation (GDPR).
last_updated: March 1, 2024
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/guidelines-for-new-gdpr-rules
originalArticleId: 256c82f9-5bae-4788-ab23-1ed7398edb1a
redirect_from:
- /docs/scos/user/intro-to-spryker/support/guidelines-for-new-gdpr-rules.html
---

This document describes how to comply with GDPR rules when running applications based on Spryker Services.

The General Data Protection Regulation (GDPR) is a set of rules related to the processing of personal data, see [Document 32016R0679](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:32016R0679).

Because Spryker doesn't have complete access to customer implementations and has no control over systems that are implemented and deployed, Spryker provides partial aid with regard to GDPR compliance. To support you in implementing applications in a GDPR compliant manner, we provide features like account deletion or consent withdrawal. Because we have no control of whether these features and any further compliance steps are implemented, the GDPR compliance of each application is the respective customer’s responsibility.

In terms of functionality, compliance is supported, for example, through a customer’s ability to delete or allow deletion of account information and allow subscription or unsubscription to newsletters. Shop owners can delete customer accounts through the Back Office. These actions don't affect billing and order-related information. Account deletion anonymizes customer information and address data but keeps the relevant transaction details.

The following guidelines describe how to make your Spryker projects compliant in the context of Spryker functionality. The guidelines don't replace official legal consulting, which we advise taking for each company. If your project has third-party and own integrations with infrastructure, like database, log files, CRM, or mail providers, you need to oversee GDPR compliance of those connections too.

|  WHAT TO DO | HOW | WHEN |
| --- | --- | --- |
|  Collect only what you need. | <ul><li>Only ask customers for the data necessary for processing a request. Avoid collecting as much as you can without a reason.</li><li> Review your forms, such as registration forms, subscription forms, contact forms, log files, and third-party integrations. Assess if you can justify each piece of information you collect.</li></ul> | During project implementation and before going live. Reassess regularly. |
|  Explain why the information collected is necessary.     | Review your data privacy statement, terms and conditions, newsletter subscription conditions, and promo campaign conditions. Tips: Explain why certain data is needed to be collected in simple language. Avoid very long texts. | During the project implementation and before going live. Reassess regularly. |
| Get customer consent.                    | Replace preselected checkboxes to accept newsletter subscriptions with empty checkboxes. Inform yourself about local specifics regarding requirements on how to make privacy policies and terms and conditions available. Offer a double opt-in process for newsletter subscription or other kinds of registration—for example, account or loyalty program. | Double opt-in functionality is shipped by default for the newsletter subscription. Take all other measures during the project implementation and before going live. |
| Enable customers to withdraw consent.              | Use the consent withdrawal feature for newsletter subscriptions. The *Delete Account* feature is shipped by default to handle data privacy. Without agreeing to terms, customers can't use the website. Add options to unsubscribe from newsletters and to delete email address and other personal data from the database. | The Delete Account feature is shipped by default. Take all other measures during the project implementation and before going live. |
| Enable customers to get the copy of personal data in a readable format: PDF or text file. | Offer a *Copy of all data* feature, which provides information from all data sources: Spryker, CRM, log files, third-party applications. Spryker has a **User Account** page that shows the customer information: profile, orders, preferences. The information on this page can be saved as a PDF file and shared upon request. | The *User Accounts* feature is shipped by default. Take all other measures during the project implementation and before going live. |
| Enable customers to delete personal data.              | Use the Delete Account feature to anonymize customer information. Some information needs to be kept for other reasons: transactional information or order information for fiscal authorities. Review and establish an unsubscribe option that deletes the email address from the respective database. Add an unsubscribe link to email communication. | The *Delete Account* feature is shipped by default. Take all other measures during the project implementation and before going live. |
| Control third-party integration permissions and data collection | Offer an option to review and revoke access for third-party integrations, like social media and payment providers. Review the data shared with third parties and make sure it is reflected and represented in privacy policies and terms of service. For example, the IP address for the third-party payment provider integration. Check all existing Data Processing Agreements for validity. | During the project implementation and before going live. |
