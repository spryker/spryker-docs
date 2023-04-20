---
title: Is S3 bucket integrated for all needed storages of files?
description: This document allows you to assess if S3 bucket is integrated for all needed storages of files.
template: howto-guide-template
---

# Is S3 bucket integrated for all needed storage of files?

{% info_block infoBox %}

Resources: Backend,  DevOps[optional]

{% endinfo_block %}

## Description

We need to make sure, the customer is not using any local storage or somewhere which could add more effort to migrate
data into the S3 bucket. It should have some cloud storage configured.

Possible cases to check: Locally stored data, files stored in other places (not S3 bucket).

Any third-party file storage is supposed to be migrated to S3 bucket usage. Files under the git repository are not
counting here. In case the project uses third-party storage e.g. FTP server, it’s usage has to be replaced with an S3 bucket.

We expect to receive this information as part of the [prerequisites](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/paas-assessment-prerequisites.html).

## Formula

Locally stored data -> move to S3 - 1-2 days. Everything else is to be estimated.
