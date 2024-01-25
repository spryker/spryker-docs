---
title: Locate service credentials
description: To connect to Spryker Cloud services, locate the credentials in the AWS Management Console.
template: howto-guide-template
last_updated: Oct 17, 2023
originalLink: https://cloud.spryker.com/docs/locating-service-credentials
originalArticleId: 8db85787-ad90-4c6f-94e9-ab82bf94703c
redirect_from:
  - /docs/locating-service-credentials
  - /docs/en/locating-service-credentials
  - /docs/cloud/dev/spryker-cloud-commerce-os/access/locating-service-credentials.html
---

This document describes how to locate the credentials for Spryker Cloud Commerce OS services.

You can find the credentials for services in the environment variables for the Zed container in [Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html):

{% info_block infoBox "Environment" %}

We use *spryker-staging* environment as an example. Follow the procedure in the desired environment.

{% endinfo_block %}


1. In the AWS Management Console, go to **Services** > **Elastic Container Service** > **[Clusters](https://us-east-1.console.aws.amazon.com/eks/home#/clusters)**.
2. Select *spryker-staging*.
3. Select *spryker-zed*.
4. Select the value of *Task definition*.

![task definition](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Access/Locating+service+credentials/task-definiton.png)


5. In the Container Definitions section, select **Open** (arrow sign) next to the *zed* container.

![arrow on the screen](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Access/Locating+service+credentials/arrow+on+the+scren.png)

The credentials are located in the *Environment Variables* section.

![environment variables](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Access/Locating+service+credentials/environment+variables.png)

## Next step
* [Connecting to services via SSH](/docs/ca/dev/access/connect-to-services-via-ssh.html)
