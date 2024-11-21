


This document describes how to install the Amazon Quicksight module.

## Install feature core 

Follow the steps below to install the Amazon Quicksight module core.

### Prerequisites
Install the required features:

| NAME                     | VERSION          | INSTALLATION GUIDE                                                                                                                                                              |
|--------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Analytics                | {{page.version}} | [Install the Analytics feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-analytics-feature.html)                           |
| Spryker Core Back Office | {{page.version}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-spryker-core-back-office-feature.html) |

### 1) Install the required modules

Run the following command to install the required module:

```bash
composer require spryker-eco/amazon-quicksight:"^2.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE           | EXPECTED DIRECTORY                   |
|------------------|--------------------------------------|
| AmazonQuicksight | vendor/spryker-eco/amazon-quicksight |

{% endinfo_block %}

### 2) Set up the configuration

Add your Quicksight asset bundle to to one of the directories, for example `src/Pyz/Zed/AmazonQuicksight/data/asset-bundle.zip`.

You can find the preconfigured asset bundles based on the corresponding demoshops by the following links:

- B2B Marketplace
- B2B
- B2C Marketplace
- B2C

{% info_block warningBox "Asset bundles" %}

It is supposed that the basic features are in place for the corresponding demoshops, otherwise some of the visuals may not be displayed correctly.

{% endinfo_block %}

Configure the path to the asset bundle:

**src/Pyz/Zed/AmazonQuicksight/AmazonQuicksightConfig.php**

```php
<?php

namespace Pyz\Zed\AmazonQuicksight;

use SprykerEco\Zed\AmazonQuicksight\AmazonQuicksightConfig as SprykerEcoAmazonQuicksightConfig;

class AmazonQuicksightConfig extends SprykerEcoAmazonQuicksightConfig
{
    /**
     * @var string
     */
    protected const ASSET_BUNDLE_IMPORT_FILE_PATH = '%s/src/Pyz/Zed/AmazonQuicksight/data/asset-bundle.zip';

    /**
     * @return string
     */
    public function getAssetBundleImportFilePath(): string
    {
        return sprintf(static::ASSET_BUNDLE_IMPORT_FILE_PATH, APPLICATION_ROOT_DIR);
    }
}
```

In order the asset bundle import is executed properly it is required to configure the data sets and data source IDs from the asset bundle files. Add the following configuration:

**src/Pyz/Zed/AmazonQuicksight/AmazonQuicksightConfig.php**

<details>
<summary>B2B Marketplace</summary>

```php
<?php

namespace Pyz\Zed\AmazonQuicksight;

use SprykerEco\Zed\AmazonQuicksight\AmazonQuicksightConfig as SprykerEcoAmazonQuicksightConfig;

class AmazonQuicksightConfig extends SprykerEcoAmazonQuicksightConfig
{
    /**
     * @var list<string>
     */
    protected const ASSET_BUNDLE_IMPORT_DELETE_DATA_SET_IDS = [
        'SprykerB2BMPDefaultDatasetCategoryLocalizedProductAbstract',
        'SprykerB2BMPDefaultDatasetCompany',
        'SprykerB2BMPDefaultDatasetCustomer',
        'SprykerB2BMPDefaultDatasetCustomerAddress',
        'SprykerB2BMPDefaultDatasetMerchantCommission',
        'SprykerB2BMPDefaultDatasetMerchantOrder',
        'SprykerB2BMPDefaultDatasetMerchantOrderCategory',
        'SprykerB2BMPDefaultDatasetMerchantOrderItems',
        'SprykerB2BMPDefaultDatasetMerchantProductOffer',
        'SprykerB2BMPDefaultDatasetMerchantProductProductAbstract',
        'SprykerB2BMPDefaultDatasetMerchantStore',
        'SprykerB2BMPDefaultDatasetOrderDiscounts',
        'SprykerB2BMPDefaultDatasetOrderItemCategoryProductBrand',
        'SprykerB2BMPDefaultDatasetOrderItemLocalizedProductConcrete',
        'SprykerB2BMPDefaultDatasetOrderItemProductCategory',
        'SprykerB2BMPDefaultDatasetOrderItemsReturnDate',
        'SprykerB2BMPDefaultDatasetOrderItemState',
        'SprykerB2BMPDefaultDatasetOrderItemStateCustomers',
        'SprykerB2BMPDefaultDatasetOrderItemStateHistory',
        'SprykerB2BMPDefaultDatasetOrderPaymentMethods',
        'SprykerB2BMPDefaultDatasetOrderReturns',
        'SprykerB2BMPDefaultDatasetOrderReturnsProductConcrete',
        'SprykerB2BMPDefaultDatasetOrderShipmentMethods',
        'SprykerB2BMPDefaultDatasetOrderTotalsCustomerCompany',
        'SprykerB2BMPDefaultDatasetOrderTotalsCustomSQL',
        'SprykerB2BMPDefaultDatasetProductConcreteAvailability',
        'SprykerB2BMPDefaultDatasetProductConcreteStore',
        'SprykerB2BMPDefaultDatasetQuoteProducts',
        'SprykerB2BMPDefaultDatasetShoppingListProducts',
    ];

