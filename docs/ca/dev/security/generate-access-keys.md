---
title: Generate access keys
description: Learn how to generate access keys in the AWS Management Console for Spryker Cloud Commerce OS, enabling AWS CLI access and development environment integration.
template: howto-guide-template
last_updated: Jan 19, 2024
originalLink: https://cloud.spryker.com/docs/generating-access-keys
originalArticleId: 624eb34a-4e28-40ec-a9cb-663ae1524d33
redirect_from:
  - /docs/generating-access-keys
  - /docs/en/generating-access-keys
  - /docs/cloud/dev/spryker-cloud-commerce-os/security/generating-access-keys.html
---

This document describes how to generate access keys. Access keys are used to access AWS Command Line Interface and connect integrated development environments, like PhpStorm.

{% info_block infoBox %}

* You can only generate an access key for your own account. If you want to create another account and generate an access key for that account, [contact support](https://spryker.force.com/support/s/). 
* These keys are strictly intended for local development and personal AWS CLI access, and should not be used for any type of automations.

{% endinfo_block %}

## Generate an access key

1. In the AWS Management Console navigation bar, click on your username > **My Security Credentials**.
![My security credentials button](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Security/Generating+access+keys/my-security-credentials-button.png)
2. On the **My security credentials** page, click **Create access key**.
![Create access key button](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Security/Generating+access+keys/create-access-key-button.png)
    This opens the **Create access key** window with a success message displayed. Your access key has been generated.
3. To download the access key, click **Download .csv** file.
![Download csv file button](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Security/Generating+access+keys/download-csv-button-file-button.png)
4. Optional: To check the access key in this window, click **Show secret access key**.

You've generated and downloaded your access key.

## Generate temporary credentials for Multi-Factor Authentication

If your IAM user has Multi-Factor Authentication enabled, follow generate and use temporary credentials:

1. Run `aws configure` and enter the permanent access and secret keys generated in the previous section.
2. To fetch temporary credentials and export them to your terminal, follow [How do I use the AWS CLI to authenticate access to AWS resources with an MFA token?](https://repost.aws/knowledge-center/authenticate-mfa-cli).

Once you've completed the above steps, you should be able to access AWS resources with the AWS Command Line Interface.
