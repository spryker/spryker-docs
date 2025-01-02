---
title: Get the list of console commands and available options
description: Discover how to list console commands and view available options in Spryker's backend. Master key commands for efficient ecommerce platform management.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/getting-the-list-of-console-commands-and-available-options
originalArticleId: e075ad9a-b328-43d4-bde1-e6d0f6e5f0bc
redirect_from:
  - /docs/scos/dev/back-end-development/console-commands/get-the-list-of-console-commands-and-available-options.html
  - /docs/scos/dev/back-end-development/console-commands/getting-the-list-of-console-commands-and-available-options.html
related:
  - title: Console commands in Spryker
    link: docs/scos/dev/back-end-development/console-commands/console-commands.html
  - title: Implement a new console command
    link: docs/scos/dev/back-end-development/console-commands/implementing-a-new-console-command.html
---

The command-line console tool lets you execute a great variety of commands, such as managing the Spryker Commerce OS installer to run the OS in any environment.

A *console command* is a PHP class that contains the implementation of functionality that can get executed from the command line. Spryker contains a wrapper over Symfony's console component that makes the implementation and configuration of a console command easier. This document provides detailed information about the console commands Spryker has.

To get the list of the available console commands, run the following:

```bash
vendor/bin/console
```

To get a list of all available options, use the `-h` option:

```
vagrant@spryker-vagrant ➜  current git:(develop) vendor/bin/console gitflow:finish -h
Store: DE | Environment: development
Usage:
 gitflow:finish [-l|--level[="..."]] [-f|--from[="..."]] [-b|--branch[="..."]]
Options:
 --level (-l)          Define on which level this command should run (project|core) (default: "project")
 --from (-f)           Define from where you want to rebase (default: "develop")
 --branch (-b)         Define which branch you want to rebase
 --help (-h)           Display this help message
 --quiet (-q)          Do not output any message
 --verbose (-v|vv|vvv) Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
 --version (-V)        Display this application version
 --ansi                Force ANSI output
 --no-ansi             Disable ANSI output
 --no-interaction (-n) Do not ask any interactive question
```

In the above example output, you can see that Spryker prints some meta-information `Store: DE | Environment: development`. You can disable this output with the option `--quiet-meta`. This is very useful when you want to output—for example, JSON.

##  Next steps

For information about all commands, see [Console commands in spryker](/docs/dg/dev/backend-development/console-commands/console-commands.html)
