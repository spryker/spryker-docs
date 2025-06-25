This document describes how to install the Marketplace Merchant feature.

## Install feature core

Follow the steps below to install the Marketplace Merchant feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Merchant     | {{page.version}} | [Install the Merchant feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-feature.html)          |

### 1) Install the required modules

```bash
composer require spryker-feature/marketplace-merchant:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                        | EXPECTED DIRECTORY                              |
|-------------------------------|-------------------------------------------------|
| MerchantProfile               | vendor/spryker/merchant-profile                 |
| MerchantProfileDataImport     | vendor/spryker/merchant-profile-data-import     |
| MerchantProfileGui            | vendor/spryker/merchant-profile-gui             |
| MerchantUser                  | vendor/spryker/merchant-user                    |
| MerchantUserGui               | vendor/spryker/merchant-user-gui                |
| OauthMerchantUser             | vendor/spryker/oauth-merchant-user              |
| MerchantApp                   | vendor/spryker/merchant-app                     |
| MerchantAppMerchantPortalGui  | vendor/spryker/merchant-app-merchant-portal-gui |
| SalesPaymentMerchant          | vendor/spryker/sales-payment-merchant           |
| SalesPaymentMerchantExtension | vendor/spryker/sales-payment-merchant-extension |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. Apply database changes, generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have occurred in the database:

| DATABASE ENTITY      | TYPE  | EVENT   |
|----------------------|-------|---------|
| spy_merchant_profile | table | created |
| spy_merchant_user    | table | created |

{% endinfo_block %}

2. Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have occurred in transfer objects:

| TRANSFER                                   | TYPE     | EVENT   | PATH                                                                             |
|--------------------------------------------|----------|---------|----------------------------------------------------------------------------------|
| MerchantProfileAddress                     | class    | Created | src/Generated/Shared/Transfer/MerchantProfileAddressTransfer                     |
| MerchantProfileCollection                  | class    | Created | src/Generated/Shared/Transfer/MerchantProfileCollectionTransfer                  |
| MerchantProfileCriteria                    | class    | Created | src/Generated/Shared/Transfer/MerchantProfileCriteriaTransfer                    |
| MerchantProfileGlossaryAttributeValues     | class    | Created | src/Generated/Shared/Transfer/MerchantProfileGlossaryAttributeValuesTransfer     |
| MerchantProfileLocalizedGlossaryAttributes | class    | Created | src/Generated/Shared/Transfer/MerchantProfileLocalizedGlossaryAttributesTransfer |
| MerchantUser                               | class    | Created | src/Generated/Shared/Transfer/MerchantUserTransfer                               |
| MerchantUserCriteria                       | class    | Created | src/Generated/Shared/Transfer/MerchantUserCriteriaTransfer                       |
| MerchantUserResponse                       | class    | Created | src/Generated/Shared/Transfer/MerchantUserResponseTransfer                       |
| SpyMerchantProfileEntity                   | class    | Created | src/Generated/Shared/Transfer/SpyMerchantProfileEntityTransfer                   |
| SpyMerchantUserEntity                      | class    | Created | src/Generated/Shared/Transfer/SpyMerchantUserEntityTransfer                      |
| UrlStorage.fkResourceMerchant              | property | Created | src/Generated/Shared/Transfer/UrlStorageTransfer                                 |

{% endinfo_block %}

### 3) Optional: Set up configuration

1. [Integrate Glue authentication](/docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html).

2. Define the endpoints which merchant users have access to:

**src/Pyz/Zed/OauthMerchantUser/OauthMerchantUserConfig.php**

```php
<?php

namespace Pyz\Zed\OauthMerchantUser;

use Spryker\Zed\OauthMerchantUser\OauthMerchantUserConfig as SprykerOauthMerchantUserConfig;

class OauthMerchantUserConfig extends SprykerOauthMerchantUserConfig
{
    /**
     * Specification:
     * - Returns a list of configurations for endpoints accessible to merchant users.
     * - Structure example:
     * [
     *      '/example' => [
     *          'isRegularExpression' => false,
     *      ],
     *      '/\/example\/.+/' => [
     *          'isRegularExpression' => true,
     *          'methods' => [
     *              'patch',
     *              'delete',
     *          ],
     *      ],
     * ]
     *
     * @api
     *
     * @return array<string, mixed>
     */
    public function getAllowedForMerchantUserPaths(): array
    {
        return [];
    }
}
```

3. To enable the Merchant portal installer rules for the Marketplace ACL control, register the following name of the
module:

<details>
  <summary>src/Pyz/Zed/Acl/AclConfig.php</summary>

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @var string
     */
    protected const RULE_TYPE_DENY = 'deny';

    /**
     * @return array<array<string, mixed>>
     */
    public function getInstallerRules(): array
    {
        $installerRules = $this->addMerchantPortalInstallerRules($installerRules);
        return $installerRules;
    }

    /**
     * @param array<array<string, mixed>> $installerRules
     *
     * @return array<array<string, mixed>>
     */
    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'merchant-app-merchant-portal-gui',
        ];

        foreach ($bundleNames as $bundleName) {
            $installerRules[] = [
                'bundle' => $bundleName,
                'controller' => AclConstants::VALIDATOR_WILDCARD,
                'action' => AclConstants::VALIDATOR_WILDCARD,
                'type' => static::RULE_TYPE_DENY,
                'role' => AclConstants::ROOT_ROLE,
            ];
        }
        return $installerRules;
    }
```

