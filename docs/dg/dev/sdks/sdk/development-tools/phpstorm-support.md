---
title: PHPStorm Support
description: Enable Spryker tools in PHPStorm to enhance your development experience
last_updated: Oct 20, 2024
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/sdk/development-tools/development-tools.html
related:
  - title: Code sniffer
    link: docs/scos/dev/sdk/development-tools/code-sniffer.html
  - title: PHPStan
    link: docs/scos/dev/sdk/development-tools/phpstan.html

---

## PHPStorm Support
Spryker provides support for tools that perform code style fixes, static analysis, and architecture checks, each accessible within PHPStorm’s External Tools panel. These tools are available at both module and project levels and can be executed directly by right-clicking within the project directory tree.

The following tools are included:
- `console code:sniff:style -f`: Applies coding style fixes.
- `console code:phpstan`: Runs static analysis.
- `console code:sniff:architecture`: Detects architecture rule violations.

### Installation

**Prerequisite**: Ensure that `awk` is installed on your local machine, as it is required to run the commands directly from PHPStorm.

To install the Spryker development tools configuration in PHPStorm:
1. Install the `spryker/development` module.
2. Open a terminal on your local machine.
3. Navigate to your project directory.
4. Run the following command in your project root:

```bash Copy code
vendor/bin/phpstorm-command-line-tools.sh
```

This command adds or updates an XML configuration file in PHPStorm’s settings directory, dedicated exclusively to Spryker-related configurations, without altering any other settings. The script currently supports Mac and Linux systems only.

It is recommended to rerun this command periodically to apply the latest updates.
