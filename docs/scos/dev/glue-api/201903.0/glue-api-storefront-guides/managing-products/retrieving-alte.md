---
title: Retrieving Alternative Products
originalLink: https://documentation.spryker.com/v2/docs/retrieving-alternative-products-201903
redirect_from:
  - /v2/docs/retrieving-alternative-products-201903
  - /v2/docs/en/retrieving-alternative-products-201903
---

The _Alternative Products_ feature allows customers to quickly find a substitute product in case if their preferred item runs out of stock or is no longer available for other reasons. The feature is particularly useful when a certain product becomes discontinued. In this case, customers usually seek for a more up-to-date generation of the same product, and suggesting possible alternatives is especially crucial.

{% info_block infoBox %}
For more details, see [Alternative Products](/docs/scos/dev/features/201903.0/product-management/alternative-products/alternative-pro
{% endinfo_block %} and [Discontinued Products](/docs/scos/dev/features/201903.0/product-management/discontinued-products/discontinued-pr).)

The Product Alternatives API provides access to alternative products via REST API requests. In particular, you can:

* Find out whether a specific concrete product is discontinued;
* Retrieve a list of alternative products for a specific product.

{% info_block warningBox %}
Only **concrete** products can be marked as discontinued and, therefore, alternatives can be specified for **concrete** products only.
{% endinfo_block %}

In your development, the endpoints can help you to:

* Provide alternatives to a customer in the case when a desired product runs out of stock or is otherwise unavailable, for example, due to local restrictions;
* Provide replacements in case a certain product is discontinued;
* Make alternative products available to customers in their shopping list or suggestions area in order to make searching for and comparing similar products easier. This can significantly enhance the shopping experience in your shop.

{% info_block errorBox %}
It is the responsibility of the client to identify whether a product is unavailable and when to provide alternatives. The API only provides information on availability, discontinued status and possible alternatives.
{% endinfo_block %}

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see Alternative Products.

{% info_block infoBox %}
To be able to use **Product Alternatives API**, first, you need to have the _Alternative Products_ feature integrated with your project.<br>To be able to handle discontinued products, first, integrate the _Discontinued Products_ feature.
{% endinfo_block %}

## Managing Products
Retrieving Alternative Products
The Alternative Products feature allows customers to quickly find a substitute product in case if their preferred item runs out of stock or is no longer available for other reasons. The feature is particularly useful when a certain product becomes discontinued. In this case, customers usually seek for a more up-to-date generation of the same product, and suggesting possible alternatives is especially crucial.

For more details, see Alternative Products and Discontinued Products.

The Product Alternatives API provides access to alternative products via REST API requests. In particular, you can:

Find out whether a specific concrete product is discontinued;
Retrieve a list of alternative products for a specific product.
Only concrete products can be marked as discontinued and, therefore, alternatives can be specified for concrete products only.

In your development, the endpoints can help you to:

Provide alternatives to a customer in the case when a desired product runs out of stock or is otherwise unavailable, for example, due to local restrictions;
Provide replacements in case a certain product is discontinued;
Make alternative products available to customers in their shopping list or suggestions area in order to make searching for and comparing similar products easier. This can significantly enhance the shopping experience in your shop.
It is the responsibility of the client to identify whether a product is unavailable and when to provide alternatives. The API only provides information on availability, discontinued status and possible alternatives.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see Alternative Products.

{% info_block infoBox %}
To be able to use Product Alternatives API, first, you need to have the Alternative Products feature integrated with your project.<br>To be able to handle discontinued products, first, integrate the Discontinued Products feature.
{% endinfo_block %}

## Checking Whether Product is Discontinued
Before suggesting an alternative product, first, you need to identify whether a product is still available, i.e. not discontinued. For this purpose, the response of the `/concrete-products` endpoint has been extended with the following attributes:

| Attribute | Type | Description |
| --- | --- | --- |
| isDiscontinued | Boolean | Specifies whether a product is discontinued:<br>**true** - the product is discontinued and requires a replacement item; <br> **false** - the product is not discontinued. |
| discontinuedNote | String | Contains an optional note that was specified when marking a product as discontinued. |

{% info_block warningBox %}
Only **concrete** products can be marked as discontinued.
{% endinfo_block %}

To find out whether a product is discontinued, send a GET request to the endpoint:

`/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %} `
Retrieves information on a **concrete** product by SKU.

Sample request: `GET http://mysprykershop.com/concrete-products/145_29885470`
where `145_29885470` is the SKU of the concrete product.

If the request was successful and a product with the specified SKU was found, the resource responds with a `RestConcreteProductsResponse`. Sample response (truncated) with the `isDiscontinued` and `discontinuedNote` fields populated:

