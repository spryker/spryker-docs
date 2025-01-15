---
title: Testify
description: On top of Codeception, Spryker built the Testify module, which provides many useful helpers
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/testify
originalArticleId: e764c9cf-03b9-4766-8ea0-188db29a6b2d
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/testify.html
  - /docs/scos/dev/guidelines/testing/testify.html
related:
  - title: Available test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html
  - title: Code coverage
    link: docs/dg/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/dg/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html
  - title: Publish and Synchronization testing
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html
  - title: Setting up tests
    link: docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Test framework
    link: docs/dg/dev/guidelines/testing-guidelines/test-framework.html
  - title: Test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/using-test-helpers.html
  - title: Testing best practices
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
  - title: Testing concepts
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/testing-concepts.html
  - title: Testing console commands
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/test-console-commands.html
---

On top of [Codeception](https://codeception.com), Spryker offers some classes to make your test life easier. In the Spryker [Testify](https://github.com/spryker/testify) module, you can find many useful  helpers.

The helpers provided within the Testify module let you write your tests way faster and with less mocking required. For the list of the most useful helpers from the Testify module, see [Testify Helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#testify-helpers).

Spryker follows an [API test](/docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/testing-best-practices.html) approach to have more coverage with less test code. Testing through the API ensures that the underlying wireup code is working properly. With the helpers of the Testify module, you can avoid ending-up in the so-called "mocking hell". The "mocking hell" means that your test contains more mocks than real test code, which makes the test unreadable and hard to maintain.

Assume you want to test a Facade method. The underlying model which should be tested has dependencies to other models and/or to the module config. Inside the Facade method, you have to create the model through the factory, including its dependencies, and call a method on the created model.

Without the Testify module, you would need to create a test like this one:

```php
// Arrange
$dependencyMock = $this->createDependencyMock();

$factoryMock = $this->createFactoryMock();
$factoryMock->method('createDependency')->willReturn($dependencyMock);

$configMock = $this->createConfigMock(...);
$factoryMock->setConfig($configMock);

$facade = new XyFacade();
$facade->setFactory($factoryMock);

// Act
$result = $facade->doSomething();

// Assert
...
```

That would make your test method unreadable and hard to maintain.
Here is an example with the use of helpers:

```php
// Arrange
$this->tester->mockFactoryMethod('createDependency', $this->createDependencyMock());
$this->tester->mockConfigMethod('getFooBar', 'bazbat');

// Act
$result = $this->tester->getFacade()->doSomething();

// Assert
...

```

As you can see, this test is much smaller, easier to read, and better understandable. All the required injections of the mocks are made behind the scenes, and you can easily test what you want to.

## Next steps

* [Set up an organization of your tests](/docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html).
* [Create or enable a test helper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html).
* Learn about the [console commands you can use to execute your tests](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html).
