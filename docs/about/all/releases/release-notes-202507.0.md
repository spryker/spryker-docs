---
title: Release notes 202507.0
description: Release notes for Spryker Cloud Commerce OS version 202507.0
last_updated: July 29, 2025
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).



## Self-Service Portal <span class="inline-img">![new-product](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/new-product-label.png)</span>

Self-Service Portal is a comprehensive digital solution that empowers customers to manage their own experience. It unifies traditional commerce and after-sales interactions within a single, intuitive self-service platform.

![Self-Service Portal](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/SSP.png)


### Key capabilities

- Self-service dashboard: A centralized hub for managing all asset-related data and interactions, offering permission-based access, enhanced visibility, and great operational efficiency
- Asset management: Enables customers to organize, track, and access assets, such as physical or digital products
- Services: Consolidates offline and online services into a unified ordering and management process
- General inquiries: Streamlines how customers submit general questions or requests related to products and services
- Claims: Simplifies the submission and resolution of warranty claims, refund requests, and order-related issues, improving service quality and reducing operational costs
- Asset inquiries: Supports detailed inquiries about specific assets, such as technical specs or irregular behavior
- File management: Offers secure, centralized file storage and sharing to enhance collaboration and ensure vital documents for the assets are always accessible

### Business benefits

- Customer empowerment and convenience: Reduce support overhead by enabling customers to independently manage inquiries, assets, and services through an intuitive self-service interface
- Operational efficiency: Centralize permission-based access to assets and files to streamline data management, improve accuracy, and reduce manual processes
- Enhance customer satisfaction and loyalty: Increase satisfaction and retention by delivering faster resolutions and full transparency across all after-sales and service interactions



### Docs

- [Self-Service Portal](/docs/pbc/all/self-service-portal/latest/self-service-portal)
- [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)



## Order Amendment <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The Order Amendment feature enhances the shopping experience by enabling customers to add, update, and remove items from existing orders after placement. This brings flexibility and control to the post-purchase process:
- Flexible price recalculation: Choose between retaining original prices, applying current catalog prices, or defining a custom strategy to suit your business logic.
- Flexible stock recalculation: Allow order edits even if items are deactivated or out of stock by preserving original order stock. Quantity can be adjusted down or increased, up to the combined amount of reserved order stock and current catalog availability.
- Seamless multi-cart experience: Customers can switch between editing an order and shopping in their active cart without losing progress. This functionality requires [multi-cart](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/multiple-carts-feature-overview).
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

These updates make it easier to work with large data sets in the Back Office, especially across key areas like orders, products, and marketplace operations:

- Advanced table filters with multi-select: Quickly narrow down results in views, such as Orders, Products, Product Offers, Merchants, and Discounts, using flexible, multi-select filters.
- Search by product variant SKU: Find specific products faster by searching for concrete product SKUs in the Abstract Products list.
- Measurement unit management: Back Office users can now manage measurement units, including the ability to add and maintain translations for each unit.


![BO-filter-orders](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/BO-filter-orders.png)


### Business benefits

- Operational speed and efficiency: Save time on routine tasks with faster filtering and improved search capabilities—allowing teams to process orders, manage catalogs and discounts, and support merchants more effectively.
- Scalability in daily workflows: Handle high volumes of data with ease. The improved navigation and filtering ensure the Backoffice stays responsive and usable as your orders, product, and merchant base grows.





## Spryker Monitoring Integration <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Spryker Monitoring Integration integrates Spryker's monitoring data into your APM platform based on the Spryker's implementation of the OpenTelemetry framework. It enables you to unite Spryker's insights with your monitoring ecosystem, ensuring full visibility across eCommerce workflows, faster issue detection, and alignment with your monitoring best practices.


### Business benefits

- Personalized application monitoring: Integrate Spryker into your monitoring platform for a tailored, customized monitoring experience.
- Comprehensive tracing and health check metrics: Forward traces and health check metrics from both your application and Spryker services to enable precise performance analysis and faster anomaly detection
- Consolidated monitoring: Consolidate all performance data in a singe monitoring platform, ensuring full visibility across your entire eCommerce workflow


