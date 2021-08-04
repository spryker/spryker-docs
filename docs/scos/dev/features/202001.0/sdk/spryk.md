---
title: Spryk Code Generator
originalLink: https://documentation.spryker.com/v4/docs/spryk
redirect_from:
  - /v4/docs/spryk
  - /v4/docs/en/spryk
---

The Spryk Code Generator is a tool developed to ease the process of generating pieces of code on core and project level. Furthermore, it links individual code generation definitions into specific scenarios you need on a daily basis.

To follow the Spryker's clean and complex architecture, you may need to write a lot of repetitive, boilerplate code. To avoid that tedious work, you can use Spryk, which will automatically generate and modify the required files according to the specified definitions. The definitions are implemented as a set of templates with placeholders to fill out during the execution of the tool, and small pieces of code that are created or modified for each specific definition. The generated code is available for further modification by a developer.

## Definition Types
Currently, we support the following definition types:

* Template definitions. A template definition adds a new file to your file system and uses Twig as a render engine, which enables you to create files from templates with placeholders. A template definition will at least need a template argument defined. The argument tells Spryk which template to use. Template definitions can have as many arguments as needed.
* Structure definitions. A structure definition allows you to define a directory structure. For example, the CreateSprykerModule definition contains the description of the created directories. The main argument of a structure definition is directories, which allows you to add a list of directories to be created.
* Method definitions. A method definition is able to add methods to a specified target, e.g. `Spryker\Zed\FooBar\Business\FooBarFacade`. This type of definitions needs more arguments to do their job.

## Installation
1. Add this private repository to your project's composer.json:
```js
"repositories": [
    ...
    {
        "type": "git",
        "url": "git@github.com:spryker-sdk/spryk.git"
    }
    ...
],
```

2. Install Spryk by running:
`composer require --dev spryker-sdk/spryk`

## How to use it
At this moment, there are two interfaces to run the definitions: Spryk Console and SprykGUI.

### Spryk Console
The Spryk Console is based on the Symfony's Console component. To start working with it, add it to your **ConsoleDependencyProvider**. Currently, there are two commands available: **SprykDumpConsole** and **SprykRunConsole**. To get the list of all of the definitions, run:
`vendor/bin/console spryk:dump`

To execute one definition, run:
`vendor/bin/console spryk:run {SPRYK NAME}`

When you run a definition, the console will ask you to provide all the needed arguments.

It is also possible to print all possible arguments to the console by using the **--{argument name}={argument value}** key.

### SprykGUI
This is a Graphical User Interface built inside the Zed application. To install it, run:

`composer require --dev spryker-sdk/spryk-gui`

Once SprykGUI is installed, you can navigate to it through Zed. You will find the list of all the available definitions, and after you have clicked on one of them, the form where you can enter the arguments will appear.

## Difference between Core and Project modes
The difference between the Core and Project modes is the place where your code is generated.

- Core has the vendor/spryker/{% raw %}{{{% endraw %} organization {% raw %}}}{% endraw %}/ root path;

- Project has the src/{% raw %}{{{% endraw %} organization {% raw %}}}{% endraw %}/ root path.

The organization option should be put into the namespaces config files (Core or Project).

Not all spryk definitions can be run on Project layers.

## How to change the mode
By default, all spryk definitions run in the **Project** mode. To use the **Core** mode, you need to run the `console spryk:run {% raw %}{{{% endraw %} SprykName {% raw %}}}{% endraw %}` command with the following argument in CLI: **--mode='core'**. Spryk will use the **Core** mode and an appropriate root path.

## How to create a definition
As the whole tool is covered by tests, you should also start to create your own definition by adding a test. To add only a new definition configuration, start by adding an integration test. You also need to add a name of the definition you want to test (e.g. **AddMySuperNiceFile**), and the assertion to have this file created after you have executed the test.

After this is all done, run the integration tests with the following command and see the test fail:

`vendor/bin/codecept run Integration -g {YOUR TEST GROUP}`

You will get a message that the definition was not found by the given name, so add the definition file for your new definition to `spryker/spryk/config/spryk/spryks`. After that, re-run the tests.

What comes next depends on the chosen definition type. If you have selected the template definition, then most likely you will see an error indicating that the defined template cannot be found. In this case, add your template to `spryker/spryker/config/spryk/templates` and re-run the tests — now they have to be green.
