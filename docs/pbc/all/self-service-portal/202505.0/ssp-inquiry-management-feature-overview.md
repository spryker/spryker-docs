---
title: Self-Service Portal Inquiry Management feature overview
description: Allow customers to submit and track inquiries in a structured way while enabling Back Office users to manage, resolve, and collaborate on customer requests.
template: concept-topic-template
last_updated: Apr 10, 2025
---

{% info_block warningBox %}

Self-Service Portal is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

The Inquiry Management feature allows customers to submit and track different types of inquiries in SSP, providing a structured way to handle and resolve customer requests and claims.

Back Office users can manage inquiries, update statuses, and communicate with customers through an organized workflow.


## Storefront functionalities

- Submit an inquiry with relevant details
- Attach supporting documents and images
- Track the status of submitted inquiries
- Get inquiry resolution details via email

## Back Office functionalities

- View and manage all customer inquiries
- Filter and search inquiries by type, status, or customer
- Update inquiry status and provide resolution details
- Attach internal notes visible only to Back Office users for internal collaboration


## Inquiry types

Inquiry types help categorize and manage customer questions or issues. Each type serves a specific purpose, ensuring inquiries are directed to the right team and handled appropriately.

You can add more inquiry types on the project level.

### General inquiry

Used for non-order and non-asset-related questions. Examples:

- Product information requests
- Shipping policy clarifications
- Account-related questions


### Asset inquiry

Used to ask questions or report problems with a specific asset. Examples:

- Warranty claims
- Malfunctioning or defective product reports
- Asset replacement requests


### Order claim

Used to report issues with orders. Examples:

- Wrong item was received
- Damaged product upon delivery
- Missing items in the shipment


## Inquiry statuses

Inquiry statuses are handled by a dedicated Inquiry State Machine. This state machine contains inquiry-specific statuses and manages transitions according to inquiry type. The state machine is shipped with the following default statuses:


| Status   | Description |
|----------|-------------|
| Pending  | Inquiry was submitted by the customer and is awaiting review. |
| In Review | Inquiry is being evaluated by the customer support team. Additional information may be requested. |
| Approved | Inquiry was accepted and the necessary actions are being taken to resolve it. The customer is notified by email. |
| Rejected | Inquiry was denied, with reasons provided to the customer. The customer is notified by email. |
| Canceled | Inquiry was withdrawn by the customer or customer support team while it was in the Pending state. |


On the project level, the status logic can be customized for each inquiry type. For example, an automatic refund action can be initiated for order claims.


## Permissions

On the Storefront, access to inquiry actions is restricted based on user permissions. By default, users can have the following permissions:


| Permission                    | Description |
|------------------------------|-------------|
| Create inquiries             | Create inquiries and view only your own inquiries. |
| View business unit inquiries | View inquiries submitted by company users within the business unit a user belongs to. |
| View company inquiries       | View inquiries submitted by company users within the company a user belongs to. |




## Inquiry creation on Storefront

Company users can create different types of inquiries as follows:
- General inquiry: Customer Account > Self-Service Portal > Inquires > Create inquiry
- Asset inquiry: Customer Account > Self-Service Portal > Assets > Asset Details page > Create inquiry
- Order claim: Customer Account > Order History > Order Details page > Claim

On the submit inquiry page, the user needs to enter the following details:
- Subject
- Description
- Optional: files

After an inquiry is submitted, the user can find it in Customer Account > Self-Service Portal > Inquires.

The company user can also cancel an inquiry while it's in the Pending status.


## Inquiry creation in the Back Office

In the Back Office, inquires are located in **Customer Portal** > **Inquires**. In this section, you can filter by inquiry type and status and search by customer or inquiry reference.

From here, click **View** to open the inquiry details page. If the inquiry has attached files, click **Download** to access them.

In the **Status** section, view the inquiry's current status and update it based on available transitions in the Inquiry State Machine. To check all status changes, click the **Show history** button.

You can see all inquire state machine states in **Administration** > **State Machine**.  

Customer support can create inquiries on behalf of customers using the [Agent Assist feature](/docs/pbc/all/user-management/{{site.version}}/base-shop/agent-assist-feature-overview.html).



## Related Developer documents

| INSTALLATION GUIDES |
| - |
| [Install the SSP Inquiry Management feature](/docs/pbc/all/self-service-portal/202507.0/install/install-the-ssp-inquiry-management-feature.html) |


