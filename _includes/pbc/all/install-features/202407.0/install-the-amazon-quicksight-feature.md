---
title: Install the Amazon Quicksight feature
description: Learn how to install the Amazon Quicksight feature
template: feature-installation-guide-template
---

This document describes how to install the Amazon Quicksight feature.

## Install feature core 

Follow the steps below to install the Amazon Quicksight feature core.

### Prerequisites
Install the required features:

| NAME                     | VERSION          | INSTALLATION GUIDE                                                                                                                                                              |
|--------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core             | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                     |
| Spryker Core Back Office | {{page.version}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-spryker-core-back-office-feature.html) |


### 1) Install the required modules

Run the following command to install the required module:

```bash
composer require spryker-eco/amazon-quicksight: "^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE           | EXPECTED DIRECTORY                   |
|------------------|--------------------------------------|
| AmazonQuicksight | vendor/spryker-eco/amazon-quicksight |

{% endinfo_block %}

### 2) Set up the configuration

Add your Quicksight asset bundle to to one of the directories, for example `src/Pyz/Zed/AmazonQuicksight/data/asset-bundle.zip`.

Add the following configuration:

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

{% info_block warningBox "Verification" %}

After finishing the integration try to enable the Analytics from Backoffice UI. If the integration is successful, the asset bundle import will be started.

{% endinfo_block %}

Add environment configuration:

| CONFIGURATION                                                     | SPECIFICATION                                                            | NAMESPACE                          |
|-------------------------------------------------------------------|--------------------------------------------------------------------------|------------------------------------|
| AmazonQuicksightConstants::AWS_ACCOUNT_ID                         | The ID for the AWS account that contains your Amazon QuickSight account. | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_REGION                             | The AWS region that you use for the Amazon QuickSight account.           | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_QUICKSIGHT_NAMESPACE               | The name of Quicksight namespace.                                        | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_CREDENTIALS_KEY                    | AWS access key ID.                                                       | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_CREDENTIALS_SECRET                 | AWS access key secret.                                                   | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::AWS_CREDENTIALS_TOKEN                  | AWS security token.                                                      | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_USERNAME           | The default data source username.                                        | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_PASSWORD           | The default data source password.                                        | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_NAME      | The default data source database name.                                   | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_HOST      | The default data source database host.                                   | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_PORT      | The default data source database port.                                   | SprykerEco\Shared\AmazonQuicksight |
| AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_VPC_CONNECTION_ARN | The default data source VPC connection ARN.                              | SprykerEco\Shared\AmazonQuicksight |

**config/Shared/config_default.php**

```php
<?php

use SprykerEco\Shared\AmazonQuicksight\AmazonQuicksightConstants;

