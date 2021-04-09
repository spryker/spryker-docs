---
title: Merchant Opening Hours feature integration
last_updated: Dec 04, 2020
summary: This document describes how to integrate the Merchant Opening Hours Glue API feature into a Spryker project.
---

## Install Feature Core
Follow the steps below to install the Merchant Opening Hours API feature core.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| Name  | Version |
| ----------- | ------ |
| Merchant Opening Hours | dev-master  |

### 1) Install the required modules using composer

Run the following commands to install the required modules:

```bash
composer require spryker/merchant-opening-hours-rest-api:"^0.1.0"
```

---
**Verification**

Make sure that the following modules have been installed:

| Module   | Expected Directory   |
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

| Transfer                           | Type  | Event   | Path                                                         |
| :--------------------------------- | :---- | :------ | :----------------------------------------------------------- |
| RestMerchantOpeningHoursAttributes | class | Created | src/Generated/Shared/Transfer/RestMerchantOpeningHoursAttributesTransfer |

```

### 3) Set up behavior

#### Enable merchant product offers resources and relationships

Activate the following plugins:

| Plugin  | Specification   | Prerequisites | Namespace   |
| ----------------- | -------------- | --------------- | ---------------------- |
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
