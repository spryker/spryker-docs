---
title: Code Architecture Guide
description: We use our Architecture Sniffer Tool to assert a certain quality of Spryker architecture for both core and project.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/code-architecture-guide
originalArticleId: ecf19653-3419-4eb2-b754-e724e0239e13
redirect_from:
  - /2021080/docs/code-architecture-guide
  - /2021080/docs/en/code-architecture-guide
  - /docs/code-architecture-guide
  - /docs/en/code-architecture-guide
  - /v6/docs/code-architecture-guide
  - /v6/docs/en/code-architecture-guide
  - /v5/docs/code-architecture-guide
  - /v5/docs/en/code-architecture-guide
  - /v4/docs/code-architecture-guide
  - /v4/docs/en/code-architecture-guide
  - /v3/docs/code-architecture-guide
  - /v3/docs/en/code-architecture-guide
  - /v2/docs/code-architecture-guide
  - /v2/docs/en/code-architecture-guide
  - /v1/docs/code-architecture-guide
  - /v1/docs/en/code-architecture-guide
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

**Additional options**:

* -p: Priority [1 (highest), 2 (medium), 3 (experimental)] (defaults to 2)
* -s: Strict (to also report those nodes with a @SuppressWarnings annotation)
* -d: Dry-run, only output the command to be run

Run –help or -h to get help about usage of all options available.

See the [architecture sniffer](https://github.com/spryker/architecture-sniffer) documentation for details and information on how to set it up for your CI system as a checking tool for each PR.

## Conventions and Guidelines

If you have a running Demoshop, go to [Architecture rules](`http://zed.mysprykershop.com/development/architecture/rules`) in Zed backend to get an overview of all currently implemented rules.
