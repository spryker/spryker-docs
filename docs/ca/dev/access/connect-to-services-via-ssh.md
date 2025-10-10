---
title: Connect to services via SSH
description: Access internal Spryker Cloud environments securely via SSH, with onboarding steps for connecting through the bastion host to manage your cloud resources.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/connecting-to-services-via-ssh
originalArticleId: 914d013d-5ef3-4c0f-b940-ce8add5531c8
redirect_from:
  - /docs/connecting-to-services-via-ssh
  - /docs/en/connecting-to-services-via-ssh
  - /docs/cloud/dev/spryker-cloud-commerce-os/access/connecting-to-services-via-ssh.html
---

{% info_block warningBox "Restrictions apply" %}

- The following instruction are for personnel to connect to the cloud infrastructure and should not be used to connect other infrastructure components and systems to the cloud infrastructure.
- A direct RDS connection can be established only from Spryker services. Direct connection to RDS database outside of the the application's internal networks is prohibited.

{% endinfo_block %}

We add your SSH public key to the [bastion host](https://docs.aws.amazon.com/managedservices/latest/userguide/using-bastions.html) during the onboarding, so you can access your environments' internal networks via SSH right after. Bastion is the only instance you can connect to via SSH.

You can use SSH in two ways:

- Connect to the bastion host and, subsequently, connect to other supported infrastructure components
- Set up SSH port forwarding through bastion host to access a specific service from your computer


## Prerequisites

To get SSH access, request an IAM user by creating an Infrastructure Change Request/Access Management in our [Support Portal](https://support.spryker.com/s/case-funnel-problem). Make sure to include your SSH key in the request.

Together with an IAM user, you will also get VPN access via an OVPN profile.


## Connect to a service

{% info_block infoBox "Example services" %}

In the following instructions we use the Jenkins service as an example. Adjust the service name per your requirements.

{% endinfo_block %}


1. Connect to the VPN using the provided OVPN profile.
2. Connect to the bastion host:
    1. In the AWS Management Console, go to **Services** > **EC2** > **Instances**.
    2. Select **{environment_name}-bastion**.
        This opens a pane at the bottom of the page.
    3. Copy the value of the **Private IPv4 address** field.
    4. Connect to the copied IP address via SSH.
3. In the AWS Management Console, find the endpoint to connect to a service endpoint:
    1. Go to **Services** > **Route53** > **Hosted Zones**.
    2. Select the desired hosted zone.
    3. Enter **jenkins** in the search field and press **Enter**.
    4. Copy the value of the **Value/Route traffic to** field.
    5. Connect to the copied endpoint via SSH.
5. Optional: Set up SSH port forwarding:
    1. In the bastion host, get the IP address of the endpoint by resolving the copied endpoint:

    ```shell
    dig +short staging.cxg4btdhhsrr.eu-central-1.example.amazonaws.com
    10.111.4.63
    ```

    2. Set up SSH port forwarding using the IP address. For example:

    ```shell
    ssh -A ubuntu@<private_bastion_ip> -L 0.0.0.0:8080:<private_scheduler_ip>:80
    ```








































