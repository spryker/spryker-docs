---
title: Testing console commands
description: How to test console commands.
last_updated: Jan 12, 2022
template: concept-topic-template
---

Spryker supports several [test helpers](/docs/scos/dev/guidelines/testing-guidelines/test-helpers.html) to assist you in testing your project. This article provides details of how to test console commands with ConsoleHelper.

To test console commands, do the following:

1. Add `\SprykerTest\Zed\Console\Helper\ConsoleHelper` to the `codeception.yml` file:

```
suites:
    Communication:
        path: Communication
        class_name: {ModuleName}CommunnicationTester
        modules:
            enabled:
                - \SprykerTest\Zed\Console\Helper\ConsoleHelper
                - ...
```
For more information about the `codeception.yml` file, see [Test framework](https://docs.spryker.com/docs/scos/dev/guidelines/testing-guidelines/test-framework.html).

2. Create the test directory `tests/PyzTests/Zed/FooModule/Communication/Plugin/Console/`, if it is not available yet.
3. Add the test class:

```
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
```
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