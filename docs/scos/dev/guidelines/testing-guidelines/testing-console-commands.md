---
title: Testing console commands
description: How to test console commands.
last_updated: Jan 12, 2022
template: concept-topic-template
---

Spryker supports a number of test helpers to assist you in testing your project. This article provides details of how to test console commands.

## ConsoleHelper

To be able to test console commands you need to:

- Add the `\SprykerTest\Zed\Console\Helper\ConsoleHelper` to your `codeception.yml`.

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

- Create the test directory `tests/PyzTests/Zed/FooModule/Communication/Plugin/Console/` if not present.
- Add the test class.

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

- Add a test method.
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