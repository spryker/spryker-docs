---
title: 'Step 8: Adapt the file system-based features'
description: To migrate to PaaS, one of the steps, is restoring Elasticsearch and Redis.
template: howto-guide-template
---

Due to the specifics of the Spryker architecture, all containers, such as Yves, Gateway, Backoffice, Jenkins, or Glue are isolated from each other and don't share any volume. For more details, refer to [Docker environment infrastructure](/docs/scos/dev/the-docker-sdk/{{site.version}}/docker-environment-infrastructure.html). 

For a shared file storage solution, we recommend using S3 buckets. For an illustrative example, see the [Data Import](/docs/ca/dev/configure-data-import-from-an-s3-bucket.html#configure-a-csvreader-based-on-flysystem.html) feature based on an S3 bucket for file storage. 
For more details on the suggested file system, see [Flysystem feature](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html).

When migrating to PaaS, make sure to consider these architectural peculiarities.

## Next step

[Implement Security and Performance guidelines](/docs/scos/dev/migration-concepts/migrate-to-paas/step-9-implement-security-and-performance-guidelines.html)
