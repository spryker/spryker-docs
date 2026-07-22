---
title: Access
last_updated: Jul 22, 2026
description: Describes how to access AWS Management Console, locate credentials for Spryker Cloud Commerce OS services, and connect to services
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/access/access.html
---

This section describes how to access AWS Management Console as an Identity and Access Management (IAM) user, locate the credentials for Spryker Cloud Commerce OS services, and connect to services:

- [SSO Access](/docs/ca/dev/access/sso-access.html)
- [SSO Security Options](/docs/ca/dev/access/sso-security-options.html)
- [Connecting to AWS Console and CLI with an IAM user](/docs/ca/dev/access/connecting-to-aws-console-and-cli-with-an-iam-user.html)
- [Connecting to AWS CLI with an SSO user](/docs/ca/dev/access/connecting-to-aws-cli-with-an-sso-user.html)
- [Locating service credentials](/docs/ca/dev/access/locate-service-credentials.html)
- [Connecting to services via SSH](/docs/ca/dev/access/connect-to-services-via-ssh.html)

## AWS permissions

The following permissions apply to all users regardless of whether they access the environment via IAM user or SSO.

### Allowed

| Service area | What you can do |
|---|---|
| CI/CD (CodePipeline, CodeBuild, CodeDeploy, CodeCommit) | Start, stop, retry, and monitor pipelines and builds; manage notification rules; view repositories and deployment history. |
| Monitoring and logs (CloudWatch) | View CloudWatch metrics; create, view, and delete dashboards; read log groups and run log queries. |
| Databases (RDS) | View, restore, reboot, and manage RDS database instances; create and delete snapshots; modify parameter groups; view Performance Insights metrics. |
| Containers (ECS, ECR) | View ECS clusters, services, and tasks; list and describe ECR container images. Read-only. |
| Storage (S3) | Read and write to project asset buckets and CSV upload bucket; list all buckets. |
| Parameter Store (SSM) | Read and write public configuration and secret parameters; manage application deployment version parameters. |
| CloudFront | View CloudFront distributions; create cache invalidations; view WAF rules and ACM certificates. |
| Email (SES) | Full access to Simple Email Service. |
| DNS (Route 53) | Read-only access to hosted zones and domain names. |
| Notifications (Chatbot, SNS) | Manage AWS Chatbot Slack channel configurations; subscribe and unsubscribe to allowed SNS topics. |
| AWS Backup | Configure, manage, and execute backups across supported AWS services. |
| IAM (own account only) | Manage your own password, MFA devices, SSH public keys, Git credentials, and access keys. |

