---
title: Merchants feature integration
last_updated: Mar 23, 2021
summary: This integration guide provides steps on how to integrate the Merchants feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Marketplace Merchant feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |Integration guide |
| --- | --- | --- |
| Spryker Core | master |
| Merchant | master |

### 1) Install the required modules using composer
Install the required modules:

```bash
composer require spryker-feature/marketplace-merchant:"dev-master" --update-with-dependencies
```
Make sure that the following modules have been installed:



| Module | Expected Directory |
| --- | --- |
| MerchantProfile | vendor/spryker/merchant-profile |
| MerchantProfileDataImport | vendor/spryker/merchant-profile-data-import |
| MerchantProfileGui | vendor/spryker/merchant-profile-gui |
| MerchantSearch | vendor/spryker/merchant-search |
| MerchantSearchExtension | vendor/spryker/merchant-search-extension |
| MerchantUser | vendor/spryker/merchant-user |
| MerchantUserGui |	vendor/spryker/merchant-user-gui |
| MerchantStorage | vendor/spryker/merchant-storage |

### 2) Set up database schema
Set up database schema:
1. Adjust the schema definition so entity changes trigger events:

**src/Pyz/Zed/MerchantSearch/Persistence/Propel/Schema/spy_merchant_search.schema.xml**

```xml
  <?xml version="1.0"?>
  <database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" name="zed"
            namespace="Orm\Zed\MerchantSearch\Persistence"
            package="src.Orm.Zed.MerchantSearch.Persistence">

      <table name="spy_merchant_search">
          <behavior name="synchronization">
              <parameter name="queue_pool" value="synchronizationPool"/>
          </behavior>
      </table>

  </database>

```

2. Run the following commands to apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```


---
**Verification**

Make sure that the following changes have occurred in the database:

| Database entity | Type | Event |
|---|---|---|
| spy_merchant_storage | table | created |
| spy_merchant_search | table | created |
| spy_merchant_profile | table | created |
| spy_merchant_user | table | created |

---

### 3) Set up transfer objects
Generate transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have occurred in transfer objects:

| Transfer | Type | Event | Path |
|---|---|---|---|
| MerchantProfileAddress | object | Created | src/Generated/Shared/Transfer/MerchantProfileAddressTransfer |
| MerchantProfileCollection | object | Created | src/Generated/Shared/Transfer/MerchantProfileCollectionTransfer|
| MerchantProfileCriteriaFilter | object | Created | src/Generated/Shared/Transfer/MerchantProfileCriteriaFilterTransfer |
| MerchantProfileGlossaryAttributeValues | object | Created | src/Generated/Shared/Transfer/MerchantProfileGlossaryAttributeValuesTransfer |
| MerchantProfileLocalizedGlossaryAttributes | object | Created | src/Generated/Shared/Transfer/MerchantProfileLocalizedGlossaryAttributesTransfer |
| MerchantSearch | object | Created | src/Generated/Shared/Transfer/MerchantSearchTransfer |
| MerchantSearchCollection | object | Created | src/Generated/Shared/Transfer/MerchantSearchCollectionTransfer |
| MerchantUser | object | Created | src/Generated/Shared/Transfer/MerchantUserTransfer |
| MerchantUserCriteria | object | Created | src/Generated/Shared/Transfer/MerchantUserCriteriaTransfer |
| MerchantUserResponse | object | Created | src/Generated/Shared/Transfer/MerchantUserResponseTransfer |
| SpyMerchantProfileEntity | object | Created | src/Generated/Shared/Transfer/SpyMerchantProfileEntityTransfer |
| SpyMerchantSearchEntity | object | Created | src/Generated/Shared/Transfer/SpyMerchantSearchEntityTransfer |
| SpyMerchantStorageEntity |  object | Created | src/Generated/Shared/Transfer/SpyMerchantStorageEntityTransfer |
| SpyMerchantUserEntity | object | Created |src/Generated/Shared/Transfer/SpyMerchantUserEntityTransfer |

---

### 4) Add Zed translations
Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 5) Set up behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description  | Prerequisites | Namespace|
|---|---|---|---|
| MerchantProfileExpanderPlugin | Expands merchant with profile data.| None          | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant |
| MerchantProfileMerchantPostCreatePlugin | Creates merchant profile on merchant create action. | None | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant|
| MerchantProfileMerchantPostUpdatePlugin| Updates merchant profile on merchant update action.m| None | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant |
| MerchantProfileContactPersonFormTabExpanderPlugin | Adds an extra tab to merchant edit and create forms for editing and creating contact person data. | None | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs |
| MerchantProfileFormTabExpanderPlugin | Adds an extra tab to merchant edit and create forms for editing and creating merchant profile data. | None | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs |
| MerchantProfileLegalInformationFormTabExpanderPlugin | Adds an extra tab to merchant edit and create forms for editing and creating merchant legal information. | None | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs |
| MerchantProfileFormExpanderPlugin | Expands MerchantForm with merchant profile fields. | None | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui |
| MerchantUserAclInstallerPlugin | Provides merchant user roles to ACL. | None  | Spryker\Zed\MerchantUser\Communication\Plugin\Acl |
| SyncMerchantUsersStatusMerchantPostUpdatePlugin | Updates merchant users status by merchant status on merchant update. | None | Spryker\Zed\MerchantUser\Communication\Plugin\Merchant |
| MerchantUserTabMerchantFormTabExpanderPlugin | Adds an extra tab to merchant edit and create forms for editing and creating merchant user information. | None | Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui |
| MerchantUserViewMerchantUpdateFormViewExpanderPlugin | Expands merchant `FormView` with the data for the merchant user tab. | None | Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui |

**src/Pyz/Zed/Merchant/MerchantDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Merchant;

use Spryker\Zed\Merchant\MerchantDependencyProvider as SprykerMerchantDependencyProvider;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileExpanderPlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileMerchantPostCreatePlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileMerchantPostUpdatePlugin;
  use Spryker\Zed\MerchantUser\Communication\Plugin\Merchant\SyncMerchantUsersStatusMerchantPostUpdatePlugin;

class MerchantDependencyProvider extends SprykerMerchantDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostCreatePluginInterface[]
     */
    protected function getMerchantPostCreatePlugins(): array
    {
        return [
            new MerchantProfileMerchantPostCreatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostUpdatePluginInterface[]
     */
    protected function getMerchantPostUpdatePlugins(): array
    {
        return [
            new MerchantProfileMerchantPostUpdatePlugin(),
            new SyncMerchantUsersStatusMerchantPostUpdatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantExpanderPluginInterface[]
     */
    protected function getMerchantExpanderPlugins(): array
    {
        return [
            new MerchantProfileExpanderPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that, when you create a merchant using `MerchantFacade::updateMerchant()`, its profile also gets created.

Make sure that, when you update a merchant using `MerchantFacade::updateMerchant()`, its profile also gets updated.

Make sure that when you fetch a merchant using `MerchantFacade::findOne()`, its profile data also gets fetched.

Make sure that, when you deactivate a merchant in the *Merchants* section of the Back Office, its merchant users are deactivated in the Users section.

---

**src/Pyz/Zed/MerchantGui/MerchantGuiDependencyProvider.php**

```php

