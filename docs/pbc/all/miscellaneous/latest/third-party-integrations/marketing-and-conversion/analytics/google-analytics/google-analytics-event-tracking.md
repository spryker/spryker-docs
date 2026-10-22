---
title: Google Analytics Event Tracking
description: Choose in the Spryker Back Office which storefront events are sent to Google Analytics 4, globally or per store.
last_updated: Oct 22, 2026
template: concept-topic-template
related:
  - title: Install Google Analytics Event Tracking
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/install-google-analytics-event-tracking.html
  - title: Search Statistics
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/search-statistics.html
  - title: Configuration Management feature
    link: docs/dg/dev/backend-development/configuration-management.html
---

Google Analytics Event Tracking lets Back Office users decide which storefront events the shop sends to Google Analytics 4 (GA4). Each event has its own on/off setting, so you send GA4 only the data you need, without changing code or redeploying.

The storefront sends events to GA4 through the Google tag (gtag.js), which loads when a Measurement ID is configured. When an event is turned off, the storefront does not send it to GA4 at all: the data is not collected, rather than collected and then filtered out in GA4.

{% info_block warningBox "Legal compliance" %}

Turning an event on starts collecting the related customer behavior in GA4. Before you turn on an event, make sure that your cookie consent banner and privacy policy cover that data, and that you obtain customer consent where it is required.

{% endinfo_block %}

## Related developer guides

- [Install Google Analytics Event Tracking](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/install-google-analytics-event-tracking.html)

## Supported events

The following table lists the storefront events you can turn on and off, and the GA4 events each of them sends.

| SETTING | TRIGGER | GA4 EVENTS |
| --- | --- | --- |
| Search | A customer runs a storefront search. | `search_results` when the search returns products. `zero_search_results` when the search returns no products. |

The search events carry the following parameters:

| PARAMETER | DESCRIPTION |
| --- | --- |
| `search_term` | The query the customer entered. |
| `results_count` | The number of products the search returned. |
| `event_category` | Always `Search results`. |
| `event_label` | `Search results`, or `No results` for a `zero_search_results` event. |
| `store` | The store in which the customer searched, for example `DE`. |
| `locale` | The locale in which the customer searched, for example `en_US`. |

[Search Statistics](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/search-statistics.html) reports on the search events. While the **Search** setting is off, Search Statistics receives no new data for the affected stores.

## Manage event tracking in the Back Office

The event settings are in the Back Office under **Configuration > Integrations > Google Analytics > Event Tracking**.

To turn events on or off:

1. In the scope selector, select where the change applies:
    - **Default (All Stores)**: the value applies to every store that does not have its own value.
    - A store, for example **DE**: the value applies to that store only and takes precedence over the default value.
2. Select or clear the checkbox of an event. To turn all events of a group on or off at once, use the checkbox in the group header.
3. Click **Save Configuration**.

The storefront reads the event settings from storage. Until a saved change is synchronized to storage, the Back Office shows a **Waiting for synchronisation** badge next to the event and its group, and the storefront keeps using the previous value.

### Default values

All events are off by default. When you upgrade from a version of the `spryker-eco/google-analytics` module that sent search events unconditionally, the storefront stops sending search events until you turn on **Search**. To keep Search Statistics receiving data, turn on **Search** right after the upgrade.

To set event values during deployment instead of in the Back Office, use the Configuration data import. For the file format and the setting keys, see [Data Import](/docs/dg/dev/backend-development/configuration-management.html#data-import). The setting key of the Search event is `integrations:google_analytics:product_events:search_event_enabled`.

## Limitations

- **Data delay**: GA4 processes incoming events with a delay of up to 48 hours. A turned-on event can take that long to appear in GA4 reports. To check events in real time, use [DebugView](https://support.google.com/analytics/answer/7201382).
- **No retroactive data**: Turning on an event does not recover the events that occurred while it was off.
- **Ad blockers**: Customers with ad blockers installed may not send events to GA4, which can cause the data to be underreported.
