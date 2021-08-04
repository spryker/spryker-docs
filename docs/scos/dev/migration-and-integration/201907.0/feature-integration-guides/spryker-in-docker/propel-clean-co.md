---
title: Propel Clean Command Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/propel-clean-command-feature-integration-201907
redirect_from:
  - /v3/docs/propel-clean-command-feature-integration-201907
  - /v3/docs/en/propel-clean-command-feature-integration-201907
---

## Install Feature Core

### Prerequisites

Ensure that the related features are installed:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Feature](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/spryker-core-fe) |

### 1)Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/propel:"^3.10.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
|  `Propel ` |  `vendor/spryker/propel ` |
</div></section>

### 2) Set Up Behavior

Clean up codeception configuration by deleting  `SetupHelper ` from all codeception configuration files:

```shell
- \SprykerTest\Shared\Application\Helper\SetupHelper
```

{% info_block infoBox %}
Use  `SprykerTest\Shared\Testify\Helper\DataCleanupHelper ` instead to clean up data after each test that can intersect with other tests.
{% endinfo_block %}

Enable the  `DatabaseDropTablesConsole ` console command in  `Pyz\Zed\Console\ConsoleDependencyProvider `:

<details open>
    <summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

```
    <?php
    class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            ...
            new DatabaseDropTablesConsole(),
            ...
```
</details>

{% info_block infoBox %}
* Spryker\Zed\Propel\Communication\Console\DatabaseExportConsole is deprecated.
{% endinfo_block %}
{% info_block infoBox %}
* Spryker\Zed\Propel\Communication\Console\DatabaseImportConsole is deprecated.
{% endinfo_block %}

Run  `vendor/bin/console ` and make sure the  `propel:tables:drop ` command is in the list.

<!-- Last review date: Aug 07, 2019 -->
