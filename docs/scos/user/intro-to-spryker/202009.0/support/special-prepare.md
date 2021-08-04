---
title: Special- Prepare for a busy season
originalLink: https://documentation.spryker.com/v6/docs/special-prepare-for-a-busy-season
redirect_from:
  - /v6/docs/special-prepare-for-a-busy-season
  - /v6/docs/en/special-prepare-for-a-busy-season
---

We put together this article to help you prepare for a traditionally very busy season of the year: Black Friday, Cyber Monday and the Holiday Season but it will help you whenever you expect your Shop to receive record breaking traffic. In this article you find recommendations written for business decision makers, hosting providers, and Spryker Developers. So feel fry to forward our recommendations to your colleagues!

## Business Tips

* Prepare you customer care to handle non-technical issues. As higher amounts of transactions result in higher number of customer support requests. 
* Know your customer: global businesses have Black Friday starts much earlier for eastern time zones and ends much later for western time zones
* Plan your features in advance: delivery something just before the campaign increases your risks 

## DevOps and Hosting Tips

* Follow https://documentation.spryker.com/guidelines/performance-guidelines.htm
* Prepare stand-by/hot-spare compute nodes. Buy it in advance 
* Prepare sizing of Redis/ElasticSeach/Database services 
* Make sure you have clear procedures of adding a new compute node to your cluster and remove one from it. It would be good to have it fully automated allowing you to easily change your cluster configuration
* Make sure content delivery services are in place to deliver images or other static binary data
* Make sure correct caching headers are set for static content 
* (https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
* Consider to configure HTTP2 and response compression
* Global business: co-locate infrastructure and your customers
* Make sure infrastructure monitoring is in place so you can watch for errors or issues
* Test your deployment: you should be able to quickly deliver fixes if needed

## Tips for Developers

* Follow https://documentation.spryker.com/guidelines/performance-guidelines.htm
* Disable features, that might have no big value during Black Friday but add additional overhead:
* Persistent Cart 
* Evaluate project features for the same reason
* Make sure that there are no Yves pages executing multiple Zed requests. The best case is 0 or max 1 call per request, but not on each page load
* Evaluate your code: maybe there is somewhere too verbose logging, which is not so useful but adds overhead
* Check your integration processes:
* Asynchronous should be able to handle expected amounts of data
* Synchronous should be able to handle the expected amount of requests in the expected time per request
* Make sure that your ERP or backend systems are capable of processing the expected number of transactions
* Talk to partners integrated into checkout e.g. Payment Providers, Fraud Checks etc. They need to be prepared to handle expected volumes of transactions
* Preload all relevant data in advanced: new products, prepare discount rules but mark them disabled etc
* Make sure application monitoring is in place (Tidewas https://documentation.spryker.com/industry_partners/performance/tideways.htm , NewRelic etc.) so you can watch for errors or issues

## Extra: Performance tips

* Determine the critical journey that your customers will follow:
* Journey before the checkout
* Journey in the checkout (what are the most popular payment or shipping methods?)
* Prepare test plans and execute tests (different tools can be used: jMeter, LoadRunner, BlazeMeter)
* Make sure that test results match the expected load or analyze and optimize bottlenecks
* Test also external systems to make sure they handle the expected load
* Run a rehearsal: execute the tests with higher numbers than you expect and make sure you still have stability and a room to handle all coming customers

