---
title: Glue Infrastructure
originalLink: https://documentation.spryker.com/2021080/docs/glue-infrastructure
redirect_from:
  - /2021080/docs/glue-infrastructure
  - /2021080/docs/en/glue-infrastructure
---

Spryker API infrastructure is implemented as a separate layer of Spryker Commerce OS, called Glue. It is responsible for providing API endpoints, processing requests, as well as for communication with other layers of the OS in order to retrieve the necessary information. The layer is implemented as a separate Spryker application, the same as Yves or Zed. It has its own bootstrapping and a separate virtual host on the Spryker web server (Nginx by default). In addition to that, Glue has a separate programming namespace within Spryker Commerce OS, also called Glue.

{% info_block infoBox %}
**Before You Begin**<br>Consider studying the following documents before you begin:<ul><li>[JSON API Specification](https://jsonapi.org/format/
{% endinfo_block %} implemented in Spryker</li><li>[Swagger Tools Reference](https://swagger.io/) to know how to document your API</li><li>[REST API Modelling Reference](https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling)</li></ul>)

Logically, the Glue layer can be divided into 3 parts:

* **GlueApplication Module**
    The `GlueApplication` module provides a framework for constructing API resources. It intercepts all HTTP requests at resource URLs (e.g. `http://mysprykershop.com/resource/1`), handles call semantics, verifies requests, and also provides several utility interfaces that can be used to construct API responses.

* **Resource Modules** 
    Each `Resource` module implements a separate resource or a set of resources. Such a module handles requests to a particular resource and provides them with responses. In the process of doing so, the module can communicate with the Storage, Search or Spryker Commerce OS (Zed). The modules do not handle request semantics or rules. Their only task is to provide the necessary data in a format that can be converted by the `GlueApplication` module into an API response.

* **Relationship Modules** 
    Such modules represent relationships between two different resources. Their task is to extend the response of one of the resources with data of related resources.
    
To be able to process API requests correctly, Resource Modules need to implement resource route plugins that facilitate routing of requests to the module. Such plugins need to be registered in the `GlueApplication` module.

## Request Handling
Upon receiving an API request, the `GlueApplication` Module verifies whether the request is correct, checks whether all required parameters are present, and also identifies the HTTP verb and additional filters, if any. Then, deserializes request data and builds an **API Request Object** which is passed to the corresponding `Resource` Module. The object supports `Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface`.
![Glue Application Module](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Glue+Infrastructure/glue-application-module.png){height="" width=""}

Upon receiving a request object, the `Resource` module needs to provide it with a valid response. Responses are provided as **API Response Objects**. To build them, `Resource` modules use the `RestApi\Spryker\Glue\Kernel\AbstractFactory::getResourceBuilder()` method which returns the `RestResourceBuilderInterface` objects. The `GlueApplication` Module serializes such objects into the response format and then passes them to the requestor.

![Glue Application Module](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Glue+Infrastructure/communication.png){height="" width=""}

A `Resource` Module can communicate with the Storage, Search and Spryker Commerce OS (Zed) using a Client only.

### Resource Routing
Every request needs to be routed to the corresponding `Resource` module responsible for handling it. For this purpose, each module implements a `Route` plugin. Such a plugin matches every supported HTTP verb to a respective action in a controller of the `Resource` module. This should be done for each endpoint. When routing a request, Glue will call the necessary action based on the endpoint and verb used.

{% info_block infoBox %}
The plugin should not map the _OPTIONS_ verb which is mapped automatically.
{% endinfo_block %}

The plugin must provide routing information for the following:


| header | header |
| --- | --- |
| Resource Type | Type of the resource implemented by the current `Resource` module.  Resource types are extracted by Glue from the request URL. For example, if the URL is `/carts/1`, the resource type is `carts`. To be able to process calls to this URL, Glue will need a route plugin for the resource type _carts_. |
| Controller Name | Name of the controller that handles a specific resource type. |
| Mapping of Verbs to Actions | List of REST verbs that the resource supports and the respective controller actions used to handle them. Allowed verbs are GET, POST, PATCH, and DELETE. The OPTIONS verb is supported by all resources and should not be mapped. |
| Resource Attributes <br>Transfer Class Name | FQCN of the Resource Attributes Transfer that is used to handle request attributes for the given resource type. |
| Parent Resource Type | In parent-nested resource relationships, the plugin of the child resource must specify the type of the parent resource. This information is optional and should be provided only by a resource that is nested within another resource. |

Each route plugin implements `ResourceRoutePluginInterface`, which provides a set of utility functions that can be used to configure resource routing:

|Function  |  Description|  Return type|  Example|
| --- | --- | --- | --- |
| `getResourceType` | 	Gets the resource type. | string | _carts_ |
| `configure` | Configures a mapping of the HTTP verbs supported by the resource to the corresponding controller methods responsible for handling them. Also, it defines which of the verbs require authentication to use. | `ResourceRouteCollectionInterface` |  |
| `getController` | Gets the name of the resource controller responsible for handling requests to the resource. The name must be provided in _kebab-case_, hyphen-separated | string | If the controller name is _CartsResourceController.php_, this function should return _carts-resource_. |
| `getResourceAttributesClassName` | Gets the FQCN of the Resource Attributes Transfer that is used to handle request attributes for the given resource type. | string | See details in [5. Describe Fields for Post and Patch Calls](https://documentation.spryker.com/v4/docs/implementing-rest-api-resource#5--describe-fields-for-post-and-patch-calls). |

For more details on how to implement a route plugin, see [6. Route Requests to Your Controller](https://documentation.spryker.com/v4/docs/implementing-rest-api-resource#6--route-requests-to-your-controller).

All route plugins need to be added to `GlueApplicationDependencyProvider` implemented in the `GlueApplication` Module on the Project Level:

`GlueApplicationDependencyProvider.php`
```php
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
	{
		/**
		* @return \Spryker\Glue\GlueApplication\Dependency\Plugin\ResourceRoutePluginInterface[]
		*/
		protected function getResourceRoutePlugins(): array
		{
			return [
				new CartsResourceRoutePlugin(),
				new CartItemsResourceRoutePlugin(),
				new WishlistsResourceRoutePlugin(),
				...
			];
		}
```

### Resource Modules
A _Resource Module_ is a module that implements a single resource or a set of resources. It is responsible for accepting a request in the form of _Request Objects_ and providing responses in the form of _Response Objects_. For this purpose, the module can communicate with the Storage or Search, for which purpose it implements a [Client](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/yves/client/client). It can also communicate with the Spryker Commerce OS (Zed), however, it is recommended to avoid round trips to the database as much as possible as that can reduce API performance considerably.

Resource Modules must implement all logic related to processing a request. It is not recommended having any of the Business Logic, or a part of it, in the _GlueApplication Module_. In case you need to extend any of the built-in Glue functionality, it is always safer to extend the relevant _Resource Module_ than infrastructure.

#### Module Structure
By default, all Resource Modules are located in `vendor/spryker/resources-rest-api` at the core level. At the project level, you can place your Resource Module implementations in `src/Pyz/Glue/ResourcesRestApi`. The naming convention for such modules is _**Resources**RestApi_, where **Resources** is a name of the feature that the module implements.

Recommended module structure:

| ResourcesRestApi |  |
| --- | --- |
| `Glue/ResourcesRestApi/Controller` | <p>Folder for resource controllers. Controllers are used to handle API requests and responses. Typically, includes the following:</p><br>
<ul><li>`FeatureResourcesController.php` - contains methods for handling HTTP verbs.</li></ul> |
| `Glue/ResourcesRestApi/Dependency` | Bridges to clients from other modules. |
| `Glue/ResourcesRestApi/Plugin` | <p>Resource plugins. Typically, includes the following:</p><br><ul><li>`FeatureResourceRelationshipPlugin.php` - provides relationships to other modules;</li><li>`FeatureResourceRouterPlugin.php` - contains resource routing configuration.</li></ul> |
| `Glue/ResourcesRestApi/Processor` | <p>Folder where all resource processing logic, data mapping code and calls to other clients are located. Typically, it includes the following:</p><br><ul><li>`FeatureReader.php` - fetches data and combines from other facades to create an API response;</li><li>`FeatureWriter.php` - creates, updates and deletes resource functionality;</li><li>   FeatureMapper.php    - maps internal transfer objects to API transfers.</li></ul> |
| `Glue/ResourcesRestApi/ResourcesRestApiConfig.php` | Contains resource-related configuration, such as a resource type, error code constants etc. |
| `Glue/ResourcesRestApi/ResourcesRestApiDependencyProvider.php` | Provides external dependencies. |
| `Glue/ResourcesRestApi/ResourcesRestApiFactory.php` | Factory that creates business models. |
| `Glue/ResourcesRestApi/ResourcesRestApiResource.php` | Locatable class that provides resource objects to other modules. |

Also, a module should contain the transfer definition in `src/Pyz/Shared/ResourcesRestApi/Transfer`:

| ResourcesRestApi |  |
| --- | --- |
| `resources_rest_api.transfer.xml` | Contains API transfer definintions. |

The resulting folder structure on the example of the WishlistsRestApi Module looks as follows:

![Wishlists REST API](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Glue+Infrastructure/wishlists-rest-api.png){height="" width=""}

#### Resource Controller
This controller provides actions for all HTTP verbs that a resource implements. It is responsible for:

* handling requests for a specific resource;
* validating data;
* executing business flow logic;
* returning responses or error messages.

All operations must be delegated to the corresponding layers, the controller is responsible only for controlling the workflow.

#### Abstract API Controller
Each resource controller must extend `\Spryker\Glue\Kernel\Controller\AbstractController`. This controller class resolves the module factory.

#### Generic Rest Request
After deserializing a request, Glue passes it to _Resource Modules_ as an internal API request representation object. It stores all information that relates to the request. The object is passed directly to the resource controller class and supports `Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface`.

The interface provides the following helper methods:

| Method | Signature | Description | Notes |
| --- | --- | --- | --- |
| `getResource` | `getResource(): RestResourceInterface` | Returns resource objects that represent resources for the current request. |  |
| `getParentResources` | `getParentResources(): array` | Returns an array of parent resources of the current resource. Each parent resource is represented by `\Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface`. |  |
| `findParentResourceByType` | `findParentResourceByType(string $type): ?RestResourceInterface` | Finds a parent resource by the specified resource type. | The `$type` parameter specifies the type of the parent resource to return. If there are no parents of the given type, the method returns `null`. |
| `getFilters` | `getFilters(): array` | Returns filters for data filtering. Each filter is represented by `\Spryker\Glue\GlueApplication\Rest\Request\Data\FilterInterface`. | If a request was passed with filter parameters, they are passed as filters. Resource Modules need to handle filters correctly to return only the information that is requested. |
| `getSort` | `getSort(): array` | Returns sorting options. Each option is represented by `\Spryker\Glue\GlueApplication\Rest\Request\Data\SortInterface`. |  |
| `getPage` | `getPage(): ?PageInterface` | Returns pagination options. | If there were no pagination options specified at the time of the query, the method returns `null`. |
| `getFields` | `getFields(): array` | Returns sparse fields that can be used to filter out certain parts of the relationships tree from a response. Each field is represented by `\Spryker\Glue\GlueApplication\Rest\Request\Data\SparseFieldInterface`. |  |
| `getMetadata` | `getMetadata(): MetadataInterface` | Gets additional metadata about the request such as resource version, method, locale etc. |  |
| `getInclude` | `getInclude(): array` | Gets an array of `include` options for the request. |  |
| `getUser` | `getUser(): ?UserInterface` | Get the user associated with the request. | 

#### Generic Rest Response

Controllers of each module must return their responses to Glue as instances of the `\Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface` objects with all data set.

The interface provides the following helper methods:

| Method | Signature | Description | Notes |
| --- | --- | --- | --- |
| `addResource` | `addResource(RestResourceInterface $restResource): self` | Adds a resource to the response object. | The `$restResource` parameter specifies an instance of the `RestResourceInterface` interface that represents the resource to add. |
| `addError` | `addError(RestErrorMessageTransfer $error): self` | Adds a business logic error to the response. | A business logic error is any error that occurred during request procession but does not relate to the REST request format. For example, such an error can occur when a resource with the specified ID is not found or when an attempt is made to assign a value that is not allowed by database or other restrictions. The `$error` parameter specifies an instance of the `RestErrorMessageTransfer` interface that contains information about the error (HTTP status, error code and error message). |
| `addLink` | `addLink(string $name, string $uri): self` | Adds a link to the response. | The parameters are as follows:<br><ul><li>`$name` - specifies a link name. Possible values: _first, last, next, prev, related, self, href, meta_.</li><li>`$uri` - specifies a link URL without the domain part.</li></ul>For example, if you specify first for `$name` and `/catalog-search?q=canon&include=&page[offset]=0&page[limit]=12` for URL, the link will look as follows in the response: <code><br>{<br>"data": {...},<br>"links": {<br>...<br>"first": "http://mysprykershop.com/catalog-search?q=canon&amp;include=&amp;page[offset]=0&amp;page[limit]=12",<br>...<br>}<br>}</code> |
| `setStatus` | `setStatus(int $status): self` |  Sets the HTTP status of the response (for example, **200 OK**).| The `status`parameter specifies the HTTP status code. |
| `addHeader` | `addHeader(string $key, string $value): self` | Adds an HTTP header to the response. | The `$key` parameter specifies the header type, and the $value parameter specifies the header value. |

#### RestResourceInterface
`Spryker\Glue\GlueApplication\Rest\JsonApi\RestResource` is a class that represents REST resources. It implements `Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceInterface` that provides the following methods:

| Method | Signature | Description | Notes |
| --- | --- | --- | --- |
| `addRelationship` | `addRelationship(RestResourceInterface $restResource): self` | Adds another resource related to the given resource.   | The `$restResource` parameter specifies an instance of the `RestResourceInterface  interface that represents the related resource to add. |
| `addLink` | `addLink(string $name, string $resourceUri, array $meta = []): self` | Adds a link to the resource. | The parameters are as follows:<ul><li>`$name` - specifies a link name. Possible values: first, last, next, prev, related, self, href, meta.</li><li>`$uri` - specifies a link URL without the domain part.</li><li>`$meta` - an array of meta information to add to the resource. Each object in the array must be represented by MetadataInterface.</li></ul> |

#### RestErrorMessageTransfer

Business errors are returned as the `RestErrorMessageTransfer` objects with the following structure:

| Field |Used for  |
| --- | --- |
| code |High-level business error code, for example, business rule validation error.  |
|detail  | Human-readable error message. |
|  status| HTTP response status code. |

### Nested Resources

Glue API allows creating resources with parent-child relationships or, in other words, nested resources. For example, a request to `/customers/1/addresses` returns addresses for a customer with ID 1. To enable such behavior, it is necessary to define how resources depend on each other. This is done by configuring resource route plugins. When processing an URL, the _GlueApplication Module_ tries to find a correct route to a child resource. For this reason, all modules in the nesting chain should be arranged in a sequence using **ResourceWithParentPluginInterface**. Then, while handling a request to a child resource, business logic can access the parent resource identifier and process the request in the correct context.

#### ResourceWithParentPluginInterface
If you are implementing a resource that has a parent, you need to create a plugin that implements `Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceWithParentPluginInterface`. Such a plugin will route requests from the parent resources to the correct child resource. This interface must be implemented together with **ResourceRoutePluginInterface**.

The interface provides only 1 method: `getParentResourceType`. The method must return the type of the immediate parent resource within the context of which the child resource is implemented.

### Resource Relationships
Often, to query certain data, one needs to use endpoints from different APIs to get the necessary information. For example, to present products in a customer's wishlist, one would need to use endpoints of the [Wishlists API](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-wishli) to get a list of items in the wishlist, and then query endpoints of the [Products API](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-products/retrieving-prod) in order to get descriptions, images and other information on each product. This can result in a big number of requests until the necessary data is fetched. To reduce the number of calls and provide all the necessary information in one pass, you can use resource relationships.

Let us consider the following REST Response example. It contains information on a wishlist item without any resource relationships.

**Request:**

*GET http://glue.mysprykershop.com/wishlists/cbf84323-e54d-5774-8c02-4c90e107afe6*

```js
	{
    "data": {
        "type": "wishlists",
        "id": "cbf84323-e54d-5774-8c02-4c90e107afe6",
        "attributes": {
            "name": "My wishlist",
            "numberOfItems": 1,
            "createdAt": "2019-06-25 11:42:51.813126",
            "updatedAt": "2019-07-05 13:13:52.811524"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/wishlists/cbf84323-e54d-5774-8c02-4c90e107afe6"
        }
    }
}
```

As you can see, it contains only the ID of the wishlist item resource which represents the SKU of the product added. It is impossible to indicate the product name, description etc. 
If we add relationships to the `wishlist-items` and `concrete-products` resources, the same request will return more information. In fact, now, a single request is sufficient to get information on products in a wishlist:

**Request:**

*GET http://glue.mysprykershop.com/wishlists/cbf84323-e54d-5774-8c02-4c90e107afe6?include=wishlist-items,concrete-products*

<details open>
<summary>Code sample:</summary>
    
```js
{
    "data": {
        "type": "wishlists",
        "id": "cbf84323-e54d-5774-8c02-4c90e107afe6",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "021_21081475"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "021_21081475",
            "attributes": {
                "sku": "021_21081475",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "name": "Sony Cyber-shot DSC-W830",
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
                "attributes": {
                    "hdmi": "no",
                    "sensor_type": "CCD",
                    "display": "TFT",
                    "usb_version": "2",
                    "brand": "Sony",
                    "color": "Purple"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony Cyber-shot DSC-W830",
                "metaKeywords": "Sony,Entertainment Electronics",
                "metaDescription": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing i",
                "attributeNames": {
                    "hdmi": "HDMI",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "usb_version": "USB version",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/021_21081475"
            }
        },
        {
            "type": "wishlist-items",
            "id": "021_21081475",
            "attributes": {
                "sku": "021_21081475"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/wishlist-items/021_21081475"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "021_21081475"
                        }
                    ]
                }
            }
        }
    ]
}
```

</br>
</details>
    
#### Possible Implementations
To add relationships between two resources, you can either implement the Resource Relationship Module that implements a resource relationship plugin, or just the plugin within the related resource. The plugin will add the related resource as a relationship to the resource being queried.

*Option 1: With a separate module*

![implementation-wiht-separate-module.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Glue+Infrastructure/implementation-wiht-separate-module.png){height="" width=""}

_Option 2: Without module_

![implementation-without-module.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Glue+Infrastructure/implementation-without-module.png){height="" width=""}

Implementation without a separate module can be used when the resource being queried contains a unique identifier to directly map the related resource. In the example of wishlist items and products, each item contains the SKU of the product it relates to. Thus, relationships between these resources can be implemented without a relationship module, using product SKU as a unique identifier.

In cases when certain business logic is required to determine relationships between two resources, implementation of a relationship module is recommended. For example, if you need to apply some business logic to select products related to a wishlist item, such logic should be implemented within a separate relationship module.

#### Relationship Plugin
The plugin must implement the following interface: `\Spryker\Glue\GlueApplication\Dependency\Plugin\ResourceRelationshipPluginInterface`. The interface exposes the `addResourceRelationships` method that allows you to implement relationships between modules. The first parameter passed to the method contains an array of resources to which resources must be added, and the second parameter contains the current REST request as **RestRequestInterface**. The interface also provides the `getRelationshipResourceType` method that allows you to set a relationship name. This name will be used when including related resource data in responses.

### Resource Versioning
As your product grows, you may feel the necessity to change your API. Sometimes, BC breaking changes might be needed to incorporate the required modifications. However, older API clients may rely on old data contracts. If you want to provide backward compatibility, you may want to introduce a versioning system in your API. When versioning is implemented, clients can request the exact resource version they were designed for. Thus, every resource version represents a data contract for a resource at a given point of time.

As REST does not implement a strict versioning concept, by default, all Spryker resources are unversioned. Also, all resources and endpoints shipped with Spryker by default will remain unversioned in the future regardless of the version of the module that provides them. This is done so that Resource modules can be merged with any existing projects without breaking the functionality of resources built on top of default Spryker resources.

If you want to introduce versioning in your project, in the route plugin of your module, you need to implement `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceVersionableInterface`. This interface exposes the `getVersion()` method, using which you can specify which version of the resource is supported by the current route plugin. In other words, you need to implement a plugin for each resource version.

When versioning is in place, clients can pass the version they require in the request header: `application/vnd.api+json; version=2.1`. The Glue will respond to clients as follows:

* If no version is specified in the header, the newest version is returned.
* If a version is specified and it exists on the server, that specific version is returned.
* If a version is specified, but it does not exist, the **404 Not Found** error is returned.

### Response Codes
#### HTTP Status Codes
Below is a list of common HTTP statuses returned by Glue endpoints.

#### GET

| Code | Condition |
| --- | --- |
| 200 | An entity or entities corresponding to the requested resource is/are sent in the response |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

#### POST
| Code | Condition |
| --- | --- |
| 201 | Resource created successfully |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

#### PATCH
| Code | Condition |
| --- | --- |
| 200 | Resource updated successfully |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

#### DELETE
| Code | Condition |
| --- | --- |
| 204 | No content (deleted successfully) |
| 400| Bad request |
| 401| Unauthenticated |
| 403 |  Unauthorized|
|404  | Resource not found |

#### Error Codes
In addition to HTTP Status codes, Glue can return additional error codes to distinguish business constraint violations. Each API is assigned a specific error code range. Listed below are code ranges for APIs shipped by Spryker. For specific error codes, see API user documentation for the specific APIs.


| Range | API |
| --- | --- |
| 001-099 | General error codes |
| 101-199 |Carts API  |
| 201-299 | Wishlists API |
| 301-399 | Products API |
| 401-499 | Customers API |
| 501-599 | Catalog Search API |
| 601-699 | Stores API |
| 701-799 |Categories API  |
|  1001-1099    | Guest Cart API |
| 1101-1199 |  Checkout API|
|  1201-1299| Product Labels API     |

### Data Formatting
The current version uses JSON for responses. The request header from the client indicates the desired response format.

#### Dates
For date formatting, [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) date/time format is used. For requests, any time zone is accepted, however, dates are stored and returned in UTC.

Example:

* request: 1985-07-01T01:22:11+02:00
* in storage and responses: 1985-06-31T11:22:11+00:00

#### Prices
Prices are always returned both in cents and as an integer.

### Request Header

| Header | Sample value | Used for | When not present|
| --- | --- | --- | --- |
| Accept | application/vnd.api+json |Indicates the data format of the expected API response.  | 406 Not acceptable |
| Content-Type | application/vnd.api+json; version=1.1 | 	Indicates the request content-type and resource version. | 415 Unsupported |
| Accept-Language | de;, en;q=0.5 | Indicates the desired language in which the content should be returned. |  |

### Response Header
  | Header | Sample value | Used for |
| --- | --- | --- |
| Content-Type |application/vnd.api+json; version=1.1 |Response format and resource version.  | 
|Content-Language|de_DE|Indicates the language in which the content is returned.|

### Response Structure
The response structure follows the [JSON API](https://jsonapi.org/format/#document-structure) specification. For examples of responses of each endpoint provided by Spryker, see the API user guides for the respective APIs.

