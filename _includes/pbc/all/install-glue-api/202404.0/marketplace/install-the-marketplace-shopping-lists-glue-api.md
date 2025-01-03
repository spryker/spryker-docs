This document describes how to integrate the Marketplace Shopping Lists feature API into a Spryker project.

## Install feature core

Follow the steps below to install Marketplace Shopping Lists API feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| - | - | - |
| Spryker Core | {{page.version}} |  [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)
| Marketplace Shopping Lists | {{page.version}} | [Install the Marketplace Shopping Lists feature](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-shopping-lists-feature.html)

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-product-offer-shopping-lists-api require spryker/merchant-product-shopping-lists-api require spryker/product-offer-shopping-lists-rest-api
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOfferShoppingListsRestApi | vendor/spryker/merchant-product-offer-shopping-lists-api |
| MerchantProductShoppingListsRestApi | vendor/spryker/merchant-product-shopping-lists-api |
| ProductOfferShoppingListsRestApi | vendor/spryker/product-offer-shopping-lists-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| RestShoppingListItemsAttributes.productOfferReference | property | Created | src/Generated/Shared/Transfer/RestShoppingListItemsAttributesTransfer.php |
| MerchantProductOfferShoppingListsRestApi.productOfferReference | property | Created | src/Generated/Shared/Transfer/RestShoppingListItemsAttributesTransfer.php |
| MerchantProductOfferShoppingListsRestApi.merchantReference | property | Created | src/Generated/Shared/Transfer/RestShoppingListItemsAttributesTransfer.php |
| MerchantProductShoppingListsRestApi.merchantReference | property | Created | src/Generated/Shared/Transfer/RestShoppingListItemsAttributesTransfer.php |

{% endinfo_block %}

### 3) Set up plugins

Set up plugins to load additional relations in the shopping list items resource:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantByMerchantReferenceResourceRelationshipPlugin | Adds `merchant` resources as relationship by the product offer reference.                     |   | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin | Adds `product offer availabilities` resources as relationship by the product offer reference. |   | Spryker\Glue\ProductOfferAvailabilitiesRestApi\Plugin\GlueApplication |
| ProductOffersByProductOfferReferenceResourceRelationshipPlugin | Adds `product offers` resources as relationship by the product offer reference.               |   | Spryker\Glue\ProductOffersRestApi\Plugin\GlueApplication |
| ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin | Adds `product offer prices` resources as relationship the by the product offer reference.         |   | Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication |

<details><summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ProductOffersByProductOfferReferenceResourceRelationshipPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ShoppingListsRestApiConfig::RESOURCE_SHOPPING_LIST_ITEMS,
            new MerchantByMerchantReferenceResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            ShoppingListsRestApiConfig::RESOURCE_SHOPPING_LIST_ITEMS,
            new ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            ShoppingListsRestApiConfig::RESOURCE_SHOPPING_LIST_ITEMS,
            new ProductOffersByProductOfferReferenceResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            ShoppingListsRestApiConfig::RESOURCE_SHOPPING_LIST_ITEMS,
            new ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```
</details>

{% info_block warningBox "Verification" %}

1. Make sure that merchant and offer references are present by sending the `POST` request to `https://glue.mysprykershop.com/shopping-lists/{shoppingListReference}/shopping-list-items`

Request sample:

```json
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "productOfferReference": "offer360",
            "quantity": 1,            
            "sku": "204_29851280"
        }
    }
}
```

Response sample:

```json
{
  "data": {
    "type": "shopping-list-items",
    "id": "5eb9f15f-f127-5929-89ed-c240b41f888e",
    "attributes": {
      "productOfferReference": "offer360",
      "merchantReference": "MER000006",
      "quantity": 1,
      "sku": "204_29851280"
    },
    "links": {
      "self": "https://glue.mysprykershop.com/shopping-lists/cf032865-d1ad-5e27-803a-423bd15ced66/shopping-list-items/5eb9f15f-f127-5929-89ed-c240b41f888e"
    }
  }
}
```

2. Make sure that product offers, product concrete availabilities, product offers' availabilities and merchants are loaded by sending the `GET` request to `https://glue.mysprykershop.com/shopping-lists/{shoppingListReference}?include=concrete-products,shopping-list-items,product-offers,product-offer-availabilities,concrete-product-availabilities,merchants`

<details><summary>Response data sample with the included concrete products, shopping list items, product offers, product offer availabilities, concrete product availabilities, and merchants</summary>

```json
{
   "data": {
      "type": "shopping-lists",
      "id": "cf032865-d1ad-5e27-803a-423bd15ced66",
      "attributes": {
         "owner": "Sonia Wagner",
         "name": "Laptops",
         "numberOfItems": 16,
         "updatedAt": "2022-02-14 15:10:08.000000",
         "createdAt": "2022-02-14 15:10:08.000000"
      },
      "links": {
         "self": "https://glue.mysprykershop.com/shopping-lists/cf032865-d1ad-5e27-803a-423bd15ced66?include=concrete-products,shopping-list-items,product-offers,product-offer-availabilities,concrete-product-availabilities,merchants"
      },
   },
   "included": [
      {
         "type": "concrete-product-availabilities",
         "id": "134_29759322",
         "attributes": {
            "isNeverOutOfStock": true,
            "availability": true,
            "quantity": "0.0000000000"
         },
         "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/134_29759322/concrete-product-availabilities"
         }
      },

      {
         "type": "concrete-product-availabilities",
         "id": "204_29851280",
         "attributes": {
            "isNeverOutOfStock": false,
            "availability": true,
            "quantity": "1.0000000000"
         },
         "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/204_29851280/concrete-product-availabilities"
         }
      },
      {
         "type": "merchants",
         "id": "MER000006",
         "attributes": {
            "merchantName": "Sony Experts",
            "merchantUrl": "/en/merchant/sony-experts",
            "contactPersonRole": "Brand Manager",
            "contactPersonTitle": "Ms",
            "contactPersonFirstName": "Michele",
            "contactPersonLastName": "Nemeth",
            "contactPersonPhone": "030/123456789",
            "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-logo.png",
            "publicEmail": "support@sony-experts.com",
            "publicPhone": "+49 30 234567691",
            "description": "Capture your moment with the best cameras from Sony. From pocket-size to professional-style, they all pack features to deliver the best quality pictures.Discover the range of Sony cameras, lenses and accessories, and capture your favorite moments with precision and style with the best cameras can offer.",
            "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png",
            "deliveryTime": "1-3 days",
            "faxNumber": "+49 30 234567600",
            "legalInformation": {
               "terms": "<p><h3>General Terms</h3><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><h3>Using your Information</h3><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><h3>Protecting visitor information</h3><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
               "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
               "imprint": "<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Munich<br>Register Number: HYY 134306<br></p>",
               "dataPrivacy": "Sony Experts values the privacy of your personal data."
            },
            "categories": []
         },
         "links": {
            "self": "https://glue.mysprykershop.com/merchants/MER000006"
         }
      },
      {
          "type": "product-offer-availabilities",
         "id": "offer360",
         "attributes": {
          "isNeverOutOfStock": true,
            "availability": true,
            "quantity": "0.0000000000"
         },
         "links": {
          "self": "https://glue.mysprykershop.com/product-offers/offer360/product-offer-availabilities"
         }
      }
   ]
}
```
</details>

{% endinfo_block %}

## Install related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| - | - | - |
| Marketplace Shopping Lists | {{page.version}} | [Install the Marketplace Shopping Lists feature](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-shopping-lists-feature.html)  |
