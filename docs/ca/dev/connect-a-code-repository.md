---
title: Connect a code repository
description: Connect a GitHub, Bitbucket or GitLab code repository to your Spryker Cloud project.
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

- [GitHub](https://github.com/)
- [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@3.0/admin/overview/about-github-enterprise-server)
- [Bitbucket](https://bitbucket.org/)
- [GitLab](https://gitlab.com/)

Spryker also supports all the Git repositories that support AWS CodeCommit push mirroring. Similar to the GitLab setup, you can configure all the commits from your version control system to be mirrored to Spryker and consumed by our pipelines to build and deploy your system.

We recommend mapping your branches to environments as follows:

| Environment | Branch |
| --- | --- |
| Production | master |
| Staging | dev |
| Test | test |


## Connect a GitHub code repository

### Regular GitHub

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

Your GitHub repository is now connected.


### GitHub Enterprise Server

1. Log into the AWS management console of the environment you want to connect a repository to.
2. Go to **CodePipeline**.
3. On the **Pipelines** page, select the pipeline you want to connect the repository to.
4. On the page of the pipeline, click **Edit**.
  This opens the pipeline editing page.  
5. In the **Edit: Source** pane, click **Edit stage**.  
6. In the **Spryker_App_Src** section, click the *Edit action* button.
  This opens the **Edit action** window.
7. For **Action provider**, select **GitHub Enterprise Server**.
8. For **Connection** choose an existing connection or click **Connect to GitHub Enterprise Server** and follow the authorization proccess to create a connection.
  Next steps assume you've selected a connection. 
9. For **Repository name**, enter and select the repository you want to connect.
10. For **Branch name**, enter and select the branch you want to connect.
11. Click **Done**.
12. In the **Edit: Source** pane, click **Done**.
13. Scroll up and click **Save**.
14. In the **Save pipeline changes** window, click **Save**.

Your GitHub Enterprise Server repository is now connected.


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

### Prerequisites

Ensure that your Bitbucket account has **Admin** permissions in the code repository. Some AWS regions are not supported, see [Bitbucket Cloud connections](https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-bitbucket.html).

### Connect your Bitbucket repository

1. Log into the AWS management console of the environment you want to connect a repository to.
2. Go to **CodePipeline**.
3. On the **Pipelines** page, select the pipeline you want to connect the repository to.
4. On the page of the pipeline, click **Edit**.
  This opens the pipeline editing page.  
5. In the **Edit: Source** pane, click **Edit stage**.  
6. In the **Spryker_App_Src** section, click the **Edit action** button.
  This opens the **Edit action** window.
7. For **Action provider**, select **Bitbucket**.
8. For **Connection** choose an existing connection or click **Connect to Bitbucket** and follow the authorization process to grant AWS CodePipeline access to your Bitbucket repository.
  Next steps assume you've granted access and selected a connection.
9. For **Repository name**, enter and select the repository you want to connect.
10. For **Branch name**, enter and select the branch you want to connect.
11. Click **Done**.
12. In the **Edit: Source** pane, click **Done**.
13. Scroll up and click **Save**.
14. In the **Save pipeline changes** window, click **Save**.

Your Bitbucket repository is now connected.


## Connect a GitLab code repository

### Prerequisites

Ensure that your GitLab account has **Admin** permissions in the code repository. Some AWS regions are not supported, see [GitLab.com connections](https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-gitlab.html).

### Connect your GitLab repository

1. Log into the AWS management console of the environment you want to connect a repository to.
2. Go to **CodePipeline**.
3. On the **Pipelines** page, select the pipeline you want to connect the repository to.
4. On the page of the pipeline, click **Edit**.
  This opens the pipeline editing page.  
5. In the **Edit: Source** pane, click **Edit stage**.  
6. In the **Spryker_App_Src** section, click the *Edit action* button.
  This opens the **Edit action** window.
7. For **Action provider**, select **GitLab**.
8. For **Connection** choose an existing connection or click **Connect to GitLab** to create a new one.
9. Follow the authorization process to grant AWS CodePipeline access to your GitLab repository.
10. For **Repository name**, enter and select the repository you want to connect.
11. For **Branch name**, enter and select the branch you want to connect.
12. Save the changes to complete the wizard.

Your GitLab repository is now successfully connected!


## Legacy GitLab mirroring setup

{% info_block warningBox "Deprecated method" %}

The following GitLab mirroring setup is deprecated in favor of the direct GitLab integration described above. Use this method only if direct integration is not available for your GitLab instance.

{% endinfo_block %}

Currently, [CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html) doesn't have a native integration of GitLab. To make it work, you can configure a [CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html) repository as a mirror of a GitLab repository.

{% info_block warningBox "Pushing changes" %}

To avoid synchronization issues, do not push any changes to the CodeCommit repository.

{% endinfo_block %}

### Prerequisites

1. Make sure your GitLab account has *Admin* permissions in the code repository.
2. Request the following details via [support](https://support.spryker.com):
- CodeCommit repository URL
- Username and password for HTTPS authorization in CodeCommit repository

A dedicated user will be created for this task. The user will only have the permissions to connect the repository.


### Configure GitLab mirroring

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
