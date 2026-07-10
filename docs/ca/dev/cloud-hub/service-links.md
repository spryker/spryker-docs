---
title: Service links
last_updated: Jul 10, 2026
description: Use Service Links in CloudHub to quickly access environment services such as Jenkins, RabbitMQ, AWS Console, and KeyCloak via SSO.
template: concept-topic-template
---

The **Service Links** panel in [CloudHub](/docs/ca/dev/cloud-hub/cloud-hub.html) provides quick access to the services available in each of your target environments. Each service is displayed as a card with a direct link to open it.

{% info_block infoBox %}

This feature is part of a gradual rollout and will be available to everyone eventually. We will notify your team once your project is onboarded.

{% endinfo_block %}

{% info_block infoBox "SSO access only" %}

Service links are only available for SSO-enabled environments. For non-SSO environments, links are not working as the URLs differ.

{% endinfo_block %}

## Accessing service links

To access service links, do the following:

1. In CloudHub, go to **Service Links**.
2. In the top-right corner, select the target environment from the dropdown.
3. The panel displays all available services for the selected environment.
4. To open a service, click **Open** on the corresponding service card.

## Available services

The following services may be available depending on your environment configuration:

| Service | Description | VPN required |
| :--- | :--- | :--- |
| **Jenkins** | Provides access to the Jenkins dashboard for managing build and deployment pipelines. | Yes |
| **RabbitMQ** | Lets you monitor queues, exchanges, and message activity. | Yes |
| **AWS Console** | Provides access to the AWS Management Console for your environment. | No |
| **KeyCloak** | Lets you manage users, roles, and authentication settings. | No |

{% info_block warningBox "VPN requirement" %}

Jenkins and RabbitMQ are only accessible when your VPN connection is active. Make sure your VPN is connected before attempting to open these services. For instructions on setting up VPN access, see [User management (IAM)](/docs/ca/dev/cloud-hub/user-management.html).

{% endinfo_block %}

{% info_block infoBox "Environment availability" %}

The services shown depend on the selected environment and may vary. Note that this page displays all services available in that environment — it does not reflect the access granted to individual users.

{% endinfo_block %}
