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

Note that we are only supporting the Cloud variants of the repositories listed below. To connect the On-Premises repository, check the documentation of your git repository provider about mirroring the repository to one of the following providers.

{% endinfo_block %}

Spryker Cloud Commerce OS supports the following version control systems:

* [GitHub](https://github.com/)
* [Bitbucket](https://bitbucket.org/)
* [GitLab](https://gitlab.com/)

Spryker Cloud also offers support for all the Git repositories that support AWS CodeCommit push mirroring. Similar to the GitLab setup, you can configure all the commits from your version control system to be mirrored to Spryker Cloud and consumed by our pipelines to build and deploy your system.

We recommend mapping your branches to environments as follows:

| Environment | Branch |
| --- | --- |
| Production | master |
| Staging | dev |
| Test | test |


## Connect a GitHub code repository
To connect a GitHub code repository:

1. Configure a GitHub code repository.
2. Provide the following details via [support](https://spryker.force.com/support/s/):

* **URL**
* **Branch**
* **Access token**


We connect the code repository shortly after you provide the details.




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

Currently, [CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html) doesn’t have a native integration of GitLab. To make it work, you can configure a [CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html) repository as a mirror of a GitLab repository.

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
