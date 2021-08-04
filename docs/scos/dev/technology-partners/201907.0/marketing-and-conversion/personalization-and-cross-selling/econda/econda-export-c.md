---
title: Econda - Exporting CSVs
originalLink: https://documentation.spryker.com/v3/docs/econda-export-csvs
redirect_from:
  - /v3/docs/econda-export-csvs
  - /v3/docs/en/econda-export-csvs
---

To implement Econda plugin you should be familiar with the concept of [extending Spryker](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-enrichment/extending-spryker/ht-extend-inuse) and [plugins.](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-enrichment/plugin)

## Zed Output Folder

We need to define the output folder where the generated CSV files will be saved. This is done by adding a line in your config.

```php
config [EcondaConstants::CSV_FOLDER_PATH] = APPLICATION_ROOT_DIR . '' ;
```

The application must have proper access(es) depending on what you expect to achieve.

## Console

To export the products and categories, we must register the Collectors that were created in the [Console](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-enrichment/console-commands/console). Econda module has already everything in place and the only thing you need to do is to add `CollectorFileExportConsole` to `Pyz\Zed\Console\ConsoleDependencyProvider` like in the snippet bellow:

```php
<?php
use SprykerEco\Zed\Econda\Communication\Console\EcondaFileExportConsole;
...
 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Symfony\Component\Console\Command\Command[] */
 public function getConsoleCommands(Container $container)
 {

 $commands = [

 // ...
 new EcondaFileExportConsole(),
 ];
 }
 ```

## Queries
In order to export data to CSV we need to define the queries that will be executed against database.

To register the query in the Econda module, extend the `AbstractPdoEcondaQuery` in your project.

If you are using the demo shop as your starting point, you can use the code snippets below.
<details open>
<summary>For Categories</summary>
    
```php
<?php

namespace Pyz\Zed\Econda\Persistence\Storage\Pdo\PostgreSql;

use Spryker\Zed\Econda\Persistence\Econda\AbstractPdoEcondaQuery;

class CategoryNodeEcondaQuery extends AbstractPdoEcondaQuery
{
   /**
    * @return void
    */
   protected function prepareQuery()
   {
       $sql = '
 WITH RECURSIVE
     tree AS
   (
     SELECT
       n.id_category_node,
       n.fk_parent_category_node,
       n.fk_category,
       n.node_order
     FROM spy_category_node n
       INNER JOIN spy_category c ON c.id_category = n.fk_category AND c.is_active = TRUE
     WHERE n.is_root = TRUE

     UNION

     SELECT
       n.id_category_node,
       n.fk_parent_category_node,
       n.fk_category,
       n.node_order
     FROM tree
       INNER JOIN spy_category_node n ON n.fk_parent_category_node = tree.id_category_node
       INNER JOIN spy_category c ON c.id_category = n.fk_category AND c.is_active = TRUE
   )
 SELECT
   tree.*,
   u.url,
   ca.name,
   ca.meta_title,
   ca.meta_description,
   ca.meta_keywords,
   ca.category_image_name,
   \'\' AS "children",
   \'\' AS "parents"
 FROM tree
   INNER JOIN spy_url u ON (u.fk_resource_categorynode = tree.id_category_node AND u.fk_locale = :fk_locale_1)
   INNER JOIN spy_category_attribute ca ON (ca.fk_category = tree.fk_category AND ca.fk_locale = :fk_locale_2)
';
       $this->criteriaBuilder
           ->sql($sql)
           ->setOrderBy([
               'tree.fk_parent_category_node' => 'ASC',
               'tree.node_order' => 'DESC',
           ])
           ->setParameter('fk_locale_1', $this->locale->getIdLocale())
           ->setParameter('fk_locale_2', $this->locale->getIdLocale());
   }
}
```
<br>
</details>
<details open>
<summary>For Products</summary>

 ```
<?php

namespace Pyz\Zed\Econda\Persistence\Storage\Pdo\PostgreSql;

use Spryker\Zed\Econda\Persistence\Econda\AbstractPdoEcondaQuery;

class ProductConcreteEcondaQuery extends AbstractPdoEcondaQuery
{

   /**
    * @return void
    */
   protected function prepareQuery()
   {
        $sql = '
SELECT
 spy_product.id_product AS id_product,
 spy_product.sku AS sku,
 spy_product_localized_attributes.name AS name,
 spy_product.attributes AS attributes,
 spy_product_abstract.attributes AS abstract_attributes,
 spy_product_abstract.id_product_abstract AS id_product_abstract,
 spy_product.attributes AS concrete_attributes,
 spy_product_abstract_localized_attributes.attributes AS abstract_localized_attributes,
 spy_product_abstract_localized_attributes.meta_title AS meta_title,
 spy_product_abstract_localized_attributes.meta_keywords AS meta_keywords,
 spy_product_abstract_localized_attributes.meta_description AS meta_description,
 spy_product_localized_attributes.description AS concrete_description,
 spy_product_localized_attributes.attributes AS concrete_localized_attributes,
 spy_product_abstract_localized_attributes.description as abstract_description,
 spy_url.url AS url,
 (SELECT SUM(spy_stock_product.quantity)
   FROM spy_stock_product
   WHERE spy_stock_product.fk_product = spy_product.id_product) AS quantity
FROM spy_product
 INNER JOIN spy_product_abstract ON (spy_product_abstract.id_product_abstract = spy_product.fk_product_abstract)
 INNER JOIN spy_product_localized_attributes ON (spy_product_localized_attributes.fk_product = spy_product.id_product)
 INNER JOIN spy_locale ON (spy_locale.id_locale = :fk_locale_1 and spy_locale.id_locale = spy_product_localized_attributes.fk_locale)
 INNER JOIN spy_product_abstract_localized_attributes ON (spy_product_abstract_localized_attributes.fk_product_abstract = spy_product_abstract.id_product_abstract AND spy_product_abstract_localized_attributes.fk_locale = spy_locale.id_locale)
 LEFT JOIN spy_url ON (spy_product_abstract.id_product_abstract = spy_url.fk_resource_product_abstract AND spy_url.fk_locale = spy_locale.id_locale)
        ';

       $this->criteriaBuilder
           ->sql($sql)
           ->setParameter('fk_locale_1', $this->locale->getIdLocale());
   }

}
```
 <br>
