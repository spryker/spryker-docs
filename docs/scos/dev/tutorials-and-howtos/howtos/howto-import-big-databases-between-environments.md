---
title: "HowTo: Import big databases between environments"
description: Learn how you can relatively quickly import big data between your environments
last_updated: April 5, 2023
template: howto-guide-template
---

Suppose you have two testing environments, and you need to migrate a large amount of data from one environment to another to perform different tests with the same data. If you have little data, you can export by running the `mysqldump` command on the local machine. However, for large amounts of data, this method can be slow due to long waiting time and VPN connection issues. In this case, to import the data between the environments faster, you can run the `mysqldump` command on the Jenkins instance and upload the dump file to AWS S3. Here's how to do it:

1. Go to the Jenkins instance of the environment from where you want to import the data. 
2. Export the database as a compressed file and upload it to an S3 bucket:

```php
mysqldump --skip-lock-tables --host=$SPRYKER_DB_HOST --user=$SPRYKER_DB_ROOT_USERNAME --password=$SPRYKER_DB_ROOT_PASSWORD $SPRYKER_DB_DATABASE | gzip | aws s3 cp - s3://your_bucket_name/backup.$(date +"%Y-%m-%d__%H-%M-%S").sql.gz
```

![mysqldump-command-in-jenkins](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-import-big-databases-between-environments/mysqldump-command-in-jenkins.png)

3. Monitor the command execution until it finishes. Once it's finished, go to AWS and download the dump file to the necessary environment. Since the S3 bucket is shared, the dump file is accessible from any of your environments.
4. Import the compressed dump file from an S3 bucket:

```php
aws s3 cp s3://your_bucket_name/your_database_dump.sql.gz - | zcat | mysql --host=$SPRYKER_DB_HOST --user=$SPRYKER_DB_ROOT_USERNAME --password=$SPRYKER_DB_ROOT_PASSWORD $SPRYKER_DB_DATABASE
```

{% info_block infoBox "Clean up old dump files" %}

If you run the command from step 2 multiple times, this creates multiple dump files in the S3 bucket. To avoid cluttering the bucket with old backup files, periodically clean up the S3 bucket from old dump files.

{% endinfo_block %}

With this approach, you can efficiently import large databases between environments since you are downloading the dump file not to your local machine but to the machine in the same network as the database. Additionally, compressing the dump file speeds up the upload process, reducing the overall time it takes to import the data.