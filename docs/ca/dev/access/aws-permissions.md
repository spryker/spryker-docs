---
title: AWS permissions
last_updated: Jul 22, 2026
description: Overview of AWS permissions granted to all Spryker Cloud users regardless of access method.
template: concept-topic-template
---

The following permissions apply to all users regardless of whether they access the environment via IAM user or SSO.

| Service area | What you can do |
|---|---|
| CI/CD | Start, stop, retry, and monitor pipelines and builds; view repositories and deployment history. |
| Monitoring and logs | View CloudWatch metrics; create, view, and delete dashboards; read log groups and run log queries. |
| Databases | View, restore, reboot, and manage RDS database instances; create and delete snapshots; modify parameter groups; view Performance Insights metrics. |
| Containers | View ECS clusters, services, and tasks; list and describe container images. Read-only. |
| Storage | Read and write to project asset buckets and CSV upload bucket; list all buckets. |
| Parameter Store | Read and write configuration and secret parameters within [Environment Variable Management](/docs/ca/dev/add-variables-in-the-parameter-store.html) guardrails; manage application deployment version parameters. |
| CloudFront | View CloudFront distributions; create cache invalidations; view WAF rules and ACM certificates. |
| Email | Full access to Simple Email Service. |
| DNS | Read-only access to hosted zones and domain names. |
| AWS Backup | Configure, manage, and execute backups across supported AWS services. |
| IAM (own account only) | Manage your own password, MFA devices, SSH public keys, Git credentials, and access keys. |