### Docs

[Spryker Monitoring Integration](/docs/ca/dev/monitoring/spryker-monitoring-integration/spryker-monitoring-integration.html)




## Configurable data exporter <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Configurable Data Exporter provides structured access to your operational data, built for flexibility, performance, and security. Export curated datasets on a scheduled basis to your own cloud storage without affecting production systems. Secure RDS-to-S3 transfers enable integration into your analytics stack, data lake, or ETL pipeline — whether for BI, ML, or advanced audits — all without added operational risk.


### Business benefits

- Plug into any destination: Easily connect to your BI tools or data pipelines, from Snowflake to Looker or custom analytics platforms.
- Scheduled and scalable: Automate your exports based on business cadence, ensuring consistency and performance as your data needs grow.
- Governed and composable: Fine-grained control over data scope and structure means exports align with internal policies and evolving business questions.
- Controlled access: Avoid direct querying of your production systems, protecting uptime while granting safe access to curated, business-critical datasets.


### Docs

[Set up data export to S3](/docs/ca/dev/set-up-data-export-to-s3.html)


## Algolia as a global search <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The Algolia ACP app is expanded to support search through content within CMS pages and PDF documents, on top of existing product catalog search. This upgrade significantly enriches the search experience, delivering more relevant and complete results.

### Business benefits

- Improved user experience: Provides richer, more complete search results.
- Increased content discoverability: Makes all types of information searchable.

### Docs

[Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia)
[Integrate Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/integrate-algolia.html)


### Technical prerequisites

[Install prerequisites and enable ACP](/docs/dg/dev/acp/install-prerequisites-and-enable-acp)



## Vertex Tax ID validator <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Simplify B2B invoicing and tax compliance checks with the updated Vertex ACP App. This release features direct, out-of-the-box integration of the Vertex Validator API into checkout. With Vertex Validator and Vertex ACP App, you can validate business tax IDs for syntax, validity, and location, reducing operational costs from incorrect invoices and ensuring accurate application of VAT.
 
### Business benefits

- Automated tax ID validation during checkout or any part of the process thanks to the headless integration
- Improved tax compliance through ID verification and accurate VAT application via company location data
- Decreased operational costs thanks to minimized invoicing errors
- Global validation in over 65 countries

### Docs

[Integrate Vertex Validator](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex-validator)

### Technical prerequisites

- [Install prerequisites and enable ACP](/docs/dg/dev/acp/install-prerequisites-and-enable-acp)
- [Install Vertex](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/install-vertex)



## Multi-Factor Authentication <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Multi-Factor Authentication (MFA) adds an additional layer of protection by requiring users to verify their identity through multiple methods, such as a password and a one-time code sent to their email. 

![MFA-email-code](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/MFA-email-code.png)

### Key capabilities

- An additional authentication layer for Storefront, Back Office, Merchant Portal, and API endpoints
- Supports for custom authenticity validators, such as TOTP or Short Message
- Ensures that an email address is validated before a user signs up or updates their email address



### Business benefits


Improves the overall security of your project, as well as the security of each customer.


### Docs

[Multi-Factor Authentication](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication)








## SEO Sitemap <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The Sitemap feature generates XML sitemaps that improve SEO by helping search engines efficiently index your Storefront content. Generated sitemaps include products, categories, product sets, CMS pages, and merchant pages by default. You can configure other entities to be included on the project level.

### Business benefits 

Improved SEO

### Docs

- [Sitemap feature overview](/docs/pbc/all/miscellaneous/latest/sitemap-feature-overview)
- [Install the Sitemap feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-sitemap-feature)








## [Early Access] Add to cart from images (AI-powered) <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

This feature enables customers to add products to cart by uploading images on the Quick Order page. 

Upload a PDF, image, photo of handwritten notes, or any other text mentioning products to add to cart. Based on the uploaded image, OpenAI detects matching products in your catalog and adds them to cart.

