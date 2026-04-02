---
title: User management (IAM)
last_updated: Apr 02, 2026
description: Manage IAM users in CloudHub to control infrastructure access, configure VPN access, and manage SSH public keys for your Spryker environments.
template: concept-topic-template
---

The **User management (IAM Users)** panel in [CloudHub](/docs/ca/dev/cloud-hub/cloud-hub.html) lets you control infrastructure access and define how team members connect to your environments. You can create, update, and delete IAM users directly through the portal.

## Capabilities

- **Identity provisioning:** Create IAM users for specific environments to ensure precise access control.
- **Secure connectivity:** Enable or disable VPN access for individual users to secure communications with protected network resources.
- **Authentication configuration:** Manage SSH public keys for users, enabling secure, key-based authentication for terminal and remote access.
- **Access lifecycle management:** Track the status of user accounts, including creation timestamps and current provisioning states.
- **Account maintenance:** Modify existing user configurations or remove access when it is no longer required.

## Credential delivery for new users

When a new IAM user is created, credentials and access configuration are delivered securely across three separate emails:

1. **Password email:** The user's password is delivered via the [OneTimeSecret](https://onetimesecret.com) service as a one-time link. The link is protected by a passphrase, so the password cannot be accessed without it.
2. **Passphrase email:** The passphrase required to open the OneTimeSecret link is sent in a separate email. You must have both emails to retrieve the password.
3. **VPN configuration email:** The VPN configuration file (OVPN profile) required to connect to the protected network is sent in a third separate email.

{% info_block infoBox "Security note" %}

Keep all three emails secure. The OneTimeSecret link can only be opened once—if it has already been accessed, request a new user setup through CloudHub.

{% endinfo_block %}
