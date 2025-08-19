---
title: Integrate Bazaarvoice
description: Find out how you can integrate Spryker third party integration Bazaarvoice in your Spryker shop.
template: howto-guide-template
last_updated: Jan 09, 2024
redirect_from:
  - /docs/pbc/all/ratings-reviews/third-party-integrations/integrate-bazaarvoice.html
  - /docs/pbc/all/ratings-reviews/202204.0/third-party-integrations/integrate-bazaarvoice.html
---
To integrate Bazaarvoice, follow these guidelines.

## Prerequisites

- Before you can integrate Bazaarvoice, make sure that your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

- The Bazaarvoice app requires the following Spryker modules:

- `spryker/asset: ^1.6.0`
- `spryker/asset-storage: ^1.2.1`
- `spryker/merchant-profile: ^1.2.1` (Marketplace only)
- `spryker/oms: ^11.25.0`
- `spryker/product-review: ^2.11.2`
- `spryker/product-review-gui: ^1.6.0`
- `spryker-shop/asset-widget: ^1.0.0`
- `spryker-shop/cart-page: ^3.38.0`
- `spryker-shop/product-detail-page: ^3.19.1`
- `spryker-shop/product-category-widget: ^1.7.0`
- `spryker-shop/shop-ui: ^1.71.0`
- `spryker-shop/checkout-page: ^3.23.0`
- `spryker-shop/merchant-page: ^1.1.0` (Marketplace only)
- `spryker-shop/merchant-profile-widget: ^1.1.0` (Marketplace only)
- `spryker-shop/merchant-widget: ^1.3.0` (Marketplace only)
- `spryker-shop/payment-page: ^1.3.0`

Make sure your installation meets these requirements.

## Integrate Bazaarvoice

To integrate Bazaarvoice, follow these steps.

### 1. Add the Bazaarvoice domain to your allowlist

To enable your customers to leave reviews on your products, you must add the Bazaarvoice domain to your **Content Security Policy** allowlist.

To do that, do one of the following:
1. Change the `deploy.yml` file:

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

Alternatively, you may add the domain to the allowlist from the `config/Shared/config_default.php` file. If you updated the `deploy.yml` file, you can ignore this step.

```php
$config[KernelConstants::DOMAIN_WHITELIST][] = '*.bazaarvoice.com';
```

### 2. Add markup to custom templates

The Bazaarvoice app takes data on products from the Storefront pages—for example, the product details page, or the *Catalog* page.
To get necessary data from the pages, schemas from [Schema.org](https://schema.org/) are used.
By default, the necessary markups are already available in the Yves templates.

If you have custom Yves templates or make your own frontend, add the markups required for the Bazaarvoice app according to the following tables.

#### Dynamic catalog collection (DCC) for products

Core template: `SprykerShop/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`

| SCHEMA.ORG PROPERTY          | BAZAARVOICE PROPERTY | Required | Example                                                                          |
|------------------------------|----------------------|----------|----------------------------------------------------------------------------------|
| product.sku                  | productId            | Yes      | 012_3456789                                                                      |
| product.name                 | productName          | Yes      | Camera Pro 123                                                                   |
| product.description          | productDescription   | No       | Lorem ipsum dolor sit amet, consectetur adipiscing elit.                         |
| product.image                | productImageURL      | Yes      | `https://www.example.com/img/gallery/camera-pro-123.jpg` (always use absolute URL) |
| product.url                  | productPageURL       | Yes      | `https://www.example.com/office-chair` (always use absolute URL)                   |
| product.brand.name           | brandId, brandName   | No       | Xyz Brand                                                                        |
| product.category             | categoryPath         | No       | [{"id":1,"name":"Cameras & Camcorders"},{"id":4,"name":"Digital Cameras"}]       |
| product.gtin12               | upcs                 | No       | 123456789876                                                                     |
| product.inProductGroupWithID | family               | No       | 6                                                                                |

Example:

```html
<section itemscope="" itemtype="https://schema.org/Product">
    <meta itemprop="name" content="Camera Pro 123">
    <meta itemprop="url" content="https://www.example.com/camera-pro-123?">
    <meta itemprop="sku" content="012_3456789">
    <meta itemprop="productId" content="012_3456789">
    <meta itemprop="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <meta itemprop="image" content="https://www.example.com/img/gallery/camera-pro-123.jpg">
    <div itemprop="brand" itemscope="" itemtype="https://schema.org/Brand">
        <meta itemprop="name" content="Xyz Brand">
        <meta itemprop="identifier" content="123">
    </div>
    <meta itemprop="category" content="[{&quot;id&quot;:1,&quot;name&quot;:&quot;Cameras &amp; Camcorders&quot;},{&quot;id&quot;:4,&quot;name&quot;:&quot;Digital Cameras&quot;}]">
    <meta itemprop="inProductGroupWithID" content="6">
    <meta itemprop="gtin12" content="123456789876">
</section>
```

#### DCC for merchants

{% info_block infoBox "Note" %}

Since merchants don't have their own entities in the Bazaarvoice service, products with specific IDs or merchant references are used instead.

{% endinfo_block %}

Core template: `SprykerShop/Yves/MerchantProfileWidget/Theme/default/components/molecules/merchant-profile/merchant-profile.twig`

| SCHEMA.ORG PROPERTY     | BAZAARVOICE PROPERTY | Required | Example                                                                      |
|-------------------------|----------------------|----------|------------------------------------------------------------------------------|
| organization.identifier | productId            | Yes      | MER000001                                                                    |
| organization.name       | productName          | Yes      | Xyz Merchant                                                                 |
| organization.logo       | productImageURL      | Yes      | `https://www.example.com/merchant/merchant-logo.png` (always use absolute URL) |

Example:

```html
<section itemscope="" itemtype="https://schema.org/Organization">
    <meta itemprop="identifier" content="MER000001">
    <meta itemprop="name" content="Xyz Merchant">
    <meta itemprop="logo" content="https://www.example.com/merchant/merchant-logo.png">
</section>
```

#### Ratings and reviews (for Product)

Core templates:
- `SprykerShop/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`
- `SprykerShop/Yves/ProductReviewWidget/Theme/default/views/pdp-review-rating/pdp-review-rating.twig`
- `SprykerShop/Yves/ProductReviewWidget/Theme/default/components/organisms/review-summary/review-summary.twig`

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
- `SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.twig`
- `SprykerShop/Yves/ProductReviewWidget/Theme/default/views/product-review-display/product-review-display.twig`
- `SprykerShop/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.twig`

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

### 3. Configure a message broker

1. Add the following configuration to `config/Shared/config_default.php`:

```php
use Generated\Shared\Transfer\AddReviewsTransfer;
use Generated\Shared\Transfer\OrderStatusChangedTransfer;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;

//...

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    AssetAddedTransfer::class => 'asset-commands',
    AssetUpdatedTransfer::class => 'asset-commands',
    AssetDeletedTransfer::class => 'asset-commands',
    OrderStatusChangedTransfer::class => 'order-events',
    AddReviewsTransfer::class => 'product-review-commands',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'asset-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'product-review-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...
    'order-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];
```

#### 2. Add a message handler

Add the following plugin to `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`:

```php
 /**
  * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
  */
 public function getMessageHandlerPlugins(): array
 {
     return [
         //...,           
         new AssetMessageHandlerPlugin(),
         new ProductReviewAddReviewsMessageHandlerPlugin(),
     ];
 }
```

#### 3. Configure channels

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            //...
            'asset-commands',
            'product-review-commands',
        ];
    }

    //...
}
```

### 4. Configure synchronization

To configure Synchronization, follow these steps:

#### 1. Configure plugins in `Publisher`

Add the following plugin to `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`:

```php
namespace Pyz\Zed\Publisher;

