---
title: "Decoupled Glue infrastructure: Integrate the Glue JSON:API convention"
description: Integrate the Glue JSON:API convention for Storefront API application into a Spryker project.
last_updated: September 30, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/decoupled-glue-infrastructure/glue-api-json-api-convention-integration.html
  - /docs/scos/dev/feature-integration-guides/202212.0/glue-api/decoupled-glue-infrastructure/glue-api-json-api-convention-integration.html
  - /docs/scos/dev/feature-integration-guides/202307.0/glue-api/install-backend-api-glue-json-api-convention.html
  - /docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-glue-json-api-convention.html
---

This document describes how to integrate the Glue JSON:API convention for Storefront API application into a Spryker project.

## Install feature core

Follow the steps below to install the Glue JSON:API convention core.

### Prerequisites

Install the required features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Glue Storefront and Backend API Applications | {{page.version}} | [Integrate Storefront and Backend Glue API applications](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/glue-json-api-convention:"^1.0.0" spryker/glue-storefront-api-application-glue-json-api-convention-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| GlueJsonApiConvention | vendor/spryker/glue-json-api-convention |
| GlueStorefrontApiApplicationGlueJsonApiConventionConnector | vendor/spryker/glue-storefront-api-application-glue-json-api-convention-connector |

{% endinfo_block %}

### 2) Set up the configuration

Add the following configuration:

**config/Shared/config\_default.php**

```php
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
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
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

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
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

To verify that everything is set up correctly, and you can access the endpoint, see [Create storefront resources](/docs/dg/dev/glue-api/{{site.version}}/routing/create-storefront-resources.html) or [Create backend resources](/docs/dg/dev/glue-api/{{site.version}}/routing/create-backend-resources.html).
