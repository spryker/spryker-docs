---
title: Tooling configuration file
description: This document provides information about a tooling config file that contains settings for supported tools and directives.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.tooling-config-fileer.com/2021080/docs/tooling-config-file
originalArticleId: 535d6b07-76d8-47f1-a4d1-5b404439109e
redirect_from:
  - /docs/sdk/dev/development-tools/tooling-config-file.html
  - /docs/scos/dev/sdk/201811.0/development-tools/tooling-config-file.html
  - /docs/scos/dev/sdk/201903.0/development-tools/tooling-config-file.html
  - /docs/scos/dev/sdk/201907.0/development-tools/tooling-config-file.html
  - /docs/scos/dev/sdk/202001.0/development-tools/tooling-config-file.html
  - /docs/scos/dev/sdk/202005.0/development-tools/tooling-config-file.html
  - /docs/scos/dev/sdk/202009.0/development-tools/tooling-config-file.html
  - /docs/scos/dev/sdk/202108.0/development-tools/tooling-config-file.html
  - /docs/scos/dev/sdk/development-tools/tooling-config-file.html
related:
   - title: Code sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html
   - title: Formatter
    link: docs/dg/dev/sdks/sdk/development-tools/formatter.html
  - title: Architecture sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html
  - title: Performance audit tool- Benchmark
    link: docs/scos/dev/sdks/sdk/development-tools/benchmark-performance-audit-tool.html
  - title: PHPStan
    link: docs/dg/dev/sdks/sdks/sdk/development-tools/phpstan.html
  - title: SCSS linter
    link: docs/dg/dev/sdks/sdk/development-tools/scss-linter.html
  - title: TS linter
    link: docs/dg/dev/sdks/sdk/development-tools/ts-linter.html
  - title: Spryk code generator
    link: docs/dg/dev/sdks/sdk/spryks/spryks.html
  - title: Static Security Checker
    link: docs/dg/dev/sdks/sdk/development-tools/static-security-checker.html
---

In order to make the tool configuring more convenient, we introduced the `.tooling.yml` file. It contains a variety of settings for different tools in one place, helping you to keep the number of files on the root level as small as possible. The `.tooling.yml` file should also be in `.gitattributes` to be ignored for tagging:

```yml
... export-ignore
```

The following tools and directives are supported.

## Code sniffer

The code sniffer configuration section can have one directive: level. Example:

```yml
code-sniffer:
    level: 1
 ```

## Architecture sniffer

The architecture sniffer configuration section can have two directives: priority and ignoreErrors. Example:

```yml
architecture-sniffer:
    priority: 5
    ignoreErrors:
        - '#DependencyProvider#'
        - '#DevelopmentCommunicationFactory#'
```

Note that the keywords listed in the **ignoreErrors** directive are regular expressions. They are used to match the lines in the error list provided as a result of the architecture sniffer doing its job.
