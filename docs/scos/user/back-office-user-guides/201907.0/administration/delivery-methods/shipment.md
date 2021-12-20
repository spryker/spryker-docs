---
title: Shipment
description: The section can be used to create multiple shipping carriers and add shipment services and methods in the Back Office.
last_updated: Dec 23, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/shipment-management
originalArticleId: 7fe338cf-6e29-47b3-a11a-fbadd292edb6
redirect_from:
  - /v3/docs/shipment-management
  - /v3/docs/en/shipment-management
related:
  - title: "Reference information: Shipment method plugins"
    link: docs/scos/dev/feature-walkthroughs/page.version/shipment-feature-walkthrough/reference-information-shipment-method-plugins.html
---

The Shipment section of the Spryker Back Office is mostly used by Spryker Admins.
The carrier companies that you want to have integrated into the shop can be configured from the Back Office. For each carrier company, you can add one or more shipment methods that you want to enable in the shop.
A carrier company refers to a company that provides shipment services (e.g.: DHL, UPS, etc.) A carrier company can have one or more shipment services associated (e.g.: Express Delivery, Standard Delivery).
<br>**Standardized flow of actions for a Spryker Admin**
![Shipment - Spryker Admin](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/shipment-section.png)

{% info_block infoBox %}
This is how a Spryker Admin interacts with the other departments to set up and manage the shipment methods and carrier companies in the Back Office.
{% endinfo_block %}
***
**What's next?**
In order to set the shipment structure, you set up the carrier company first.
To know more about how you set up and manage the shipment methods and carrier companies, see the following articles:

* [Creating a Carrier Company](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/delivery-methods/creating-carrier-companies.html)
* [Creating and Managing Shipment Methods](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/delivery-methods/creating-and-managing-delivery-methods.html)
