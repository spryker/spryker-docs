---
title: Migration Guide - Price
originalLink: https://documentation.spryker.com/v6/docs/mg-price
redirect_from:
  - /v6/docs/mg-price
  - /v6/docs/en/mg-price
---

## Upgrading from Version 4.* to Version 5.*
From version 5 we have changed price module responsibilities: previously it was responsible for handling product price related functionality. This responsibility has now been moved to the new PriceProduct module which handles product prices, while Price module is responsible for generic spryker core related functionality.

Due to this change of the Price module responsibility, all related modules have also be updated to work with the `PriceProduct` module.

1. First you have to install the new `PriceProduct` module.
* run `composer require spryker/price-product`.
* run SQL queries to create a new table and alter the existing one.

```sql
CREATE SEQUENCE "spy_price_product_store_pk_seq";

CREATE TABLE "spy_price_product_store"
(
    "id_price_product_store" INTEGER NOT NULL,
    "fk_price_product" INTEGER NOT NULL,
    "fk_currency" INTEGER NOT NULL,
    "fk_store" INTEGER,
    "net_price" INTEGER,
    "gross_price" INTEGER,
    PRIMARY KEY ("id_price_product_store"),
    CONSTRAINT "spy_price_product_store-unique-price_product" UNIQUE ("fk_currency","fk_price_product","fk_store")
);

ALTER TABLE "spy_price_type"
  ADD "price_mode_configuration" INT2;
  ```
`spy_price_product_store` is the table for price per store / currency. `price_mode_configuration` field is added to indicate to which mode price type assigned GROSS, NETT, BOTH.
* Build propel models `vendor/bin/console propel:model:build`.
* Generate new transfer objects `vendor/bin/consle transfer:generate`.
If you have overwritten any of the classes from the `Price` module, you have to change namespace part with `Price` to `PriceProduct`, for example if you used `PriceFacade`, now should use `PriceProductFacade`. Same for `Factories`, `QueryContainer`, `DependencyProvider`.
Check that all `Price` plugins registered in `ProductDependencyProvider` have been moved to `PriceProduct` namespace.
`use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterCreatePlugin;`
`use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterUpdatePlugin;`
`use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractReadPlugin;`
`use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterCreatePlugin;`
`use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterUpdatePlugin;`
`use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteReadPlugin;`
Should be renamed to:
`use Spryker\Zed\PriceProduct\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterCreatePlugin;`
`use Spryker\Zed\PriceProduct\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterUpdatePlugin;`
`use Spryker\Zed\PriceProduct\Communication\Plugin\ProductAbstract\PriceProductAbstractReadPlugin;`
`use Spryker\Zed\PriceProduct\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterCreatePlugin;`
`use Spryker\Zed\PriceProduct\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterUpdatePlugin;`
`use Spryker\Zed\PriceProduct\Communication\Plugin\ProductConcrete\PriceProductConcreteReadPlugin;`

2. Update `StorageProductMapper` with the new price resolving logic

```php
namespace Pyz\Yves\Product\Mapper;

class StorageProductMapper implements StorageProductMapperInterface
{

    /**
     * @var \Spryker\Client\PriceProduct\PriceProductClientInterface
     */
    protected $priceProductClient;

    /**
     * @param \Pyz\Yves\Product\Mapper\AttributeVariantMapperInterface $attributeVariantMapper
     * @param \Spryker\Client\PriceProduct\PriceProductClientInterface $priceProductClient
     */
    public function __construct(
        ...
        PriceProductClientInterface $priceProductClient
    ) {
       $this->priceProductClient = $priceProductClient;
    }

    /**
     * @param array $productData
     * @param array $selectedAttributes
     *
     * @return \Generated\Shared\Transfer\StorageProductTransfer
     */
    public function mapStorageProduct(array $productData, array $selectedAttributes = [])
    {

       ...

       $currentProductPriceTransfer = $this->priceProductClient->resolveProductPrice(
           $storageProductTransfer->getPrices()
       );

       $storageProductTransfer->setPrices($currentProductPriceTransfer->getPrices());
       $storageProductTransfer->setPrice($currentProductPriceTransfer->getPrice());
    }
}
```

3. Inject PriceProduct client depency and pass to mapper class.

