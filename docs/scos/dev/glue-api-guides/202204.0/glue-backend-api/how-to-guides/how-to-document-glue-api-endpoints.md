---
title: How to document Glue API endpoints
description: You can enhance the way your resource is described in the OPENAPI v3 schema
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/documenting-glue-api-endpoints.html
---

This document shows how to document Glue API endpoints.

You can enhance the way your resource is described in the [OPENAPI v3 schema](https://swagger.io/docs/specification/basic-structure/). 

To generate the documentation, use the following command:
```bash
vendor/bin/glue api:generate:documentation
```

By default, this command generates the documentation for all the configured applications. 

To select the application, you can pass the optional parameter `application`:
```bash
vendor/bin/glue api:generate:documentation [--application=storefront|backend]
```

You can describe your resources in the Glue doc-comment annotation on the relevant controller actions:

**Controller**

```php
/**
 * @Glue({
 *     "getResourceById": {
 *          "isIdNullable": true,
 *          "summary": [
 *              "Retrieves resource by id."
 *          ],
 *          "parameters": [{
 *              "ref": "acceptLanguage"
 *          }],
 *          "responses": {
 *              "200": "Resource found.",
 *              "422": "Unprocessable entity."
 *          },
 *          "responseAttributesClassName": "Generated\\Shared\\Transfer\\RestResourcesAttributesTransfer",
 *          "path": "/resources/{resourceId}/resource-items/{resourceItemsId}"
 *     },
 *     "getCollection": {
 *         ...
 *     }
 * })
 *
 * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest
 *
 * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
 */
public function getAction(RestRequestInterface $restRequest): RestResponseInterface
{
}

/**
 * @Glue({
 *     "post": {
 *         ...
 *     }
 * })
 *
 * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest
 *
 * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
 */

```

Glue annotation must be in a valid JSON format.

You can define a Glue annotation on each action in the controller. You can define two annotations on the `get` action so they have separate descriptions for getting collections and for getting resources by ID actions. Possible top-level keys are: `getResourceById`, `getCollection`, `post`, `patch`, and `delete`.

`isIdNullable` is false by default but can be defined as true for the cases like `/catalog-search` or `/url-resolver`.

Always describe all the possible error statuses that your resource can return in `responses`. If the status is used for several errors, you can use the most generic description for all of them—for example, `"422": "Unprocessable entity."`.

To describe request body structure in the schema, you can use additional transfer properties attributes:

**resources_rest_api.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="ApiResourcesAttributes">
        <property name="sku" type="string" restRequestParameter="required"/>
        <property name="quantity" type="int" restRequestParameter="required"/>
        <property name="productOptions" type="string[]" restRequestParameter="yes"/>
        <property name="createdAt" type="string"/>
    </transfer>
```

{% info_block infoBox %}

In the preceding example, `sku` and `quantity` are added to the request schema as required, `productOptions` are added as optional, and `createdAt` skipped. For the request schema to be generated, there must be at least one attribute on the transfer with not empty `restRequestParameter`.

{% endinfo_block %}

When creating a resource available as a relationship only and without its own resource route, you need to describe the structure of your resource attributes in a Glue annotation on `ResourceRelationshipPlugin`:

**PaymentMethodsByCheckoutDataResourceRelationshipPlugin**

```php
/**
 * @Glue({
 *     "resourceAttributesClassName": "\\Generated\\Shared\\Transfer\\RestPaymentMethodsAttributesTransfer"
 * })
 *
 * @method \Spryker\Glue\PaymentsRestApi\PaymentsRestApiFactory getFactory()
 */
class PaymentMethodsByCheckoutDataResourceRelationshipPlugin extends AbstractPlugin implements ResourceRelationshipPluginInterface
{
```

{% info_block infoBox %}

Always check the schema your resources are described with before releasing your resource.

{% endinfo_block %}

The following table lists descriptions of the properties you can use in the annotations:

| PROPERTY | DESCRIPTION |
| --- | --- |
| `deprecated` | Path is marked deprecated. |
| `responseAttributesClassName` | Transfer is used as a representation of the response attributes. |
| `isIdNullable` | JSON:API response `id` is null. |
| `path` | Resource is available on the path. This property can be used if the *type+id* is not the path the resource uses. |
| `summary` | Path's summary that briefly describes what the endpoint does. |
| `parameters` | List of parameters the endpoint accepts. |
| `isEmptyResponse` | Fag used to mark endpoint that return empty responses. |
| `responses` | List possible responses of endpoint. The object must contain key-value pairs with HTTP codes as key, and description as value. |

### Extending the behavior

The following interfaces can be used to add more data to the generated documentation.

* The `Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\PluginApiApplicationProviderPluginInterface` interface: Adds a new application for which documentation will get generated.
* The `Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\ContextExpanderPluginInterface` interface: Adds information to the documentation generation context.
* The `Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\SchemaFormatterPluginInterface` interface: Formats the part of the documentation and must return an array of data ready for getting converted to YAML.
