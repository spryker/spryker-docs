---
title: Roadmap
originalLink: https://documentation.spryker.com/v5/docs/roadmap
redirect_from:
  - /v5/docs/roadmap
  - /v5/docs/en/roadmap
---

**Updated: February 2020**
We at Spryker are happy to share our plans with you. The plans below are guidelines that give us direction  to continuously evolve and improve our product. However, we are also flexible, and we constantly listen and adapt. Therefore, our plans could change. So although we are good at fulfilling our commitments, we reserve the right to change our priorities, remove or add new features from time to time. If you are planning anything strategic based on this list, you might want to talk to us first, either by contacting your Spryker representative or one of our [Solution Partners](https://spryker.com/solution-partners/).

If you see a feature that you like, send us an <a href="mailto:product@spryker.com?subject=New Feature Request" title="send mail to product@spryker.com" alt="send mail to product@spryker.com">email</a> and let us know why the feature is important to you.

{% info_block warningBox %}
The roadmap contains features and not architectural items, enhancements, technology updates, or any other strategic releases we are working on. We kindly ask you not to base any business decisions on these lists without consulting with us first.
{% endinfo_block %}

## Short-term Roadmap Q1 2020 - Q3 2020
### Commerce Functionality

| Feature | Description |
| --- | --- |
|Return Management | <ul><li>Customers can request to return products from past purchases</li><li>The shop operators can process, return, and offer either an exchange or a refund</li></ul> |
| Shipping Cost in Request for Quote | Shipping price is included into Request for Quote to show the complete cost of the order |
| B2B Order History Enhancements |<ul><li>Filtering of the orders list by date range, username, SKU, or product name</li><li>The list of all orders placed by members of a business unit is shown</li><li>Customers can add their order reference when placing an order</li></ul>  |
| Double opt-in for Customer Registration | By using double opt-in registration, the merchant follows the best GDPR practices and optimizes customer communications |

### Platform Enhancements

| Feature | Description |
| --- | --- |
| Multi-store Navigation |<ul><li>Supports different navigation trees in multi-store setup</li><li>You can define what navigation elements should be based on:</li><ul><li>Store</li><li>Customer</li> |
| Backoffice UI | <ul><li>Backoffice UI optimized for productivity</li><li>Flexible search & filter options</li><li>Bulk action support</li><li>Personalized UI based on a user’s role</li><li>Built on Atomic design principals</li><li>Easy to extend and use in projects</li></ul> |
| Additional Storefront APIs | <ul><li>Navigation</li><li>Bundles</li><li>Product Sets</li><li>Measurement units</li><li>Packaging units</li><li>Volume prices</li><li>Configurable bundles</li><li>Gift card</li><li>CMS APIs</li><li>Shopping list</li></ul> |
| Cloud Enabling | <ul><li>Performance testing and APM tools: Blackfire, New Relic</li><li>Ability to analyze the local environment issues</li><li>History in containers (CLI)</li><li>Docker containers are optimized and reflect the multi-store config changes with less code change</li><li>Separate configuration by Application/Module</li><li>Project-specific services can replace built-in, e.g., DB, ES, Queue</li><li>Unified format of log files and events for better analysis</li><li>New, lightweight scheduler as an alternative to Jenkins</li><li>Queue Worker treats tasks gracefully when terminated</li></ul> |
| Data Exporter | <ul><li>Infrastructure for exporting structured data from Spryker</li><li>Export main Spryker entities<ul><li>Orders</li><li>Products</li><li>Categories</li><li>Prices</li></ul></li><li>Support different export formats</li></ul> |
    
    
## Long-term Roadmap
    
 ### Commerce Functionality
  | Feature | Description |
| --- | --- |
|Configurable Bundle Rules | <ul><li>Products compatibility rules</li><li>The number of products that can be added from each slot per SKU</li></ul> |
| Subscriptions | <ul><li>Subscription terms and conditions</li><li>Subscription duration</li><li>Billing cycle</li><li>Recurring prices</li><li>Per usage prices</li></ul> |
| Configurable Product |<ul><li>Interfaces to launch 3rd party configurator from the product details page</li><li>Attach results of configuration to a cart item and persist in the order</li><li>A configurator can override product price</li><li>Configurable product feature could be integrated with CPQ systems (Configure, Price, Quote)</li></ul>  |
| Return Request Approval | <ul><li>A customer needs to request approval from the store before proceeding with a return</li><li>The Back Office user can see requested returns and either approve or decline them</li></ul> |  
    
### Platform Enhacements
    | Feature | Description |
| --- | --- |
| Enhancements to Backoffice User Permissions |<ul><li>Fine grain control of user permissions</li><li>Predefined user roles</li><li>Hierarchical group structure</li><li>Data segmentation for controlled access</li> |
| Back-end GLUE API | <ul><li>Extend GLUE API framework to provide support for back-end API</li><li>Implement endpoints for:<ul><li>Products</li><li>Orders</li><li>Content pages and blocks</li><li>Categories</li><li>Prices</li><li>Customers</li></ul></li></ul> |
| Cloud | <ul><li>Better Windows support with file synchronization</li><li>Pre-built docker images</li><li>Kubernetes, OpenShift support</li><li>Default setups and guidelines as a starting point</li><li>Using cloud-services instead of built-in: queues, databases, storages, schedulers</li></ul> |
    
### New Products & Initiatives
 | Feature | Description |
| --- | --- |
| Spryker Commerce Cloud OS (PaaS) |<ul><li>Spryker PaaS is the hosting solution that is built for E-commerce innovation</li><li>Spryker PaaS allows customers to develop, run and manage eCommerce applications without the complexity of building and maintaining the infrastructure</li><li>Any customer project can be hosted in Spryker PaaS. It offers full control of the application level. No limits in customization or integration options |
| Enterprise Marketplace |<ul><li>Supporting all types of Marketplace</li><li>Marketplace as Extension to Spryker Commerce OS<ul><li>Single platform and infrastructure</li><li>Consistent shoppers and Backoffice user experience</li><li>Effortless upgrade for existing Spryker’s customers</li><li>Optimized Merchants</li></ul></li><li>Main Aspects of Marketplace Functionality:<ul><li>Merchants</li><li>Products & Offers</li><li>Marketplace & Merchants Orders</li><li>Marketplace Storefront</li><li>Merchant Portal</li><li>Backoffice for Marketplace Operator</li></ul></li><li>Spryker Marketplace Edition supports merchants of different sizes selling through either B2C or B2B channels</li><li>When multiple merchants sell the same product, they create offers</li><li>Businesses can split orders to be fulfilled by different merchants, from different locations, and at different times.</li></ul>
| Spryker Extension: “Big Box” Retailers | <ul><li>Retail location profile, location, and hours of operations</li><li>Store locator & open hours</li><li>Product availability and stock level per location</li><li>Product prices per location</li><li>Online customer experience in the context of a selected retail location</li><li>Single platform and infrastructure</li><li>Consistent shoppers experience across online and offline channels</li><li>Single Back Office interface to manage pricing, availability, and orders</li></ul> |

Check out and [download](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/Roadmap%202020_Final_01012020.pdf) the full version of roadmap.
    

