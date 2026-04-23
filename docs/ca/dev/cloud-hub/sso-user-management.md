---
title: User management (SSO)
last_updated: Apr 23, 2026
description: Manage SSO users in CloudHub to control infrastructure access, configure VPN access, AWS access, and VPN access for your Spryker environments.
template: concept-topic-template
---

The **User management (SSO Users)** panel in [CloudHub](/docs/ca/dev/cloud-hub/cloud-hub.html) lets you control infrastructure access and define how team members connect to your environments in a unified and streamlined way while using one user to access everything. You can create, update, and delete SSO users, as well as fine-tune access for each user per service directly through the portal.

For more information on what is SSO and what benefits it provides see [SSO Access](/docs/ca/dev/access/sso-access.html).

## What you can do via User Management (SSO) page

- **Create one user for all services and environments:** when creating a user one can select the available permission levels for all or some of the available applications (RMQ, Jenkins or AWS access) and request VPN access per environment. this provides fine-grained access to multiple environments with one SSO user.
- **Manage the users to match the changing needs:** users can be deleted, if the access needs to be revoked, the permission levels can be adjusted at any time.
- **Create and manage users directly without support requests:** you can see the users and their access permissions at the moment and adjust them at any time via CloudHub without the need for contacting the support.

## Available service permissions 

Users can be assigned very granular permissions for every available application per environment. This means one SSO user can have admin permissions for RabbitMQ on test environment and viewer permissions for RabbitMQ on production environment.

| Service | Permission |
| -------- | -------- |
| Jenkins | * Admin — Full administrative access <br> * Developer — Can view queues, read and publish messages in the queues <br> * Viewer — Read-only access to queues|
| RabbitMQ | * Admin — Full administrative access with the ability to create and remove queues <br> * Developer — Can build, view, and cancel jobs <br> * Viewer — Read-only access to jobs and builds |
| AWS CLI | * BaseRole — allows access to the specific environment in the AWS Dashboard and AWS CLI <br> * Custom Role — can be absent, or can be one or more roles composed specifically for the customer that include all permissions of the Base role and additional permissions like DB access|

### Requesting and Renewing VPN for your SSO user 

An SSO user needs VPN to access Jenkins and RabbitMQ in addition to the SSO user. No VPN is required to access AWS Console.

To request the VPN for the specific environment, select VPN option in the SSO user creation or edition form on CloudHub. Depending on whether SSO is enabled for Bastion (which handles VPN connections), you may need to use your SSO user credentials to also login into the VPN when turning it on.

If your VPN configuration expired, you should click VPN Renew button next to your used to request a new VPN configuration.

## Credential delivery for new users

When a new SSO user is created, credentials and access configuration are delivered securely across two separate emails:

1. **User update email:** You will get `Action needed: Verify your Spryker SSO account updates` email with the link for account update. Follow this link to setup the password for your new user.
3. **VPN configuration email:** If you selected VPN checkbox on user creation, or checked it during user edit, the VPN configuration file (OVPN profile) required to connect to the protected network is sent in a separate email.

{% info_block infoBox "Security note" %}

Keep all three emails secure. The link for account update expires in 3 hours. If you did not manage to setup the user password within 3 hours, contact support.

{% endinfo_block %}
