---
title: Environments overview
description: Learn about the development, staging, and production environments of the Spryker Cloud Commerce OS
template: concept-topic-template
---

This article explains what to do with the hosting environments you received at the start of your contract and how you can make use of them best. Knowing the purpose of these platforms and working with them as intended will help you build more solid and performant projects.

{% info_block infoBox "Note" %}

The contents of contracts may vary, and this article describes the usual setup. If you are using a different setup, ask your project manager or product owner for a more detailed explanation.

{% endinfo_block %}

## Basic concept
Spryker will offer you environments that serve different purposes. These environments are: developer, staging, and production. We will configure these environments to be as similar as possible to make sure that the code you deploy on one platform behaves the same way on the others. Please help us keeping your environments consistent by taking this into consideration when sending us change requests.

### Developer environment (DEV) (optional)
A Dev environment is normally used to test code that just left your development team or is actually used in the development process directly through continuous deployment.

### Staging (STAGE)
This environment is normally used to host a snapshot of the Dev environment - or a version of your code that is considered stable and that should be deployed to production eventually. You should use your staging environment to do performance testing to see how your code will behave in your production environment. When demoing your shop, this environment will be used regularly.

Please note that it is imperative to use the same data here (in quality and quantity) as you would in production. If you cannot use the same data, make sure to create mock-ups that are at least of the same quantity as the data your production system needs to be able to handle.  Not doing so is gambling with your go-live and first production deployments.

### Production (PROD)

Your production environment should host the code that the end-user gets to interact with directly. The code should already be tested on the staging environment for stability and performance. Please do not make changes to the production environments directly unless they have been verified on your lower environments first.

## Next step
[Accessing AWS Management Console](/docs/cloud/dev/spryker-cloud-commerce-os/access/accessing-aws-management-console.html)
