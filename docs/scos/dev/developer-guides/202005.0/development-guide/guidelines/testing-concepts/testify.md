---
title: Testify
originalLink: https://documentation.spryker.com/v5/docs/testify
redirect_from:
  - /v5/docs/testify
  - /v5/docs/en/testify
---

## Testify
Spryker offers on top of Codeception some classes to make your test life easier. In the `spryker/testify` module you can find many usefull helper.

The helper provided within the Testify module let you write your tests way faster and with less mocking required.

As described in the `Best practice` article, Spryker follows an API test approach to have more coverage with less test code. Testing through the API ensures that the underlying wireup code is working properly. Without the helpers of the Testify module, when you want to follow this approach you can easily endup in the sp called mocking hell. 

Assume you want to test a Facade method. The underling model which should be tested has dependencies to other models and/or to the module config. Inside of the facade method you will create the model through the factory including it's dependencies and call a method on the createed model.

Without the Testify module you would need to create a test like this:
```
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
That would make your test method very unreadable and hard to maintain.
Here is an example with the use of helpers:
```
// Arrange
$this->tester->mockFactoryMethod('createDependency', $this->createDependencyMock());
$this->tester->mockConfigMethod('getFooBar', 'bazbat');

// Act
$result = $this->tester->getFacade()->doSomething();

// Assert
...

```
Here you see that your test is much smaller, easier to read and better understandable. All the required injection of the mocks is done behind the scenes and you can easily test what you want to test.

Checkout the `Test helper` article and start adding your own helper if needed. # <-- link this article

Here is a list of the most usefull helpers from the Testify module.


