---
title: Guidelines for new GDPR rules
originalLink: https://documentation.spryker.com/2021080/docs/guidelines-for-new-gdpr-rules
redirect_from:
  - /2021080/docs/guidelines-for-new-gdpr-rules
  - /2021080/docs/en/guidelines-for-new-gdpr-rules
---

{% info_block errorBox %}

This article conforms the [DSGVO](https://de.wikipedia.org/wiki/Datenschutz-Grundverordnung){target="_blank"} and [RGPD](https://fr.wikipedia.org/wiki/R%C3%A8glement_g%C3%A9n%C3%A9ral_sur_la_protection_des_donn%C3%A9es){target="_blank"} rules.

{% endinfo_block %}

As of May the 25th, 2018, the new General Data Protection Regulations (GDPR) take effect. This document describes how the Spryker Commerce OS is compliant with the GDPR.

GDPR is a set of rules related to the protection and control of personal data. 
For more information about GDPR, see:

* [GDPR official site](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32016R0679)
* [GDPR summary](https://gdpr-info.eu/)

In terms of functionality, compliance is established through a customer’s ability to delete their account information and subscribe or unsubscribe to newsletters. Shop owners can delete customer accounts through the Back Office. In both cases, these actions do not affect billing and order related information. Account deletion anonymizes customer information and address data but keeps the relevant transaction details.

However, Spryker has no complete access to customer implementations and has no control systems that are implemented and deployed. Therefore, we can only provide partial aid with GDPR compliance by providing features (like account deletion or consent withdrawal) to support customers becoming GDPR compliant.

To support our customers, we compiled a few notes and guidelines that can help. This information does not replace  official legal consulting, which we advise to take for each company. Moreover, all the customers that use third-party and own integrations with their infrastructure (database, log files, CRM, mail providers), need to oversee GDPR compliance of those connections too.

## General e-commerce guidelines

|  What to do | How | When |
| --- | --- | --- |
|  1. Collect only what you need. | <ul><li>Only ask customers for the data necessary for processing a request. Avoid collecting as much as you can without a reason.</li><li> Review your forms, such as registration forms, subscription forms, contact forms, log files, and third-party integrations. Assess if you can justify each piece of information you collect.</li> | During project implementation and before going live. For live projects, assess, evaluate and implement changes before May the 25th, 2018. |
|  2. Explain why the information collected is necessary.     | Review your data privacy statement, terms & conditions, newsletter subscription conditions, and promo campaign conditions. Tips: Explain why certain data is needed to be collected in simple language. Avoid very long texts. | During the Project implementation process and before going live with your project. For live projects, assess, evaluate and implement changes before May the 25th, 2018. |
|                   3. Get customer consent                    | Replace preselected checkboxes to accept T&C, data privacy, newsletter subscription etc. with empty checkboxes. Offer a double opt-in process for newsletter subscription or other kinds of registration (e.g. account, loyalty program) | Double Opt-in functionality is an out-of-the-box feature for the newsletter subscription. All other measures should be taken during the Project implementation process and before going live with your project. For live projects, assess, evaluate and implement changes before May the 25th, 2018. |
|             4. Allow customers withdraw consent              | Use the consent withdrawal feature for newsletter subscription, data privacy statement etc. Spryker provides a “Delete account” feature for T&C and data privacy, without agreeing to terms there is no way to use the website.Add a checkbox to Unsubscribe from newsletters and to delete an email address from the Database. | Delete Account is an out-of-the-box feature. All other measures should be taken during the Project implementation process and before going live with your project. For live projects, assess, evaluate and implement changes before May the 25th, 2018. |
| 5. Allow customers get the copy of personal data in a readable form (PDF, text file) | Offer a *Copy of all data* feature which includes information from all data sources (Spryker, CRM, log files, 3rd-party applications). Spryker has a **User Account **page that shows the customer information: profile, orders, preferences. The information on this page can be saved as a PDF file and shared upon request. | User Accounts is an out-of-the-box feature. All other measures should be taken during the Project implementation process and before going live with your project. For live projects, assess, evaluate and implement changes before May the 25th, 2018. |
|              6. Allow deletion of personal data              | Use the “Delete Account” feature to anonymize customer information. Some information needs to be kept for other reasons (transactional information, order information for fiscal authorities etc.)Review and establish an Unsubscribe option that will delete the Email address from the respective Database.Add an Unsubscribe link to email communication. | *Delete Account* is an out-of-the-box feature. All other measures should be taken during the Project implementation process and before going live with your project. For live projects, assess, evaluate and implement changes before May the 25th, 2018. |
| 7. Control 3rd Party Integration Permissions and Data Collection | Offer an option to review and revoke access for 3rd-party integrations (Social media, payment providers etc.). Review data which is shared with 3rd-parties and make sure it is reflected and represented in data privacy and T&C (e.g. IP address for 3rd party payment provider integration). Check all existing “General Data Processing Agreements” for validity. | During the Project implementation process and before going live with your project. For live projects, assess, evaluate and implement changes before May the 25th, 2018. *Make sure you have valid "General Data Processing Agreements" with all 3rd party providers. |
