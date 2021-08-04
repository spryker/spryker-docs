---
title: Getting the list of console commands and available options
originalLink: https://documentation.spryker.com/2021080/docs/getting-the-list-of-console-commands-and-available-options
redirect_from:
  - /2021080/docs/getting-the-list-of-console-commands-and-available-options
  - /2021080/docs/en/getting-the-list-of-console-commands-and-available-options
---

With the Spryker Commerce OS comes an all-inclusive and fully pre-provisioned development environment on a virtual machine based on Vagrant and VirtualBox.

The command-line Console tool enables you to execute a great variety of commands, such as managing the Spryker Commerce OS installer to run the OS in any environment.

A *console command* is a PHP class that contains the implementation of functionality that can get executed from the command line. Spryker contains a wrapper over Symfony’s Console component that makes the implementation and configuration of a console command easier. This article provides detailed information about the console commands Spryker has.

To get the list of the available console commands, run:

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
 
In the above example output, you can see that Spryker prints some meta-information `Store: DE | Environment: development`. You can disable this output with the option `--quiet-meta`. This is very useful when you want to output, for example, JSON.

##  Next steps
See [Console commands in spryker](https://documentation.spryker.com/docs/console ) for details on all the commands you can use.

