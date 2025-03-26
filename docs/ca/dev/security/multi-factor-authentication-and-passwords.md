---
title: Multi-factor authentication and passwords
description: Follow this guide to set up multi-factor authentication on Spryker, improving your security with detailed MFA device and configuration steps.
template: howto-guide-template
last_updated: Apr 22, 2024
redirect_from:
  - /docs/ca/dev/security/set-up-multi-factor-authentication.html
---

As per our info mail to Cloud Maintenance Contacts from the 14.02.2025 we have started to roll out updates that will make Spryker environments safer. In this article, we want to summarize the most important changes.

## Password rotation and policy updates

Passwords are required to be updated every 365 days. If your password isn't updated within this period, you may get locked out of your account. If that happens, the next time you are trying to log in with your correct passwrd, you will be asked to setup a new password before you can use the account. As the maximum credential age threshold approaches, you will receive warnings, asking you to update your password, which you should be able to do using the AWS UI.

This also affects API keys for IAM users and they will expire after 365 days. If you are using API Keys to interact with an AWS IAM user, please remember to renew the Keys before they reach 365 days of age. You can do so in the AWS Management Console. 

We are enforcing multi-factor authentication and require all IAM users to have Multi Factor Authentication set up. If MFA is disabled or the IAM user account password no longer fulfills the requirements, you may have to update the settings to regain access to the account and its normal permission set.

{% info_block warningBox "Note on Service Users" %}
SES and S3 service accounts are generally used via API Keys only and are for now exempted from MFA requirements. This means you can continue to use the API Keys and access S3 buckets without needing to set up MFA for these users. API Key age restrictions also do not currently apply. This might change in the future and you will be notified separately when a policy change related to API Keys for service accounts is phased in.
{% endinfo_block %}


## MFA

Multi-factor authentication (MFA) adds an extra layer of security by requiring users to provide unique authentication in addition to their regular sign-in credentials when accessing AWS services. Below we want to explain how you can upgrade IAM users to use Multi Factor Authentication. 

### MFA devices

AWS supports the following types of MFA devices:

| MFA DEVICE TYPE | DESCRIPTION |
| - | - |
| FIDO security keys | Hardware security keys certified by the FIDO Alliance. They use public key cryptography for strong, phishing-resistant authentication. |
| Virtual MFA devices | Authenticator apps for smartphones and other devices. They emulate physical MFA devices and use the time-based one-time password (TOTP) algorithm. |
| Hardware TOTP tokens | Physical tokens that generate TOTP codes. |

### Set up MFA

{% info_block infoBox "Changing and removing MFA" %}

For security and auditing purposes, you can only add MFA. If you need to update or remove MFA, create a [Password Reset Change Request](https://spryker.force.com/support/s/) and specify the necessary details.

{% endinfo_block %}

1. In the AWS Management Console, go to **Services**>**IAM**.
This opens the **IAM Dashboard** page.
2. On the dashboard click **Add MFA**
3. On the **Select MFA device**, enter a **Device name**.
4. Select the needed **MFA device**.

![AWS MFA Setup](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Security/Multi+Factor+Authentication/aws_mfa_example.png)

5. Click **Next** and follow the wizard to set up the device.

Once MFA is activated, you'll need to provide this factor every time you log into AWS.
