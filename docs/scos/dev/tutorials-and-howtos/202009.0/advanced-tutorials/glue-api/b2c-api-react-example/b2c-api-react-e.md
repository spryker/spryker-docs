---
title: B2C API React Example
originalLink: https://documentation.spryker.com/v6/docs/b2c-api-react-example
redirect_from:
  - /v6/docs/b2c-api-react-example
  - /v6/docs/en/b2c-api-react-example
---

As a part of documentation related to Spryker Glue REST API, we have also developed a B2C API React Example. It is a [React](https://reactjs.org/) single page application based on a [webpack](https://webpack.js.org/) devserver, Typescript, [Redux](https://redux.js.org/), and Material UI.

The application has been developed for four primary purposes:

1. Provide a simple yet fully functional example of Glue REST API usage.
2. Illustrate a complete B2C Spryker experience using REST endpoints, starting from selecting the necessary product all the way through to placing an order. The shop also demonstrates the use of the API resources to create such features as the product catalog, search, auto-suggestions, customer registration, cart management, displaying order details etc.
3. Allow you to try Glue REST API without any coding.
4. Provide sample REST requests that can facilitate custom touchpoint development.

{% info_block errorBox %}
The shop is provided for display purposes only and should not under any circumstances be used as a starting point for any project.
{% endinfo_block %}

## API Resources
The Demo shop has been built using and demonstrates the use of the endpoints and resources provided by the following APIs:


| API | Reference Documents |
| --- | --- |
| Search API | [Catalog search](https://documentation.spryker.com/docs/catalog-search)<br>[Getting suggestions for auto-completion and search](https://documentation.spryker.com/docs/retrieving-suggestions-for-auto-completion-and-search) |
| Category API | [Retrieving category trees](https://documentation.spryker.com/docs/retrieving-category-trees) |
| Product API | [Retrieving abstract products](https://documentation.spryker.com/docs/retrieving-abstract-products)<br>[Retrieving concrete products](https://documentation.spryker.com/docs/retrieving-concrete-products) |
| Product Availability API | [Retrieving abstract product availability](https://documentation.spryker.com/docs/retrieving-abstract-product-availability)<br>[Retrieving concrete product availability](https://documentation.spryker.com/docs/retrieving-concrete-product-availability) |
| Product Price API | [Retrieving abstract product prices](https://documentation.spryker.com/docs/retrieving-abstract-product-prices)<br>[Retrieving concrete product prices](https://documentation.spryker.com/docs/retrieving-concrete-product-prices) |
| Product Tax Sets API | [Retrieving product tax sets](https://documentation.spryker.com/docs/retrieving-tax-sets) |
| Product Image Sets API | [Retrieving image sets of abstract products](https://documentation.spryker.com/docs/retrieving-image-sets-of-abstract-products)<br>[Retrieving image sets of concrete products](https://documentation.spryker.com/docs/retrieving-image-sets-of-concrete-products) |
| Product Labels API | [Retrieving product labels](https://documentation.spryker.com/docs/retrieving-product-labels) |
| Login API | [Authentication and authorization](https://documentation.spryker.com/docs/authentication-and-authorization) |
| Customer API | [Managing customers](https://documentation.spryker.com/docs/customers) |
| Cart API | [Guest carts](https://documentation.spryker.com/docs/managing-guest-carts)<br>[Carts of registered users](https://documentation.spryker.com/docs/managing-carts-of-registered-users) |
| Checkout API | [Checking out purchases and getting checkout data](https://documentation.spryker.com/docs/checking-out-purchases-and-getting-checkout-data-201907) |
| Order History API | [Retrieving customer's order history](https://documentation.spryker.com/docs/retrieving-customers-order-history) |
| Wishlist API | [Managing wishlists](https://documentation.spryker.com/docs/managing-wishlists) |
| Store API | [Retrieving store configuration](https://documentation.spryker.com/docs/retrieving-store-configuration) |

## Running the Example Application
The app source code can be found in the following GitHub repository: [https://github.com/spryker-shop/b2c-api-react-example](https://github.com/spryker-shop/b2c-api-react-example). You can install it inside [Spryker Development Virtual Machine](https://documentation.spryker.com/docs/devvm) or on a dedicated web server.

For detailed installation steps, see [B2C API React Example Installation](https://documentation.spryker.com/docs/b2c-api-react-example-installation).

## Peeking Requests
After installing and running the example app, you can try its functionality. Depending on how you installed it, the shop will be available at:

* [http://glue.de.b2c-demo-shop.local/react/](http://glue.de.b2c-demo-shop.local/react/) - when installed it in the VM;
* [http://react.local](http://react.local) - when installed on a separate web server.

To get a list of Glue API requests that were used to build a page:

1. Open the F12 menu of your web browser.
2. Activate the **Console** section.
3. To get details of a specific request, expand it in the console.

![glue-requests-sample.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/B2C+API+React+Example/glue-requests-sample.png){height="" width=""}
