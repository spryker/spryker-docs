---
title: Release notes 202410.0
description: Release notes for Spryker Cloud Commerce OS version 202410.0
last_updated: Oct 24, 2024
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).

## Marketplace Commissions <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Commissions are a key way for operators to monetize their marketplaces. Spryker Commission Engine makes defining, calculating, and managing commissions streamlined and transparent for operators and merchants. The engine integrates seamlessly with third-party ERP systems and payment service providers like Stripe.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/marketplace-merchant-commission.mp4" type="video/mp4">
  </video>
</figure>



### Business benefits

- Streamline commission management through automated calculation and application, reducing manual effort and errors.  
- Adapt commission structures to evolving business needs seamlessly, supporting marketplace growth and expansion.   
- Connect with third-party systems to generate invoices and facilitate payouts, ensuring operational efficiency and financial accuracy.

### Documentation   

[Marketplace Merchant Commission feature overview](/docs/pbc/all/merchant-management/202410.0/marketplace/marketplace-merchant-commission-feature-overview.html)


## Business intelligence powered by Amazon QuickSight <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Amazon QuickSight is a business analytics tool integrated directly into the Back Office. This feature enables users to visualize data, create customizable dashboards, and perform deep analytics on sales, product performance, customer behaviors, and marketplace KPIs. By leveraging analytics, you can unlock new monetization opportunities and make more informed business decisions.

![analytics-dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/analytics-dashboard.png)

### Business benefits

* Immediate access to data analytics with editing, sharing, and viewing tools integrated directly into the Back Office.
* With high customizability and numerous editing and sharing options, you can tailor your analyses to focus on the most important data.
* Support for multiple data sources lets you aggregate data analysis across various systems and use just one tool for all your BI needs.

![analytics-analysis](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/analytics-analysis.png)


### Documentation

[Amazon QuickSight](/docs/pbc/all/business-intelligence/202410.0/amazon-quicksight-third-party-integration/amazon-quicksight.html)



## Variants section in the Merchant Portal <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The new Variants section in Merchant Portal streamlines the management of concrete products. You can now view, sort, filter, and bulk-edit concrete products belonging to different abstract products.

![mp-variants](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/mp-variants.png)


### Business benefits
* Reduces the complexity of managing concrete products
* Improves operational efficiency


### Documentation

* [Edit marketplace concrete products](/docs/pbc/all/product-information-management/202410.0/marketplace/manage-in-the-merchant-portal/concrete-products/edit-marketplace-concrete-products.html)
* [Install the Merchant Portal - Marketplace Product feature](/docs/pbc/all/merchant-management/202410.0/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-product-feature.html)


## [Early Access] AI Features <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

AI-powered features implemented by connecting to third-party APIs:

* Visual search: Enables users to search across the product catalog by uploading an image.  
* Product category suggestions: Automates product categorization in the Back Office.  
* Product translation: Automates the translation of product information in the Back Office.  
* Generation of product image alt text: Generates alt text for product images in the Back Office to improve accessibility and SEO.

### Business benefits

- Offload routine tasks to AI.  
- Speed up your workflows.

### AI prerequisites

The AI features leverage Open AI and are provided under the following conditions:

* ChatGPT Plus, Team, or Enterprise license from OpenAI is required.  
* Provided as an Early Access release. Early Access releases are subject to specific legal terms. They’re unsupported and don’t provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.  
* Available as an opt-in and are not automatically integrated into the core product with this release.  
* Projects take full responsibility for using AI.


### Documentation

Coming soon.


## Payone ACP app update <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The Payone app now supports more payment methods. On top of credit card and Paypal, we have added the following payment methods:

- Prepayment: Order items are shipped after the customer provides a payment receipt.  
- Klarna: As a leading global payments and shopping service, Krana supports direct payments, pay-after-delivery options, and installment plans. For customers, these options are a seamless one-click purchase experience that empowers them to pay when and how they choose.

### Business benefits

* Increases customer satisfaction by providing more payment methods and options.  
* Configure your Order Management System to capture payments based on your specific business logic.  
* Feel secure that the payments follow international standards through fraud prevention and integrated risk management.

### Documentation

