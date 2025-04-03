---
title: Code Sniffer
description: With the Code Sniffer tool, you can keep your code clean, find issues, and fix them automatically.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/code-sniffer
originalArticleId: 5fd3244a-f387-4188-a8d0-076eb8afe1f1
redirect_from:
  - /docs/sdk/dev/development-tools/code-sniffer.html
  - /docs/scos/dev/sdk/201811.0/development-tools/code-sniffer.html
  - /docs/scos/dev/sdk/201903.0/development-tools/code-sniffer.html
  - /docs/scos/dev/sdk/201907.0/development-tools/code-sniffer.html
  - /docs/scos/dev/sdk/202001.0/development-tools/code-sniffer.html
  - /docs/scos/dev/sdk/202005.0/development-tools/code-sniffer.html
  - /docs/scos/dev/sdk/202009.0/development-tools/code-sniffer.html
  - /docs/scos/dev/sdk/202108.0/development-tools/code-sniffer.html
  - /docs/scos/dev/sdk/development-tools/code-sniffer.html
related:
  - title: Architecture sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html
  - title: Formatter
    link: docs/dg/dev/sdks/sdk/development-tools/formatter.html
  - title: Performance audit tool- Benchmark
    link: docs/dg/dev/sdks/sdk/development-tools/benchmark-performance-audit-tool.html
  - title: PHPStan
    link: docs/dg/dev/sdks/sdk/development-tools/phpstan.html
  - title: SCSS linter
    link: docs/dg/dev/sdks/sdk/development-tools/scss-linter.html
  - title: TS linter
    link: docs/dg/dev/sdks/sdk/development-tools/ts-linter.html
  - title: Spryk code generator
    link: docs/dg/dev/sdks/sdk/spryks/spryks.html
  - title: Static Security Checker
    link: docs/dg/dev/sdks/sdk/development-tools/static-security-checker.html
  - title: Tooling config file
    link: docs/dg/dev/sdks/sdk/development-tools/tooling-configuration-file.html
---

To correspond to [PSR-2](http://www.php-fig.org/psr/psr-2/) and additional standards, we integrated the well known [PHPCodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer).

Code Sniffer is a very powerful tool that helps to keep your code clean and prevent simple mistakes. The Sniffer can find all existing issues, and can also auto-fix the majority of them (when used with the `-f` option).

```php
$ vendor/bin/console code:sniff:style

	// Fix fixable errors instead of just reporting
	$ vendor/bin/console code:sniff:style -f

	// Sniff a specific module in your project (looks into all application layers Zed, Yves, Client, ...)
	$ vendor/bin/console code:sniff:style -m Discount

	// Sniff a specific subfolder of your project
	$ vendor/bin/console code:sniff:style src/Pyz/Zed

	// Run a specific sniff only
	$ vendor/bin/console code:sniff:style ... -s Spryker.Commenting.FullyQualifiedClassNameInDocBlock
```

There are two levels of the Sniffer's severity: Level 1 (normal, used by default) and Level 2 (strict). Level 2 was added to support an additional check of extra complexity. It is recommended to use it for the development of Core modules. A full list of the included sniffs can be found on [GitHub](https://github.com/spryker/code-sniffer/tree/master/docs/sniffs.md).

```php
	// Run code sniffer with Level 1
	console c:s:s -m Spryker.Development -l 1

	// Run code sniffer with Level 2
	console c:s:s -m Spryker.Development -l 2 -v
```

{% info_block infoBox "Tip" %}

`c:s:s` can be used as short for `code:sniff:style`.

{% endinfo_block %}

Additional options:

* `-v`: Verbose output
* `-d`: Dry-run, only output the command to be run

Remember to always commit your changes before executing this command!

Run `–help` or `-h` to get help about the usage of all available options.

See the [Code Sniffer](https://github.com/spryker/code-sniffer) documentation for details and information on how to set it up for your CI system as a checking tool for each PR.
