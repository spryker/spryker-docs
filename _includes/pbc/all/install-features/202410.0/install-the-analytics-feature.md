This document describes how to install the Analytics feature. This feature enables the Back Office UI for [Amazon QuickSight](/docs/pbc/all/business-intelligence/{{page.version}}/amazon-quicksight-third-party-integration/amazon-quicksight.html).

## Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/analytics:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                     |
|-----------------------|----------------------------------------|
| AnalyticsGui          | vendor/spryker/analytics-gui           |
| AnalyticsGuiExtension | vendor/spryker/analytics-gui-extension |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                  | TYPE  | EVENT   | PATH                                                            |
|---------------------------|-------|---------|-----------------------------------------------------------------|
| AnalyticsRequest          | class | created | src/Generated/Shared/Transfer/AnalyticsRequestTransfer          |
| AnalyticsCollection       | class | created | src/Generated/Shared/Transfer/AnalyticsCollectionTransfer       |
| Analytics                 | class | created | src/Generated/Shared/Transfer/AnalyticsTransfer                 |
| AnalyticsAction           | class | created | src/Generated/Shared/Transfer/AnalyticsActionTransfer           |
| AnalyticsEmbedUrlResponse | class | created | src/Generated/Shared/Transfer/AnalyticsEmbedUrlResponseTransfer |

{% endinfo_block %}

## 3) Configure navigation

1. Add the `Analytics` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <analytics>
        <label>Analytics</label>
        <title>Analytics</title>
        <icon>fa-chart-bar</icon>
        <bundle>analytics-gui</bundle>
        <controller>analytics</controller>
        <action>index</action>
    </analytics>
</config>
```

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

In the Back Office, make sure the **Analytics** navigation menu item is displayed.

{% endinfo_block %}
