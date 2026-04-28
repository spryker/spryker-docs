---
title: CloudHub
last_updated: Apr 23, 2026
description: CloudHub is a centralized self-service portal for managing Spryker infrastructure, including user access, S3 storage, and maintenance notifications.
template: concept-topic-template
---

CloudHub is a centralized self-service portal that lets you manage your Spryker infrastructure directly, without raising manual support requests for routine tasks. It provides a streamlined interface for provisioning resources and managing access.

Technical teams can use CloudHub to maintain a clear overview of their cloud assets and keep access and storage resources aligned across environments, such as staging and production.

CloudHub includes the following panels:

- [User management (IAM)](/docs/ca/dev/cloud-hub/user-management.html): Provision and manage IAM users, configure VPN access, and manage SSH public keys.
- [User management (SSO)](/docs/ca/dev/cloud-hub/sso-user-management.html): Provision and manage SSO users, configure VPN access.
- [Storage management (S3)](/docs/ca/dev/cloud-hub/storage-management.html): Provision and manage S3 buckets across your environments.
- [Maintenance](/docs/ca/dev/cloud-hub/maintenance.html): View upcoming maintenance windows and scheduled infrastructure updates.

## Resource status and validation

CloudHub provides feedback on all infrastructure actions through the **Processing Status** column. This ensures transparency during the asynchronous provisioning process.

| Status | Description |
| :--- | :--- |
| **In Progress** | The infrastructure change is currently being deployed or updated by the automation engine. |
| **Error** | The action could not be completed. CloudHub provides specific error details. There are two types of error user might face:<br>&bull; **System errors**: In this case, we create a HubSpot ticket for our operations team to handle the problem. The user will receive a ticket number to track progress.<br>&bull; **Validation errors**: Issues like "S3 bucket name already exists" which must be fixed by the user. |
| **Active/Success** | The resource is fully provisioned, validated, and ready for use in the designated environment. |
