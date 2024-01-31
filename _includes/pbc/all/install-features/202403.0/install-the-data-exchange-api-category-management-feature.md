This document describes how to install the Data Exchange API + Category Management feature.

## Install feature core

Follow the steps below to install the Data Exchange API + Category Management feature core.

### Prerequisites

Install the required features:

| NAME                | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                   |
|---------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Data Exchange API   | {{page.version}} | [Data Exchange API integration](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html)                                                                 |
| Category Management | {{page.version}} | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |

### 1) Install the required modules using Composer

```bash
composer require spryker/category-dynamic-entity-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following module has been installed:

| MODULE                         | EXPECTED DIRECTORY                        |
|--------------------------------|-------------------------------------------|
| CategoryDynamicEntityConnector | spryker/category-dynamic-entity-connector |

{% endinfo_block %}

### 1) Set up behavior

Register the following plugins:

| PLUGIN                                            | SPECIFICATION                                                          | PREREQUISITES                                                                        | NAMESPACE                                                                     |
|---------------------------------------------------|------------------------------------------------------------------------|--------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| CategoryClosureTableDynamicEntityPostCreatePlugin | Creates category closure table entity by provided dynamic entity data. |                                                                                      | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryUrlDynamicEntityPostCreatePlugin          | Creates category URLs by provided dynamic entity data.                 | Should be executed after `CategoryClosureTableDynamicEntityPostCreatePlugin` plugin. | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryTreeDynamicEntityPostCreatePlugin         | Triggers category tree publish event.                                  |                                                                                      | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryClosureTableDynamicEntityPostUpdatePlugin | Updates category closure table entity by provided dynamic entity data. |                                                                                      | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryUrlDynamicEntityPostUpdatePlugin          | Updates category URLs by provided dynamic entity data.                 | Should be executed after `CategoryClosureTableDynamicEntityPostUpdatePlugin` plugin. | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryTreeDynamicEntityPostUpdatePlugin         | Triggers category tree publish event.                                  |                                                                                      | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |

**src/Pyz/Zed/DynamicEntity/DynamicEntityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DynamicEntity;

use Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity\CategoryClosureTableDynamicEntityPostCreatePlugin;
use Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity\CategoryClosureTableDynamicEntityPostUpdatePlugin;
use Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity\CategoryTreeDynamicEntityPostCreatePlugin;
use Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity\CategoryTreeDynamicEntityPostUpdatePlugin;
use Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity\CategoryUrlDynamicEntityPostCreatePlugin;
use Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity\CategoryUrlDynamicEntityPostUpdatePlugin;
use Spryker\Zed\DynamicEntity\DynamicEntityDependencyProvider as SprykerDynamicEntityDependencyProvider;

class DynamicEntityDependencyProvider extends SprykerDynamicEntityDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostUpdatePluginInterface>
     */
    protected function getDynamicEntityPostUpdatePlugins(): array
    {
        return [
            new CategoryClosureTableDynamicEntityPostUpdatePlugin(),
            new CategoryUrlDynamicEntityPostUpdatePlugin(),
            new CategoryTreeDynamicEntityPostUpdatePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface>
     */
    protected function getDynamicEntityPostCreatePlugins(): array
    {
        return [
            new CategoryClosureTableDynamicEntityPostCreatePlugin(),
            new CategoryUrlDynamicEntityPostCreatePlugin(),
            new CategoryTreeDynamicEntityPostCreatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
To verify that plugins are installed correctly, go through the following steps:

1. Create a category using dynamic entity API:
```bash
POST /dynamic-entity/categories HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 257
{
    "data": [
        {
            "fk_category_template": 1,
            "category_key": "my-category",
            "is_active": true,
            "is_clickable": true,
            "is_in_menu": true,
            "is_searchable": true
        }
    ]
}
```
Check that you receive `id_category` in response.
2. Create category store relation:
```bash
POST /dynamic-entity/category-stores HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Authorization: Bearer {your_token}
Content-Length: 100
{
    "data": [
        {
            "fk_category": {id_category},
            "fk_store": 1
        }
    ]
}
```

3. Create category attribute:
```bash
POST /dynamic-entity/category-attributes HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 184

{
    "data": [
        {
            "fk_category": {id_category},
            "meta_description": "My Category",
            "fk_locale": 66,
            "name": "My Category"
        }
    ]
}
```

4. Create category node:
```bash
POST /dynamic-entity/category-nodes HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Authorization: Bearer {your_token}
Content-Length: 203
{
    "data": [
        {
            "fk_category": {id_category},
            "fk_parent_category_node": 1,
            "is_main": true,
            "is_root": false,
            "node_order": 0
        }
    ]
} 
```
Check that you receive `id_category_node` in response.
5. Check that the category closure table entities are created by running the following SQL query:
```sql
SELECT * FROM spy_category_closure_table WHERE fk_category_node_descendant = {id_category_node};
```
6. Check that the category URLs are created by running the following SQL query:
```sql
SELECT * FROM spy_url WHERE fk_resource_categorynode = {id_category_node};
```
7. Check that the category tree is published by running the following SQL query:
```sql
SELECT spy_category_tree_storage.`data`
FROM spy_category_tree_storage
         LEFT JOIN spy_locale ON spy_category_tree_storage.locale = spy_locale.locale_name
         LEFT JOIN spy_store ON spy_category_tree_storage.store = spy_store.name
WHERE spy_locale.id_locale = 66
  AND spy_store.id_store = 1;
```
Check that newly created category is present in category tree JSON.

8. Update category attribute:
```bash
PATCH /dynamic-entity/category-attributes HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Authorization: Bearer {your_token}
Content-Length: 173
{
    "data": [
        {
            "id_category_attribute": {id_category_attribute},
            "meta_description": "My Category",
            "name": "My Category Updated"
        }
    ]
}
```

Check that category URL is updated by running the following SQL query:
```sql
SELECT * FROM spy_url WHERE fk_resource_categorynode = {id_category_node};
```

9. Update category node:
```bash
PATCH /dynamic-entity/category-nodes HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Authorization: Bearer {your_token}
Content-Length: 120
{
    "data": [
        {
            "id_category_node": 20,
            "fk_parent_category_node": 5
        }
    ]
}
```
Check that category closure table entities are updated by running the following SQL query:
```sql
SELECT * FROM spy_category_closure_table WHERE fk_category_node_descendant = {id_category_node};
```

Check that category tree is updated by running the following SQL query:
```sql
SELECT spy_category_tree_storage.`data`
FROM spy_category_tree_storage
         LEFT JOIN spy_locale ON spy_category_tree_storage.locale = spy_locale.locale_name
         LEFT JOIN spy_store ON spy_category_tree_storage.store = spy_store.name
WHERE spy_locale.id_locale = 66
  AND spy_store.id_store = 1;
```
Check that newly created category is present in category tree JSON.

{% endinfo_block %}
