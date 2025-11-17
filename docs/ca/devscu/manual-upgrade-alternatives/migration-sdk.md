---
title: Migration SDK
description: Learn how the open-source Migration SDK helps you plan and execute manual Spryker upgrades when the Spryker Code Upgrader cannot be used.
keywords: Upgrade, MigrationSDK.
template: howto-guide-template
---

The **Migration SDK** is an open-source, community-developed tool that assists you in planning and executing manual upgrades of Spryker projects.  
It analyzes your project and generates detailed reports, upgrade instructions, compatibility checks, and effort estimations.

Unlike the **Spryker Code Upgrader**, the Migration SDK does **not** modify your codebase or create merge requests.  
Instead, it provides the data and guidance you need to perform updates manually and safely.

{% info_block warningBox "Warning" %}
The Migration SDK is a community-maintained tool. It is not officially supported or guaranteed by Spryker.  
Use it at your own discretion. Contributions are welcome on [GitHub](https://github.com/spryker-community/migration-program-sdk)
{% endinfo_block %}

## When to use the Migration SDK

Use the Migration SDK when:

- Your project was created before the 2022.04 release and cannot use the incremental upgrade model.
- You do not have access or entitlement to the **Spryker Code Upgrader**.
- You need to perform a one-time manual upgrade to align your project with the latest Spryker version.

{% info_block infoBox "Tip" %}
After completing a manual upgrade using the Migration SDK, you can usually switch to the official Spryker Code Upgrader for future incremental updates.
{% endinfo_block %}

## Key capabilities

The Migration SDK offers a collection of PHP console scripts that automate analysis and planning tasks for manual upgrades.  
The most useful capabilities include:

### Package analysis

Identify outdated packages and generate reports that compare your current setup with the target Spryker version.  
This helps you understand which packages require major, minor, or patch updates.

### Update planning

Generate a structured upgrade instruction in CSV format that groups packages into safe update batches.  
This allows developers to work in parallel and reduce the risk of dependency conflicts during updates.

### Effort estimation

Estimate how complex the upgrade will be by scanning your project for custom extensions, PHP, and Twig overrides.  
The generated report helps you plan effort and identify risky or highly customized modules.

### Compatibility checks

Detect potential compatibility issues, such as outdated PHP versions, missing plugins, or missing glossary keys.  
Use these reports to resolve incompatibilities before running updates.

## Typical workflow

1. Clone the [Migration SDK repository](https://github.com/spryker-community/migration-program-sdk).
2. Create a `config.ini` file based on the provided `config.dist.ini` template.
3. Run the desired analysis or estimation scripts from the command line.
4. Review the generated reports in the `outputs/` directory to plan your upgrade steps.
5. Apply the upgrade changes manually based on the reports and upgrade instructions.

All scripts and configuration options are documented in detail in the [GitHub README](https://github.com/spryker-community/migration-program-sdk).

## Example use cases

- **Project analysis:** Run the package analyzer to identify outdated modules before planning a major version upgrade.
- **Upgrade planning:** Use the update instruction generator to divide your update process into manageable groups.
- **Effort estimation:** Use the estimator report to predict development effort and prioritize modules.
- **Compatibility validation:** Check for missing plugins or glossary entries to prevent regressions.

## Related documentation

- [When and why to use manual upgrade](/docs/ca/devscu/manual-upgrade-alternatives/when-and-why-to-do-manual-upgrade.html)
- [Spryker Code Upgrader](/docs/ca/devscu/spryker-code-upgrader.html)
- [Upgradability Guidelines](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html)
