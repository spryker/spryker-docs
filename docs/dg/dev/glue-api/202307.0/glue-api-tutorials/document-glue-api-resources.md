---
title: Document Glue API resources
description: This guide shows how to document Glue API resources
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/documenting-glue-api-resources
originalArticleId: 6e10e5c4-e2ba-4e7a-b665-5dc7c5fb94dc
redirect_from:
  - /2021080/docs/documenting-glue-api-resources
  - /2021080/docs/en/documenting-glue-api-resources
  - /docs/documenting-glue-api-resources
  - /docs/en/documenting-glue-api-resources
  - /v6/docs/documenting-glue-api-resources
  - /v6/docs/en/documenting-glue-api-resources
  - /v5/docs/documenting-glue-api-resources
  - /v5/docs/en/documenting-glue-api-resources
  - /v4/docs/documenting-glue-api-resources
  - /v4/docs/en/documenting-glue-api-resources
  - /v2/docs/documenting-glue-api-resources
  - /v2/docs/en/documenting-glue-api-resources
  - /v1/docs/documenting-glue-api-resources
  - /v1/docs/en/documenting-glue-api-resources
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/glue-api/documenting-glue-api-resources.html
  - /docs/scos/dev/glue-api-guides/202307.0/glue-api-tutorials/document-glue-api-resources.html

related:
  - title: Glue infrastructure
    link: docs/dg/dev/glue-api/page.version/old-glue-infrastructure/glue-infrastructure.html
  - title: Glue API installation and configuration
    link: docs/pbc/all/miscellaneous/page.version/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html
---

To help developers understand and use the public API of your project, you need to cover it with complete and up-to-date documentation. Spryker Glue lets you generate it automatically with the help of the `DocumentationGeneratorRestApi` module, which extracts information on your REST API endpoints directly from their implementation. It also can provide additional information on endpoints, such as their purpose, usage details, and request parameters—for example, in headers, paths, queries, or cookies.

