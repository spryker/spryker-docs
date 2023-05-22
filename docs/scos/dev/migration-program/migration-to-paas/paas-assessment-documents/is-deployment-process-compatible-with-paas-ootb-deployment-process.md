---
title: Is deployment process compatible with PaaS OOTB deployment process?
description: This document allows you to assess if deployment process is compatible with PaaS OOTB deployment process.
template: howto-guide-template
---


The purpose of this artcile is clarification of the deployment process after migration to Spryker Cloud.

After setting up a repository with a deployment branch for the project, changes are deployed automatically on commit. To avoid unexpected rollouts, deployment pipelines contain the `Approve` step. The step may be disabled, for example, for non-production environments by creating a ticket in the [SalesForce portal](http://support.spryker.com)
or by specifying this request in [onboarding questionnaire](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/paas-assessment-prerequisites.html).

Spryker Cloud Commerce OS doesn't support rollout strategies like blue-green or canary deployment. So, it's very important to cover changes with thorough testing before rolling them out to production.

The following deployment pipelines are available:
1. Build. Used only for verifying if an image can be built. It doesn't include a rollout.
2. Rollout Scheduler. Deploys only Jenkins.
3. Normal. The main pipeline for deploying applications.
4. Destructive. The same as Normal pipeline, but resets data in RDS. Is is used for initial deployments or for resetting data in non-production environments.

For more information on how pipelines work, see [Deployment in states](/docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-in-states.html#production-pipeline-steps).


## Resources 

DevOps
