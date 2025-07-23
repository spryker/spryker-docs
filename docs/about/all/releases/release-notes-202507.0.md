---
title: Release notes 202507.0
description: Release notes for Spryker Cloud Commerce OS version 202507.0
last_updated: July 29, 2025
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).



## Self-Service Portal

Self-Service Portal is a comprehensive digital solution that empowers customers to manage their own experience. It unifies traditional commerce and after-sales interactions within a single, intuitive self-service platform.

![Self-Service Portal](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/SSP.png)


### Key features

- Self-service dashboard: A centralized hub for managing all asset-related data and interactions, offering permission-based access, enhanced visibility, and great operational efficiency.
- Asset management: Enables customers to organize, track, and access assets, such as physical or digital products.
- Services: Consolidates offline and online services into a unified ordering and management process.
- General inquiries: Streamlines how customers submit general questions or requests related to products and services.
- Claims: Simplifies the submission and resolution of warranty claims, refund requests, and order-related issues, improving service quality and reducing operational costs.
- Asset inquiries: Supports detailed inquiries about specific assets, such as technical specs or irregular behavior.
- File management: Offers secure, centralized file storage and sharing to enhance collaboration and ensure vital documents for the assets are always accessible.

### Business benefits

- Customer empowerment and convenience: Reduce support overhead by enabling customers to independently manage inquiries, assets, and services through an intuitive self-service interface.
- Operational efficiency: Centralize permission-based access to assets and files to streamline data management, improve accuracy, and reduce manual processes.
- Enhance customer satisfaction and loyalty: Increase satisfaction and retention by delivering faster resolutions and full transparency across all after-sales and service interactions.



### Docs

- [Self-Service Portal](/docs/pbc/all/self-service-portal/latest/self-service-portal)
- [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)



