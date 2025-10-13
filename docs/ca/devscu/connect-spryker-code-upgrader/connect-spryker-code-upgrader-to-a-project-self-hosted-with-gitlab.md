---
title: Connect Spryker Code Upgrader to a project self-hosted with GitLab
description: Learn how to connect Spryker Code Upgrader to a project self-hosted with GitLab
template: howto-guide-template
last_updated: Apr 19, 2023
---

To connect the Spryker Code Upgrader manually using a Gitlab CE/EE access token, take the following steps.

## Prerequisites

[Create a GitLab access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token).

The GitLab access token should have the following repository permissions:

- **api** for Spryker CI: grants complete read and write access to the scoped project API, including the Package Registry.

- **write_repository** for Spryker Upgrader Service: grants read and write access to the repository to enable the Upgrader to analyze the project and create PRs.

## Configure the connection in Spryker CI

1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-project-self-hosted-with-gitlab.md/spryker_ci_projects.png)

3. Go to **Code**.

![Spryker CI Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-project-self-hosted-with-gitlab.md/spryker_ci_code_page.png)

4. In the **Connect Git repository** pane, for **GIT HOSTING PROVIDER**, select **GitLab EE/CE**.

5. For **ADD GITLAB EE/CE INTEGRATION** select **+**.

![Spryker CI Code GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-project-self-hosted-with-gitlab.md/gitlab_self_hosted_code_add.png)

6. On the **Add new GitLab EE/CE integration** page, enter a **NAME**.
7. Select **SHARING** and **AVAILABILITY** per your requirements.
8. For **GITLAB ENTERPRISE IP OR URL**, enter your GitLab host.
9. For **PERSONAL ACCESS TOKEN**, enter the GitLab access token.

![Spryker CI Integration GitLab Form](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-project-self-hosted-with-gitlab.md/spryker_ci_integration_gitlab_form.png)

10. Click **New integration**.
    This connects the Upgrader to your GitLab organization and opens the **Switch repository or Git hosting provider** page.

11. For **GROUP**, select the GitLab group that has access to the repository you want to connect.

12. For **REPOSITORY**, select the repository you want to connect.
   This displays a success message. The Upgrader is now connected to your repository.

![Spryker CI GitLab Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-project-self-hosted-with-gitlab.md/gitlab_code_select_repository.png)

## Next steps

[Set the target branch for the Upgrader](/docs/ca/devscu/set-the-target-branch-for-spryker-code-upgrader.html)