A single image can contain multiple products, and they both will be added to cart. 

Customers need own OpenAI accounts to use this feature.

### Business benefits 

- Enable more buying routes
- Reduce friction in transactions for power users








## Accessibility improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>


Accessibility ensures inclusive experiences for all users in Back Office and B2B Storefront, enhancing usability and helping customers in compliance with the 2025 EU Accessibility Act:

- Keyboard usage: Users with mobility impairments can navigate seamlessly without a mouse.
- Distinguishable colors: Users can easily read and interact with content, even if they have visual impairments or color blindness.

B2B Strorefront has a 100% Lighthouse score in Google Chrome:


![accessibility-improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/B2B-SF-Accessibility.png)


### Business benefits

- Meeting regulatory requirements: reduced legal risks related to 2025 EU Accessibility Act
- Inclusive user experience: Improves usability for all users, including those with disabilities
- Broader market reach: Enables access for a wider audience, enhancing engagement and trust


### Docs

- [Install Back Office accessibility improvements](/docs/pbc/all/back-office/latest/base-shop/install-and-upgrade/install-back-office-accessibility-improvements)
- [Integrate accessibility improvements](/docs/dg/dev/integrate-and-configure/integrate-accessibility-improvements)





## Performance optimizations in cart and checkout <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This release delivers major performance improvements to checkout, order placement, and large cart processing—ensuring a smooth and responsive experience during peak traffic and high order volumes:

### Key capabilities

- Smarter order reference generation: Introduces a new random string algorithm for Sales Order References, enabling high-speed, database lock-free order placement. This approach supports faster checkouts and seamless scaling during peak demand.
- Optimized support for large orders (50–100 items): key features, such as Cart, Checkout, Inventory, OMS, Discounts, Shipments, Product, and Merchant, have been fine-tuned to efficiently handle large orders. Internal benchmarks show up to 40% faster performance across Storefront, Glue API, and background OMS operations.
- Improved cart page performance: The dynamic cart page now renders up to twice as fast, delivering a more responsive and seamless customer experience.

### Business benefits 

Smooth, efficient processing of large carts and orders, enhancing the checkout experience for both B2C and B2B customers. 

### Docs

