---
title: Multi-factor authentication and passwords
description: Follow this guide to set up multi-factor authentication on Spryker, improving your security with detailed MFA device and configuration steps.
template: howto-guide-template
last_updated: Apr 22, 2024
redirect_from:
  - /docs/ca/dev/security/set-up-multi-factor-authentication.html
---

This document describes the security policies and features used to keep your accounts and environments safe.

## Security policy updates

To make Spryker environments safe, we regularly review our security policy and update access requirements. When the policy updates happen, we send email updates to Cloud Maintenance Contracts, informing about the changes and the steps to be taken. The latest email was sent on February 14, 2025.


## Password rotation and policy updates

Passwords must be updated every 365 days. If not updated within this period, you may be locked out of your account. If a password expires, on the next login attempt, you'll be asked to set a new password. As your password is getting closer to the expiration date, you'll receive warnings prompting you to update your password via the AWS Management Console.


## API keys

API keys must be renewed every 365 days. If keys expire, you'll not be able to interact with the account via API. If that happens, renew keys in the AWS Management Console and use them to access your account via API.


{% info_block warningBox "SES and S3 service accounts" %}

API keys for SES and S3 service accounts are an exception and don't expire.

{% endinfo_block %}


## MFA

Multi-factor authentication (MFA) adds an extra layer of security by requiring users to provide unique authentication in addition to their regular sign-in credentials when accessing AWS services.

MFA must be enabled for all accounts. An account with MFA disabled will not be able to access the AWS Management Console.


{% info_block warningBox "SES and S3 service accounts" %}

SES and S3 service accounts don't require MFA because they're accessed using API keys only.

{% endinfo_block %}


The following sections explain how to set up MFA.

### MFA devices

AWS supports the following types of MFA devices:

| MFA DEVICE TYPE | DESCRIPTION |
| - | - |
| FIDO security keys | Hardware security keys certified by the FIDO Alliance. They use public key cryptography for strong, phishing-resistant authentication. |
| Virtual MFA devices | Authenticator apps for smartphones and other devices. They emulate physical MFA devices and use the time-based one-time password (TOTP) algorithm. |
| Hardware TOTP tokens | Physical tokens that generate TOTP codes. |

### Set up MFA

{% info_block infoBox "Changing and removing MFA" %}

For security and auditing purposes, you can only add MFA. If you need to update or remove MFA, create a [Password Reset Change Request](https://support.spryker.com) and specify the necessary details.

{% endinfo_block %}

1. In the AWS Management Console, go to **Services**>**IAM**.
This opens the **IAM Dashboard** page.
2. On the dashboard click **Add MFA**
3. On the **Select MFA device**, enter a **Device name**.
4. Select the needed **MFA device**.

![AWS MFA Setup](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Security/Multi+Factor+Authentication/aws_mfa_example.png)

5. Click **Next** and follow the wizard to set up the device.

Once MFA is activated, you'll need to provide this factor every time you log into AWS.
