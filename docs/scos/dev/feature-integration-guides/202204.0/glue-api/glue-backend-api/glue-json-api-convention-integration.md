This document describes how to integrate the Glue JSON API convention for Storefront API application into a Spryker project.

## Install feature core

Follow the steps below to install the Glue JSON API convention core.

### Prerequisites

To start feature integration, overview and install the necessary features:

|     |     |
| --- | --- |
| NAME | INTEGRATION GUIDE |
| Glue Storefront and Backend API Applications | [Glue Storefront and Backend API Applications feature integration](https://github.com/spryker/spryker-docs/blob/1cac1b2759d30e33ad12b14f3e7e543d5dc23dcc/docs/scos/dev/feature-integration-guides/%7B%7Bpage.version%7D%7D/glue-api/glue-storefront-and-backend-api-application-integration-guide.html) |

### 1) Install the required modules using Composer

Install the required modules:

```
composer require spryker/glue-json-api-convention:"^1.0.0" spryker/glue-storefront-api-application-glue-json-api-convention-connector:"^1.0.0" --update-with-dependencies
```

Make sure that the following modules have been installed:

|     |     |
| --- | --- |
| MODULE | EXPECTED DIRECTORY |
| GlueJsonApiConvention | vendor/spryker/glue-json-api-convention |
| GlueStorefrontApiApplicationGlueJsonApiConventionConnector | vendor/spryker/glue-storefront-api-application-glue-json-api-convention-connector |

### 2) Set up the configuration

Add the following configuration:

**config/Shared/config\_default.php**

```
<?php

use Spryker\Shared\GlueJsonApiConvention\GlueJsonApiConventionConstants;

// ----------------------------------------------------------------------------
// ------------------------------ Glue Storefront API -------------------------------
// ----------------------------------------------------------------------------
$sprykerGlueStorefrontHost = getenv('SPRYKER_GLUE_STOREFRONT_HOST');

$config[GlueJsonApiConventionConstants::GLUE_DOMAIN]
    = sprintf(
        'https://%s',
        $sprykerGlueStorefrontHost ?: 'localhost',
    );
```

### 3) Set up transfer objects

Generate transfers:

```
console transfer:generate
```

Ensure the following transfers have been created:

|     |     |     |     |
| --- | --- | --- | --- |
| TRANSFER | TYPE | EVENT | PATH |
| GlueApiContext | class | created | src/Generated/Shared/Transfer/GlueApiContextTransfer.php |
| GlueResponse | class | created | src/Generated/Shared/Transfer/GlueResponseTransfer.php |
| GlueRequest | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php |
| GlueRequestValidation | class | created | src/Generated/Shared/Transfer/GlueRequestValidationTransfer.php |
| GlueError | class | created | src/Generated/Shared/Transfer/GlueErrorTransfer.php |
| GlueResource | class | created | src/Generated/Shared/Transfer/GlueResourceTransfer.php |
| GlueRelationship | class | created | src/Generated/Shared/Transfer/GlueRelationshipTransfer.php |
| GlueSparseResource | class | created | src/Generated/Shared/Transfer/GlueSparseResourceTransfer.php |
| GlueFilter | class | created | src/Generated/Shared/Transfer/GlueFilterTransfer.php |
| GlueLink | class | created | src/Generated/Shared/Transfer/GlueLinkTransfer.php |
| Pagination | class | created | src/Generated/Shared/Transfer/PaginationTransfer.php |
| Sort | class | created | src/Generated/Shared/Transfer/SortTransfer.php |

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

|     |     |     |
| --- | --- | --- |
| PLUGIN | SPECIFICATION | NAMESPACE |
| JsonApiConventionPlugin | Defines the JSON:API convention and adds steps it requires for the request flow. | Spryker\\Glue\\GlueJsonApiConvention\\Plugin\\GlueApplication |
| StorefrontApiRelationshipProviderPlugin | Provides a collection of resource relationships for the storefront API application. | Spryker\\Glue\\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\\Plugin\\GlueStorefrontApiApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueApplication\JsonApiConventionPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ConventionPluginInterface>
     */
    protected function getConventionPlugins(): array
    {
        return [
            new JsonApiConventionPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/GlueJsonApiConvention/GlueJsonApiConventionDependencyProvider.php**

```
<?php

namespace Pyz\Glue\GlueJsonApiConvention;

use Spryker\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider as SprykerGlueJsonApiConventionDependencyProvider;
use Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\Plugin\GlueStorefrontApiApplication\StorefrontApiRelationshipProviderPlugin;

class GlueJsonApiConventionDependencyProvider extends SprykerGlueJsonApiConventionDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\RelationshipProviderPluginInterface>
     */
    public function getRelationshipProviderPlugins(): array
    {
        return [
            new StorefrontApiRelationshipProviderPlugin(),
        ];
    }
}
```

![](https://spryker.atlassian.net/wiki/images/icons/grey_arrow_down.png)Verification

In order to verify that everything is set up correctly and you are able to access the endpoint follow [\[FINAL\] Create a resource](https://spryker.atlassian.net/wiki/spaces/CORE/pages/3298459765)