use Spryker\Zed\AssetStorage\Communication\Plugin\Publisher\Asset\AssetDeletePublisherPlugin;
use Spryker\Zed\AssetStorage\Communication\Plugin\Publisher\Asset\AssetWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
  /**
  * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
  */
  protected function getAssetStoragePlugins(): array
  {
      return [
          new AssetWritePublisherPlugin(),
          new AssetDeletePublisherPlugin(),
      ];
  }
}
```

#### 2. Configure plugins in `Synchronization`

The following plugin must be added to `src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php`:

```php
namespace Pyz\Zed\Synchronization;

use Spryker\Zed\AssetStorage\Communication\Plugin\Synchronization\AssetStorageSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
  protected function getSynchronizationDataPlugins(): array
  {
      return [
          new AssetStorageSynchronizationDataPlugin(),
      ];
  }
}
```

#### 3. Configure RabbitMq in `Client`

The following plugin must be added to `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`:

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\AssetStorage\AssetStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{  
  protected function getSynchronizationQueueConfiguration(): array
  {
      return [
          AssetStorageConfig::ASSET_SYNC_STORAGE_QUEUE,
      ];
  }
}
```

### 5. Receive ACP messages

Now, you can start receiving ACP messages in SCOS. See [Receive messages](/docs/acp/user/receive-acp-messages.html) for details on how to do that.

### 6. Configure OMS

To configure OMS, follow these steps.

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

#### 2. Update the OMS schema

Adjust your OMS state machine configuration to trigger the `Order/RequestProductReviews` command according to your project's requirements.

Here is an example with the `DummyPayment01.xml` process for the `deliver` event:

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
            <event name="deliver" timeout="1 second" command="Order/RequestProductReviews"/>
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

### 7. Configure DataImport

To configure DataImport, extend .CSV files. Do the following:

1. Add the following data to `data/import/common/common/product_abstract.csv`:

```csv
Add 2 columns, for example, attribute_key_7 and value_7 with UPCs, for example
attribute_key_7 = upcs, value_7 = 12345678
```

2. Add the following data to `data/import/common/common/product_concrete.csv`:

```csv
Add UPCs into columns, for example 
attribute_key_2 = upcs, value_2 = 12345678
update UPC for an abstract product with the same abstract_sku
```

3. Add the following data to `data/import/common/common/product_attribute_key.csv`:

```csv
Add a new row with the data
upcs,0 to enable support of UPC
```

4. Add the following data to `data/import/common/common/product_management_attribute.csv`:

```csv
Add a new row with the data
upcs,select,yes,yes,,UPCs,UPCs,,
```

## Next steps

[Configure the Bazaarvoice app](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/configure-bazaarvoice.html) for your store.
