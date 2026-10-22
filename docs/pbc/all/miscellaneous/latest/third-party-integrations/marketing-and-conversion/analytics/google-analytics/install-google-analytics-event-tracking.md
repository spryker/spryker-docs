---
title: Install Google Analytics Event Tracking
description: Learn how to install Google Analytics Event Tracking, which lets Back Office users choose the storefront events sent to Google Analytics 4.
last_updated: Oct 22, 2026
template: howto-guide-template
related:
  - title: Google Analytics Event Tracking
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/google-analytics-event-tracking.html
  - title: Install Search Statistics
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/install-search-statistics.html
---

This document describes how to install Google Analytics Event Tracking. After the installation, Back Office users can turn each storefront event sent to Google Analytics 4 (GA4) on or off, globally or per store.

## Prerequisites

Install the required features:

| NAME | INSTALLATION GUIDE |
| --- | --- |
| Configuration Management | [Install the Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-configuration-feature.html) |
| Search Statistics | [Install Search Statistics](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/install-search-statistics.html) |

Search Statistics installs the `spryker-eco/google-analytics` module and the storefront Google tag that sends the events.

{% info_block warningBox "Search events are off after the upgrade" %}

In `spryker-eco/google-analytics` 1.4.0 and later, every event setting is off by default. Until you turn on the **Search** event in [Turn on the events](#5-turn-on-the-events), the storefront sends no search events to GA4, and Search Statistics receives no new data.

{% endinfo_block %}

### 1) Install the required modules

The event settings are defined in the module configuration schema. To display them as collapsible groups under a shared heading, use `spryker/configuration` version 1.6.0 or later.

```bash
composer require spryker-eco/google-analytics:"^1.4.0" spryker/configuration:"^1.6.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages have been installed with the required versions:

| PACKAGE | VERSION |
| --- | --- |
| `spryker-eco/google-analytics` | 1.4.0 or later |
| `spryker/configuration` | 1.6.0 or later |
| `spryker-shop/shop-ui` | 1.105.0 or later |
| `spryker-shop/traceable-event-widget` | 1.2.0 or later |

{% endinfo_block %}

### 2) Synchronize the configuration schema

The event settings become available in the Back Office and on the storefront only after the configuration schema is synchronized:

```bash
vendor/bin/console configuration:sync
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Configuration**.
2. In the sidebar, select **Integrations**, then open the **Google Analytics** tab.
3. Make sure the **Event Tracking** heading is displayed, with the **Product Events** group under it.
4. Expand **Product Events** and make sure it contains the **Search** event.

{% endinfo_block %}

### 3) Add translations

Generate the translation cache to make the event names and descriptions available in the Back Office:

```bash
vendor/bin/console translator:generate-cache
```

### 4) Build the frontend

Rebuild the Yves and Zed frontends to include the storefront event-tracking component and the updated Back Office styles:

```bash
npm run yves
npm run zed
```

### 5) Turn on the events

Turn on the events you want to send to GA4. For the available events and the Back Office procedure, see [Manage event tracking in the Back Office](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/google-analytics-event-tracking.html#manage-event-tracking-in-the-back-office).

{% info_block warningBox "Verification" %}

1. Enable the **Search** event for a store and wait until the **Waiting for synchronisation** badge disappears.
2. Open that store's storefront and run a search that returns products.
3. In DebugView for the configured GA4 property, verify that the `search_results` event appears. For instructions, see [Monitor events with DebugView](https://support.google.com/analytics/answer/7201382) in the Google Analytics Help Center.
4. Disable the **Search** event for the same store and wait until synchronization completes.
5. Run another search and verify that no new `search_results` event appears in DebugView.

{% endinfo_block %}
