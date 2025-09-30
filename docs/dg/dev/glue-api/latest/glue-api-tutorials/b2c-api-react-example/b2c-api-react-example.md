---
title: B2C API React example
description: B2C API React example is a single-page web application that demonstrates the use of Spryker Glue REST API in B2C scenarios.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/b2c-api-react-example
originalArticleId: 094f9906-b82e-49aa-9af5-27199c5d2c01
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/glue-api-tutorials/b2c-api-react-example/b2c-api-react-example.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-api-tutorials/b2c-api-react-example/b2c-api-react-example.html

related:
  - title: Install B2C API React example
    link: docs/dg/dev/glue-api/latest/glue-api-tutorials/b2c-api-react-example/install-b2c-api-react-example.html
  - title: Glue REST API
    link: docs/dg/dev/glue-api/latest/rest-api/glue-rest-api.html
---

As a part of documentation related to Spryker Glue REST API, we have also developed a B2C API React example. It is a [React](https://reactjs.org/) single-page application based on a [webpack](https://webpack.js.org/) dev server, Typescript, [Redux](https://redux.js.org/), and Material UI.

The application has been developed for four primary purposes:

1. Provide a simple yet fully functional example of Glue REST API usage.
2. Illustrate a complete B2C Spryker experience using REST endpoints, starting from selecting the necessary product all the way through to placing an order. The shop also demonstrates the use of API resources to create such features as the product catalog, search, auto-suggestions, customer registration, cart management, and displaying order details.
3. Let you try Glue REST API without any coding.
4. Provide sample REST requests that can facilitate custom touchpoint development.

{% info_block errorBox %}

The shop is provided only for display purposes and must under no circumstances be used as a starting point for any project.

{% endinfo_block %}

## API resources

The Demo Shop was built using and demonstrates the use of the endpoints and resources provided by the following APIs:


| API | REFERENCE DOCUMENTS |
| --- | --- |
| Search API | [Catalog search](/docs/pbc/all/search/latest/base-shop/manage-using-glue-api/glue-api-search-the-product-catalog.html)<br>[Getting suggestions for auto-completion and search](/docs/pbc/all/search/latest/base-shop/manage-using-glue-api/glue-api-retrieve-autocomplete-and-search-suggestions.html) |
| Category API | [Retrieving category trees](/docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-trees.html) |
| Product API | [Retrieving abstract products](/docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html)<br>[Glue API: Retrieving concrete products](/docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html) |
| Product Availability API | [Retrieve abstract product availability](/docs/pbc/all/warehouse-management-system/latest/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-availability.html)<br>[Retrieve concrete product availability](/docs/pbc/all/warehouse-management-system/latest/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-availability.html) |
| Product Price API | [Retrieving abstract product prices](/docs/pbc/all/price-management/latest/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html)<br>[Retrieving concrete product prices](/docs/pbc/all/price-management/latest/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html) |
| Product Tax Sets API | [Retrieving product tax sets](/docs/pbc/all/tax-management/latest/base-shop/manage-using-glue-api/retrieve-tax-sets.html) |
| Product Image Sets API | [Retrieving image sets of abstract products](/docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-image-sets-of-abstract-products.html)<br>[Retrieving image sets of concrete products](/docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html) |
| Product Labels API | [Retrieving product labels](/docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html) |
| Login API | [Authentication and authorization](/docs/dg/dev/glue-api/latest/authentication-and-authorization.html) |
| Customer API | [Managing customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html) |
| Cart API | [Guest carts](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html)<br>[Carts of registered users](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html) |
| Checkout API | [Checking out purchases and getting checkout data](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html) |
| Order History API | [Retrieving customer's order history](/docs/pbc/all/order-management-system/latest/base-shop/glue-api-retrieve-orders.html) |
| Wishlist API | [Managing wishlists](/docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html) |
| Store API | [Retrieving store configuration](/docs/pbc/all/miscellaneous/latest/manage-using-glue-api/glue-api-retrieve-store-configuration.html) |

## Running the example application

The app source code can be found in the following GitHub repository: [https://github.com/spryker-shop/b2c-api-react-example](https://github.com/spryker-shop/b2c-api-react-example). You can install it inside [Spryker Development Virtual Machine](/docs/scos/dev/sdk/development-virtual-machine-docker-containers-and-console.html) or on a dedicated web server.

To install the example application, see [Install B2C API React example](/docs/dg/dev/glue-api/latest/glue-api-tutorials/b2c-api-react-example/b2c-api-react-example.html).

## Peeking requests

After installing and running the example app, you can try its functionality. Depending on how you installed it, the shop is available at the following endpoints:

- `http://glue.de.b2c-demo-shop.local/react/`—if installed in the VM.
- `http://react.local`—if installed on a separate web server.

To get a list of Glue API requests that have been used to build a page, follow these steps:

1. Open the F12 menu of your web browser.
2. Activate the **Console** section.
3. To get details of a specific request, expand it in the console.

![glue-requests-sample.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/B2C+API+React+Example/glue-requests-sample.png)
