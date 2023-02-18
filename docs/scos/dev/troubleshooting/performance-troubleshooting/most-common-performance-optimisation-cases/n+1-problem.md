---
title: N+1 problem
description: N+1 problem
template: troubleshooting-guide-template
---

## N+1 problem

Some actions, parts of website or all website is slow.

### What is it?
It is any type of action that is performed per entity.

### Example

The customer has a cart with 20 items in it:
- We do request to a DB per item.
- We do an external call per per item.

Cases can vary but the main idea is that we do some action per item.

## Cause

Repeated action per entity.

## Solution

Change action from “per entity” to “batch of entities”. 

## N+1 problem (External calls)

### What does it look like in New Relic?

Case: Order is placed with 42 items inside. 

1. Select desired profiling:
TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566948/N+1+Problem

2. Check the details and analyze:
   TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566948/N+1+Problem

As we see on the profiling above we do 42 external calls as the number of items in the order.

On Curl response select and request itself we spend 45.70% and  45.49% so 91.19% of ALL the time spend on this request. So optimizing the number of requests has to be the priority here. 

3. Define a strategy to fix the problem.
   Simple, reduce the number of calls:

- do 1 bulk request
- move request after the “place order“ action. F.e. one of the OMS steps (but after releasing the customer to a success page).

But it is that simple? Not all the time.

- What if 3rd party system does not support bulk operations?
- What if we have to do a call exactly during the order placement? 

Well, that is the real challenge where you will need to find your solution. We can only share some most common cases here.

- It could be contacting 3rd party system to provide you with an integration point for bulk operations.
- Talk to the business to define where else this action can be performed.
- Update the loader on the page with some interactive games, so customers in not bored if nothing else can be optimized.
- Any other action. 

## N+1 problem (DB queries)

### What does it look like in Blackfire?
Case: add to cart in B2B store

- Go to SQL
  TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566948/N+1+Problem
- Order by “calls“ and/or “time“
TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566948/N+1+Problem
- Optimise calls and do ideally 1 instead of N calls.
