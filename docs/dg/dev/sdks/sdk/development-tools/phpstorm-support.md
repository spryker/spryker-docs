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
- `console code:sniff:style -f`: Applies coding style fixes (module folders only).
- `console code:phpstan`: Runs static analysis (module folders only).
- `console code:sniff:architecture`: Detects architecture rule violations (module folders only).

### Installation
The installed commands within PHPStorm can be registered to run either as local machine commands or Spryker Docker SDK commands, depending on your configuration choice during installation. Consequently, ensure the appropriate environment is available (e.g., Spryker Docker SDK running for `docker` platform commands, or required tools installed locally for `local` platform commands).

The script currently supports Mac systems only.

**Prerequisite**:
Ensure that `awk` is installed on your local machine, as it is required to run the commands directly from PHPStorm.

To install the Spryker development tools configuration in PHPStorm:
1. Install the [spryker/development@^3.39.0](https://github.com/spryker/development) module.
2. Open a terminal on your local machine.
3. Navigate to the root project directory.
4. Run the following command in your project root:
```bash Copy code
vendor/bin/phpstorm-command-line-tools.sh
```
By default, the command installs with `--platform=docker`, configuring PHPStorm tools to run with the Spryker Docker SDK. To configure tools for local machine usage instead, specify `--platform=local`:
```bash Copy code
vendor/bin/phpstorm-command-line-tools.sh --platform=local
```

5. Restart PhpStorm for the changes to take effect.

This command adds or updates an XML configuration file in PHPStorm’s settings directory, dedicated exclusively to Spryker-related configurations, without altering any other settings.

It is recommended to rerun this command after updating the `spryker/development` module, to ensure the latest configurations and updates are applied.
