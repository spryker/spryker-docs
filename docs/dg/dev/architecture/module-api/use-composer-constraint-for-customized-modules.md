---
title: Use Composer constraint for customized modules
description: To avoid BC breaking changes and keep project updates safe and predictable, a project should use ~ (tilde) composer constraint instead of ^ (caret) for the customized modules.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/using-composer-constraint
originalArticleId: d7c068b1-d7bf-4404-96c5-0f568f061874
redirect_from:
  - /docs/scos/dev/architecture/module-api/using-composer-constraint-for-customized-modules.html
related:
  - title: Performance and scalability
    link: docs/dg/dev/architecture/module-api/performance-and-scalability.html
  - title: Semantic versioning - major vs. minor vs. patch release
    link: docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html
  - title: "Declaration of module APIs: Public and private"
    link: docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html
---

Spryker OS is modular and follows the rules of semantic versioning. Every *backward compatibility* (BC) breaking change of module [API](/docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html) is considered a major release. However, what happens to non-API? Spryker can change non-API functionalities in minor and patch releases. This way Spryker provides new features for different business verticals.

When you customize Spryker modules by changing their behavior on the project level, even minor changes could potentially cause migration efforts. To avoid such cases and keep project updates safe and predictable, a project should use *~* (tilde) composer constraint instead of *^* (caret) for the customized modules.

To easily detect the extended core modules and to update `composer.json` constraints from using `^` to `~`, Spryker provides the Composer Constrainer tool `vendor/bin/console code:constraint:modules`. The tool suggests required changes in `composer.json`.Similarly, you can check non-Spryker package usage as well. If some classes of non-Spryker vendors were used on a project level, you may also validate corresponding packages to be locked to a minor version.

## Install the Composer constrainer

1. Require the `ComposerConstainer` module:

```bash
composer require --dev spryker-sdk/composer-constrainer
```

This is a development-only "require-dev" module. Make sure you include it as such.

2. Add the console command `SprykerSdk\Zed\ComposerConstrainer\Communication\Console\ComposerConstraintConsole` to your `Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands()` inside `if ($this->getConfig()->isDevelopmentConsoleCommandsEnabled()) {` to enable it only in the development mode.

3. Generate transfers:

```bash
console transfer:generate
```

## Use the Composer constrainer

1. Run the command:

```bash
vendor/bin/console code:constraint:modules -d
```

This command makes no changes in the composer.json. The return code of this command is either 0 (success) or 1 (error, some constraints need to be changed). This is the recommended hook for your CI system. The full version of the `-d` option is also available as `--dry-run`.

2. Run the command:

```bash
vendor/bin/console code:constraint:modules -dw
```

This command validates not only Spryker packages but any other vendor packages as well. The full version of the `-w` option is also available as `--with-foreign`.

3. Run the command:

```bash
vendor/bin/console code:constraint:modules
```

This command changes the project's `composer.json`. Make sure you dry run the command before applying the changes with this command.

4. Run the command:

```bash
vendor/bin/console code:constraint:modules -w
```

This command changes the project's `composer.json` with consideration of any usage of vendor packages.