The resulting document is a full description of your REST API following the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) (formerly known as Swagger Document Format). It can be viewed, edited, and consumed with the help of such tools as [Swagger Tools](https://swagger.io/) and [Postman](https://www.getpostman.com/).

{% info_block warningBox %}

REST API endpoints shipped by Spryker are covered by documentation by default. A snapshot of the latest state of Spryker REST API can be found in Spryker Documentation. For more information, see Rest API references:
* [REST API B2B Demo Shop reference](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/rest-api-b2b-demo-shop-reference.html)
* [REST API B2C Demo Shop reference](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/rest-api-b2c-demo-shop-reference.html)

{% endinfo_block %}

## Prerequisites

Install and enable [Spryker Glue](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html). Also, see the following documents:

* [Open API Specification](https://github.com/OAI/OpenAPI-Specification)
* [Swagger Tools Reference](https://swagger.io/)

## 1. Install and configure the REST API documentation generator

To generate REST API documentation, install the `DocumentationGeneratorRestApi` module:

```bash
composer require spryker/rest-api-documentation-generator
```

After installation, open the file `src/Pyz/Zed/DocumentationGeneratorRestApi/DocumentationGeneratorRestApiConfig.php` and modify the values of the following variables, if necessary:

|  VARIABLE | DESCRIPTION  | DEFAULT VALUE  |
| --- | --- | --- |
| `GENERATED_FILE_OUTPUT_DIRECTORY` | Sets the directory where the API specification file will be generated. | `APPLICATION_SOURCE_DIR/Generated/Glue/Specification/`<br>By default, the `APPLICATION_SOURCE_DIR` variable is substituted with `src/Pyz`. The resulting directory is `src/Pyz/Generated/Glue/Specification/`. |
|`GENERATED_FILE_PREFIX`  | Sets the generated file name. | `spryker_rest_api.schema.yml` |
| `REST_API_DOCUMENTATION_INFO_VERSION` | Sets the API version. For details, on GItHub, see [versions](https://github.com/OAI/OpenAPI-Specification/tree/master/versions). | `1.0.0` |
| `REST_API_DOCUMENTATION_INFO_TITLE` | Sets the name of your API. | `Spryker API` |
| `APPLICATION_PROJECT_ANNOTATION_SOURCE_DIRECTORY_PATTERN` | Specifies a template for paths where to search for REST API controllers on the *project* level. | `/Glue/%1$s/Controller/` |
| `APPLICATION_CORE_ANNOTATION_SOURCE_DIRECTORY_PATTERN` | Specifies a template for paths where to search for REST API controllers on the *vendor* level. | `/*/*/src/*/Glue/%1$s/Controller/` |

For information about REST API controllers, see [Create a resource controller](/docs/dg/dev/glue-api/{{page.version}}/glue-api-tutorials/implement-a-rest-api-resource.html#create-a-resource-controller) in the *Implement a REST API resource* document.

## 2. Test the documentation generator

Make sure that the documentation generator works properly:

```bash
vendor/bin/console rest-api:generate:documentation
---
```

When the command completes, you can see a specification file generated in the directory with the filename as you configured in [step 2. Configuration](/docs/dg/dev/glue-api/{{page.version}}/glue-api-tutorials/implement-a-rest-api-resource.html#create-a-configuration-class). By default, it is `src/Generated/Glue/Specification/spryker_rest_api.schema.yml`.

## 3. Describe your REST API: Requests and responses

Data models of requests used in your REST API are described with the help of transfer objects. Such objects contain a list of fields for each request or response, their data type, and which of the fields are required. By default, the fields are not included in the specification automatically. To include them, you need to modify the XML schema definitions of the transfer objects.
The visibility of request and response fields is controlled by the XML attribute `restRequestParameter`. It can have *three* possible values:

* `required`: The field is included in the documentation and also required for a valid request.
* `yes`: The field is included in the documentation but optional.
* `no`: The field is excluded from the documentation.

If the `restRequestParameter` attribute is not present for a field, the default value is `no`.

A response is generated using all properties of a transfer object. See the following definition example of a request transfer object:

**auth_rest_api.transfer.xml**

```xml
<transfer name="RestAccessTokensAttributes">
    <property name="username" type="string" restRequestParameter="required" /> <!-- field is included in the specification and required -->
    <property name="password" type="string" restRequestParameter="required" /> <!-- field is included in the specification and required -->
    <property name="tokenType" type="string" restRequestParameter="yes" /> <!-- field is included in the specification and optional -->
    <property name="expiresIn" type="string" restRequestParameter="no" /> <!-- field is not included in the specification -->
    <property name="accessToken" type="string" /> <!-- field is not included in the specification -->
    <property name="refreshToken" type="string" /> <!-- field is not included in the specification -->
    </transfer>
```

To apply the changes, generate transfers:

```bash
vendor/bin/console transfer:generate
```

### Describe resource relationships

Many REST API resources are related to each other. For example, the cart items resource is related to the products resources describing the products included in a cart, and so on. On the API side, such relationships are expressed with the help of [resource relationships](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/glue-infrastructure.html#resource-relationships).

The already existing resource relationships are added to the documentation automatically. However, some resources are only available through relationships, so they do not have their own resource route. In these cases, to facilitate the implementation of clients based on the Glue REST API of your project, you can describe such relationships in the generated documentation. To describe how two resources are related, add an additional annotation to the `ResourceRelationshipPlugin`, which links the resources together. For example, in the following code sample, `ResourceRelationshipPlugin` allows including items while requesting a cart is expanded with the specification of the relationship attributes type:

```php
/**
 * @Glue({
 *      "resourceAttributesClassName": "\\Generated\\Shared\\Transfer\\RestItemsAttributesTransfer"
 * })
 * ...
 */
 class CartItemsByQuoteResourceRelationshipPlugin extends AbstractPlugin implements ResourceRelationshipPluginInterface
 {
 ```

{% info_block infoBox "Info" %}

For more information about `ResourceRelationshipPlugins`, see [Resource relationships](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/glue-infrastructure.html#resource-relationships).

{% endinfo_block %}

## 3. Add REST methods

In addition to requests and responses, you can supply additional information on your API endpoints by modifying the resource controllers of your REST API modules.

Each controller has `getAction`, `postAction`, `patchAction`, or `deleteAction` functions, each providing functionality for the respective REST verbs (`GET`, `POST`, `PATCH`, `DELETE`). In the PHPDoc blocks of such functions, you can use a new type of annotation: `@Glue`. The annotations use JSON-like format as follows:

**View sample**

```php
/**
 * @Glue({
 *     "post": {
 *          "summary": [
 *              "Summary example."
 *          ],
 *          "parameters": [
 *              {
 *                  name: "Accept-Language",
 *                  in: "header",
 *              },
 *              {
 *                  name: "X-Anonymous-Customer-Unique-Id",
 *                  in: "header",
 *                  required: true,
 *                  description: "Guest customer unique ID"
 *              },
 *          ],
 *          "responses": {
 *              "400": "Bad Response.",
 *              "404": "Item not found.",
 *              "500": "Server Error."
 *          }
 *     }
 * })
 * ...
 */
public function getAction(RestRequestInterface $restRequest)
```

The following table describes the annotation keys:

| ANNOTATION | DESCRIPTION | NOTES |
| --- | --- | --- |
| `getResourceById` | When set to `true`, indicates a `GET` endpoint that returns a single resource—for example, _`/wishlists/{ID}. *`_ | The `getResourceById` and `getCollection` annotations are used for `GET` endpoints only. If neither of the notations is present for the `getAction` function or they are both set to false, a `GET` endpoint is generated anyway. However, in such a case, the resource ID is not included in the response. |
| `getCollection` |  When set to `true`, indicates a `GET` endpoint that returns a collection of resources—for example, _`/wishlists.*`_ | The `getResourceById` and `getCollection` annotations are used for `GET` endpoints only. If neither of the notations is present for the `getAction` function or they are both set to false, a `GET` endpoint is generated anyway. However, in such a case, the resource ID is not included in the response. |
| `summary` | Sets a description for the endpoint. Use it to describe, as detailed as possible, what the endpoint is used for, its purpose, and intention. | If a summary is not specified explicitly, it is generated automatically.  |
| `parameters` | Sets optional parameters for the request. | Parameters can be passed in HTTP headers, queries, cookies, or as a part of the resource URI. For more information about parameter use and the available fields, in Swagger official documentation, see [Operation Object](https://swagger.io/specification/#parameterObject). |
| `responses` | Use this parameter to describe all responses that can be generated by this endpoint and their respective response codes.  | The `default` response is included automatically. There is no need to include it here. |
| `responseAttributesClassName` | Sets the FQCN of a custom transfer class that represents the response object. | Use this annotation when a response object is different from the corresponding request object. |
| `isEmptyResponse` | When set to `true`, indicates that the HTTP method does not have a response body. | Do not use this annotation for the `DELETE` method. It has an empty response body by default.	 |

**Example 1: `GET` endpoint that returns a single resource**

```php
/**
 * @Glue({
 *     "getResourceById": {
 *          "summary": [
 *              "My GET Endpoint"
 *          ],
 *          "responses": {
 *              "400": "Bad Response.",
 *              "404": "Item not found.",
 *              "500": "Server Error."
 *          }
 *     }
 * })
 * ...
 */
public function getAction(RestRequestInterface $restRequest): RestResponseInterface
{
    // TODO: your implementation here
}
```

**Example 2: `POST` endpoint with an optional header**

```php
/**
 * @Glue({
 *     "post": {
 *          "summary": [
 *              "My POST Endpoint"
 *          ],
 *          "parameters": [
 *              {
 *                  name: "Accept-Language",
 *                  in: "header",
 *              },
 *          ],
 *          "responses": {
 *              "400": "Bad Response.",
 *              "500": "Server Error."
 *          }
 *     }
 * })
 * ...
 */
public function postAction(RestRequestInterface $restRequest, MyRequestAttributesTransfer $requestAttributesTransfer): RestResponseInterface
{
    // TODO: your implementation here
}
```

## 4. Generate documentation

```bash
vendor/bin/console rest-api:generate:documentation
```

## 5. View results

When the command completes, you can see a specification file generated in the directory with the filename you configure in [step 2. Configuration](/docs/dg/dev/glue-api/{{page.version}}/glue-api-tutorials/implement-a-rest-api-resource.html#create-a-configuration-class).

By default, it is `src/Pyz/Generated/Glue/Specification/spryker_rest_api.schema.yml`. The specification contains all REST API endpoints configured in Glue, on the global and project levels, along with data models for all requests and responses.

To get a visual representation of your API or use it in tools like Postman (with the OpenAPI v.3 support) for development purposes, you can upload the file to [Swagger Editor](https://editor.swagger.io/).
