---
title: DocumentationGeneratorRestApi Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/documentationreneratorrestapi-feature-integration
redirect_from:
  - /v1/docs/documentationreneratorrestapi-feature-integration
  - /v1/docs/en/documentationreneratorrestapi-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

|Name  | Version |
| --- | --- |
|  Spryker Core|2018.12.0  |
|  Glue Application|  2018.12.0|

### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:
`composer require spryker/documentation-generator-rest-api:"^1.2.0" spryker/documentation-generator-rest-api-extension:"^1.0.0" --update-with-dependencies`

{% info_block infoBox "Verification" %}
Make sure that the following modules are installed:
{% endinfo_block %}

|  Module|Expected directory  |
| --- | --- |
|`DocumentationGeneratorRestApi`  | `vendor/spryker/documentation-generator-rest-api` |
|`DocumentationGeneratorRestApiExtension`  | `vendor/spryker/documentation-generator-rest-api-extension` |

### 2) Set up Transfer objects

Run the following command to generate transfer changes:
`console transfer:generate`

{% info_block infoBox "Verification" %}
Make sure that the following changes are present in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `PathMethodDataTransfer` | class | created | `src/Generated/Shared/Transfer/PathMethodDataTransfer` |
| `PathParameterTransfer` | class | created | `src/Generated/Shared/Transfer/PathParameterTransfer` |
| `PathSchemaDataTransfer` | class | created | `src/Generated/Shared/Transfer/PathSchemaDataTransfer` |
| `SchemaDataTransfer` | class | created | `src/Generated/Shared/Transfer/SchemaDataTransfer` |
| `SchemaPropertyTransfer` | class | created | `src/Generated/Shared/Transfer/SchemaPropertyTransfer` |
| `SecuritySchemeTransfer` | class | created | `src/Generated/Shared/Transfer/SecuritySchemeTransfer` |
| `PathMethodComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathMethodComponentTransfer` |
| `PathParameterComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathParameterComponentTransfer` |
| `PathRequestComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathRequestComponentTransfer` |
| `PathRequestComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathRequestComponentTransfer` |
| `PathResponseComponentTransfer` | class | created | `src/Generated/Shared/Transfer/PathResponseComponentTransfer` |
| `SchemaComponentTransfer` | class | created | `src/Generated/Shared/Transfer/SchemaComponentTransfer` |
| `SchemaPropertyComponentTransfer` | class | created | `src/Generated/Shared/Transfer/SchemaPropertyComponentTransfer` |
| `SecuritySchemeComponentTransfer` | class | created | `src/Generated/Shared/Transfer/SecuritySchemeComponentTransfer` |
| `PathAnnotationsTransfer` | class | created | `src/Generated/Shared/Transfer/PathAnnotationsTransfer` |
| `AnnotationTransfer` | class | created | `src/Generated/Shared/Transfer/AnnotationTransfer` |

### 3) Set up behavior
#### Configure REST attributes transfers
**Implementation**
Update all the needed `RestAttributes` transfer objects definitions on the project level to add `restRequestParameter` to the properties that should be included in the request object for the endpoint. For example: 
```xml
<transfer name="RestAccessTokensAttributes">
    <property name="username" type="string" restRequestParameter="required" />
    <property name="password" type="string" restRequestParameter="required" />
    <property name="tokenType" type="string" />
    <property name="expiresIn" type="string" />
    <property name="accessToken" type="string" />
    <property name="refreshToken" type="string" />
</transfer>
```
`restRequestParameter` can accept one of the three values:

* required - property will be marked as required in the request body schema.
* yes - property will be marked as optional in the request body schema.
* no - property will be skipped in the request body schema.

By default, every property is considered as not needed and will be skipped in the schema definition.
Run the following command to generate the transfer changes:
`console transfer:generate`

