---
title: Test console commands
description: How to test console commands.
last_updated: Jan 12, 2022
template: concept-topic-template
redirect_from:
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
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/testing-console-commands.html
  - /docs/scos/dev/guidelines/testing-guidelines/executing-tests/test-console-commands.html
---

Spryker supports several [test helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html) to assist you in testing your project. This article provides details of how to test console commands with ConsoleHelper.

To test console commands, do the following:

1. Add `\SprykerTest\Zed\Console\Helper\ConsoleHelper` to the `codeception.yml` file:

```yml
suites:
    Communication:
        path: Communication
        actor: {ModuleName}CommunnicationTester
        modules:
            enabled:
                - \SprykerTest\Zed\Console\Helper\ConsoleHelper
                - ...
```

For more information about the `codeception.yml` file, see [Test framework](/docs/dg/dev/guidelines/testing-guidelines/test-framework.html).

2. Create the test directory `tests/PyzTests/Zed/FooModule/Communication/Plugin/Console/`, if it is not available yet.
3. Add the test class:

```php
<?php

namespace PyzTest\Zed\FooModule\Communication\Plugin\Console;

use Codeception\Test\Unit;
use PyzTest\Zed\FooModule\FooModuleCommunicationTester;

class MyConsoleCommandTest extends Unit
{
    /**
     * @var \{Organization}Test\Zed\FooModule\FooModuleCommunicationTester
     */
    protected FooModuleCommunicationTester $tester;
}
```

4. Add the test method:

```php
public function testMyConsoleCommand(): void
{
    // You can also use a mocked command or add a mocked facade etc.
    $command = new MyConsoleCommand();
    $commandTester = $this->tester->getConsoleTester($command);

    $input = [
        MyConsoleCommand::ARGUMENT_FOO => 'foo-argument',
        '--' . MyConsoleCommand::OPTION_BAR => 'bar-option',
    ];

    $commandTester->execute($input);

    $this->assertSame(MyConsoleCommand::CODE_SUCCESS, $commandTester->getStatusCode());

    // When you expect some output from the console command you can assert it with:
    $this->assertStringContainsString('My console command output.', $commandTester->getDisplay());
}
```

That's it. You are all set to test the console commands.