    /**
     * @var string
     */
    protected const DEFAULT_ASSET_BUNDLE_IMPORT_JOB_ID = 'SprykerB2BMPDefaultDataSource';
}
```
</details>

<details>
<summary>B2B</summary>

```php
<?php

namespace Pyz\Zed\AmazonQuicksight;

use SprykerEco\Zed\AmazonQuicksight\AmazonQuicksightConfig as SprykerEcoAmazonQuicksightConfig;

class AmazonQuicksightConfig extends SprykerEcoAmazonQuicksightConfig
{
    /**
     * @var list<string>
     */
    protected const ASSET_BUNDLE_IMPORT_DELETE_DATA_SET_IDS = [
        'SprykerB2BDefaultDatasetOrderShipmentMethods',
        'SprykerB2BDefaultDatasetOrderReturnsProductConcrete',
        'SprykerB2BDefaultDatasetOrderReturns',
        'SprykerB2BDefaultDatasetOrderItemCategoryProductBrand',
        'SprykerB2BDefaultDatasetOrderItemLocalizedProductConcrete',
        'SprykerB2BDefaultDatasetOrderItemProductCategory',
        'SprykerB2BDefaultDatasetOrderItemsReturnDate',
        'SprykerB2BDefaultDatasetOrderItemState',
        'SprykerB2BDefaultDatasetOrderItemStateHistory',
        'SprykerB2BDefaultDatasetOrderDiscounts',
        'SprykerB2BDefaultDatasetOrderPaymentMethods',
        'SprykerB2BDefaultDatasetOrderItemStateCustomers',
        'SprykerB2BDefaultDatasetOrderTotalsCustomerCompany',
        'SprykerB2BDefaultDatasetOrderTotalsCustomSQL',
        'SprykerB2BDefaultDatasetCategoryLocalizedProductAbstract',
        'SprykerB2BDefaultDatasetProductConcreteStore',
        'SprykerB2BDefaultDatasetMerchantStore',
        'SprykerB2BDefaultDatasetQuoteProducts',
        'SprykerB2BDefaultDatasetProductConcreteAvailability',
        'SprykerB2BDefaultDatasetCompany',
        'SprykerB2BDefaultDatasetCustomer',
        'SprykerB2BDefaultDatasetCustomerAddress',
    ];

    /**
     * @var string
     */
    protected const DEFAULT_ASSET_BUNDLE_IMPORT_JOB_ID = 'SprykerB2BDefaultDataSource';
}
```
</details>

<details>
<summary>B2C Marketplace</summary>

```php
<?php

namespace Pyz\Zed\AmazonQuicksight;

use SprykerEco\Zed\AmazonQuicksight\AmazonQuicksightConfig as SprykerEcoAmazonQuicksightConfig;