**Verification**
{% info_block infoBox %}
Make sure that the generated transfers have adefined property in metadata with the correct value, for example:
{% endinfo_block %}
**`src/Generated/Shared/Transfer/RestAccessTokensAttributesTransfer.php`**
```yaml
self::PASSWORD => [
    'type' => 'string',
    'name_underscore' => 'password',
    'is_collection' => false,
    'is_transfer' => false,
    'rest_request_parameter' => 'required',
    'is_nullable' => false,
],
self::TOKEN_TYPE => [
    'type' => 'string',
    'name_underscore' => 'token_type',
    'is_collection' => false,
    'is_transfer' => false,
    'rest_request_parameter' => 'no',
    'is_nullable' => false,
],
```
#### Configure additional specification data for your actions
You may need to add annotations to the endpoint's controller actions to generate more accurate documentation. Annotations are written in the JSON format. For example:
```
/**
 * @Glue({
 *     "getResource": {
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
 *          }
 *     }
 * })
 * ...
 */
public function getAction(RestRequestInterface $restRequest)
```

The annotation object should consist of a top-level object with one property that represents the request method used. It can be one of these:

* getCollection, getResource - for the GET requests
* post, patch, delete - respectively for the POST, PATCH, DELETE requests

Currently supported annotation properties:

* summary - summary of an endpoint. If not specified, summary will be generated from the resource type.
* parameters - parameters that can be passed with the request. (see https://swagger.io/specification/#parameterObject).
* responses - all the possible response codes and their descriptions for a given endpoint.
* responseClass - defines a custom transfer class that represents a response object (in cases when the request and response objects are different); FQCN needed.
* isEmptyResponse - should be set to true when a method does not have a response body (no need to set it in the delete methods as they have an empty response body by default)

#### Enable console command
Activate the following plugin:

|  Plugin| Specification |Prerequisites  |Namespace  |
| --- | --- | --- | --- |
| `GenerateRestApiDocumentationConsole` | Registers the rest-api:generate:documentation console command. | None | `Spryker\Zed\DocumentationGeneratorRestApi\Communication\Console` |

**`src/Pyz/Zed/Console/ConsoleDependencyProvider.php`**
```php
<?php
  
namespace Pyz\Zed\Console;
 
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DocumentationGeneratorRestApi\Communication\Console\GenerateRestApiDocumentationConsole;
  
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new GenerateRestApiDocumentationConsole(),
        ];
  
        return $commands;
    }
}
```

{% info_block infoBox "Verification" %}
To verify that `GenerateRestApiDocumentationConsole` is activated, check whether the `vendor/bin/console rest-api:generate:documentation` console command exists.
{% endinfo_block %}

#### Enable documentation generator
Activate the following plugins:

| Plugin | Specification | Prerequisites |Namespace  |
| --- | --- | --- | --- |
| `ResourceRoutePluginsProviderPlugin` | Registers the enabled ResourceRoute plugins. | None | `Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorRestApi` |
|`ResourceRelationshipCollectionProviderPlugin`|Registers the enabled ResourceRelationship plugin collections.|None|`Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorRestApi`|

**`src/Pyz/Zed/DocumentationGeneratorRestApi/DocumentationGeneratorRestApiDependencyProvider.php`**
```php
<?php
 
namespace Pyz\Zed\DocumentationGeneratorRestApi;
 
use Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorRestApi\ResourceRelationshipCollectionProviderPlugin;
use Spryker\Glue\GlueApplication\Plugin\DocumentationGeneratorRestApi\ResourceRoutePluginsProviderPlugin;
use Spryker\Zed\DocumentationGeneratorRestApi\DocumentationGeneratorRestApiDependencyProvider as SprykerDocumentationGeneratorRestApiDependencyProvider;
 
class DocumentationGeneratorRestApiDependencyProvider extends SprykerDocumentationGeneratorRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\DocumentationGeneratorRestApiExtension\Dependency\Plugin\ResourceRoutePluginsProviderPluginInterface[]
     */
    protected function getResourceRoutePluginProviderPlugins(): array
    {
        return [
            new ResourceRoutePluginsProviderPlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Glue\DocumentationGeneratorRestApiExtension\Dependency\Plugin\ResourceRelationshipCollectionProviderPluginInterface[]
     */
    protected function getResourceRelationshipCollectionProviderPlugins(): array
    {
        return [
            new ResourceRelationshipCollectionProviderPlugin(),
        ];
    }
}
```

_Last review date: Feb 25, 2019_
