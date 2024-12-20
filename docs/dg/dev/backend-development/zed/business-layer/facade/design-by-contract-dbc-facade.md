---
title: Design by Contract (DBC) - Facade
description: A contract is a formal and precise specification of a method (or other components) in a facade.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/zed-facade-design-by-contract
originalArticleId: 08727647-3f73-47be-ab06-5f698712aaf5
redirect_from:
  - /docs/scos/dev/back-end-development/zed/business-layer/facade/design-by-contract-dbc-facade.html
related:
  - title: Facade
    link: docs/dg/dev/backend-development/zed/business-layer/facade/facade.html
  - title: A facade implementation
    link: docs/dg/dev/backend-development/zed/business-layer/facade/a-facade-implementation.html
  - title: Facade use cases
    link: docs/dg/dev/backend-development/zed/business-layer/facade/facade-use-cases.html
---

Every method in a facade contains an implicit promise. So a client expects that the behavior does not change in a minor update. Basically, there are two types of possible changes:
* Changes in the method's signature—for example, when the name of the method or the order of the parameters changes.
* Changes in the expected behavior of the method. While a renamed method causes an exception, a change of behavior is much harder to detect.

A [contract](https://en.wikipedia.org/wiki/Design_by_contract) is a formal and precise specification of a method (or another component). This consists of three parts: preconditions, post-conditions, and invariants. Practically, there is no approach to enforcing a contract in PHP. In other languages, there are DBC extensions like iContract for Java. For details, see [iContract: Design by Contract in Java](http://www.javaworld.com/article/2074956/learn-java/icontract--design-by-contract-in-java.html).

**Example**:

Imagine a signature like this for the method `saveCustomer()`:

```php
<?php
/**
 * @param string $idCustomer
 * @param string $email
 *
 * @return void
 */
public function saveCustomer($idCustomer, $email)
{
    ...
}
```

Based on the name, this method "saves a customer". So the contract is as follows:

| CONDITION TYPE | DESCRIPTION |
| --- | --- |
| Precondition | Email address does not already exist. This constraint is defined by the database schema. There is a customer with the given ID. |
| Post-condition | Amount of customers is incremented by one. |
| Invariant | There are customers with one email address each. |

**Additional information**:

* *The post-conditions are complete*. Any other behavior is not expected here—for example, this method must not send an email to a customer to confirm the change.
* *This method must not return anything*. You could think of a boolean return value if the email cannot be changed. But then this method would do two things. Therefore, it is a better approach to have another `doesEmailExist($email)` method for the pre-check.
* *If the preconditions are not valid, the method must throw an exception*. In this case, if the email address already exists, the `EmailAlreadyExistsException` exception is thrown.
