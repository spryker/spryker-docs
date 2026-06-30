---
title: "Tutorial: Product challenge solution"
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-product-challenge-solution
originalArticleId: c41461a3-c784-43f0-ba0e-d38ed2cfa5e1
redirect_from:
  - /2021080/docs/t-product-challenge-solution
  - /2021080/docs/en/t-product-challenge-solution
  - /docs/t-product-challenge-solution
  - /docs/en/t-product-challenge-solution
  - /v6/docs/t-product-challenge-solution
  - /v6/docs/en/t-product-challenge-solution
  - /v5/docs/t-product-challenge-solution
  - /v5/docs/en/t-product-challenge-solution
  - /v4/docs/t-product-challenge-solution
  - /v4/docs/en/t-product-challenge-solution
  - /v3/docs/t-product-challenge-solution
  - /v3/docs/en/t-product-challenge-solution
  - /v2/docs/t-product-challenge-solution
  - /v2/docs/en/t-product-challenge-solution
  - /v1/docs/t-product-challenge-solution
  - /v1/docs/en/t-product-challenge-solution
  - /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-product-challenge-solution.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/tutorials-and-howtos/tutorial-product-challenge-solution.html
---

<!-- used to be: http://spryker.github.io/onboarding/product-solution/ -->

## ProductCountry module (Zed)

Create a new table with the name `pyz_product_country`. This table is filled with demo data provided by a hard coded `sku/country` list in the `ImportController` of the module.

**Pyz/Zed/ProductCountry/Persistence/Propel/Schema/pyz_product_country.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    name="zed"
    xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
    namespace="Orm\Zed\ProductCountry\Persistence"
    package="src.Orm.Zed.ProductCountry.Persistence">

    <table name="spy_product_country" idMethod="native" allowPkInsert="true">
        <column name="id_product_country" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/>
        <column name="fk_product" required="true" type="INTEGER"/>
        <column name="fk_country" required="true" type="INTEGER"/>

        <foreign-key foreignTable="spy_country">
            <reference local="fk_country" foreign="id_country"/>
        </foreign-key>

        <foreign-key foreignTable="spy_product_abstract">
            <reference local="fk_product" foreign="id_product_abstract"/>
        </foreign-key>

        <id-method-parameter value="spy_product_country_pk_seq"/>
    </table>

</database>
```


Then, call the console command to migrate the database and create the query objects.

```bash
console propel:install
```

Method: `Pyz\Zed\ProductCountry\Communication\Controller\ImportController::indexAction()`

The code sample:

```php
<?php

class ProductCountryQueryContainer extends AbstractQueryContainer implements ProductCountryQueryContainerInterface
{
    //...

    /**
     * @param int $idProduct
     * @param int $idCountry
     *
     * @return \Orm\Zed\ProductCountry\Persistence\SpyProductCountryQuery
     */
    public function queryProductCountry($idProduct, $idCountry)
    {
        $query = $this->getFactory()->createProductCountryQuery();
        $query->filterByFkProduct($idProduct);
        $query->filterByFkCountry($idCountry);

        return $query;
    }

    //...
}
```


In the `ProductCountryBusinessFactory` class, create a new instance of the `ProductCountryManager`. The dependency to the product module facade is missing in the class. Create a new method `getProductFacade` that returns the facade from the `ProductCountryDependencyProvider`.

The code sample:

```php
<?php

class ProductCountryBusinessFactory extends SprykerBusinessFactory
{

    /**
     * @return \Pyz\Zed\ProductCountry\Business\Model\ProductCountryManagerInterface
     */
    public function createProductCountryManager()
    {
        return new ProductCountryManager(
            $this->getProductFacade(),
            $this->getCountryFacade(),
            $this->getQueryContainer(),
            $this->getPropelConnection()
        );
    }

    // ...

    /**
     * @return \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    public function getProductFacade()
    {
        return $this->getProvidedDependency(ProductCountryDependencyProvider::PRODUCT_FACADE);
    }

    //...

}
```


Implement the logic to save a new product, within the `ProductCountryManager`.

<details>
<summary>The code sample:</summary>

```php
<?php

class ProductCountryManager implements ProductCountryManagerInterface
{
    //...

    /**
     * @param array $productCountryData Product SKU => Country ISO 2 Code
     *
     * @throws \Exception
     *
     * @return void
     */
    public function importProductCountryData(array $productCountryData)
    {
        foreach ($productCountryData as $productCountrySku => $productCountryIso2Code) {
            $this->saveProductCountryEntity($productCountrySku, $productCountryIso2Code);
        }
    }

    /**
     * @param $productCountrySku
     * @param $productCountryIso2Code
     * @throws \Propel\Runtime\Exception\PropelException
     */
    private function saveProductCountryEntity($productCountrySku, $productCountryIso2Code)
    {
        try {
            $productId = $this->productFacade->getProductAbstractIdByConcreteSku($productCountrySku);
            $countryId = $this->countryFacade->getIdCountryByIso2Code($productCountryIso2Code);

            $countryEntity = new SpyProductCountry();
            $countryEntity->setFkProduct($productId);
            $countryEntity->setFkCountry($countryId);

            $countryEntity->save($this->connection);

            // Touch product to trigger collector for key/value export
            $this->productFacade->touchProductActive($productId);

        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    //...
}
```

</details>

## Collector module (Zed)

The collector is used to transfer data from the SQL storage to the key-value storage. The collector must be extended with the new field `product_country`.

Open `Pyz/Zed/Collector/Persistence/Storage/Pdo/PostgreSql/ProductCollectorQuery.php` and extend the collector SQL query with a left join to the new created table `spy_product_country` in order to load and select the country name where each product is produced.

```sql
SELECT
    ...
    spy_country.name AS product_country
FROM
    ...
```

```sql
...
LEFT JOIN spy_product_country ON (spy_product_country.fk_product = spy_product_abstract.id_product_abstract)
LEFT JOIN spy_country ON (spy_country.id_country = spy_product_country.fk_country)
...
```

Add the new selected column `product_country` to the`collectItem` list in `Pyz\Zed\Collector\Business\Storage\ProductCollector`.

The code sample:

```php
<?php

class ProductCollector extends AbstractStoragePdoCollector
{
    //...

    /**
     * @param string $touchKey
     * @param array $collectItemData
     *
     * @return array
     */
    protected function collectItem($touchKey, array $collectItemData)
    {
        return [
            'abstract_product_id' => $collectItemData[CollectorConfig::COLLECTOR_RESOURCE_ID],
            'abstract_attributes' => $this->getAbstractAttributes($collectItemData),
            'abstract_name' => $collectItemData['abstract_name'],
            'abstract_sku' => $collectItemData['abstract_sku'],
            'url' => $collectItemData['abstract_url'],
            'available' => true,
            'valid_price' => $this->getValidPriceBySku($collectItemData['abstract_sku']),
            'prices' => $this->getPrices($collectItemData),
            'category' => $this->getCategories($collectItemData[CollectorConfig::COLLECTOR_RESOURCE_ID]),

             // new line
            'product_country' => $collectItemData['product_country']
        ];
    }

    //...
}
```

## Product module (Yves)

Open `Pyz/Yves/Product/Theme/default/product/detail.twig` and add the following code:

```twig
{% raw %}{%{% endraw %} if product.product_country {% raw %}%}{% endraw %}
<dt>{% raw %}{{{% endraw %} "page.product_country"|trans {% raw %}}}{% endraw %}</dt>
<dd>{% raw %}{{{% endraw %} product.product_country {% raw %}}}{% endraw %}</dd>
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```
