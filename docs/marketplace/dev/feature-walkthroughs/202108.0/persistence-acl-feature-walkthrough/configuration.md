---
title: Configuration
last_updated: Sep 13, 2021
template: concept-topic-template
---

The configuration, unlike the rule, is common to the system.
The main configuration object of the module is `\Generated\Shared\Transfer\AclEntityMetadataConfigTransfer`.
It's available for extension through the plugin system.
All you need is create a plugin and implement `\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface`.

`\Generated\Shared\Transfer\AclEntityMetadataConfigTransfer`

| property | type | description |
|-----|-----|-----|
| aclEntityMetadataCollection | `\Generated\Shared\Transfer\AclEntityMetadataCollectionTransfer` |                                                                                                                             | 
| aclEntityAllowList | string[] | The set of classes that this module does not apply to (even if the user has rules for an entity that is in the allow list). |

`\Generated\Shared\Transfer\AclEntityMetadataCollectionTransfer`

| property | type | description |
|-----|-----|-----|
| collection | `\Generated\Shared\Transfer\AclEntityMetadataTransfer[]` | The set of configurations for the models. |

`\Generated\Shared\Transfer\AclEntityMetadataTransfer`

| property | type | description |
|-----|-----|-----|
| parent | `\Generated\Shared\Transfer\AclEntityParentMetadataTransfer` | This property is used to configure inheritance. Required for entity which has rules with inherited scope, or for composite entity. |
| entityName | string | |
| hasSegmentTable | bool | Sets if configured entity supports segmentation (data slicing). |
| defaultGlobalOperationMask | int | Sets the default binary access mask. |
| isSubentity | bool | Indicates whether the configured entity is part of a composite object. |

`\Generated\Shared\Transfer\AclEntityParentMetadataTransfer`

| property | type | description |
|-----|-----|-----|
| connection | `\Generated\Shared\Transfer\AclEntityParentConnectionMetadata` | This property is used to set up the relationship between the current class and the parent. |
| entityName | string | |

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
                ->setEntityName(SpyProduct::class)
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
            ->addAclEntityAllowListItem(SpyCountry::class)
            ->addAclEntityAllowListItem(SpyCurrency::class)
            ->addAclEntityAllowListItem(SpyLocale::class);

        return $aclEntityMetadataConfigTransfer;
    }
```
