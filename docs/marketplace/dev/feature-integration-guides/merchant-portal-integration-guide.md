---
title: Marketplace Return Management feature integration
last_updated: Dec 11, 2020 
summary: This document describes the process how to integrate the Merchant Portal feature into a Spryker project.
draft: true
---

See https://spryker.github.io/docs/marketplace/dev/feature-integration-guides/merchant-portal-core-feature-integration.html

## Environment Requirements

- NodeJs v12+
- Yarn v2 (or latest Yarn v1)
- Spryker supported PHP version (7.3, 7.4)
- Host for Zed application

## Installing Frontend Dependencies

```bash
$ yarn install
```

## Building Frontend

```bash
$ yarn mp:build
```

For production

```bash
$ yarn mp:build:production
```

## Installing Backend

Install needed packages for Merchant Portal with dependencies, see the available list here https://github.com/spryker/?q=merchant-portal-gui

**Merchants, users, and merchant users**

1. Create users for merchant portal using Zed UI (Backoffice), or if you need them out of the box, add them into `\Pyz\Zed\User\UserConfig::getInstallerUsers()`, for example:

   ```
   [
       'firstName' => 'Michele',
       'lastName' => 'Nemeth',
       'password' => 'change123',
       'username' => 'michele@sony-experts.com',
   ],
   ```

   

   1. Connect users and merchant using Zed UI (Backoffice) or data import with data/import/ files.

      1. merchant.csv 

         ```
         merchant_key,merchant_reference,merchant_name,registration_number,status,email,is_active,url.de_DE,url.en_US
         sony-experts,MER000006,Sony Experts,HYY 134306,approved,michele@sony-experts.com,1,/de/merchant/sony-experts,/en/merchant/sony-experts
         ```

         

      2. merchant_user.csv 

         ```
         merchant_key,username
         sony-experts,michele@sony-experts.com
         ```

         

      3. Enable importer command and plugins:

         1. add `\Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantDataImportPlugin` to `\Pyz\Zed\DataImport\DataImportDependencyProvider::getDataImporterPlugins()`.

         2. Enable merchant user Pyz level data import command:

            ```
            \Pyz\Zed\DataImport\Business\DataImportBusinessFactory::getDataImporterByType()
            
            ...
            case DataImportConfig::IMPORT_TYPE_MERCHANT_USER:
               return $this->createMerchantUserImporter($dataImportConfigurationActionTransfer);
            ...
            ```

            

         3. Add both of them to full import config (if needed)`\Pyz\Zed\DataImport\DataImportConfig::getFullImportTypes()`

**ACL rules**

1. Create ACL group to allow Merchant Portal pages (*-merchant-portal-gui) for merchant users (optionally deny access to them for Admin roles)

   1. Use `\Spryker\Zed\MerchantUser\Communication\Plugin\Acl\MerchantUserAclInstallerPlugin` to install additional roles for ACL during install command. 

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

By default, it will install the “Merchant Admin” group and “Merchant Admin” roles. You can change the behavior by extending `\Spryker\Zed\MerchantUser\MerchantUserConfig` by add groups, rules.

For default users (defined in UserConfig) you can add default group in `\Pyz\Zed\Acl\AclConfig::getInstallerUsers()`

```
    /**
     * @return array
     */
    public function getInstallerUsers()
    {
        return [
            'admin@spryker.com' => [
                'group' => AclConstants::ROOT_GROUP,
            ],
            'admin_de@spryker.com' => [
                'group' => AclConstants::ROOT_GROUP,
            ],
            'michele@sony-experts.com' => [
                'group' => static::GROUP_MERCHANT_ADMIN,
            ],
            //this is related to existent username and will be searched into the database
        ];
    }
```

Run console setup:init-db to create users with ACL rules, 

Run `console data:import merchant`

Run `console data:import:merchant-user`



**Merchant Portal Navigation Links in Sidebar**

Add installed MP modules into `config/Zed/navigation.xml` at the end of the file. 

