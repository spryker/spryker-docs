---
title: Sync API
Descriptions: You can use the Sync API's OpenAPI schema to generate code with the code generator and control the generated code by adjusting parts of the schema file.
template: howto-guide-template
last_updated: Sep 13, 2023
redirect_from:
- /docs/acp/user/sync-api.html
---

[Sync API](https://github.com/spryker-sdk/sync-api/) is the synchronous API that Spryker supports. In the Spryker terminology, it's also known as [Glue API](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/glue-rest-api.html) with its [REST API B2C Demo Shop](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/rest-api-marketplace-b2c-demo-shop-reference.html) and [REST API B2B Demo Shop](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/rest-api-b2b-demo-shop-reference.html) endpoints. The schema files we use follow the [OpenAPI specification](https://swagger.io/specification/).
Spryker uses schema files to generate code for your project, including predefined test cases. The purpose of doing so is to let you focus on building your business logic without caring about the boilerplate code.

## Code generation

You can use the Sync API’s OpenAPI schema file to generate code with the help of [Spryks](/docs/dg/dev/sdks/sdk/spryks/spryks.html).
You can control the code generator with the following parts of the schema file:
- Paths
- Extension
- Application type
- Components

{% info_block infoBox "Info" %}

All the required infrastructural code is generated automatically. For example, Facade, Factory, DependencyProvider, Plugins, Controller, etc.

{% endinfo_block %}


### Paths

When you design your resource names, keep in mind that the code generator, by default, uses the path to define the following:
- module the endpoint belongs to,
- controller name that will handle the request,
- model name that will be used to fulfill your business logic.

For example, `/customers/addresses` generates code within the CustomersBackendApi or CustomersFrontendApi module (see [Application type](#application-type)). The controller name that will be executed to handle the request will be `AddressesController` and the model name will be `Addresses`.

### Extension

Inside your path definition, you can manipulate the generated code. For example:

```xml
paths:
    /customers/addresses:
        post:
            x-spryker:
                module: Users # Changes the module name
                controller: UserAddresses # Changes the controller and the model name
```
This tells the code generator to add the code to the UsersBackendApi module. The controller name will be `UserAddressesController` and the model name will be `UserAddresses`.

The `x-spryker` extension gives you control over the generated code.

### Application type

Spryker offers two types of API Applications: a frontend API and a backend API. The application type you build depends on your specific needs. The default one is backend. You can define the application type with the console command that builds the code from a given schema file.

### Components
Within the *Components* section, you describe the data contract for your API endpoints. You always need to define three schemas for one endpoint. Here is an example of a response your API returns:

```xml
paths:
    /customers/addresses:
        post:
            ...
            responses:
                200:
                    description: 'Expected response to a valid request.'
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/FooBarApiResponse'
components:
    schemas:
        FooBarApiResponse:
            properties:
                data:
                    $ref: '#/components/schemas/FooBarApiResponseData'
        FooBarApiResponseData:
            properties:
                type:
                    type: 'string'
                attributes:
                    $ref: '#/components/schemas/FooBarApiResponseAttributes'
        FooBarApiResponseAttributes:
            properties:
                name:
                    type: string
```
This returns the following JSON structure:

```yml
{
  "data": {
    "type": "string",
    "attributes": {
      "name": "string"
    }
  }
}
```
For all three components, the code generator creates a transfer schema file definition within the module that was defined in the [path](#paths) section.

## Troubleshooting

### when
There is the following error: `Failed to resolve Reference '#/paths/my/app/path/...`. Example output:

```php
php vendor/bin/syncapi code:openapi:generate -f config/app/bazaarvoice/api/openapi/bazaarvoice.yml

In Reference.php line 255:

  Failed to resolve Reference '#/paths/bazaar-voice/configure/post' to cebe\openapi\spec\Operation Object: Failed to evaluate pointer '/paths/bazaar-voice/configure/post'. Array has no member bazaar-voice at path '/paths'.  


In JsonPointer.php line 123:

  Failed to evaluate pointer '/paths/bazaar-voice/configure/post'. Array has no member bazaar-voice at path '/paths'.  


code:openapi:generate [-f|--openapi-file OPENAPI-FILE] [-t|--application-type APPLICATION-TYPE] [-o|--organization ORGANIZATION]
```

### then
This is typically caused by forward slashes (`/`) or tilde (`~`) characters that are not properly escaped in the referenced path.
If you wish to refer to the path `/blogs/{blog_id}/new~posts`, your reference must look like this:

```php
$ref: '#/paths/~1blogs~1{blog_id}~1new~0posts'
```

See [Using $ref](https://swagger.io/docs/specification/using-ref/) in the Swagger documentation for more information about escaping these characters.

{% info_block warningBox "Warning" %}

Pay attention to where reference objects are allowed in the OpenAPI schema, as they are only allowed in certain places. Refer to the [OpenAPI specification](https://spec.openapis.org/oas/v3.1.0) to verify if a reference object is placed in a valid location.

{% endinfo_block %}
