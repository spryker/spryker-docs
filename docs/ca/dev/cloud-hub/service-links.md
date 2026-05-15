---
title: Service links
last_updated: May 15, 2026
description: Use Service Links in CloudHub to quickly access environment services such as Jenkins, RabbitMQ, AWS Console, and KeyCloak via SSO.
template: concept-topic-template
---

The **Service Links** panel in [CloudHub](/docs/ca/dev/cloud-hub/cloud-hub.html) provides quick access to the services available in each of your target environments. Each service is displayed as a card with a direct link to open it.

{% info_block infoBox "SSO access only" %}

Service Links are only available to users who authenticate via Single Sign-On (SSO). Direct or non-SSO access is not supported.

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
| **Jenkins** | CI/CD pipeline automation. Provides access to the Jenkins dashboard for managing build and deployment pipelines. | Yes |
| **RabbitMQ** | Message broker management console. Lets you monitor queues, exchanges, and message activity. | Yes |
| **AWS Console** | Cloud infrastructure management. Provides access to the AWS Management Console for your environment. | No |
| **KeyCloak** | Identity and access management. Lets you manage users, roles, and authentication settings. | No |

{% info_block warningBox "VPN requirement" %}

Jenkins and RabbitMQ are only accessible when your VPN connection is active. Make sure your VPN is connected before attempting to open these services. For instructions on setting up VPN access, see [User management (IAM)](/docs/ca/dev/cloud-hub/user-management.html).

{% endinfo_block %}

{% info_block infoBox "Environment availability" %}

The services displayed depend on the selected environment. Not all services may be available in every environment.

{% endinfo_block %}
