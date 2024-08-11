---
title: Marketplace Merchant feature overview
description: This document contains concept information for the Merchants feature in the Spryker Commerce OS.
template: concept-topic-template
last_updated: Nov 10, 2023
redirect_from:
  - /docs/marketplace/user/features/202307.0/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html
related:
  - title: Managing merchants
    link: docs/pbc/all/merchant-management/page.version/marketplace/manage-in-the-back-office/manage-merchants/create-merchants.html
---

A *merchant* is a seller of goods or services, either a business or a private person working in the Marketplace environment. Merchants manage their business in the *Merchant Portal*. The *Merchant Portal* lets merchants upload and manage merchant products and [offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/marketplace-product-offer-feature-overview.html), define prices and stock, fulfill orders, and edit merchant profile information. Merchant can have employees who can access the Merchant Portal and perform actions on the merchant's behalf there. These employees are referred to as [*merchant users*](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html).  

Merchant is the core entity of the Spryker Marketplace and the second main entity after customers since the Marketplace connects the buying customers and the selling customers.
Every merchant in the Spryker Marketplace has a unique identifier in the system called *Merchant SKU*. 
You can [create merchants in the Back Office](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html#creating-merchants) or [import merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html).

{% info_block infoBox "Note" %}

After you create a merchant, you can not delete it completely. You can only [deactivate](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html#activating-and-deactivating-merchants) the merchant.

{% endinfo_block %}

## Merchant statuses

The Marketplace administrator manages merchants and sets their statuses in the Back Office. Merchant statuses define the level of access of the specific merchant to:

* The Merchant Portal:
    * *Waiting for approval*. Once the merchant record is created, this status is applied.
    * *Approved*. Once the record is approved, the merchant receives an email with the password information required to access the Merchant Portal. When the merchant is approved, merchant users can log in and create offers and products in the Merchant Portal. <a name="denied"></a>
    * *Denied*. A Marketplace administrator can deny access to the approved merchant. If denied, the merchant cannot log in to the Merchant Portal.

<a name=active-merchants></a>

* The merchant profile page, product offers and marketplace products on the Storefront:
    * *Active*. This status can be set only for the approved merchants. It indicates that the merchant's profile page is online, and the merchant can create offers and products. A merchant can also create offers and products and manage their sales activity.
    * *Inactive*. This status indicates that the merchant's profile page, products, and offers are offline. It is the default status for the created merchant. With this status, the merchant can not perform their selling online.


| STATUS | MERCHANT PORTAL ACCESS | STOREFRONT PROFILE PAGE, OFFERS, AND PRODUCTS |
| --- | --- | --- |
| Waiting For Approval | ✗ | N/A |
| Approved | &check; | N/A |
| Denied | ✗ | N/A |
| Active | N/A | &check; |
| Inactive | N/A | ✗ |

For details about how to change the merchant statuses and activate or deactivate merchants in the Back Office, see [approving and denying merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html#approving-and-denying-merchants) and [activating and deactivating merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html#activating-and-deactivating-merchants).

{% info_block infoBox "Info" %}

Whenever a merchant is denied, all the users (/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html) of this merchant get deactivated. Upon re-approval, the merchant users must be manually activated one by one.

{% endinfo_block %}

Schematically, the merchant status change flow looks like this:

![Merchant status flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-status-flow.png)

## Merchant category

You can group merchants by categories to make your working process more efficient and simplify merchants' search for customers. For details, see [Merchant Category](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/merchant-opening-hours-feature-overview.html).

## Merchants on the Storefront

### Merchant profile

On the Storefront, customers can check the relevant merchant information on the **Merchant Profile** page.

{% info_block infoBox "Note" %}

The merchant profile page is available only if the merchant is [Active](#merchant-statuses).

{% endinfo_block %}

The information for a merchant profile can be defined:

* By the Marketplace administrator in the Back Office when [creating merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html#creating-merchants) or [editing merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html#editing-merchants).
* By importing the merchant profile data. For more information, see [File details: merchant_profile.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-profile.csv.html) and [File details: merchant_profile_address.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-profile-address.csv.html).
* By the merchant in the Merchant Portal:
![Merchant profile page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-profile-page.png)

![Viewing merchant profile](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/view-merchant-profile.gif)


### Merchant opening hours

To make the selling activity efficient, merchants can provide their working schedule that will display to buyers on the Storefront. For details, see [Merchant Opening Hours feature overview](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/merchant-opening-hours-feature-overview.html).

### Merchant links on the Storefront pages

Marketplace Storefront lets buyers check what merchants are the owners of the offers and products the customers are buying. The respective merchant names with the link to the merchant profile page are available:

* On the product detail page

![Merchant link on the PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-link-on-pdp.png)

* On the cart page

![Merchant link on the cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-link-on-the-cart-page.png)

* On the summary checkout page

![Merchant link on the summary checkout page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-link-on-summary-page.png)

* On the order details page

![Merchant link on the order details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-link-on-order-details.png)

### Searching and filtering by merchant name

In the Spryker Marketplace, you can search for the products sold by a specific merchant by entering the merchant name in the search field. The search results contain the marketplace products and/or the abstract products the merchant product offers are related to. The search suggestions and the auto-completion functionality provide the marketplace products and offers by the merchant name.
![Search by merchant name](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/search-by-merchant-name.gif)

In the catalog and search results pages, there is the merchant multi-select filter. This filter lets shoppers see only the products with the product offers belonging to the selected merchant. For more details about filters available in the Spryker Commerce O, see [Standard Filters](/docs/pbc/all/search/{{page.version}}/base-shop/search-feature-overview/standard-filters-overview.html) documentation.

![Merchant search filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-filter.gif)


If the merchant is not active, their products and offers are not displayed in the search suggestions, search results, and the merchant filter.

## Next steps

Learn about [merchant users](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html)

## Related Business User documents

| OVERVIEWS  |MERCHANT PORTAL USER GUIDES  |BACK OFFICE USER GUIDES |
|---------|---------|---------|
|[Merchant users overview](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html) | [Editing merchant's profile details](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/edit-merchant-profiles.html) |[Managing merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html)|
|[Main merchant concept](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/main-merchant.html)| | [Managing merchant users](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchant-users.html)|

## Related Developer documents

| INSTALLATION GUIDES | GLUE API GUIDES | DATA IMPORT |
| --- | --- | --- |
|[Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |[Retrieving merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html) | [File details: merchant.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html) |
|[Install the Marketplace Merchant Glue API](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-merchant-glue-api.html) | [Searching the product catalog](/docs/pbc/all/search/{{page.version}}/marketplace/glue-api-search-the-product-catalog.html) | [File details: merchant_profile.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-profile.csv.html) |
| [Install the Merchant Portal - Marketplace Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-merchant-feature.html) | [Retrieving autocomplete and search suggestions](/docs/pbc/all/search/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-autocomplete-and-search-suggestions.html) | [File details: merchant_profile_address.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-profile-address.csv.html) |
|     | [Resolving the URL of the merchant page](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/marketplace-glue-api-resolve-search-engine-friendly-urls.html) |[File details: merchant_stock.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-stock.csv.html) |
|   |   | [File details: merchant_store.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-store.csv.html)  |