## Order Amendment <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The Order Amendment feature enhances the shopping experience by enabling customers to add, update, and remove items from existing orders after placement. This brings flexibility and control to the post-purchase process:
- Flexible price recalculation: Choose between retaining original prices, applying current catalog prices, or defining a custom strategy to suit your business logic.
- Flexible stock recalculation: Allow order edits even if items are deactivated or out of stock by preserving original order stock. Quantity can be adjusted down or increased, up to the combined amount of reserved order stock and current catalog availability.
- Seamless multi-cart experience: Customers can switch between editing an order and shopping in their active cart without losing progress. (Requires [multi-cart](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/multiple-carts-feature-overview)
- Preserve original order reference: Maintain consistent tracking and reporting by keeping the original order reference.


![Order Amendment](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/Order_Amendment_Release_Notes.png)


### Business benefits

- Reduce cancellations by allowing post-checkout edits
- Minimize manual customer service interventions



### Docs

- [Order Amendment feature overview](/docs/pbc/all/order-management-system/latest/base-shop/order-amendment-feature-overview)
- [Install the Order Amendment feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-amendment-feature)







## [Early Access] Bulk product import in Merchant Portal <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The Product Import feature in the Merchant Portal enables you to bulk upload products using a universal CSV format, streamlining workflows, reducing manual effort, and accelerating time-to-market.

![merchant-portal-import](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/merchant-portal-import.png)



### Key capabilities

- Import products, pricing, and stock in one go: Upload a single file to populate essential product data, minimizing repetitive tasks and improving data accuracy.
- Simplified CSV structure: Use a clean, single-line format that supports fast onboarding and easy updates to large product catalogs.
- Built-in import logs: Get immediate feedback with success and error logs to troubleshoot issues and ensure smooth uploads.

### Business benefits


- Empower merchants with self-service tools
- Launch and update product catalogs faster
- Reduce data entry errors and manual rework



## Marketplace Discounts <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The Marketplace Discounts enhancements introduce advanced targeting capabilities for Marketplace Operators, enabling promotions specific to individual merchants or product offers:

- Merchant-specific discounts: Apply discounts exclusively to products from a specific merchant using merchant references in discount conditions.
- Product offer-specific discounts: Target discounts at the product offer level for more granular promotions.

![marketplace-discounts](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/marketplace-discounts.png)



### Business benefits

- Strategic promotions: Gain full control to drive growth in specific segments, support underperforming merchants, or push high-priority inventory.
- Merchant performance and retention: Equip your merchants with tools to run tailored promotions under your governance, helping them increase sales and stay competitive.


### Docs

- [Install the Marketplace Merchant + Promotions & Discounts feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-promotions-and-discounts-feature)
- [Install the Marketplace Product Offer + Promotions & Discounts feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-promotions-and-discounts-feature)




## Discount conditions for customer-related criteria <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The latest discount condition enhancements introduce more precise control over customer-related promotion scenarios, enabling restrictions and targeting directly based on customer identity or behavior:

- Maximum uses per customer: Limit how many times a logged-in customer can redeem a specific discount or voucher. Ideal for one-time offers, such as welcome codes, newsletter subscription rewards, or limited campaigns where repeated usage should be prevented.
- Customer reference: Target a discount at a specific customer by assigning their unique customer reference. Useful for compensation vouchers, exclusive rewards, or customer-specific promotional scenarios.


![customer-discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/customer-discount.png)


### Business benefits

- Precision in customer targeting and control: Define exactly who can use a promotion and how often, enabling tailored experiences for first-time buyers, high-value customers, or compensation scenarios.
- Increased promotion efficiency and ROI: Align discount usage with customer behavior and strategic goals, ensuring that promotions reach the right audience with the right frequency.



### Docs

[Install the Customer Account Management + Promotions & Discounts feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-promotions-and-discounts-feature)


## Back Office UX improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

These updates make it easier to work with large data sets in the Backoffice, especially across key areas like orders, products, and marketplace operations:

- Advanced Table Filters with Multi-Select: Quickly narrow down results in views like Orders, Products, Product Offers, Merchants, and Discounts using flexible, multi-select filters.
- Search by Product Variant SKU: Find specific products faster by searching for Concrete Product SKUs directly in the Abstract Products list.
- Measurement Unit Management: Backoffice users can now manage measurement units directly, including the ability to add and maintain translations for each unit.


![BO-filter-orders](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/BO-filter-orders.png)


### Business benefits

- Operational Speed and Efficiency: Save time on routine tasks with faster filtering and improved search capabilities—allowing teams to process orders, manage catalogs and discounts, and support merchants more effectively.
- Scalability in Daily Workflows: Handle high volumes of data with ease. The improved navigation and filtering ensure the Backoffice stays responsive and usable as your orders, product, and merchant base grows.





## Spryker Monitoring Integration <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Spryker Monitoring Integration integrates Spryker’s monitoring data into your APM platform based on the Spryker’s implementation of the OpenTelemetry framework. It enables you to unite Spryker’s insights with your monitoring ecosystem, ensuring full visibility across eCommerce workflows, faster issue detection, and alignment with your monitoring best practices.


### Business benefits

- Personalized application monitoring: Integrate Spryker into your monitoring platform for a tailored, customized monitoring experience.
- Comprehensive tracing and health check metrics: Forward traces and health check metrics from both your application and Spryker services to enable precise performance analysis and faster anomaly detection
- Consolidated monitoring: Consolidate all performance data in a singe monitoring platform, ensuring full visibility across your entire eCommerce workflow


### Docs

[Spryker Monitoring Integration](https://docs.spryker.com/docs/ca/dev/monitoring/spryker-monitoring-integration/spryker-monitoring-integration.html)




## Configurable data exporter <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Configurable Data Exporter provides structured access to your operational data, built for flexibility, performance, and security. Export curated datasets on a scheduled basis to your own cloud storage without affecting production systems. Secure RDS-to-S3 transfers enable integration into your analytics stack, data lake, or ETL pipeline — whether for BI, ML, or advanced audits — all without added operational risk.


### Business benefits

- Plug into any destination: Easily connect to your BI tools or data pipelines, from Snowflake to Looker or custom analytics platforms.
- Scheduled and scalable: Automate your exports based on business cadence, ensuring consistency and performance as your data needs grow.
- Governed and composable: Fine-grained control over data scope and structure means exports align with internal policies and evolving business questions.
- Controlled access: Avoid direct querying of your production systems, protecting uptime while granting safe access to curated, business-critical datasets.



## Algolia as a global search for products, pages, and documents <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The Algolia ACP Application is expanded and transformed into a connector to a comprehensive global search solution. Now, in addition to search in the product catalog, the Algolia ACP App supports search through content within CMS pages and PDF documents. This upgrade significantly enriches the search experience, delivering more relevant and complete results for every query.

### Business benefits

- Improved user experience: Provides richer, more complete search results.
- Increased content discoverability: Makes all stored information easily searchable.

### Docs

[Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia)
[Integrate Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/integrate-algolia.html)


### Technical prerequisites

[Install prerequisites and enable ACP](/docs/dg/dev/acp/install-prerequisites-and-enable-acp)



## Vertex Tax ID validator <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Simplify B2B invoicing and tax compliance checks with the updated Vertex ACP App. This release features direct, out-of-the-box integration of the Vertex Validator API into checkout. With the Vertex ACP App and the enablement of the Vertex Validator you can validate business tax IDs for syntax, validity, and location, reducing operational costs from incorrect invoices and guaranteeing the accurate application of VAT.
 
### Business benefits 

- Automated tax ID validation during checkout or any part of the process thanks to the headless integration.
- Improved tax compliance through ID verification and accurate VAT application via company location data.
- Lower operational costs by minimizing invoicing errors.
- Global validation in over 65 countries.
- Easy activation with out-of-the-box integration.

### Docs

[Integrate Vertex Validator](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex-validator)

### Technical prerequisites

- [Install prerequisites and enable ACP](/docs/dg/dev/acp/install-prerequisites-and-enable-acp)
- [Install Vertex](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/install-vertex)



## Multi-Factor Authentication <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

As part of our commitment to strengthening the security of our e-commerce platform, we are introducing Multi-Factor Authentication (MFA) into Spryker Commerce OS (Spryker Software). MFA adds an additional layer of protection by requiring users to verify their identity through multiple methods, such as a password and a one-time code sent to their email.

![MFA-email-code](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/MFA-email-code.png)


### Business benefits 

- Activate an additional authentication layer in Storefront, Backoffice, Merchant Portal and API endpoints requiring your users to authenticate through receiving a one-time code on their registered email address.
- Implement your own authenticity validators like TOTP or Short Message and plug them into the user journey.
- Ensure that user emails are fully validated and confirmed before the user signs up or when the email is changed in the user profile.

### Docs

[Multi-Factor Authentication](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication)








## SEO Sitemap <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The Sitemap feature in Spryker automatically generates XML sitemaps to improve SEO by helping search engines efficiently index your storefront content. It supports products, categories, product sets, CMS pages, and merchant pages by default, with the flexibility to include additional entities through project-level configuration.

### Business benefits 

Improved SEO visibility

### Docs

- [Sitemap feature overview](/docs/pbc/all/miscellaneous/latest/sitemap-feature-overview)
- [Install the Sitemap feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-sitemap-feature)








## [Early Access] Add to cart from images (AI-powered) <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>


- Upload PDF, image, a photo of handwritten notes, or any other text data to have any products mentioned added directly to cart from the Quick Order page. 
- Multiple items can be added to the cart if they are specified in whatever is uploaded. 
- The feature uses OpenAI to power the image reading to identify specific products.
- Customers will need their own OpenAI account in order to use this feature.

### Business benefits 

- Give customers a frictionless experience to add products to their cart.
- Eliminate any hurdles in taking documents and notes that require purchasing to actually translate into sales.








## Accessibility improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span> 


Accessibility ensures inclusive experiences for all users in Back Office and B2B Storefront, enhancing usability and helping customers with compliance with the 2025 EU Accessibility Act, while reducing risks and supporting broader market reach:

- Keyboard Usage: Users with mobility impairments can navigate seamlessly without a mouse.
- Distinguishable Colors: Users can easily read and interact with content, even if they have visual impairments or color blindness.
- The image below illustrates a 100% Lighthouse score in Google Chrome for B2B Strorefront:


![accessibility-improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/B2B-SF-Accessibility.png)


### Business benefits 

- Help Meeting Regulatory Requirements: by reducing legal risks in light of the 2025 EU Accessibility Act.
- Inclusive User Experience: Improves usability for all users, including those with disabilities.
- Broader Market Reach: Enables access for a wider audience, enhancing engagement and trust.


### Docs

- [Install Back Office accessibility improvements](/docs/pbc/all/back-office/latest/base-shop/install-and-upgrade/install-back-office-accessibility-improvements)
- [Integrate accessibility improvements](/docs/dg/dev/integrate-and-configure/integrate-accessibility-improvements)








