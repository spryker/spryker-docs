You can enhance the way your resource is described in the [OPENAPI v3 schema](https://swagger.io/docs/specification/basic-structure/). Use `vendor/bin/glue api:generate:documentation` console command to generate the doc. By default, the command will be generating the documentation for all the configured applications. There is an optional `application` parameter you can pass to select the application.

```
vendor/bin/glue api:generate:documentation [--application=storefront|backend]
```

You can describe your resources in the Glue doc-comment annotation on the relevant Controller actions.

|     |
| --- |
| **in** `Controller` |
| ```<br>/**<br> * @Glue({<br> *     "getResourceById": {<br> *          "isIdNullable": true,<br> *          "summary": [<br> *              "Retrieves resource by id."<br> *          ],<br> *          "parameters": [{<br> *              "ref": "acceptLanguage"<br> *          }],<br> *          "responses": {<br> *              "200": "Resource found.",<br> *              "422": "Unprocessable entity."<br> *          },<br> *          "responseAttributesClassName": "Generated\\Shared\\Transfer\\RestResourcesAttributesTransfer",<br> *          "path": "/resources/{resourceId}/resource-items/{resourceItemsId}"<br> *     },<br> *     "getCollection": {<br> *         ...<br> *     }<br> * })<br> *<br> * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest<br> *<br> * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface<br> */<br>public function getAction(RestRequestInterface $restRequest): RestResponseInterface<br>{<br>}<br><br>/**<br> * @Glue({<br> *     "post": {<br> *         ...<br> *     }<br> * })<br> *<br> * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest<br> *<br> * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface<br> */<br>``` |

Glue annotation has to contain valid JSON.

Glue annotation can be defined on each action in the controller, two can be defined on the get action (for having separate descriptions for getting collections and getting resources by id actions). Possible top level keys are: `getResourceById`, `getCollection`, `post`, `patch`, `delete`.

`isIdNullable` will be false by default but can be defined as true for the cases like `/catalog-search` or `/url-resolver`.

Always describe all the possible error statuses your resource can return in `responses`. If the status is used for several errors, you can use the most generic description for all of them (`"422": "Unprocessable entity."`).

For describing request body structure in the schema, you can use additional transfer properties attributes:

|     |
| --- |
| **in** `resources_rest_api.transfer.xml` |
| ```<br><?xml version="1.0"?><br><transfers xmlns="spryker:transfer-01"<br>           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"<br>           xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd"><br><br>    <transfer name="ApiResourcesAttributes"><br>        <property name="sku" type="string" restRequestParameter="required"/><br>        <property name="quantity" type="int" restRequestParameter="required"/><br>        <property name="productOptions" type="string[]" restRequestParameter="yes"/><br>        <property name="createdAt" type="string"/><br>    </transfer><br><br>``` |

In the example above the `sku` and `quantity` will be added to the request schema as required, `productOptions` will be added as optional and `createdAt` will be skipped. There needs to be at least one attribute on the transfer with the not empty `restRequestParameter` for the request schema to be even generated, so always pay attention to this.

When creating a resource that will be available as a relationship only (and has no resource route of its own), you need to describe the structure of your resource attributes in a Glue annotation on the `ResourceRelationshipPlugin`:

|     |
| --- |
| **in** `PaymentMethodsByCheckoutDataResourceRelationshipPlugin` |
| ```<br>/**<br> * @Glue({<br> *     "resourceAttributesClassName": "\\Generated\\Shared\\Transfer\\RestPaymentMethodsAttributesTransfer"<br> * })<br> *<br> * @method \Spryker\Glue\PaymentsRestApi\PaymentsRestApiFactory getFactory()<br> */<br>class PaymentMethodsByCheckoutDataResourceRelationshipPlugin extends AbstractPlugin implements ResourceRelationshipPluginInterface<br>{<br>``` |

Always check the schema your resources are described with before releasing your resource.

Below you’ll find the description of the properties you can use in the annotations:

|     |     |
| --- | --- |
|     |     |
| `deprecated` | The path will be marked deprecated. |
| `responseAttributesClassName` | The transfer will be used as a representation of the response attributes. |
| `isIdNullable` | The (JSON:API) response `id` will be null. |
| `path` | The resource is available on the path. This property can be used if the type+id is not the path the resource uses. |
| `summary` | Path’s summary. Text should briefly describe what the endpoint is doing. |
| `parameters` | The list of parameters the endpoint is accepting. |
| `isEmptyResponse` | A flag is to be used to mark endpoint that return empty responses. |
| `responses` | A list responses the endpointcan respond with. The object must contain key-value pairs with HTTP codes as key, and desciption as value. |

### Extending the behavior

The following interfaces can be used to add more data to the generated documentation.

1.  `Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\PluginApiApplicationProviderPluginInterface` - adds a new application to which the documentation will get generated.
    
2.  `Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\ContextExpanderPluginInterface` - adds information to the documentation generation context.
    
3.  `Spryker\Glue\DocumentationGeneratorApiExtension\Dependency\Plugin\SchemaFormatterPluginInterface` - formats the part of the documentation, and must return an array of data ready for getting converted to YAML.