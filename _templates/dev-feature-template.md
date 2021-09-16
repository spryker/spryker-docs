---
title: {Meta name}
description: {Meta description}
template: dev-feature-template
---

<!--- Feature summary. Short and precise explanation of what the feature brings in terms of functionality.
-->


<!--- Feel free to drop the following part if User doc is not yet published-->
{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [{enter the feature name here}](enter the feature name here) for business users.
{% endinfo_block %} 

### Module Dependency Graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/1789259c-a652-4e9c-a1ad-d5f598de43f6.png?utm_medium=live&utm_source=custom)
<!--
Diagram content:
    -The module dependecy graph SHOULD contain all the modules that are specified in the feature  (don't confuse with
        module in the epic)
    - The module dependency graph MAY contain other module that might be useful or required to show
Diagram styles:
    - The diagram SHOULD be drown with the same style as the example in this doc
    - Use the same distance between boxes, the same colors, the same size of the boxes
Table content:
    - The table that goes after diagram SHOULD contain all the modules that are present on the diagram
    - The table should provide what role each module plays in this feature
-->
| Module                         | Description                                                             |
|--------------------------------|-------------------------------------------------------------------------|
| MerchantSalesReturn            | Provides functionality to connect Merchant to SalesReturn               |
| MerchantSalesReturnMerchantGui | Provides MerchantPortal UI for MerchantUser for SalesReturn management. |
### Domain Model
<!--
- Domain model SHOULD contain all the entities that were adjusted or introduced by the feature.
- All the new connections SHOULD be also shown and highlighted properly 
- Make sure to follow the same style as in the example
-->
![Domain Model](https://confluence-connect.gliffy.net/embed/image/8b8e20ec-f509-4117-827d-983dc9dc03f8.png?utm_medium=live&utm_source=custom)

### [Optional] A custom title
<!--
- Here you CAN cover the features techincal topic in more detail if needed.
- A diagram SHOULD be placed to make content easier to grasp
-->


## Related Developer articles


|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  |
|---------|---------|---------|
| [Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-prices-feature-integration.html)          | [Retrieving product offer prices](/docs/marketplace/dev/glue-api-guides/{{page.version}}/product-offers/retrieving-product-offer-prices.html)          | [File details: price-product-offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-price-product-offer-csv.html)           |
|[Glue API: Marketplace Product Offer Prices integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-feature-integration.html)           |           |           |
