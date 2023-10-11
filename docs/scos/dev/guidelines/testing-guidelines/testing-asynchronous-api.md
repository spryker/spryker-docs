---
title: Testing the Asynchronous API
description: How to test the Asynchronous API.
template: concept-topic-template
related:
  - title: Available test helpers
    link: docs/scos/dev/guidelines/testing-guidelines/available-test-helpers.html
  - title: Code coverage
    link: docs/scos/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/scos/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/scos/dev/guidelines/testing-guidelines/executing-tests.html
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

In the following sections, we will guide you through the complete setup of your AsyncAPI tests. We will use the Hello World example in the whole document. All code will point to the Hello World App and the `Pyz` project namespace. When you do this for a different project namespace and/or module then you have to adopt the names accordingly.

# Pre-requisites

Either you followed the instructions on how to Create an App or you have an already created App in place.

In either case, the following items are required to be met:

- Spryker Testify installed in version 3.50.0 or higher, the AsyncAPI SDK is required by this package and does not need to be installed manually 
  - Check: composer info spryker/testify 
  - Install: composer require --dev "spryker/testify:^3.50.0"
  - Update: composer update "spryker/testify:^3.50.0"
- Spryker Testify AsyncAPI installed in version 0.1.1 or higher, the AsyncAPI SDK is required by this package and does not need to be installed manually
  - Check: composer info spryker/testify-async-api 
  - Install: composer require --dev "spryker/testify-async-api:^0.1.1"
  - Update: composer update "spryker/testify-async-api:^0.1.1"
- Spryks installed in version 0.5.2 or higher 
  - Check: composer info spryker-sdk/spryk 
  - Install: composer require --dev "spryker-sdk/spryk:^0.5.2"
  - Update: composer update "spryker-sdk/spryk:^0.5.2"
- A valid AsyncAPI schema file (located in resources/api/asyncapi.yml. You can use the example provided in Hello World App AsyncAPI)

# Testing the Asynchronous API

All schema files must be tested to align with the code that handles or produces messages. Each module that has an AsyncAPI schema file must have a dedicated test suite. But first things first.

## Generate the Code

To generate code you need to provide a valid schema file within your App (located in `resources/api/asyncapi.yml`). The below examples will be using the file provided in Hello World App AsyncAPI, which you can also use as a starting point for this guide. After you have added the schema file you need to run the code generator for it. The command to build code from your schema file is:

```
docker/sdk cli vendor/bin/asyncapi code:asyncapi:generate -o Pyz
```

After running the above command, your project now contain relevant modules and tests to get you started with the asynchronous API in the `src/` and `tests/` directories.

Checkout your `src/` and `tests/` directory for changes.

## Codeception Build

Before you can run your tests, you need to run Codeceptions build command:

```
docker/sdk cli vendor/bin/codecept build -c tests/PyzTest/AsyncApi/HelloWorld
```

Not everything can be automatically be generated you need to also update the Codeception configuration and the project configuration.

## Update Codeception Configuration

Open the created Codeception configuration file (`tests/PyzTest/AsyncApi/HelloWorld/codeception.yml`) and add the generated handlers to the configuration of the `AsyncApiHelper`.

The file should now contain this section:

```
\Spryker\Zed\TestifyAsyncApi\Business\Codeception\Helper\AsyncApiHelper:
    asyncapi: resources/api/asyncapi.yml
    handlers:
        - \Pyz\Zed\HelloWorld\Communication\Plugin\MessageBroker\UserCreatedMessageHandlerPlugin
```

Depending on your schema file you need to add your specific handlers. You can find all handlers inside of your `src/Pyz/Zed/HelloWorld/Communication/Plugin/MessageBroker` directory. Add each class name of the handlers to your codeception configuration.

## Update the Project Configuration

When testing the asynchronous API, we need all messages to go into the local message broker transport. This should only happen when you’re testing the API through automated tests.

Add the following configuration to your `config/Shared/config_local.php`. This is a very generic configuration and should not used in production.

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

## Run your tests

When you are done with all steps from above you can run your tests now:

```
docker/sdk testing vendor/bin/codecept run -c tests/PyzTest/AsyncApi/HelloWorld
```

This runs the tests and shows the result of your individual tests.

Let's take a look into some example methods where we explain what and how they are testing.

## Example test methods

### Handling messages

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

In the `Arrange` section you need to implement the code to have a message transfer that you expect to receive from another application.

In the `Act` section you need to call `runMessageReceiveTest` which is implemented in the `AsyncApiHelper` and does all the heavy lifting for you. The `runMessageReceiveTest` method takes as first argument the message that you expect to receive and the second argument is the channel name where you expect the message is coming through. Internally, the message and the channel name are validated against your `asyncapi.yml` schema file to ensure that both meet the definition.

In the `Assert` section you do your assertions based on your business logic. For example if after the message was handled a database entry exists.

The underlying `AsyncApiHelper` ensures inside of the `runMessageReceiveTest` method:

- That the message handler can handle the message. 
- That the expected channel name exists in the schema file. 
- That the expected message name exists in the schema file. 
- That the message contains all in the schema file defined required attributes. 
- The AsyncApiHelper also executes the handler with the passed message. After the runMessageReceiveTest method execution you need to make your assertions, such as verifying that a specific change was made in your database after processing the message. 
- The only thing left for you is to implement the business logic, update the tests accordingly to your business login, and run the tests. The tests can be ran with:

```
vendor/bin/codecept run -c tests/PyzTest/AsyncApi/HelloWorld/
```

### Publishing messages

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

In the `Arrange` section you need to prepare a message transfer that you expect to be sent when your business logic was executed.

In the `Act` section you call your business logic for example a facade method where you expect the message to be sent.

In the `Assert` section you need to call the `assertMessageWasEmittedOnChannel` with the expected message you create in the `Arrange` section. The first argument is the message that you expect to be sent and the second argument is the channel name that you expect where the message is sent through. Internally, the message and the channel name are validated against your asyncapi.yml schema file to ensure that both meet the definition.

The underlying `AsyncApiHelper` ensures inside of the `assertMessageWasEmittedOnChannel` method:

- That the expected channel name exists in the schema file. 
- That the expected message name exists in the schema file. 
- That the message was sent with all in the schema file defined required attributes.