<?php

namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\MerchantProfileFormExpanderPlugin;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs\MerchantProfileContactPersonFormTabExpanderPlugin;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs\MerchantProfileFormTabExpanderPlugin;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs\MerchantProfileLegalInformationFormTabExpanderPlugin;
use Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui\MerchantUserTabMerchantFormTabExpanderPlugin;
use Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui\MerchantUserViewMerchantUpdateFormViewExpanderPlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormExpanderPluginInterface[]
     */
    protected function getMerchantFormExpanderPlugins(): array
    {
        return [
            new MerchantProfileFormExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormTabExpanderPluginInterface[]
     */
    protected function getMerchantFormTabsExpanderPlugins(): array
    {
        return [
            new MerchantProfileContactPersonFormTabExpanderPlugin(),
            new MerchantProfileFormTabExpanderPlugin(),
            new MerchantProfileLegalInformationFormTabExpanderPlugin(),
            new MerchantUserTabMerchantFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantUpdateFormViewExpanderPluginInterface[]
     */
    protected function getMerchantUpdateFormViewExpanderPlugins(): array
    {
        return [
            new MerchantUserViewMerchantUpdateFormViewExpanderPlugin(),
        ];
    }

}

```

Make sure that when you edit a merchant in the Merchants section of the Back Office, you can see merchant profile related tabs: Contact Person, Merchant Profile, Legal Information, Merchant User.

**src/Pyz/Zed/Acl/AclDependencyProvider.php**

```
<?php

namespace Pyz\Zed\Acl;

use Spryker\Zed\Acl\AclDependencyProvider as SprykerAclDependencyProvider;
use Spryker\Zed\MerchantUser\Communication\Plugin\Acl\MerchantUserAclInstallerPlugin;

class AclDependencyProvider extends SprykerAclDependencyProvider
{
    /**
     * @return \Spryker\Zed\AclExtension\Dependency\Plugin\AclInstallerPluginInterface[]
     */
    public function getAclInstallerPlugins(): array
    {
        return [
            new MerchantUserAclInstallerPlugin(),
        ];
    }
}

```

Make sure that, after executing `console setup:init-db`, the Merchant Admin role is present in `spy_acl_role`.

Make sure that the `console sync:data url` command exports the merchant URL data from `spy_url`  to Redis.

### 6) Configure navigation
Add marketplace section to `navigation.xml:`
**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <marketplace>
        <label>Marketplace</label>
        <title>Marketplace</title>
        <icon>fa-shopping-basket</icon>
        <pages>
            <merchant>
                <label>Merchants</label>
                <title>Merchants</title>
                <bundle>merchant-gui</bundle>
                <controller>list-merchant</controller>
                <action>index</action>
            </merchant>
        </pages>
    </marketplace>
</config>
```

---
**Verification**

Make sure that, in the navigation menu of the Back Office,  you can see the **Marketplace** button.

---

### 7) Configure export to Redis
This step publishes tables on change (create, edit) to `spy_merchant_profile_storage` and synchronizes the data to Storage.

Configure export to Redis:

1. Set up event listeners and publishers:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
| MerchantPublisherTriggerPlugin | Registers the publishers that publish merchant entity changes to storage. | None | Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\MerchantPublisherTriggerPlugin |
| MerchantStoragePublisherPlugin | Publishes merchant data to the `spy_merchant_storage` table. | None | Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\Merchant\MerchantStoragePublisherPlugin |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\MerchantPublisherTriggerPlugin;
use Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\Merchant\MerchantStoragePublisherPlugin;
ss PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
   /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new MerchantStoragePublisherPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new MerchantPublisherTriggerPlugin(),
        ];
    }
}
```

2. Register synchronization and synchronization error queues:

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\MerchantStorage\MerchantStorageConfig;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     *  QueueNameFoo, // Queue => QueueNameFoo, (Queue and error queue will be created: QueueNameFoo and QueueNameFoo.error)
     *  QueueNameBar => [
     *       RoutingKeyFoo => QueueNameBaz, // (Additional queues can be defined by several routing keys)
     *   ],
     *
     * @see https://www.rabbitmq.com/tutorials/amqp-concepts.html
     *
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [        
            MerchantStorageConfig::MERCHANT_SYNC_STORAGE_QUEUE,
        ];
    }
}

```

