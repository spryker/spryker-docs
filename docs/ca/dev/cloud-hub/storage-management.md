---
title: Storage management (S3)
last_updated: Apr 02, 2026
description: Manage S3 buckets in CloudHub to provision storage, control access policies, and maintain an inventory of storage assets across your Spryker environments.
template: concept-topic-template
---

The **Storage management (S3)** panel in [CloudHub](/docs/ca/dev/cloud-hub/cloud-hub.html) provides a simplified workflow for handling object storage requirements across your infrastructure. You can create and update S3 buckets directly through the portal.

## Capabilities

- **On-demand bucket creation:** Provision new S3 buckets for any integrated environment.
- **Access policy control:** Define data visibility at the point of creation. You can set buckets to **Private** (restricted) or **Public** (accessible via the internet) based on your security requirements.
- **Asset inventory:** Maintain a high-level view of all storage assets, including their associated environments, access levels, and creation dates.
- **Resource management:** Update bucket settings directly through the portal.

## Bucket lifecycle management

You can create and update S3 buckets through CloudHub. Bucket deletion is not available through the portal due to security constraints—this prevents accidental removal of storage resources that may contain critical data.

{% info_block infoBox "Bucket removal" %}

If you need to delete an S3 bucket, create an Infrastructure Change Request in the [Support Portal](https://support.spryker.com).

{% endinfo_block %}
