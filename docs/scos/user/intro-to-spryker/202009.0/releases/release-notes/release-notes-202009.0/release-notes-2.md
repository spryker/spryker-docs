---
title: Release notes 202009.0
originalLink: https://documentation.spryker.com/v6/docs/release-notes-2020090
redirect_from:
  - /v6/docs/release-notes-2020090
  - /v6/docs/en/release-notes-2020090
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of new features and enhancements we are announcing in September 2020.
For information about installing the Spryker Commerce OS see [Getting Started Guide](https://documentation.spryker.com/docs/dev-getting-started).

Check out our release notes video for the quick illustration of the new features and improvements:

<iframe src="https://fast.wistia.net/embed/iframe/ivsvzay3cl" title="Spryker Release Notes 202001.0" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="640" height="360"></iframe>


## Spryker Commerce OS
### Return Management

The **Return Management** feature provides multiple ways to return items of an order:

* As a Customer, you can create a return for your order in your customer account on the Storefront. 
* As a Back Office user, you can create a return from the Order details page in the Back Office. 
* As a Customer Support Manager, you can create a return on behalf of a Customer via the Agent Assist functionality. 

You can define the **return policy** per each store. By default, the return policy is based on the 30 days **return period**, but you can change the default return period for your project.

When creating a return, a Customer can see all the relevant return information such as the return period, if the item is returnable or not, as well as set a return reason and check the item's states and the total remuneration.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image9.png){height="" width=""}

#### Documentation
[Return Management](https://documentation.spryker.com/v6/docs/en/return-management)

### Custom Order Reference 
**Custom Order Reference** is a small but powerful feature that allows Customers and Back Office Users to add an external reference to the orders. It can be a reference to a system that manages internal purchases or a ticket system. This reference can be saved and viewed both on the Storefront and in the Back Office.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image5.png){height="" width=""}

#### Documentation
[Custom Order Reference](https://documentation.spryker.com/v6/docs/custom-order-reference)

### Filter and Search in Order Archive 

**Filter and Search in Order Archive** allows B2C users to search and filter orders in their order archive, and for B2B users, it opens even more possibilities. **Filter and Search** adds two new permissions that allow B2B users to view their orders, orders of their Business Units, and orders of their Company. Now, the order management provides multiple tools to find an order by order reference, product name, or product SKU and to see products of the orders on the order archive page.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image14.png){height="" width=""}

#### Documentation
[Filter and Search in Order Archive](https://documentation.spryker.com/v6/docs/shop-guide-order-history#sorting-and-filtering-orders--b2b-shop-)

### Adding shipment cost to RFQ 
**Adding shipment cost for RFQ** is a new step in the Quotation Process at Spryker. Previously, it was not possible to create a quote with a shipment cost. Now, the quote contains the full cost of the purchase, including shipping. 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image6.png){height="" width=""}

#### Documentation
[Quotation Process & RFQ](https://documentation.spryker.com/v6/docs/quotation-process-rfq-201907)

### Product Relations per Store
We have enhanced our multi-store feature with a new product management functionality.
Starting from this release, **Product Relations can be assigned to stores**. You can now define different Product Relations of the same type (related product or up-sell) and assign them to specific stores.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image12.gif){height="" width=""}

#### Documentation
[Product Relations](https://documentation.spryker.com/v6/docs/en/product-relations)

### Product Labels per Store
We have enhanced the Product Labels feature so that now you can define the stores a product label is displayed in.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image8.png){height="" width=""}

#### Documentation
[Product Labels](https://documentation.spryker.com/v6/docs/en/product-label) 

### Ability to Change Image and Name in a Product Group
We have improved our Front-end component **Product Abstract Card** to fully support the Product Group feature. Whenever you hover over the color selector on the card, the picture, title, and price of the product are updated to match your selection.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image16.gif){height="" width=""}

#### Documentation
[Product Group](https://documentation.spryker.com/v6/docs/product-group)

### Navigation as Content Item
Our **Navigation** feature joins the Content Management capability. You can now define navigation as a content item and use it anywhere inside your Storefront. Simply add the navigation content item to a CMS Block or Page.
This also allows creating a different navigation for each store and locale.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image11.gif){height="" width=""}

#### Documentation
[Navigation](https://documentation.spryker.com/v6/docs/navigation-feature-summary) 

### Emails as CMS Blocks
You can now manage emails you send to customers, using the Spryker CMS. Starting from this release, you can **define emails' content and layout** by editing CMS Blocks and applying email templates.
For each email template, there are HTML and text versions available by default. Choose a template to meet your requirements, manage translations via glossary keys, and build complex logic via our Twig template engine.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image1.png){height="" width=""}

#### Documentation
[Email as CMS Block](https://documentation.spryker.com/docs/email-as-a-cms-block)

### New Navigation for the Back Office
We have reorganized our Back Office navigation to make it more clear and easier to use.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image3.png){height="" width=""}

### Add to Cart from the Category Page
Adding a product with one variant to cart has become easier with this release. Now you can **add a simple product from the catalog to cart** in one click. Product groups that contain multiple simple products also support this behavior, as you can switch between variants on the catalog page. 
Products that have more than one variant do not have the Add to cart button on the Category page. 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image4.png){height="" width=""}

