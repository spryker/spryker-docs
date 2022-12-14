---
title: Integrate Bazaarvoice
description: Find out how you can integrate Bazaarvoice into your Spryker shop
template: howto-guide-template 
---

## Prerequisites

The BazaarVoice app requires the following Spryker modules:

* `spryker/asset: ^1.2.0`
* `spryker/asset-storage: ^1.1.0`
* `spryker/message-broker: ^1.0.0`
* `spryker/message-broker-aws: ^1.0.0`
* `spryker/message-broker-extension: ^1.0.0`
* `spryker-shop/asset-widget: ^1.0.0`
* `spryker-shop/product-detail-page: ^3.17.0`
* `spryker-shop/product-category-widget: ^1.6.0`
* `spryker-shop/shop-ui: ^1.59.0`

## Integrate Bazaarvoice

To integrate Bazaarvoice, follow these steps:

### 1. Connect Bazaarvoice

1. In your store's Back Office, go to **Apps > Catalog**.
2. Click **Bazaarvoice**.
3. In the top right corner of the Bazaarvoice app details page, click **Connect app**.
   This takes you to the Bazaarvoice site with the signup form.
4. Fill out the Bazaarvoice signup form and submit it.
   You should receive the Bazaarvoice credentials.
5. Go back to your store's Back Office, to the Bazaarvoice app details page.
6. In the top right corner of the Bazaarvoice app details page, click **Configure**.
7. In the **Configure** pane, enter the credentials you received from Bazaarvoice.

That's it. You have integrated the Bazaarvoice app into your store. It usually takes Bazaarvoice a few days to process your product feed. Therefore, you should see the external ratings and reviews from Bazaarvoice in about 2-3 days after you integrated the app.

{% info_block infoBox "Info" %}

You can do the administration work on the Bazaarvoice reviews from the [Bazaarvoice portal](https://portal.bazaarvoice.com/signin?ref=spryker-documentation). For example, you can approve individual reviews. See [Workbench overview](https://knowledge.bazaarvoice.com/wp-content/brandedge-pro-wb/en_US/basics/workbench_overview.html#log-in-to-workbench?ref=spryker-documentation) for details on how you can manage reviews from the Bazaarvoice portal.

{% endinfo_block %}

### 2. Add Bazaarvoice domain to your allowlist

To enable your customers to leave reviews on your products, you must add the Bazaarvoice domain to your **Content Security Policy** allowlist. To do that, change your `deploy.yml` file or your `config/Shared/config_default.php` file if changing the environment variable is not possible.

In the `deploy.yml` file, introduce the required changes: 

```yml
image:
  environment:
    SPRYKER_AOP_APPLICATION: '{
      "APP_DOMAINS": [
        "*.bazaarvoice.com",
        ...
      ],
      ...
    }'
```

Alternatively, you may add the domain to the allowlist from the `config/Shared/config_default.php` file. If you updated the `deploy.yml` file, then this step can be ignored.

```php
$config[KernelConstants::DOMAIN_WHITELIST][] = '*.bazaarvoice.com';
```

### 3. Add markup to custom templates

The Bazaarvoice PBC takes data of products from Yves pages (for example Product Detail Page).
To get necessary data from the pages are used schemas from [Schema.org](https://schema.org/).
By default, all the necessary markups are already added to Yves templates.

To custom templates the markups required for the Bazaarvoice PBC must be added according to the tables below.

#### DCC (product catalog collection)
Core Template: `SprykerShop/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`

| schema.org property          | Bazaarvoice property |
|------------------------------|----------------------|
| product.sku                  | productId            |
| product.name                 | productName          |
| product.description          | productDescription   |
| product.image                | productImageURL      |
| product.url                  | productPageURL       |
| brand.name                   | brandId, brandName   |
| product.category             | categoryPath         |
| product.gtin12               | upcs                 |
| product.inProductGroupWithID | family               |

#### DCC (merchant catalog collection)
Core Template: `SprykerShop/Yves/MerchantProfileWidget/Theme/default/components/molecules/merchant-profile/merchant-profile.twig`

| schema.org property        | Bazaarvoice property |
|----------------------------|----------------------|
| organization.identifier    | productId            |
| organization.name          | productName          |
| organization.logo          | productDescription   |

#### Tracking Pixel
Core Templates:
* `SprykerShop/Yves/PaymentPage/Theme/default/views/payment-success/index.twig`
* `SprykerShop/Yves/CheckoutPage/Theme/default/views/order-success/order-success.twig`
* `SprykerShop/Yves/MerchantWidget/Theme/default/views/merchant-meta-schema/merchant-meta-schema.twig` (only for a Marketplace)

| schema.org property                        | Bazaarvoice property | Only for a Marketplace |
|--------------------------------------------|----------------------|------------------------|
| invoice.email                              | email                |                        |
| invoice.priceCurrency                      | currency             |                        |
| invoice.identifier                         | orderId              |                        |
| invoice.total                              | price                |                        |
| invoice.orderItem.price                    | items.price          |                        |
| invoice.orderItem.orderQuantity            | items.quantity       |                        |
| invoice.orderItem.sku                      | items.productId      |                        |
| invoice.orderItem.name                     | items.name           |                        |
| invoice.orderItem.offers.seller.name       | items.productId      | *                      |
| invoice.orderItem.offers.seller.identifier | items.name           | *                      |

#### Ratings and Reviews (Product)
Core Templates:
* `SprykerShop/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`
* `SprykerShop/Yves/ProductReviewWidget/Theme/default/views/pdp-review-rating/pdp-review-rating.twig`
* `SprykerShop/Yves/ProductReviewWidget/Theme/default/components/organisms/review-summary/review-summary.twig`

| schema.org property         | CLass name                |
|-----------------------------|---------------------------|
| product.sku                 |                           |
| aggregateRating.ratingValue |                           |
| aggregateRating.bestRating  |                           |
|                             | review-summary            |

#### Ratings and Reviews (Merchant)
Core Template: `SprykerShop/Yves/MerchantProfileWidget/Theme/default/components/molecules/merchant-profile/merchant-profile.twig`

| schema.org property         | CLass name                |
|-----------------------------|---------------------------|
| aggregateRating             |                           |
|                             | review-summary            |

#### Inline Ratings
Core Templates:
* `SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.twig`
* `SprykerShop/Yves/ProductReviewWidget/Theme/default/views/product-review-display/product-review-display.twig`
* `SprykerShop/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.twig`

| schema.org property         | CLass name      |
|-----------------------------|-----------------|
| product.sku                 |                 |
| aggregateRating.ratingValue |                 |
| aggregateRating.bestRating  |                 |
|                             | rating-selector |

## Next steps

[Configure the Bazzarevoice app](/docs/pbc/all/ratings-reviews/third-party-integrations/configure-bazaarvoice.html) for your store.