class AmazonQuicksightConfig extends SprykerEcoAmazonQuicksightConfig
{
    /**
     * @var list<string>
     */
    protected const ASSET_BUNDLE_IMPORT_DELETE_DATA_SET_IDS = [
        'SprykerB2CMPDefaultDatasetCategoryLocalizedProductAbstract',
        'SprykerB2CMPDefaultDatasetCustomer',
        'SprykerB2CMPDefaultDatasetCustomerAddress',
        'SprykerB2CMPDefaultDatasetMerchantCommission',
        'SprykerB2CMPDefaultDatasetMerchantOrder',
        'SprykerB2CMPDefaultDatasetMerchantOrderCategory',
        'SprykerB2CMPDefaultDatasetMerchantOrderItems',
        'SprykerB2CMPDefaultDatasetMerchantProductOffer',
        'SprykerB2CMPDefaultDatasetMerchantProductProductAbstract',
        'SprykerB2CMPDefaultDatasetMerchantStore',
        'SprykerB2CMPDefaultDatasetOrderDiscounts',
        'SprykerB2CMPDefaultDatasetOrderItemCategoryProductBrand',
        'SprykerB2CMPDefaultDatasetOrderItemLocalizedProductConcrete',
        'SprykerB2CMPDefaultDatasetOrderItemProductCategory',
        'SprykerB2CMPDefaultDatasetOrderItemsReturnDate',
        'SprykerB2CMPDefaultDatasetOrderItemState',
        'SprykerB2CMPDefaultDatasetOrderItemStateHistory',
        'SprykerB2CMPDefaultDatasetOrderPaymentMethods',
        'SprykerB2CMPDefaultDatasetOrderReturns',
        'SprykerB2CMPDefaultDatasetOrderReturnsProductConcrete',
        'SprykerB2CMPDefaultDatasetOrderShipmentMethods',
        'SprykerB2CMPDefaultDatasetOrderTotalsCustomSQL',
        'SprykerB2CMPDefaultDatasetProductConcreteAvailability',
        'SprykerB2CMPDefaultDatasetProductConcreteStore',
        'SprykerB2CMPDefaultDatasetQuoteProducts',
    ];

    /**
     * @var string
     */
    protected const DEFAULT_ASSET_BUNDLE_IMPORT_JOB_ID = 'SprykerB2CMPDefaultDataSource';
}
```
</details>

<details>
<summary>B2C</summary>

```php
<?php

namespace Pyz\Zed\AmazonQuicksight;

use SprykerEco\Zed\AmazonQuicksight\AmazonQuicksightConfig as SprykerEcoAmazonQuicksightConfig;

class AmazonQuicksightConfig extends SprykerEcoAmazonQuicksightConfig
{
    /**
     * @var list<string>
     */
    protected const ASSET_BUNDLE_IMPORT_DELETE_DATA_SET_IDS = [
        'SprykerB2CDefaultDatasetCategoryLocalizedProductAbstract',
        'SprykerB2CDefaultDatasetCustomer',
        'SprykerB2CDefaultDatasetCustomerAddress',
        'SprykerB2CDefaultDatasetOrderDiscounts',
        'SprykerB2CDefaultDatasetOrderItemCategoryProductBrand',
        'SprykerB2CDefaultDatasetOrderItemLocalizedProductConcrete',
        'SprykerB2CDefaultDatasetOrderItemProductCategory',
        'SprykerB2CDefaultDatasetOrderItemsReturnDate',
        'SprykerB2CDefaultDatasetOrderItemState',
        'SprykerB2CDefaultDatasetOrderItemStateHistory',
        'SprykerB2CDefaultDatasetOrderPaymentMethods',
        'SprykerB2CDefaultDatasetOrderReturns',
        'SprykerB2CDefaultDatasetOrderReturnsProductConcrete',
        'SprykerB2CDefaultDatasetOrderShipmentMethods',
        'SprykerB2CDefaultDatasetOrderTotalsCustomSQL',
        'SprykerB2CDefaultDatasetProductConcreteAvailability',
        'SprykerB2CDefaultDatasetProductConcreteStore',
        'SprykerB2CDefaultDatasetQuoteProducts',
    ];

