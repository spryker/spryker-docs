---
title: Spryks
description: The Spryk code generator is a tool developed to ease the process of generating pieces of code on core and project level.
last_updated: Jan 23, 2023
template: concept-topic-template
keywords: AddModule
originalLink: https://documentation.spryker.com/2021080/docs/spryk
originalArticleId: 75d7b12b-6bf1-4ace-a09d-37033947d5e5
redirect_from:
  - /docs/sdk/dev/spryks/spryks.html
  - /docs/scos/dev/sdk/201811.0/development-tools/spryk-code-generator.html
  - /docs/scos/dev/sdk/201903.0/development-tools/spryk-code-generator.html
  - /docs/scos/dev/sdk/201907.0/development-tools/spryk-code-generator.html
  - /docs/scos/dev/sdk/202001.0/development-tools/spryk-code-generator.html
  - /docs/scos/dev/sdk/202005.0/development-tools/spryk-code-generator.html
  - /docs/scos/dev/sdk/202009.0/development-tools/spryk-code-generator.html
  - /docs/scos/dev/sdk/202108.0/development-tools/spryk-code-generator.html
  - /docs/scos/dev/sdk/development-tools/spryk-code-generator.html
---

To follow Spryker's clean and complex architecture, you may need to write a lot of repetitive, boilerplate code. To avoid that tedious work, you can use the *Spryk* code generator, which automatically generates and modifies the required files according to the specified definitions. It also links individual code generation definitions into specific scenarios you need on a daily basis. The definitions are implemented as a set of templates with placeholders to fill out during the execution of the tool, and small pieces of code that are created or modified for each specific definition. The generated code is available for further modification by a developer.

Spryks are written with the help of YAML files. The names of the YAML files also represent the Spryk's name. In most cases, the Spryk YAML file contains arguments that are needed to run the Spryk build. Almost all Spryks need the module name to run properly, and some Spryks require much more arguments. For details about the YAML file structure and arguments, see [Spryk configuration reference](/docs/dg/dev/sdks/sdk/spryks/spryk-configuration-reference.html#the-root-configuration).

The majority of Spryks need to execute other Spryks before the called Spryk can run. For example, `Add a Zed Business Facade` needs to have a properly created module before the facade itself can be created. Therefore, Spryks have *pre* and *post* Spryks, and with the call of one Spryk, many things can be and are created.

## Spryk definition types

We support the following Spryk definition types:

- *Template definitions.* A template definition adds a new file to your file system and uses Twig as a render engine, which enables you to create files from templates with placeholders. A template definition needs at least a template argument defined. The argument tells Spryk which template to use. Template definitions can have as many arguments as needed.
- *Structure definitions.* A structure definition lets you define a directory structure. For example, the `CreateSprykerModule` definition contains the description of the created directories. The main argument of a structure definition is directories, which enables you to add a list of directories to be created.
- *Method definitions.* A method definition can add methods to a specified target, such as `Spryker\Zed\FooBar\Business\FooBarFacade`. This type of definition needs more arguments to do its job.

## Install Spryk

To install Spryk, do the following:

1. Add this repository to your project's `composer.json`:

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

2. Run the command:

```bash
composer require --dev spryker-sdk/spryk
```

## Using Spryks

There are two interfaces to run the definitions: Spryk Console and SprykGUI.

### Spryk Console

Spryk Console is based on the Symfony's Console component. To start working with Spryk Console, add it to your `ConsoleDependencyProvider`.
There are two commands for Spryk Console: `SprykDumpConsole` and `SprykRunConsole`. The available commands are listed in the table:

<div class="width-100">

| COMMAND      | DESCRIPTION |
| ----------- | ----------- |
| vendor/bin/console spryk:dump      | Lists top level Spryks.       |
| vendor/bin/console spryk:dump {SPRYK NAME} | Lists all options available for a specific Spryk. |
| vendor/bin/console spryk:dump --level=all | Lists all available Spryks. |
| vendor/bin/console spryk:run {SPRYK NAME}  | Executes a single specific Spryk.      |
| vendor/bin/console spryk:build | Reflects changes in Spryk arguments and generates a new cache for them. |

