---
title: Persistence ACL integration
last_updated: Sep 15, 2021
description:
template: concept-topic-template
---

## Overview
![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/15952dbf-4cef-49ee-b7fa-117d39c1c525.png?utm_medium=live&utm_source=custom)

Merchant Portal comes with preconfigured [Persistence Acl](../persistence-acl-feature-walkthrough/persistence-acl-feature-walkthrough.html) feature in order to secure sensitive data. 
Out of the box it will create and assign set of Acl Roles for Merchant Users to restrict access to others merchant data on the system.

## Merchant and MerchantUser setup workflow
During Merchant and MerchantUser create process, all the necessary ACL and Persistence ACL entities created.
This ensures the correct operation of the merchant portal, and at the same time, protects key merchant data.

### New merchant
![New Merchant sequence diagram](https://confluence-connect.gliffy.net/embed/image/92777a40-ebc8-4566-8617-4082f263a8f1.png?utm_medium=live&utm_source=custom)
When a new Merchant is added to the system, a merchant-specific role is automatically created..
This role will be automatically added to all merchant users, and will allow them to operate with merchant-specific data: ProductOffer, ProductOrder, etc.

### New merchant user
![New MerchantUser sequence diagram](https://confluence-connect.gliffy.net/embed/image/54b0907f-b289-42ab-9b5c-1566959896b0.png?utm_medium=live&utm_source=custom)
When a MerchantUser is added to the system, a MerchantUser specific role is automatically created.
This role is needed to manage the MerchantUser specific data (profile).

The following roles are automatically added to the newly created MerchantUser:
- Merchant specific role
- MerchantUser specific role
- Product Viewer for Offer creation (this role is needed for create new ProductOffers)

## Configuration overview
![Configuration overview](https://confluence-connect.gliffy.net/embed/image/97d83074-7b22-4ef0-9d6f-92fdb1ac1b01.png?utm_medium=live&utm_source=custom)
This diagram simplified and does not represent the entire configuration.
It only reflects basic concepts.
From the diagram, you can see that the configuration represented by 3 main composite objects:
- `ProductOffer`
- `MerchantProduct`
- `SalesOrder` 

They all inherit from `Merchant`, which also composite object.
Each merchant has its own data Segment. Thanks to this, the merchant users have access exclusively to the data of their merchant.  
You can also see some entities that are configured as publicly readable:
- `\Orm\Zed\Locale\Persistence\SpyLocale`
- `\Orm\Zed\Country\Persistence\SpyCountry`
- `\Orm\Zed\Currency\Persistence\SpyCurrency`

The complete configuration of the PersistenceAcl module can be found at the link: [AclEntityMetadataConfigExpander](https://github.com/spryker/acl-merchant-portal/blob/master/src/Spryker/Zed/AclMerchantPortal/Business/Expander/AclEntity/AclEntityMetadataConfigExpander.php)
  
## How to extend initial configuration
Despite the fact that the Merchant portal comes with a Persistence ACL configuration, 
which is fully ready for full-fledged merchant operation and provides data protection, 
this configuration can be easily extended or override.
To do this, just implement `\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface`.
To override the rules that are created automatically when creating a merchant and a user's merchant,
it is enough to override methods such as
- `\Spryker\Zed\AclMerchantPortal\AclMerchantPortalConfig::getMerchantAclRoleEntityRules()`
- `\Spryker\Zed\AclMerchantPortal\AclMerchantPortalConfig::getMerchantUserAclRoleEntityRules()`

### An example of the configuration of a new system object
Let's consider an example of a configuration for a new system entity `\Foo\Bar\MerchantSubscriber`.
![Configuration for new entity](https://confluence-connect.gliffy.net/embed/image/dd5b7b6e-2f65-47d8-a641-c52824b0f209.png?utm_medium=live&utm_source=custom)
It is logical to inherit this entity from the merchant and give the merchant users the right to manage data.
This will allow you to restrict access to data in such a way that only the merchant user will have access to them.

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

Then you need to grant the rights of the merchant to users to manage the new entity:
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

## Module updates
Important: do not lock [spryker/acl-merchant-portal](https://github.com/spryker/acl-merchant-portal) module version and keep it up to date in order to receive security patches for ACL in Merchant Portal. 
