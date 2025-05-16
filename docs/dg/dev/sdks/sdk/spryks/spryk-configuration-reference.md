---
title: Spryk configuration reference
description: Learn about the Spryk file structure and its elements with this Spryks configuration reference for your projects.
template: howto-guide-template
redirect_from:
- /docs/sdk/dev/spryks/spryk-configuration-reference.html

last_updated: Nov 10, 2022
---

All the Spryk definitions are located in the `config/spryk/spryks` directory. A Spryk's name is defined by its filename.
The following example illustrates the Spryk configuration:

```yaml
spryk: wrapper
description: "Adds CRUD code for a Domain Entity."
condition: "organization === 'Pyz'"
mode: both
level: 2

arguments:
    organization:
        inherit: true
        default: Spryker

excludedSpryks:
    - AddZedPresentationTwig

postSpryks:
    - AddZedDomainEntityDeleter
```

This document explains the configuration of Spryks.

## The root configuration

In Spryk configuration, the following elements are used:

### Spryk

The name of the builder that is used to process the Spryk. All the builders reside in `src/Spryk/Model/Spryk/Builder/`
and must implement `SprykerSdk\Spryk\Model\Spryk\Builder\SprykBuilderInterface::getName()`.

### description

The description of the Spryk. This must be added to give the reader of the Spryk definition a clear description of what this Spryk does.

### mode

The mode of the Spryk. This is used to run specific Spryks by passing the `--mode` option to the command. The reserved `both` value allows running a Spryk in any case.

The following modes are available:

- `mode: project`—Spryk runs only with the `--mode=project` option in the CLI command.

- `mode: core`—Spryk runs only with the `--mode=core` option in the CLI command.

- `mode: both`—Spryk runs regardless of the `--mode` option value, or without this option at all in the CLI command.

### level

Used only for the Spryk dumper to dump the specific level of Spryks. You can use, for example,
`vendor/bin/spryk-dump --level=1` or `vendor/bin/spryk-dump --level=all`.

### condition

Defines the condition of the Spryk execution. If the condition is `false`, the Spryk execution is skipped with its pre- or postSpryks. You must define the arguments that are used in condition, in the Spryk arguments list.

### arguments

The Spryk argument list. These arguments are used in the Spryk builder. See [Arguments](#arguments) for details.

### preSpryks

The Spryks that should be executed before the current Spryk.

### postSpryks

The Spryks that must be executed after the current Spryk.

### excludedSpryks

Excludes the execution of the Spryks that are placed in `preSpryks` and `postSpryks`. Useful when you reuse a Spryk and you don't need some of the Spryks defined in `preSpryks` or `postSpryks`.

### preCommands

The commands that must be executed before the current Spryk.

### postCommands

The commands that should be executed after the current Spryk.

## Arguments

The part with arguments in a Spryk can look like this:

```yaml
arguments:
    organization: # argument name
        inherit: true
        default: Spryker
```

There can be the following arguments:

### inherit

Declares that the argument value can be inherited from the parent Spryk when not set explicitly.

### default

The default value for the argument if not passed from CLI.

### value

The argument value to be used. Useful when you need to compose a value from another argument value or apply some TWIG filters or functions.
Example:

```yaml
arguments:
    target:
      value: "{{ organization }}\\Glue\\{{ module }}\\Dependency\\Client\\{{ module }}To{{ dependentModule }}ClientBridge"

    name:
      value: "CLIENT_{{ dependentModule | underscored | upper }}"
```

### isOptional

If an argument is optional, the values can be empty. Otherwise, the argument's value must be provided. This option is `false` by default, which means the value is required.

### isMultiple

The argument can have multiple values, and a value can be provided as a list of values:

```yaml
arguments:
    target:
        isMultiple: true
```

### allowOverride

This option is only valid for the body argument of a Spryk method and defines whether you can override the existing method body:

```yaml
body:
  allowOverride: true
  value: "App/Registry/ZedControllerDisconnectMethod.php.twig"
```

### callback

The pre-processing callback that is applied to value before passing to the Spryk. It should implement `SprykerSdk\Spryk\Model\Spryk\Definition\Argument\Callback\CallbackInterface`.
