---
title: Configurable Data Exporter
description: How to set up Configurable Data Exporter to export your Spryker data in a secure way to S3 buckets for analytics use.
template: concept-topic-template
last_updated: July 10, 2025
---

Export your Spryker data tables to a secure, structured S3 bucket for further analysis.

## How It Works
Spryker provides **automated, recurring exports** of your requested tables to a dedicated S3 bucket in ***.parquet*** format. These exports are ideal for connecting external analytics and reporting tools.

Access to the S3 bucket is secured and audited via AWS IAM policies. Every file access is logged for compliance and traceability.

## How To Request an Export
Please open a Support Ticket including:
1. List of tables you want exported (comma-separated)
2. Desired frequency: every 6h, 12h, 1d, 2d, 1 week, or 1 month.
3. Desired Start date/time (ISO 8601 format recommended)

Our team will validate and set up the export for you.

## Important Limitations & Recommendations
We are committed to your **security and compliance**. Please be aware of the following:

- Blacklisted Tables/Columns

    Tables known to contain sensitive information (e.g., credentials or internal-only data like spy_user or spy_customer) are automatically excluded to prevent security breaches.


- No Differential Exports

    The system currently **exports full table snapshots** each time. Consider frequency carefully to avoid unnecessary outbound traffic costs.

- Retention Policy

    Exported files are **retained for 7 days** and then automatically deleted to optimize storage.

💡 *We recommend reviewing your export request to ensure no credentials or compliance-relevant fields are included.*

### What’s Next?
We’re actively working to make this feature fully self-service via the Support Portal. Soon, you’ll be able to configure exports, frequencies, and target tables directly.

For questions or changes to your export, please contact support. We're here to help!