---
title: Performance testing in staging environments
description: Learn about performance testing for the Spryker Cloud Commerce OS
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/performance-testing.html
---

Performance testing is an integral part of the development and deployment process. Even if you execute performance testing during development, we highly recommend testing the performance of your code in a staging environment before deploying it in production environments.

Since the staging environment isn't designed to be as performant as the production environment, we recommend using a subset of the data and extrapolate the results.

If you want to execute a full load test on a production-like dataset and traffic, use a production environment. This could be your actual production environment if it is not yet live, or you can order an additional environment by contacting you Account Executive. Testing with real or at least mock data provides significantly better and more reliable results than testing with a small data set. To conduct effective performance tests, it is recommended to use the same amount of data that will be used in the production environment. 

If you are unable to use real data for your load tests, you can use the [test data](https://drive.google.com/drive/folders/1QvwDp2wGz6C4aqGI1O9nK7G9Q_U8UUS-?usp=sharing) for an expanding amount of use cases. Please note that we do not provide support for this data. However, if your specific use case is not covered, you can [contact support](https://spryker.force.com/support/s/knowledge-center), and we will try to accommodate your needs.

Based on our experience, the [Load testing tool](https://github.com/spryker-sdk/load-testing) can greatly assist you in conducting more effective load tests.