3. Configure message processors:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all merchant profile messages to synchronize with Redis and marks messages as failed in case of an error. | None | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

```php
<?php

namespace Pyz\Zed\MerchantStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\MerchantStorage\MerchantStorageConfig as BaseMerchantStorageConfig;

class MerchantStorageConfig extends BaseMerchantStorageConfig
{
    /**
     * @return string|null
     */
    public function getMerchantSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\MerchantStorage\MerchantStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            MerchantStorageConfig::MERCHANT_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

4. Set up re-generate and re-sync features:

| Plugin| Specification| Prerequisites | Namespace |
|---|---|---|---|
| MerchantSynchronizationDataPlugin | Enables the content of an entire storage table to be synchronized into Storage. | None | Spryker\Zed\MerchantStorage\Communication\Plugin\Synchronization |

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Synchronization;
use Spryker\Zed\MerchantStorage\Communication\Plugin\Synchronization\MerchantSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new MerchantSynchronizationDataPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that when merchant profile entities are created or updated through ORM, they are exported to Redis accordingly.

---

### 8) Configure export to Elastica
This step publishes tables on change (create, edit) to `spy_merchant_search` and synchronizes the data to Search.

Configure export to Elastica:

1. Setup Event Listeners and Publishers by registering the plugins:
**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
   <?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\MerchantSearch\Communication\Plugin\Publisher\Merchant\MerchantWritePublisherPlugin;
use Spryker\Zed\MerchantSearch\Communication\Plugin\Publisher\Merchant\MerchantDeletePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
   /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new MerchantWritePublisherPlugin(),
            new MerchantDeletePublisherPlugin(),
        ];
    }
}
```

2. Register a synchronization queue:
**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\MerchantSearch\MerchantSearchConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            MerchantSearchConfig::SYNC_SEARCH_MERCHANT,
        ];
    }
}
```

3. Configure message processors:

| Plugin  | Specification | Prerequisites | Namespace |
|---|---|---|---|
| SynchronizationSearchQueueMessageProcessorPlugin | Configures merchant messages to sync with Elastica search and marks messages as failed in case of an error. | None | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\MerchantSearch\MerchantSearchConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            MerchantSearchConfig::SYNC_SEARCH_MERCHANT => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

4. Setup re-generate and re-sync features:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
| MerchantSynchronizationDataBulkRepositoryPlugin | Synchronizes the entire search table content into Search. | None | Spryker\Zed\MerchantSearch\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\MerchantSearch\Communication\Plugin\Synchronization\MerchantSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new MerchantSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

5. Configure a synchronization pool name:

**src/Pyz/Zed/MerchantSearch/MerchantSearchConfig.php**

```php
<?php

