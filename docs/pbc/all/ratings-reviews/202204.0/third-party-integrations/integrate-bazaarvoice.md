  - /docs/pbc/all/ratings-reviews/202204.0/third-party-integrations/integrate-bazaarvoice.html
---
title: Integrate Bazaarvoice
description: Find out how you can integrate Bazaarvoice into your Spryker shop
template: howto-guide-template 
---

## Prerequisites

The Bazaarvoice app requires the following Spryker modules:

* `spryker/asset: ^1.3.0`
* `spryker/asset-storage: ^1.1.0`
* `spryker/message-broker: ^1.3.0`
* `spryker/message-broker-aws: ^1.3.2`
* `spryker/message-broker-extension: ^1.1.0`
* `spryker-shop/asset-widget: ^1.0.0`
* `spryker-shop/cart-page: ^3.32.0`
* `spryker-shop/product-detail-page: ^3.17.0`
* `spryker-shop/product-category-widget: ^1.6.0`
* `spryker-shop/shop-ui: ^1.62.0`
* `spryker-shop/checkout-page: ^3.23.0`
* `spryker-shop/merchant-page: ^1.1.0` (Marketplace only)
* `spryker-shop/merchant-profile-widget: ^1.1.0` (Marketplace only)
* `spryker-shop/merchant-widget: ^1.3.0` (Marketplace only)
* `spryker-shop/payment-page: ^1.3.0`

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

The Bazaarvoice PBC takes data on products from the Storefront pages (for example, Product Detail page).
To get necessary data from the pages, schemas from [Schema.org](https://schema.org/) are used.
By default, the necessary markups are already available in the Yves templates.

If you have custom templates or make your own frontend, the markups required for the Bazaarvoice PBC must be added according to the tables below.

#### DCC (product catalog collection)
Core template: `SprykerShop/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`

| SCHEMA.ORG PROPERTY          | BAZAARVOICE PROPERTY |
|------------------------------|----------------------|
| product.sku                  | productId            |
| product.name                 | productName          |
| product.description          | productDescription   |
| product.image                | productImageURL      |
| product.url                  | productPageURL       |
| product.brand.name           | brandId, brandName   |
| product.category             | categoryPath         |
| product.gtin12               | upcs                 |
| product.inProductGroupWithID | family               |

#### DCC (merchant catalog collection)
Core template: `SprykerShop/Yves/MerchantProfileWidget/Theme/default/components/molecules/merchant-profile/merchant-profile.twig`

| SCHEMA.ORG PROPERTY        | BAZAARVOICE PROPERTY |
|----------------------------|----------------------|
| organization.identifier    | productId            |
| organization.name          | productName          |
| organization.logo          | productImageURL      |

#### Tracking pixel
Core templates:
* `SprykerShop/Yves/PaymentPage/Theme/default/views/payment-success/index.twig`
* `SprykerShop/Yves/CheckoutPage/Theme/default/views/order-success/order-success.twig`
* `SprykerShop/Yves/MerchantWidget/Theme/default/views/merchant-meta-schema/merchant-meta-schema.twig` (only for Marketplace)

| SCHEMA.ORG PROPERTY                        | BAZAARVOICE PROPERTY | ONLY FOR MARKETPLACE |
|--------------------------------------------|----------------------|----------------------|
| invoice.email                              | email                |                      |
| invoice.priceCurrency                      | currency             |                      |
| invoice.identifier                         | orderId              |                      |
| invoice.total                              | price                |                      |
| invoice.orderItem.price                    | items.price          |                      |
| invoice.orderItem.orderQuantity            | items.quantity       |                      |
| invoice.orderItem.sku                      | items.productId      |                      |
| invoice.orderItem.name                     | items.name           |                      |
| invoice.orderItem.offers.seller.name       | items.productId      | *                    |
| invoice.orderItem.offers.seller.identifier | items.name           | *                    |

#### Ratings and reviews (Product)
Core templates:
* `SprykerShop/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`
* `SprykerShop/Yves/ProductReviewWidget/Theme/default/views/pdp-review-rating/pdp-review-rating.twig`
* `SprykerShop/Yves/ProductReviewWidget/Theme/default/components/organisms/review-summary/review-summary.twig`

Example:
```html
<section itemscope itemtype="https://schema.org/Product">
   <meta itemprop="sku" content="{some_sku}">
   
   <section itemscope itemtype="http://schema.org/AggregateRating" itemprop="aggregateRating">
      <meta itemprop="ratingValue" content="{rating}">
      <meta itemprop="bestRating" content="{best_rating}">
   </section>
   
   <section class="review-summary"></section>
</section>
```

#### Ratings and reviews (Merchant)
Core template: `SprykerShop/Yves/MerchantProfileWidget/Theme/default/components/molecules/merchant-profile/merchant-profile.twig`

Example:
```html
<section itemscope itemtype="https://schema.org/Organization">
   <section itemscope itemtype="http://schema.org/AggregateRating" itemprop="aggregateRating"></section>
   
   <section class="review-summary"></section>
</section>
```

#### Inline ratings
Core templates:
* `SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.twig`
* `SprykerShop/Yves/ProductReviewWidget/Theme/default/views/product-review-display/product-review-display.twig`
* `SprykerShop/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.twig`

Example:
```html
<section itemscope itemtype="https://schema.org/Product">
   <meta itemprop="sku" content="{some_sku}">
   
   <section itemscope itemtype="http://schema.org/AggregateRating" itemprop="aggregateRating">
      <meta itemprop="ratingValue" content="{rating}">
      <meta itemprop="bestRating" content="{best_rating}">
      
      <rating-selector></rating-selector>
   </section>
</section>
```

## Next steps
[Configure the Bazzarevoice app](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/configure-bazaarvoice.html) for your store.
