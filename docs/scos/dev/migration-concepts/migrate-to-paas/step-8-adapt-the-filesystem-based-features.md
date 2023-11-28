---
title: 'Step 8: Adapt the file system-based features'
description: 
template: howto-guide-template
---
# Spryker containers file system separation
Due to Spryker architecture all containers such as Yves, Gateway, Backoffice, Jenkins or Glue are isolated from each other and doesn't share any volume between them. Here is an overview of [Docker environment infrastructure](docs/scos/dev/the-docker-sdk/202307.0/docker-environment-infrastructure.html). 

# S3 bucket as workaround
In order to have some common file storage we offer usage of S3 buckets. Here is an example of [Data Import](docs/ca/dev/configure-data-import-from-an-s3-bucket.html#configure-a-csvreader-based-on-flysystem.html) feature based on S3 bucket as files storage. Also see [Flysystem feature](docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html) overview

Consider such architecture peculiarities while doing migration.
