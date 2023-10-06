---
title: Getting started with the Spryker Cloud Commerce OS
description: After the initial setup, access Spryker Cloud and start developing.
template: howto-guide-template
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
---

This document is a starting point of development with the Spryker Cloud Commerce OS(SCCOS).

SCCOS is a fully-managed solution. Before you start developing, we set up environments, tools, and services based on your Onboarding Questionnaire. If you didn't request something in the questionnaire, you can always do it via [support](https://spryker.force.com/support/s/).

After the initial setup, the following is configured and available:

* [Environments](/docs/cag/dev/environments-overview.html): staging and production
* Services: RDS database, RDS backup, logs, SMTP, etc.
* Access to AWS, internal resources and services
* CD pipelines for staging and production environments
* Domain names and SSL certificates


## Access
You can access SCCOS via:

* IAM account - provides access to AWS Management Console. See [Accessing AWS Management Console](/docs/cag/dev/access/access-the-aws-management-console.html) for more details.
* SSH - provides access to internal services via [bastion host](https://docs.aws.amazon.com/quickstart/latest/linux-bastion/overview.html). See [Connecting to services via SSH](/docs/cag/dev/access/connecting-to-services-via-ssh.html) for more details.
* VPN - provides access to internal services via [bastion host](https://docs.aws.amazon.com/quickstart/latest/linux-bastion/overview.html). We provide the access details during the onboarding.
* SFTP - provides access to the SFTP folder mounted inside the Jenkins container.

{% info_block warningBox %}


* For security purposes, VPN and SSH access are available only for the IP addresses in the security group. Provide your public IPs via [support](https://spryker.force.com/support/s/) to get the access. Additionally, for SSH access, provide your public SSH keys.

* If you didn’t request SFTP access for the initial setup, you can request it via support later.


{% endinfo_block %}



## Service credentials
You can find the credentials for services in the environment variables for the Zed container in [Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html). See [Locating service credentials](/docs/cag/dev/access/locating-service-credentials.html) to learn how to get them.


## CD Pipelines

The following CD pipelines are configured in [CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html):

<div class="width-100">

| Pipeline | Details |
| --- | --- |
| DESTRUCTIVE | You can configure the installation stage of this pipeline in `config/install/destructive.yml`. |
| NORMAL | You can configure the installation stage of this pipeline in `config/install/production.yml`. |
| Build | Compiles images and pushes them into the [Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html). Starts automatically when a new commit is detected.  |
| Rollout Scheduler | Deploys the scheduler. |

</div>

See [Deploying in a staging environment](/docs/cag/dev/deploy-in-a-staging-environment.html) and [Deploying in a production environment](/docs/cag/dev/deploy-in-a-production-environment.html) to learn about running pipelines.

## Next step
[Environments overview](/docs/cag/dev/environments-overview.html)
