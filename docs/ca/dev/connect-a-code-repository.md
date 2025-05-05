---
title: Connect a code repository
description: Connect a GitHub or Bitbucket code repository to your Spryker Cloud project.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/connecting-code-repository
originalArticleId: cf723ab0-922f-4255-a26b-f405b15098e5
redirect_from:
  - /docs/connecting-code-repository
  - /docs/en/connecting-code-repository
  - /docs/cloud/dev/spryker-cloud-commerce-os/connecting-code-repository
  - /docs/cloud/dev/spryker-cloud-commerce-os/connecting-a-code-repository.html
---

This document describes how to connect a code repository to Spryker Cloud Commerce OS.

{% info_block infoBox "Initial setup" %}

If you specified a code repository in the Onboarding Questionnaire, we connected it to your Staging environment during the initial setup. To connect a code repository to another environment, follow this document.

Spryker supports only the cloud variants of the repositories listed below. To connect an on-premises repository, check the documentation of your Git repository provider about mirroring it to one of the following providers.

{% endinfo_block %}

Spryker supports the following version control systems:

* [GitHub](https://github.com/)
* [Bitbucket](https://bitbucket.org/)
* [GitLab](https://gitlab.com/)

Spryker also supports all the Git repositories that support AWS CodeCommit push mirroring. Similar to the GitLab setup, you can configure all the commits from your version control system to be mirrored to Spryker and consumed by our pipelines to build and deploy your system.

We recommend mapping your branches to environments as follows:

| Environment | Branch |
| --- | --- |
| Production | master |
| Staging | dev |
| Test | test |


## Connect a GitHub code repository

1. Log into the AWS management console of the environment you want to connect a repository to.
2. Go to **CodePipeline**.
3. One the **Pipelines** page, select the pipeline you want to connect the repository to.
4. On the page of the pipeline, click **Edit**.
  This opens the pipeline editing page.  
5. In the **Edit: Source** pane, click **Edit stage**.  
6. In the **Spryker_App_Src** section, click the *Edit action* button.
  This opens the **Edit action** window.

![edit-action](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/connect-a-code-repository.md/edit-action.png)

7. For **Action provider**, select **GitHub(via GitHub App)**.
This adds GitHub related fields to the window.
8. For **Connection** choose an existing connection or click **Connect to GitHub** to create a new one and authorize AWS CodePipeline to access your GitHub repository.

![connection](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/connect-a-code-repository.md/connection.png)

9. For **Repository name**, enter and select the repository you want to connect.
10. For **Branch name**, enter and select the branch you want to connect.
11. Click **Done**.
12. In the **Edit: Source** pane, click **Done**.
13. Scroll up and click **Save**.
14. In the **Save pipeline changes** window, click **Save**.

Your GitHub repository is now successfully connected!

### Optional: Disable automatic pipeline triggers

By default, pipelines are automatically triggered on every push event using predefined triggers and filters.  
To manage the rollout manually or prevent a specific pipeline from starting, do the following:

1. On the page of the pipeline, click **Edit**.
2. In the **Edit: Git triggers** pane, click **Edit stage**.

![edit-triggers](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/connect-a-code-repository.md/edit-git-triggers.png)

3. Clear the **Webhook** checkbox.

![edit-filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/connect-a-code-repository.md/edit-filter.png)

4. Click **Save**.
5. In the **Save pipeline changes** window, click **Save**.



## Connect a Bitbucket code repository

Currently, only GitHub is integrated into AWS CodeBuild. To use a Bitbucket code repository, configure AWS CodeStar by following the steps below.


### Prerequisites

Ensure that your BitBucket account has *Admin* permissions in the code repository.

AWS CodeStar integrates via OAuth 2.0 and requires the following permissions:

* Read your account information.

* Read your repositories and their pull requests.

* Administer your repositories.

* Read and modify your repositories.


### Retrieve a connection ARN

To get an [Amazon Resource Name (ARN)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) of a connection, create a *CodeBuild Connection*:

1. In the AWS Management Platform, go to **Services** > **CodeBuild** > **Settings** > **[Connections](http://console.aws.amazon.com/codesuite/settings/connections)**.
2. Select **Create connection**.
3. In the *Create a connection* pane, select **BitBucket**.
4. Enter **Connection name**.

![create a connection](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/create-a-connection.png)


5. Select **Connect to Bitbucket**.

6. Select **Grant access**.

![grant access highlighted](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/grant-access-highlighted.png)

7. Select **Install a new app**.


![install a new app](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/install-a-new-app.png)


8. Select **Grant access**.

![grant access](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/grant-accees.png)

9. In the *Connect to Bitbucket* pane, select **Connect**.

![connect repository](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/connect-repository.png)

The page refreshes with all the fields cleared.

10. Select **Connections**.

In the *Connections* pane, you can see the created connection and its ARN.

![connections](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/connections.png)

11. Provide the connection ARN via [support](https://spryker.force.com/support/s/).

We connect the repository shortly after you provide the details.

## Connect a GitLab code repository

Currently, [CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html) doesn't have a native integration of GitLab. To make it work, you can configure a [CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html) repository as a mirror of a GitLab repository.

{% info_block warningBox "Pushing changes" %}

To avoid synchronization issues, do not push any changes to the CodeCommit repository.

{% endinfo_block %}

### Prerequisites
Prepare for configuration:

1. Ensure that your GitLab account has *Admin* permissions in the code repository.
2. Request the following details via [support](https://spryker.force.com/support/s/):
    * CodeCommit repository URL
    * Username and password for HTTPS authorization in CodeCommit repository


### GitLab mirroring

To configure GitLab mirroring:

1. In the GitLab account, go to the code repository.
2. Select **Settings** > **Repository**.
3. Select **Expand** next to *Mirroring repositories*.

![GitLab navigation](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/gitlab-navigation.png)

4. In **Git repository URL**, enter the CodeCommit repository URL provided by support.
5. For **Mirror direction**, select **Push**.
6. For **Authentication method**, select **Password**.
7. Enter a **Password**.
8. Select **Mirror repository**.

![CodeCommit repository details](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/codecommit-repository-details.png)

Allow the synchronization several minutes to complete and you should see the record of your mirrored repository.

![mirrored repository entry](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Connecting+code+repository/mirrored-repository-entry.png)

## Next step

[Deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/deployment-pipelines.html)
