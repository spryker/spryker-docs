---
title: Persistence ACL feature walkthrough
last_updated: Sep 14, 2021
template: concept-topic-template
---

## Overview
Persistence ACL evolves the idea of ACL by additional extra features. 
Using the Persistence ACL module, you can manage permission not at the http action level, but at the entity level, and even a set of entities (segments). 
This module supports a flexible system of inheritance of rights, which simplifies the configuration of access in the system. 
We will talk about it, as well as about other capabilities of the module below.
As the name suggests, the Persistence ACL runs in the Persistence layer.

## Limitations
The module based on Propel ORM (namely Propel Behavior and Propel Hooks). If you do not use PropelOrm to interact with data in your system, this module will not work.

## Installation
```bash
composer require spryker/acl-entity
```

Add `\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior` to one or several tables in your database schema
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" 
          namespace="Orm\Zed\Merchant\Persistence"
          package="src.Orm.Zed.Merchant.Persistence">
    <table name="spy_merchant" identifierQuoting="true">
      <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
    </table>
</database>
```

or even to all tables
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\AclEntity\Persistence"
          package="src.Orm.Zed.AclEntity.Persistence">
    <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
</database>

```

Run the command to apply attached behavior
```bash
console propel:install
```

## Module dependency graph
![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/b15ac7bf-e35f-4298-90da-b7d0c8227be9.png?utm_medium=live&utm_source=custom)

## Domain model
![Domain model](https://confluence-connect.gliffy.net/embed/image/4fe4c0ba-1192-4aca-97f8-d996dfccc583.png?utm_medium=live&utm_source=custom)

## How it works
![The module in application layers](https://confluence-connect.gliffy.net/embed/image/13f16eaa-9491-43ab-887d-0004c716eef4.png?utm_medium=live&utm_source=custom)
Persistence ACL supports permission check for both: when executing queries and when performing actions on Active Record models.
After installation and configuration, code injected into the Active Record model and Query classes that checks the user's permissions for appropriate actions.
The module bases its work on Propel hooks. 
The following hooks used during model operations:
- preInsert
- preUpdate
- preDelete
During query execution:
- preSelectQuery
- preUpdateQuery
- preDeleteQuery

There is an example for SELECT query:
```php
    /**
     * Code to execute before every SELECT statement
     *
     * @param ConnectionInterface $con The connection object used by the query
     */
    protected function basePreSelect(ConnectionInterface $con)
    {
        // \Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior behavior
        /** @var \Spryker\Zed\AclEntity\Business\AclEntityFacadeInterface $aclEntityFacade */
        $aclEntityFacade = \Spryker\Zed\Kernel\Locator::getInstance()->aclEntity()->facade();
        if ($aclEntityFacade->isActive() && !$this->isSegmentQuery()) {
            $aclEntityConfigTransfer = $aclEntityFacade->getAclEntityMetadataConfig();
            if (!in_array($this->getModelName(), $aclEntityConfigTransfer->getAclEntityAllowList())) {
                $this->getPersistenceFactory()
                    ->createAclQueryDirector($aclEntityConfigTransfer->getAclEntityMetadataCollection())
                    ->applyAclRuleOnSelectQuery($this);
            }
        }

        return $this->preSelect($con);
    }
```

In the case of query, the query will be modified in such a way as to affect only allowed records.
If the user tries to perform a restricted action on an Active Record model (such an update, delete or create),
an `\Spryker\Zed\AclEntity\Persistence\Exception\OperationNotAuthorizedException will be thrown.`
