---
title: When and why to use manual upgrade
description: Learn when to use manual upgrade instead of the Spryker Code Upgrader and how to streamline the process with the Migration SDK.
template: howto-guide-template
---

The **Spryker Code Upgrader** is the primary and recommended tool for upgrading Spryker projects. It automates most upgrade steps, helping you keep your project aligned with the latest Spryker releases.  
However, in some cases, you might need to perform a **manual upgrade**. This guide explains when that is necessary and introduces tools that can simplify the manual upgrade process.

## When to use a manual upgrade

You might choose a manual upgrade in the following cases:

- **Legacy projects** – Your project was created before the 2022.04 release and is not compatible with the incremental upgrade model used by the Spryker Code Upgrader.
- **Limited access** – You do not have entitlement or technical access to use the Spryker Code Upgrader.
- **Custom upgrade strategy** – You prefer full control over upgrade steps or have a custom development workflow that does not align with automated upgrades.

## What to expect from manual upgrading

Manual upgrades require you to analyze version differences, identify breaking changes, and apply updates directly in your codebase.  
This process can take more time and effort than using the Spryker Code Upgrader, but it allows you to:

- Plan and execute upgrades at your own pace.
- Review and validate each change manually.
- Handle highly customized project setups that automated tools cannot process.

{% info_block infoBox "Tip" %}

Even when you perform a manual upgrade, follow the [Upgradability Guidelines](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html) to keep your project compatible with future releases.

{% endinfo_block %}

## How the Migration SDK can help

The **[Migration SDK](migration-sdk.html)** is an open-source, community-developed tool that assists with manual upgrades.  
It helps you plan and execute upgrades by providing:

- Compatibility and version comparison reports.
- Detailed update instructions.
- Effort and change estimations.

The Migration SDK does **not** modify your codebase or create merge requests. Instead, it helps you understand what needs to change before you start manual updates.

{% info_block warningBox "Warning" %}
The Migration SDK is not officially maintained or supported by Spryker. It is provided as a community project and used at your own discretion.  
Contributions are welcome on [GitHub](https://github.com/spryker-community/migration-program-sdk).
{% endinfo_block %}

## Next steps

- Learn more about the [Migration SDK](migration-sdk.html).
- Read the [Upgradability Guidelines](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html) to keep your project easier to upgrade in the future.
- Review the [Spryker Code Upgrader](/docs/ca/devscu/spryker-code-upgrader.html) if your project meets the requirements for automated upgrades.
