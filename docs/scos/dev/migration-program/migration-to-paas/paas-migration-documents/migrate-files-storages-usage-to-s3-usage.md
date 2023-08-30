---
title: Migrate files storages usage to S3 usage
description: This document describes how to migrate files storages usage to S3 usage.
template: howto-guide-template
---


## Resources for migration
* Backend
* Optional: DevOps


Spryker Cloud has a kinda standard for having file storage on an AWS S3 bucket. Therefore it’s recommended to rework
all existing solutions which require certain file storage to use an S3 bucket.

We already have some ready solutions:
* [Data import using an S3 bucket as storage for CSV import files](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-data-import-from-an-s3-bucket.html#prerequisites).
* [Data export to S3 bucket into JSON files](/docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/analytics/installing-and-integrating-minubo.html).
* [Flysystem module which works with S3 storage](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html#plugin-example).
