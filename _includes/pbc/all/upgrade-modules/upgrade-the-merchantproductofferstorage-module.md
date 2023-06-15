

## Upgrading from version 1.* to version 2.0.0

In this new version of the `MerchantProductOfferStorage` module, we have split `ProductOffer` and `Merchant` context. You can find more details about the changes on the [MerchantProductOfferStorage module](https://github.com/spryker/merchant-product-offer-storage/releases) release page.

{% info_block errorBox %}

This release is a part of the *ProductOffer and Merchant context leakage* concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior.

{% endinfo_block %}

To upgrade to the new version of the module, do the following:

1. Upgrade the `MerchantProductOfferStorage` module to the new version:

```bash
composer require spryker/merchant-product-offer-storage: "^2.0.0" --update-with-dependencies
```

2. Update the generated classes:
```bash
console transfer:generate
```

3. Replace the deleted plugins from `src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php`
 ```php
Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Synchronization\ProductConcreteProductOffersSynchronizationDataBulkRepositoryPlugin
Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Synchronization\ProductOfferSynchronizationDataBulkRepositoryPlugin
```

To `src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php`
```php
Spryker\Zed\ProductOfferStorage\Communication\Plugin\Synchronization\ProductConcreteProductOffersSynchronizationDataBulkRepositoryPlugin
Spryker\Zed\ProductOfferStorage\Communication\Plugin\Synchronization\ProductOfferSynchronizationDataBulkRepositoryPlugin
```

4. Replace the deleted plugins from `src/Pyz/Client/MerchantProductOfferStorage/ProductOfferStorageDependencyProvider.php`
 ```php
Spryker\Client\MerchantProductOfferStorage\Plugin\ProductOfferStorage\DefaultProductOfferReferenceStrategyPlugin
Spryker\Client\MerchantProductOfferStorage\Plugin\ProductOfferStorage\ProductOfferReferenceStrategyPlugin
```

To `src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php`
```php
Spryker\Client\ProductOfferStorage\Plugin\ProductOfferStorage\DefaultProductOfferReferenceStrategyPlugin
Spryker\Client\ProductOfferStorage\Plugin\ProductOfferStorage\ProductOfferReferenceStrategyPlugin
```

5. Replace the deleted plugins from `src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php`
 ```php
Spryker\Client\MerchantProductOfferStorage\Plugin\ProductStorage\ProductViewProductOfferExpanderPlugin
```

To `src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php`
```php
Spryker\Client\ProductOfferStorage\Plugin\ProductStorage\ProductViewProductOfferExpanderPlugin
```

6. Replace the deleted plugins from `src/Pyz/Zed/Event/EventDependencyProvider.php`
 ```php
Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\Event\Subscriber\MerchantProductOfferStorageEventSubscriber
```

To `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`
```php
Spryker\Zed\ProductOfferStorage\Communication\Plugin\Publisher\ProductConcreteOffers\ProductConcreteProductOffersDeletePublisherPlugin
Spryker\Zed\ProductOfferStorage\Communication\Plugin\Publisher\ProductConcreteOffers\ProductConcreteProductOffersWritePublisherPlugin
Spryker\Zed\ProductOfferStorage\Communication\Plugin\Publisher\ProductOffer\ProductOfferDeletePublisherPlugin
Spryker\Zed\ProductOfferStorage\Communication\Plugin\Publisher\ProductOffer\ProductOfferWritePublisherPlugin
Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Publisher\ProductConcreteProductOffer\MerchantProductConcreteProductOfferWritePublisherPlugin
Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Publisher\Merchant\MerchantProductOfferWritePublisherPlugin
```

*Estimated migration time: 30 min*
