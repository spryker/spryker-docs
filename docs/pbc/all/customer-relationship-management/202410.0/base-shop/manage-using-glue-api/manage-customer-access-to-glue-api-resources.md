---
title: Manage customer access to Glue API resources
description:  Learn how to manage customer access to Glue API resources in Spryker Cloud Commerce OS, ensuring secure and efficient resource control for your e-commerce store
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customer-access-to-glue-api-resources
originalArticleId: 8811d81a-5a7a-4c30-a73f-d1ae53494e9e
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/glue-api-howtos/managing-customer-access-to-glue-api-resources.html
related:
  - title: Authentication and Authorization
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: Install the Customer Access Glue API
    link: docs/pbc/all/identity-access-management/page.version/install-and-upgrade/install-the-customer-access-glue-api.html
---

The [Customer Access API](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-retrieve-protected-resources.html) allows storefront owners to prevent unauthorized (guest) users from accessing certain REST API resources. This capability is tied up to the [Customer Access](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-customer-access.html) feature that allows you to restrict access to certain content items in *Spryker Back Office*.

The access to resources protected by the API depends on the setup of the *[Customer Access](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/customer-access-feature-overview.html)* feature. If a certain type of information is restricted to *customer access only*, all API resources associated with it are protected from unauthorized access. If the access is unrestricted, the respective resources are available to guest users as well. For example, if you restrict the *can place an order* functionality to customer access only, customers can check out an order only when authenticated. Alongside that, the associated API resources (`checkout` and `checkout-data)` are available only upon authentication. If you don't restrict access, everyone can use the resources. In other words, you can prevent access only to the resources that belong to one of the Customer Access feature items.

This document shows how to map API resources to the Customer Access feature items.

{% info_block infoBox %}

The Customer Access feature items available out of the box are mapped to API resource types by default. The corresponding resource types are as follows:

- *price*: `abstract-product-prices` and `concrete-product-prices`
- *add-to-cart*: `guest-cart-items`
- *wishlist*: `wishlists` and `wishlist-items`
- *can place an order*: `checkout` and `checkout-data`

{% endinfo_block %}

To define the mapping of API resource types to content types, follow these steps:
1. Open or create file `src/Pyz/Glue/CustomerAccessRestApi/CustomerAccessRestApiConfig.php`.
2. The file contains the `CustomerAccessRestApiConfig::CUSTOMER_ACCESS_CONTENT_TYPE_TO_RESOURCE_TYPE_MAPPING` array, where each entry specifies a mapping of a *Customer Access Feature* item to the corresponding API resource type.

For example, in the following code block, an item *can place an order* is mapped to two resource types: `checkout` and `checkout-data`:

```php
<?php

namespace Pyz/Glue/CustomerAccessRestApi;
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

3. Save the file.
4. You can restrict access to the Customer Access feature items that are mapped to the REST API resources you want to protect. This is done in Spryker Back Office*. For detailed instructions, see [Managing Customer Access](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-customer-access.html).

{% info_block infoBox %}

The default `CustomerAccessRestApiConfig.php` of Spryker Storefront looks as follows:

```php
<?php

namespace Pyz/Glue/CustomerAccessRestApi;

use Spryker/Glue/CheckoutRestApi/CheckoutRestApiConfig;
use Spryker/Glue/CartsRestApi/CartsRestApiConfig;
use Spryker/Glue/CustomerAccessRestApi/CustomerAccessRestApiConfig as SprykerCustomerAccessRestApiConfig;
use Spryker/Glue/ProductPricesRestApi/ProductPricesRestApiConfig;
use Spryker/Glue/WishlistsRestApi/WishlistsRestApiConfig;
use Spryker/Shared/CustomerAccess/CustomerAccessConfig;

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
