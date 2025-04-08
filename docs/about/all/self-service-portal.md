---
title: Self-Service Portal
description: Self-Service Portal (SSP) is a centralized B2B platform that streamlines asset management, inquiries, services, and files, enhancing after-sales efficiency and customer support.
template: concept-topic-template
---


B2B Self-Service Portal (SSP) is a platform designed to enhance operational efficiency, transparency, and customer satisfaction. With features like Assets, Inquiries, Services, Files, and Dashboard, SSP centralizes business interactions, making it easier to manage after-sales activities.


## Self-Service Portal features

SSP offers a suite of features designed to enhance customer experience and operational efficiency. From asset management to service requests, each function supports streamlined communication, transparency, and control for both users and administrators.


### Assets

Assets are the core of SSP and can represent high-value or custom-built products and equipment requiring ongoing maintenance and oversight. Customers can interact with assets as follows:

* Track and manage assets
* Monitor maintenance schedules and service histories
* Access essential documentation and service records


### Inquiries

Inquiries streamline communication between customers and administrators, providing a structured system for managing and resolving claims or any other questions. They're used as follows:

* Submit, track, and manage inquiries directly through the portal
* Improve transparency with real-time status updates
* Enable administrators to review, process, and resolve issues efficiently
* Use role-based permissions to ensure appropriate access and visibility


### Services

Services are used to manage after-sales support:

* Maintenance, repair, and warranty management
* Ordering spare parts and related components
* Streamlined scheduling and service request handling


### Files

Seamlessly manage and share important documents across SSP:

* Upload and download various file formats, including PDF, JPEG, HEIC, and PNG
* Attach files to assets and inquiries for streamlined documentation
* Have quick access to essential product manuals, service reports, and contracts


### Dashboard

Dashboard offers a centralized view of all SSP interactions, providing users with a tailored experience based on their roles and permissions. Dashboard functionality:

* A consolidated overview of key business metrics and actions
* Easy navigation to main SSP functionalities
* Role-based access control to ensure secure data visibility



## Self-Service Portal Inquiry Management feature

The Inquiry Management feature allows customers to submit and track different types of inquiries in SSP, providing a structured way to handle and resolve customer requests and claims.

Back Office users can manage inquiries, update statuses, and communicate with customers through an organized workflow.


### Storefront functionalities 

* Submit an inquiry with relevant details
* Attach supporting documents or images
* Track the status of submitted inquiries
* Get inquiry resolution details via email

### Back Office functionalities 

* View and manage all customer inquiries
* Filter and search inquiries by type, status, or customer
* Update inquiry status and provide resolution details
* Attach internal notes visible only to Back Office users for internal collaboration


### Inquiry types

Inquiry types help categorize and manage customer questions or issues. Each type serves a specific purpose, ensuring inquiries are directed to the right team and handled appropriately.

You can add more inquiry types on the project level.

#### General inquiry

Used for non-order and non-asset-related questions. Examples:

* Product information requests
* Shipping policy clarifications
* Account-related questions


#### Asset inquiry

Used to ask questions or report problems with a specific asset. Examples:

* Warranty claims
* Malfunctioning or defective product reports
* Asset replacement requests


#### Order claim

Used to report issues with orders. Examples:

* Wrong item was received
* Damaged product upon delivery
* Missing items in the shipment


### Inquiry statuses

Inquiry statuses are handled by a dedicated Inquiry State Machine. This state machine contains inquiry-specific statuses and manages transitions according to inquiry type. The state machine is shipped with the following default statuses:


| Status   | Description |
|----------|-------------|
| Pending  | Inquiry was submitted by the customer and is awaiting review. |
| In Review | Inquiry is being evaluated by the customer support team. Additional information may be requested. |
| Approved | Inquiry was accepted and the necessary actions are being taken to resolve it. The customer is notified by email. |
| Rejected | Inquiry was denied, with reasons provided to the customer. The customer is notified by email. |
| Canceled | Inquiry was withdrawn by the customer or customer support team while it was in the Pending state. |


On the project level, the status logic can be customized for each inquiry type. For example an automatic refund action can be initiated for order claims.


### Permissions

On the Storefront access to the inquiry actions is restricted based on user permissions. By default, users can have the following permissions:


| Permission                    | Description |
|------------------------------|-------------|
| Create inquiries             | Create inquiries and view only your own inquiries. |
| View business unit inquiries | View inquiries submitted by company users within the business unit a user belongs to. |
| View company inquiries       | View inquiries submitted by company users within the company a user belongs to. |




### Inquiry creation on Storefront

Company users can create different types of inquiries as follows:
* General inquiry: go to Customer Account > Self-Service Portal > Inquires > Create inquiry
* Asset inquiry: go to Customer Account > Self-Service Portal > Assets > Asset Details page > Create inquiry
* Order claim: go to Customer Account > Order History > Order Details page > Claim

