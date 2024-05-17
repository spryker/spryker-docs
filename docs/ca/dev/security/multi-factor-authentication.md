---
title: Multi-factor authentication
description: Increase account security
template: howto-guide-template
last_updated: Apr 22, 2024
---

Multi-factor authentication (MFA) adds an extra layer of security by requiring users to provide unique authentication in addition to their regular sign-in credentials when accessing AWS services. Here are the steps to set up MFA:

## Get an MFA device

AWS supports the following types of MFA devices:

| MFA DEVICE TYPE | DESCRIPTION |
| - | - |
| FIDO security keys | Hardware security keys certified by the FIDO Alliance. They use public key cryptography for strong, phishing-resistant authentication.
| Virtual MFA devices | Authenticator apps for smartphones and other devices. They emulate physical MFA devices and use the time-based one-time password (TOTP) algorithm.
| Hardware TOTP tokens | Physical tokens that generate TOTP codes. |


## Receive your login details and log in

When you request a new AWS console user using the Support Portal, you’ll receive credentials for that user. Use these credentials to log into the AWS dashboard.

When prompted set up a new password, make sure to use a strong one.

## Activate MFA

In the AWS Management Console, go to **Services**>**IAM**. Switch to the IAM (Identity and Access Management) console by searching for “IAM” in the search window.
Look for the “Security Recommendations” tab, which should give you the option to set up MFA.
Click the “Add MFA” button.
![AWS MFA Setup](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Security/Multi+Factor+Authentication/aws_mfa_example.png "AWS MFA Setup")
Name your MFA device and choose the type of device you want to use (e.g., Authenticator App).
Follow the on-screen instructions to complete the setup.

{% info_block infoBox %}
Once MFA is activated, you’ll need to provide this additional factor every time you log in to the AWS console.
Remember that AWS periodically redesigns its dashboard, so the buttons or menu items may vary slightly. For security and auditing purposes, we do not allow you to remove or update an MFA device directly yourself. If you need to switch devices later, create a Password Reset Change Request and specify the necessary details.
{% endinfo_block %}
