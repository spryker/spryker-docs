---
title: Configuration
last_updated: Sep 14, 2021
template: concept-topic-template
---

Persistence ACL feature based functionality on Propel behavior. It's possible to enable the feature in 2 ways:
- Connect the feature to one or several tables in the database
- Connect the feature to all tables in the database

## Connect Persistence ACL feature to one or several tables
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" 
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed" 
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" 
          namespace="Orm\Zed\Merchant\Persistence"
          package="src.Orm.Zed.Merchant.Persistence">
    <table name="spy_merchant">
      <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
    </table>
</database>
```

## Connect Persistence ACL feature to all tables
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\AclEntity\Persistence"
          package="src.Orm.Zed.AclEntity.Persistence">
    <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
</database>

```
## Feature configuration
![Configuration entity relation diagram](https://confluence-connect.gliffy.net/embed/image/f2309504-8638-419d-abf9-783bc45c8792.png?utm_medium=live&utm_source=custom)
The configuration, unlike the rule, is common to the system.
The main configuration object of the module is `\Generated\Shared\Transfer\AclEntityMetadataConfigTransfer`.
It's available for extension through the plugin system.
All you need is create a plugin and implement `\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface`.

`\Generated\Shared\Transfer\AclEntityMetadataConfigTransfer`

| property | type | description |
|-----|-----|-----|
| aclEntityMetadataCollection | `\Generated\Shared\Transfer\AclEntityMetadataCollectionTransfer` | The collection of configurations for different entities. |                                                                                                                           | 
| aclEntityAllowList | string[] | The set of fully qualified classes that this module does not apply to (even if the user has rules for an entity that is in the allow list). |

`\Generated\Shared\Transfer\AclEntityMetadataCollectionTransfer`

| property | type | description |
|-----|-----|-----|
| collection | `\Generated\Shared\Transfer\AclEntityMetadataTransfer[]` | The set of configurations for the models. |

`\Generated\Shared\Transfer\AclEntityMetadataTransfer`

| property | type | description |
|-----|-----|-----|
| parent | `\Generated\Shared\Transfer\AclEntityParentMetadataTransfer` | This property is used to configure inheritance. Required for entity which has rules with [Inherited scope](rules-and-scopes/inherited-scope.html), or for [Composite entity](rules-and-scopes/composite-entity.html) (See [Inherited scope vs Composite entity](rules-and-scopes/composite-entity.html#inherited-scope-vs-composite-entity)). |
| entityName | string | Fully qualified class name of configured entity (Propel Entity). |
| hasSegmentTable | bool | Sets if configured entity supports segmentation (see [Segment scope documentation](rules-and-scopes/segment-scope.htmlSets the default binary access mask)). |
| defaultGlobalOperationMask | int | Sets the default binary access mask (see [Execution flow](execution-flow.html) documentation). |
| isSubentity | bool | Indicates whether the configured entity is part of a composite object (see [Composite entity](rules-and-scopes/composite-entity.html) documentation). |

`\Generated\Shared\Transfer\AclEntityParentMetadataTransfer`

| property | type | description |
|-----|-----|-----|
| connection | `\Generated\Shared\Transfer\AclEntityParentConnectionMetadata` | This property is used to set up the relationship between the current class and the parent. |
| entityName | string | Fully qualified class name of parent entity |

Sometimes the links between the child and parent tables established not through foreign keys, but using so-called "reference columns".
There is a `\Generated\Shared\Transfer\AclEntityParentConnectionMetadataTransfer` to cover such a case.

`\Generated\Shared\Transfer\AclEntityParentConnectionMetadataTransfer`

| property | type | description |
|-----|-----|-----|
| reference | string | Current class field. |
| referencedColumn | string | Parent class field.        |

## Example of configuration
### Basic inheritance configuration
```php
    /**
     * @param \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
     *
     * @return \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer
     */
    public function expand(AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer): AclEntityMetadataConfigTransfer 
    {
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyProduct::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyProduct::class)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyProductAbstract::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyProductAbstract::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyProductAbstract::class)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyProductAbstractStore::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyProductAbstractStore::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyProductAbstractStore::class)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyStore::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyStore::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyStore::class)
        );
        
        return $aclEntityMetadataConfigTransfer;
    }
```

### The inheritance through the reference column
```php
    /**
    * @param \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
    *
    * @return \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer
    */
    public function expand(AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer): AclEntityMetadataConfigTransfer 
    {
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyAvailability::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyAvailability::class)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyProduct::class)
                        ->setConnection(
                            (new AclEntityParentConnectionMetadataTransfer())
                                ->setReference('sku')
                                ->setReferencedColumn('sku')
                        )
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyProduct::class,
            (new AclEntityMetadataTransfer())->setEntityName(SpyProduct::class)
        );
        
        return $aclEntityMetadataConfigTransfer;
    }
```

### Composite entity
```php
    /**
    * @param \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
    *
    * @return \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer
    */
    public function expand(AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer): AclEntityMetadataConfigTransfer 
    {
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyMerchantProfile::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyMerchantProfile::class)
                ->setIsSubEntity(true)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyMerchant::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyMerchantUser::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyMerchantUser::class)
                ->setIsSubEntity(true)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyMerchant::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyMerchantStore::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyMerchantStore::class)
                ->setIsSubEntity(true)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyMerchant::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyMerchant::class,
            (new AclEntityMetadataTransfer())->setEntityName(SpyMerchant::class)
        );
    
        return $aclEntityMetadataConfigTransfer;
    }
```

### Data segmentation support
```php
    /**
     * @param \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
     *
     * @return \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer
     */
    public function expand(AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer): AclEntityMetadataConfigTransfer 
    {
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyMerchant::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyMerchant::class)
                ->setHasSegmentTable(true)
        );
        
        return $aclEntityMetadataConfigTransfer;
    }
```

### Default operation mask
```php
    /**
     * @param \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
     *
     * @return \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer
     */
    public function expand(AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer): AclEntityMetadataConfigTransfer 
    {
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyCountry::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyCountry::class)
                ->setDefaultGlobalOperationMask(AclEntityConstants::OPERATION_MASK_READ)
        );
         $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyResetPassword::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyResetPassword::class)
                ->setDefaultGlobalOperationMask(
                    AclEntityConstants::OPERATION_MASK_CREATE | AclEntityConstants::OPERATION_MASK_READ
                )
        );
        
        return $aclEntityMetadataConfigTransfer;
    }
```

### Allow list configuration
```php
    /**
     * @param \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
     *
     * @return \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer
     */
    public function expand(AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer): AclEntityMetadataConfigTransfer 
    {
        $aclEntityMetadataConfigTransfer
            ->addAclEntityAllowListItem(SpyAclEntityRule::class)
            ->addAclEntityAllowListItem(SpyRole::class);

        return $aclEntityMetadataConfigTransfer;
    }
```
