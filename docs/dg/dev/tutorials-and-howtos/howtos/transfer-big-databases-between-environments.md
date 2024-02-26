---
title: Transfer big databases between environments
description: Learn how you can relatively quickly import big data between your environments
last_updated: April 5, 2023
template: howto-guide-template
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/transfer-big-databases-between-environments.html

---

Suppose you have two testing environments, and you need to transfer the data from one environment to another to perform different tests with the same data. If you have little data, you can export it by running the `mysqldump` command locally. However, with large amounts of data, this method can be quite slow. To speed up the transfer, you can run the `mysqldump` command on the Jenkins instance and upload the dump file to AWS S3. With this approach, data stays on the same network with the databases, which significantly speeds up the transfer.

To transfer data from one environment to another, take the following steps.

## Prerequisites

Make sure the S3 bucket you are going to use for the transfer isn't public, and only the people that need to access the data have access to it.

## Export the data to an S3 bucket

1. Go to the Jenkins web interface of the environment you want to transfer the data from.

2. Go to **General**.

![mysqldump-command-in-jenkins](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-import-big-databases-between-environments/mysqldump-command-in-jenkins.png)

3. Add the following commands to the job:

```shell
# update apk and install aws cli
apk update
apk add aws-cli

# confirm aws cli version
which aws
aws --version

# export the database to an S3 bucket
mysqldump --skip-lock-tables --host=$SPRYKER_DB_HOST --user=$SPRYKER_DB_ROOT_USERNAME --password=$SPRYKER_DB_ROOT_PASSWORD $SPRYKER_DB_DATABASE | gzip | aws s3 cp - s3://{S3_BUCKET_NAME}/backup.$(date +"%Y-%m-%d__%H-%M-%S").sql.gz
```

4. Execute the job and wait for it to finish.

{% info_block infoBox "Clean up dump files" %}

Running the job multiple times creates multiple dump files in the S3 bucket. To avoid cluttering the bucket with backup files, periodically clean up the bucket.

{% endinfo_block %}


## Import the data into the database

1. Go to the Jenkins web interface of the environment you want to transfer the data to.

2. Go to **General**.

3. Add the following commands to the job:

```shell
# update apk and install aws cli
apk update
apk add aws-cli

# confirm aws cli version
which aws
aws --version

# import the data from the s3 bucket to the target database
aws s3 cp s3://{S3_BUCKET_NAME}/{DUMP_FILE_NAME}.sql.gz - | zcat | mysql --host=$SPRYKER_DB_HOST --user=$SPRYKER_DB_ROOT_USERNAME --password=$SPRYKER_DB_ROOT_PASSWORD $SPRYKER_DB_DATABASE
```

4. Execute the job and wait for it to finish.


Once the job finishes, the data should be in the target database.
