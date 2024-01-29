---
title: Test the asynchronous API
description: How to test the Asynchronous API.
template: howto-guide-template
last_updated: Oct 18, 2023
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/executing-tests/test-the-asynchronous-api.html
related:
  - title: Available test helpers
    link: docs/scos/dev/guidelines/testing-guidelines/available-test-helpers.html
  - title: Code coverage
    link: docs/scos/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/scos/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/scos/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html
  - title: Publish and Synchronization testing
    link: docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html
  - title: Setting up tests
    link: docs/scos/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Test framework
    link: docs/scos/dev/guidelines/testing-guidelines/test-framework.html
  - title: Test helpers
    link: docs/scos/dev/guidelines/testing-guidelines/test-helpers.html
  - title: Testify
    link: docs/scos/dev/guidelines/testing-guidelines/testify.html
  - title: Testing best practices
    link: docs/scos/dev/guidelines/testing-guidelines/testing-best-practices.html
  - title: Testing concepts
    link: docs/scos/dev/guidelines/testing-guidelines/testing-concepts.html
---

This document describes how to set up and run AsyncAPI tests.
We use the *Hello World* example throughout this document. All code references the Hello World App and the `Pyz` project namespace. When you set up and run the tests for a different project namespace or module, adjust the names accordingly.

## Prerequisites

<!--Either you followed the instructions on how to Create an App or you have an already created App in place.-->

Make sure the following prerequisites are met:

1. Spryker Testify version 3.50.0 or later is installed. The AsyncAPI SDK is required by this package, however, you don't need to install it manually.
  - To verify the installation status and version of Spryker Testify, run the following command:
  ```bash
  composer info spryker/testify
  ```
  - To install Spryker Testify, run the following command:
  ```bash
  composer require --dev "spryker/testify:^3.50.0"
  ```
  - To update Spryker Testify, run the following command:
  ```bash
  composer update "spryker/testify:^3.50.0"
  ```
2. Spryker Testify AsyncAPI version 0.1.1 or later is installed. The AsyncAPI SDK is required by this package, however, you don't need to install it manually.
  - To verify the installation status and version of Spryker Testify AsyncAPI, run the following command:
  ```bash
  composer info spryker/testify-async-api
  ```
  - To install Spryker Testify AsyncAPI, run the following command:
  ```bash
  composer require --dev "spryker/testify-async-api:^0.1.1"
  ```
  - To update Spryker Testify AsyncAPI  run the following command:
  ```bash
  composer update "spryker/testify-async-api:^0.1.1"
  ```
3. Spryks version 0.5.2 or later is installed.
  - To verify the installation status and version of Spryks, run the following command:
  ``` bash
  composer info spryker-sdk/spryk
  ```
  - To install Spryks, run the following command:
  ```bash
  composer require --dev "spryker-sdk/spryk:^0.5.2"
  ```
  - To update Spryks, run the following command:
  ```bash
  composer update "spryker-sdk/spryk:^0.5.2"
  ```
4. There is a valid AsyncAPI schema file in `resources/api/asyncapi.yml`. To create the file, you can use the example provided in Hello World App AsyncAPI.

## Testing the asynchronous API

Testing the asynchronous API implies that all schema files are tested to ensure that they align with the code that handles or produces messages. Each module that has an AsyncAPI schema file must have a dedicated test suite.

To test the asynchronous API, follow these steps:

### 1. Generate the code

To generate the code, you need to provide a valid schema file within your app. The schema file must reside in `resources/api/asyncapi.yml`. In the following example, we use the file provided in the Hello World App AsyncAPI, which you can also use as a starting point for your project.
After you have added the schema file, run the code generator for it using the following command:

```bash
docker/sdk cli vendor/bin/asyncapi code:asyncapi:generate -o Pyz
```

This command adds relevant modules and tests to your project to get you started with the asynchronous API in the `src/` and `tests/` directories.

To verify the introduced changes, check the `src/` and `tests/` directories.

### 2. Build Codeception

Run the following Codeception build command:

```bash
docker/sdk cli vendor/bin/codecept build -c tests/PyzTest/AsyncApi/HelloWorld
```

Not everything can be automatically generated with these commands. You also need to update the Codeception configuration and the project configuration as described in the following sections.

### 3. Update the Codeception configuration

Open the created Codeception configuration file at `tests/PyzTest/AsyncApi/HelloWorld/codeception.yml` and add the generated handlers to the configuration of `AsyncApiHelper`.

