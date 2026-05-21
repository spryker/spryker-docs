---
title: Search Statistics
description: Use Search Statistics in the Spryker Back Office to analyze search behavior and identify zero-result searches powered by Google Analytics 4.
last_updated: May 21, 2026
template: concept-topic-template
related:
  - title: Install Search Statistics
    link: docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/install-search-statistics.html
---

Search Statistics is a Back Office feature that gives business operators visibility into storefront search behavior. It uses Google Analytics 4 (GA4) as the underlying data collection and reporting layer, eliminating the need for custom per-project analytics implementations.

{% info_block warningBox "Legal compliance" %}

Search Statistics collects storefront search queries through Google Analytics 4. To comply with privacy regulations such as GDPR and ePrivacy, you must disclose this data collection to storefront customers. Update your cookie consent banner and privacy policy to inform customers that search terms they enter are collected and processed for analytics purposes, and obtain consent before tracking is enabled.

{% endinfo_block %}

## Related developer guides

- [Install Search Statistics](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/install-search-statistics.html)

## Use Search Statistics

This section explains how to use Search Statistics in the Spryker Back Office. Search Statistics shows what customers are searching for and which searches return no results, so you can optimize your catalog, create synonyms, and improve product discoverability.

{% info_block infoBox "Data availability" %}

Google Analytics 4 processes incoming events with a delay of up to 48 hours. Search data collected on the storefront may not appear in the Back Office immediately after installation.

{% endinfo_block %}

### Access Search Statistics

To open the Search Statistics dashboard, in the Back Office, go to **Analytics > Search Statistics**.

The dashboard displays the following:

- **Top 10 Frequent Searches**: the ten most searched terms for the selected period, ranked by search count.
- **Top 10 Zero-Result Searches**: the ten most frequently searched terms that returned no results, ranked by occurrence count.

### Select a date range

The dashboard and all detail views filter data by a date range. The currently active range is shown at the top of the page.

To change the date range, select the date range dropdown and choose one of the following options:

- **Last 24 hours**
- **Last 7 days**
- **Last 30 days**
- **Custom range**: opens a date picker where you can set a start and end date.

### Analyze frequent searches

The **Top 10 Frequent Searches** widget shows the most popular search terms. Use this data to:

- Understand buyer intent and prioritize catalog improvements.
- Identify high-volume terms to optimize product titles and descriptions.
- Discover seasonal or campaign-driven search trends.

To view all frequent searches beyond the top 10, click **View All**. The detail page shows a full list with the following columns:

| COLUMN        | DESCRIPTION                                                       |
| Search Term   | The query customers entered.                                      |
| Store         | The store in which the search term was searched.                  |
| Locale        | The locale in which the search term was searched.                 |
| Search Count  | The number of times the term was searched during the selected period. |
| Last Occurred | The date when the term last occurred.                             |

On the detail page, you can:

- **Sort** the list by the **Count** column.
- **Filter** by date range using the date picker at the top of the page.
- **Filter** by store using the store select at the top of the page.
- **Filter** by locale using the locale select at the top of the page.
- **Paginate** through results using the controls at the bottom of the list.

### Identify zero-result searches

The **Top 10 Zero-Result Searches** widget shows the most frequently searched terms that returned no results. Use this data to:

- Create synonyms for terms that do not match existing product data.
- Identify gaps in the product catalog to fill with new products.
- Improve search relevance by adjusting search configuration.

To view all zero-result searches, click **View All**. The detail page shows a full list with the following columns:

| COLUMN | DESCRIPTION |
| Search Term | The query that returned no results. |
| Store | The store in which the search term was searched. |
| Locale | The locale in which the search term was searched. |
| Occurrence Count | The number of times customers searched for this term with zero results. |
| Last Occurred | The date when the term last occurred. |

On the detail page, you can:

- **Sort** the list by the **Count** column.
- **Filter** by a minimum occurrence threshold to focus on high-impact terms.
- **Filter** by date range using the date picker at the top of the page.
- **Filter** by store using the store select at the top of the page.
- **Filter** by locale using the locale select at the top of the page.
- **Paginate** through results using the controls at the bottom of the list.

### Limitations

- **Data delay**: Search events collected on the storefront appear in the dashboard after up to 48 hours of GA4 processing time.
- **Ad blockers**: Customers with ad blockers installed may not send events to GA4. This can cause search data to be underreported by an estimated 10–25%.