</details>
 
Now that we have defined queries we must register them with Econda module by adding them to project level Econda configuration.

In the example below we assume that you are using PostgreSql but if you use MySql just register your queries under MySql key in array.

```php
<?php

namespace Pyz\Zed\Econda;

use Pyz\Zed\Econda\Persistence\Storage\Pdo\PostgreSql\CategoryNodeEcondaQuery as StorageCategoryNodeEcondaQuery;
use Pyz\Zed\Econda\Persistence\Storage\Pdo\PostgreSql\ProductConcreteEcondaQuery as StorageProductConcreteEcondaQuery;
use Spryker\Zed\Econda\EcondaConfig as SprykerEcondaConfig;

class EcondaConfig extends SprykerEcondaConfig
{
   /**
    * @param string $dbEngineName
    * @return array
    */
   public function getStoragePdoQueryAdapterClassNames($dbEngineName)
   {
       $data = [
           'MySql' => [

           ],
           'PostgreSql' => [
               'CategoryNodeEcondaQuery' => StorageCategoryNodeEcondaQuery::class,
               'ProductConcreteEcondaQuery' => StorageProductConcreteEcondaQuery::class
           ],
       ];

       return $data[$dbEngineName];
   }
}
```

## How is my query mapped to CSV output ?
If you need to modify the CSV column mapping for any reason you will have to extend the `EcondaProductCollector` and `EcondaCategoryCollector` from the Econda module and implement your own `collectData` and `collectItem` methods.
## Console
To export the products and categories,  we must register the Collectors we have just created in the Console.  The Econda module already has everything in place and the only thing you need to do is add `EcondaFileExportConsole` to `Pyz\Zed\Console\ConsoleDependencyProvider` as bellow:
```php

<?php

use SprykerEco\Zed\Econda\Communication\Console\EcondaFileExportConsole;
...
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Symfony\Component\Console\Command\Command[] */
public function getConsoleCommands(Container $container)
{

    $commands = [

    //rest of the function code

        new EcondaFileExportConsole(),
    //rest of the function code
}
```

## Checking Your Setup
 If all the steps are  followed correctly, you should be able to see the` econda:file:export` command in Econda section when you run `vendor/bin/console` from the project's root folder.
Running `vendor/bin/console econda:file:export` will create several CSV files in the folder you have specified in `$config[EcondaConstants::ECONDA_CSV_FOLDER_PATH]`.

## Exporting Data to Econda
Econda supports [several ways to export data](https://support.econda.de/display/CSDE/Produktdatenimport). With the Econda module you can expose your ZED URL `/econda/index/category and /econda/index/product` by adding Econda as ignorable to your `AuthConfig`.

```php
<?php

namespace Pyz\Zed\Auth;

use Spryker\Zed\Auth\AuthConfig as SprykerAuthConfig;

class AuthConfig extends SprykerAuthConfig
{

    /**
     * @return array
     */
    public function getIgnorable()
    {
        $this->addIgnorable('heartbeat', 'index', 'index');
        $this->addIgnorable('_profiler', 'wdt', '*');
        $this->addIgnorable('econda', 'index', '*');

        return parent::getIgnorable();
    }

}
```
and a rule in your `config_default.php`:

```php
<?php
$config[AclConstants::ACL_DEFAULT_RULES] = [
    //other settings before
    [
        'bundle' => 'econda',
        'controller' => 'index',
        'action' => '*',
        'type' => 'allow',
    ],
];

```
{% info_block errorBox "Warning" %}
ZED should never be accessible from public network. You should make a firewall exception to allow econda to connect to your ZED.
{% endinfo_block %}

## Testing your Setup
To test if your ZED is reachable without login you can use CURL, running:

```bash
curl  http://mysprykershop.com/econda/index/category
```
should return something like:

```php
ID,ParentID,name
5,1,Computer
2,1,"Cameras & Camcorders"
11,1,"Telecom & Navigation"
9,1,"Smart Wearables"
4,2,"Digital Cameras"
3,2,Camcorders
6,5,Notebooks
7,5,Pc's/Workstations
8,5,Tablets
10,9,Smartwatches
12,11,Smartphones
1,ROOT,Demoshop
and running:
```

`curl  http://mysprykershop.com/econda/index/product` should return something like:

```php
ID,Name,Description,PRODUCTURL,ImageURL,Price,Stock,ProductCategory
001_25904006,"Canon IXUS 160","Add a personal touch Make 
shots your own with quick and easy control over picture 
settings such as brightness and colour intensity. 
Preview the results whi
",http://mysprykershop.com/en/canon-ixus-160-1,http://images.icecat.biz/img/norm/medium/25904006-8438.jpg,0,10,4
Tracking
```

### Multi-Language support
If you have multi-language setup, you should provide locale as GET parameter to retrieve the proper version of a CSV file: `curl  http://mysprykershop.com/econda/index/product?locale=en_US`
You can check `stores.php` file in your project to see what locales you have enabled.
