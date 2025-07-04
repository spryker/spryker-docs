This document describes how to install the Data Exchange API + Category Management feature.

## Prerequisites

Install the required features:

| NAME                | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                   |
|---------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Data Exchange API   | 202507.0 | [Install the Data Exchange API](/docs/pbc/all/data-exchange/latest/install-and-upgrade/install-the-data-exchange-api.html)                                                                 |
| Category Management | 202507.0 | [Install the Category Management feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |

## 1) Install the required modules

```bash
composer require spryker/category-dynamic-entity-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following module has been installed:

| MODULE                         | EXPECTED DIRECTORY                        |
|--------------------------------|-------------------------------------------|
| CategoryDynamicEntityConnector | spryker/category-dynamic-entity-connector |

{% endinfo_block %}

## 1) Set up behavior

Register the following plugins:

| PLUGIN                                            | SPECIFICATION                                                          | PREREQUISITES                                                                        | NAMESPACE                                                                     |
|---------------------------------------------------|------------------------------------------------------------------------|--------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| CategoryClosureTableDynamicEntityPostCreatePlugin | Creates a category closure table entity based on the provided dynamic entity data. |                                                                                      | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryUrlDynamicEntityPostCreatePlugin          | Creates category URLs based on the provided dynamic entity data.                 | Should be executed after the `CategoryClosureTableDynamicEntityPostCreatePlugin` plugin. | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryTreeDynamicEntityPostCreatePlugin         | Triggers the category tree publish event.                                  |                                                                                      | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryClosureTableDynamicEntityPostUpdatePlugin | Updates a category closure table entity based on the provided dynamic entity data. |                                                                                      | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryUrlDynamicEntityPostUpdatePlugin          | Updates category URLs based on the provided dynamic entity data.                 | Should be executed after the `CategoryClosureTableDynamicEntityPostUpdatePlugin` plugin. | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |
| CategoryTreeDynamicEntityPostUpdatePlugin         | Triggers the category tree publish event.                                  |                                                                                      | Spryker\Zed\CategoryDynamicEntityConnector\Communication\Plugin\DynamicEntity |

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

To verify that plugins are installed correctly, follow the steps:

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

Take note of the `id_category` in the response.

2. Create a category-store relation:

```bash
POST /dynamic-entity/category-stores HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Authorization: Bearer {your_token}
Content-Length: 100
{
    "data": [
        {
            "fk_category": {ID_CATEGORY},
            "fk_store": 1
        }
    ]
}
```

3. Create a category attribute:

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
            "fk_category": {ID_CATEGORY},
            "meta_description": "My Category",
            "fk_locale": 66,
            "name": "My Category"
        }
    ]
}
```

4. Create a category node:

```bash
POST /dynamic-entity/category-nodes HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Authorization: Bearer {your_token}
Content-Length: 203
{
    "data": [
        {
            "fk_category": {ID_CATEGORY},
            "fk_parent_category_node": 1,
            "is_main": true,
            "is_root": false,
            "node_order": 0
        }
    ]
}
```

Take note of the `id_category_node` in the response.

5. Check that the category closure table entities have been created:

```sql
SELECT * FROM spy_category_closure_table WHERE fk_category_node_descendant = {ID_CATEGORY_NODE};
```

6. Check that the category URLs have been created:

```sql
SELECT * FROM spy_url WHERE fk_resource_categorynode = {ID_CATEGORY_NODE};
```

7. Check that the category tree has been published:

```sql
SELECT spy_category_tree_storage.`data`
FROM spy_category_tree_storage
         LEFT JOIN spy_locale ON spy_category_tree_storage.locale = spy_locale.locale_name
         LEFT JOIN spy_store ON spy_category_tree_storage.store = spy_store.name
WHERE spy_locale.id_locale = 66
  AND spy_store.id_store = 1;
```

8. Check that newly created category is present in the category tree JSON.

9. Update the category attribute:

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

10. Check that the category URL has been updated:

```sql
SELECT * FROM spy_url WHERE fk_resource_categorynode = {ID_CATEGORY_NODE};
```

11. Update the category node:

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

12. Check that category closure table entities have been updated:

```sql
SELECT * FROM spy_category_closure_table WHERE fk_category_node_descendant = {ID_CATEGORY_NODE};
```

13. Check that category tree has been updated:

```sql
SELECT spy_category_tree_storage.`data`
FROM spy_category_tree_storage
         LEFT JOIN spy_locale ON spy_category_tree_storage.locale = spy_locale.locale_name
         LEFT JOIN spy_store ON spy_category_tree_storage.store = spy_store.name
WHERE spy_locale.id_locale = 66
  AND spy_store.id_store = 1;
```

14. Check that newly created category is present in the category tree JSON.

{% endinfo_block %}
