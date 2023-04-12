---
title: Connect Spryker Code Upgrader to a GitLab self-hosted managed project
description: Learn how to connect Spryker Code Upgrader to a GitLab self-hosted managed project
template: howto-guide-template
redirect_from:
  - /docs/paas-plus/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-getlab-self-hosted-managed-project.html
---

## Connect Spryker Code Upgrader using GitLab access token

To connect the Upgrader manually using a Gitlab access token, take the following steps.

## Prerequisites

1. [Create a GitLab access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token)

Your GitLab access token should have the following repository permissions:

* **api,write_repository** for the Spryker Upgrader Service. This grants read and write access to the repository to enable the Upgrader to analyze the project and create PRs.

![GitLab access token](//TODO)

## Configure the connection in Spryker CI

1. In Spryker CI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-azure-managed-project.md/spryker_ci_projects.png)

3. Go to **Code**.

![Spryker CI Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-azure-managed-project.md/spryker_ci_code_page.png)

4. In the **Connect Git repository** pane, for **GIT HOSTING PROVIDER**, select **Private Server**.

5. For **AUTHENTICATION METHOD** select **Password**.

![Spryker CI Code Azure](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-azure-managed-project.md/azure_code_add.png)

6. Enter your GitLab repository URL, username and password, and click on **Connect repository** button.

## To add environment configuration 

1. In Spryker CI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.
3. Go to **Pipelines**.
4. Open **Upgrader** pipline.
5. Open **Variables** tab.

![Spryker CI Variables Tab](//TODO)

6. Add **ACCESS_TOKEN** variable with your GitLab access token. 

{% info_block infoBox "Masked property" %}

Please use **Masked** property for the **ACCESS_TOKEN** variable. 

{% endinfo_block %}

7. Add **SOURCE_CODE_PROVIDER** variable with **gitlab_self_hosted** value.

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).

## Next steps

[Run Spryker Code Upgrader](/docs/scu/dev/run-spryker-code-upgrader.html)
