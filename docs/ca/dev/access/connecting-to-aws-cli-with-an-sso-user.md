---
title: Connecting to AWS CLI with an SSO user
description: Learn how to configure and use SAML2AWS to authenticate and access the AWS CLI using your SSO credentials.
template: howto-guide-template
last_updated: Jun 10, 2026
---

{% info_block infoBox %}

This feature is part of a gradual rollout and will be available to everyone eventually. We will notify your team once your project is onboarded.

{% endinfo_block %}

This document describes how to configure and use [SAML2AWS](https://github.com/Versent/saml2aws) to authenticate with the AWS CLI using your SSO credentials.

SAML2AWS is a command-line tool that lets you authenticate against an identity provider (IdP) using SAML and obtain temporary AWS credentials. This gives you AWS CLI access to your cloud environment without managing long-lived AWS access keys.

## Prerequisites

- [SAML2AWS installed](https://github.com/Versent/saml2aws#install) on your machine.
- [AWS CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) on your machine.
- An SSO user. See [User Management SSO](/docs/ca/dev/cloud-hub/sso-user-management.html).
- Your SSO login page URL. To get it, see [SSO Access](/docs/ca/dev/access/sso-access.html).

## Step 1: Configure SAML2AWS

To configure SAML2AWS, replace the placeholders with your actual values and execute the following:

```bash
saml2aws configure \
  --idp-provider=Browser \
  --browser-type={BROWSER_TYPE} \
  --url={YOUR_SSO_LOGIN_PAGE_URL} \
  --profile={YOUR_PROFILE} \
  --skip-prompt
```

| Parameter | Description |
|---|---|
| `--idp-provider=Browser` | Uses a browser-based login flow via your identity provider. |
| `--browser-type` | The browser to use for authentication. See [Supported browser types](#supported-browser-types). |
| `--url` | SSO login page URL. |
| `--profile` | The AWS CLI profile name to store credentials under. |
| `--skip-prompt` | Skips interactive prompts and applies values directly. |

**Example:**

```bash
saml2aws configure \
  --idp-provider=Browser \
  --browser-type=chrome \
  --url=https://auth.spryker.systems/realms/my-realm/protocol/saml/clients/my-aws-client \
  --profile=my-aws-profile \
  --skip-prompt
```

## Step 2: Log in with SAML2AWS

After configuring, run the login command to authenticate and retrieve temporary AWS credentials:

```bash
saml2aws login \
  --profile={YOUR_PROFILE} \
  --skip-prompt
```

Add `--force` to skip the expiry check and re-authenticate even if existing credentials are still valid:

```bash
saml2aws login \
  --profile={YOUR_PROFILE} \
  --skip-prompt \
  --force
```

{% info_block infoBox "Browser driver" %}

On some operating systems and browsers, SAML2AWS needs to download a browser driver automatically. If login fails or the browser does not open, add the `--download-browser-driver` flag:

```bash
saml2aws login \
  --profile={YOUR_PROFILE} \
  --download-browser-driver \
  --skip-prompt
```

You do not need this flag if you are on Linux and using Chrome.

{% endinfo_block %}

On successful authentication, your terminal displays a confirmation and the credentials are saved under the specified profile.

## Step 3: Use the AWS CLI

Pass `--profile {YOUR_PROFILE}` to any AWS CLI command to use the credentials obtained from SAML2AWS:

```bash
aws --profile={YOUR_PROFILE} s3 ls
aws --profile={YOUR_PROFILE} ec2 describe-instances
```

To avoid specifying `--profile` with every command, set the `AWS_PROFILE` environment variable for your session:

```bash
export AWS_PROFILE={YOUR_PROFILE}
aws s3 ls
aws ec2 describe-instances
```

The temporary credentials expire after a set period. When they expire, re-run the login command from [Step 2](#step-2-log-in-with-saml2aws) to refresh them.

## Supported browser types

The `--browser-type` parameter accepts the following values (see the [full list in the saml2aws source](https://github.com/Versent/saml2aws/blob/v2.36.19/cmd/saml2aws/main.go#L76)):

| Value | Browser |
|---|---|
| `chrome` | Google Chrome (stable) |
| `chrome-beta` | Google Chrome Beta |
| `chrome-dev` | Google Chrome Dev |
| `chrome-canary` | Google Chrome Canary |
| `chromium` | Chromium |
| `firefox` | Mozilla Firefox |
| `webkit` | WebKit (Safari engine, macOS) |
| `msedge` | Microsoft Edge (stable) |
| `msedge-beta` | Microsoft Edge Beta |
| `msedge-dev` | Microsoft Edge Dev |
| `msedge-canary` | Microsoft Edge Canary |

## OS and browser combinations

The following combinations have been verified to work:

| Operating system | Browser |
|---|---|
| Ubuntu | Chrome, Chromium, Firefox |
| macOS | WebKit, Chromium |
| Windows 10 | Chrome, Firefox, Microsoft Edge |

{% info_block warningBox "Chrome on macOS" %}

Chrome on macOS may not work for all users. If you experience issues, use `webkit` or `chromium` instead.

{% endinfo_block %}

## Troubleshooting

| Issue | Solution |
|---|---|
| The browser does not open during login. | Add `--download-browser-driver` to the login command to let SAML2AWS download the required browser driver automatically. |
| Authentication fails or credentials are not saved. | Verify that `--browser-type` matches a browser installed on your machine and that the `--url` value is correct. |
| The AWS CLI does not recognize the profile. | Ensure the `--profile` value in the login command matches the one used during configuration. |
| `Error authenticating to IDP.: please install the driver (vx.x.x) and browsers first: %!w(<nil>)` | Add `--download-browser-driver` to the login command to let SAML2AWS download the required browser driver automatically. |

## Next steps

- [SSO Access](/docs/ca/dev/access/sso-access.html)
- [Access AWS Management Console](/docs/ca/dev/access/access-the-aws-management-console.html)
