---
title: How to use OOTB Glue parameters
description: 
last_updated: September 30, 2022
template: howto-guide-template
---

Glue conventions provide some parameters parsing out of the box. Among them:

*   Pagination
    
*   Sorting
    
*   Filters
    

This article will explain how to pass the parameters and how to use them in code.

## Pagination

Glue uses an offset-based pagination style: the client passes two values `offset` and `limit` where the limit is the number of records to display, and offset is the number of records to skip. Here is an example:

```
?page[offset]=0&page[limit]=10 # display 10 records starting at 0 (AKA page #1)
?page[offset]=10&page[limit]=10 # display 10 records starting at 10 (AKA page #2)
```

In JSON:API responses the calculation of the next, previous, last and first pages will be provided. Clients can use them to build pagination:

```
"links": {
    "next": "http://glue.de.spryker.local/wishlists?page[offset]=3&amp;page[limit]=2",
    "prev": "http://glue.de.spryker.local/wishlists?page[offset]=0&amp;page[limit]=2",
    "last": "http://glue.de.spryker.local/wishlists?page[offset]=10&amp;page[limit]=2",
    "first": "http://glue.de.spryker.local/wishlists?page[offset]=0&amp;page[limit]=2"
}
```

When pagination parameters are passed from the client, the `GlueRequestTransfer` available as the Glue controller action parameter will contain `pagination`. Access them like this:

```
$glueRequestTransfer->getPagination()->getOffset();
$glueRequestTransfer->getPagination()->getLimit();
```

Use these to pass them to the clients/facades (the latter should support the pagination of course).

In order for the response links to be formed correctly, `GlueResponseTransfer` transfer should contain the information about the requested (and applied - if changed by the code) pagination parameters and the total number of results in the set.

```
$glueResponseTransfer->getPagination()->setOffset();
$glueResponseTransfer->getPagination()->setLimit();
$glueResponseTransfer->getPagination()->setNbResults();
```

* * *

## Sorting

Sorting can be passed part as request as simple GET parameters `?sort=resources.age`  where value is the field by which sort resource and attribute, by default it is ASCENDING order, to change it to DESCENDING add "-" like `?sort=-resources.age`.

To get order you can read it from `$glueRequestTransfer->getSortings()`  which will return an array of `SortTransfer` each containing field to be sorted, use it to sort data when querying from persistence.

* * *

## Filters

To add filter client must send `?filter[wishlists.name]=Test&filter[wishlists.quantity]=1` this would be equal in SQL to `WHERE wishlists.name='Test' AND wishlists.quantity = 1`.

To use those fields when processing use `$glueRequestTransfer->getFilters()`, this will return an array of `GlueFilterTransfer`. You can loop over it and find filters matching your resource.

* * *

## Sparse fields

You can reduce the amount of data returned by using sparse fields, clients can provide what fields for each resource to process. The clients must send request with `?fields[people]=name,last-name`.  Where "people" is the resource name, value is a comma-separated field list as defined in resource attributes.

When processing a request you can get this by accessing `$glueRequestTransfer->getQueryFields()` this will return array of strings.

When building response attributes that are not within the fields list will be removed, even if it was populated by resource processing.