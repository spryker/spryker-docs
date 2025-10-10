

## Upgrading from version 4.* to version 5.*

In this version, we've shifted the handling of product price related functionality from Price to the new PriceProduct module. The Price module is now responsible for generic Spryker core related functionality.

Update all related modules to to work with the `PriceProduct` module:

1. Install the `PriceProduct` module:

```bash
composer require spryker/price-product
```

2. Create a new table and update the existing one:

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

`spy_price_product_store` is the table for price per store / currency. `price_mode_configuration` field is added to indicate to which mode price type assigned GROSS, NET, BOTH.

3. Build propel models

```bash
vendor/bin/console propel:model:build
```

4. Generate new transfer objects

```bash
vendor/bin/console transfer:generate
```

5. If you overwrote any of the classes from the `Price` module, change the namespace part with `Price` to `PriceProduct`. For example, `PriceFacade` should be renamed to `PriceProductFacade`. Same for `Factories`, `QueryContainer`, `DependencyProvider`.

6. Check that all `Price` plugins registered in `ProductDependencyProvider` have been moved to the `PriceProduct` namespace:

Original:

```php
use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterCreatePlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterUpdatePlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractReadPlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterCreatePlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterUpdatePlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteReadPlugin;
```

Expected:

```php
use Spryker\Zed\PriceProduct\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterCreatePlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterUpdatePlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\ProductAbstract\PriceProductAbstractReadPlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterCreatePlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterUpdatePlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\ProductConcrete\PriceProductConcreteReadPlugin;
```


7. Update `StorageProductMapper` with the new price resolving logic:

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

7. Inject the `PriceProduct` client dependency and pass it to a mapper class.

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

8. Update `ProductAbstractCollector` and `ProductConcreteCollector` to use `PriceProductFacade` instead of `PriceFacade`.

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
