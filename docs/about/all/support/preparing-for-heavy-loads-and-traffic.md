---
title: Preparing for heavy loads and traffic
description: Guidance and tips on how to prepare your shop for higher traffic volume during busy trading seasons.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/special-prepare-for-a-busy-season
originalArticleId: 03eeeab9-d5fd-4b18-80f9-5a1dd3fcf33e
redirect_from:
- /docs/scos/user/intro-to-spryker/support/special-prepare-for-a-busy-season.html
---

This document helps you prepare for a traditionally very busy season of the year: Black Friday, Cyber Monday, and the Holiday Season but it helps you whenever you expect your shop to receive record-breaking traffic. In this document, you can find recommendations written for business decision-makers, hosting providers, and Spryker developers. So feel free to forward our recommendations to your colleagues.

## Business tips

- Prepare your customer care to handle non-technical issues. As higher amounts of transactions result in a higher number of customer support requests.
- Know your customer: global businesses have Black Friday starts much earlier for eastern time zones and ends much later for western time zones.
- Plan your features in advance: deliver something just before the campaign increases your risks.

## DevOps and hosting tips

- Follow [General performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html)
- Prepare stand-by/hot-spare compute nodes. Buy it in advance.
- Prepare sizing of Redis/ElasticSeach/Database services.
- Make sure you have clear procedures for adding a new compute node to your cluster and removing one from it. It is good to have it fully automated allowing you to easily change your cluster configuration.
- Make sure content delivery services are in place to deliver images or other static binary data.
- Make sure [correct caching headers are set for static content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching).
- Consider configuring HTTP2 and response compression.
- Global business: co-locate infrastructure and your customers.
- Make sure infrastructure monitoring is in place so you can watch for errors or issues.
- Test your deployment: you should be able to quickly deliver fixes if needed.
- If your project is hosted with Spryker PaaS, let us know that you are expecting a higher load using the [Support Portal](/docs/about/all/support/using-the-support-portal.html#announce-high-trafficload)

## Tips for developers

- Follow [General performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html)
- Disable features, that might have no big value during Black Friday but add additional overhead:
- Persistent Cart
- Evaluate project features for the same reason
- Make sure that there are no Yves pages executing multiple Zed requests. The best case is 0 or max 1 call per request, but not on each page load
- Evaluate your code: maybe there is somewhere too verbose logging, which is not so useful but adds overhead
- Check your integration processes:
  - Asynchronous must handle expected amounts of data
  - Synchronous must handle the expected amount of requests in the expected time per request
  - Make sure that your ERP or backend systems are capable of processing the expected number of transactions
  - Talk to partners integrated into checkout—for example, payment providers and fraud checks. They need to be prepared to handle expected volumes of transactions
  - Preload all relevant data in advanced: new products, prepare discount rules but mark them disabled
  - Make sure application monitoring is in place ([Tideways](/docs/pbc/all/miscellaneous/{{site.version}}/third-party-integrations/operational-tools-monitoring-legal/tideways.html), NewRelic) so you can watch for errors or issues

## Extra: Performance tips

- Determine the critical journey that your customers will follow:
- Journey before the checkout.
- Journey in the checkout (what are the most popular payment or shipping methods?).
- Prepare test plans and execute tests (different tools can be used: JMeter, LoadRunner, BlazeMeter).
- Make sure that test results match the expected load or analyze and optimize bottlenecks.
- Test also external systems to make sure they handle the expected load.
- Run a rehearsal: execute the tests with higher numbers than you expect and make sure you still have stability and room to handle all coming customers.
