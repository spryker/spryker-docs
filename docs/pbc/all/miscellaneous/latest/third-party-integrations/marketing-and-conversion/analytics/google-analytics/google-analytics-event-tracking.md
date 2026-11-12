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

The storefront sends events to GA4 through the Google tag (`gtag.js`), which loads when you configure a Measurement ID. When you turn off an event, the storefront does not send that event to GA4. GA4 therefore does not receive the event through this integration.

{% info_block warningBox "Legal compliance" %}

Enabling an event allows the storefront to send the related customer behavior data to GA4. Before enabling an event, verify that your cookie consent mechanism and privacy policy cover the data being collected. Obtain customer consent where required by applicable law.

{% endinfo_block %}

## Related developer guides

- [Install Google Analytics Event Tracking](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/install-google-analytics-event-tracking.html)

## Supported events

The following table lists the storefront events you can turn on and off, and the GA4 events each of them sends.

| Setting | Trigger | GA4 events |
| --- | --- | --- |
| Search | A customer submits a search on the storefront. | `search_results` when the search returns products; `zero_search_results` when it returns no products. |

Both search events include the following parameters:

| PARAMETER | DESCRIPTION |
| --- | --- |
| `search_term` | The query the customer entered. |
| `results_count` | The number of products the search returned. |
| `event_category` | Always `Search results`. |
| `event_label` | `Search results` for `search_results`; `No results` for `zero_search_results`. |
| `store` | The store in which the customer searched, for example `DE`. |
| `locale` | The locale in which the customer searched, for example `en_US`. |

[Search Statistics](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/search-statistics.html) reports on the search events. While the **Search** setting is off, Search Statistics receives no new data for the affected stores.

## Manage event tracking in the Back Office

The event settings are in the Back Office under **Configuration > Integrations > Google Analytics > Event Tracking**.

To turn events on or off:

1. In the scope selector, select the configuration scope:
    - **Default (All Stores)**: Applies to all stores that do not have a store-specific value.
    - A specific store, such as **DE**: Applies only to that store and overrides the default value.
2. Select or clear the checkbox of an event. To turn all events of a group on or off at once, use the checkbox in the group header.
3. Click **Save Configuration**.

The storefront reads event settings from storage. After you save a change, the Back Office displays a **Waiting for synchronisation** badge next to the affected event and its group until synchronization completes. During this time, the storefront continues to use the previous value.

### Default values

All events are disabled by default. If your previous version of `spryker-eco/google-analytics` sent search events without event-level configuration, the upgrade disables search event tracking until you enable **Search**. To continue collecting data in Search Statistics, enable **Search** after the upgrade.

To set event values during deployment instead of in the Back Office, use the Configuration data import. For the file format and the setting keys, see [Data Import](/docs/dg/dev/backend-development/configuration-management.html#data-import). The setting key of the Search event is `integrations:google_analytics:product_events:search_event_enabled`.

## Limitations

- **Data delay**: GA4 processes incoming events with a delay of up to 48 hours. A turned-on event can take that long to appear in GA4 reports. To check events in real time, use [DebugView](https://support.google.com/analytics/answer/7201382).
- **No retroactive data**: Turning on an event does not recover the events that occurred while it was off.
- **Ad blockers**: Customers with ad blockers installed may not send events to GA4, which can cause the data to be underreported.
