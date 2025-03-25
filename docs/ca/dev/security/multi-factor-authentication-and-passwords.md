---
title: Multi-factor authentication and passwords
description: Follow this guide to set up multi-factor authentication on Spryker, improving your security with detailed MFA device and configuration steps.
template: howto-guide-template
last_updated: Apr 22, 2024
redirect_from:
  - /docs/ca/dev/security/set-up-multi-factor-authentication.html
---

Multi-factor authentication (MFA) and a strong password are required security features for all AWS accounts.

## Password rotation and policy updates

Passwords are required to be updated every 365 days. If your password isn't updated within this period, you may get locked out of your account. This also affects API keys because they're tied to your account.

The same behavior applies for security policy changes. If MFA is disabled or account password no longer fulfills the requirements, you may have to update the settings to regain access to the account. 

## MFA

Multi-factor authentication (MFA) adds an extra layer of security by requiring users to provide unique authentication in addition to their regular sign-in credentials when accessing AWS services. Here are the steps to set up MFA:

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