On the submit inquiry page, the user needs to enter the following details:
* Subject
* Description
* Optional: files

After an inquiry is submitted, the user can find it in Customer Account > Self-Service Portal > Inquires. 

The company user can also cancel an inquiry while it's in the pending status.


### Inquiry creation in the Back Office

In the Back Office, inquires are located in Customer Portal > Inquires. In this section, you can filter by inquiry type and status and search by customer or inquiry reference. 

From here, click **View** to open the inquiry details page. If the inquiry has attached files, click **Download** to access them.

In the **Status** section, view the inquiry’s current status and update it based on available transitions in the Inquiry State Machine. To check all status changes, click the **Show history** button.

You can see all inquire state machine states in **Administration** > **State Machine**.  

{% info_block infoBox %}
Customer support can create inquiries on behalf of customers using the [Agent Assist feature](/docs/pbc/all/user-management/{{site.version}}/base-shop/agent-assist-feature-overview.html).
{% endinfo_block %}



## Self-Service Portal Service Management feature

The *Service Management* feature enables customers to book a service, either for delivery to their address or for provision at a designated service point. For example, you can provide after-sales support, such as maintenance or repair.


### Prerequisites for selling services in the catalog

* Add service points and their addresses. A service point is a physical location where services are provided. For more information on service points, see [Service point](/docs/pbc/all/service-point-management/202410.0/unified-commerce/service-points-feature-overview.html#service-point).
* Enable the Service Visit service type for service points as a unique service. For more information on services, see [Service](/docs/pbc/all/service-point-management/202410.0/unified-commerce/service-points-feature-overview.html#service).
* Configure a shipment method with the On-Site Service shipment type. For more information on shipment types, see [Shipment type](/docs/pbc/all/carrier-management/202410.0/base-shop/shipment-feature-overview.html#shipment-type).

### Selling services as products

This section describes how to set up components for selling services as products:

1. Set up the service product type for abstract products. This distinguishes service products from regular products in the Back Office and Storefront.
2. Set up allowed shipment types for concrete products. This determines if a product is eligible for a specific shipment type. For services that are sold at service points, configure the on-site service shipment type.
3. Create one or more product offers for each service product. The offer must be associated with Service Points, Services, and Shipment Types.
4. Optional: Set service date and time as required for checkout. This can be enabled for concrete products if scheduling is necessary.

The following sections describe each step in more details.

#### Importing product types

The product type defines the category of a product to distinguish between standard products, services, and any other product types.

Product types are imported using the standard console importer:  

**product-abstract-type.csv**

| Parameter | Required | Type   | Description                         |
|-----------|----------|--------|-------------------------------------|
| key       | Yes      | string | Key for the product abstract type.  |
| name      | Yes      | string | Name of the product abstract type.  |



#### Adding product type to products 

To add a product type to a product in the Back Office, go to **Catalog** and click the needed product.

Alternatively, you can import product type assignments using the standard console importer:

**product-abstract-product-abstract-type.csv**

| Parameter                 | Required | Type   | Description                     |
|--------------------------|----------|--------|---------------------------------|
| abstract_sku             | Yes      | string | Product abstract SKU            |
| product_abstract_type_key| Yes      | string | Key for the product abstract type. |




#### Enabling service date and time for a product

To add a service date and time to products, follow these steps:

1. In the Back Office, go to **Catalog**.
2. Click a product to enable date and time for.
3. In the **Variants** section, click a product variant to enable date and time for.
4. In the **General** tab, for **Enable Service Date and Time**, select **Yes**.

<!-- Alternatively, this can be imported using the standard console importer. See *Import file details: product-tbd.csv*. -->


### Defining allowed shipment types

1. In the Back Office, go to **Catalog**.
2. Click a product to select shipment types for.
3. In the **Variants** section, click a product variant to select shipment types for.
5. For **Allowed Shipment Types**, select one or more shipment types. 
  A product requires at least one allowed shipment type to be displayed on the Storefront.

<!-- Alternatively, shipment types can be imported using the standard console importer. See *Import file details: product-type.csv*. -->


### Adding a product offers for products

1. In the Back Office, go to **Catalog** > **Offers**.
2. Click **Create Offer**.
3. Fill out the form using field descriptions:

| OFFER PARAMETER     | DESCRIPTION |
|---------------------|-------------|
| Offer status        | Active or inactive. |
| Stores              | Spryker Marketplace is a multi-store environment, and an operator can define which stores to display their offers in. |
| Stock               | Offer’s stock that’s not dependent on the respective product’s stock. 
| Quantity | Always in Stock |
| Validity Dates      | Specifies the period during which the product offer is visible on the Storefront. Concrete product validity dates have higher priority over the Offer validity dates. |
| Service Point       | A service point is a physical location where services are provided. Depending on the services provided, there can be different kinds of service points, such as a warehouse or a physical store. |
| Services            | A service represents a specific service type that is provided at a specific service point. For example, an On-Site Service at a retail location at Julie-Wolfthorn-Straße 1, 10115, Berlin is a unique service. |
| Shipment Types      | A shipment type is a way in which a customer receives an order after placing it. Shipment type examples: Delivery, On-Site Service, In-Store Pickup, Curbside Pickup. |



### Reviewing purchased services on Storefront

Customers can review previously purchased service products in **My Account** > **Services**.

On the Services View page, the following information is displayed:
* Order Reference
* Service
* Time and Date
* Created At
* State


Customers can use the search to filter purchased services by product name, SKU, or order reference. 

Also, customers can filter the view according to who purchased services:
* My booked services
* Booked services of a specific business unit
* Booked services of a specific company

The latter two require respective permissions. For more information on company permissions, see [Company user roles and permissions overview](/docs/pbc/all/customer-relationship-management/202410.0/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html).


### Reviewing purchased services in the Back Office

Back Office users can view previously purchased service products by navigating to **Orders** > **Services**.


### Multi-step checkout overview

The **Self-Service Portal Checkout** flow allows customers to:



* **Switch between single-address and multi-address checkout** for items delivered via the **Delivery** shipment type.
* **Items delivered using "On-Site Service"** appear in a separate group during checkout, where customers can change the **service point** to a different one. However, switching the **shipment type** is not allowed.

#### Known limitations



* You cannot specify product prices for product offers from the **Back Office**; however, they can be imported using a **console command**.
* Some B2B features, such as **Merchant Relations**, are not supported by product offers. See details in *[Product Offer Constraints](/docs/pbc/all/offer-management/202410.0/marketplace/marketplace-product-offer-feature-overview.html#current-constraints)*.
* Additionally, the **shipment type** cannot be changed for a **cart line item** by the customer in the **shopping cart** or during **checkout**.


### Extending current capability

This guide is created based on the assumption that the default **Shipment Type** and **Service Type** are used for the initial setup. If you want to add more Shipment Types and Service Types, see: [/docs/pbc/all/service-point-management/202410.0/unified-commerce/service-points-feature-overview.html](/docs/pbc/all/service-point-management/202410.0/unified-commerce/service-points-feature-overview.html)



## Storefront Dashboard

The **Dashboard** feature within the **Self-Service Portal (SSP)** provides company users with an intuitive, consolidated view of their key metrics, assets, inquiries, services, and other relevant information. It centralizes actionable content and insights in one place. The feature is role-based, meaning users will only see data they are authorized to access, ensuring that the right information is presented to the right person.

The Dashboard is accessible from the **Customer Account** menu in the **Storefront**.



### Storefront functionality

The dashboard consists of the following blocks: 

* **Welcome Block**: A personalized greeting that displays the user’s name, company name, and business unit.
* **Overview Block**: Provides a quick snapshot of key metrics such as the number of assets, pending inquiries, and upcoming services.
* **Customer Service Representative Block**: Displays contact details (name, photo, and contact methods) for the user’s business unit-assigned customer service representative.
* **Assets Block**: Shows a list of the user’s assets, including clickable links to asset details.
* **Files Block**: Displays a list of files with options to download.
* **Inquires Block**: Allows users to track the status of their inquiries, including a table of inquiry details.
* **Services Block**: Lists upcoming services and allows users to access related information.
* **Promo Blocks**: Displays promotional content like special offers and upcoming events.

**Access Control**: Company admins can configure visibility and access control for different user roles based on permissions.


### Back Office functionality



* **Customer Service Representative Block**: The content in this block is business unit-specific and can be managed by Back Office users. 


### User Permissions

The **Dashboard Permissions System** ensures that access to different blocks and data is restricted based on the user’s role and permissions. This guarantees that only authorized users can view specific content:



* **View Dashboard**: Grants users the ability to view the Dashboard page.
* **Access to Dashboard Data**: Data within the Dashboard, such as assets, inquiries, services, and files, is filtered based on the user’s role and specific entity-level permissions (business unit, company). If a company user does not have permission to view certain data (e.g., assets, inquiries) that block will not be displayed.


### User Guides


#### Back Office

To manage the business unit-specific Customer Service Representative (CSR) blocks:



1. Go to Back Office > **Content** > **Blocks** to configure the CMS blocks for CSR per business unit.
2. The CMS block name structure is business unit-specific like `sales_rep:company_unit:12` where 12 is the ID of the respective business unit. Go to Customers > Company Units to find the relevant ID in the table.

If no business unit-specific CMS block is defined, a default block will be shown. Its name is `sales_rep:default`.

