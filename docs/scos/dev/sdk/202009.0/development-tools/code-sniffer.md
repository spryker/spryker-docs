---
title: Code sniffer
originalLink: https://documentation.spryker.com/v6/docs/code-sniffer
redirect_from:
  - /v6/docs/code-sniffer
  - /v6/docs/en/code-sniffer
---

To correspond to [PSR-2 standards](http://www.php-fig.org/psr/psr-2/), we integrated the well known [PHP-CS Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) and [PHPCodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer).

Code Sniffer is a very powerful tool that helps to keep the code clean and prevent simple mistakes. The sniffer can find all the issues, and can also auto-fix most of them (when used with -f option).

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

There are two levels of sniffer severity: Level 1 (normal, used by default) and Level 2 (strict). Level 2 was added to support an additional check of extra complexity. It is recommended to use it for Core modules development. The full list of the included snippets can be found on [GitHub](https://github.com/spryker/code-sniffer/tree/master/docs).

```php
	// Run code sniffer with Level 1
	console c:s:s -m Spryker.Development -l 1

	// Run code sniffer with Level 2
	console c:s:s -m Spryker.Development -l 2 -v
```

Tip: `c:s:s` can be used as short for `code:sniff:style`.

Additional options:

* `-v`: Verbose output
* `-d`: Dry-run, only output the command to be run

Always commit your changes before executing this command!

Run `–help` or `-h` to get help about usage of all options available.

See the [code sniffer](https://github.com/spryker/code-sniffer) documentation for details and information on how to set it up for your CI system as a checking tool for each PR.
