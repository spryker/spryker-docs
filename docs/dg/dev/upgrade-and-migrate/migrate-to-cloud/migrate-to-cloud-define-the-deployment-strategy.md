---
title: 'Migrate to cloud: Define the deployment strategy'
description: To migrate to SCCOS, one of the steps, is defining the deployment strategy.
template: howto-guide-template
redirect_from:
- /docs/scos/dev/migration-concepts/migrate-to-sccos/step-5-define-the-deployment-strategy.html
last_updated: Dec 6, 2023

---

After you have [provisioned the Spryker Cloud Commerce OS environments](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-provision-the-sccos-environments.html), you have to define the deployment strategy.

The current Spryker Cloud Commerce OS solution doesn't support advanced rollout strategies like blue-green deployments and canary deployments. Therefore, it's necessary to conduct thorough testing before implementing changes in a production environment.

Within CodePipeline, there are several deployment types:

- **Build:** Used solely for image verification during the building process and does not involve any rollout.
- **Rollout Scheduler:** This pipeline specifically handles the deployment through Jenkins.
- **Normal:** The primary pipeline for application deployment.
- **Destructive:** Similar to the Normal pipeline but includes the process of clearing and then populating data in the RDS. This pipeline is mandatory for the initial deployment or when data needs to be refreshed.

For more information about deployment process and its states, see [Deployment in states](/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.html).

## Next step

[Define environment variables](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-define-environment-variables.html)
