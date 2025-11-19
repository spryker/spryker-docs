---
title: Set up data export to S3
description: How to set up Configurable Data Exporter to export your Spryker data in a secure way to S3 buckets for analytics use.
template: concept-topic-template
last_updated: July 10, 2025
---

Export your Spryker data tables to a secure, structured S3 bucket to enable different uses cases, such as analysis, integrations, or AI modeling.

Based on configurable frequency tables are automatically exported to a dedicated S3 bucket in `.parquet` format. These exports are ideal for connecting external analytics and reporting tools.

Access to the S3 bucket is secured and audited via AWS IAM policies. Every file access is logged for compliance and traceability.

## Request an export setup

Open a support ticket and include the following information:
- List of tables you want exported, comma-separated
- Desired frequency: every 6h, 12h, 1d, 2d, 1 week, or 1 month.
- Desired Start date and time, ISO 8601 format recommended

Our team will validate and set up the export for you.

## Limitations and recommendations

- Blacklisted tables and columns: Tables known to contain sensitive information, such as credentials or internal data in `spy_user`, `spy_customer` or `spy_api_key` tables, are automatically excluded to prevent security breaches.
- Only full export: The system exports full table snapshots each time. Consider frequency carefully to avoid unnecessary outbound traffic costs.
- Retention policy: Exported files are retained for seven days and then automatically deleted to optimize storage.
- We recommend reviewing your export requests to ensure no credentials or compliance-relevant fields are included.














































