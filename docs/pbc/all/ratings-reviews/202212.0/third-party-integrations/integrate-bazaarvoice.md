---
title: Integrate BazaarVoice
description: Find out how you can integrate BazaarVoice into your Spryker shop
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/ratings-reviews/third-party-integrations/integrate-bazaarvoice.html
---

## Prerequisites

The BazaarVoice app requires the following Spryker modules:

* `spryker/asset: ^1.3.0`
* `spryker/asset-storage: ^1.1.0`
* `spryker/merchant-profile: ^1.1.0` (Marketplace only)
* `spryker/message-broker: ^1.3.0`
* `spryker/message-broker-aws: ^1.3.2`
* `spryker/oms: ^11.23.0`
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

## Integrate BazaarVoice

To integrate BazaarVoice, follow these steps:

### 1. Add the Bazaarvoice domain to your allowlist

To enable your customers to leave reviews on your products, you must add the BazaarVoice domain to your **Content Security Policy** allowlist. 

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

### 2. Add markup to custom templates

The BazaarVoice app takes data on products from the Storefront pages (for example, Product Detail page, Catalog page).
To get necessary data from the pages, schemas from [Schema.org](https://schema.org/) are used.
By default, the necessary markups are already available in the Yves templates.

If you have custom Yves templates or make your own frontend, add the markups required for the BazaarVoice app according to the tables below.

#### Dynamic catalog collection(DCC) for products
Core template: `SprykerShop/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`

| schema.org property          | BazaarVoice property |
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

Since merchants don't have own entities in the BazaarVoice service, products with specific IDs, or merchant references, are used instead.

{% endinfo_block %}

Core template:
`SprykerShop/Yves/MerchantProfileWidget/Theme/default/components/molecules/merchant-profile/merchant-profile.twig`

| schema.org property        | BazaarVoice property |
|----------------------------|----------------------|
| organization.identifier    | productId            |
| organization.name          | productName          |
| organization.logo          | productImageURL      |

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

### 3. Configure Message Broker

Add the following configuration to `config/Shared/common/config_default.php`:
```php
use \Generated\Shared\Transfer\AddReviewsTransfer;
use \Generated\Shared\Transfer\OrderStatusChangedTransfer;
use \Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;

//...

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...,
    AddReviewsTransfer::class => 'reviews',
    OrderStatusChangedTransfer::class => 'orders'
];

$config[MessageBrokerConstants::CHANNEL_TO_TRANSPORT_MAP] =
$config[MessageBrokerAwsConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...,
    'reviews' => MessageBrokerAwsConfig::SQS_TRANSPORT,
    'orders' => MessageBrokerAwsConfig::SQS_TRANSPORT,
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...,
    'reviews' => 'http',
    'orders' => 'http',
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

### 4. Configure OMS

To configure OMS, follow these steps:

#### 1. Extend command plugins

Add the following plugin to `src/Pyz/Zed/Oms/OmsDependencyProvider.php`:

```php
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderStatusChangedMessagePlugin;

// ...

/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
protected function extendCommandPlugins(Container $container): Container
{
    $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
        // ...
        $commandCollection->add(new SendOrderStatusChangedMessagePlugin(), 'Order/RequestProductReviews');
    
        return $commandCollection;
    });
 }
```

#### 2. Update OMS schema

Adjust your OMS state machine configuration to trigger the `Order/RequestProductReviews` command according to your project’s requirements.

Here is an example with the `DummyPayment01.xml` process for the `authorize` event:

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">
 
    <process name="DummyPayment01" main="true">
        <!-- ... -->
        <events>
            <!-- ... -->
            <event name="authorize" timeout="1 second" command="Order/RequestProductReviews"/>
            <!-- ... -->
        </events>
    </process>
    <!-- ... -->
</statemachine>
```

#### 3. Add order hydration plugin (Marketplace only)

For a Marketplace project, add the following plugin to `src/Pyz/Zed/Sales/SalesDependencyProvider.php`:

```php
use Spryker\Zed\MerchantProfile\Communication\Plugin\Sales\MerchantDataOrderHydratePlugin;

// ...

/**
 * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
 */
protected function getOrderHydrationPlugins(): array
{
    return [
        // ...
        new MerchantDataOrderHydratePlugin(),
    ];
}
```

## Next steps
[Configure the BazaarVoice app](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/configure-bazaarvoice.html) for your store.
