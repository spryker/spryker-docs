---
title: Using ~ Composer Constraint for Customized Modules
originalLink: https://documentation.spryker.com/2021080/docs/using-composer-constraint
redirect_from:
  - /2021080/docs/using-composer-constraint
  - /2021080/docs/en/using-composer-constraint
---

Spryker OS is modular and follows the rules of semantic versioning. Every BC-breaking change of module [API](https://documentation.spryker.com/docs/definition-api) is considered a major release. But what happens to non-API? Spryker leverages the ability to change non-API functionalities in minor and patch releases. This way Spryker provides new features for different business verticals.

When you customize Spryker modules by changing their behavior on project level, even minor changes could potentially cause migration efforts. To avoid such cases and keep project updates safe and predictable, a project should use `~` (tilde) composer constraint instead of `^` (caret) for the customized modules.

To easily detect the extended core modules and to update composer.json constraints from using `^` to use `~`, Spryker provides the Composer Constrainer tool `vendor/bin/console code:constraint:modules`. The tool suggests required changes in `composer.json`.

Pretty much in the same way you can check non Spryker package usages as well. In case if some classes of non Spryker vendor were used on a project level - you may also validate corresponding packages to be locked to minor version.

## Installing the Composer Constrainer

To install the tool, do the following:

1. Require the `ComposerConstainter` module:
`composer require --dev spryker-sdk/composer-constrainer`
This is a development only "require-dev" module. Make sure you include it as such.

2. Add the console command `SprykerSdk\Zed\ComposerConstrainer\Communication\Console\ComposerConstraintConsole` to your `Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands()` inside `if ($this->getConfig()->isDevelopmentConsoleCommandsEnabled()) {
` to enable it only in development mode.

3. Run the following command:
`console transfer:generate`

## Using the Composer Constrainer
To use the Composer Constrainer tool:

1. Run the command:
`vendor/bin/console code:constraint:modules -d`
This command makes no changes in the composer.json. The return code of this command is either 0 (success) or 1 (error, some constraints need to be changed). This is the recommended hook for your CI system. Full version of `-d` option is also available as `--dry-run`.

2. Run the command:
`vendor/bin/console code:constraint:modules -dw`
This command validates not only Spryker packages, but any other vendors packages as well. Full version of `-w` option is also available as `--with-foreign`.

3. Run the command:
`vendor/bin/console code:constraint:modules`
This command changes the project's composer.json. Make sure you dry run the command before applying the changes with this command.

4. `vendor/bin/console code:constraint:modules -w`
This command changes the project's composer.json with consideration of any usage of vendor packages.

