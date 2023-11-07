---
title: Retrieve picklists
description: Learn how to retrieve picklists using Glue API
template: glue-api-storefront-guide-template
---

This endpoint allows retrieving picklists.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
* [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Retrieve picklists

***
`GET` **/picking-lists**
***  

### Request

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>picking-list-items</li> <li>users</li> <li>warehouses</li></ul> |

| REQUEST  | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/picking-lists` | Retrieve all available picking lists.  |
| `GET https://glue.mysprykershop.com/picking-lists?include=picking-list-items` | Retrieve all available picking lists with picklist items included.  |
| `GET https://glue.mysprykershop.com/picking-lists?include=users` |  |
| `GET https://glue.mysprykershop.com/picking-lists?include=warehouses` |  |


### Response






## Retrieve a picklist

***
`GET` **{% raw %}/picking-lists/{{picklist_id}}**{% endraw %}
***  


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{picklist_id}}***{% endraw %} | ID of the picklist to retrieve. To get it, see                            |

### Request

Request sample:


### Response
