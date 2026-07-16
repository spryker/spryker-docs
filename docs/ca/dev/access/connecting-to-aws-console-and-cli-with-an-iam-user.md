---
title: Connecting to AWS Console and CLI with an IAM user
description: Learn how to access the AWS Management Console and set up AWS CLI access with MFA as an IAM user.
template: howto-guide-template
last_updated: Jul 16, 2026
---

This document describes how to access the AWS Management Console and configure AWS CLI access as an IAM user with Multi-Factor Authentication (MFA) enforced.

## Prerequisites

- [AWS CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) on your machine.
- An IAM user account and credentials provided by your administrator. If you need an account, [contact support](https://portal.spryker.com).

## Step 1: Sign in to the AWS Management Console

1. In your browser, open the sign-in URL provided by your administrator.

{% info_block infoBox "Sign-in URL" %}

The sign-in URL contains the ID of the account you are signing into. The pattern is `https://{AWS_ACCOUNT_ID}.signin.aws.amazon.com/console/`. Alternatively, you can sign in at the [general sign-in endpoint](https://console.aws.amazon.com/) by entering the account ID manually.

{% endinfo_block %}

The sign-in page opens with the **Account ID (12 digits) or account alias** field entered automatically.

2. Enter your **IAM user name** and **Password**.
3. Select **Sign in**.
4. When prompted, enter the MFA code from your authenticator application.

You are now signed in to the AWS Management Console.

## Step 2: Generate access keys

Access keys are the long-term static credentials used to configure AWS CLI. Generate them once and store them securely.

{% info_block infoBox %}

- You can only generate an access key for your own account.
- Access keys are intended for local development and personal AWS CLI access only. Do not use them for automations.

{% endinfo_block %}

1. In the AWS Management Console navigation bar, click your username > **My Security Credentials**.
2. On the **Security credentials** page, click **Create access key**.
3. On the **Access key best practices & alternatives** page, select **Command Line Interface (CLI)**, then click **Next**.
   The **Create access key** window opens. Your access key has been generated.
4. Click **Download .csv file** to save the credentials.
5. Optional: To view the secret key in this window, click **Show secret access key**.

Store the downloaded credentials securely. The secret access key is shown only once.

## Step 3: Configure static credentials in your terminal

Because MFA is enforced, you need temporary session credentials to use the AWS CLI. Static credentials alone are only used to request those temporary credentials.

Start by clearing any previously exported credentials to ensure no stale values are used:

```bash
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
```

Then export your static access key pair:

```bash
export AWS_ACCESS_KEY_ID="{YOUR_ACCESS_KEY_ID}"
export AWS_SECRET_ACCESS_KEY="{YOUR_SECRET_ACCESS_KEY}"
```

Replace `{YOUR_ACCESS_KEY_ID}` and `{YOUR_SECRET_ACCESS_KEY}` with the values from the `.csv` file you downloaded in [Step 2](#step-2-generate-access-keys).

## Step 4: Find your MFA device ARN

To retrieve your MFA device serial number, use the AWS CLI:

```bash
aws iam list-mfa-devices
```

The output contains a `SerialNumber` field with a value in the following format:

```text
arn:aws:iam::{ACCOUNT_ID}:mfa/{DEVICE_NAME}
```

Note this value — you need it in the next step.

## Step 5: Generate temporary session credentials

Use one of the following options, replacing the placeholders with your values:

**Option A: Step by step**

1. Request temporary credentials from AWS STS and save the output to a variable:

```bash
temp_creds=$(aws sts get-session-token \
  --serial-number {MFA_DEVICE_ARN} \
  --token-code {MFA_TOKEN_CODE} \
  --query "Credentials.[AccessKeyId,SecretAccessKey,SessionToken]" \
  --output text)
```

2. Read the three values from the output into separate variables:

```bash
read -r AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN <<< "$temp_creds"
```

3. Export them to your terminal session:

```bash
export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
```

4. Clean up the temporary variable:

```bash
unset temp_creds
```

**Option B: Single command**

Run all of the above as a single command:

```bash
temp_creds=$(aws sts get-session-token \
  --serial-number {MFA_DEVICE_ARN} \
  --token-code {MFA_TOKEN_CODE} \
  --query "Credentials.[AccessKeyId,SecretAccessKey,SessionToken]" \
  --output text) \
&& read -r AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN <<< "$temp_creds" \
&& export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN \
&& unset temp_creds
```

| Placeholder | Description |
|---|---|
| `{MFA_DEVICE_ARN}` | The `SerialNumber` from [Step 4](#step-4-find-your-mfa-device-arn). |
| `{MFA_TOKEN_CODE}` | The current 6-digit code from your authenticator application. |

**Example:**

```bash
temp_creds=$(aws sts get-session-token \
  --serial-number arn:aws:iam::123456789012:mfa/john.doe \
  --token-code 521288 \
  --query "Credentials.[AccessKeyId,SecretAccessKey,SessionToken]" \
  --output text) \
&& read -r AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN <<< "$temp_creds" \
&& export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN \
&& unset temp_creds
```

The command fetches temporary credentials from AWS STS, reads the three values into variables, and exports them — overriding the static credentials in your current terminal session.

{% info_block infoBox "Session duration" %}

Temporary credentials are valid for limited timeframe. When they expire, repeat [Step 3](#step-3-configure-static-credentials-in-your-terminal) and [Step 5](#step-5-generate-temporary-session-credentials) to obtain new ones. You can customize the duration using the `--duration-seconds` parameter (minimum: 900 seconds).

{% endinfo_block %}

You can now use the AWS CLI to access your environment:

```bash
aws ec2 describe-instances
```

## Next steps

- [Connecting the Docker SDK](/docs/ca/dev/connecting-the-docker-sdk.html)
- [Connecting to AWS CLI with an SSO user](/docs/ca/dev/access/connecting-to-aws-cli-with-an-sso-user.html)
