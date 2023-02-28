---
title: Connect Spryker Code Upgrader to a GitLab managed project
description: Learn how to connect Spryker Code Upgrader to a GitLab managed project
template: howto-guide-template
---

There are 2 options for connecting your GitHub repository to Spryker Upgrade Service in Spryker CI: with help of BuddyCI application or with the access token. You can select the option that is the most suitable for you.

## Connect Spryker Code Upgrader using Spryker CI

1. In Spryker CI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_projects.png)

3. Go to **Code**.

![Spryker CI Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_code_page.png)

4. In the **Connect Git repository** pane, for **GIT HOSTING PROVIDER**, select **GitLab**.

5. For **ADD GITLAB INTEGRATION** select **+**.
    This opens GitLab in a new window.

![Spryker CI Code GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/gitlab_code_add.png)

6. To authorize Buddy CI to access your account, click **Authorize**.
    Your account should have administrator rights in the repository you want to connect.

![Spryker CI GitLab](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/spryker_ci_gitlab.png)

7. For **GROUP**, select the GitLab group the has access to the repository you want to connect.

8. For **REPOSITORY**, select the repository you want to connect.
    This displays a success message. The Upgrader is now connected to your repository.

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
