---
title: Retrieve picklist items
description: Learn how to retrieve picklist items using Glue API
template: glue-api-storefront-guide-template
---

This endpoint allows retrieving picklist items.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)

## Retrieve items from a picklist

***
`GET` **{% raw %}/picking-lists/{{picklist_id}}/picking-list-items{% endraw %}**
***  

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{picklist_id}}***{% endraw %} | ID of the picklist to retrieve the items of. To get it, see [Retrieve picklists](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/retrieve-picklists.html)            |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |


### Response






## Retrieve an item from a picklist

***
`GET` **{% raw %}/picking-lists/{{picklist_id}}/picking-list-items/{{picklist_item_id}}{% endraw %}
***  


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{picklist_id}}***{% endraw %} | ID of the picklist to retrieve the items of. To get it, see [Retrieve picklists](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/retrieve-picklists.html)            |
| {% raw %}***{{picklist_item_id}}***{% endraw %} |                                     |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

Request sample:


### Response
