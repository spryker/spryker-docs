---
title: Connect Spryker Code Upgrader to a GitLab managed project
description: Connect Spryker Code Upgrader to a GitLab-managed project using native integration or access tokens to streamline updates and repository management.
template: howto-guide-template
last_updated: May 9, 2023
redirect_from:
  - /docs/paas-plus/dev/onboard-to-spryker-code-upgrader/connect-spryker-ci-to-a-gitlab-managed-project.html
---

There are two options for connecting Spryker Code Upgrader to your repository: using the native integration or using an access token.

## Connect Spryker Code Upgrader using the native integration

1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/spryker_ci_projects.png)

3. Go to **Code**.

![Spryker CI Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/spryker_ci_code_page.png)

4. In the **Connect Git repository** pane, for **GIT HOSTING PROVIDER**, select **GitLab**.

5. For **ADD GITLAB INTEGRATION** select **+**.
    This opens GitLab in a new window.

![Spryker CI Code GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/gitlab_code_add.png)

6. To authorize Buddy CI to access your account, click **Authorize**.
    Your account should have administrator rights in the repository you want to connect.

![Spryker CI GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/spryker_ci_gitlab.png)

7. For **GROUP**, select the GitLab group that has access to the repository you want to connect.

8. For **REPOSITORY**, select the repository you want to connect.
    This displays a success message. The Upgrader is now connected to your repository.

![Spryker CI GitLab Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/gitlab_code_select_repository.png)

## Connect Spryker Code Upgrader using the GitLab access token

To connect the Upgrader manually using the GitLab access token, take the following steps.

### Prerequisites

[Create a GitLab access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token)

GitLab access token should have the following repository permissions:

* **api** for Spryker CI: grants complete read and write access to the scoped project API, including the Package Registry.

* **write_repository** for Spryker Upgrader Service: grants read and write access to the repository to enable the Upgrader to analyze the project and create PRs.


### Configure the integration with GitLab

1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/spryker_ci_projects.png)

3. Go to **Integrations**.
4. On the **Integrations** page, click **New integration**.


![Spryker CI Integration](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/spryker_ci_integration.png)

5. On the **New integration** page, click the **Git** tab.
6. Select **GitLab**.

![Spryker CI Integration GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/spryker_ci_integration_gitlab.png)

7. On the **Add new GitLab integration** page, enter a **NAME**.
8. Select **SHARING** and **AVAILABILITY** per your requirements.
9. For **AUTHORIZATION METHOD**, select **Access Token**.
10. For **ACCESS TOKEN**, enter the GitLab access token.

![Spryker CI Integration GitLab Form](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/spryker_ci_integration_gitlab_form.png)

11. Click **New integration**.
    This connects the Upgrader to your GitLab organization.


12. To select the needed repository, go to **Code**.
13. On the **Switch repository or Git hosting provider** page, click the **GitLab** tab.
14. Select a **REPOSITORY** to connect the Upgrader to.
    This displays the message about a successful update. Now the Upgrader is connected to the repository.

![Spryker CI GitLab Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.md/gitlab_code_select_repository.png)

## Next steps

[Set the target branch for the Upgrader](/docs/ca/devscu/set-the-target-branch-for-spryker-code-upgrader.html)
