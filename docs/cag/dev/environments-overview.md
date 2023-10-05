---
title: Environments overview
description: Learn about the development, staging, and production environments of the Spryker Cloud Commerce OS
template: concept-topic-template
redirect_from:
last_updated: Jun 8, 2023
  - /docs/cloud/dev/spryker-cloud-commerce-os/environments-overview.html
---

This document explains what to do with the hosting environments you received at the start of your contract and how you can make use of them best. Knowing the purpose of these platforms and working with them as intended can help you build more solid and performant projects.

{% info_block infoBox "Note" %}

The contents of contracts may vary, and this document only describes the default setup. If you are using a different setup, ask your project manager or product owner for a more detailed explanation.
Note that your non-production environments do not scale automatically. If you want to increase their scaling, let us know by requesting through this dedicated form in our support portal: [Upscale Request](https://support.spryker.com/s/hosting-change-requests/environment-upscaling). Due to contractual reasons, these changes can only be requested by customers, not partners.

{% endinfo_block %}

## Basic concept
Spryker offers you environments that serve different purposes. These environments are non-production and production environments. We can configure these environments to be as similar as possible to make sure that the code you deploy on one platform behaves the same way on the others. You can help us keep your environments consistent by taking this into consideration when sending us change requests.

### Developer environment (DEV) (optional)
A Dev environment is a non production environment that is usually used to test code that just left your development team, or is used in the development process directly through continuous deployment. It is not designed to handle load tests and large datasets. The development environment does not provide autoscaling and cannot be increased.

### Staging (STAGE)
This environment is a non production environment that is usually used to host a snapshot of the Dev environment, or a stable version of your code that is deployed to production eventually. You can use your staging environment to do performance testing to see how your code behaves in a production environment. However, staging is not of the same size as production, and a subset of data and expected traffic must be considered while running the test. When demoing your shop, this environment is used regularly. The staging environment provides limited autoscaling capabilities and can only be scale dup upon request.

### Production (PROD)

Your production environment must host the code that the end-user gets to interact with directly. The code must already be tested on the staging environment for stability and performance.

{% info_block infoBox "Note" %}

Do not make changes to the production environments directly unless they have been verified on your staging and dev environments first.
We highly recommend testing every data load and import, as well as any integrations on your staging environment.

{% endinfo_block %}

## Next step
[Accessing AWS Management Console](/docs/cag/dev/access/access-the-aws-management-console.html)