</div>

When you run a Spryk, the console asks you to provide all the needed arguments to build the Spryk, providing a default value when possible.

### SprykGUI

This is a Graphical User Interface (GUI) built inside the Back Office application. To install it, run this command:

```bash
composer require --dev spryker-sdk/spryk-gui
```

{% info_block infoBox "Info" %}

We recommend installing it as a development dependency, since changes in the code on the production environment must not be allowed, and may lead to a nonworking application.

{% endinfo_block %}

Once SprykGUI is installed, you can navigate to it through the Back Office. There, you can find the list of all the available definitions, and after you have clicked on one of them, the form where you can enter the arguments appears.

### Non-interactive mode

After running `console spryk:dump {SPRYK NAME}`, you get a list of options required for the chosen Spryk:

```bash
╰─$ console spryk:dump AddYvesPage
 List of all "AddYvesPage" options:
Option           
controller       
controllerMethod
mode             
module           
organization     
theme
```

Knowing these parameters enables you to run this Spryk in a non-interactive mode:

```bash
console spryk:run AddYvesPage --controller=Test --controllerMethod=index --mode=project --module=Test --organization=Pyz --theme=default
```

{% info_block infobox %}

Some Spryks have interactive arguments, like interface name, which can't be passed as a command line argument.

{% endinfo_block %}


## Core and Project modes

The difference between the Core and Project modes is the place where your code is generated.

- *Core* has the `vendor/spryker/{% raw %}{{{% endraw %} organization {% raw %}}}{% endraw %}/ root` path;
- *Project* has the `src/{% raw %}{{{% endraw %} organization {% raw %}}}{% endraw %}/ root` path.

Put the organization option into the namespaces config files (Core or Project).

{% info_block warningBox "Warning" %}

Not all Spryk definitions can be run on Project layers.

{% endinfo_block %}

### How to change the mode

By default, all Spryk definitions run in the *Project* mode. To use the *Core* mode, run
the command:

```bash
console spryk:run {% raw %}{{{% endraw %} SprykName {% raw %}}}{% endraw %}
```

with the `--mode='core'` argument in CLI.
Afterward, Spryk uses the *Core* mode and an appropriate root path.

## Create a definition

As the whole tool is covered by tests, you need also to start creating your own definition by adding a test. To only add a new definition configuration, start by adding an integration test. You also need to add the name of the definition you want to test—for example, *`ADD_MY_SUPER_NICE_FILE`*—and the assertion to have this file created after you have executed the test.

Once done, run the integration tests with the following command and see if the test fails:

```bash
vendor/bin/codecept run Integration -g {YOUR TEST GROUP}
```

This shows a message that the definition was not found by the given name. You can then add the definition file for your new definition to `spryker/spryk/config/spryk/spryks`. After that, rerun the tests.

What comes next depends on your chosen definition type. If you select the template definition, an error can be displayed, indicating that the defined template cannot be found. In this case, add your template to `spryker/spryker/config/spryk/templates` and rerun the tests. After doing this, they turn green.

## Extend Spryks

There are two ways to extend Spryks: by adding new Spryks and by adding Spryk templates.

### Add Spryks

You can add your own Spryks by creating a Spryk definition in your project's `config/spryk/spryks/` directory. The tool will find the Spryk definitions in this directory, and the Spryk definitions can be executed as usual.

For more information on adding new Spryks, see [Adding a new Spryk](/docs/dg/dev/sdks/sdk/spryks/adding-spryks.html).

### Add Spryk templates

To add a Spryk template, create the template in your project's `config/spryk/templates/` directory.

The tool finds the Spryk template in this directory, and the template can be used in your Spryks.

## Configuration

Spryks need some project-related configurations. These are passed automatically to the tool.

The following configurations are passed to the Spryk tool:

- `Spryker\Shared\Kernel\KernelConstants::PROJECT_NAMESPACE`
- `Spryker\Shared\Kernel\KernelConstants::PROJECT_NAMESPACES`
- `Spryker\Shared\Kernel\KernelConstants::CORE_NAMESPACES`
