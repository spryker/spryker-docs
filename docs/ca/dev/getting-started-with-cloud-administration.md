---
title: Getting started with cloud administration
description: Get started with Spryker Cloud Commerce OS setup, covering environment configurations, AWS access, and deploying with continuous integration for optimized cloud management.
template: howto-guide-template
last_updated: Oct 17, 2023
originalLink: https://cloud.spryker.com/docs/getting-started-with-spryker-cloud-commerce-os
originalArticleId: 04c7a319-4c90-4fd7-a112-982569e48c70
redirect_from:
  - /docs/getting-started-with-spryker-cloud-commerce-os
  - /docs/en/getting-started-with-spryker-cloud-commerce-os
  - /docs/scos/user/technology-partners/202212.0/hosting-providers/claranet.html
  - /docs/scos/user/technology-partners/202212.0/hosting-providers/root-360.html
  - /docs/scos/user/technology-partners/202212.0/hosting-providers/heroku.html
  - /docs/scos/user/technology-partners/202212.0/hosting-providers/continum.html
  - /docs/scos/user/technology-partners/202212.0/hosting-providers/metaways.html
  - /docs/scos/dev/technology-partner-guides/202212.0/hosting-providers/integrating-heroku.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/getting-started-with-the-spryker-cloud-commerce-os.html
  - /docs/scos/dev/technology-partner-guides/202204.0/hosting-providers/integrating-heroku.html
---

This document is a starting point for managing your Spryker Cloud Commerce OS (SCCOS) cloud environments.

SCCOS is a fully managed solution. Before you start developing, we set up environments, tools, and services based on your Onboarding Questionnaire. If you didn't request something in the questionnaire, you can always do it via [support](https://spryker.force.com/support/s/).

After the initial setup, the following is configured and available:

- [Environments](/docs/ca/dev/environments-overview.html): staging and production.
- Services: RDS database, RDS backup, logs, SMTP, etc.
- Access to AWS, internal resources, and services.
- CD pipelines for staging and production environments.
- Domain names and SSL certificates.


## Accessing the cloud environments

You can access your cloud environments via the following means:

- IAM account: provides access to the AWS Management Console. For instructions, see [Access AWS Management Console](/docs/ca/dev/access/access-the-aws-management-console.html).
- SSH: provides access to internal services via [bastion host](https://docs.aws.amazon.com/managedservices/latest/userguide/using-bastions.html). For instructions, see [Connect to services via SSH](/docs/ca/dev/access/connect-to-services-via-ssh.html).
- VPN: provides access to internal services via [bastion host](https://docs.aws.amazon.com/managedservices/latest/userguide/using-bastions.html). You receive these access details during the onboarding.
- SFTP: provides access to the SFTP folder mounted inside the Jenkins container. You receive these access details during the onboarding.


## Service credentials

You can find the credentials for services in the environment variables for the Zed container in [Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html). For instructions, see [Locate service credentials](/docs/ca/dev/access/locate-service-credentials.html).


## CD pipelines

The following CD pipelines are configured in [CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html):

<div class="width-100">

| Pipeline | Details |
| --- | --- |
| DESTRUCTIVE | You can configure the installation stage of this pipeline in `config/install/destructive.yml`. |
| NORMAL | You can configure the installation stage of this pipeline in `config/install/production.yml`. |
| Build | Compiles images and pushes them into the [Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html). Starts automatically when a new commit's detected.  |
| Rollout Scheduler | Deploys the scheduler. |

</div>

To learn about running pipelines, see [Deploy in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html) and [Deploy in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html).

## Next step

[Environments overview](/docs/ca/dev/environments-overview.html)
