---
title: External calls take a lot of time
description: Learn how to troubleshoot the performance issue with external calls taking much time within your Spryker project.
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/external-calls-take-a-lot-of-time.html

last_updated: Feb 27, 2023
---

Some actions, parts of website or the whole website is slow.

## Cause

Check profiling. Sometimes you can see in the report that external call takes a lot of time.

New Relic:

![new-relic-external-calls](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/external-calls-take-a-lot-of-time/new-relic-external-calls.png)

Blackfire:

![blackfire-external-calls](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/external-calls-take-a-lot-of-time/blackfire-external-calls.png)

## Solution

1. Make sure there is no [N+1 problem](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/n+1-problem.html).
2. Check if this issue really causes a performance problem. For example, sometimes, during the checkout, customers have to wait until some call to a 3rd party system is done.
3. Check if this call can be done before or after this action in the background. Is it acceptable for business?
If yes—move it.
If no—confirm the behavior with the business stakeholders or contact the 3rd party system to optimize the request.