namespace Pyz\Zed\MerchantSearch;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\MerchantSearch\MerchantSearchConfig as SprykerMerchantSearchConfig;

class MerchantSearchConfig extends SprykerMerchantSearchConfig
{
    /**
     * @return string|null
     */
    public function getMerchantSearchSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```


---
**Verification**

Make sure that, when merchant entities are created or updated through ORM, they are exported to Elastica accordingly.


| Target entity | Example of expected data identifier |Example of expected data identifier |
|---|---|---|
| Merchant | merchant:1 |Example of expected data identifier is provided below |

<details><summary markdown='span'>Click to view an example of the expected data fragment</summary>

 ```json

 {
  "idMerchant": 1,
  "name": "Sony Experts",
  "registrationNumber": "HYY 134306",
  "email": "michele@sony-experts.com",
  "status": "approved",
  "isActive": true,
  "merchantReference": "MER000006",
  "fkStateMachineProcess": 1,
  "storeRelation": {
    "idEntity": 1,
    "idStores": [
      1
    ],
    "stores": [
      {
        "availableLocaleIsoCodes": [],
        "queuePools": [],
        "storesWithSharedPersistence": [],
        "idStore": 1,
        "name": "DE",
        "defaultCurrencyIsoCode": null,
        "availableCurrencyIsoCodes": [],
        "selectedCurrencyIsoCode": null,
        "timezone": null,
        "countries": []
      }
    ]
  },
  "addressCollection": null,
  "merchantProfile": {
    "idMerchantProfile": 3,
    "contactPersonRole": "Brand Manager",
    "contactPersonTitle": "Ms",
    "contactPersonFirstName": "Michele",
    "contactPersonLastName": "Nemeth",
    "contactPersonPhone": "030/123456789",
    "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-logo.png",
    "publicEmail": "support@sony-experts.com",
    "publicPhone": "+49 30 234567691",
    "descriptionGlossaryKey": "merchant.description_glossary_key.1",
    "bannerUrlGlossaryKey": "merchant.banner_url_glossary_key.1",
    "deliveryTimeGlossaryKey": "merchant.delivery_time_glossary_key.1",
    "termsConditionsGlossaryKey": "merchant.terms_conditions_glossary_key.1",
    "cancellationPolicyGlossaryKey": "merchant.cancellation_policy_glossary_key.1",
    "imprintGlossaryKey": "merchant.imprint_glossary_key.1",
    "dataPrivacyGlossaryKey": "merchant.data_privacy_glossary_key.1",
    "fkMerchant": 1,
    "merchantName": "Sony Experts",
    "latitude": "11.547788",
    "longitude": "48.131058",
    "faxNumber": "+49 30 234567600",
    "merchantReference": "MER000006",
    "bannerUrl": null,
    "addressCollection": {
      "addresses": [
        {
          "idMerchantProfileAddress": 3,
          "fkCountry": 60,
          "countryName": "Germany",
          "address1": "Matthias-Pschorr-Straße",
          "address2": "1",
          "address3": "",
          "city": "München",
          "zipCode": "80336",
          "email": null,
          "fkMerchantProfile": 3
        }
      ]
    },
    "merchantProfileLocalizedGlossaryAttributes": []
  },
  "urlCollection": [
    {
      "url": "/de/merchant/sony-experts",
      "resourceType": null,
      "resourceId": null,
      "fkLocale": 46,
      "idUrl": 505,
      "fkResourceCategorynode": null,
      "fkRedirect": null,
      "fkResourcePage": null,
      "fkResourceRedirect": null,
      "fkResourceMerchant": 1,
      "urlPrefix": null,
      "localeName": "de_DE",
      "fkResourceProductAbstract": null,
      "fkResourceProductSet": null,
      "itemType": null,
      "itemId": null,
      "fkProductAbstract": null,
      "fkCategorynode": null,
      "fkPage": null
    },
    {
      "url": "/en/merchant/sony-experts",
      "resourceType": null,
      "resourceId": null,
      "fkLocale": 66,
      "idUrl": 506,
      "fkResourceCategorynode": null,
      "fkRedirect": null,
      "fkResourcePage": null,
      "fkResourceRedirect": null,
      "fkResourceMerchant": 1,
      "urlPrefix": null,
      "localeName": "en_US",
      "fkResourceProductAbstract": null,
      "fkResourceProductSet": null,
      "itemType": null,
      "itemId": null,
      "fkProductAbstract": null,
      "fkCategorynode": null,
      "fkPage": null
    }
  ],
  "categories": [
    {
      "idCategory": 2,
      "categoryKey": "cameras-and-camcorder",
      "isActive": true,
      "isInMenu": true,
      "isClickable": true,
      "isSearchable": true,
      "name": null,
      "url": null,
      "imageName": null,
      "categoryImageName": null,
      "metaTitle": null,
      "metaDescription": null,
      "metaKeywords": null,
      "fkCategoryTemplate": 1,
      "idCmsBlocks": [],
      "categoryNode": null,
      "nodeCollection": null,
      "parentCategoryNode": null,
      "localizedAttributes": [
        {
          "name": "Kameras & Camcorders",
          "url": null,
          "metaTitle": "Kameras & Camcorders",
          "metaDescription": "Kameras & Camcorders",
          "metaKeywords": "Kameras & Camcorders",
          "locale": {
            "idLocale": 46,
            "localeName": "de_DE",
            "name": null,
            "isActive": true
          },
          "image": null
        },
        {
          "name": "Cameras & Camcordersshhhhjjj",
          "url": null,
          "metaTitle": "Cameras & Camcorders",
          "metaDescription": "Cameras & Camcorders",
          "metaKeywords": "Cameras & Camcorders",
          "locale": {
            "idLocale": 66,
            "localeName": "en_US",
            "name": null,
            "isActive": true
          },
          "image": null
        }
      ],
      "extraParents": [],
      "imageSets": []
    }
  ],
  "stocks": [
    {
      "idStock": 7,
      "name": "Sony Experts MER000006 Warehouse 1",
      "isActive": true,
      "storeRelation": null
    }
  ]
}

