---
title: 'Step 5: Deployment strategy'
description: 
template: howto-guide-template
---

The current Spryker PaaS solution doesn't support advanced rollout strategies like blue-green deployments and canary deployments. As a result, it is crucial to conduct thorough testing before implementing changes in a production environment.

Within CodePipeline, there are several deployment types available:
* **Build:** Used solely for image verification during the building process and does not involve any rollout.
* **Rollout Scheduler:** This pipeline specifically handles the deployment through Jenkins.
* **Normal:** The primary pipeline for application deployment.
* **Destructive:** Similar to the Normal pipeline but includes the process of clearing and then populating data in the RDS. This pipeline is mandatory for the initial deployment or when data needs to be refreshed.

More information about deployment process and it's states can be found [here](docs/ca/dev/configure-deployment-pipelines/deployment-in-states.html#production-pipeline-steps.html).
