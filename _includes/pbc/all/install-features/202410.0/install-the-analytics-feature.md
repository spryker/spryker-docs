

This document describes how to install the Analytics feature.

## Install feature core

Follow the steps below to install the Analytics feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

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

Run the following command to generate transfer changes:

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

2. Run the following command to build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Log in to the Back Office. Make sure there is the **Analytics** navigation menu item.

{% endinfo_block %}
