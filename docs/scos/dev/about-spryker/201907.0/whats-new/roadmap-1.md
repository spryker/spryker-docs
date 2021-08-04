---
title: Roadmap
originalLink: https://documentation.spryker.com/v3/docs/roadmap-1
redirect_from:
  - /v3/docs/roadmap-1
  - /v3/docs/en/roadmap-1
---

<!--
Used to be http://spryker.github.io/roadmap/

Take update info from: https://spryker.atlassian.net/wiki/spaces/PRODUCT/pages/383156225/Draft+Product+Roadmap

See this file: https://docs.google.com/spreadsheets/d/1lCv4Q6CP1Liqmhl2mEM4h4hsjpsTIlJvtE7GVkZmc2s/edit#gid=47226737 (file is deprecated: 03.09.2018)

"Will be implemented" should be green ("yes"), due date should be up to 3-4 weeks
-->

**Updated: September, 2019**
We at Spryker are happy to share our plans with you. Our plans are guidelines that give us direction, that moves us forward to continuously evolve and improve our product. However, we are also flexible and we constantly listen and adapt. Therefore, our plans tend to change. So although we are good at fulfilling our commitments, we reserve the right to change our priorities, remove or add new features from time to time. If you are planning anything strategic based on this list, you might want to talk to us first, either by contacting your Spryker representative or one of our [Solution Partners](https://spryker.com/solution-partners/).

If you see a feature that you like, send us an <a href="mailto:product@spryker.com?subject=New Feature Request" title="send mail to product@spryker.com" alt="send mail to product@spryker.com">email</a> and let us know why the feature is important to you.

{% info_block warningBox %}
The roadmap contains features, and not architectural items, enhancements, technology updates or any other strategic releases we are working on. We kindly ask you not to base any business decision on these lists without consulting with us first.
{% endinfo_block %}

## Roadmap Q4 2019 - Q2 2020
### Content Management System (CMS)

| Feature | Description |
| --- | --- |
| Content Pages &amp; Slots | Content Pages &amp; Slots give you the freedom to inform, inspire, and intrigue customers in order to increase purchases and build brand loyalty.<ul><li>Give Content Managers a full view of content slots available in store templates as well as CMS pages</li><li>Assign different content blocks to slots and control store and timeframe visibility</li></ul> |
| Managing Content Slots | <ul><li>All store templates that have configurable content are visible in the Back Office</li><li>Content manager should be able to see what placeholders are available on each page and what content is assigned to them</li><li>Content manager can assign content to be shown in these placeholders based on Locale, Store, and other parameters</li><li>Content slots can be reserved specifically to be managed by 3rd party CMS</li></ul> |
| Standardization of 3rd Party CMS Integrations |3rd party CMS:<ul><li>Can take ownership of specific content slots</li><li>Provides Content Widget for retrieving block content and does server-side rendering in Spryker</li><li>Retrieves Spryker’s catalog content using Spryker’s REST API</li></ul>  |
| Multi-store Navigation | Navigation is one of the most important elements of any online store. The Multi-store Navigation:<ul><li>Supports Different Navigation Trees for multi-store setup</li><li>Defines what navigation elements to show based on:<ul><li>Store</li><li>Customer</li></ul></li></ul> |

### Commerce Functionality

| Feature | Description |
| --- | --- |
| Split Delivery | An order can be split  into multiple deliverables either in the storefront or in the Back Office.<ul><li>Support splitting an order into multiple Shipments</li><li>Introduces the Shipment object to group order items together</li><li>A shipment defines:</li><ul><li>Shipment method</li><li>Delivery address</li><li>Delivery date</li></ul> |
| Configurable Bundles | Give merchants the ability to guide customers through a complex purchasing process that involves selection of products from different product subsets while validating compatibility and pricing rules.<ul><li>Create templates for Configurable Bundles</li><li>Define compatibility and pricing rules</li><li>Guided navigation in the storefront to assist customer in configuration process</li></ul> |
| Shipping Cost | <ul><li>Add shipping cost to Approval Process</li><li>Add shipping cost to Request for Quote</li></ul> |
| Split Order | Split Order gives businesses the ability to split orders to be fulfilled by different merchants, from different locations, and at different times.<ul><li>Each suborder can be tracked independently</li><li>Customer is updated on the status of each suborder</li></ul> |
| Return Management | Give customers maximum flexibility through the Return Management feature. Using this feature:<ul><li>Customers can request to return products from past purchases from the storefront</li><li>Shop owner will be able to offer either an Exchange or a Refund</li></ul> |
| Additional Storefront APIs | <ul><li>Product ratings and reviews</li><li>Product Sorting</li><li>Discounts & Vouchers</li><li>Converting Guest shopping after customer logs in</li><li>Multiple shipment and payment methods on checkout</li><li>Product options</li><li>Bundles</li><li>Product Set</li><li>and others</li></ul> |
| Cloud Roadmap | Cloud enablement:<ul><li>Multi-store setup configuration</li><li>Logging improvements + preconfigured Kibana</li><li>Docker setup customization</li><li>Application configuration: ENV based, validation</li><li>Heartbeats, etc.</li></ul>Cloud support:<ul><li>Templates for AWS</li><li>Pre-built docker images</li><li>K8S support</li><li>Support Cloud-services: SQS, DB, S3, etc.</li></ul> |
| Advanced Multi-Store Setup &amp; Configuration | <ul><li>Back Office for store management</li><li>Back Office for payment methods management and multistore support</li><li>Simplified and standardized payment methods integration</li><li>Back Office for shipment methods management and multistore support</li><li>Back Office for warehouses management and multistore suppor</li></ul> |
| Digital Commerce for “Big Boxes” Retailers | Digital commerce solution for brands with a large number of retail locations:<ul><li>Retail location profile, location, and hours of operations</li><li>Store locator</li><li>Product availability and stock level per location</li><li>Product prices per location</li><li>Online customer experience in the context of</li></ul> |
    
<!-- Back Office APIs, with Glue API | Connect to 3rd party applications that can be used to manage backend data (e.g. PIM, CRM, etc.).<ul><li>It will support management of:<ul><li>Products</li><li>Stock</li><li>Prices</li><li>Orders</li><li>Customers</li><li>Content</li></ul></li></ul> -->
    
### Enterprise Marketplace

| Feature | Description |
| --- | --- |
| Extending your Store to an Enterprise Marketplace | ![Extending marketplace](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/What's+new/Roadmap/marketplace-image-roadmap.png){height="" width=""} |
| New Marketplace Specific Functionality | <ul><li>Marketplace Storefront</li><li>Marketplace Back Office</li><li>Merchant Portal</li></ul> |

{% info_block errorBox %}
The roadmap is presented for INFORMATIONAL PURPOSES ONLY, and not as a binding commitment. Spryker reserves the right to change timing and scope of released functionality based on input from our customers and changing market trends.
{% endinfo_block %}

Check out and [download](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/roadmap_q2-q3_2019_v2_final.pdf) the full version of roadmap.
