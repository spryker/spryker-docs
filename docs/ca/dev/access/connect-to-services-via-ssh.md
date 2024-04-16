---
title: Connect to services via SSH
description: Access Spryker Cloud services via SSH.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/connecting-to-services-via-ssh
originalArticleId: 914d013d-5ef3-4c0f-b940-ce8add5531c8
redirect_from:
  - /docs/connecting-to-services-via-ssh
  - /docs/en/connecting-to-services-via-ssh
  - /docs/cloud/dev/spryker-cloud-commerce-os/access/connecting-to-services-via-ssh.html
---

We add your SSH public key to the [bastion host](https://docs.aws.amazon.com/quickstart/latest/linux-bastion/overview.html) during the onboarding, so you can access your environments' internal networks via SSH right after.

You can use SSH in two ways:

1. Connect directly to the bastion host and, subsequently, connect to any internal service like [RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html).
2. Set up SSH port forwarding through bastion host to access a specific service from your computer.
{% info_block infoBox "Connecting to instances" %}

Bastion is the only instance you can connect to via SSH.

{% endinfo_block %}

## Prerequisites
For security purposes, SSH access is available only for the IP addresses in the security group. To get SSH access, provide the following details via [support](https://spryker.force.com/support/s/):

* Public IPs
* Public SSH keys

## Connect to a service

{% info_block infoBox "Exemplary services" %}

In the following instructions:

* We use the RDS service as an example. The steps to find the endpoints of other services may be slightly different.
* We use the Jenkins service as an example. Adjust the service name per your requirements.

{% endinfo_block %}



To connect to a service:

1. Connect to the bastion host:
    1. In the AWS Management Console, go to **Services** > **EC2** > **Instances**.
    2. Select *{environment_name}-bastion*.
        This opens a pane at the bottom of the page.
    3. Copy the value of the *Public IPv4 address* field.
    4. Connect to the copied IP address via SSH.
2. In the AWS Management Console, find the endpoint to connect to:
    * For an AWS service endpoint:
        1. Go to **Services** > **RDS** > **Databases**.
        2. Select the desired database.
        3. Copy the *Endpoint* value.
   * For a non-AWS service endpoint:
        1. Go to **Services** > **Route53** > **Hosted Zones**.
        2. Select the desired hosted zone.
        3. Enter *jenkins* in the search field and press *Enter*.
        4. Copy the value of the *Value/Route traffic to* field.

3. Connect to the VPN.
4. Connect to the copied endpoint via SSH.

5. Optional: Set up SSH port forwarding:
    1. In the bastion host, get the IP address of the endpoint by resolving the copied endpoint:
    ```shell
    dig +short staging.cxg4btdhhsrr.eu-central-1.rds.amazonaws.com
    10.111.4.63
    ```
    2. Set up SSH port forwarding using the IP address. For example:
    ```shell
    ssh -A ubuntu@<private_bastion_ip> -L 0.0.0.0:8080:<private_scheduler_ip>:80
    ```
