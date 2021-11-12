---
title: Architecture sniffer
description: Use Architecture Sniffer to assert a certain quality of Spryker architecture for both core and project
last_updated: Nov 11, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/architecture-sniffer
originalArticleId: 33ab1b5b-fce7-4439-8722-87e5ecd9f3c5
redirect_from:
  - /2021080/docs/architecture-sniffer
  - /2021080/docs/en/architecture-sniffer
  - /docs/architecture-sniffer
  - /docs/en/architecture-sniffer
  - /v6/docs/architecture-sniffer
  - /v6/docs/en/architecture-sniffer
  - /v5/docs/architecture-sniffer
  - /v5/docs/en/architecture-sniffer
  - /v4/docs/architecture-sniffer
  - /v4/docs/en/architecture-sniffer
  - /v3/docs/architecture-sniffer
  - /v3/docs/en/architecture-sniffer
  - /v2/docs/architecture-sniffer
  - /v2/docs/en/architecture-sniffer
  - /v1/docs/architecture-sniffer
  - /v1/docs/en/architecture-sniffer
  - /docs/scos/dev/sdk/201811.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/201903.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/201907.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202001.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202005.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202009.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202108.0/development-tools/architecture-sniffer.html
related:
  - title: Code Sniffer
    link: docs/scos/dev/sdk/development-tools/code-sniffer.html
---

We use our [Architecture Sniffer Tool](https://github.com/spryker/architecture-sniffer) to assert a certain quality of Spryker architecture for both core and project.

## Running the Tool
The sniffer can find a lot of violations and will report them:

```php
$ vendor/bin/console code:sniff:architecture

// Sniff a specific subfolder of your project - with verbose output
$ vendor/bin/console code:sniff:architecture src/Pyz/Zed -v

// Sniff a specific module
$ vendor/bin/console code:sniff:architecture -m Customer
```

Tip: `c:s:a` can be used as a shortcut.

Additional options:

* `-p`: Priority [1 (highest), 2 (medium), 3 (experimental)] (defaults to 2)
* `-s`: Strict (to also report those nodes with a @SuppressWarnings annotation)
* `-d`: Dry-run, only output the command to be run

Run `–help` or `-h` to get help about usage of all options available.

See the [Architecture Sniffer documentation](https://github.com/spryker/architecture-sniffer) for details and information on how to set it up for your CI system as a checking tool for each PR.

## Conventions and Guidelines
If you have a running Demoshop, go to Architecture rules in Zed backend to get an overview of all currently implemented rules.