    /**
     * @var string
     */
    protected const DEFAULT_ASSET_BUNDLE_IMPORT_JOB_ID = 'SprykerB2CDefaultDataSource';
}
```
</details>

{% info_block warningBox "Verification" %}

After finishing the whole integration try to enable the Analytics from Backoffice UI. If the integration is successful:
- the asset bundle import will be started;
- after the import is completed the data sets and data sources with the corresponding IDs will be created;
- after the analytics reset the specified datasets will be deleted and then reimported.

{% endinfo_block %}

Add environment configuration:

| CONFIGURATION                                                     | SPECIFICATION                                                                                   | NAMESPACE                          |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|------------------------------------|
| AmazonQuicksightConstants::AWS_ACCOUNT_ID                         | The ID for the AWS account that contains your Amazon QuickSight account.                        | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_REGION                             | The AWS region that you use for the Amazon QuickSight account.                                  | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_QUICKSIGHT_NAMESPACE               | The name of the Quicksight namespace.                                                           | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_USERNAME           | The default data source username.                                                               | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_PASSWORD           | The default data source password.                                                               | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_NAME      | The default data source database name.                                                          | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_HOST      | The default data source database host.                                                          | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_PORT      | The default data source database port.                                                          | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_VPC_CONNECTION_ARN | The default data source VPC connection ARN.                                                     | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::GENERATE_EMBED_URL_ALLOWED_DOMAINS     | The list of domains allowed for generating embed URLs.                                          | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::QUICKSIGHT_ASSUMED_ROLE_ARN            | The role ARN used by `Aws\Sts\StsClient` to assume a role used for all API calls to Quicksight. | SprykerEco\Shared\AmazonQuicksight |

**config/Shared/config_default.php**

```php
<?php

use SprykerEco\Shared\AmazonQuicksight\AmazonQuicksightConstants;

// -------------------------------- AWS QUICKSIGHT -------------------------------
$config[AmazonQuicksightConstants::AWS_ACCOUNT_ID] = getenv('AWS_ACCOUNT_ID');
$config[AmazonQuicksightConstants::AWS_REGION] = getenv('AWS_REGION');
$config[AmazonQuicksightConstants::AWS_QUICKSIGHT_NAMESPACE] = getenv('QUICKSIGHT_NAMESPACE');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_USERNAME] = getenv('SPRYKER_BI_DB_USER');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_PASSWORD] = getenv('SPRYKER_BI_DB_PASSWORD');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_NAME] = getenv('SPRYKER_DB_DATABASE');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_HOST] = getenv('SPRYKER_DB_RO_REPLICA_HOST');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_PORT] = getenv('SPRYKER_DB_PORT');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_VPC_CONNECTION_ARN] = getenv('QUICKSIGHT_VPC_CONNECTION_ARN');
$config[AmazonQuicksightConstants::GENERATE_EMBED_URL_ALLOWED_DOMAINS] = [
    sprintf('https://%s', getenv('SPRYKER_BE_HOST')),
];
$config[AmazonQuicksightConstants::QUICKSIGHT_ASSUMED_ROLE_ARN] = getenv('QUICKSIGHT_ASSUMED_ROLE_ARN');
```

{% info_block infoBox "Credentials" %}

The recommended way is not to specify the AWS credentials so SDK will attempt to load them from the environment. If you need to specify the credentials, for example for local development, you can do it in the following way:

| CONFIGURATION                                     | SPECIFICATION          | NAMESPACE                          |
|---------------------------------------------------|------------------------|------------------------------------|
| AmazonQuicksightConstants::AWS_CREDENTIALS_KEY    | AWS access key ID.     | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_CREDENTIALS_SECRET | AWS access key secret. | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_CREDENTIALS_TOKEN  | AWS security token.    | SprykerEco\Shared\AmazonQuicksight |

```php
<?php

