---
title: N+1 problem
description: N+1 problem
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n+1-problem.html

last_updated: Mar 7, 2023
keywords: n1; n one
---

Some actions, parts of the website, or the entire website are slow.

It can be any type of action that is performed for each entity.
For example, suppose a customer has a cart with 20 items. In this case, we do the following on each item:
- We make a request to a DB per item.
- We make an external call per item.

Cases may vary, but the main idea is that we perform some action per item.

## Cause

Repeated action per entity.

## Solution

Change action from *per entity* to *batch of entities*.

### N+1 problem—external calls in New Relic

For example, suppose there is an order with 42 items. In the [New Relic tool](/docs/dg/dev/integrate-and-configure/configure-services.html#new-relic), do the following:

1. Select the desired profiling:
![new-relic-profiling](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n%2B1-problem/new-relic-profiling.png)

2. Check the details and analyze:
![new-relic-analysis](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n%2B1-problem/new-relic-analysis.png)

As you can see in the profiling, we make 42 external calls, which is equal to the number of items in the order.

On `CurlResponse::select` and the request itself we spend 45.70% and 45.49%, so 91.19% of the total time spent on this request.Therefore, optimizing the number of requests should be the priority.

3. Define a strategy to fix the problem. Specifically, you can:

- Make one bulk request.
- Move request after the `place order` action. For example, use one of the OMS transitions (but after taking the customer to a success page).

However, these approaches may not always be applicable. For example, in the cases when:

- A 3rd party system does not support bulk operations.
- You have to make a call right during the order placement.

In the cases like these, you need to develop your solution. Some of the most common recommendations include:  

- Contacting the third-party system to provide you with an integration point for bulk operations.
- Talking to the business stakeholders to define where else this action can be performed.
- Updating the loader on the page with some interactive games, so customers are not bored if nothing else can be optimized.

## N+1 problem—DB queries in Blackfire

For example, suppose you add products to cart in a B2B store. In the [Blackfire tool](/docs/dg/dev/integrate-and-configure/configure-services.html#blackfire), do the following:

1. Go to SQL.
![blackfire-sql](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n%2B1-problem/blackfire-sql.png)
2. Order by *calls* or by *time*.
![blackfire-filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n%2B1-problem/blackfire-filter.png)
3. Optimize the calls and, ideally, reduce the number of calls to one.
