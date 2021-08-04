---
title: Managing Customer Access to API Resources
originalLink: https://documentation.spryker.com/v6/docs/managing-customer-access-to-api-resources
redirect_from:
  - /v6/docs/managing-customer-access-to-api-resources
  - /v6/docs/en/managing-customer-access-to-api-resources
---

The [Customer Access API](https://documentation.spryker.com/docs/getting-the-list-of-protected-resources) allows storefront owners to prevent unauthorized (guest) users from accessing certain REST API resources. This capability is tied up to the [Customer Access](https://documentation.spryker.com/docs/managing-customer-access) Feature that allows you to restrict access to certain content items in *Spryker Back Office*.

The access to resources protected by the API depends on the setup of the *Customer Access* Feature. If a certain type of information is restricted to **customer access only**, all API resources associated with it will be protected from unauthorized access. If the access is unrestricted, the respective resources are available to guest users as well. For example, if you restrict the **can place an order** functionality to customer access only, customers will be able to check out an order only when authenticated. Alongside with that, the associated API resources (`checkout` and `checkout-data`) will be available only upon authentication. If you don’t restrict access, everyone will be able to use the resources. In other words, you can prevent access only to the resources that belong to one of the *Customer Access Feature* items.

In this article, you will learn how to map API resources to *Customer Access Feature* items.

{% info_block infoBox %}

*Customer Access Feature* items available out of the box are mapped to API resource types by default. The corresponding resource types are:
* **price** - `abstract-product-prices` and `concrete-product-prices`;
* **add-to-cart** - `guest-cart-items`;
* **wishlist** - `wishlists` and `wishlist-items`;
* **can place an order** - `checkout` and `checkout-data`.

{% endinfo_block %}

1. To define the mapping of API resource types to content types, open or create file `src/Pyz/Glue/CustomerAccessRestApi/CustomerAccessRestApiConfig.php`.

2. The file contains the `CustomerAccessRestApiConfig::CUSTOMER_ACCESS_CONTENT_TYPE_TO_RESOURCE_TYPE_MAPPING` array, where each entry specifies a mapping of a *Customer Access Feature* item to the corresponding API resource type(s).
For example, in the following code block, item **can place an order** is mapped to **2** resource types: *checkout* and *checkout-data*:

   ```php
   <?php
 
   namespace Pyz\Glue\CustomerAccessRestApi;
   ...
 
   class CustomerAccessRestApiConfig extends SprykerCustomerAccessRestApiConfig
   {
       protected const CUSTOMER_ACCESS_CONTENT_TYPE_TO_RESOURCE_TYPE_MAPPING = [
           CustomerAccessConfig::CONTENT_TYPE_ORDER_PLACE_SUBMIT => [
               CheckoutRestApiConfig::RESOURCE_CHECKOUT,
               CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
           ],
       ];
   }
   ```

   Define the mapping of the resources you need.
   For constants that represent the content item types, see file `src/Spryker/Shared/CustomerAccess/CustomerAccessConfig.php`.

   For constants that represent API resource types, see configuration files of the corresponding APIs.

3. When done, save the file.

4. Now, you can restrict access to the *Customer Access Feature* items that are mapped to the REST API resources you want to protect. This is done in Spryker Back Office*. For detailed instructions, see [Managing Customer Access](https://documentation.spryker.com/docs/managing-customer-access).

{% info_block infoBox %}

The default `CustomerAccessRestApiConfig.php` of Spryker Storefronts looks as follows:

```php
<?php
 
namespace Pyz\Glue\CustomerAccessRestApi;
 
use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\CustomerAccessRestApi\CustomerAccessRestApiConfig as SprykerCustomerAccessRestApiConfig;
use Spryker\Glue\ProductPricesRestApi\ProductPricesRestApiConfig;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiConfig;
use Spryker\Shared\CustomerAccess\CustomerAccessConfig;
 
class CustomerAccessRestApiConfig extends SprykerCustomerAccessRestApiConfig
{
    protected const CUSTOMER_ACCESS_CONTENT_TYPE_TO_RESOURCE_TYPE_MAPPING = [
        CustomerAccessConfig::CONTENT_TYPE_PRICE => [
            ProductPricesRestApiConfig::RESOURCE_ABSTRACT_PRODUCT_PRICES,
            ProductPricesRestApiConfig::RESOURCE_CONCRETE_PRODUCT_PRICES,
        ],
        CustomerAccessConfig::CONTENT_TYPE_ORDER_PLACE_SUBMIT => [
            CheckoutRestApiConfig::RESOURCE_CHECKOUT,
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
        ],
        CustomerAccessConfig::CONTENT_TYPE_ADD_TO_CART => [
            CartsRestApiConfig::RESOURCE_GUEST_CARTS_ITEMS,
        ],
        CustomerAccessConfig::CONTENT_TYPE_WISHLIST => [
            WishlistsRestApiConfig::RESOURCE_WISHLISTS,
            WishlistsRestApiConfig::RESOURCE_WISHLIST_ITEMS,
        ],
    ];
}
```

{% endinfo_block %}

