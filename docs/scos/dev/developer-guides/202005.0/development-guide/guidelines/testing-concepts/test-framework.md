---
title: Test framework
originalLink: https://documentation.spryker.com/v5/docs/test-framework
redirect_from:
  - /v5/docs/test-framework
  - /v5/docs/en/test-framework
---

## Test framework
Spryker makes use of the [Codeception testing framework](https://codeception.com/) and [PHPUnit ](https://phpunit.de/) to make it an ease to test every aspect of Spryker and the code you write.

Codeception offers many handy things to write better and cleaner tests. Please read the documentation of both to get the best out of your tests.

Many things Codeception offers are build on top of PHPUnit. In the next articles we will only reference Codeception even if these features are available in PHPUnit as well.

On top of this the `spryker/testify` module is build and provides many handy helper. We will cover the existing helper in the `Testify` article. # <-- Link this  

### Configuration
The `codeception.yml` in the root of your project is the main entry point for your tests. In this file the basic configuration for your test suite is defined.

From this file you can include other `codeception.yml` for a better organization of your tests. 

Example:
```
namespace: PyzTest
actor: Tester

include:
    - tests/PyzTest/*/*
...
```

For more information about read the [Codeception configuration documentation](https://codeception.com/docs/reference/Configuration).

### Console commands
There are many console commands provided from Codeception but the most used ones will be:

- `vendor/bin/codecept build` - generates classes
-  `vendor/bin/codecept run`  - executes your tests

To get info about the other Codeception console commands run `vendor/bin/codecept list`.


### Testing with Spryker
On top of codeception we added a basic infrastructure for tests. We devided our tests given by the applications and for the layer we test. Thus you will most likelly find:

* `tests/OrganizationTest/Application/Module/Communication` - for e.g. controller or plugin tests.
* `tests/OrganizationTest/Application/Module/Presentation` - for e.g. testing pages with Javascript.
* `tests/OrganizationTest/Application/Module/Business` - for e.g. testing facades or models.

**Communication** suite can contain unit and functional tests. The controller test can be used to test as a user that interacts with the browser but without the overhead of the GUI rendering. These should be used for all tests that do not need Javascript.

**Business** suite can contain unit and functional test. The facade test is one kind of an API test approach. For more information see `Bestpractices - Test API`.

**Presentation** suite contains functional tests that can be used to interact with a headless browser. These tests should be used when you have Javascript on the page under test. 

All test classes follow the exact same path as the class under test except that tests live in the `tests` directory and the organization part of the namespace Is suffixed with `Test`. E.g. `tests/PyzTest/*`.

Each test suite contains a `codeception.yml`configuration file. This, for example,  includes helpers that are enabled for the current suite.

