---
title: Blackfire profiling
description: Learn how to use Blackfire to profile and troubleshoot performance issues in Spryker applications.
template: concept-topic-template
last_updated: Feb 26, 2026
related:
  - title: Troubleshooting performance issues
    link: docs/dg/dev/troubleshooting/troubleshooting-performance-issues/troubleshooting-performance-issues.html
  - title: Performance guidelines
    link: docs/scos/dev/guidelines/performance-guidelines/performance-guidelines.html
---

This document describes how to use [Blackfire](https://blackfire.io/docs/introduction) to profile your Spryker application and identify performance bottlenecks.

## Prerequisites

Install and configure [Blackfire](/docs/dg/dev/integrate-and-configure/configure-services.html#blackfire).

## Profiling with Blackfire

To profile with Blackfire, do the following:

1. Reproduce the problem in the necessary environment or request it to be reproduced by the customer. For more details on profiling with Blackfire, see the [official Blackfire website](https://blackfire.io/docs/introduction).
2. Review the profiling:
  - Check the **Recommendations** section. It shows some possible solutions.
![blacfire-recommendations](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/recommendations.png)
  - Check **Callgraph**.
![blacfire-callgraph](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/recommendations-callgraph.png)
The left part shows time (excl., incl., calls), and the right part shows the exact graph:
![callgraph](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/callgraph.png)

{% info_block infoBox "Info" %}

Blackfire groups some actions, so after each round of optimization, you will see more details in the report.

{% endinfo_block %}

3. Check other sections, like *SQL*, *Propagation*, etc. Read more about profiling with Blackfire in the [Blackfire official documentation](https://blackfire.io/docs/php/training-resources/book/04-first-profile).
