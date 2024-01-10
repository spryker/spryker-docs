---
title: Test helpers best practices
description: Learn about the best practices for the Root helper and the Assert helper
last_updated: Aug 29, 2023
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/test-helpers/test-helpers-best-practices.html
---

You should organize helpers according to their specific roles and intended use cases. These roles represent the following test stages:

- Arrange: For example, `Helper::haveCustomer()`
- Assert: For example, `Helper::assertCustomer($customerTransfer)`

During the "Act" stage, we often only invoke a specific method that requires testing. In certain situations, it might make sense to create a helper method for executing bigger processes, such as `Helper::checkout()`. This method could include actions like adding a product to the cart, initiating the checkout procedure, completing address forms, selecting payment options, and more. This helper method could then also be reused by other tests.

### Root helper
Each module should have a helper named after the module. For example, in the `spryker/customer` module, there is `CustomerHelper`. This particular helper facilitates interactions with customer-related functionalities, such as creating `CustomerTransfer` or registering a customer.

You can also use these helpers to configure the system in a manner where, for example, an in-memory message broker is used instead a remote or a locally running one. This switch simplifies testing procedures and enhances overall performance.

### Assert helper

To prevent overburdening the root helper, specific assertions should reside in separate helpers. In the context of the Customer module example, you could establish a CustomerAssertHelper. This dedicated helper should exclusively encompass assertion methods that can be used in any other module as well.