#### Documentation
[Quick Order from the Catalog Page](https://documentation.spryker.com/v6/docs/quick-order-from-the-catalog-page)

### Double opt-in for Customer Registration
Spryker now supports a **double opt-in for Customer sign-ups**, that can happen either from the sign-up page or during the checkout process.
When a Customer signs up, an email with a confirmation link is sent to the provided email address. The Customer must click the link to verify the email address and thereby perform the double opt-in, which will then allow the Customer to log in.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image10.png){height="" width=""}

#### Documentation
[Customer Registration](https://documentation.spryker.com/v6/docs/customer-registration)

### Trigger Forgot Password Emails When Importing Customers 
Spryker provides you with two new console commands to help migrate existing customers to a Spryker project. When importing new customers into your Spryker project, you can send the *forgot password* email to them so that they can set up the passwords for their accounts.

#### Documentation
[Password Management](https://documentation.spryker.com/docs/password-management)

## Order Management Enhancements 
### Display State of Order Item
On the order list and order details pages on the Storefront, we have added states for each of the ordered items. Now, all OMS states are displayed on the Storefront so Customers can always check statuses of their orders.
Besides using the default OMS states to be displayed on the Storefront, you can also **define custom display names** for order states or a group of states. By displaying the appropriate state names in the Customer Account, you can make the order states understandable for Customers and avoid showing pure technical states.

#### Documentation
[HowTo - Display Custom Names for Order Item States on the Storefront](/docs/scos/dev/tutorials-and-howtos/202009.0/howtos/feature-howtos/howto-display-c)

### Order Cancelation
Customer, Agent, and Back Office users can now **cancel orders** during the cancelation period. The cancellation period is 30 minutes by default, and you can customize it for your project. The Sales Order item states in which a product can be canceled are defined with a dedicated flag in the State Machine.

#### Documentation
[Order Cancellation](https://documentation.spryker.com/v6/docs/order-cancellation)

### Invoice Generation
Spryker now supports **invoice generation** inside the OMS processes. Starting from this release, the Back Office users can trigger the `invoice-generate` order state, which generates the order invoice and sends it to the Customer’s email address. 

#### Documentation
[Invoice Generation](https://documentation.spryker.com/v6/docs/en/invoice-generation)

### Maximum Order Threshold
The Order Thresholds feature, in addition to the minimum order threshold, now supports the maximum one. The **maximum order threshold** allows to define an order value that shouldn't be reached for the order to be placed.

#### Documentation
[Order Thresholds](https://documentation.spryker.com/v6/docs/en/order-thresholds)

## Data Exchange
### Data Import Documentation
We have improved data importers’ documentation, making it easier to understand how Spryker Demo Shop data import works for most common import operations: Products, Prices, Stock, Content, Merchandising, etc. 
You will have access to detailed information about CSV files format, dependencies, and mandatory information needed to run the data import operation.

#### Documentation
[About Demo Shop Data Import](https://documentation.spryker.com/v6/docs/about-demo-shop-data-import)

### Data Import: Configuration (YAML) File for Batch Data Import
We have improved the data importers’ usability. 
Using a **YAML configuration file** as a parameter of data:import **console command**, you will now be able to **import several CSV data files in a batch**, having the flexibility of defining it without changing your project’s source code.
You may now change names and locations of the CSV files to be imported, define a YAML configuration file with a data subset to import as a bulk, making it easier to manage your data import operation.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image2.png){height="" width=""}

#### Documentation
[Importing Data with a Configuration File](/docs/scos/dev/developer-guides/202009.0/development-guide/data-import/importing-data-)

### Data Import: Import Product Data with a Single File
Generating and using different .csv files (*productabstract.csv, productconcrete.csv, productprice.csv, productstock.csv*, etc.) to import product data can be, for some users, time-consuming and difficult to manage. In this release, we have added an ability of **bulk product data import** **with a single .csv file**, which might be especially useful to:
Manage different environments (production, staging, etc.), and populate them all with the product data.
Speed up the frequent import of product data.
Optimize error handling.
Provide more autonomy to business users managing product data updates.

The new **combined product data import with a single file** feature allows to import at once the following product data sets: Product Abstract Store, Product Abstract, Product Concrete, Product Stock, Product Group, Product Prices, Product Images, to one or to multiple stores.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image7.png){height="" width=""}

To execute it, a single .csv file with the combined product data-sets to import needs to be created and its sequence specified in the configuration YAML file. 
The combined product data-sets follow an identical format as the individual .csv files used by the modular data importers. The existing modular data importers managing individual product .csv files are not impacted (that is, *productabstract.csv, productconcrete.csv, product_price.csv*, etc. will continue to work as before).

#### Documentation
[Importing Product Data With a Single File](https://documentation.spryker.com/v6/docs/en/importing-product-data-with-a-single-file)

### Data Export (Orders)
The new **Data Export Sales Orders** feature allows you to export orders, order items, and order expenses data for one or multiple stores, giving the flexibility to define filter criteria to export only what is necessary. 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Nots+202009.0/image15.png){height="" width=""}

Using an export **YAML configuration file**, you have the flexibility to define a filter to export data from specific stores and date/time period of orders, for both ranges of order creation and update, without needing to change any project source code.

Each export execution generates at minimum three different .csv files: orders.csv, order-items.csv, and order-expenses.csv. The output files can be split into more files depending on the used criteria (that is, each file split by store).   

A new console `data:export command` was implemented to be able to export these .csv order files.

#### Documentation
[Data Export](/docs/scos/dev/sdk/202009.0/data-export)

## Spryker Glue API
We continue to add support for new storefront APIs.

### Measurement Units API
Both in the B2B and B2C contexts, you’ll find many cases when you want to sell products not by unit but by different measures. For example, you can offer apples by “Kilogram” and cables by “Centimeter”, “Meter” or “Feet” instead of by “Item”. This API enables you to **use measurement units throughout the purchasing’s user journey in product detail pages, cart, checkout, and orders**.

#### Documentation
[Measurement Units API](/docs/scos/dev/glue-api-guides/202009.0/retrieving-meas)

### Shopping Lists API
In the B2B context, shopping lists play a key role. Company users can create and manage shopping lists of frequently purchased products to help them complete recurrent purchases and to organize their shopping preferences with ease. With this API, you can **enable your customers’ company users to create and retrieve shopping lists, edit and delete them, add and remove items from a shopping list, etc**.

#### Documentation
[Shopping Lists API](/docs/scos/dev/glue-api-guides/202009.0/managing-carts/carts-of-registered-users/managing-carts-)

### Promotional Products API
Equally important in B2B and B2C are product discounts and promotions. In our previous release, we already provided endpoints for cart rules and vouchers. Now you will also be able to make use of the API to **offer discounts consisting of promotional products**. With this API, you can apply promotional product discounts to allow adding a promotional product to cart, and highlight it among the cart items.

#### Documentation
[Promotions API](/docs/scos/dev/glue-api-guides/202009.0/retrieving-prom)

### Checkout API - Shipment and Payment Methods
The checkout process is paramount for your business in any business model. With this API, you will be able to **integrate shipment and payment methods** seamlessly into your checkout process. You can get shipment and payment methods with one single request and also make use of only the information you need on each checkout step.

#### Documentation

* [Checking Out Purchases and Getting Checkout Data](https://documentation.spryker.com/v6/docs/checking-out-purchases-and-getting-checkout-data-201907)
* [Retrieving Customer's Order History](https://documentation.spryker.com/v6/docs/retrieving-customers-order-history)

### Refresh Token API 
To enable the maximum level of security for your system, you must be able to invalidate (refresh) tokens in the presence of potential menaces. With this API, **refresh tokens are made persistent long-term, and you will be able to revoke them at any time for each user**. You can also configure the amount of time for persistence and clean the refresh tokens up from the database when necessary.

#### Documentation
[Token Revocation](https://documentation.spryker.com/v6/docs/authentication-and-authorization#token-revocation)

### Gift Cards API
Enabling your customers to **use and redeem gift cards** in your shop provides an important business value. We enable you to set this process also through the GLUE API. The cart codes endpoint provides your customers with the gift card’s redemption functionality. These endpoints can also be used for voucher redemption for a unified experience. 

The necessary logic has been added to the checkout endpoints to secure the purchase of gift cards against fraud and risk of non-payment, by avoiding the use of payment methods such as invoice to acquire them.

#### Documentation

* [Managing Gift Cards of Guest Users](https://documentation.spryker.com/v6/docs/en/managing-gift-cards-of-guest-users)
* [Managing Gift Cards of Registered Users](https://documentation.spryker.com/v6/docs/en/managing-gift-cards-of-registered-users)

### Swagger Documentation Generator Contains “Includes” by Endpoint
In order to make it easier for API consumers to understand the content of those endpoints following the compound documents section of the JSONAPI specification, in this release, we have introduced improvements that will allow you to have upfront information by endpoint about the primary resources that can be included in the response. This can be useful not only for a basic understanding of the endpoints but also for automation purposes.

#### Documentation
[Resource Relationships](https://documentation.spryker.com/v6/docs/documenting-glue-api-resources#resource-relationships)

## Technical Enhancements
### Raise Modules Code Quality to PHPStan Level 5+
We have **improved the code quality of all our modules** by enforcing PHPStan level 5+ for those modules which have scored below level 5 in the past. We have fixed all important issues which we encountered during the effort to raise the remaining modules to this level and have made sure that they remain backwards compatible. 

### Console Applications Bootstrap Enhancements 
Previously, console applications did not boot the specified/required application plugins for historical reasons. We have enhanced this behaviour by ensuring that the **specified/required application plugins are consistently booted for all console applications**.

### Zed Unresolved Files Optimization
Our customers are using the Spryker Back Office (Zed UI) more and more often to administer their Spryker shop system. Also, the Zed UI is regularly involved in heavy calculation calls (Cart Calculation, Order placement, etc). We, therefore, have decided to improve its performance by introducing the same optimization mechanism as already used for Yves (File Cache Resolver). This will reduce unnecessary file system checks and therefore result in a **more efficient performance of the Zed UI** and **responsive user experience** for its users. In some project optimizations, we have achieved a reduction of the Zed execution time by 5-10%.

### B2B Performance Optimizations 
We have significantly **improved the performance of adding items to a user’s shopping cart** to allow for a much more responsive and pleasant shopping experience of users in the current shops. The improvements are noticeable in all scenarios where a user can add one or multiple items to a shopping cart, such as the quick adding to cart from the search results, adding multiple items from a B2B shopping list, creating shopping list from carts, or duplicating the carts. 

Results of the final benchmarking:

* Open shopping list -20%
* Create a shopping list from cart -33%

Further B2B Performance Optimizations are to follow in Q3/Q4. Stay tuned!

### Yves Console
Starting from this release, Yves, our backend-rendered frontend application, has its own separate console application. This significantly improves the separation of concerns and enables us to execute Yves specific console commands such as `Twig cache warm-up`.
The new recommended console entry endpoint for Yves is located in `vendor/bin/yves` and is based on [Symfony’s console component](https://symfony.com/doc/current/components/console.html). Therefore, you can add your own console command implementations by extending the corresponding classes. Within the implementation, you have multiple options to tailor your command to your needs, such as adding application plugins, event subscribers as well as pre- and post-run hooks.

#### Documentation
[CLI Entry Point for Yves](/docs/scos/dev/developer-guides/202009.0/development-guide/back-end/yves/cli-entry-point)

### Custom OMS Timeout Processors
The order management system (OMS) validates the state of order items in fixed time intervals. This can lead to a high number of unnecessary checks if orders have a fixed future date for shipment, delivery or pick up, etc. This can be the case if, for example, the orders contain perishables or are subject to other constraints.
To avoid the unnecessary checks and load on the OMS, we have added custom Timeout Processors for the OMS, which allow you to specify custom checks for orders within the OMS state machine. Due to the Timeout processors, the checks are executed according to defined parameters in the state machine, such as timeout and frequency of the check. 

#### Documentation
[OMS Timeout Processor](https://documentation.spryker.com/v6/docs/order-process-modelling-state-machines#oms-timeout-processor)

