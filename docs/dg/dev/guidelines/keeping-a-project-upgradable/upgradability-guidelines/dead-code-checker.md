---
title: Dead code checker
description: Learn about the dead code checker and how it extends core classes within your Spryker based project.
template: howto-guide-template
last_updated: Oct 24, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/dead-code-checker.html
---

The dead code checker checks for dead code that extends core classes in your project.

## Problem description

The project has the capability to extend Spryker core classes, but over time, it may become ineffective because of changes in the project or core components.
This results in unnecessary additional time investment from developers, as they need to update the dead code.
This check examines potential obsolete classes, with a tendency to overlook important Spryker kernel classes like `Factory`, `Facade`, or `DependencyProvider`.
If desired, you have the option to disable the dead code checker for a particular class using the `@evaluator-skip-dead-code` annotation.

## Example of an evaluator error message

```bash
=================
DEAD CODE CHECKER
=================

Message: The class "Pyz/Zed/Single/Communication/Plugin/SinglePlugin" is not used in the project.
Target:  Pyz/Zed/Single/Communication/Plugin/SinglePlugin
```

## Example of code that causes an evaluator error

Unused class `Pyz/Zed/Single/Communication/Plugin/SinglePlugin` that produces an error:

```php
namespace Pyz\Zed\Single\Communication\Plugin;

use Spryker\Zed\Single\Communication\Plugin\SinglePlugin as SprykerSinglePlugin;

class SinglePlugin extends SprykerSinglePlugin
{
    ...
}
```

## Resolve the error

Remove the unused dead code in project.


## Run only this checker
To run only this checker, include `DEAD_CODE_CHECKER` into the checkers list. Example:
```bash
vendor/bin/evaluator evaluate --checkers=DEAD_CODE_CHECKER
```
