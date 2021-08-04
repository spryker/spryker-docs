---
title: Entity
originalLink: https://documentation.spryker.com/v6/docs/entity
redirect_from:
  - /v6/docs/entity
  - /v6/docs/en/entity
---

In Spryker, an entity represents one entry from a table in the database. Entities are an implementation of the [Active record design pattern](https://en.wikipedia.org/wiki/Active_record_pattern), so their usage is very simple. For a full documentation, see [Propel’s Active Record Reference](http://propelorm.org/documentation/reference/active-record.html).

{% info_block warningBox %}
Spryker’s entities are called Active Record classes or just Models there.
{% endinfo_block %}

```php
<?php
$customer = new SpyCustomer();
$customer->setFirstName('John');
$customer->setLastName('Doe');
$customer->setEmail('john.doe@spryker.com');
$customer->save();
```

## Saving Entities With Transactions

In general, Propel performs every save operation in a transaction. Sometimes, you want to save things together, for example, when you save customers and order items during the checkout. For this, you can use Propel’s connection.

```php
 <?php
 $connection = Propel::getConnection();
 $connection->beginTransaction();
 
 $customerEntity->save();
 $customerAddressEntity->save();
 $salesOrderEntity->save();
 $connection->commit();
```

## Entity Usage

Usually entities are used in the module’s business layer to persist data. In contrast to most other classes in Spryker, entities are never injected, because they have state. Another way to retrieve entities is to use a query from the query container.

## Related Spryks

You might use the following definitions to generate the related code:

* `vendor/bin/console spryk:run AddZedPersistencePropelAbstractEntity` - Add Zed Persistence Propel Abstract Entity

See the [Spryk](https://documentation.spryker.com/docs/spryk-201903) documentation for details.
