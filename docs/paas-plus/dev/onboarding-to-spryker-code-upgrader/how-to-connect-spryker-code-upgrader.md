---
title: How to connect to Spryker Code Upgrader
description: Know how to easily connect your repository to preconfigured Spryker Code Upgrader
template: concept-topic-template
---

The connection of your project to Spryker Code Upgrader in Spryker CI is slightly different depending on your Git hosting provider.

Please follow the instructions for your Git hosting provider for the best experience.

## GitHub

To connect your GitHub project to Upgrader Service in Spryker CI, you will need to do the following:

1. Go to your Project in Spryker CI and click the "<strong>Code</strong>" tab.

![Spryker CI Project Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/project_code.png)

2. Select GitHub as a Git hosting provider and click on "<strong>Add new GitHub integration</strong>" button to add the new integration.

![Spryker CI Add GitHub Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/github_code_add.png)

3. Select “Personal Access Token“ as an authorization method, fill the form with required information and click "<strong>New integration</strong>" button when you will be ready.

More information about how to generate the GitHub personal access token you can find in [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

GitHub personal access token (Fine-grained token) should contain the following repository permissions:

* Metadata: Access: Read-only
* Pull requests: Access: Read and write

![Spryker CI Add GitHub Personal Token](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/github_personal_token.png)

## GitLab

To connect your GitLab project to Upgrader Service in Spryker CI, you will need to do the following:

1. Go to your Project in Spryker CI and click the "<strong>Code</strong>" tab.

![Spryker CI Project Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/project_code.png)

2. Select the “GitLab“ as the Git hosting provider and click on "<strong>+</strong>" button to add the new integration.

![Spryker CI Add GitHub Code](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/gitlab_code_add.png)

3. Select “Access token“ as an authorization method, fill the form with required information and click "<strong>New integration</strong>" button when you will be ready.

More information about how to generate the GitHub personal access token you can find in GitLab documentation.

GitLab access token should contain the following the following repository permissions:

* <strong>write_repository</strong>

![Spryker CI Add GitLab Personal Token](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.md/gitlab_personal_token.png)

## Azure Repos, Bitbucket and others

At the moment Spryker Code Upgrader supports only the following Git hosting providers: GitHub, Gitlab. Please [contact support](https://spryker.force.com/support/s/) for more information.

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).

## Next steps

[How to run Spryker Code Upgrader](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/how-to-run-spryker-code-upgrader.html)
