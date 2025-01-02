---
title: 'Migrate to cloud: Adapt the file system-based features'
description: Learn how to migrate to Spryker Cloud Commerce os and adapt the file system based features for your Spryker project.
template: howto-guide-template
redirect_from:
- /docs/scos/dev/migration-concepts/migrate-to-sccos/step-8-adapt-the-filesystem-based-features.html
last_updated: Dec 6, 2023

---

Because of the specifics of the Spryker architecture, all containers, such as Yves, Gateway, Backoffice, Jenkins, or Glue are isolated from each other and don't share any volume. For more details, refer to [Docker environment infrastructure](/docs/dg/dev/sdks/the-docker-sdk/docker-environment-infrastructure.html).

For a shared file storage solution, we recommend using S3 buckets. For an illustrative example, see the [Data Import](/docs/ca/dev/configure-data-import-from-an-s3-bucket.html) feature based on an S3 bucket for file storage.
For more details on the suggested file system, see [Flysystem feature](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html).

When migrating to SCCOS, make sure to consider these architectural peculiarities.

## Next step

[Implement Security and Performance guidelines](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-implement-security-and-performance-guidelines.html)
