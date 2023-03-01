---
title: Roll back upgrades
description: How to revert changes provided by Spryker Code Upgrader
template: concept-topic-template
---

## Spryker Cloud Deployment Pipeline

Find out the application version you want to roll back to.

AWS uses commit hash(application version) as a deployment version. To do a rollback you need to find a desired commit hash.

See ["Check the version to deploy"](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html#check-the-version-to-deploy) article for more details.

This example explains how to find the version in GitHub. Use appropriate docs if you have another git provider.

## Set the application version.

In [Parameter Store](https://eu-central-1.console.aws.amazon.com/systems-manager/parameters/), set the application version as the value of the /spryker-staging/desired_version parameter.

See ["Define the version to deploy"](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html#define-the-version-to-deploy) for more details.

## Run pipeline.

Run a deployment pipeline as described in [Run a deployment pipeline](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html#run-a-deployment-pipeline).

## Other Deployment Pipelines

Please check the relevant documentation if a different deployment pipeline is used, not Spryker Cloud Deployment Pipeline.

In general, most of the revert strategies apply the same steps.

1. Revert the last changes in the release branch to the last stable version. In most cases, Git providers already have a built-in pull request/merge request revert functionality. Alternatively, it can be done manually using the Git tool. Check the links below for more info:

* [Reverting a pull request in GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/reverting-a-pull-request).

* [Reverting a merge request in GitLab](https://docs.gitlab.com/ee/user/project/merge_requests/revert_changes.html#revert-a-merge-request).

* [git revert](https://git-scm.com/docs/git-revert).

* [git reset](https://git-scm.com/docs/git-reset).

2. Trigger the deployment.

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
