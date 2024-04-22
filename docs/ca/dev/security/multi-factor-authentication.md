---
title: Multi Factor Authentication
description: Secure your accounts and increase your security posture
template: howto-guide-template
last_updated: Apr 22, 2024
---

Multi Factor Authentication (MFA= adds an extra layer of security by requiring users to provide unique authentication in addition to their regular sign-in credentials when accessing AWS services. Here are the steps to set up MFA:

## Get an MFA Device
You’ll need an MFA device to proceed. There are several types of MFA devices supported by AWS:
 * FIDO Security Keys: These are third-party hardware security keys certified by the FIDO Alliance. They use public key cryptography for strong, phishing-resistant authentication.
 * Virtual MFA Devices: These are authenticator apps that run on your phone or other devices. They emulate physical MFA devices and use the time-based one-time password (TOTP) algorithm.
 * Hardware TOTP Tokens: These are physical tokens that generate TOTP codes.
Choose the type of MFA device that suits your needs.

## Receive Your Login Details and Log In
When you request a new AWS console user using the Support Portal, you’ll receive credentials for that user. Use these credentials to log in to the AWS dashboard.
You’ll be prompted to set up a new password. Make sure to use a strong password.

## Activate MFA
Switch to the IAM (Identity and Access Management) console by searching for “IAM” in the search window.
Look for the “Security Recommendations” tab, which should give you the option to set up MFA.
Click the “Add MFA” button.
![AWS MFA Setup](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Security/Multi+Factor+Authentication/aws_mfa_example.png "AWS MFA Setup")
Name your MFA device and choose the type of device you want to use (e.g., Authenticator App).
Follow the on-screen instructions to complete the setup.

{% info_block infoBox %}
Once MFA is activated, you’ll need to provide this additional factor every time you log in to the AWS console.
Remember that AWS periodically redesigns its dashboard, so the buttons or menu items may vary slightly. For security and auditing purposes, we do not allow you to remove or update an MFA device directly yourself. If you need to switch devices later, create a Password Reset Change Request and specify the necessary details.
{% endinfo_block %}