use SprykerEco\Shared\AmazonQuicksight\AmazonQuicksightConstants;

// -------------------------------- AWS QUICKSIGHT -------------------------------
$config[AmazonQuicksightConstants::AWS_CREDENTIALS_KEY] = getenv('AWS_ACCESS_KEY_ID');
$config[AmazonQuicksightConstants::AWS_CREDENTIALS_SECRET] = getenv('AWS_SECRET_ACCESS_KEY');
$config[AmazonQuicksightConstants::AWS_CREDENTIALS_TOKEN] = getenv('AWS_SESSION_TOKEN');
```

{% endinfo_block %}

### 3) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied by checking your database:

| DATABASE ENTITY                        | TYPE  | EVENT   |
|----------------------------------------|-------|---------|
| spy_quicksight_user                    | table | created |
| spy_quicksight_asset_bundle_import_job | table | created |

Make sure the following changes have been triggered in transfer objects:

| TRANSFER                                                      | TYPE   | EVENT   | PATH                                                                                       |
|---------------------------------------------------------------|--------|---------|--------------------------------------------------------------------------------------------|
| QuicksightUser                                                | class  | created | src/Generated/Shared/Transfer/QuicksightUserTransfer                                       |
| QuicksightUserCriteria                                        | class  | created | src/Generated/Shared/Transfer/QuicksightUserCriteriaTransfer                               |
| QuicksightUserConditions                                      | class  | created | src/Generated/Shared/Transfer/QuicksightUserConditionsTransfer                             |
| QuicksightUserCollection                                      | class  | created | src/Generated/Shared/Transfer/QuicksightUserCollectionTransfer                             |
| QuicksightUserCollectionResponse                              | class  | created | src/Generated/Shared/Transfer/QuicksightUserCollectionResponseTransfer                     |
| QuicksightDeleteUserResponse                                  | class  | created | src/Generated/Shared/Transfer/QuicksightDeleteUserResponseTransfer                         |
| QuicksightDeleteUserRequest                                   | class  | created | src/Generated/Shared/Transfer/QuicksightDeleteUserRequestTransfer                          |
| QuicksightListUsersRequest                                    | class  | created | src/Generated/Shared/Transfer/QuicksightListUsersRequestTransfer                           |
| QuicksightListUsersResponse                                   | class  | created | src/Generated/Shared/Transfer/QuicksightListUsersResponseTransfer                          |
| QuicksightGenerateEmbedUrlRequest                             | class  | created | src/Generated/Shared/Transfer/QuicksightGenerateEmbedUrlRequestTransfer                    |
| QuicksightExperienceConfiguration                             | class  | created | src/Generated/Shared/Transfer/QuicksightExperienceConfigurationTransfer                    |
| QuicksightConsole                                             | class  | created | src/Generated/Shared/Transfer/QuicksightConsoleTransfer                                    |
| QuicksightGenerateEmbedUrlResponse                            | class  | created | src/Generated/Shared/Transfer/QuicksightGenerateEmbedUrlResponseTransfer                   |
| QuicksightEmbedUrl                                            | class  | created | src/Generated/Shared/Transfer/QuicksightEmbedUrlTransfer                                   |
| QuicksightAssetBundleImportJob                                | class  | created | src/Generated/Shared/Transfer/QuicksightAssetBundleImportJobTransfer                       |
| QuicksightAssetBundleImportJobCollection                      | class  | created | src/Generated/Shared/Transfer/QuicksightAssetBundleImportJobCollectionTransfer             |
| QuicksightAssetBundleImportJobCriteria                        | class  | created | src/Generated/Shared/Transfer/QuicksightAssetBundleImportJobCriteriaTransfer               |
| QuicksightAssetBundleImportJobConditions                      | class  | created | src/Generated/Shared/Transfer/QuicksightAssetBundleImportJobConditionsTransfer             |
| QuicksightStartAssetBundleImportJobRequest                    | class  | created | src/Generated/Shared/Transfer/QuicksightStartAssetBundleImportJobRequestTransfer           |
| QuicksightAssetBundleImportSource                             | class  | created | src/Generated/Shared/Transfer/QuicksightAssetBundleImportSourceTransfer                    |
| QuicksightOverrideParameters                                  | class  | created | src/Generated/Shared/Transfer/QuicksightOverrideParametersTransfer                         |
| QuicksightOverrideParametersDataSource                        | class  | created | src/Generated/Shared/Transfer/QuicksightOverrideParametersDataSourceTransfer               |
| QuicksightOverrideParametersDataSourceCredentials             | class  | created | src/Generated/Shared/Transfer/QuicksightOverrideParametersDataSourceCredentialsTransfer    |
| QuicksightOverrideParametersDataSourceCredentialPair          | class  | created | src/Generated/Shared/Transfer/QuicksightOverrideParametersDataSourceCredentialPairTransfer |
| QuicksightOverrideParametersDataSourceParameters              | class  | created | src/Generated/Shared/Transfer/QuicksightOverrideParametersDataSourceCredentialPairTransfer |
| QuicksightOverrideParametersDataSourceMariaDbParameters       | class  | created | src/Generated/Shared/Transfer/QuicksightOverrideParametersDataSourceCredentialPairTransfer |
| QuicksightOverrideParametersDataSourceVpcConnectionProperties | class  | created | src/Generated/Shared/Transfer/QuicksightOverrideParametersDataSourceCredentialPairTransfer |
| QuicksightOverridePermissions                                 | class  | created | src/Generated/Shared/Transfer/QuicksightOverridePermissionsTransfer                        |
| QuicksightOverridePermissionsAnalysis                         | class  | created | src/Generated/Shared/Transfer/QuicksightOverridePermissionsAnalysisTransfer                |
| QuicksightOverridePermissionsDashboard                        | class  | created | src/Generated/Shared/Transfer/QuicksightOverridePermissionsDashboardTransfer               |
| QuicksightOverridePermissionsDataSet                          | class  | created | src/Generated/Shared/Transfer/QuicksightOverridePermissionsDataSetTransfer                 |
| QuicksightOverridePermissionsDataSource                       | class  | created | src/Generated/Shared/Transfer/QuicksightOverridePermissionsDataSourceTransfer              |
| QuicksightPermissions                                         | class  | created | src/Generated/Shared/Transfer/QuicksightPermissionsTransfer                                |
| QuicksightStartAssetBundleImportJobResponse                   | class  | created | src/Generated/Shared/Transfer/QuicksightStartAssetBundleImportJobResponseTransfer          |
| QuicksightDescribeAssetBundleImportJobRequest                 | class  | created | src/Generated/Shared/Transfer/QuicksightDescribeAssetBundleImportJobRequestTransfer        |
| QuicksightDescribeAssetBundleImportJobResponse                | class  | created | src/Generated/Shared/Transfer/QuicksightDescribeAssetBundleImportJobResponseTransfer       |
| EnableQuicksightAnalyticsRequest                              | class  | created | src/Generated/Shared/Transfer/EnableQuicksightAnalyticsRequestTransfer                     |
| EnableQuicksightAnalyticsResponse                             | class  | created | src/Generated/Shared/Transfer/EnableQuicksightAnalyticsResponseTransfer                    |
| ResetQuicksightAnalyticsRequest                               | class  | created | src/Generated/Shared/Transfer/ResetQuicksightAnalyticsRequestTransfer                      |
| ResetQuicksightAnalyticsResponse                              | class  | created | src/Generated/Shared/Transfer/ResetQuicksightAnalyticsResponseTransfer                     |

{% endinfo_block %}

### 4) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 5) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                      | SPECIFICATION                                                                                                        | PREREQUISITES | NAMESPACE                                                         |
|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| QuicksightAnalyticsCollectionExpanderPlugin | Expands the provided `AnalyticsCollectionTransfer` with the Quicksight analytics.                                    |               | SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\AnalyticsGui |
| QuicksightUserExpanderPlugin                | Populates `UserTransfer.quicksightUser` in collection with existing Quicksight users.                                |               | SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User         |
| DeleteQuicksightUserPostUpdatePlugin        | Deletes Quicksight User when quicksight role is deselected for User on user updating or user is deactivated/deleted. |               | SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User         |

**src/Pyz/Zed/AnalyticsGui/AnalyticsGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AnalyticsGui;

use Spryker\Zed\AnalyticsGui\AnalyticsGuiDependencyProvider as SprykerAnalyticsGuiDependencyProvider;
use SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\AnalyticsGui\QuicksightAnalyticsCollectionExpanderPlugin;

class AnalyticsGuiDependencyProvider extends SprykerAnalyticsGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AnalyticsGuiExtension\Dependency\Plugin\AnalyticsCollectionExpanderPluginInterface>
     */
    protected function getAnalyticsCollectionExpanderPlugins(): array
    {
        return [
            new QuicksightAnalyticsCollectionExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/User/UserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;
use SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User\DeleteQuicksightUserPostUpdatePlugin;
use SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User\QuicksightUserExpanderPlugin;

class UserDependencyProvider extends SprykerUserDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserExpanderPluginInterface>
     */
    protected function getUserExpanderPlugins(): array
    {
        return [
            new QuicksightUserExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserPostUpdatePluginInterface>
     */
    protected function getUserPostUpdatePlugins(): array
    {
        return [
            new DeleteQuicksightUserPostUpdatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Verify `QuicksightAnalyticsCollectionExpanderPlugin`: go to `http://mysprykershop.com/analytics-gui/analytics` and make sure the page is expanded by Quicksight analytics, by default you should see the `No Analytics permission has been granted to the current user` message.
