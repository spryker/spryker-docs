A collection response carries its pagination summary in the top-level `meta.pagination` object:

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| meta.pagination.numFound | Integer | Total number of items found. |
| meta.pagination.currentPage | Integer | Current page number. |
| meta.pagination.maxPage | Integer | Total number of pages. |
| meta.pagination.currentItemsPerPage | Integer | Number of items per page. |

The top-level `links` object carries the `first` and `last` links, plus `prev` and `next` when those pages exist. Each link repeats the query parameters of the request and rewrites the window as `page[limit]` and `page[offset]`, so you can follow it as it is.