 ```

 </details>

 ---

6. Set up result formatters:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
| MerchantSearchResultFormatterPlugin | Maps raw data from Elasticsearch to MerchantSearchCollectionTransfer.  None | Spryker\Client\MerchantSearch\Plugin\Elasticsearch\ResultFormatter |

```php
<?php

namespace Pyz\Client\MerchantSearch;

use Spryker\Client\MerchantSearch\MerchantSearchDependencyProvider as SprykerMerchantSearchDependencyProvider;
use Spryker\Client\MerchantSearch\Plugin\Elasticsearch\ResultFormatter\MerchantSearchResultFormatterPlugin;

class MerchantSearchDependencyProvider extends SprykerMerchantSearchDependencyProvider
{
    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function getMerchantSearchResultFormatterPlugins(): array
    {
        return [
            new MerchantSearchResultFormatterPlugin(),
        ];
    }
}
```
7. Set up query expanders:

| Plugin | Specification | Prerequisites | Namespace |
|----|----|----|----|
| PaginatedMerchantSearchQueryExpanderPlugin | Allows to use pagination for merchant search. | None | Spryker\Client\MerchantSearch\Plugin\Elasticsearch\Query |
| StoreQueryExpanderPlugin | Allows search to filter out merchants that do not belong to the current store. | None | Spryker\Client\SearchElasticsearch\Plugin\QueryExpander |

```php
<?php

namespace Pyz\Client\MerchantSearch;

use Spryker\Client\MerchantSearch\MerchantSearchDependencyProvider as SprykerMerchantSearchDependencyProvider;
use Spryker\Client\MerchantSearch\Plugin\Elasticsearch\Query\PaginatedMerchantSearchQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\StoreQueryExpanderPlugin;

class MerchantSearchDependencyProvider extends SprykerMerchantSearchDependencyProvider
{
    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function getMerchantSearchQueryExpanderPlugins(): array
    {
        return [
            new PaginatedMerchantSearchQueryExpanderPlugin(),
            new StoreQueryExpanderPlugin(),
        ];
    }
}
```
8. Add the `merchant` resource to supported search sources:

```php
<?php

namespace Pyz\Shared\SearchElasticsearch;

use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'merchant',
    ];
}
```

### 9) Import data
To import data:
1. Prepare merchant profile data according to your requirements using our demo data:

<details><summary merchant='span'>click to view the demo data</summary>

```html
merchant_reference,contact_person_role,contact_person_title,contact_person_first_name,contact_person_last_name,contact_person_phone,banner_url,logo_url,public_email,public_phone,description_glossary_key.en_US,description_glossary_key.de_DE,banner_url_glossary_key.en_US,banner_url_glossary_key.de_DE,delivery_time_glossary_key.en_US,delivery_time_glossary_key.de_DE,terms_conditions_glossary_key.en_US,terms_conditions_glossary_key.de_DE,cancellation_policy_glossary_key.en_US,cancellation_policy_glossary_key.de_DE,imprint_glossary_key.en_US,imprint_glossary_key.de_DE,data_privacy_glossary_key.en_US,data_privacy_glossary_key.de_DE,is_active,fax_number,longitude,latitude
MER000001,E-Commerce Manager,Mr,Harald,Schmidt,+49 30 208498350,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png,info@spryker.com,+49 30 234567891,Spryker is the main merchant at the Demo Marketplace.,Spryker ist der Haupthändler auf dem Demo-Marktplatz.,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,1-3 days,1-3 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter“) und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-E-Mail. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.","<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Represented by<br>Managing Directors: Alexander Graf, Boris Lokschin<br>Register Court: Hamburg<br>Register Number: HRB 134310<br></p>","<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Vertreten durch<br>Geschäftsführer: Alexander Graf, Boris Lokschin<br>Registergericht: Hamburg<br>Registernummer: HRB 134310<br></p>",Spryker Systems GmbH values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Spryker Systems GmbH.,1,+49 30 234567800,52.534105,13.384458
MER000002,Country Manager DE,Ms,Martha,Farmer,+31 123 345 678,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-logo.png,hi@video-king.nl,+31 123 345 777,"Video King is a premium provider of video equipment. In business since 2010, we understand the needs of video professionals and enthusiasts and offer a wide variety of products with competitive prices. ","Video King ist ein Premium-Anbieter von Videogeräten. Wir sind seit 2010 im Geschäft, verstehen die Bedürfnisse von Videoprofis und -enthusiasten und bieten eine große Auswahl an Produkten zu wettbewerbsfähigen Preisen an. ",https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,2-4 days,2-4 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter“) und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-E-Mail. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Video King<br><br>Gilzeweg 24<br>4854SG Bavel<br>NL <br><br>Phone: +31 123 45 6789<br>Email: hi@video-king.nl<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Amsterdam<br>Register Number: 1234.4567<br></p>,<p>Video King<br><br>Gilzeweg 24<br>4854SG Bavel<br>NL<br><br>Telefon: +31 123 45 6789<br>Email: hi@video-king.nl<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: Amsterdam<br>Registernummer: 1234.4567<br></p>,Video King values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Video King.,1,+31 123 345 733,51.558107,4.838470
MER000006,Brand Manager,Ms,Michele,Nemeth,030/123456789,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-logo.png,support@sony-experts.com,+49 30 234567691,"Capture your moment with the best cameras from Sony. From pocket-size to professional-style, they all pack features to deliver the best quality pictures.
Discover the range of Sony cameras, lenses and accessories, and capture your favorite moments with precision and style with the best cameras can offer.","Halten Sie Ihren Moment mit den besten Kameras von Sony fest. Vom Taschenformat bis hin zum professionellen Stil bieten sie alle Funktionen, um Bilder in bester Qualität zu liefern.
Entdecken Sie das Angebot an Kameras, Objektiven und Zubehör von Sony und fangen Sie Ihre Lieblingsmomente mit Präzision und Stil mit den besten Kameras ein, die das Unternehmen zu bieten hat.",https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,1-3 days,1-3 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter“) und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-E-Mail. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Munich<br>Register Number: HYY 134306<br></p>,<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: München<br>Registernummer: HYY 134306<br></p>,Sony Experts values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Sony Experts.,1,+49 30 234567600,48.131058,11.547788
MER000004,,,,,,,,,,,,,,,,,,,,,,,,0,,,
MER000003,,,,,,,,,,,,,,,,,,,,,,,,0,,,
MER000007,,,,,,,,,,,,,,,,,,,,,,,,0,,,
MER000005,Merchandise Manager,Mr,Jason,Weidmann,030/123456789,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-logo.png,support@budgetcamerasonline.com,+49 30 234567591,"DSLR and mirrorless cameras are by far the most popular with filmmakers on a tight budget when you can't afford multiple specialist cameras.
Budget Cameras is offering a great selection of digital cameras with the lowest prices.","DSLR- und spiegellose Kameras sind bei Filmemachern mit knappem Budget bei weitem am beliebtesten, wenn sie sich bestimmte Spezialkameras nicht leisten können.
Budget Cameras bietet eine große Auswahl an Digitalkameras mit den niedrigsten Preisen.",https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,2-4 days,2-4 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter“) und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-E-Mail. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Budget Cameras<br><br>Spitalerstraße 3<br>20095 Hamburg<br>DE<br><br>Phone: 030 1234567<br>Email: support@budgetcamerasonline.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Hamburg<br>Register Number: HXX 134305<br></p>,<p>Budget Cameras<br><br>Spitalerstraße 3<br>20095 Hamburg<br>DE<br><br>Phone: 030 1234567<br>Email: support@budgetcamerasonline.com<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: Hamburg<br>Registernummer: HXX 134305<br></p>,Budget Cameras values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Budget Cameras.,1,+49 30 234567500,53.552463,10.004663

