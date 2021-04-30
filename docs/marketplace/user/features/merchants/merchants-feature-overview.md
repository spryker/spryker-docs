---
title: Merchants feature overview 
template: concept-topic-template
---

*Merchant* is a seller of goods or services, either a business or a private person working in the Marketplace environment. Merchants manage their business in the *Merchant Portal*. The *Merchant Portal* allows merchants to upload and manage merchant products and [offers](https://documentation.spryker.com/marketplace/docs/product-offer-feature-overview), define prices and stock, fulfill orders, and edit merchant profile information.

Merchant is the core entity of the Spryker Marketplace, and the second main entity after customers since the Marketplace connects the buying customers and the selling customers.
Every merchant in the Spryker Marketplace has a unique identifier in the system called *Merchant SKU*. 

## Merchant statuses
The Marketplace administrator manages merchants and sets their statuses on the **Merchants** <!-- LINK TO BO GUIDE-->page in the Back Office. Merchant statuses define the level of access of the specific merchant to: 

* The Merchant Portal:
    * *Waiting for approval*. Once the merchant record is created, this status is applied.
    * *Approved*. Once the record is approved, the merchant receives an email with the password information required to access the Merchant Portal. When the merchant is approved, merchant users can log in and create offers and products in the Merchant Portal. <a name="denied"></a>
    * *Denied*. A Marketplace administrator can deny access to the approved merchant. If denied, the merchant cannot log in to the Merchant Portal.

* The merchant profile page, product offers and merchant products on the Storefront:
    * *Active*. This status can be set only for the approved merchants. It indicates that the merchant's profile page is online, and the merchant can create offers and products. A merchant can also create offers and products and manage their sales activity.
    * *Inactive*. This status indicates that the merchant's profile page, products and offers are offline. It is the default status for the created merchant. With this status, the merchant can not perform their selling online.


| STATUS | MERCHANT PORTAL ACCESS | STOREFRONT PROFILE PAGE, OFFERS AND PRODUCTS |
| --- | --- | --- |
| Waiting For Approval | ✗ | N/A |
| Approved | ✓ | N/A |
| Denied | ✗ | N/A |
| Active | N/A | ✓ |
| Inactive | N/A | ✗ |

<!--See LINK TO BO GUIDE HOW TO ACTIVATE A MERCHANT for details on to change the merchant user statues in the Back Office-->

Schematically, the merchant status change flow looks like this:

![Merchant status flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-status-flow.png)

## Merchant warehouse
Every merchant manages their own stock using the *merchant warehouse*. 

When a merchant is created, the corresponding warehouse is created for this merchant. The warehouse name is based on the following schema: `merchant name + merchant reference + warehouse + index starting with 1, 2 etc.`

:::(Info) (Example name)
"Spryker MER000001 Warehouse 1" where `Spryker` is the merchant name, MER000001 is the nerchant reference, and the index is 1 as it is the first warehouse created.
:::

Thus, the Merchant entity and Stock entity are connected as follows:

![merchant-stock](https://confluence-connect.gliffy.net/embed/image/5920eb06-7ad1-45e3-9323-e6cd8a0cf519.png?utm_medium=live&utm_source=custom)

## Merchant category
As the Marketplace environment presupposes having a lot of sellers—merchants, classification and categorization of merchants arise at some point. For this purpose, Merchant Category entity exists. By defining merchant categories for merchants, you add flexibility to the working process and allow customers to implement different business logic on your project.
For shoppers, it's convenient to find the necessary and relevant merchants and their products according to certain merchant categories.

## Merchants on the storefront
### Merchant profile

On the Storefront, customers can check the relevant merchant information on the *Merchant Profile* page. The information can be defined whether by the Marketplace administrator in the Back Office or by the merchant in the Merchant Portal.
![Merchant profile page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-profile-page.png)

![Viewing merchant profile](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/view-merchant-profile.gif)

### Merchant opening hours
According to the statuses described in the [Merchant statuses](#merchant-statuses) section, the merchant profile page is available only if the merchant has the `Active`status. Otherwise, the 404 error (page not found) is displayed when navigating to the profile page. To provide maximum selling activity, merchants can provide their working schedule, by defining the opening hours on weekdays, holidays and exceptional cases.

A merchant has:

* Default opening hours—defined per weekday and time including:
    * Lunch break time
    * Open/Closed state

* Special opening hours—are relevant for cases:

    * Merchant is opened on a usually closed day (e.g. Sunday)
    * Merchant has different opening hours in comparison to a normal schedule (e.g. December 31th has shorter opening hours)

* Public holidays—Special days when the Merchant is not available due to the public holidays

### Merchant links on the storefront pages
Marketplace Storefront allows buyers to check what merchants are the owners of the offers and products the customers are buying. The respective merchant names with the link to the merchant profile page are available:

* on the product detail page

![Merchant link on the PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-link-on-pdp.png

* on the cart page

![Merchant link on the cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-link-on-the-cart-page.png)

* on the summary checkout page

![Merchant link on the summary checkout page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-link-on-summary-page.png)

* on the order details page

![Merchant link on the order details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-link-on-order-details.png)

### Searching and filtering by merchant name
In the Spryker Marketplace, you can search for the products sold by a specific merchant by entering the merchant name in the search field. The search results contain the merchant products and/or the abstract products the merchant product offers are related to. The search suggestions and the auto-completion functionality provide the merchant products and offers by the merchant name. 
![Search by merchant name](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/search-by-merchant-name.gif)

In the catalog and search results pages, there is the merchant multi-select filter. This filter allows shoppers to see only the products with the product offers belonging to the selected merchant. See [Standard Filters](https://documentation.spryker.com/docs/standard-filters) documentation for more details on the filters available in the Spryker Commerce OS.

![Merchant search filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Merchants/Merchants+feature+overview/merchant-filter.gif)


If the merchant is not active, their products and offers are not displayed in the search suggestions, search results and in the merchant filter.

## Merchants and the API
Spryker Marketplace provides API to:

* Retrieve merchant information and display the merchant profile in the custom storefront. For details, see [Retrieving Merchant Information](https://documentation.spryker.com/marketplace/docs/retrieving-merchant-information).
* Retrieve search and filter results by merchant name. For details, see [Searching by products](https://documentation.spryker.com/marketplace/docs/catalog-search#search-by-products) and [Retrieving suggestions](https://documentation.spryker.com/marketplace/docs/retrieving-suggestions-for-auto-completion-and-search#retrieve-a-suggestion).

