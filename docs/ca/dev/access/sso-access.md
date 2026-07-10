---
title: SSO Access
description: Single sign on access to all Spryker Cloud services with a single SSO user
template: howto-guide-template
last_updated: Jul 10, 2026
---

{% info_block infoBox %}

This feature is part of a gradual rollout and will be available to everyone eventually. We will notify your team once your project is onboarded.

{% endinfo_block %}

## What is SSO

**Single Sign-On (SSO)** is an authentication mechanism that allows users to sign in once and access multiple applications without re-authenticating for each service (RMQ, Jenkins).

SSO can be integrated with an external organizational identity provider (IdP), such as a corporate directory service, enabling centralized user management and access control.

This approach improves security by reducing password reuse and enhances the user experience by minimizing repeated logins.

## How SSO improves the user experience

SSO makes accessing services easier, faster, and more secure by providing:

- **Centralized authentication** through your company's identity provider, or via users managed in our identity system
- **Fewer passwords to remember**, reducing friction and support overhead
- **A faster and smoother login experience** across all connected services
- **Simplified user lifecycle management** (onboarding, updates, and offboarding)
- **Stronger security and compliance** through consistent authentication policies
- **Easy integration for enterprise organizations** that use their own identity provider

## How to access applications with an SSO user

You will need an SSO user, [User Management SSO](/docs/ca/dev/cloud-hub/sso-user-management.html) describes how to get one.

### AWS access

#### AWS Management Console

1. Click on **AWS Console** service in CloudHub which will lead to the SSO login page.
2. Log in using your SSO user credentials.
3. After successful authentication, you will be redirected to the AWS Management Console with access to your environment services.

#### AWS CLI

To access AWS services via the AWS CLI with your SSO credentials, see [Connecting to AWS CLI with an SSO user](/docs/ca/dev/access/connecting-to-aws-cli-with-an-sso-user.html).

### VPN access

VPN access uses short-lived sessions for improved security. To start a VPN session, you must go through the SSO login process and provide an MFA code.

1. Open your VPN client and initiate a connection to the target environment.
2. When prompted, log in using your SSO user credentials.
3. Provide your MFA code to complete authentication.
4. Once authenticated, the VPN session is established. The session is short-lived and will expire after a period of inactivity or at a set time limit.

To reconnect after a session expires, repeat the SSO login and MFA steps.

### RabbitMQ access

For RabbitMQ, the user must have VPN enabled for the specific environment they want to access. Once the VPN is enabled:

1. Click on **RabbitMQ** service in CloudHub which will lead to the RabbitMQ login page.
2. Click the **Log in** button.
3. You will be redirected to the SSO login form.
4. Provide your SSO user credentials and log in.

If you previously logged in to VPN or any other application in the same browser, for example Jenkins, log in happens automatically, because you are using the same SSO user.

### Jenkins access

For Jenkins, the user must have VPN enabled for the specific environment they want to access. Once the VPN is enabled:

1. Click on **Jenkins** service in CloudHub which will lead to the SSO login page.
2. Provide your SSO user credentials and log in.
3. You will be redirected to the Jenkins dashboard.

If you previously logged in to VPN or any other application in the same browser, for example RabbitMQ, log in happens automatically, because you are using the same SSO user.

### Keycloak access

Keycloak is where you can view and edit your SSO user profile (editing options are limited).

1. Click on **Keycloak** service in CloudHub which will lead to the SSO login page.
2. Provide your SSO user credentials and log in.
3. You will be redirected to Keycloak where you can change your username and password.

If you previously logged in to VPN or any other application in the same browser, for example RabbitMQ, log in happens automatically, because you are using the same SSO user.

## External IdP connection

As an alternative or additional authentication method, we support connection to external Identity Providers (IdPs) that use SAML or OpenID Connect (OIDC).

Benefits of using an external IdP:

- You can apply and enforce your own authentication policies.
- You can manage user assignments and permissions to all supported services directly through your IdP without creating any Self‑Service requests.
- Centralized lifecycle management of users (onboarding/offboarding handled entirely in your IdP).
- Stronger security posture through enterprise-grade features such as MFA, conditional access, and device or network policies.
- Seamless user experience with a single set of corporate credentials.
- Reduced administrative overhead by eliminating duplicate user management.
- Better compliance and auditing through centralized identity logs and policies.
- Faster and automated access provisioning as your organization scales.
- Improved security posture by not storing or processing passwords within our platform.

{% info_block infoBox "Acquiring external IdP users limitation" %}

Such users **cannot** be created or managed via CloudHub User Management (SSO) page. For configuration details, contact our support team.

{% endinfo_block %}

## Next steps

- [User Management SSO](/docs/ca/dev/cloud-hub/sso-user-management.html)
- [SSO Security Options](/docs/ca/dev/access/sso-security-options.html)
- [Connecting to AWS CLI with an SSO user](/docs/ca/dev/access/connecting-to-aws-cli-with-an-sso-user.html)
