---
title: Design by Contract (DBC) - Facade
originalLink: https://documentation.spryker.com/v5/docs/zed-facade-design-by-contract
redirect_from:
  - /v5/docs/zed-facade-design-by-contract
  - /v5/docs/en/zed-facade-design-by-contract
---

Every method in a facade contains an implicit promise. So a client expects that the behavior does not change in a minor update. Basically there are two types of possible changes. First there can be changes in the method’s signature for instance, when the name of the method or the order of the parameters changed. Second there can be changes in the expected behavior of the method. While a renamed method will cause an exception, a change of behavior is much harder to detect.

 

A [contract](https://en.wikipedia.org/wiki/Design_by_contract) is a formal and precise specification of a method (or other component). This consists of three parts: preconditions, postconditions and invariants. Practically there is no approach to enforce a contract in PHP. In other languages there are DBC extensions like iContract for Java (see this [article](http://www.javaworld.com/article/2074956/learn-java/icontract--design-by-contract-in-java.html) from 2001).

 

**Example** :

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

From the name we expect that this method will ‘save a customer’. So the contract would look like this:

| Precondition  | The email address does not already exist. This constraint is defined by the database schema.There is a customer with the given ID. |
| ------------- | ------------------------------------------------------------ |
| Postcondition | The amount of customers is incremented by one.               |
| Invariant     | There are customers with one email address each.             |

**Additional information**:

* The postconditions are complete. So we don’t expect any other behavior here (e.g. “this method should not send an email to the customer to confirm the change”)
* This method should not return anything. You could think of a boolean return value if the email cannot be changed. But then this method would do two things. Therefore it is a better approach to have another `doesEmailExist($email)` method for the pre-check.
* If the preconditions are not valid, the method must throw an exception. In this case, if the email address already exists we would throw an `EmailAlreadyExistsException`.