- [Unique random order reference generator](/docs/pbc/all/order-management-system/latest/base-shop/unique-random-order-reference-generator)
- To benefit from these improvements, make sure to update the recommended modules listed in [Performance Guidelines](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#use-the-newest-modules)
- Cart page performance is now improved. The new configuration is described in the [Cart installation guide](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature#set-up-configuration)



## Valkey key-value store <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker is migrating its cache solution from Redis to Valkey, a high-performance, open-source in-memory data store, supported by AWS ElasticCache. This integration significantly enhances data processing capabilities, offering improved speed, scalability, and security.

### Business benefits 

- Accelerate performance: Leverage Valkey's advanced multi-threading for substantially higher throughput (up to 5x observed in tests for write operations) and more stable latencies, resulting in faster application response times, especially during peak traffic.
- Enhance scalability and reliability: Benefit from Valkey's superior scaling capabilities and improved cluster failover mechanisms, ensuring your platform can robustly handle business growth and larger, more complex workloads.
- Improve system efficiency: Utilize Valkey's optimized memory management for better resource utilization and overall system performance.
- Future-proof your infrastructure: Redis reached its end-of-life version, so migrating to Valkey ensures ongoing security updates, a clear BSD 3-clause licensing model, and strong, long-term support backed by the Linux Foundation and major industry players.


### Docs

[Use and configure Redis or Valkey as a key-value store](/docs/dg/dev/backend-development/client/use-and-configure-redis-or-valkey-as-a-key-value-store)



## Cache performance improvement: Data Compression <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Spryker is introducing seamless and efficient data compression in Valkey key-value store to enhance overall system performance and reduce latency. By minimizing the size of stored and transferred data without compromising speed, this feature optimizes data-intensive operations, leading to faster access times and more efficient use of network and storage resources. With intelligent compression levels tailored for performance, Spryker enables businesses to scale more effectively while maintaining rapid user experiences.

### Business benefits 

- Enhanced performance: Transparent compression in Valkey boosts application responsiveness by reducing storage overhead
- Faster data transfer: Up to 50% reduction in data size leads to quicker transfers between database and Spryker applications
- Reduced latency: Improved data retrieval speeds from Valkey ensure smoother, low-latency experiences for end users
- Efficient compression: Uses fast compression algorithms that minimize text data without introducing performance overhead


### Docs 

[Advanced configuration for Redis compression](/docs/dg/dev/set-up-spryker-locally/redis-configuration.html#advanced-configuration-for-redis-compression)

### Technical prerequisites

[Use and configure Redis or Valkey as a key-value store](/docs/dg/dev/backend-development/client/use-and-configure-redis-or-valkey-as-a-key-value-store)






## Cloud self-service: Storage and access management <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Cloud Self Service is a new automated system for handling common customer support requests. This feature leverages internal tooling to process requests for IAM user creation, VPN and SSH access, and S3 bucket creation automatically, streamlining the support process and empowering customers with faster resolutions.

### Business benefits 

- Reduce lead times: Speed up development and operational tasks by having common requests fulfilled faster
- Enhance request quality and consistency: Automated processing minimizes human error, ensuring that requests are handled accurately and consistently every time








## Cloud security improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This release introduces both internal and customer-facing enhancements, including Multi-Factor Authentication (MFA) and improved password policy, now enabled by default for all new and existing cloud users. All IAM users are now required to activate MFA and use more complex passwords by default. These measures significantly reduce the risk of credential exposure and prevent unauthorized access to your cloud environments.

### Business benefits 

- Enhanced account security: Multi-Factor authentication and stronger password policies safeguard your cloud environments against unauthorized access and credential misuse
- Security best practices by default: Pre-configured security settings ensure a strong baseline without additional setup, making it easier to maintain a secure and resilient cloud setup


### Docs 

[Multi-factor authentication and passwords](/docs/ca/dev/security/multi-factor-authentication-and-passwords)






## [Early Access] Stable Workers


Introducing a significant enhancement to Publish and Synchronize (P&S) focused on increasing its job processing stability. While Jenkins continues to manage non-P&S tasks, P&S now uses a new Stable Worker Architecture. 

This redesign addresses stability challenges from its previous Jenkins-based execution, ensuring more reliable data synchronization (products, prices, assets), especially for large catalogs and frequent updates. 

The new architecture provides isolated worker contexts, automatic retries, and better error handling for a more robust P&S operation.




### Business benefits 

- Improved P&S performance and stability: Faster, more stable catalog data refreshes and timely frontend updates
- Better handling of complex scenarios: Efficiently manage large, frequently updated catalogs
- Reduced operational disruptions: Minimized downtime and manual P&S interventions due to enhanced resilience
- Enhanced logging: Better visibility for logs (CloudWatch) for quicker resolution of P&S issues





## Support for GitHub Enterprise <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Spryker now offers native integration for GitHub Enterprise Server (GHES). This enhancement lets you directly connect your self-hosted GHES repositories with the Spryker platform, eliminating the previous requirement to mirror repositories. 

### Business benefits 

- Simple, direct integration: Directly connect your GitHub Enterprise Server, removing the complexity and overhead of mirroring repositories
- Streamlined workflows: Improved development and deployment workflows through a direct, native connection to your GHES infrastructure
- Reduced operational overhead: Eliminate the need for maintaining and managing repository mirroring processes





## Improved autoscaling <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker Cloud Autoscaling has been enhanced with a faster reaction to traffic spikes. The measured improvement is up to five times faster to scale out from the time an event is observed. Aggressive scale out and scale-in better address temporary traffic surges–for example, during sales events–and improve the reliability of your shop.

The improvements are already implemented with no action required from you.

### Business benefits 

- Improved reliability: Services scale five times faster 
- Improved end-user experience: No increase in request latency for users




































































