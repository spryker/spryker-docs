---
title: Is deployment process compatible with PaaS OOTB deployment process?
description: This document allows you to assess if deployment process is compatible with PaaS OOTB deployment process.
template: howto-guide-template
---

# Is deployment process compatible with PaaS OOTB deployment process?

{% info_block infoBox %}

Resources: DevOps

{% endinfo_block %}

## Description

The purpose of this artcile is clarification of the deployment process after migration to Spryker Cloud.

After setting up a repository (GitHub/GitLab/Bitbucket) and a deplyment branch for the project the automatic rollout
releases triggered by a commit event. Deployment includes the `Approve` step to avoid rollout by mistake.
This may be disabled, for example, to non-production envs by request in [SalesForce portal](http://support.spryker.com)
or during filling out the onboarding [questionary form](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/paas-assessment-prerequisites.html).

The current `Spryker PaaS` solution doesn't support any rollout strategies such as blue-green deployments, canary deployments etc.
So, It is very important to perform well-done testing before rollout changes on production.

There are several types of deployment are available to use in CodePipeline:
1. Build. Only uses for verification of the images building. It doesn't include a rollout.
2. Rollout Scheduler. This pipeline includes only deploy of Jenkins.
3. Normal. The main pipeline for application deployment.
4. Destructive. The same as Normal pipeline, but includes clearing and next filling out data in RDS.
   Is is mandatory to be launch for the first deploy or in case refreshing data. 

The more detailed explanation how pipelines work you can find [here](/docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-in-states.html#production-pipeline-steps).
