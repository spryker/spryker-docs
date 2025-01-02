---
title: Architecture Sniffer
description: Use Architecture Sniffer to ensure the quality of Spryker architecture for both core and project
last_updated: Nov 11, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/architecture-sniffer
originalArticleId: 33ab1b5b-fce7-4439-8722-87e5ecd9f3c5
redirect_from:
  - /docs/sdk/dev/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/201811.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/201903.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/201907.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202001.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202005.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202009.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202108.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/development-tools/development-tools.html
  - /docs/scos/dev/sdk/development-tools/architecture-sniffer.html
related:
  - title: Code sniffer
    link: docs/scos/dev/sdk/development-tools/code-sniffer.html
  - title: Formatter
    link: docs/scos/dev/sdk/development-tools/formatter.html
  - title: Performance audit tool- Benchmark
    link: docs/scos/dev/sdk/development-tools/performance-audit-tool-benchmark.html
  - title: PHPStan
    link: docs/dg/dev/sdks/sdk/development-tools/phpstan.html
  - title: SCSS linter
    link: docs/scos/dev/sdk/development-tools/scss-linter.html
  - title: TS linter
    link: docs/scos/dev/sdk/development-tools/ts-linter.html
  - title: Spryk code generator
    link: docs/scos/dev/sdk/development-tools/spryk-code-generator.html
  - title: Static Security Checker
    link: docs/scos/dev/sdk/development-tools/static-security-checker.html
  - title: Tooling config file
    link: docs/scos/dev/sdk/development-tools/tooling-config-file.html
---

We use our [Architecture Sniffer Tool](https://github.com/spryker/architecture-sniffer) to ensure the quality of Spryker architecture for both core and project.

## Running the tool

The sniffer can find a lot of violations and will report them:

```php
$ vendor/bin/console code:sniff:architecture

// Sniff a specific subfolder of your project - with verbose output
$ vendor/bin/console code:sniff:architecture src/Pyz/Zed -v

// Sniff a specific module
$ vendor/bin/console code:sniff:architecture -m Customer
```

{% info_block infoBox "Tip" %}

`c:s:a` can be used as a shortcut.

{% endinfo_block %}

Additional options:

* `-p`: Priority [1 (highest), 2 (medium), 3 (experimental)] (defaults to 2)
* `-s`: Strict (to also report those nodes with a @SuppressWarnings annotation)
* `-d`: Dry-run, only output the command to be run

Run `–help` or `-h` to get help about usage of all options available.

See the [Architecture Sniffer documentation](https://github.com/spryker/architecture-sniffer) for details and information on how to set it up for your CI system as a checking tool for each PR.

## Conventions and guidelines

If you have a running Demoshop, go to Architecture rules in the Zed backend to get an overview of all currently implemented rules.