</details>

{% info_block warningBox "Verification" %}

Make sure there is the **Payment Settings** button in the Merchant Portal navigation.

{% endinfo_block %}

4. Enable the message broker worker channels:

**src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php**

```php
<?php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            'merchant-commands',
            'merchant-app-events',
        ];
    }
}

```

5. Enable order expenses for the merchant payout:

**src/Pyz/Zed/SalesPaymentMerchant/SalesPaymentMerchantConfig.php**

```php
<?php

namespace Pyz\Zed\SalesPaymentMerchant;

use Spryker\Shared\Shipment\ShipmentConfig;
use Spryker\Zed\SalesPaymentMerchant\SalesPaymentMerchantConfig as SprykerSalesPaymentMerchantConfig;

class SalesPaymentMerchantConfig extends SprykerSalesPaymentMerchantConfig
{
    /**
     * @var bool
     */
    protected const ORDER_EXPENSE_INCLUDED_IN_PAYMENT_PROCESS = true;

    /**
     * @var array<string, list<string>>
     */
    protected const EXCLUDED_EXPENSE_TYPES_FOR_STORE = [
        'YOUR_STORE_NAME' => [ShipmentConfig::SHIPMENT_EXPENSE_TYPE],
    ];
}
```

{% info_block warningBox "Verification" %}

Verify that the order expenses are included in the merchant payout process:

1. Place an order with products from different merchants.
2. Pass the merchant payout stage for the order.
  In the `spy_sales_payment_merchant_payout` database table, make sure the merchant payout amounts have been applied to each merchant product in your order. The order expenses should be included in the merchant payout process as a separate entry in the `spy_sales_payment_merchant_payout` database table.
3. Refund the order.
  In the `spy_sales_payment_merchant_payout_reversal` database table, make sure the refunded merchant payout amounts have been applied to each merchant product in your order. If there're no merchant order items left for the refund, the refunded order expenses should be included in the merchant payout process as a separate entry in the `spy_sales_payment_merchant_payout_reversal` database table.

4. Repeat steps 1-3 for a store with excluded expense types and make sure the following applies:
- The order expenses with the excluded expense types are not included in the merchant payout process.
- The order expenses are not included in the merchant payout process as a separate entry in the `spy_sales_payment_merchant_payout` database table.
- The refunded order expenses are not included in the merchant reverse payout process as a separate entry in the `spy_sales_payment_merchant_payout_reversal` database table.

{% endinfo_block %}

### 4) Add Zed translations

Generate new translation cache for Zed:

```bash
console translator:generate-cache
```

### 5) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                                    | DESCRIPTION                                                                                                           | PREREQUISITES | NAMESPACE                                                                       |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------|
| MerchantProfileMerchantBulkExpanderPlugin                 | Expands merchants with profile data.                                                                                  |               | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant                       |
| MerchantProfileMerchantPostCreatePlugin                   | Creates merchant profile on merchant create action.                                                                   |               | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant                       |
| MerchantProfileMerchantPostUpdatePlugin                   | Updates merchant profile on merchant update action.m                                                                  |               | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant                       |
| MerchantProfileContactPersonFormTabExpanderPlugin         | Adds the tab for editing and creating contact person data to merchant edit and create forms.                          |               | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs            |
| MerchantProfileFormTabExpanderPlugin                      | Adds the tab for editing and creating merchant profile data to merchant edit and create forms.                        |               | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs            |
| MerchantProfileLegalInformationFormTabExpanderPlugin      | Adds the tab for editing and creating merchant legal information to merchant edit and create forms.                   |               | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs            |
| MerchantProfileFormExpanderPlugin                         | Expands the MerchantForm with merchant profile fields.                                                                |               | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui                 |
| SyncMerchantUsersStatusMerchantPostUpdatePlugin           | Updates merchant users status by merchant status on merchant update.                                                  |               | Spryker\Zed\MerchantUser\Communication\Plugin\Merchant                          |
| MerchantUserTabMerchantFormTabExpanderPlugin              | Adds an extra tab to merchant edit and create forms for editing and creating merchant user information.               |               | Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui                    |
| MerchantUserViewMerchantUpdateFormViewExpanderPlugin      | Expands the merchant `FormView` with the data for the merchant user tab.                                              |               | Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui                    |
| MerchantUserTwigPlugin                                    | Adds the 'merchantName' global Twig variable.                                                                         |               | Spryker\Zed\MerchantUser\Communication\Plugin\Twig                              |
| MerchantAppRequestExpanderPlugin                          | Adds the MerchantReference to the `AcpRequestRansfer` header when a current merchant user is available.               |               | Spryker\Zed\MerchantApp\Communication\Plugin\KernelApp                          |
| MerchantAppOnboardingMessageHandlerPlugin                 | Handels the merchant onboarding events.                                                                               |               | Spryker\Zed\MerchantApp\Communication\Plugin\MessageBroker                      |
| MerchantPayoutCommandByOrderPlugin                        | Sends a synchronous request to the PSP App to perform money transfers to merchants.                                   |               | Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Command               |
| MerchantPayoutReverseCommandByOrderPlugin                 | Send a synchronous Request to the PSP App to do refund of previously made money transfers to merchants.               |               | Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Command               |
| IsMerchantPaidOutConditionPlugin                          | Checks if the used payment method is configured to support payout.                                                    |               | Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Condition             |
| IsMerchantPayoutReversedConditionPlugin                   | Checks if the used payment method is configured to support reverse payout.                                            |               | Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Condition             |

