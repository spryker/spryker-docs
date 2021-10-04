---
title: Verifying email addresses
description: Learn how to verify email addresses, so that your applications can send emails from them.
template: howto-guide-template
---

For your applications to be able to send emails from an email address, you need to verify it. The verification is required to prevent spam from being sent from staging environments. 

To verify an email address:

1. In the AWS Management Console, go to **Services** > [**Amazon Simple Email Service**](https://console.aws.amazon.com/ses/).
2. In the top-right corner, select the region you want to verify the email address for.
3. In the left navigation pane, select **Email Addresses**.
4. Select **Verify a New Email Address**.
5. In the *Verify a New Email Address* window, enter the **Email Address** you want to verify and select **Verify This Email Address**.
  This reloads the page with the *Verification Email Sent* window displayed. A verification email has been sent to the email address.

  {% info_block warningBox "Verification link expiration" %}
  For security reasons, the verification link expires 24 hours after the message was sent. If 24 hours have passed since you received the verification email, repeat steps 1–5 to receive a new verification email.
  {% endinfo_block %}

7. In the verification email, select the verification link.
  This opens the page with the verification success message.
8. Optional: Repeat steps 1-7 until you verify the email address in all the desired regions.

You can see the verified email address in [Amazon Simple Email Service](https://console.aws.amazon.com/ses/) > **Email Addresses**. Your applications can use it to send emails.