// -------------------------------- AWS QUICKSIGHT -------------------------------
$config[AmazonQuicksightConstants::AWS_ACCOUNT_ID] = getenv('AWS_ACCOUNT_ID');
$config[AmazonQuicksightConstants::AWS_REGION] = getenv('AWS_REGION');
$config[AmazonQuicksightConstants::AWS_QUICKSIGHT_NAMESPACE] = getenv('AWS_QUICKSIGHT_NAMESPACE');
$config[AmazonQuicksightConstants::AWS_CREDENTIALS_KEY] = getenv('AWS_ACCESS_KEY_ID');
$config[AmazonQuicksightConstants::AWS_CREDENTIALS_SECRET] = getenv('AWS_SECRET_ACCESS_KEY');
$config[AmazonQuicksightConstants::AWS_CREDENTIALS_TOKEN] = getenv('AWS_SESSION_TOKEN');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_USERNAME] = getenv('QUICKSIGHT_DB_USERNAME');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_PASSWORD] = getenv('QUICKSIGHT_DB_PASSWORD');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_NAME] = getenv('QUICKSIGHT_DB_NAME');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_HOST] = getenv('QUICKSIGHT_DB_HOST');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_DATABASE_PORT] = getenv('QUICKSIGHT_DB_PORT');
$config[AmazonQuicksightConstants::DEFAULT_DATA_SOURCE_VPC_CONNECTION_ARN] = getenv('QUICKSIGHT_VPC_CONNECTION_ARN');
```

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
| QuicksightUserRegisterResponse                                | class  | created | src/Generated/Shared/Transfer/QuicksightUserRegisterResponseTransfer                       |
| QuicksightDeleteUserResponse                                  | class  | created | src/Generated/Shared/Transfer/QuicksightDeleteUserResponseTransfer                         |
| QuicksightUserRegisterRequest                                 | class  | created | src/Generated/Shared/Transfer/QuicksightUserRegisterRequestTransfer                        |
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
| QuicksightUpdateUserResponse                                  | class  | created | src/Generated/Shared/Transfer/QuicksightUpdateUserResponseTransfer                         |
| QuicksightUpdateUserRequest                                   | class  | created | src/Generated/Shared/Transfer/QuicksightUpdateUserRequestTransfer                          |

{% endinfo_block %}

### 4) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 5) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                   | SPECIFICATION                                                                                                        | PREREQUISITES | NAMESPACE                                                 |
|------------------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------|
| QuicksightUserRoleUserFormExpanderPlugin | Expands user form with Quicksight user role field.                                                                   |               | SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User |
| QuicksightUserExpanderPlugin             | Populates `UserTransfer.quicksightUser` in collection with existing Quicksight users.                                |               | SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User |
| QuicksightUserPostCreatePlugin           | Registers Quicksight User when quicksight role is selected for User on user creating.                                |               | SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User |
| CreateQuicksightUserPostUpdatePlugin     | Registers Quicksight User when quicksight role is selected for User on user updating.                                |               | SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User |
| DeleteQuicksightUserPostUpdatePlugin     | Deletes Quicksight User when quicksight role is deselected for User on user updating or user is deactivated/deleted. |               | SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User |

**src/Pyz/Zed/User/UserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;
use SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User\CreateQuicksightUserPostUpdatePlugin;
use SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User\DeleteQuicksightUserPostUpdatePlugin;
use SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User\QuicksightUserExpanderPlugin;
use SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User\QuicksightUserPostCreatePlugin;
use SprykerEco\Zed\AmazonQuicksight\Communication\Plugin\User\QuicksightUserRoleUserFormExpanderPlugin;

class UserDependencyProvider extends SprykerUserDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface>
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new QuicksightUserRoleUserFormExpanderPlugin(),
        ];
    }

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
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserPostCreatePluginInterface>
     */
    protected function getUserPostCreatePlugins(): array
    {
        return [
            new QuicksightUserPostCreatePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserPostUpdatePluginInterface>
     */
    protected function getUserPostUpdatePlugins(): array
    {
        return [
            new CreateQuicksightUserPostUpdatePlugin(),
            new DeleteQuicksightUserPostUpdatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in to Back Office.
2. Go to the **Users** -> **Users** section.
3. Click on `Add new user` button and fill user form. Select `Analytics` role and submit the form.
4. Check that new row added in `spy_quicksight_user` DB table for newly created user.
5. Edit the user, change the `Analytics` role and submit the form.
6. Check that column `spy_quicksight_user.role` is changed in the DB table for updated user.
7. In the `Users List` table, click on the `Delete` button for the user with the `Analytics` role.
8. Check that in `spy_quicksight_user.role` DB table row is deleted for deleted user.

{% endinfo_block %}

2. Enable behaviors by registering the console commands:


| PLUGIN                          | SPECIFICATION                                                                                            | PREREQUISITES | NAMESPACE                                             |
|---------------------------------|----------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------|
| QuicksightUserSyncCreateConsole | Persists in `spy_quicksight_user` DB table users registered in quicksight by persisted user emails.      |               | SprykerEco\Zed\AmazonQuicksight\Communication\Console |
| QuicksightUserSyncDeleteConsole | Deletes from `spy_quicksight_user` DB table users not registered in quicksight by persisted user emails. |               | SprykerEco\Zed\AmazonQuicksight\Communication\Console |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerEco\Zed\AmazonQuicksight\Communication\Console\QuicksightUserSyncCreateConsole;
use SprykerEco\Zed\AmazonQuicksight\Communication\Console\QuicksightUserSyncDeleteConsole;

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
            new QuicksightUserSyncDeleteConsole(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
To check the `quicksight-user:sync:create` console command:

1. Create new user in the Back Office with selected `Analytics` role.
2. In the `spy_quicksight_user` table delete the row with newly created user data.
3. Run the following command:
```bash
console quicksight-user:sync:create
```
4. In the `spy_quicksight_user` table check that user data is added.

To check the `quicksight-user:sync:delete` console command:

1. In the `spy_quicksight_user` table delete create a new row for user that don't have `Analytics` role.
2. Run the following command:
```bash
console quicksight-user:sync:delete
```
3. In the `spy_quicksight_user` table check that row for user without `Analytics` role is deleted.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the {Feature Name} feature frontend.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Enable Javascript and CSS changes:

Run the following command to enable Javascript and CSS changes: 

```bash
console frontend:project:install-dependencies
console frontend:zed:build
```