<details>
  <summary>src/Pyz/Zed/Merchant/MerchantDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Merchant;

use Spryker\Zed\Merchant\MerchantDependencyProvider as SprykerMerchantDependencyProvider;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileMerchantBulkExpanderPlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileMerchantPostCreatePlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileMerchantPostUpdatePlugin;
use Spryker\Zed\MerchantUser\Communication\Plugin\Merchant\SyncMerchantUsersStatusMerchantPostUpdatePlugin;

class MerchantDependencyProvider extends SprykerMerchantDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostCreatePluginInterface>
     */
    protected function getMerchantPostCreatePlugins(): array
    {
        return [
            new MerchantProfileMerchantPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostUpdatePluginInterface>
     */
    protected function getMerchantPostUpdatePlugins(): array
    {
        return [
            new MerchantProfileMerchantPostUpdatePlugin(),
            new SyncMerchantUsersStatusMerchantPostUpdatePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantBulkExpanderPluginInterface>
     */
    protected function getMerchantBulkExpanderPlugins(): array
    {
        return [
            new MerchantProfileMerchantBulkExpanderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure the following applies:

- When you create a merchant using `MerchantFacade::createMerchant()`, its profile also gets created.
- When you update a merchant using `MerchantFacade::updateMerchant()`, its profile also gets updated.
- When you fetch a merchant using `MerchantFacade::findOne()`, its profile data also gets fetched.

{% endinfo_block %}

<details><summary>src/Pyz/Zed/MerchantGui/MerchantGuiDependencyProvider.php</summary>

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
     * @return array<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormExpanderPluginInterface>
     */
    protected function getMerchantFormExpanderPlugins(): array
    {
        return [
            new MerchantProfileFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormTabExpanderPluginInterface>
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
     * @return array<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantUpdateFormViewExpanderPluginInterface>
     */
    protected function getMerchantUpdateFormViewExpanderPlugins(): array
    {
        return [
            new MerchantUserViewMerchantUpdateFormViewExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantUpdateFormViewExpanderPluginInterface>
     */
    protected function getMerchantViewFormViewExpanderPlugins(): array
    {
        return [
            new MerchantUserViewMerchantUpdateFormViewExpanderPlugin(),
        ];
    }

}

```

</details>

{% info_block warningBox "Verification" %}

Make sure that, on the **Edit Merchant: `merchant_id`** and **View Merchant: `merchant_id`** pages in the Back Office, you can see the following tabs:

- **Contact Person**
- **Merchant Profile**
- **Legal Information**
- **Merchant User**

{% endinfo_block %}

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\MerchantUser\Communication\Plugin\Twig\MerchantUserTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new MerchantUserTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `merchantName` global Twig variable is available.

{% endinfo_block %}

<details><summary>src/Pyz/Zed/KernelApp/KernelAppDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\KernelApp;

use Spryker\Zed\KernelApp\KernelAppDependencyProvider as SprykerKernelAppDependencyProvider;
use Spryker\Zed\MerchantApp\Communication\Plugin\KernelApp\MerchantAppRequestExpanderPlugin;

class KernelAppDependencyProvider extends SprykerKernelAppDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\KernelAppExtension\RequestExpanderPluginInterface>
     */
    public function getRequestExpanderPlugins(): array
    {
        return [
            new MerchantAppRequestExpanderPlugin(),
        ];
    }
}
```

<details><summary>src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MerchantApp\Communication\Plugin\MessageBroker\MerchantAppOnboardingMessageHandlerPlugin;
use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;

/**
 * @method \Pyz\Zed\MessageBroker\MessageBrokerConfig getConfig()
 */
class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            new MerchantAppOnboardingMessageHandlerPlugin(),
        ];
    }
}
```

<details><summary>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Command\MerchantPayoutCommandByOrderPlugin;
use Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Command\MerchantPayoutReverseCommandByOrderPlugin;
use Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Condition\IsMerchantPaidOutConditionPlugin;
use Spryker\Zed\SalesPaymentMerchant\Communication\Plugin\Oms\Condition\IsMerchantPayoutReversedConditionPlugin;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Kernel\Container;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{


    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new MerchantPayoutCommandByOrderPlugin(), 'SalesPaymentMerchant/Payout');
            $commandCollection->add(new MerchantPayoutReverseCommandByOrderPlugin(), 'SalesPaymentMerchant/ReversePayout');

            return $commandCollection;
        });

        return $container;
    }

     /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            $conditionCollection->add(new IsMerchantPaidOutConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPaidOut');
            $conditionCollection->add(new IsMerchantPayoutReversedConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPayoutReversed');

            return $conditionCollection;
        });

        return $container;
    }

}
```

2. Based on your payment service provider, integrate the OMS commands and conditions for the merchant payout and reverse payout into your process.


{% info_block warningBox "Verification" %}

Verify that the OMS works as expected for merchant payout and reverse payout commands and conditions:

1. Place an order with products from different merchants.
2. Pass the merchant payout stage for the order.
3. In the `spy_sales_payment_merchant_payout` database table, make sure the merchant payout amounts have been applied to each merchant product in your order.
4. Refund for the order.
5. In the `spy_sales_payment_merchant_payout_reversal` database table, make sure the refunded merchant payout amounts have been applied to each merchant product in your order.

{% endinfo_block %}

#### Optional: Enable the Backend API authentication

1. [Integrate Glue authentication](/docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html).


2. Register the following plugins:

| PLUGIN                                               | SPECIFICATION                                        | PREREQUISITES | NAMESPACE                                                             |
|------------------------------------------------------|------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| MerchantUserTypeOauthScopeAuthorizationCheckerPlugin | Authorizes user by merchant user scopes.             |               | Spryker\Zed\OauthMerchantUser\Communication\Plugin\OauthUserConnector |
| MerchantUserTypeOauthScopeProviderPlugin             | Provides the OAuth scopes related to merchant users. |               | Spryker\Zed\OauthMerchantUser\Communication\Plugin\OauthUserConnector |

**src/Pyz/Zed/OauthUserConnector/OauthUserConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\OauthUserConnector;

use Spryker\Zed\OauthMerchantUser\Communication\Plugin\OauthUserConnector\MerchantUserTypeOauthScopeAuthorizationCheckerPlugin;
use Spryker\Zed\OauthMerchantUser\Communication\Plugin\OauthUserConnector\MerchantUserTypeOauthScopeProviderPlugin;
use Spryker\Zed\OauthUserConnector\OauthUserConnectorDependencyProvider as SprykerOauthUserConnectorDependencyProvider;

class OauthUserConnectorDependencyProvider extends SprykerOauthUserConnectorDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\OauthUserConnectorExtension\Dependency\Plugin\UserTypeOauthScopeProviderPluginInterface>
     */
    protected function getUserTypeOauthScopeProviderPlugins(): array
    {
        return [
            new MerchantUserTypeOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\OauthUserConnectorExtension\Dependency\Plugin\UserTypeOauthScopeAuthorizationCheckerPluginInterface>
     */
    protected function getUserTypeOauthScopeAuthorizationCheckerPlugins(): array
    {
        return [
            new MerchantUserTypeOauthScopeAuthorizationCheckerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Authenticate as a merchant user:

`POST https://glue-backend.mysprykershop.com/token`

```json
{
    "data": {
        "type": "token",
        "attributes": {
            "grant_type": "password",
            "username": {% raw %}{{{% endraw %}username{% raw %}}}{% endraw %},
            "password": {% raw %}{{{% endraw %}password{% raw %}}}{% endraw %},
        }
    }
}
```

Make sure the output contains the 201 response with a valid token. Make sure that the warehouse user can assess only the
endpoints specified in **src/Pyz/Zed/OauthMerchantUser/OauthMerchantUserConfig.php**.

{% endinfo_block %}

### 6) Configure navigation

1. Add the marketplace section to the navigation:

<details>
  <summary>config/Zed/navigation.xml</summary>

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
    <merchant-portal-payment-settings>
        <label>Payment Settings</label>
        <title>Payment Settings</title>
        <icon>payment</icon>
        <bundle>merchant-app-merchant-portal-gui</bundle>
        <controller>payment-settings</controller>
        <action>index</action>
        <pages>
            <onboarding>
                <label>Onboarding</label>
                <title>Onboarding</title>
                <icon>payment</icon>
                <bundle>merchant-app-merchant-portal-gui</bundle>
                <controller>payment-settings</controller>
                <action>onboarding</action>
                <visible>0</visible>
            </onboarding>
        </pages>
    </merchant-portal-payment-settings>
</config>
```

</details>

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure there is the **Marketplace** button in the Back Office navigation.
Make sure there is the **Payment Settings** button in the Merchant Portal navigation.

{% endinfo_block %}

### 7) Import data

To import data follow the steps in the following sections.

#### Import merchant profile data

1. Prepare merchant profile data according to your requirements using the demo data:

<details>
<summary>/data/import/common/common/marketplace/merchant_profile.csv</summary>

```csv
merchant_reference,contact_person_role,contact_person_title,contact_person_first_name,contact_person_last_name,contact_person_phone,banner_url,logo_url,public_email,public_phone,description_glossary_key.en_US,description_glossary_key.de_DE,banner_url_glossary_key.en_US,banner_url_glossary_key.de_DE,delivery_time_glossary_key.en_US,delivery_time_glossary_key.de_DE,terms_conditions_glossary_key.en_US,terms_conditions_glossary_key.de_DE,cancellation_policy_glossary_key.en_US,cancellation_policy_glossary_key.de_DE,imprint_glossary_key.en_US,imprint_glossary_key.de_DE,data_privacy_glossary_key.en_US,data_privacy_glossary_key.de_DE,is_active,fax_number
MER000001,E-Commerce Manager,Mr,Harald,Schmidt,+49 30 208498350,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png,info@spryker.com,+49 30 234567891,Spryker is the main merchant at the Demo Marketplace.,Spryker ist der Haupthändler auf dem Demo-Marktplatz.,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,1-3 days,1-3 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-Email. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.","<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Represented by<br>Managing Directors: Alexander Graf, Boris Lokschin<br>Register Court: Hamburg<br>Register Number: HRB 134310<br></p>","<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Vertreten durch<br>Geschäftsführer: Alexander Graf, Boris Lokschin<br>Registergericht: Hamburg<br>Registernummer: HRB 134310<br></p>",Spryker Systems GmbH values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Spryker Systems GmbH.,1,+49 30 234567800
MER000002,Country Manager DE,Ms,Martha,Farmer,+31 123 345 678,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-logo.png,hi@video-king.nl,+31 123 345 777,"Video King is a premium provider of video equipment. In business since 2010, we understand the needs of video professionals and enthusiasts and offer a wide variety of products with competitive prices. ","Video King ist ein Premium-Anbieter von Videogeräten. Wir sind seit 2010 im Geschäft, verstehen die Bedürfnisse von Videoprofis und -enthusiasten und bieten eine große Auswahl an Produkten zu wettbewerbsfähigen Preisen an. ",https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,2-4 days,2-4 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-Email. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Video King<br><br>Gilzeweg 24<br>4854SG Bavel<br>NL <br><br>Phone: +31 123 45 6789<br>Email: hi@video-king.nl<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Amsterdam<br>Register Number: 1234.4567<br></p>,<p>Video King<br><br>Gilzeweg 24<br>4854SG Bavel<br>NL<br><br>Telefon: +31 123 45 6789<br>Email: hi@video-king.nl<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: Amsterdam<br>Registernummer: 1234.4567<br></p>,Video King values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Video King.,1,+31 123 345 733
MER000006,Brand Manager,Ms,Michele,Nemeth,030/123456789,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-logo.png,support@sony-experts.com,+49 30 234567691,"Capture your moment with the best cameras from Sony. From pocket-size to professional-style, they all pack features to deliver the best quality pictures.
Discover the range of Sony cameras, lenses and accessories, and capture your favorite moments with precision and style with the best cameras can offer.","Halten Sie Ihren Moment mit den besten Kameras von Sony fest. Vom Taschenformat bis hin zum professionellen Stil bieten sie alle Funktionen, um Bilder in bester Qualität zu liefern.
Entdecken Sie das Angebot an Kameras, Objektiven und Zubehör von Sony und fangen Sie Ihre Lieblingsmomente mit Präzision und Stil mit den besten Kameras ein, die das Unternehmen zu bieten hat.",https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,1-3 days,1-3 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-Email. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Munich<br>Register Number: HYY 134306<br></p>,<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: München<br>Registernummer: HYY 134306<br></p>,Sony Experts values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Sony Experts.,1,+49 30 234567600
MER000004,,,,,,,,,,,,,,,,,,,,,,,,0,
MER000003,,,,,,,,,,,,,,,,,,,,,,,,0,
MER000007,,,,,,,,,,,,,,,,,,,,,,,,0,
MER000005,Merchandise Manager,Mr,Jason,Weidmann,030/123456789,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-logo.png,support@budgetcamerasonline.com,+49 30 234567591,"DSLR and mirrorless cameras are by far the most popular with filmmakers on a tight budget when you can't afford multiple specialist cameras.
Budget Cameras is offering a great selection of digital cameras with the lowest prices.","DSLR- und spiegellose Kameras sind bei Filmemachern mit knappem Budget bei weitem am beliebtesten, wenn sie sich bestimmte Spezialkameras nicht leisten können.
Budget Cameras bietet eine große Auswahl an Digitalkameras mit den niedrigsten Preisen.",https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,2-4 days,2-4 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-Email. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Budget Cameras<br><br>Spitalerstraße 3<br>20095 Hamburg<br>DE<br><br>Phone: 030 1234567<br>Email: support@budgetcamerasonline.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Hamburg<br>Register Number: HXX 134305<br></p>,<p>Budget Cameras<br><br>Spitalerstraße 3<br>20095 Hamburg<br>DE<br><br>Phone: 030 1234567<br>Email: support@budgetcamerasonline.com<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: Hamburg<br>Registernummer: HXX 134305<br></p>,Budget Cameras values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Budget Cameras.,1,+49 30 234567500
```

</details>

| COLUMN                                 | REQUIRED | DATA TYPE | DATA EXAMPLE                    | DATA EXPLANATION                                                          |
|----------------------------------------|----------|-----------|---------------------------------|---------------------------------------------------------------------------|
| merchant_reference                     | &check;  | String    | MER000007                       | Merchant identifier.                                                      |
| contact_person_role                    |          | String    | E-Commerce Manager              | Role of the contact person of a merchant.                                 |
| contact_person_title                   |          | String    | Mr                              | The title shown for the contact person of a merchant.                     |
| contact_person_first_name              |          | String    | Harald                          | First name of the contact person of a merchant.                           |
| contact_person_last_name               |          | String    | Schmidt                         | Last name of the contact person of a merchant.                            |
| contact_person_phone                   |          | String    | 030 234567891a                  | Phone number of the contact person of a merchant.                         |
| banner_url                             |          | String    | `http://cdn-link/banner.png`    | Default banner URL of a merchant if a locale specific one does not exist. |
| logo_url                               |          | String    | `http://cdn-link/logo.png`      | Logo URL of a merchant.                                                   |
| public_email                           |          | String    | `email@merchant-domain.com`     | Public email for communication of a merchant.                             |
| public_phone                           |          | String    | 030 234567891                   | Public phone for communication of a merchant.                             |
| description_glossary_key.en_US         |          | String    | Lorem ipsum dolor sit amet      | Description of a merchant in the en_US locale.                            |
| description_glossary_key.de_DE         |          | String    | Lorem ipsum dolor sit amet      | Description of a merchant in the de_DE locale.                            |
| banner_url_glossary_key.en_US          |          | String    | `http://cdn-link/en-banner.png` | Locale specific banner URL of a merchant.                                 |
| banner_url_glossary_key.de_DE          |          | String    | `http://cdn-link/en-banner.png` | Locale specific banner URL of a merchant.                                 |
| delivery_time_glossary_key.en_US       |          | String    | 1-3 days                        | Average delivery time of a merchant in the en_US locale.                  |
| delivery_time_glossary_key.de_DE       |          | String    | 1-3 days                        | Average delivery time of a merchant in the de_DE locale.                  |
| terms_conditions_glossary_key.en_US    |          | String    | Lorem ipsum dolor sit amet      | Terms and conditions of a merchant in the en_US locale.                   |
| terms_conditions_glossary_key.de_DE    |          | String    | Lorem ipsum dolor sit amet      | Terms and conditions of a merchant in the de_DE locale.                   |
| cancellation_policy_glossary_key.en_US |          | String    | Lorem ipsum dolor sit amet      | Cancellation policy of a merchant in the en_US locale.                    |
| cancellation_policy_glossary_key.de_DE |          | String    | Lorem ipsum dolor sit amet      | Cancellation policy of a merchant in the de_DE locale.                    |
| imprint_glossary_key.en_US             |          | String    | Lorem ipsum dolor sit amet      | Imprint of a merchant in the en_US locale.                                |
| imprint_glossary_key.de_DE             |          | String    | Lorem ipsum dolor sit amet      | Imprint of a merchant in the de_DE locale.                                |
| data_privacy_glossary_key.en_US        |          | String    | Lorem ipsum dolor sit amet      | Data privacy statement of a merchant in the en_US locale.                 |
| data_privacy_glossary_key.de_DE        |          | String    | Lorem ipsum dolor sit amet      | Data privacy statement of a merchant in the de_DE locale.                 |
| fax_number                             |          | String    | 030 234567800                   | Fax number of a merchant.                                                 |

2. Prepare merchant profile address data according to your requirements using the demo data:

**/data/import/common/common/marketplace/merchant_profile_address.csv**

```csv
merchant_reference,country_iso2_code,country_iso3_code,address1,address2,address3,city,zip_code,longitude,latitude
MER000001,DE,DEU,Julie-Wolfthorn-Straße,1,,Berlin,10115,52.534105,13.384458
MER000002,NL,,Gilzeweg,24,,Bavel,4854SG,51.558107,4.838470
MER000006,DE,DEU,Matthias-Pschorr-Straße,1,,München,80336,48.131058,11.547788
MER000005,DE,DEU,Spitalerstraße,3,,Berlin,10115,,
MER000004,DE,DEU,Caroline-Michaelis-Straße,8,,Hamburg,20095,,
MER000003,DE,DEU,Caroline-Michaelis-Straße,8,,Berlin,10115,,
MER000007,DE,DEU,Caroline-Michaelis-Straße,8,,Berlin,10115,53.552463,10.004663
```

| COLUMN             | REQUIRED | DATA TYPE | DATA EXAMPLE              | DATA EXPLANATION                          |
|--------------------|----------|-----------|---------------------------|-------------------------------------------|
| merchant_reference | &check;  | String    | MER000006                 | Merchant identifier.                      |
| country_iso2_code  |          | String    | DE                        | Country ISO-2 code the address exists in. |
| country_iso3_code  |          | String    | DEU                       | Country ISO-3 code the address exists in. |
| address1           |          | String    | Caroline-Michaelis-Straße | Address line 1 of a merchant.             |
| address2           |          | String    | 8                         | Address line 2 of a merchant.             |
| address3           |          | String    | Second floor              | Address line 3 of a merchant.             |
| city               |          | String    | Berlin                    | City address of a merchant.               |
| zip_code           |          | String    | 10115                     | Zip code address of a merchant.           |
| longitude          |          | String    | 52.534105                 | Longitude value of a merchant.            |
| latitude           |          | String    | 13.384458                 | Latitude value of a merchant.             |

3. Register the following plugins to enable data import:

| PLUGIN                                 | SPECIFICATION                                            | PREREQUISITES | NAMESPACE                                                  |
|----------------------------------------|----------------------------------------------------------|---------------|------------------------------------------------------------|
| MerchantProfileDataImportPlugin        | Imports merchant profile data into the database.         |               | Spryker\Zed\MerchantProfileDataImport\Communication\Plugin |
| MerchantProfileAddressDataImportPlugin | Imports merchant profile address data into the database. |               | Spryker\Zed\MerchantProfileDataImport\Communication\Plugin |

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
console data:import merchant-profile-address
```

#### Import merchant users

1. Prepare merchant user data according to your requirements using the demo data:

**/data/import/common/common/marketplace/merchant_user.csv**

```csv
merchant_reference,username
MER000006,michele@sony-experts.com
```

| COLUMN             | REQUIRED | DATA TYPE | DATA EXAMPLE               | DATA EXPLANATION                                                                                                            |
|--------------------|----------|-----------|----------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| merchant_reference | &check;  | String    | MER000006                  | Identifier of the merchant in the system. Have to be unique.                                                                |
| username           | &check;  | String    | `michele@sony-experts.com` | Username of the merchant user. It is an email address that is used for logging into the Merchant Portal as a merchant user. |

2. Create the Step model for writing merchant user data:

<details>
<summary>src/Pyz/Zed/DataImport/Business/Model/MerchantUser/MerchantUserWriterStep.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\MerchantUser;

use Generated\Shared\Transfer\MerchantUserCriteriaTransfer;
use Generated\Shared\Transfer\MerchantUserTransfer;
use Generated\Shared\Transfer\UserCriteriaTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\User\Persistence\SpyUserQuery;
use Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\MerchantUser\Business\MerchantUserFacadeInterface;

class MerchantUserWriterStep implements DataImportStepInterface
{
    /**
     * @var \Spryker\Zed\MerchantUser\Business\MerchantUserFacadeInterface
     */
    protected $merchantUserFacade;

    /**
     * @param \Spryker\Zed\MerchantUser\Business\MerchantUserFacadeInterface $merchantUserFacade
     */
    public function __construct(MerchantUserFacadeInterface $merchantUserFacade)
    {
        $this->merchantUserFacade = $merchantUserFacade;
    }

    protected const MERCHANT_REFERENCE = 'merchant_reference';
    protected const USERNAME = 'username';

    /**
     * @inheritDoc
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $idMerchant = $this->getIdMerchantByReference($dataSet[static::MERCHANT_REFERENCE]);
        $idUser = $this->getIdUserByUsername($dataSet[static::USERNAME]);

        $merchantUserTransfer = $this->merchantUserFacade->findMerchantUser(
            (new MerchantUserCriteriaTransfer())
                ->setIdUser($idUser)
                ->setIdMerchant($idMerchant)
        );

        if (!$merchantUserTransfer) {
            $userTransfer = $this->merchantUserFacade->findUser(
                (new UserCriteriaTransfer())->setIdUser($idUser)
            );

            $this->merchantUserFacade->createMerchantUser(
                (new MerchantUserTransfer())
                    ->setIdMerchant($idMerchant)
                    ->setUser($userTransfer)
            );
        }
    }

    /**
     * @param string $merchantReference
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException
     *
     * @return int
     */
    protected function getIdMerchantByReference(string $merchantReference): int
    {
        $merchantEntity = SpyMerchantQuery::create()
            ->findOneByMerchantReference($merchantReference);

        if (!$merchantEntity) {
            throw new EntityNotFoundException(sprintf('Merchant with reference "%s" is not found.', $merchantReference));
        }

        return $merchantEntity->getIdMerchant();
    }

    /**
     * @param string $username
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException
     *
     * @return int
     */
    protected function getIdUserByUsername(string $username): int
    {
        $userEntity = SpyUserQuery::create()
            ->findOneByUsername($username);

        if (!$userEntity) {
            throw new EntityNotFoundException(sprintf('User with username "%s" is not found.', $username));
        }

        return $userEntity->getIdUser();
    }
}
```

</details>

3. Optional: Add the merchant user import type to full import:

**src/Pyz/Zed/DataImport/DataImportConfig.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 */
class DataImportConfig extends SprykerDataImportConfig
{
    public const IMPORT_TYPE_MERCHANT_USER = 'merchant-user';

    /**
     * @return array<string>
     */
    public function getFullImportTypes(): array
    {
        return [
            static::IMPORT_TYPE_MERCHANT_USER,
        ];
    }
}
```

4. Enable the merchant user data import command:

<details>
<summary>src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport\Business;

use Generated\Shared\Transfer\DataImportConfigurationActionTransfer;
use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\DataImport\Business\DataImportBusinessFactory as SprykerDataImportBusinessFactory;
use Spryker\Zed\DataImport\Business\Model\DataImporterInterface;
use Pyz\Zed\DataImport\Business\Model\MerchantUser\MerchantUserWriterStep;
use Pyz\Zed\DataImport\DataImportConfig;

/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 * @SuppressWarnings(PHPMD.CyclomaticComplexity)
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.ExcessiveClassLength)
 */
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    /**
     * @param \Generated\Shared\Transfer\DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|null
     */
    public function getDataImporterByType(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer): ?DataImporterInterface
    {
        switch ($dataImportConfigurationActionTransfer->getDataEntity()) {
            case DataImportConfig::IMPORT_TYPE_MERCHANT_USER:
                return $this->createMerchantUserImporter($dataImportConfigurationActionTransfer);
            default:
                return null;
        }
    }

    /**
     * @param \Generated\Shared\Transfer\DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    public function createMerchantUserImporter(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer)
    {
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->buildImporterConfigurationByDataImportConfigAction($dataImportConfigurationActionTransfer)
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep(new MerchantUserWriterStep(
            $this->getMerchantUserFacade()
        ));

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\MerchantUser\Business\MerchantUserFacadeInterface
     */
    protected function getMerchantUserFacade(): MerchantUserFacadeInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_MERCHANT_USER);
    }
}
```

</details>

5. Create and prepare your data import configuration files according to your requirements using the demo config
   template:

**data/import/common/marketplace_import_config_EU.yml**

```yml
version: 0

actions:
  - data_entity: merchant-user
    source: data/import/common/common/merchant_user.csv
  - data_entity: merchant-profile
    source: data/import/common/common/marketplace/merchant_profile.csv
  - data_entity: merchant-profile-address
    source: data/import/common/common/marketplace/merchant_profile_address.csv
 ```

6. Import data:

```bash
console data:import merchant-user
```

{% info_block warningBox "Verification" %}

Make sure the data has been added to the following tables:

- `spy_merchant_profile`
- `spy_merchant_profile_address`
- `spy_merchant_user`

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Marketplace Merchant feature frontend.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/marketplace-merchant: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                          |
|-----------------------|---------------------------------------------|
| MerchantProfileWidget | vendor/spryker-shop/merchant-profile-widget |
| MerchantWidget        | vendor/spryker-shop/merchant-widget         |
| MerchantPage          | vendor/spryker-shop/merchant-page           |

{% endinfo_block %}

### 2) Add translations

Add Yves translations:

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```csv
merchant.sold_by,Sold by,en_US
merchant.sold_by,Verkauft durch,de_DE
merchant_profile.email,Email Address,en_US
merchant_profile.email,Email,de_DE
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

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 3) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN               | DESCRIPTION                                                            | PREREQUISITES | NAMESPACE                              |
|----------------------|------------------------------------------------------------------------|---------------|----------------------------------------|
| SoldByMerchantWidget | Shows the list of the offers with their prices for a concrete product. |               | SprykerShop\Yves\MerchantWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantWidget\Widget\SoldByMerchantWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SoldByMerchantWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

To verify `SoldByMerchantWidget` has been registered, make sure the **Sold by merchant:** section is displayed on the
Product Details pages. This also requires
the [Marketplace Product feature to be installed](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html).

{% endinfo_block %}

### 4) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                            | SPECIFICATION                                                                                 | PREREQUISITES | NAMESPACE                            |
|-----------------------------------|-----------------------------------------------------------------------------------------------|---------------|--------------------------------------|
| MerchantPageResourceCreatorPlugin | Allows accessing a merchant page at `https://mysprykershop.com/merchant/{merchantReference}`. |               | SprykerShop\Yves\MerchantPage\Plugin |

**src/Pyz/Yves/StorageRouter/StorageRouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\StorageRouter;

use SprykerShop\Yves\MerchantPage\Plugin\MerchantPageResourceCreatorPlugin;
use SprykerShop\Yves\StorageRouter\StorageRouterDependencyProvider as SprykerShopStorageRouterDependencyProvider;

class StorageRouterDependencyProvider extends SprykerShopStorageRouterDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\StorageRouterExtension\Dependency\Plugin\ResourceCreatorPluginInterface>
     */
    protected function getResourceCreatorPlugins(): array
    {
        return [
            new MerchantPageResourceCreatorPlugin(),
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure merchant profile data is displayed at `https://mysprykershop.com/de/merchant/spryker`.

{% endinfo_block %}

## Install related features

| FEATURE                  | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                                                              |
|--------------------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant API | &check;                          | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-merchant-glue-api.html) |