```php
namespace Pyz\Yves\Product;

class ProductDependencyProvider extends AbstractBundleDependencyProvider
{
    const CLIENT_PRICE_PRODUCT = 'CLIENT_PRICE_PRODUCT';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function provideClients(Container $container)
    {
        $container[static::CLIENT_PRICE_PRODUCT] = function (Container $container) {
              return $container->getLocator()->priceProduct()->client();
        };
    }
}
```

```php
namespace Pyz\Yves\Product;

/**
 * @method \Spryker\Client\Product\ProductClientInterface getClient()
 */
class ProductFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Yves\Product\Mapper\StorageProductMapperInterface
     */
    public function createStorageProductMapper()
    {
        return new StorageProductMapper(
           $this->createAttributeVariantMapper(),
           $this->getPriceProductClient()
        );
    }

    /**
     * @return \Spryker\Client\PriceProduct\PriceProductClientInterface
     */
    protected function getPriceProductClient()
    {
        return $this->getProvidedDependency(ProductDependencyProvider::CLIENT_PRICE_PRODUCT);
    }
}
```

4. Collectors have changed the way price is collected. Change `ProductAbstractCollector` and `ProductConcreteCollector` to reflect that. Both are now using `PriceProductFacade` instead of `PriceFacade`.

```php
namespace Pyz\Zed\Collector\Business\Storage;

class ProductConcreteCollector extends AbstractStoragePdoCollector
{
    /**
    * @param \Spryker\Service\UtilDataReader\UtilDataReaderServiceInterface $utilDataReaderService
    * @param \Spryker\Zed\Product\Business\ProductFacadeInterface $productFacade
    * @param \Spryker\Zed\Price\Business\PriceFacadeInterface $priceFacade
    * @param \Spryker\Zed\ProductImage\Persistence\ProductImageQueryContainerInterface $productImageQueryContainer
    * @param \Spryker\Zed\ProductImage\Business\ProductImageFacadeInterface $productImageFacade
    */
   public function __construct(
       UtilDataReaderServiceInterface $utilDataReaderService,
       ProductFacadeInterface $productFacade,
       PriceProductFacadeInterface $priceProductFacade, //changed from PriceFacadeInterface
       ProductImageQueryContainerInterface $productImageQueryContainer,
       ProductImageFacadeInterface $productImageFacade
   ) {
       $this->priceProductFacade = $priceProductFacade;
   }

   /**
    * @param string $sku
    *
    * @return array
    */
   protected function getPrices($sku)
   {
       return $this->priceProductFacade->findPricesBySkuGrouped($sku);
   }
}
```

```php
namespace Pyz\Zed\Collector\Business\Storage;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class ProductAbstractCollector extends AbstractStoragePdoCollector
{
    /**
    * @param \Spryker\Service\UtilDataReader\UtilDataReaderServiceInterface $utilDataReaderService
    * @param \Spryker\Zed\Category\Persistence\CategoryQueryContainerInterface $categoryQueryContainer
    * @param \Spryker\Zed\ProductCategory\Persistence\ProductCategoryQueryContainerInterface $productCategoryQueryContainer
    * @param \Spryker\Zed\ProductImage\Persistence\ProductImageQueryContainerInterface $productImageQueryContainer
    * @param \Spryker\Zed\Product\Business\ProductFacadeInterface $productFacade
    * @param \Spryker\Zed\PriceProduct\Business\PriceProductFacadeInterface $priceProductFacade
    * @param \Spryker\Zed\ProductImage\Business\ProductImageFacadeInterface $productImageFacade
    */
   public function __construct(
       UtilDataReaderServiceInterface $utilDataReaderService,
       CategoryQueryContainerInterface $categoryQueryContainer,
       ProductCategoryQueryContainerInterface $productCategoryQueryContainer,
       ProductImageQueryContainerInterface $productImageQueryContainer,
       ProductFacadeInterface $productFacade,
       PriceProductFacadeInterface $priceProductFacade, //Changed from PriceFacadeInterface
       ProductImageFacadeInterface $productImageFacade
   ) {
     $this->priceProductFacade = $priceProductFacade;
   }

   /**
      * @param string $sku
      *
      * @return array
      */
     protected function getPrices($sku)
     {
         return $this->priceProductFacade->findPricesBySkuGrouped($sku);
     }
}
```

