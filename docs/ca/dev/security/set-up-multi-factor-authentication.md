---
title: Set up multi-factor authentication
description: Follow this guide to set up multi-factor authentication on Spryker, improving your security with detailed MFA device and configuration steps.
template: howto-guide-template
last_updated: Apr 22, 2024
---

Multi-factor authentication (MFA) adds an extra layer of security by requiring users to provide unique authentication in addition to their regular sign-in credentials when accessing AWS services. Here are the steps to set up MFA:

## MFA devices

AWS supports the following types of MFA devices:

| MFA DEVICE TYPE | DESCRIPTION |
| - | - |
| FIDO security keys | Hardware security keys certified by the FIDO Alliance. They use public key cryptography for strong, phishing-resistant authentication. |
| Virtual MFA devices | Authenticator apps for smartphones and other devices. They emulate physical MFA devices and use the time-based one-time password (TOTP) algorithm. |
| Hardware TOTP tokens | Physical tokens that generate TOTP codes. |

## Set up MFA

{% info_block infoBox "Changing and removing MFA" %}

For security and auditing purposes, you can only add MFA. If you need to update or remove MFA, create a [Password Reset Change Request](https://spryker.force.com/support/s/) and specify the necessary details.

{% endinfo_block %}

1. In the AWS Management Console, go to **Services**>**IAM**.
This opens the **IAM Dashboard** page.
2. In the navigation pane, click **Users**.
3. In the **Users** list, click on the user you want to set up MFA for.
4. On the user's page, click the **Security credentials** tab.
5. In the **Multi-factor authentication (MFA)** pane, click **Assign MFA device**.
6. On the **Select MFA device**, enter a **Device name**.
7. Select the needed **MFA device**.

![AWS MFA Setup](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Security/Multi+Factor+Authentication/aws_mfa_example.png)

8. Click **Next** and follow the wizard to set up the device.

Once MFA is activated, you’ll need to provide this factor every time you log into AWS.
