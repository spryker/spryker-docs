


This document describes how to install the Glue JSON:API convention for Backend API application.

## Install feature core

Follow the steps below to install the Glue JSON:API convention core.

### Prerequisites

Install the required features:

| NAME           | VERSION          | INSTALLATION GUIDE                                                                                                                     |
|----------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core   | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)  |

### 1) Install the required modules

```bash
composer require spryker/glue-backend-api-application-glue-json-api-convention-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

| MODULE                                                  | EXPECTED DIRECTORY                                                             |
|---------------------------------------------------------|--------------------------------------------------------------------------------|
| GlueBackendApiApplicationGlueJsonApiConventionConnector | vendor/spryker/glue-backend-api-application-glue-json-api-convention-connector |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfers:

```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                    | TYPE  | EVENT   | PATH                                                                  |
|-----------------------------|-------|---------|-----------------------------------------------------------------------|
| GlueRequest                 | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php                 |
| ApiApplicationSchemaContext | class | created | src/Generated/Shared/Transfer/ApiApplicationSchemaContextTransfer.php |
| RelationshipPluginsContext  | class | created | src/Generated/Shared/Transfer/RelationshipPluginsContextTransfer.php  |
| ResourceContext             | class | created | src/Generated/Shared/Transfer/ResourceContextTransfer.php             |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                    | SPECIFICATION                                                                    | NAMESPACE                                                                                                 |
|-------------------------------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| RelationshipPluginsContextExpanderPlugin  | Adds resource relationships to the documentation generation context.             | Spryker\\Glue\\GlueBackendApiApplicationGlueJsonApiConventionConnector\\Plugin\\DocumentationGeneratorApi |
| BackendApiRelationshipProviderPlugin      | Provides a collection of resource relationships for the backend API application. | Spryker\\Glue\\GlueBackendApiApplicationGlueJsonApiConventionConnector\\Plugin\\GlueBackendApiApplication |

**Glue/DocumentationGeneratorApi/DocumentationGeneratorApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\DocumentationGeneratorApi;

use Spryker\Glue\DocumentationGeneratorApi\DocumentationGeneratorApiDependencyProvider as SprykerDocumentationGeneratorApiDependencyProvider;
use Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface;
use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\Plugin\DocumentationGeneratorApi\RelationshipPluginsContextExpanderPlugin as BackendRelationshipPluginsContextExpanderPlugin;

class DocumentationGeneratorApiDependencyProvider extends SprykerDocumentationGeneratorApiDependencyProvider
{
    /**
     * @var string
     */
    protected const GLUE_BACKEND_API_APPLICATION_NAME = 'backend';

    /**
     * @param \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface $contextExpanderCollection
     *
     * @return \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface
     */
    protected function getContextExpanderPlugins(ContextExpanderCollectionInterface $contextExpanderCollection): ContextExpanderCollectionInterface
    {
        $apiApplications = [];
        foreach ($this->getApiApplicationProviderPlugins() as $apiApplicationProviderPlugin) {
            $apiApplications[] = $apiApplicationProviderPlugin->getName();
        }
        $contextExpanderCollection->addApplications($apiApplications);

        $contextExpanderCollection->addExpander(new BackendRelationshipPluginsContextExpanderPlugin(), [static::GLUE_BACKEND_API_APPLICATION_NAME]);

        return $contextExpanderCollection;
    }
}
```

{% info_block warningBox "Verification" %}

To make sure that `RelationshipPluginsContextExpanderPlugin` is setup correctly, generate the documentation for `backend` by passing the optional `--application` parameter:

```bash
vendor/bin/glue api:generate:documentation --application backend
```

Make sure only the backend application documentation has been generated with related relationships.

{% endinfo_block %}

**src/Pyz/Glue/GlueJsonApiConvention/GlueJsonApiConventionDependencyProvider.php**

```
<?php

namespace Pyz\Glue\GlueJsonApiConvention;

use Spryker\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider as SprykerGlueJsonApiConventionDependencyProvider;
use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\Plugin\GlueJsonApiConvention\BackendApiRelationshipProviderPlugin;

class GlueJsonApiConventionDependencyProvider extends SprykerGlueJsonApiConventionDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\RelationshipProviderPluginInterface>
     */
    public function getRelationshipProviderPlugins(): array
    {
        return [
            new BackendApiRelationshipProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

To verify that everything is set up correctly and that you can access the endpoint, see [Create backend resources](/docs/dg/dev/glue-api/{{site.version}}/routing/create-backend-resources.html).

{% endinfo_block %}
