---
title: Performance testing in staging environments
description: Learn about performance testing for the Spryker Cloud Commerce OS
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/performance-testing.html
---

Performance testing is an integral part of development and deployment process. Even if you perform performance during development, we highly recommend testing the performance of your code in a staging environment before deploying it in  production environments.

As staging environment is not designed to be as performant as production one please use a subset of the data and extrapolate the results. 

In case you would like to execute a full load test on a production-like data set and traffic a production environment should be used. This could be your real production environment if it is not yet live or you can order an additional environment contacting you Account Executive. Testing with real or at least mock data gives significantly better and more reliable results than testing with a small data set. To conduct effective performance tests, use the same amount of data that will be used in the production environment. 

If you cannot use real data for your load tests, we offer [test data](https://drive.google.com/drive/folders/1QvwDp2wGz6C4aqGI1O9nK7G9Q_U8UUS-?usp=sharing) for an expanding amount of use cases. We do not provide support for this data, but, if your use case is not covered, [contact support](https://spryker.force.com/support/s/knowledge-center) and we will try to accomodate.

From our experience, the [Load testing tool](https://github.com/spryker-sdk/load-testing) can help you load test better.  