```

</details>


| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
|-|-|-|-|-|
| merchant_reference | &check; | String | MER000007 | Merchant identifier. |
| contact_person_role |   | String | E-Commerce Manager | Role of the contact person of a merchant. |
| contact_person_title |   | String | Mr | The title shown for the contact person of a merchant. |
| contact_person_first_name |   | String | Harald | First name of the contact person of a merchant. |
| contact_person_last_name |   | String | Schmidt | Last name of the contact person of a merchant. |
| contact_person_phone |   | String | 030 234567891a | Phone number of the contact person of a merchant. |
| banner_url |   | String | http://cdn-link/banner.png | Default banner URL of a merchant if a locale specific one does not exist. |
| logo_url |   | String | http://cdn-link/logo.png | Logo URL of a merchant. |
| public_email |   | String | email@merchant-domain.com | Public email for communication of a merchant. |
| public_phone |   | String | 030 234567891 | Public phone for communication of a merchant. |
| description_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Description of a merchant in the en_US locale. |
| description_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Description of a merchant in the de_DE locale. |
| banner_url_glossary_key.en_US |   | String | http://cdn-link/en-banner.png | Locale specific banner URL of a merchant. |
| banner_url_glossary_key.de_DE |   | String | http://cdn-link/en-banner.png | Locale specific banner URL of a merchant. |
| delivery_time_glossary_key.en_US |   | String | 1-3 days | Average delivery time of a merchant in the en_US locale. |
| delivery_time_glossary_key.de_DE |   | String | 1-3 days | Average delivery time of a merchant in the de_DE locale. |
| terms_conditions_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Terms and conditions of a merchant in the en_US locale. |
| terms_conditions_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Terms and conditions of a merchant in the de_DE locale. |
| cancellation_policy_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Cancellation policy of a merchant in the en_US locale. |
| cancellation_policy_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Cancellation policy of a merchant in the de_DE locale. |
| imprint_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Imprint of a merchant in the en_US locale. |
| imprint_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Imprint of a merchant in the de_DE locale. |
| data_privacy_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Data privacy statement of a merchant in the en_US locale. |
| data_privacy_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Data privacy statement of a merchant in the de_DE locale. |
| fax_number |   | String | 030 234567800 | Fax number of a merchant. |
| longitude |   | String | 52.534105 | Longitude value of a merchant. |
| latitude |   | String | 13.384458 | Latitude value of a merchant. |

2. Prepare merchant profile address data according to your requirements using our demo data:

```
merchant_reference,country_iso2_code,country_iso3_code,address1,address2,address3,city,zip_code
MER000001,DE,DEU,Julie-Wolfthorn-Straße,1,,Berlin,10115
MER000002,NL,,Gilzeweg,24,,Bavel,4854SG
MER000006,DE,DEU,Matthias-Pschorr-Straße,1,,München,80336
MER000005,DE,DEU,Spitalerstraße,3,,Berlin,10115
MER000004 ,DE,DEU,Caroline-Michaelis-Straße,8,,Hamburg,20095
MER000003,DE,DEU,Caroline-Michaelis-Straße,8,,Berlin,10115
MER000007 ,DE,DEU,Caroline-Michaelis-Straße,8,,Berlin,10115
```

| Column | Is Obligatory? | Data Type | Data Example | Data explanation |
|-|-|-|-|-|
| merchant_reference | &check; | String | MER000006 | Merchant identifier. |
| country_iso2_code |   | String | DE | Country ISO-2 code the address exists in. |
| country_iso3_code |   | String | DEU | Country ISO-3 code the address exists in. |
| address1 |   | String | Caroline-Michaelis-Straße | Address line 1 of a merchant. |
| address2 |   | String | 8 | Address line 2 of a merchant. |
| address3 |   | String | Second floor | Address line 3 of a merchant. |
| city |   | String | Berlin | City address of a merchant. |
| zip_code |   | String | 10115 | Zip code address of a merchant. |

3. Register the following plugins to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
|-|-|-|-|
| MerchantProfileDataImportPlugin | Imports merchant profile data into the database. | None | Spryker\Zed\MerchantProfileDataImport\Communication\Plugin |
| MerchantProfileAddressDataImportPlugin | Imports merchant profile address data into the database. | None | Spryker\Zed\MerchantProfileDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantProfileDataImport\Communication\Plugin\MerchantProfileDataImportPlugin;
use Spryker\Zed\MerchantProfileDataImport\Communication\Plugin\MerchantProfileAddressDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantProfileDataImportPlugin(),
            new MerchantProfileAddressDataImportPlugin(),
        ];
    }
}
```

