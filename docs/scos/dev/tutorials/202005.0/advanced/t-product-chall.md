---
title: Tutorial- Product Challenge Solution
originalLink: https://documentation.spryker.com/v5/docs/t-product-challenge-solution
redirect_from:
  - /v5/docs/t-product-challenge-solution
  - /v5/docs/en/t-product-challenge-solution
---

<!-- used to be: http://spryker.github.io/onboarding/product-solution/ -->

## ProductCountry module (Zed)
First, you need to create a new table with the name `pyz_product_country`. This table will be filled with demo data provided by a hard coded `sku/country` list in the `ImportController` of the module.

File: `Pyz/Zed/ProductCountry/Persistence/Propel/Schema/pyz_product_country.schema.xml`

<details open>
<summary>Click to expand the code sample</summary>
    
```
&lt;?xml version="1.0"?&gt;
&lt;database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    name="zed"
    xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
    namespace="Orm\Zed\ProductCountry\Persistence"
    package="src.Orm.Zed.ProductCountry.Persistence"&gt;

    &lt;table name="spy_product_country" idMethod="native" allowPkInsert="true"&gt;
        &lt;column name="id_product_country" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/&gt;
        &lt;column name="fk_product" required="true" type="INTEGER"/&gt;
        &lt;column name="fk_country" required="true" type="INTEGER"/&gt;

        &lt;foreign-key foreignTable="spy_country"&gt;
            &lt;reference local="fk_country" foreign="id_country"/&gt;
        &lt;/foreign-key&gt;

        &lt;foreign-key foreignTable="spy_product_abstract"&gt;
            &lt;reference local="fk_product" foreign="id_product_abstract"/&gt;
        &lt;/foreign-key&gt;

        &lt;id-method-parameter value="spy_product_country_pk_seq"/&gt;
    &lt;/table&gt;

&lt;/database&gt;
```
    
</br>
</details>

Next, call the console propel:install console command in order to migrate the database and create the query objects.

Method: `Pyz\Zed\ProductCountry\Communication\Controller\ImportController::indexAction()`

<details open>
<summary>Click to expand the code sample</summary>
    
```
&lt;?php

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
        $query = $this-&gt;getFactory()-&gt;createProductCountryQuery();
        $query-&gt;filterByFkProduct($idProduct);
        $query-&gt;filterByFkCountry($idCountry);

        return $query;
    }

    //...
}
```
    
</br>
</details>

In the `ProductCountryBusinessFactory` class you need to create a new instance of the `ProductCountryManager`. The dependency to the product module facade is missing in the class. Create a new method `getProductFacade` that returns the facade from the `ProductCountryDependencyProvider`.

<details open>
<summary>Click to expand the code sample</summary>
    
```
&lt;?php

class ProductCountryBusinessFactory extends SprykerBusinessFactory
{

    /**
     * @return \Pyz\Zed\ProductCountry\Business\Model\ProductCountryManagerInterface
     */
    public function createProductCountryManager()
    {
        return new ProductCountryManager(
            $this-&gt;getProductFacade(),
            $this-&gt;getCountryFacade(),
            $this-&gt;getQueryContainer(),
            $this-&gt;getPropelConnection()
        );
    }

    // ...

    /**
     * @return \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    public function getProductFacade()
    {
        return $this-&gt;getProvidedDependency(ProductCountryDependencyProvider::PRODUCT_FACADE);
    }

    //...

}
```
    
</br>
</details>

Now, implement the logic to save a new product, within the `ProductCountryManager`.

<details open>
<summary>Click to expand the code sample</summary>
    
```
&lt;?php

class ProductCountryManager implements ProductCountryManagerInterface
{
    //...

    /**
     * @param array $productCountryData Product SKU =&gt; Country ISO 2 Code
     *
     * @throws \Exception
     *
     * @return void
     */
    public function importProductCountryData(array $productCountryData)
    {
        foreach ($productCountryData as $productCountrySku =&gt; $productCountryIso2Code) {
            $this-&gt;saveProductCountryEntity($productCountrySku, $productCountryIso2Code);
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
            $productId = $this-&gt;productFacade-&gt;getProductAbstractIdByConcreteSku($productCountrySku);
            $countryId = $this-&gt;countryFacade-&gt;getIdCountryByIso2Code($productCountryIso2Code);

            $countryEntity = new SpyProductCountry();
            $countryEntity-&gt;setFkProduct($productId);
            $countryEntity-&gt;setFkCountry($countryId);

            $countryEntity-&gt;save($this-&gt;connection);

            // Touch product to trigger collector for key/value export
            $this-&gt;productFacade-&gt;touchProductActive($productId);

        } catch (\Exception $e) {
            echo $e-&gt;getMessage();
        }
    }

    //...

}
```
    
</br>
</details>

## Collector module (Zed)
The collector is used to transfer data from the SQL storage to the key-value storage. The collector must be extended with the new field “product_country”.

Open `Pyz/Zed/Collector/Persistence/Storage/Pdo/PostgreSql/ProductCollectorQuery.php` and extend the collector SQL query with a left join to the new created table `spy_product_country` in order to load and select the country name where each product is produced.

```
SELECT
    ...
    spy_country.name AS product_country
FROM
    ...
```

```
...
LEFT JOIN spy_product_country ON (spy_product_country.fk_product = spy_product_abstract.id_product_abstract)
LEFT JOIN spy_country ON (spy_country.id_country = spy_product_country.fk_country)
...
```

Now we need to add the new selected column `product_country` to the collectItem list in `Pyz\Zed\Collector\Business\Storage\ProductCollector`.

<details open>
<summary>Click to expand the code sample</summary>
    
```
&lt;?php

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
            'abstract_product_id' =&gt; $collectItemData[CollectorConfig::COLLECTOR_RESOURCE_ID],
            'abstract_attributes' =&gt; $this-&gt;getAbstractAttributes($collectItemData),
            'abstract_name' =&gt; $collectItemData['abstract_name'],
            'abstract_sku' =&gt; $collectItemData['abstract_sku'],
            'url' =&gt; $collectItemData['abstract_url'],
            'available' =&gt; true,
            'valid_price' =&gt; $this-&gt;getValidPriceBySku($collectItemData['abstract_sku']),
            'prices' =&gt; $this-&gt;getPrices($collectItemData),
            'category' =&gt; $this-&gt;getCategories($collectItemData[CollectorConfig::COLLECTOR_RESOURCE_ID]),

             // new line
            'product_country' =&gt; $collectItemData['product_country']
        ];
    }

    //...
}
```
    
</br>
</details>

## Product module (Yves)
Open `Pyz/Yves/Product/Theme/default/product/detail.twig` and add the following code:

```
{% raw %}{%{% endraw %} if product.product_country {% raw %}%}{% endraw %}
&lt;dt&gt;{% raw %}{{{% endraw %} "page.product_country"|trans {% raw %}}}{% endraw %}&lt;/dt&gt;
&lt;dd&gt;{% raw %}{{{% endraw %} product.product_country {% raw %}}}{% endraw %}&lt;/dd&gt;
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```
