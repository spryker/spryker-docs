---
title: How to connect to Spryker Code Upgrader
description: Know how to easily connect your repository to preconfigured Spryker Code Upgrader
template: concept-topic-template
---

The connection of your project to Spryker Code Upgrader in Spryker CI is slightly different depending on your Git hosting provider.

Please follow the instructions for your Git hosting provider for the best experience.

## GitHub

There are 2 options for connecting your GitHub repository to Spryker Upgrade Service in Spryker CI: with help of BuddyCI application or with the access token. You can select the option that is the most suitable for you.

### Integration through BuddyCI application

1. In Spryker CI, go to **Projects**.
2. Select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_projects.png)

3. In the **Spryker Upgrade Service** project, go to **Code**.

![Spryker CI Code page](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_code_page.png)

4. In the **Connect Git repository** pane, for **GIT HOSTING PROVIDER**, select **GitHub**.
5. For **ADD GIHUB INTEGRATION** select **+**.

![Spryker CI GitHub](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/github_code_add.png)

5. For **ORGANIZATION**, click on the field and select **+**.
    This opens GitHub.

![Spryker CI GitHub Organization](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/github_add_repository.png)

5. Select the organization you want to connect.
    You should have administrator rights in the repository.

![GitHub Organization](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/github_select_organization.png)

6. In the **Authorize & Request** pane, select **Only select repositories**.
7. For **Select repositories**, select the repository you want to connect.
8. Click **Authorize & Request**.

![GitHub Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/github_select_repository.png)

7. To authorize the action, enter your GitHub account password.
    This closes the window, and the organization is displayed in the **ORGANIZATION** field.

![GitHub Confirmation](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/github_enter_password.png)

8. For **REPOSITORY**, select the repository you've connected.
    Now the Upgrader is connected to your project.

![Spryker CI GitHub Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_github_repository_selection.png)

### Integration through access token

1. Go to your workspace in Spryker CI and select the **Spryker Upgrade Service** project on **Projects** page.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_projects.png)

2. Click on **Integrations** menu items and click on **New integration**.

![Spryker CI Integration](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_integration.png)

3. Select the **GitHub** tile on **Git** tab.

![Spryker CI Integration GitHub](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_integration_github.png)

4. Fill the form for new GitHub integration, select **Personal Access Token** as an authorization method, fill the form with required information and click **New integration** button when you will be ready. More information about how to generate the GitHub personal access token you can find in [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

![Spryker CI Integration GitHub Form](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_integration_github_form.png)

GitHub personal access token (Fine-grained token) should contain the following repository permissions:

Permissions for Spryker Upgrade Service:

* **Metadata**: Access: Read-only

* **Pull requests**: Access: Read and write - to create the PR with code changes from Spryker Code Upgrader.

5. After the new integration in added, select the **Code** menu item, select “GitHub“ as a Git hosting provider and select the repository to finish the connection of the repository to your “Spryker Upgrade Service“ project.

![Spryker CI GitLab Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_gitlab_repository_selection.png)

## GitLab

There are 2 options for connecting your GitHub repository to Spryker Upgrade Service in Spryker CI: with help of BuddyCI application or with the access token. You can select the option that is the most suitable for you.

### Integration through BuddyCI application

1. Go to your Project in Spryker CI and click the "**Code**" tab.

![Spryker CI Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_code_page.png)

2. Select the “GitLab“ as the Git hosting provider and click on "**+**" button to add the new integration.

![Spryker CI Code GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/gitlab_code_add.png)

3. After that the GitLab website will be opened in a new window. Click “Authorize“ button to provide the BuddyCI application the necessary access to your account for successful integration. Please note that you should have administrator rights on the repository you want to connect.

![Spryker CI GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_gitlab.png)

4. After the access is granted, please select the group and repository in your project in Spryker CI.

![Spryker CI GitLab Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/gitlab_code_select_repository.png)

### Integration through access token

1. Go to your workspace in Spryker CI and select the **Spryker Upgrade Service** project on “Projects“ page.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spriker_ci_projects.png)

2. Click on **Integrations** menu items and click on **New integration**.

![Spryker CI Integration](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spriker_ci_integration.png)

3. Select the **GitLab** tile on **Git** tab.

![Spryker CI Integration GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spriker_ci_integration_gitlab.png)

4. Fill the form for new GitLab integration, select **Personal Access Token** as an authorization method, fill the form with required information and click "New integration" button when you will be ready. More information about how to generate the GitHub personal access token you can find in [GitLab documentation](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token).

![Spryker CI Integration GitLab Form](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spriker_ci_integration_gitlab_form.png)

GitLab access token should contain the following the following repository permissions:

Spryker CI:

* **api** - grants complete read and write access to the scoped project API, including the Package Registry

Spryker Upgrade Service:

* **write_repository** - grants read and write access (pull and push) to the repository to allow Spryker Code Upgrader to create the PR with code changes.

5. After the new integration in added, select the “Code“ menu item, select “GitLab“ as a Git hosting provider and select the repository to finish the integration.

![Spryker CI GitLab Repository Selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/gitlab_code_select_repository.png)

## Azure Repos, Bitbucket and others

At the moment Spryker Code Upgrader supports only the following Git hosting providers: GitHub, Gitlab. Please [contact support](https://spryker.force.com/support/s/) for more information.

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).

## Next steps

[How to run Spryker Code Upgrader](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/how-to-run-spryker-code-upgrader.html)
