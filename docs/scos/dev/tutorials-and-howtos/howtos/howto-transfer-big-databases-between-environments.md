---
title: Transfer big databases between environments
description: Learn how you can relatively quickly import big data between your environments
last_updated: April 5, 2023
template: howto-guide-template
---

{% info_block warningBox  "Currently not functional" %}
The steps described in this document may not work because the "aws" module is not currently automatically installed in every Jenkins instance. Connect to your RDS via the provided VPN and download the contents via an SQL client. We will update this document once we find a solution.
{% endinfo_block %}

Suppose you have two testing environments, and you need to transfer the data from one environment to another to perform different tests with the same data. If you have little data, you can export it by running the `mysqldump` command locally. However, with large amounts of data, this method can be quite slow. To speed up the transfer, you can run the `mysqldump` command on the Jenkins instance and upload the dump file to AWS S3. With this approach, data stays on the same network with the databases, which significantly speeds up the transfer.

To transfer data from one environment to another, take the following steps.

## Prerequisites

Make sure the S3 bucket you are going to use for the transfer isn't public, and only the people that need to access the data have access to it.


## Install AWS CLI

1. Update APK:
```shell
apk update
```

2. Install AWS CLI:
```shell
apk add aws-cli
```

This installs AWS CLI. To verify the installation, check the module's version by running `which aws` or `aws --version`.

## Export and import the data

1. Go to the Jenkins web interface of the environment you want to transfer the data from.

2. Go to **General**.

![mysqldump-command-in-jenkins](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-import-big-databases-between-environments/mysqldump-command-in-jenkins.png)

3. Export the database as a compressed file and upload it to an S3 bucket by executing the following command:

```shell
mysqldump --skip-lock-tables --host=$SPRYKER_DB_HOST --user=$SPRYKER_DB_ROOT_USERNAME --password=$SPRYKER_DB_ROOT_PASSWORD $SPRYKER_DB_DATABASE | gzip | aws s3 cp - s3://{S3_BUCKET_NAME}/backup.$(date +"%Y-%m-%d__%H-%M-%S").sql.gz
```

Wait for the command to finish.

{% info_block infoBox "Clean up dump files" %}

If you run the command multiple times, this creates multiple dump files in the S3 bucket. To avoid cluttering the bucket with backup files, periodically clean up the bucket.

{% endinfo_block %}

4. Go to AWS and download the dump file to the needed environment.
    Since the S3 bucket is shared, the dump file is accessible from any of your environments.
5. Import the compressed dump file from an S3 bucket:

```shell
aws s3 cp s3://{S3_BUCKET_NAME}/{DUMP_FILE_NAME}.sql.gz - | zcat | mysql --host=$SPRYKER_DB_HOST --user=$SPRYKER_DB_ROOT_USERNAME --password=$SPRYKER_DB_ROOT_PASSWORD $SPRYKER_DB_DATABASE
```