The file should contain the following section:

```
\Spryker\Zed\TestifyAsyncApi\Business\Codeception\Helper\AsyncApiHelper:
    asyncapi: resources/api/asyncapi.yml
    handlers:
        - \Pyz\Zed\HelloWorld\Communication\Plugin\MessageBroker\UserCreatedMessageHandlerPlugin
```

Depending on your schema file, you need to add your specific handlers.  All handlers are located in the `src/Pyz/Zed/HelloWorld/Communication/Plugin/MessageBroker` directory. Add the class name of each handler to your Codeception configuration.

### 4. Update the project configuration

When testing the asynchronous API, all messages must be sent to the local message broker transport. This should only happen when you test the API with automated tests.

Add the following configuration to the `config/Shared/config_local.php` file:

```
use Spryker\Shared\MessageBroker\MessageBrokerConstants;

$config[MessageBrokerConstants::IS_ENABLED] = true;
$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    '*' => 'test-channel',
];

$config[MessageBrokerConstants::CHANNEL_TO_TRANSPORT_MAP] = [
    'test-channel' => 'local',
];
```
{% info_block warningBox "Warning" %}

This is a very generic configuration and shouldn't be used in a production environment.

{% endinfo_block %}

### 5. Run the tests

Run the tests using the following command:

```bash
docker/sdk testing vendor/bin/codecept run -c tests/PyzTest/AsyncApi/HelloWorld
```

Once the testing process is complete, you get the result of each individual test.

## Example test methods

This section lists some example methods and explains what and how they test.

### Handling messages

Here is the example of handling the messages:

```
public function testUserCreatedMessageCreatesAUserEntity(): void
{
    // Arrange
    $userCreatedTransfer = $this->tester->haveUserCreatedTransfer();

    // Act
    $this->tester->runMessageReceiveTest($userCreatedTransfer, 'user-events');

    // Assert
    $this->tester->assert...(...);
}
```

In the `Arrange` section, implement the code to allow for a message transfer that you expect to receive from another application.

In the `Act` section, call `runMessageReceiveTest` in `AsyncApiHelper`. The `runMessageReceiveTest` method takes the message that you expect to receive as its first argument and the channel name where you expect the message to come through as its second argument. Internally, the message and the channel name are validated against your `asyncapi.yml` schema file to ensure that both meet the definition.

In the `Assert` section, you make assertions based on your business logic. For example, you might verify the existence of a database entry after the message has been processed.

The underlying `AsyncApiHelper` ensures the following inside the `runMessageReceiveTest` method:

- The message handler can handle the message.
- The expected channel name exists in the schema file.
- The expected message name exists in the schema file.
- The message contains all required attributes defined in the schema file.

The `AsyncApiHelper` also executes the handler with the passed message. After the `runMessageReceiveTest` method execution, you need to make your assertions, such as verifying that a specific change was made in your database after processing the message.
The only remaining tasks for you are to implement the business logic, update the tests according to your business logic, and then run the tests.
To run the tests, use the following command:

```bash
vendor/bin/codecept run -c tests/PyzTest/AsyncApi/HelloWorld/
```

### Publishing messages

Here is the example of publishing the messages:

```
public function testGreetUserMessageIsEmittedWhenUserWasStoredInTheDatabase(): void
{
    // Arrange
    $expectedGreetUserTransfer = $this->tester->haveGreetUserTransfer();

    // Act
    $this->tester->getFacade()->saveUser(...);

    // Assert
    $this->tester->assertMessageWasEmittedOnChannel($expectedGreetUserTransfer, 'user-commands');
}
```

In the `Arrange` section, prepare a message transfer that you expect to be sent once your business logic is executed.

In the `Act` section, call your business logic. For example, you could call a facade method where you expect the message to be sent.

In the `Assert` section, call the `assertMessageWasEmittedOnChannel` method with the expected message you created in the `Arrange` section. The first argument is the message that you expect to be sent, and the second argument is the channel name through which you expect the message to be sent. Internally, the message and the channel name are validated against your `asyncapi.yml` schema file to ensure that both meet the definition.

The underlying `AsyncApiHelper` ensures the following inside the `assertMessageWasEmittedOnChannel` method:

- The expected channel name exists in the schema file.
- The expected message name exists in the schema file.
- The message was sent with all required attributes defined in the schema file.