```js
{
    "data": {
        "type": "concrete-products",
        "id": "145_29885470",
        "attributes": {
            "isDiscontinued": true,
            "discontinuedNote": "Replaced by Acer Aspire S7",
            "sku": "145_29885470",
            "name": "DELL Chromebook 13",
            "description": "The industry’s finest Sleek. Smooth. Strong: The carbon fiber finish with magnesium alloy is light, durable, cool to the touch and designed to impress. The Google ecosystem at your service: Expect Speed - boots in seconds, Simplicity - easy to use and manage, Secure - with virus protection built-in, encrypted user data and automated updates. A wide range of magnificence: Bring business projects to full light with industry leading brightness and viewing angles on a 13.3\" FHD IPS display with optional scratch-resistant Corning® Gorilla® Glass NBT™ touch display. Business class performance - Browse faster using up to core i5 5th gen intel Core processors and experience the performance of Dell's most powerful chromebook. Professional looks and productivity: Thoughtfully designed to be sleek and useful with a carbon fiber lid, dark gray alloy chassis, backlit keyboard, glass track pad and 1080p display. Work on the go: Securely and easily access servers, mirror desktops and improve lifecycle management with Dell unique IP from KACE, SonicWALL (VPN) and Wyse.",
            "attributes": {...},
            "superAttributesDefinition": [...],
            "metaTitle": "DELL Chromebook 13",
            "metaKeywords": "DELL,Entertainment Electronics",
            "metaDescription": "The industry’s finest Sleek. Smooth. Strong: The carbon fiber finish with magnesium alloy is light, durable, cool to the touch and designed to impress. The",
            "attributeNames": {...}
        },
        "links": {...},
        "relationships": {...}
    },
    "included": [...]
}
```

{% info_block infoBox %}
For a detailed listing of all fields available in the response, as well as possible errors, see [General Product Information](
{% endinfo_block %}.)
{% info_block infoBox %}
You can also use the **Accept-Language** header to specify the locale.<br>Sample header:<br>`[{"key":"Accept-Language","value":"de, en;q=0.9"}]`<br>where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](
{% endinfo_block %}.)

### Possible Errors
| Code | Reason |
| --- | --- |
| 400 | Concrete product ID not specified |
| 404 | Concrete product not found |

## Retrieving Alternatives for Product
To retrieve alternatives for a product, send a GET request to the following endpoints:

* `/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-alternative-products` - gets **abstract** products that substitute the item whose SKU is specified;
* `/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/concrete-alternative-products` - gets **concrete** products that substitute the item whose SKU is specified.

Sample request: `GET http://mysprykershop.com/concrete-products/145_29885470/abstract-alternative-products`
where `145_29885470` is the SKU of the product you are searching alternatives for.

{% info_block warningBox %}
Alternatives are available only for **concrete** products.
{% endinfo_block %}

### Response
Depending on the endpoint used, the request will be either an **AbstractProductsRestCollectionResponse** or a **ConcreteProductsRestCollectionResponse**:

* `AbstractProductsRestCollectionResponse` - represents a collection, where each item is an **abstract** alternative to the product requested;
* `ConcreteProductsRestCollectionResponse` - represents a collection, where each item is a **concrete** alternative to the product requested.

{% info_block infoBox %}
For a detailed description of abstract and concrete product fields, see [General Product Information](
{% endinfo_block %}.)

#### Sample Responses:

<details open>
<summary>Response containing abstract alternatives for a product </summary>

```js
{
  "data": [
    {
      "type": "abstract-products",
      "id": "055",
      "attributes": {...},
      "links": {
        "self": "http://mysprykershop.com/abstract-products/055"
      }
    },
    {
      "type": "abstract-products",
      "id": "056",
      "attributes": {...},
      "links": {
        "self": "http://mysprykershop.com/abstract-products/056"
      }
    }
  ],
  "links": {
    "self": "http://mysprykershop.com/concrete-products/145_29885470/abstract-alternative-products"
  }
}
```
<br>
</details>

<details open>
<summary>Response containing concrete alternatives for a product </summary>

```js
{
    "data": [
        {
            "type": "concrete-products",
            "id": "142_30943081",
            "attributes": {...},
            "links": {
                "self": "http://mysprykershop.com/concrete-products/142_30943081"
            }
        },
        {
            "type": "concrete-products",
            "id": "140_22766487",
            "attributes": {...},
            "links": {
                "self": "http://mysprykershop.com/concrete-products/140_22766487"
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/concrete-products/138_30046855/concrete-alternative-products"
    }
}
```
<br>
</details>

{% info_block infoBox %}
You can also use the **Accept-Language** header to specify the locale.<br>Sample header:<br>`[{"key":"Accept-Language","value":"de, en;q=0.9"}]`<br>where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](
{% endinfo_block %}.)

### Possible Errors
| Code | Reason |
| --- | --- |
| 400 | Concrete product ID not specified |
| 404 | Concrete product not found |