- Verify `QuicksightUserExpanderPlugin`: create a new Quicksight user in the `spy_quicksight_user` DB table, call `UserFacade::getUserCollection()` for a user used for newly created Quicksight user and make sure the `UserCollection.user.quicksightUser` is expanded.
- Verify `DeleteQuicksightUserPostUpdatePlugin`: log in to Back Office, go to the **Users** -> **Users** section, deactivate a user used for newly created Quicksight user and make sure the corresponding row is deleted in the `spy_quicksight_user` DB table.

{% endinfo_block %}

2. Enable behaviors by registering the console commands:

| PLUGIN                          | SPECIFICATION                                                                                            | PREREQUISITES | NAMESPACE                                             |
|---------------------------------|----------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------|
| QuicksightUserSyncCreateConsole | Persists in `spy_quicksight_user` DB table users registered in quicksight by persisted user emails.      |               | SprykerEco\Zed\AmazonQuicksight\Communication\Console |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerEco\Zed\AmazonQuicksight\Communication\Console\QuicksightUserSyncCreateConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new QuicksightUserSyncCreateConsole(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

To check the `quicksight-user:sync:create` console command:

1. Create new Quicksight user in Quicksight.
2. Run the following command:
```bash
console quicksight-user:sync:create
```
3. In the `spy_quicksight_user` table check that the corresponding Quicksight user has been added.

{% endinfo_block %}

{% info_block infoBox "Deployment" %}

In order users to be synchronized automatically during deployment, you can configure the installation stage of the pipeline, for example the `destructive` pipeline. Add the following command to the end of the `demodata` section:

**config/install/destructive.yml**
```json
sections:
    demodata:
#       ...other commands
        create-quicksight-users:
            command: 'vendor/bin/console quicksight-user:sync:create'
```

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Amazon Quicksight module frontend.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Enable Javascript and CSS changes:

1. Update `package.json`:

**package.json**
```json
{
    "workspaces": [
        "vendor/spryker-eco/*/assets/Zed"
    ],
}
```

2. Run the following command to enable Javascript and CSS changes: 

```bash
npm install
console frontend:project:install-dependencies
console frontend:zed:build
```
