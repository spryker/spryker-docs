---
title: Troubleshooting performance issues
description: Learn how you can troubleshoot the most common performance issues
template: concept-topic-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/troubleshooting-performance-issues.html

last_updated: Feb 22, 2023
related:
  - title: Performance guidelines
    link: docs/scos/dev/guidelines/performance-guidelines/performance-guidelines.html
---

This section helps you optimize the performance of your website by helping you detect and fix the most common performance troubleshooting issues.

Performance optimization has to start with the analysis or with the profiling.

## Prerequisites

Before you start optimizing performance, make sure the following preconditions are met:

1. You know and understand the problem.
An example of a poorly defined problem: “Website is slow“.
An example of a well-defined problem:
“Web site is slow when I place an order with 25 products of the same SKU (SKU=001).
URL: {URL}
Credentials: {Instruction on how to get credentials}.”

If you do not have this information, then request additional data from the person who reported the problem.

2. Check the profiling.
You are free to choose any profiling tool you want.
The ones that we prefer are [New Relic](https://docs.newrelic.com/docs/new-relic-solutions/get-started/intro-new-relic/) and [Blackfire](https://blackfire.io/docs/introduction).

### New Relic

To profile with New Relic, do the following:

1. [Install and configure New Relic](/docs/dg/dev/integrate-and-configure/configure-services.html#new-relic).

2. Check if the necessary profiling exists. If it does not exist, reproduce the problem in the necessary environment or request it to be reproduced by the customer.
Note the following:
- It takes [some time for the New Relic to show the profiling](https://docs.newrelic.com/docs/new-relic-solutions/solve-common-issues/troubleshooting/not-seeing-data/#:~:text=Solution,to%20automatically%20identify%20common%20issues.).
- If the request is not meeting the criteria, it will not appear in New Relic.
Read more on the [official New Relic website](https://docs.newrelic.com/docs/apm/transactions/transaction-traces/troubleshooting-not-seeing-transaction-traces/).

3. Review the profiling.
For example, if the problem is with “place-order“ with 25 product items, do the following:

1. Check if you have profiling for the necessary action in New Relic:

  1. Go to **Transactions**.
  ![transactions](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/transactions.png)
  2. Select the necessary time period on the top right side.
  ![transactions-time](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/transaction-time.png)
  3. Select the necessary transaction type—for example, **Web**.
  ![trasaction-type](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/transaction-type.png)
  4. In **Sort By**, select how you want to sort the items—for example, **Most time consuming**.
  ![transaction-filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/transactions-filter.png)
  5. Check if you have the necessary action “place-order“ in the resulting list. Click **See transaction table** if needed.
  ![transaction-list](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/transactions-list.png)

{% info_block infoBox "Issues with transaction grouping" %}

If you have some problems with transaction grouping, check [New Relic transactions grouping by queue names](/docs/dg/dev/guidelines/performance-guidelines/elastic-computing/new-relic-transaction-grouping-by-queue-names.html#group-transactions-by-queue-name).

{% endinfo_block %}

2. Repeat for other sections, like *Databases*, *External services*, etc.

For more details, see the [official New Relic website](https://newrelic.com/blog/how-to-relic/a-quick-guide-to-getting-started-with-new-relic).

### Blackfire

To profile with Blacfire, do the following:

1. Install and configure [Blackfire](/docs/dg/dev/integrate-and-configure/configure-services.html#blackfire).
2. Reproduce the problem in the necessary environment or request it to be reproduced by the customer. For more details on profiling with Blackfire, see the [official Blackfire website](https://blackfire.io/docs/introduction).
3. Review the profiling:
- Check the **Recommendations** section. It shows some possible solutions.
![blacfire-recommendations](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/recommendations.png)
- Check **Callgraph**.
![blacfire-callgraph](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/recommendations-callgraph.png)
The left part shows time (excl., incl., calls), and the right part show the exact graph:
![callgraph](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/callgraph.png)

{% info_block infoBox "Info" %}

Blackfire groups some actions, so after each round of optimization, you will see more details in the report.

{% endinfo_block %}

4. Check other sections, like *SQL*, *Propagation*, etc. Read more about profiling with Blackfire on the [Blackfire official documentation](https://blackfire.io/docs/php/training-resources/book/04-first-profile).


## Next steps


1. Check that you have the latest [performance releases](https://docs.spryker.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes.html).
2. Check that you implemented the [performance recommendations](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines.html).
3. If your problem is still not solved, analyze profiling as follows:
  - Select the longest action under profiling.
  - Optimize.
  - Repeat.
4. Check if your result is still good for future growth. Return to the previous step if needed.
5. Share your experience:
  - [Contribute to public documentation](/docs/about/all/about-the-docs/contribute-to-the-docs/contribute-to-the-docs.html).
  - Share it with [Spryker Community](https://spryker.com/community/).
