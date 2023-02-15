---
title: Integrate Bazaarvoice
description: Find out how you can integrate Bazaarvoice into your Spryker shop
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/ratings-reviews/third-party-integrations/integrate-bazaarvoice.html
---

## Prerequisites

The BazaarVoice app requires the following Spryker modules:

* `spryker/asset: ^1.3.0`
* `spryker/asset-storage: ^1.1.0`
* `spryker/message-broker: ^1.3.0`
* `spryker/message-broker-aws: ^1.3.2`
* `spryker/product-review: ^2.10.0`
* `spryker/product-review-gui: ^1.5.0`
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
4. In the top right corner of the Bazaarvoice app details page, click **Configure**.
5. In the **Configure** pane, enter the credentials you received from Bazaarvoice.

That's it. You have integrated the Bazaarvoice app into your store. It usually takes Bazaarvoice a few days to process your product feed. Therefore, you should see the external ratings and reviews from Bazaarvoice in about 2-3 days after you integrated the app.

{% info_block infoBox "Info" %}

You can do the administration work on the Bazaarvoice reviews from the [Bazaarvoice portal](https://portal.bazaarvoice.com/signin?ref=spryker-documentation). For example, you can approve individual reviews. See [Workbench overview](https://knowledge.bazaarvoice.com/wp-content/brandedge-pro-wb/en_US/basics/workbench_overview.html#log-in-to-workbench?ref=spryker-documentation) for details on how you can manage reviews from the Bazaarvoice portal.

{% endinfo_block %}

### 2. Add Bazaarvoice domain to your allowlist

To enable your customers to leave reviews on your products, you must add the Bazaarvoice domain to your **Content Security Policy** allowlist. 

To do that, do one of the following:
- change the `deploy.yml` file: 

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

- update the `config/Shared/config_default.php` file:

```php
$config[KernelConstants::DOMAIN_WHITELIST][] = '*.bazaarvoice.com';
```

### 3. Add markup to custom templates

The Bazaarvoice app takes data on products from the Storefront pages (for example, Product Detail page, Catalog page).
To get necessary data from the pages, schemas from [Schema.org](https://schema.org/) are used.
By default, the necessary markups are already available in the Yves templates.

If you have custom Yves templates or make your own frontend, add the markups required for the Bazaarvoice app according to the tables below.

#### DCC (dynamic catalog collection) for products
Core template: `SprykerShop/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`

| schema.org property          | Bazaarvoice property |
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

#### DCC for merchants

{% info_block infoBox "Note" %}

Since merchants don't have own entities in the Bazaarvoice service, products with specific IDs, or merchant references, are used instead.

{% endinfo_block %}

Core template:
`SprykerShop/Yves/MerchantProfileWidget/Theme/default/components/molecules/merchant-profile/merchant-profile.twig`

| schema.org property        | Bazaarvoice property |
|----------------------------|----------------------|
| organization.identifier    | productId            |
| organization.name          | productName          |
| organization.logo          | productImageURL      |

#### Tracking pixel
Core templates:
* `SprykerShop/Yves/PaymentPage/Theme/default/views/payment-success/index.twig`
* `SprykerShop/Yves/CheckoutPage/Theme/default/views/order-success/order-success.twig`

| schema.org property                        | Bazaarvoice property | Only for Marketplace |
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

#### Ratings and reviews (for Product)
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

#### Ratings and reviews (for Merchant)
Core template:
`SprykerShop/Yves/MerchantProfileWidget/Theme/default/components/molecules/merchant-profile/merchant-profile.twig`

Example:
```html
<section itemscope itemtype="https://schema.org/Organization">
   <meta itemprop="identifier" content="{merchant_reference}"/>
   <meta itemprop="name" content="{merchant_name}"/>
   <meta itemprop="logo" content="{merchant_logo_url}"/>
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

#### Tracking pixel
Core templates:
* `SprykerShop/Yves/PaymentPage/Theme/default/views/payment-success/index.twig`
* `SprykerShop/Yves/CheckoutPage/Theme/default/views/order-success/order-success.twig`

Example:
```html
<section itemscope itemtype="https://schema.org/Invoice">
   <meta itemprop="identifier" content="{order_reference}">
   <section itemprop="totalPaymentDue" itemscope itemtype="https://schema.org/PriceSpecification">
      <meta itemprop="priceCurrency" content="{currency}">
      <meta itemprop="price" content="{order_grand_total}">
   </section>

   <section itemprop="referencesOrder" itemscope itemtype="https://schema.org/Order">
      <section itemprop="orderedItem" itemscope itemtype="https://schema.org/OrderItem">
         <meta itemprop="orderQuantity" content="{item_quantity}">

         <section itemprop="orderedItem" itemscope itemtype="https://schema.org/Product">
            <meta itemprop="sku" content="{item_sku}">
            <meta itemprop="name" content="{item_name}">

            <section itemprop="offers" itemscope itemtype="https://schema.org/Offer">
               <meta itemprop="priceCurrency" content="{currency}">
               <meta itemprop="price" content="{item_sub_total}">
               
               <!-- SprykerShop/Yves/MerchantWidget/Theme/default/views/merchant-meta-schema/merchant-meta-schema.twig --> 
               <section itemprop="seller" itemscope itemtype="https://schema.org/Organization">
                  <meta itemprop="name" content="{merchant_name }}">
                  <meta itemprop="identifier" content="{merchant_reference }}">
               </section>
            </section>
         </section>
      </section>
   </section>

   <section itemscope itemtype="https://schema.org/Person">
      <meta itemprop="email" content="{customer_email}">
   </section>
</section>
```

### 4. Configure Message Broker

Add the following configuration to `config/Shared/common/config_default.php`:
```php
$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...,
    AddReviewsTransfer::class => 'reviews',
];

$config[MessageBrokerConstants::CHANNEL_TO_TRANSPORT_MAP] =
$config[MessageBrokerAwsConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...,
    'reviews' => MessageBrokerAwsConfig::SQS_TRANSPORT,
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...,
    'reviews' => 'http',
];
```
#### Add Message Handler

Add the following plugin to `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`:

```php
 /**
  * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
  */
 public function getMessageHandlerPlugins(): array
 {
     return [
         //...,           
         new ProductReviewAddReviewsMessageHandlerPlugin(),
     ];
 }
```
#### Receive messages

To receive messages from the channel, the following command is used:

```console message-broker:consume```

Since this command must be executed periodically, configure Jenkins in `config/Zed/cronjobs/jenkins.php`:

```php
$jobs[] = [
    'name' => 'message-broker-consume-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```
## Next steps
[Configure the Bazaarvoice app](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/configure-bazaarvoice.html) for your store.