4. Import data:

```bash
console data:import merchant-profile
console data:import merchant-profile-address```

---
**Verification**

Make sure that imported data has been added to the `spy_merchant_profile` and `spy_merchant_profile_address` tables.

---

## Install feature front end
Follow the steps below to install the feature front end.

### Prerequisites
To start feature integration, overview and install the necessary features:
| Name | Version |
|-|-|
| Spryker Core | master |

### 1) Install the required modules using composer
Run the following commands to install the required modules:
```bash
composer require spryker-feature/marketplace-merchant: "dev-master" --update-with-dependencies
```

| Module | Expected Directory |
|-|-|
| MerchantProfileWidget | vendor/spryker-shop/merchant-profile-widget |
| MerchantPage | vendor/spryker-shop/merchant-page |

### 2) Add Yves translations
Add Yves translations:

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**
```
merchant_profile.email,Email Address,en_US
merchant_profile.email,E-Mail,de_DE
merchant_profile.address,Address,en_US
merchant_profile.address,Adresse,de_DE
merchant_profile.phone,Phone,en_US
merchant_profile.phone,Telefon,de_DE
merchant_profile.terms_and_conditions,Terms & Conditions,en_US
merchant_profile.terms_and_conditions,AGB,de_DE
merchant_profile.cancellation_policy,Cancellation Policy,en_US
merchant_profile.cancellation_policy,Widerrufsbelehrung,de_DE
merchant_profile.imprint,Imprint,en_US
merchant_profile.imprint,Impressum,de_DE
merchant_profile.privacy,Data Privacy,en_US
merchant_profile.privacy,Datenschutz,de_DE
merchant_profile.delivery_time,Delivery Time,en_US
merchant_profile.delivery_time,Lieferzeit,de_DE
```

