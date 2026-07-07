---
title: Install Search Statistics
description: Learn how to install and configure the Search Statistics feature in a Spryker project.
last_updated: May 7, 2026
template: howto-guide-template
---

This document describes how to install the Search Statistics feature.

## Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | ^3.46.0 |
| spryker-shop/shop-ui | 1.107.0 |
| spryker-shop/traceable-event-widget | 1.2.0 |


### 1) Install the required modules using Composer

```bash
composer require spryker-eco/google-analytics:"^1.0.0" --update-with-dependencies
```

{% info_block infoBox "Info" %}

If your project uses [spryker/php`](https://hub.docker.com/r/spryker/php) Docker image before Sep 2025, you may need to update it.
Check if you have the needed PHP module:

```bash
docker/sdk cli php -m | grep protobuf`
```

If not, run `docker/sdk boot your_deploy_file.yml && docker/sdk up`

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| GoogleAnalytics | vendor/spryker-eco/google-analytics |

{% endinfo_block %}

### 2) Generate transfer objects

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Verify that the following transfer objects have been generated:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| GoogleAnalyticsEvent | class | created | src/Generated/Shared/Transfer/GoogleAnalyticsEventTransfer |
| GoogleAnalyticsEventConditions | class | created | src/Generated/Shared/Transfer/GoogleAnalyticsEventConditionsTransfer |
| GoogleAnalyticsEventCriteria | class | created | src/Generated/Shared/Transfer/GoogleAnalyticsEventCriteriaTransfer |
| GoogleAnalyticsEventCollection | class | created | src/Generated/Shared/Transfer/GoogleAnalyticsEventCollectionTransfer |

{% endinfo_block %}

### 3) Generate translations

```bash
console translator:generate-cache
```

### 4) Configure navigation

Update the `analytics` navigation entry in `config/Zed/navigation.xml` to add **Search Statistics** as a sub-page. Replace the existing `<analytics>` entry with the following:

**config/Zed/navigation.xml**

```xml
<analytics>
    <label>Analytics</label>
    <title>Analytics</title>
    <icon>bar_chart_4_bars</icon>
    <pages>
        <analytics>
            <label>Analytics</label>
            <title>Analytics</title>
            <bundle>analytics-gui</bundle>
            <controller>analytics</controller>
            <action>index</action>
        </analytics>
        <google-analytics>
            <label>Search Statistics</label>
            <title>Search Statistics</title>
            <bundle>google-analytics</bundle>
            <controller>search-statistics</controller>
            <action>index</action>
        </google-analytics>
    </pages>
</analytics>
```

Generate the router and navigation caches:

```bash
console router:cache:warm-up:backoffice
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Log in to the Back Office and verify that **Analytics > Search Statistics** appears as a sub-item in the main navigation sidebar.

{% endinfo_block %}

### 5) Configure TypeScript paths

In `tsconfig.yves.json`, add the `TraceableEventWidget` path alias to `compilerOptions.paths`:

**tsconfig.yves.json**

```json
{
    "compilerOptions": {
        "paths": {
            "TraceableEventWidget/*": [
                "./vendor/spryker-shop/traceable-event-widget/src/SprykerShop/Yves/TraceableEventWidget/Theme/default/*"
            ]
        }
    }
}
```

### 6) Set up behavior

#### 6.1) Synchronize configuration definitions

Import the Search Statistics configuration schema into the Configuration module:

```bash
console configuration:sync
```

{% info_block warningBox "Verification" %}

1. Log in to the Back Office.
2. Navigate to **Configuration**.
3. Verify that a **Google Analytics** feature entry appears with the **Storefront** and **Data API** tabs.

{% endinfo_block %}

#### 6.2) Configure Google Analytics 4 credentials

Before you configure the Back Office, obtain the following parameters from Google:

- **Measurement ID** (format: `G-XXXXXXXXXX`): see [Find your Measurement ID](https://support.google.com/analytics/answer/9539598) in the Google Analytics Help Center.
- **Property ID**: see [GA4 Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id) in the Google Analytics Data API documentation.
- **Service Account Credentials JSON**: see [Create and delete service account keys](https://cloud.google.com/iam/docs/keys-create-delete) in the Google Cloud documentation.

Configure the Google Analytics 4 connection in the Back Office:

1. Navigate to **Configuration > Google Analytics**.
2. Under the **Storefront** tab, enable tracking and set the **Measurement ID** (format: `G-XXXXXXXXXX`).
3. Under the **Data API** tab, set the **Property ID** and paste the full JSON content of a Google Cloud service account key into **Service Account Credentials JSON**.

{% info_block warningBox "Verification" %}

1. Open the storefront and perform a search.
2. Verify that a `search_results` event appears in the Google Analytics 4 DebugView for the configured property. To enable and use DebugView, see [Monitor events with DebugView](https://support.google.com/analytics/answer/7201382) in the Google Analytics Help Center.
3. Navigate to **Analytics > Search Statistics** in the Back Office and verify that search term data is returned after the GA4 processing delay (up to 48 hours).

{% endinfo_block %}
