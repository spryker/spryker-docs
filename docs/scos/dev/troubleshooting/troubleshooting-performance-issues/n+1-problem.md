---
title: N+1 problem
description: N+1 problem
template: troubleshooting-guide-template
---

Some actions, parts of website or the whole website is slow.

It can be any type of action that is performed per entity.
For example:

A customer has a cart with 20 items in it:
- We make a request to a DB per item.
- We make an external call per item.

Cases can vary, but the main idea is that we make some action per item.

## Cause

Repeated action per entity.

## Solution

Change action from *per entity* to *batch of entities*. 

### N+1 problem—external calls in New Relic

For example, there is an order with 42 items. In the [New Relic tool](/docs/scos/dev/the-docker-sdk/202212.0/configure-services.html#new-relic), do the following: 

1. Select the desired profiling:
![new-relic-profiling](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n%2B1-problem/new-relic-profiling.png)

2. Check the details and analyze:
![new-relic-analysis](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n%2B1-problem/new-relic-analysis.png)

As you can see in the profiling, we make 42 external calls, which equals the number of items in the order.

On Curl response select and request itself we spend 45.70% and 45.49%, so 91.19% of the whole time spent on this request. So optimizing the number of requests has to be the priority. 

3. Define a strategy to fix the problem. Specifically, you can:

- Make one bulk request
- Move request after the 'place order' action. For example, one of the OMS steps (but after taking the customer to a success page).

However, these approaches can not always be applied. For example, in the cases when:

- A 3rd party system does not support bulk operations.
- You have to make a call right during the order placement. 

In the cases like these, you need to come up with your solution. Some of the most common recommendations that we give include the following:  

- Contacting the third-party system to provide you with an integration point for bulk operations.
- Talking to the business stakeholders to define where else this action can be performed.
- Updating the loader on the page with some interactive games, so customers in not bored if nothing else can be optimized.
- Any other action. 

## N+1 problem—DB queries in Blackfire

For example, ypu add products to cart in a B2B store. In the [Blackfire tool](/docs/scos/dev/the-docker-sdk/202212.0/configure-services.html#blackfire), do the following:

- Go to SQL.
![blackfire-sql](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n%2B1-problem/blackfire-sql.png)
- Order by *calls* or by *time*.
![blackfire-filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/n%2B1-problem/blackfire-filter.png)
- Optimize the calls and, ideally, reduce the number of calls to one.
