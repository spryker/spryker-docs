---
title: Use default Glue parameters
description: This document explains how to pass the parameters and how to use them in code
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/glue-parameters-usage.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-use-ootb-glue-parameters.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/how-to-guides/how-to-use-ootb-glue-parameters.html
  - /docs/scos/dev/glue-api-guides/202204.0/use-default-glue-parameters.html
  - /docs/scos/dev/glue-api-guides/202404.0/use-default-glue-parameters.html

---

This document explains how to pass the parameters and how to use them in code.

The Glue JSON:API convention provides some parameter parsing out of the box. The following are among them:
- Pagination
- Sorting
- Filters

## Pagination

Glue uses an offset-based pagination style: the client passes two values, `offset` and `limit`, where the limit's the number of records to display, and offset is the number of records to skip. Here is an example:

```json
?page[offset]=0&page[limit]=10 # display 10 records starting at 0 (AKA page #1)
?page[offset]=10&page[limit]=10 # display 10 records starting at 10 (AKA page #2)
```

In JSON:API responses, the calculation of the next, previous, last, and first pages are provided. Clients can use them to build pagination:

```json
"links": {
    "next": "https://glue.mysprykershop.com/wishlists?page[offset]=3&amp;page[limit]=2",
    "prev": "https://glue.mysprykershop.com/wishlists?page[offset]=0&amp;page[limit]=2",
    "last": "https://glue.mysprykershop.com/wishlists?page[offset]=10&amp;page[limit]=2",
    "first": "https://glue.mysprykershop.com/wishlists?page[offset]=0&amp;page[limit]=2"
}
```

When pagination parameters are passed from the client, `GlueRequestTransfer` is available as the Glue controller action parameter contains `pagination`. Access them like this:

```php
$glueRequestTransfer->getPagination()->getOffset();
$glueRequestTransfer->getPagination()->getLimit();
```

Use these to pass them to the clients and facades (the latter must support the pagination).

In order for the response links to be formed correctly, `GlueResponseTransfer` transfer must contain the information about the requested (and applied, if changed by the code) pagination parameters and the total number of results in the set.

```php
$glueResponseTransfer->getPagination()->setOffset();
$glueResponseTransfer->getPagination()->setLimit();
$glueResponseTransfer->getPagination()->setNbResults();
```

## Sorting

Sorting can be passed part as a request as simple GET parameters `?sort=resources.age`, where value is the field by which sort resource and attribute; by default, it's ASCENDING order. To change it to DESCENDING, add a hyphen (`-`)—for example, `?sort=-resources.age`.

To get an order, you can read it from `$glueRequestTransfer->getSortings()`, which returns an array of `SortTransfer`, each containing field to be sorted. Use it to sort data when querying from persistence.

## Filters

To add a filter, the client must send `?filter[wishlists.name]=Test&filter[wishlists.quantity]=1`. In SQL, this is equal to `WHERE wishlists.name='Test' AND wishlists.quantity = 1`.

To use those fields when processing use `$glueRequestTransfer->getFilters()`, this returns an array of `GlueFilterTransfer`. You can loop over it and find filters matching your resource.

## Sparse fields

You can reduce the amount of data returned by using sparse fields. Clients can provide what fields to process for each resource. The clients must send a request with `?fields[people]=name,last-name`, where `people` is a resource name, and its value is a comma-separated field list as defined in resource attributes.

When processing a request, you can get this by accessing `$glueRequestTransfer->getQueryFields()`. This returns an array of strings.

When building response attributes that are not within the fields, the list is removed, even if it's populated by resource processing.
