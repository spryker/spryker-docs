---
title: Persistence ACL configuration
last_updated: Oct 20, 2021
description: Learn how to you can configure Persistence ACL
template: concept-topic-template
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202307.0/persistence-acl-feature-walkthrough/persistence-acl-feature-configuration.html
---

Merchant Portal comes with the pre-configured [Persistence ACL](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/persistence-acl-feature-overview.html) feature to secure sensitive data.

By default, the feature creates and assigns a set of ACL roles to merchant users to restrict access to other merchant data in the system.

![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/15952dbf-4cef-49ee-b7fa-117d39c1c525.png?utm_medium=live&utm_source=custom)

## Merchant and MerchantUser setup workflow
While the `Merchant` and `MerchantUser` entries are created, all the necessary ACL and Persistence ACL entities are created as well.
This ensures the correct operation of the Merchant Portal, and at the same time, protects the key merchant data.

![New Merchant and MerchantUser sequence diagram](https://confluence-connect.gliffy.net/embed/image/54b0907f-b289-42ab-9b5c-1566959896b0.png?utm_medium=live&utm_source=custom)

### New merchant
When a new `Merchant` entity is added to the system, a merchant-specific role is automatically created.
This role is automatically added to all merchant users, letting them operate with the merchant-specific data: `ProductOffer`, `ProductOrder`.

### New merchant user
When a `MerchantUser` entity is added to the system, a merchant user-specific role is automatically created.
This role is needed to manage the merchant user-specific data, that is, the profile.

The following roles are automatically added to a newly created merchant user:
- Merchant-specific role.
- MerchantUser-specific role.
- Product viewer for offer creation (this role is needed to create new product offers).

## Persistence ACL configuration overview
![Configuration overview](https://confluence-connect.gliffy.net/embed/image/97d83074-7b22-4ef0-9d6f-92fdb1ac1b01.png?utm_medium=live&utm_source=custom)

The preceding diagram is simplified and does not represent the entire configuration. It only reflects basic concepts.
As the diagram shows, the configuration is represented by three main composite objects:
- `ProductOffer`
- `MerchantProduct`
- `SalesOrder`

They all inherit from `Merchant`, which is also a composite object.
Each merchant has its own data segment. Thanks to this, the merchant users have access exclusively to the data of their merchant.  
You can also check some entities that are configured as publicly readable:
- `\Orm\Zed\Locale\Persistence\SpyLocale`
- `\Orm\Zed\Country\Persistence\SpyCountry`
- `\Orm\Zed\Currency\Persistence\SpyCurrency`

See the complete configuration of the `PersistenceAcl` module at [AclEntityMetadataConfigExpander](https://github.com/spryker/acl-merchant-portal/blob/master/src/Spryker/Zed/AclMerchantPortal/Business/Expander/AclEntity/AclEntityMetadataConfigExpander.php)

## How to extend the initial Persistence ACL configuration
Even though the Merchant Portal comes with the Persistence ACL configuration, which is fully ready for the full-fledged merchant operation and provides data protection, you can extend or override this configuration. To do this, implement `\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface`.
To override the rules that are created automatically when creating a merchant and a user's merchant, it is enough to override such methods as:
- `\Spryker\Zed\AclMerchantPortal\AclMerchantPortalConfig::getMerchantAclRoleEntityRules()`
- `\Spryker\Zed\AclMerchantPortal\AclMerchantPortalConfig::getMerchantUserAclRoleEntityRules()`

### Configuration example of a new system object
Let's consider an exemplary configuration of a new system entity `\Foo\Bar\MerchantSubscriber`.

![Configuration for a new entity](https://confluence-connect.gliffy.net/embed/image/dd5b7b6e-2f65-47d8-a641-c52824b0f209.png?utm_medium=live&utm_source=custom)

It is logical to inherit this entity from the merchant and give the merchant users the right to manage data.
This lets you restrict access to data so that only the merchant user will have access to them.

```php
<?php

use Foo\Bar\MerchantSubscriber;
use Generated\Shared\Transfer\AclEntityMetadataConfigTransfer;
use Generated\Shared\Transfer\AclEntityMetadataTransfer;
use Generated\Shared\Transfer\AclEntityParentMetadataTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchant;
use Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class AclEntityMetadataConfigExpanderPlugin extends AbstractPlugin implements AclEntityMetadataConfigExpanderPluginInterface
{
    /**
    * @param \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
    * @return \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer
    */
    public function expand(AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer): AclEntityMetadataConfigTransfer
    {
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            MerchantSubscriber::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(MerchantSubscriber::class)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyMerchant::class)
                )
        );

        return $aclEntityMetadataConfigTransfer;
    }
}
```

Then, grant the rights of the merchant to users to manage the new entity:

```php
<?php

use Foo\Bar\MerchantSubscriber;
use Generated\Shared\Transfer\AclEntityRuleTransfer;
use Spryker\Shared\AclEntity\AclEntityConstants;
use Spryker\Zed\AclMerchantPortal\AclMerchantPortalConfig as SprykerAclMerchantPortalConfig;

class AclMerchantPortalConfig extends SprykerAclMerchantPortalConfig
{
    /**
     * @return array
     */
    public function getMerchantAclRoleEntityRules(): array
    {
        $aclEntityRuleTransfers = parent::getMerchantAclRoleEntityRules();
        $aclEntityRuleTransfers[] = (new AclEntityRuleTransfer())
            ->setEntity(MerchantSubscriber::class)
            ->setScope(AclEntityConstants::SCOPE_INHERITED)
            ->setPermissionMask(AclEntityConstants::OPERATION_MASK_CRUD);

        return $aclEntityRuleTransfers;
    }
}
```

{% info_block warningBox "Module updates" %}

Do not lock [spryker/acl-merchant-portal](https://github.com/spryker/acl-merchant-portal) module version and keep it up-to-date to receive security patches for ACL in Merchant Portal.

{% endinfo_block %}
