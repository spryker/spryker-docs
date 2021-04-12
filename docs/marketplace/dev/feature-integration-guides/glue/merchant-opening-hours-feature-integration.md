---
title: Glue API - Merchant Opening Hours feature integration
last_updated: Dec 04, 2020
summary: This document describes how to integrate the Merchant Opening Hours Glue API feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Merchant Opening Hours Glue API feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name  | Version | INTEGRATION GUIDE |
| ----------- | ------ | --------------|
| Merchant Opening Hours | dev-master  | [Merchant Opening Hours feature integration](docs/marketplace/dev/feature-integration-guides/merchant-opening-hours-feature-integration.html)

### 1) Install the required modules using Composer

Run the following commands to install the required modules:

```bash
composer require spryker/merchant-opening-hours-rest-api:"^0.1.0"
```

---
**Verification**

Make sure that the following modules have been installed:

| MODULE   | EXPECTED DIRECTORY   |
| ------------------ | ----------------- |
| MerchantOpeningHoursRestApi | spryker/merchant-opening-hours-rest-api |

---

### 2) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT   | PATH |
| -------------- | ---- | ------ | ------------------ |
| RestMerchantOpeningHoursAttributes | class | Created | src/Generated/Shared/Transfer/RestMerchantOpeningHoursAttributesTransfer |

```

### 3) Set up behavior

#### Enable merchant product offers resources and relationships

Activate the following plugins:

| PLUGIN  | SPECIFICATION   | PREREQUISITES | NAMESPACE   |
| ----------------- | -------------- | --------------- | ---------------- |
| MerchantOpeningHoursResourceRoutePlugin | Registers the merchant-opening-hours resource.  | None  | Spryker\Glue\MerchantOpeningHoursRestApi\Plugin\GlueApplication |
| MerchantOpeningHoursByMerchantReferenceResourceRelationshipPlugin | Registers the merchant-opening-hours resource as a relationship to the merchants resource. | None  | Spryker\Glue\MerchantOpeningHoursRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\MerchantsRestApi\MerchantsRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\MerchantOpeningHoursRestApi\Plugin\GlueApplication\MerchantOpeningHoursByMerchantReferenceResourceRelationshipPlugin;
use Spryker\Glue\MerchantOpeningHoursRestApi\Plugin\GlueApplication\MerchantOpeningHoursResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new MerchantOpeningHoursResourceRoutePlugin(),
        ];
    }

    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            MerchantsRestApiConfig::RESOURCE_MERCHANTS,
            new MerchantOpeningHoursByMerchantReferenceResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

---
**Verification**

Make sure that the `MerchantOpeningHoursResourceRoutePlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/merchant-opening-hours/{{merchant-reference}}`

Make sure that the `MerchantOpeningHoursByMerchantReferenceResourceRelationshipPlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/merchants/{{merchant-reference}}?include=merchant-opening-hours`. You should get merchants with all merchant opening hours as relationships.
