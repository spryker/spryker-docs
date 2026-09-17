---
title: {Meta title, e.g., "Backend API: Manage products"}
description: {Meta description, e.g., Learn how to retrieve, create, and update products in your Spryker shop using the Spryker Backend API.}
template: glue-api-backend-guide-template
---

<!--
Use this template for Backend API guides—endpoints served on the Glue Backend application and
authorized with a Back Office user access token.
-->

{Resource description. State what the endpoints expose and who builds against them, for example
Back Office extensions, ERP and CRM integrations, and internal tools.}

{Resource identifier sentence, e.g., "Products are addressed by `sku`. The internal database
identifier is never exposed."}

## Installation

These endpoints are provided by API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

{Optional: link to the installation guide of the feature that provides these endpoints.}

## {Task item} <!-- in imperative mood, e.g., Retrieve products -->

To {task}, send the request:

***
`{method}` {% raw %}**{endpoint}*{{path_parameter}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{path_parameter}}***{% endraw %} | {Description. Tell the reader how to obtain it, e.g., "To get it, [retrieve products](#retrieve-products)."} |

### Request

<!-- Every Backend API request is authorized with a Back Office user token. Keep this row as is. -->

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. <!-- Write operations only. --> |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[limit] | Maximum number of items to return per page. | From `1` to any. Defaults to `10`. |
| page[offset] | Number of items to skip before the page begins. | From `0` to any. Defaults to `0`. |
| filter[{resource}.{property}] | {Filter description. State whether the match is exact or partial, and whether it is case-sensitive.} | {Possible values} |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. | {Sortable fields} |

<!-- State what happens on an unsupported sort field or filter property, with the error codes. -->

Request sample: `{method} https://glue-backend.mysprykershop.com/{endpoint}`

```json
{request body}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
|  | {String, Boolean, Integer, Number, Array, Object} | {&check; / } | {Description. For optional attributes, state the default.} |

<!-- Use this table when one operation has several useful request variants. -->

| REQUEST | USAGE |
| --- | --- |
| `{method} https://glue-backend.mysprykershop.com/{endpoint}` | {Usage description in imperative mood.} |

### Response

<details>
  <summary>Response sample: {description}</summary>

```json
{response body}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
|  | {String, Boolean, Integer, Number, Array, Object} |  |

<!-- For collection endpoints, document the pagination summary. -->

A collection response carries its pagination summary in the top-level `meta.pagination` object:

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| meta.pagination.numFound | Integer | Total number of items found. |
| meta.pagination.currentPage | Integer | Current page number. |
| meta.pagination.maxPage | Integer | Total number of pages. |
| meta.pagination.currentItemsPerPage | Integer | Number of items per page. |

## Other management options

<!-- Link the sibling Backend API guides for related resources. -->

- {Link to a related Backend API guide}

## Possible errors

<!-- Only one error table per page. Use error codes, not HTTP statuses. -->

| CODE | REASON |
| --- | --- |
| {code} | {Reason} |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
