This document describes how to integrate the Marketplace Return Management API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Return Management Glue API feature core.

### Prerequisites
<!-- List the features a project must have before they can integrate the current feature. -->

Install the required features:
<!--See feature mapping at [Features](https://release.spryker.com/features). -->

| NAME | VERSION | INSTALLATION GUIDE |
| --------- | ------ | --------|
| Marketplace Merchant | {{page.version}}  | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |
| Marketplace Return Management | {{page.version}} | [Install the Marketplace Return Management feature](/docs/pbc/all/return-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-return-management-feature.html) |

### 1) Install the required modules using Сomposer
<!--Provide one or more console commands with the exact latest version numbers of all required modules. If the Composer command contains the modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->

Install the required modules using Composer:

```bash
composer require spryker/merchant-sales-returns-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY <!--for public Demo Shops--> |
| -------- | ------------------- |
|MerchantSalesReturnsRestApi | spryker/merchant-sales-returns-rest-api |

{% endinfo_block %}


### 2) Set up transfer objects
<!--If the feature has database definition changes, merge the steps as described in [Set up database schema and transfer objects](#set-up-database-schema-and-transfer-objects). Provide code snippet with transfer schema changes, describing the changes before each code snippet. Provide the console commands to apply the changes in project and core.-->

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
<!--Describe how a developer can check they have completed the step correctly.-->

Ensure the following transfers have been created:

| TRANSFER | TYPE | EVENT  | PATH  |
| --------- | ------- | ----- | ------------- |
| RestReturnsAttributes.merchantReference | attribute | created |src/Generated/Shared/Transfer/RestReturnsAttributesTransfer |

{% endinfo_block %}

### 3) Set up behavior
<!--This is a comment, it will not be included -->
Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| MerchantByMerchantReferenceResourceRelationshipPlugin | Adds `merchants` resources as relationship by merchant references in the attributes |  |  Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication     |

<details>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantByMerchantReferenceResourceRelationshipPlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
  protected function getResourceRelationshipPlugins(
          ResourceRelationshipCollectionInterface $resourceRelationshipCollection
      ): ResourceRelationshipCollectionInterface {
          $resourceRelationshipCollection->addRelationship(
                SalesReturnsRestApiConfig::RESOURCE_RETURNS,
                new MerchantByMerchantReferenceResourceRelationshipPlugin()
            );

            return $resourceRelationshipCollection;
      }

}
```

</details>

{% info_block warningBox "Verification" %}
<!--Describe how a developer can check they have completed the step correctly.-->

Make sure that the `MerchantByMerchantReferenceResourceRelationshipPlugin`
plugin is set up by:
1. Sending the request `GET https://glue.mysprykershop.com/returns/{% raw %}{{returnId}}{% endraw %}include=merchants`.

Verify that the returned data includes `merchant` resource attributes.

2. Sending the request `GET https://glue.mysprykershop.com/returns`.

Verify that the returned data includes the `merchantReference`.

{% endinfo_block %}
