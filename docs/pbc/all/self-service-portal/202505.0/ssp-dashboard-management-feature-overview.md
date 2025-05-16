---
title: Self-Service Portal Dashboard Management feature overview
description: View key metrics, assets, inquiries, and services in a role-based dashboard for company users, accessible from the storefront's customer account menu.
template: concept-topic-template
last_updated: Apr 10, 2025
---


{% info_block warningBox %}

Self-Service Portal is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}


The Dashboard provides company users with a consolidated view of key metrics, assets, inquiries, services, and other relevant information.

Dashboard access is role-based, meaning each user can see the data they're authorized to access.

On the Storefront, company users can access the dashboard in the customer account menu. It consists of the following blocks:


| Block                          | Description                                                                                                  |
|----------------------------------|--------------------------------------------------------------------------------------------------------------|
| Welcome                          | Personalized greeting showing the user's name, company name, and business unit.                             |
| Overview                         | Snapshot of key metrics such as asset count, pending inquiries, and upcoming services.                      |
| Customer service representative  | Contact details, such as name, photo, methods for the user's assigned CSR.                                         |
| Assets                           | List of the user's assets with clickable links to asset details.                                            |
| Files                            | List of files with download options.                                                                         |
| Inquiries                        | Status tracking for user inquiries, including a table of inquiry details.                                    |
| Services                         | List of upcoming services with access to related information.                                                |
| Promo                            | Promotional content such as special offers and upcoming events.                                              |
| Access control | Company admins can configure visibility and access control for different user roles based on permissions. |


For the customer service representative block, you can assign a representative per business unit in the **Content** > **Blocks** section of the Back Office. If no business unit-specific block is defined, a default block named `sales_rep:default` is displayed.

<!-- The block name structure is business unit-specific like `sales_rep:company_unit:12` where 12 is the ID of the respective business unit. Go to Customers > Company Units to find the relevant ID in the table. -->

## Related Developer documents

| INSTALLATION GUIDES |
| - |
| [Install the SSP Service Management feature](/docs/pbc/all/self-service-portal/202505.0/install/install-the-ssp-dashboard-management-feature.html) |
