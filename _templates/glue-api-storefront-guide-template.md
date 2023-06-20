---
title: {Meta title in gerund, e.g., Retrieving products}
description: {Meta description}
template: glue-api-storefront-guide-template
---

{Resource description}
{List benefits for developers}


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

* {Link to IG of the described resource}
* {Link to the IG of a described included resource}

## {Task item} <!--in imperative mood, i.e. Retrieve all products) -->

To {task}, send the request:

---

`{method}` {% raw %}**{endpoint}*{{path_parameter}}***{% endraw %}
<!--i.e., `GET` {% raw %}**/carts/*{{cart_uuid}}***{% endraw %}-->
---

| PATH PARAMETER | DESCRIPTION |
|---|---|
| {% raw %}***{{path_parameter}}***{% endraw %} |  |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
|  |  | {&check;/ } |  |


| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|---|---|---|
|   |   |   |

<!--
{% info_block infoBox "Included resources" %}

If a particular combination of resources should be included in the request to achieve a particular result, explain in it in this note. For example, "To include `bundled-products`, include `concrete-products` and `bundled-products` in the request.`"

{% endinfo_block %}

-->

Request sample: {request description} (e.g., add an item to a shopping list)

'{method} {endpoint}{parameter example}' <!--usage description (in imperative mood, i.e. Retrieve all products).-->

```{language}
{request body}
```
<!-- Use the following table if you have multiple request samples with a single request body or without it.) -->

| REQUEST SAMPLE | USAGE |
|---|---|
| {method} {endpoint}{parameter example} | <!-- usage description (in imperative mood, i.e. Retrieve all products) --> |
| {method} {endpoint}{parameter example}?include={included resource} | <!-- If including a resource into a request requires other resources to be included, describe only the target resource. For example, including `bundled-products` requires `concrete-products` and `bundled-products`. In this case, describe the request as " Retrieve ... with bundled products" omitting the other two resources. |

<details><summary markdown='span'>Request sample: {request description} (e.g., add an item to a shopping list)</summary>
'{method} {endpoint}{parameter example}' <!--usage description (in imperative mood, i.e. Retrieve all products). -->

```{language}
{request body}
```
</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
|---|---|---|---|
|  | {Array, Object, String, Boolean, Quantity, Integer (only for whole numbers), Number (for whole and decimal numbers)} | { &check/ |   } |  |

### Response

<!-- Response sample should correspond to the request sample in the previous section. -->

<details><summary markdown='span'>{response sample description}</summary>

```{language}
{response sample body}
```
</details>

<!-- For included resources: -->
<!-- If an included resource is in the request to include some other resource, omit it in the description -->
<details><summary markdown='span'>Response sample with {included entity name}</summary>

```{language}
{response sample body}
```
</details>

<!-- For long code blocks with sections, use H3 or H4 for section names (e.g., General order information)
Describe only the attributes that are unique for this article. If some or all the attributes are already described in another section of this article, provide a link. However, do not link to the section, but to the table with the attribute descriptions in that section. Use an anchor. -->

| ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|
|  | {Array, Object, String, Boolean, Quantity, Integer (only for whole numbers), Number (for whole and decimal numbers)} |  |

<!-- Use the following table if an included resource does not have a dedicated page. -->

|INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|---|
|  |  | {Array, Object, String, Boolean, Quantity, Integer (only for whole numbers), Number (for whole and decimal numbers)} |  |

For the attributes of the included resources, see:
• {Link to the table of an included resource's attribute descriptions}

## Other management options

<!--Briefly describe and provide links to articles where this resource is used in combination with other resources. For example, as an included resource or as part of an endpoint of another resource.-->

## Possible errors

<!--Only one table with errors per article. Do not create separate tables in all the sections of a document.-->

| CODE | REASON |
|---|---|
|  {Error code} <!-- i.e., 408. Double-check that you are adding error codes, not error statuses. --> | {Error code reason} <!-- Brief explanation of the code, i.e., Invalid password. --> |