```
<merchant-portal-dashboard>
        <label>Dashboard</label>
        <title>Merchant Dashboard</title>
        <icon>dashboard</icon>
        <bundle>dashboard-merchant-portal-gui</bundle>
        <controller>dashboard</controller>
        <action>index</action>
    </merchant-portal-dashboard>
    <merchant-portal-profile>
        <label>Profile</label>
        <title>Profile</title>
        <icon>profile</icon>
        <bundle>merchant-profile-merchant-portal-gui</bundle>
        <controller>profile</controller>
        <action>index</action>
    </merchant-portal-profile>
    <product-offer-merchant-portal-gui>
        <label>Offers</label>
        <title>Offers</title>
        <icon>offers</icon>
        <bundle>product-offer-merchant-portal-gui</bundle>
        <controller>product-offers</controller>
        <action>index</action>
        <pages>
            <create-offer>
                <label>Create Offer</label>
                <title>Create Offer</title>
                <bundle>product-offer-merchant-portal-gui</bundle>
                <controller>product-list</controller>
                <action>index</action>
                <visible>0</visible>
            </create-offer>
        </pages>
    </product-offer-merchant-portal-gui>
    <sales-merchant-portal-gui>
        <label>Orders</label>
        <title>Orders</title>
        <icon>orders</icon>
        <bundle>sales-merchant-portal-gui</bundle>
        <controller>orders</controller>
        <action>index</action>
    </sales-merchant-portal-gui>
    <product-merchant-portal-gui>
        <label>Products</label>
        <title>Products</title>
        <icon>offers</icon>
        <bundle>product-merchant-portal-gui</bundle>
        <controller>products</controller>
        <action>index</action>
    </product-merchant-portal-gui>
    <security-merchant-portal-gui>
        <label>Logout</label>
        <title>Logout</title>
        <icon>logout</icon>
        <bundle>security-merchant-portal-gui</bundle>
        <controller>logout</controller>
        <action>index</action>
    </security-merchant-portal-gui>
```

Run `console navigation:build-cache`.

Make sure that you have enabled `\Spryker\Zed\Acl\Communication\Plugin\Navigation\AclNavigationItemCollectionFilterPlugin` in `\Pyz\Zed\ZedNavigation\ZedNavigationDependencyProvider`.

```
<?php

namespace Pyz\Zed\ZedNavigation;

use Spryker\Zed\Acl\Communication\Plugin\Navigation\AclNavigationItemCollectionFilterPlugin;
use Spryker\Zed\ZedNavigation\ZedNavigationDependencyProvider as SprykerZedNavigationDependencyProvider;

class ZedNavigationDependencyProvider extends SprykerZedNavigationDependencyProvider
{
    /**
     * @return \Spryker\Zed\ZedNavigationExtension\Dependency\Plugin\NavigationItemCollectionFilterPluginInterface[]
     */
    protected function getNavigationItemCollectionFilterPlugins(): array
    {
        return [
            new AclNavigationItemCollectionFilterPlugin(),
        ];
    }
}
```



**Separate Login feature setup (security firewalls)**

It requires upgrading spryker/smyfony:3.5.0 and applying some changes on the project, see https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1754890268

```bash
composer remove spryker/auth spryker/auth-mail-connector spryker/auth-mail-connector-extension spryker/authentication-merchant-portal-gui
```

```bash
composer require spryker/security-gui:"^0.1.0" spryker/security-merchant-portal-gui:"^0.1.0" spryker/security-system-user:"^0.1.0" spryker/user-password-reset:"^0.1.0" spryker/user-password-reset-extension:"^0.1.0" spryker/user-password-reset-mail:"^0.1.0" --update-with-dependencies
```

Update touched modules in https://release.spryker.com/release-groups/view/3121 to latest minors.

Apply changes from https://github.com/spryker/suite-nonsplit/pull/4786/files.



**Check it**

Go to http://zed.de.spryker.local/security-merchant-portal-gui/login or http://zed.de.spryker.local/authentication-merchant-portal-gui/login (abandoned module name)

The Merchant Portal should look like on the picture 

![Merchant Portal login](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Feature+Integration+Guides/Marketplace/Merchant+Portal+feature+integration/mp-login.png)

After login, you should be redirected to the Dashboard

![Merchant Portal dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Feature+Integration+Guides/Marketplace/Merchant+Portal+feature+integration/mp-dashboard.png)