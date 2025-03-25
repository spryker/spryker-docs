---
title: Access the AWS Management Console
description: Access AWS Management Console via the IAM accounts created during the initial setup.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/accessing-aws-management-console
originalArticleId: 86ea35c7-3324-4e7b-9579-447eedfe9def
redirect_from:
  - /docs/accessing-aws-management-console
  - /docs/en/accessing-aws-management-console
  - /docs/cloud/dev/spryker-cloud-commerce-os/access/accessing-aws-management-console.html
---

This document describes how to access AWS Management Console as an [Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) user.

We create the requested IAM accounts during the initial setup. If you need to create more accounts create an Infrastructure Change/Access Management Request in the [Support Portal](https://support.spryker.com).

To sign in to the AWS Management Console as an IAM user:

1. In your browser, open the sign-in URL provided by your administrator.
{% info_block infoBox "Sign-in URL" %}

The sign-in URL contains the ID of the account you are signing into. The pattern is `https://{AWS_Account_ID}.signin.aws.amazon.com/console/`. Alternatively, you can sign in at the [general sign-in endpoint](https://console.aws.amazon.com/) by entering the account ID manually.

{% endinfo_block %}

The sign-in page opens with the **Account ID (12 digits) or account alias** field entered automatically.

![sign-in page](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Access/Accessing+AWS+Management+Console/sign-in-page.png)

2. Enter the provided **IAM user name** and **Password**.

3. Select **Sign in**.
This takes you to the AWS Management Console.

## Next step
[Connecting the Docker SDK](/docs/ca/dev/connecting-the-docker-sdk.html)  
