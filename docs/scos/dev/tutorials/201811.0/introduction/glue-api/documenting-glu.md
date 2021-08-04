---
title: Documenting GLUE API Resources
originalLink: https://documentation.spryker.com/v1/docs/documenting-glue-api-resources
redirect_from:
  - /v1/docs/documenting-glue-api-resources
  - /v1/docs/en/documenting-glue-api-resources
---

To help developers understand and use the public API of your project, you need to cover it with complete and up-to-date documentation. Spryker Glue provides the possibility to generate it automatically with the help of the **DocumentationGeneratorRestApi** Module. It extracts information on your REST API endpoints directly from their implementation. It also adds the possibility to provide additional information on endpoints, such as their purpose, usage details, request parameters (e.g. in headers, paths, queries, or cookies), etc.

The resulting document is a full description of your REST API following the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) (formerly known as Swagger Document Format). It can be viewed, edited and consumed with the help of such tools as [Swagger Tools](https://swagger.io/), [Postman](https://www.getpostman.com/) etc.

{% info_block warningBox %}
REST API endpoints shipped by Spryker will be covered by documentation by default. A snapshot of the latest state of Spryker REST API can be found in Spryker Documentation. For more information, see [Rest API Reference](/docs/scos/dev/glue-api/201811.0/rest-api-refere
{% endinfo_block %}.)

## Prerequisites
Before you begin, make sure that you have Spryker Glue installed and enabled<!--add a link to https://documentation.spryker.com/feature_integration_guides/glue_api/glue-api-installation-and-configuration.htm -->. Also, consider studying the following documents:

* [Open API Specification](https://github.com/OAI/OpenAPI-Specification)
* [Swagger Tools Reference](https://swagger.io/)

## 1. Installation and Configuration
To be able to generate REST API documentation, first, you need to install the `DocumentationGeneratorRestApi` Module. To do this, run the following command in the console:

```bash
composer require spryker/rest-api-documentation-generator
```

After installation, open the file `src/Pyz/Zed/DocumentationGeneratorRestApi/DocumentationGeneratorRestApiConfig.php` and modify the values of the following variables, if necessary:

|  Variable|Description  |Default Value  |
| --- | --- | --- |
| `GENERATED_FILE_OUTPUT_DIRECTORY` | Sets the directory where the API specification file will be generated. | `APPLICATION_SOURCE_DIR/Generated/Glue/Specification/`</br>By default, the `APPLICATION_SOURCE_DIR` variable is substituted with `src/Pyz`. In other words, the resulting directory will be `src/Pyz/Generated/Glue/Specification/`. |
|`GENERATED_FILE_PREFIX`  | Sets the generated file name. | `spryker_rest_api.schema.yml` |
| `REST_API_DOCUMENTATION_INFO_VERSION` | Sets the API version. For details, see [versions](https://github.com/OAI/OpenAPI-Specification/tree/master/versions). | `1.0.0` |
| `REST_API_DOCUMENTATION_INFO_TITLE` | Sets the name of your API. | `Spryker API` |
| `APPLICATION_PROJECT_ANNOTATION_SOURCE_DIRECTORY_PATTERN` | Specifies a template for paths where to search for REST API controllers on the **project** level. | `/Glue/%1$s/Controller/` |
| `APPLICATION_CORE_ANNOTATION_SOURCE_DIRECTORY_PATTERN` | Specifies a template for paths where to search for REST API controllers on the **vendor** level. | `/*/*/src/*/Glue/%1$s/Controller/` |

For details on REST API controllers, see step [4. Create a Resource Controller](https://documentation.spryker.com/v1/docs/implementing-rest-api-resource#4--create-a-resource-controller) in the **Implementing a REST API Resource** article.

## 2. Test Run
To make sure that the documentation generator is working properly, run the following command in the console:
`vendor/bin/console rest-api:generate:documentation`

When the command completes, you should see a specification file generated in the directory and with the filename as you configured in step **2. Configuration**. By default, it is `src/Pyz/Generated/Glue/Specification/spryker_rest_api.schema.yml`.

## 3. Describe Your REST API
### Requests and Responses

Data models of requests used in your REST API are described with the help of transfer objects. Such objects contain a list of fields for each request or response, their data type, which of the fields are required etc. By default, the fields are not included in the specification automatically. To include them, you need to modify the XML schema definitions of the transfer objects.
The visibility of request and response fields is controlled by XML attribute restRequestParameter. It can have **3** possible values:

* **required** - the field will be included in the documentation and also required for a valid request;
* **yes** - the field will be included in the documentation, but optional;
* **no** - the field will not be included in the documentation.

If the `restRequestParameter` attribute is not present for a field, the default value no is assumed.

A response is generated using all properties of a transfer object. Below, you can see an example definition of a request transfer object:

<details open>
<summary>auth_rest_api.transfer.xml</summary>
    
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
    
</br>
</details>

To apply the changes, run the following console command:

```bash
vendor/bin/console transfer:generate
```

## REST Methods
In addition to requests and responses, you can also supply additional information on your API endpoints. To do so, you need to modify the resource controllers of your REST API modules.

Each controller has `getAction`, `postAction`, `patchAction`, or `deleteAction` functions, each providing functionality for the respective REST verbs (GET, POST, PATCH, DELETE). In the PHP-DOC blocks of such functions, you can use a new type of annotations: `@Glue`. The annotations use JSON-like format as follows:

<details open>
<summary>View sample</summary>
    
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
    
</br>
</details>

The annotation keys are described below:

| Annotation | Description | Notes |
| --- | --- | --- |
| `getResourceById` | When set to **true**, indicates a _GET_ endpoint that returns a single resource, for example: _/wishlists/{ID}. *_ | The `getResourceById` and `getCollection` annotations are used for GET endpoints only. If neither of the notations are present for the getAction function or they are both set to false, a GET endpoint will be generated anyway. However, in such a case, the resource ID will not be included in the response. |
| `getCollection` |  When set to true, indicates a _GET_ endpoint that returns a collection of resources, for example: _/wishlists.*_ | The `getResourceById` and `getCollection` annotations are used for GET endpoints only. If neither of the notations are present for the `getAction` function or they are both set to false, a GET endpoint will be generated anyway. However, in such a case, the resource ID will not be included in the response. |
| `summary` | Sets a description for the endpoint. Use it to describe, in as much details as possible, what the endpoint is used for, its purpose and intention. | If a summary is not specified explicitly, it will be generated automatically.  |
| `parameters` | Sets optional parameters for the request. | Parameters can be passed in HTTP headers, queries, cookies or as a part of the resource URI. For more details on parameter use and the available fields, see [Parameter Object](https://swagger.io/specification/#parameterObject). |
| `responses` |Use this parameter to describe all possible responses that can be generated by this endpoint and their respective response codes.  | The **default** response is included automatically. There is no need to include it here. |
| `responseAttributesClassName` | Sets the FQCN of a custom transfer class that represents the response object. | Use this annotation when a response object is different from the corresponding request object. |
| `isEmptyResponse` | When set to **true**, indicates that the HTTP method does not have a response body. | Do not use this annotation for the DELETE method. It has an empty response body by default.	 |

<details open>
<summary>Example 1: GET endpoint that returns a single resource</summary>
    
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

</br>
</details>

<details open>
<summary>Example 2: POST endpoint with an optional header</summary>
    
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
    
</br>
</details>

## 4. Generate
Run the following command in the console:

```bash
vendor/bin/console rest-api:generate:documentation
```

## Result
When the command completes, you should see a specification file generated in the directory and with the filename as you configured in step **2. Configuration**. By default, it is `src/Pyz/Generated/Glue/Specification/spryker_rest_api.schema.yml`. The specification will contain all REST API endpoints configured in Glue, both on the global and project levels, along with data models for all requests and responses. You can upload the file to [Swagger Editor](https://editor.swagger.io/) to get a visual representation of your API or use it in tools like Postman (with the OpenAPI v3 support) for development purposes.