2. Import data:

```bash
console data:import glossary
```

---
**Verification**

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

---

### 3) Set up behavior
Set up behavior:

1. Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
|-|-|-|-|
| MerchantPageResourceCreatorPlugin | Allows to access a merchant page at `https://yves.mysprykershop.com/merchant/{merchantReference}`. | None | SprykerShop\Yves\MerchantPage\Plugin |
| UrlStorageMerchantMapperPlugin | Provides access to merchant storage data in the controller related to the `https://yves.mysprykershop.com/merchant/{merchantReference}` URL.  | Publish URL storage data to Redis by running `console sync:data url`. | Spryker\Client\MerchantStorage\Plugin |

**src/Pyz/Yves/StorageRouter/StorageRouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\StorageRouter;

use SprykerShop\Yves\MerchantPage\Plugin\MerchantPageResourceCreatorPlugin;
use SprykerShop\Yves\StorageRouter\StorageRouterDependencyProvider as SprykerShopStorageRouterDependencyProvider;

class StorageRouterDependencyProvider extends SprykerShopStorageRouterDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\StorageRouterExtension\Dependency\Plugin\ResourceCreatorPluginInterface[]
     */
    protected function getResourceCreatorPlugins(): array
    {
        return [
            new MerchantPageResourceCreatorPlugin(),
        ];
    }
}
```

**src/Pyz/Client/UrlStorage/UrlStorageDependencyProvider.php**
```php
<?php

namespace Pyz\Client\UrlStorage;

use Spryker\Client\MerchantStorage\Plugin\UrlStorageMerchantMapperPlugin;
use Spryker\Client\UrlStorage\UrlStorageDependencyProvider as SprykerUrlDependencyProvider;

class UrlStorageDependencyProvider extends SprykerUrlDependencyProvider
{
    /**
     * @return \Spryker\Client\UrlStorage\Dependency\Plugin\UrlStorageResourceMapperPluginInterface[]
     */
    protected function getUrlStorageResourceMapperPlugins()
    {
        return [
            new UrlStorageMerchantMapperPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that you can open the merchant page at link http://yves.de.demo-spryker.com/de/merchant/roan.

---

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

---
**Verification**

Make sure that you can view merchant profile data at http://yves.de.demo-spryker.com/de/merchant/roan.

---

## Related features
Integrate the following related features:

| Feature        | Required for the current feature | Integration guide |
| -------------- | -------------------------------- | ----------------- |
| Marketplace Merchant  API | &check;  |  [Marketplace Merchant feature integration ](/docs/marketplace/dev/feature-integration-guides/glue/marketplace-merchant-feature-integration.html) |
|   |   |   |   |