[Payone ACP app](/docs/pbc/all/payment-service-provider/{{site.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payone-acp-app.html)

### Technical prerequisites

[Install prerequisites and enable ACP](/docs/dg/dev/acp/install-prerequisites-and-enable-acp.html)  



## Stripe ACP app for Marketplace <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The Stripe ACP app now fully supports the marketplace business model with the following options:

* Marketplace or admin onboarding: Admin is onboarded and configures the Stripe ACP app.   
* Merchant onboarding and KYC: Each merchant is onboarded into the Marketplace and submits a KYC with Stripe.   
* Customer payment collection: Collects funds from customers through various payment methods, like credit cards, digital wallets, or bank transfers.  
* Authorization and processing: Authorization from the customer’s bank or payment provider ensures that the funds are available and the transaction is legitimate.  
* Payment reconciliation: Confirmed payments and refunds are ingested through an API: payment and refund confirmations, pay-in reports, settlement funds. Funds are reconciled, including splits between 1P and 3P.   
* Seamless merchant payout: When directed, funds are released to the merchant, leveraging the preconfigured billing cycle rules, order status, and commission rules. This is often in near real-time. The capability can also connect with the Spryker Commission Engine to apply commissions.   
* Merchants withdraw funds: Merchants can transfer earnings into a local bank account in preferred currency.  
* Optimized payment flow: Redirect customers to a Stripe Elements page or integrate and customize it accordingly through a headless solution.

### Business benefits

* Reach global markets: One payment provider covers 135 currencies, 45+ countries, 100+ payment methods accessible.  
* Increase conversion: Accelerate checkout. Calculated 10.5% revenue uplift with the use of Stripe Elements.


### Documentation

[Stripe](/docs/pbc/all/payment-service-provider/202410.0/base-shop/third-party-integrations/stripe/stripe.html)

### Technical prerequisites

[Install prerequisites and enable ACP](/docs/dg/dev/acp/install-prerequisites-and-enable-acp.html)  




## [Early Access] Spryker GPTs <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Spryker GPTs powered by OpenAI LLMs help developers automate crucial areas of software development: quality and performance. These GPTs increase developer efficiency without sacrificing high standards in QA and performance benchmarking:

* Spryker DevQA Assistant: Assists in DevQA tasks by providing comprehensive QA checklists and insights into feature and module mappings and dependencies.  
* Spryker Cypress E2E Assistant: Assists with integration and use of the Cypress E2E testing framework; provides guidance, best practices, and real examples.  
* Spryker K6 Performance Assistant: Assists with generating K6 performance test scripts from provided API endpoints.


### Business benefits

* Automate or accelerate repetitive tasks related to quality assurance and performance.   
* Achieve high-quality results while freeing up developer resources to pursue higher-value tasks for your business.

### AI prerequisites

These GPTs leverage Open AI and are provided under the following conditions:

* ChatGPT Plus, Team, or Enterprise license from OpenAI is required.  
* Provided as an Early Access release . Early Access releases are subject to specific legal terms. They’re unsupported and don’t provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.  
* Available as an opt-in and are not automatically integrated into the core product with this release.  
* Projects take full responsibility for using AI.

### Documentation

These GPTs are self-documenting. Have a conversation with them to understand what they can do and how to use their features. Example prompt you could use: “List your features, and for each feature you list provide guidance on how you would use the feature in a generic way. Provide examples of how I would use each feature”.



## Audit logs <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Audit logs improve security monitoring and transparency by letting you track all security actions performed by users in all applications: Storefront, Back Office, Merchant Portal, and Glue API. Audit logs cover login related activities, including agent assist impersonation sessions.

![audit-logs](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/audit-logs.png)

### Business benefits

* Enhanced security monitoring: Track and review key user actions, such as login and password changes, across all platform areas.
* Compliance support: Automatic deletion schedules let you comply with legal and data privacy standards.
* Customizable logging: Adjust logging preferences to focus on specific events or applications, ensuring relevant activities are tracked.
* Improved accountability: Tracking security-related user activities promotes accountability and transparency across the platform.


### Documentation

* [Audit logs](/docs/dg/dev/backend-development/audit-logs/audit-logs.html)
* [Working with logs](/docs/ca/dev/working-with-logs.html)






## Dynamic Multistore <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Previously in early access, Dynamic Multistore is integrated into the core product in this release.

Dynamic Multistore is an enhanced version of the multi-store capability. This feature enables Back Office users to create new stores without engineering support or having to redeploy the application. With this feature, multiple stores can also operate under the same domain.

![dynamic-multistore](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/dynamic-multistore/dynamic-multistore.md/managing-stores.png)

### Business benefits
* Empowers you to make changes faster.
* Provides flexibility in managing stores.
* Reduces complexity.


### Documentation

* [Dynamic Multistore feature overview](/docs/pbc/all/dynamic-multistore/202410.0/base-shop/dynamic-multistore-feature-overview.html)
* [Install Dynamic Multistore](/docs/pbc/all/dynamic-multistore/202410.0/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html)




## Product Comparison <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Product comparison enables customers to easily compare products on mobile and desktop devices. Customers can make more informed purchase decisions by viewing side-by-side comparisons of key product specifications and attributes.

![compare-products-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/feature-overviews/product-comparison-feature-overview.md/compare-products-page.png)

### Business benefits
* Increases conversion rates and customer satisfaction
* Reduces the likelihood of returns


### Documentation

* [Product Comparison feature overview](/docs/pbc/all/product-information-management/202410.0/base-shop/feature-overviews/product-comparison-feature-overview.html)
* [Install the Product Comparison feature](/docs/pbc/all/product-information-management/202410.0/base-shop/install-and-upgrade/install-features/install-the-product-comparison-feature.html)



## Dynamic Cart <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Dynamic cart improves user experience by providing instant, smooth, and uninterrupted feedback to cart changes. Based on AJAX, dynamic cart is updated without a reload for actions like adjusting item quantity, removing an item, or redeeming a discount code. Cart and shopping list widgets in the header also show changes without a page reload.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/dynamic-cart-video.mp4" type="video/mp4">
  </video>
</figure>

### Business benefits

- Enhanced user experience: Making changes in cart without reloading the page allows for an uninterrupted shopping experience. This leads to higher satisfaction and smoother interactions, especially on mobile devices.  
- Increased cart conversion rates: Eliminating page reloads reduces friction in the shopping journey, resulting in higher conversion rates and ultimately driving revenue growth.

### Documentation   
[Dynamic cart overview](/docs/pbc/all/cart-and-checkout/202410.0/base-shop/feature-overviews/cart-feature-overview/dynamic-cart-overview.html)




## Discount condition: number of orders <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Discounts can now be applied based on the total number of order a customer placed. Using the `customer-order-count` discount condition, you can define how many orders a customer should have placed to qualify for the discount.


![discount-condition](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/discount-condition.png)

### Business benefits

- Personalized promotions: Enable tailored discounts based on customers' order history, improving engagement with new and returning customers.  
- Boost customer acquisition: Offer specific discounts to first-time buyers, encouraging new customer sign-ups and conversions.  
- Strengthen customer retention: Reward repeat buyers with discounts, fostering loyalty and increasing the likelihood of future purchases.


### Documentation   
[Decision rules: Attributes and operators](/docs/pbc/all/discount-management/202410.0/base-shop/manage-in-the-back-office/create-discounts.html#decision-rules-attributes-and-operators)  
[Install the Promotions & Discounts + Order Management feature](/docs/pbc/all/discount-management/202410.0/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-order-managemet-feature.html)



## Category tree improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>


This update introduces the following UX improvements to the Category Tree in the Storefront:

- Collapsible categories: Customers can now expand and collapse categories, making it easier to navigate product categories.   
- Hidden empty categories: Categories with no available products are automatically hidden, providing a cleaner and more focused shopping experience.

![category-tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/category-tree.png)

### Business benefits

Customers make faster buying decisions based on better navigation and more focused content delivery.




## Multi-value product attributes <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>


This feature enables product attributes to have multiple values. For example, a "Charging" attribute could have the following values:

* MagSafe  
* Qi2  
* Qi

![back-office-multi-value-attribute](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/back-office-multi-value-attribute.png)

Such attributes are displayed with all of their values across the platform, including search, filtering, and product details pages.

![storefront-multi-value-attribute](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/storefront-multi-value-product-attribute.png)

### Business benefits
* Customers get a complete picture of products by all values being presented per attribute.
* Enhanced product filtering: Customers can search and filter products based on multiple attribute values and combinations, enabling them to find products faster and with specific requirements.
* Efficient data management: Back Office users can organize complex products more efficiently.

## Documentation

[Create product attributes](/docs/pbc/all/product-information-management/202410.0/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html)




## View Merchant page in the Back Office <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Back Office users can now view all relevant merchant information at a glance without entering the edit mode. Merchant details are consolidated into one comprehensive page, streamlining the process of accessing and reviewing merchant data.

![view-merchant-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202410.0.md/view-merchant-page.png)

### Business benefits
* Simplifies data review processes by consolidating key merchant information in a single, non-editable page.
* Eliminates accidental changes when viewing merchant information.


## Back Office accessibility improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Back Office is now more accessible to everyone, enabling all types of users to interact and navigate the system. We have implemented the following accessibility improvements:

* Navigation: Users can navigate drawer content and content behind drawers using the **Tab** key.
* Keyboard control: Users can interact with form elements and links using the keyboard.
* Colors and contrast: Improved color contrast and added text as an alternative source of information besides color.




## Improved management of user roles in the Back Office <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Back Office areas and actions are now predefined. When managing access of user roles, you can select areas and actions instead of manually entering them.

### Business benefits
* Simplifies the management of user access.
* Reduces the risk of errors when providing and restricting access.



## Publish and Synchronize configuration and optimization <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Publish and Sync (P\&S) process has been improved as follows:

- Performance optimization through direct sync: Synchronization queues can be enabled and disabled on the project level. When disabled, synchronization proceeds directly to the synchronize step without intermediate queuing, resulting in faster and more streamlined system performance.   
- Custom queue chunk size configuration: Developers can define custom message chunk sizes per queue. This allows for fine-tuned control over how many messages are processed per queue, like publishing, synchronization, or data import. The docs provide detailed guidance on when to increase or decrease chunk sizes for improved performance.  
- Improved event logger behavior: The event logger now consumes less resources.  
- System health check notifications for P\&S limits: Provides developers with notifications when processed data is reaching system limits. Notifications are sent in the following cases:  
  - A worker exceeds 75% of its available memory.  
  - Event message size surpasses 256KB: this protects the message broker.  
  - The size of a request during entity publishing exceeds 1MB: this ensures compatibility with persistence capabilities.

### Business benefits

* More fine-tuned control over the system.  
* Optimized performance through flexibility.  
* Processing time reduced.  
* Get more actionable insights into system behavior.  
* Prevent performance issues and system overload by proactively addressing potential bottlenecks.

### Documentation   
* [Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html)
* [Queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html)


## Tech update <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The following components have been updated to ensure compatibility with the latest technologies and optimize performance:

- PHP 8.3 is now supported; support for PHP 8.1 is discontinued.  
- Jenkins has been upgraded to the latest LTS version. All new cloud environments are now deployed with this version by default. For local development, the new version of Jenkins requires Docker SDK version 1.61.0 or higher.   
- Improved Jenkins’ resource management by adding SWAP memory on the infrastructure level. This addresses memory-related issues causing job failures and instability.  
- The Angular framework has been updated to version 17, providing faster performance and smaller asset sizes for the merchant portal.   
- PHPStan has been upgraded to version 1.10, significantly improving code analysis speed.

### Business benefits

* Reduced security risks  
* Reduced maintenance efforts   
* Scaling and more reliable operation

### Documentation

* [Supported versions of PHP](/docs/dg/dev/supported-versions-of-php.html)  
* [PHPStan](/docs/dg/dev/sdks/sdk/development-tools/phpstan.html)
* [Upgrade to Angular 17](/docs/dg/dev/upgrade-and-migrate/upgrade-to-angular-17.html)



## Stripe metadata <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker projects running the Stripe ACP app can now send custom metadata to Stripe.

### Documentation

[Sending additional data to Stripe](/docs/pbc/all/payment-service-provider/202410.0/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/project-guidelines-for-stripe.html#sending-additional-data-to-stripe)




## Developer guides <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The following updated and new developer guides have been released:

* Guides for [developing standalone modules](https://docs.spryker.com/docs/dg/dev/developing-standalone-modules/developing-standalone-modules.html) show how to create reusable packages and contribute to the community.  
* A guide on [AI coding assistants](https://docs.spryker.com/docs/dg/dev/ai-coding-assistants.html) offers insights into how engineers can improve and optimize their workflows with AI.  
* [Project development guidelines](https://docs.spryker.com/docs/dg/dev/guidelines/project-development-guidelines.html) have been refreshed, providing clarification on shortcuts and sharing tips and tricks for simplifying development processes.



## Community Contributions <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This release introduces performance optimizations, bug fixes, and feature improvements contributed by the external community. These improvements address issues like memory consumption in product publishing, slow page searches, and various bug fixes.

* Performance improvements:  
  * Static cache for concrete product images in P\&S improves efficiency with multiple locales.  
  * Reduced memory usage in abstract product publishing with many stores, locales, and concretes.  
  * Removed redundant `getStoreAndLocaleKey` calls.  
  * Less SQL queries are issued by preventing empty queries.  
* General improvements:  
  * Added a flag to cache the OMS definition.  
  * Improved the sorting behavior in the Merchant Portal  
* Bug fixes and other minor improvements

Big thanks for your valuable contributions!
