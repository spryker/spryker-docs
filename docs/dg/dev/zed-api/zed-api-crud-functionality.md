---
title: Zed API CRUD functionality
description: Use the guide to learn how to configure filtering, pagination, sorting actions and adding or udpating resource items.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/zed-api-crud-functionality
originalArticleId: c0db2699-f490-4515-9278-f5e61f8f460b
redirect_from:
  - /docs/scos/dev/zed-api/zed-api-crud-functionality.html
  - /docs/scos/dev/sdk/201811.0/zed-api/zed-api-crud-functionality.html
  - /docs/scos/dev/sdk/201903.0/zed-api/zed-api-crud-functionality.html
  - /docs/scos/dev/sdk/201907.0/zed-api/zed-api-crud-functionality.html
  - /docs/scos/dev/sdk/202001.0/zed-api/zed-api-crud-functionality.html
  - /docs/scos/dev/sdk/202005.0/zed-api/zed-api-crud-functionality.html
  - /docs/scos/dev/sdk/202009.0/zed-api/zed-api-crud-functionality.html
  - /docs/scos/dev/sdk/202108.0/zed-api/zed-api-crud-functionality.html
  - /docs/scos/dev/sdk/zed-api/zed-api-crud-functionality.html
related:
  - title: Zed API (Beta)
    link: docs/scos/dev/sdk/zed-api/zed-api-beta.html
  - title: Zed API configuration
    link: docs/scos/dev/sdk/zed-api/zed-api-configuration.html
  - title: Zed API resources
    link: docs/scos/dev/sdk/zed-api/zed-api-resources.html
  - title: Zed API processor stack
    link: docs/scos/dev/sdk/zed-api/zed-api-processor-stack.html
  - title: Zed API project implementation
    link: docs/scos/dev/sdk/zed-api/zed-api-project-implementation.html
---
{% info_block warningBox "Warning" %}

Zed API, initially released as a beta version, is now considered outdated and is no longer being developed. Instead of it, we recommend using [Glue Backend API](/docs/dg/dev/glue-api/{{site.version}}/decoupled-glue-api.html#new-type-of-application-glue-backend-api-application).

{% endinfo_block %}
## Filtering

For find action we return a paginated collection that can be limited and customized based on query string input or headers. So using the provided `FilterPreProcessors` one can enable filtering (conditions), sorting (and multi-sorting) and pagination.

### Condition filtering

For the filtering we use the Spryker `PropelQueryBuilder` module. It generates Propel query criteria based on a [jQuery QueryBuilder](http://querybuilder.js.org/) string.

You can pass any kind of complex query including AND/OR into the `filter` query string:

```bash
/api/rest/customers?filter={% raw %}{%{% endraw %}22condition%22:%22OR%22,%22rules%22:[{% raw %}{%{% endraw %}22id%22:
%22first_name%22,%22field%22:%22first_name%22,%22type%22:%22string%22,
%22input%22:%22text%22,%22operator%22:%22equal%22,%22value%22:%22John%22},
{% raw %}{%{% endraw %}22id%22:%22last_name%22,%22field%22:%22last_name%22,%22type%22:%22string%22,
%22input%22:%22text%22,%22operator%22:%22equal%22,%22value%22:%22Doe%22}]}
```

### Field limitations

For limiting fields you can use the fields query string:

```
/api/rest/customers?fields=name,id
```

Comma separate the fields.

### Sorting

`/api/rest/customers?sort=name,-id`

Comma separate the fields. A `-` prefix will sort DESC instead of the default ASC.

### Pagination

By default the API returns a set of 20 records. You can adjust this up via `limit` query string to the “maximum per page” value. You can also set a page query string param as an offset.

`/api/rest/customers?page=2&limit=50`

The following meta and link blocks will be included in the response:

```php
"links": {
    "first": ...,
    "prev": ...,
    "next": ...,
    "last": ...,
},
"meta": {
    "page": 3,
    "pages": 3,
    "records": 5,
    "records_per_page": 20,
    "records_total": 55
}
```

### Pagination by header range

The core also ships with a header range solution, setting the range to `0-9` (page 1), `10-19` (page 2), etc. The header to be sent by the client would look like this:

```
Range: customers=0-9
```

{% info_block warningBox %}

This pagination type is 0-based.

{% endinfo_block %}

### Implement a custom solution

In case you need a different pagination strategy, you can replace the core Processor with a custom project one for either a page-based or offset-based solution.

## Fields

Each resource must have a `ResourceApiTransfer`, e.g. for a customer it would be a `CustomerApiTransfer`. You will declare it in a `customer_api.transfer.xml` and insert only fields you want to support for.

By default, any resource will only expose and accept the fields defined in this transfer. For response data you can also further filter by a whitelist as field map (see above).

## Add and update

When adding or updating a resource item, one must contain the payload in the following structure:

```php
{
    "data": {
        "field": "value",
        ...
    }
}
```

Primary keys in the payload will be ignored for security reasons.

### Validation

For “add” and “update” actions we need validation to handle the incoming post data. The process here is to delegate this to the `ApiFacade::validate()` method, which internally uses a configured stack of validation plugins. These can be configured in your `ApiDependencyProvider`:

```php
<?php

namespace Pyz\Zed\Api;

use Spryker\Zed\Api\ApiDependencyProvider as SprykerApiDependencyProvider;
use Spryker\Zed\CustomerApi\Communication\Plugin\Api\CustomerApiValidatorPlugin;
use Spryker\Zed\ProductApi\Communication\Plugin\Api\ProductApiValidatorPlugin;

class ApiDependencyProvider extends SprykerApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Api\Dependency\Plugin\ApiValidatorPluginInterface[]
     */
    protected function getApiValidatorPluginCollection(): array
    {
        return [
            new CustomerApiValidatorPlugin(),
            new ProductApiValidatorPlugin(),
            ...
        ];
    }
}
```

They use the same resource resolving as mentioned above.

Validation errors will abort the persisting and instead return a 422 error response:

```php
{
    "code": 422,
    "message": "Validation errors.",
    "errors": [
        "field_name" => [
            "error one",
            ...                         
         ],
        ...
    ],
    ...
}
```

Validators can have query container access if needed. For example, “isUnique rules might need that.

{% info_block warningBox %}

As per specification the members data and errors **MUST NOT** coexist in the same document.

{% endinfo_block %}

### Deleting

A successful delete request returns an empty body and a 204 response code.

The Spryker default behavior is to not fail on no-op delete. If you want to be stricter, you can customize your post processor to only allow a true delete and to throw 404 if not found (anymore). Use a post processor and check the content returned then by “remove” action. It will be an empty array if no record was found to delete.

If a body is supposed to be returned, e.g. including meta data, use a 202 response code.
