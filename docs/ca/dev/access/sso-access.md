---
title: SSO Access
description: Single sign on access to all Spryker Cloud services with a single SSO user
template: howto-guide-template
last_updated: Apr 23, 2026
---

## What is SSO
**Single Sign-On (SSO)** is an authentication mechanism that allows users to sign in once and access multiple applications without re-authenticating for each service (RMQ, Jenkins).

SSO can be integrated with an external organizational identity provider (IdP), such as a corporate directory service, enabling centralized user management and access control. 

This approach improves security by reducing password reuse and enhances the user experience by minimizing repeated logins.

## How SSO improves the user experience
SSO makes accessing services easier, faster, and more secure by providing:

- **Centralized authentication** through your company’s identity provider, or via users managed in our identity system
- **Fewer passwords to remember**, reducing friction and support overhead
- **A faster and smoother login experience** across all connected services
- **Simplified user lifecycle management** (onboarding, updates, and offboarding)
- **Stronger security and compliance** through consistent authentication policies
- **Easy integration for enterprise organizations** that use their own identity provider

## How to Access applications with an SSO user

You will need an SSO user, [User Management SSO](/docs/ca/dev/cloud-hub/sso-user-management.html) describes how to get one.

### AWS access 

- Click on **AWS Console** service in CloudHub which will lead to the SSO login page
- Log in using your SSO user credentials
- After successful authentication, you will be redirected to the AWS Console with access to your env services

### RabbitMQ access

For RabbitMQ user must have enabled VPN for the specific environment they want to access. Once the VPN is enabled:

- Click on **RabbitMQ** service in CloudHub which will lead to the RabbitMQ login page
- Click Log in button
- You will be redirected to the SSO login form 
- Provide your SSO user credentials and login

If you previously logged into VPN or any other application in the same browser, for example Jenkins, login will happen automatically, because you are using the same SSO user.

### Jenkins access
For Jenkins user must have enabled VPN for the specific environment they want to access. Once the VPN is enabled:

- Click on **Jenkins** service in CloudHub which will lead to the SSO login page
- Provide your SSO user credentials and login
- You will be redirected to Jenkins dashboard

If you previously logged into VPN or any other application in the same browser, for example RabbitMQ, login will happen automatically, because you are using the same SSO user.

### Keycloak access
Keycloak is the place where your SSO user can ve viewed and edited (editing options are limited).

- Click on **Keycloak** service in CloudHub which will lead to the SSO login page
- Provide your SSO user credentials and login
- You will be redirected to Keycloak where you chan change user name and password

If you previously logged into VPN or any other application in the same browser, for example RabbitMQ, login will happen automatically, because you are using the same SSO user.

## External IdP connection
As an alternative / additional authentication method, we support connection to external Identity Providers (IdPs) that use SAML or OpenID Connect (OIDC).

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
