---
title: Connect Spryker Code Upgrader to a GitHub managed project
description: Connect Spryker Code Upgrader to a GitHub-managed project using native integration or access tokens to enable seamless upgrades and repository analysis.
template: howto-guide-template
last_updated: Jul 4, 2023
redirect_from:
  - /docs/paas-plus/dev/onboard-to-spryker-code-upgrader/connect-spryker-ci-to-a-gitlab-managed-project.html
---

There are two options for connecting the Upgrader to your repository: using the native integration or an access token.

## Connect Spryker Code Upgrader using the native integration

1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_projects.png)

3. Go to **Code**.

![Spryker CI Code page](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_code_page.png)

4. In the **Connect Git repository** pane, for **GIT HOSTING PROVIDER**, select **GitHub**.
5. For **ADD GIHUB INTEGRATION** select **+**.

![Spryker CI GitHub](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/gitlab_code_add.png)

5. For **ORGANIZATION**, click on the field and select **+**.
    This opens GitHub.

![Spryker CI GitHub Organization](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/github_add_repository.png)

5. Select the organization you want to connect.
    You should have administrator rights in the repository.

![GitHub Organization](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/github_select_organization.png)

6. In the **Authorize & Request** pane, select **Only select repositories**.
7. For **Select repositories**, select the repository you want to connect.
8. Click **Authorize & Request**.

![GitHub Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/github_select_repository.png)

7. To authorize the action, enter your GitHub account password and click **Confirm**.
    This closes the window, and the connected organization is displayed in the **ORGANIZATION** field.

![GitHub Confirmation](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/github_enter_password.png)

8. For **REPOSITORY**, select the repository you've connected.
    Now the Upgrader is connected to your project.

![Spryker CI GitHub Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_github_repository_selection.png)

## Connect Spryker Code Upgrader using the GitHub access token

To connect the Upgrader manually using the GitHub access token, take the following steps.

### Prerequisites

[Create a GitHub access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

To enable the Upgrader to analyze the project and create PRs, the GitHub personal access token (Fine-grained token) should have the following permissions:

- **Metadata**: Access: Read-only

- **Webhooks**: Access: Read-only

- **Contents**: Access: Read and write

- **Pull requests**: Access: Read and write


### Configure the integration with GitHub


1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_projects.png)

3. Go to **Integrations**.
4. On the **Integrations** page, click **New integration**.

![Spryker CI Integration](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_integration.png)

5. On the **New integration** page, click the **Git** tab.

6. Select **GitHub**.

![Spryker CI Integration GitHub](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_integration_github.png)

7. On the **Add new GitHub integration** page, enter a **NAME**.
8. Select **SHARING** and **AVAILABILITY** per your requirements.
9. For **AUTHORIZATION METHOD**, select **Personal Access Token**.
10. For **TOKEN**, enter the GitHub access token.

![Spryker CI Integration GitHub Form](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_integration_github_form.png)

11. Click **New integration**.
    This connects the Upgrader to your GitHub organization.

12. To select the needed repository, go to **Code**.
13. On the **Switch repository or Git hosting provider** page, click the **GitHub** tab.
14. Select a **REPOSITORY** to connect the Upgrader to.
    This displays the message about a successful update. Now the Upgrader is connected to the repository.

![Spryker CI GitLab Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_github_repository_selection.png)

## Next step

[Set the target branch for the Upgrader](/docs/ca/devscu/set-the-target-branch-for-spryker-code-upgrader.html)
