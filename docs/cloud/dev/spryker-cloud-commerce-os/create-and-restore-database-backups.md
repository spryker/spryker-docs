---
title: Create and restore database backups
description: Learn how to manage database backups in Spryker Cloud Commerce OS.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/creating-and-restoring-database-backups
originalArticleId: e2174fdf-a9f6-4fd9-80ee-4d9e46f6d72d
redirect_from:
  - /docs/creating-and-restoring-database-backups
  - /docs/en/creating-and-restoring-database-backups
  - /docs/cloud/dev/spryker-cloud-commerce-os/creating-and-restoring-database-backups.html
---

This doc describes how to create and restore database backups in Spryker Cloud Commerce OS (SCCOS).

As all the data is stored in relational databases, you only need database(DB) backups. DB backups are managed via [Amazon Relational Database Service (Amazon RDS)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html).

The following DB backups are created automatically:

* Transaction log backups via [AWS Point-in-time recovery](https://aws.amazon.com/rds/faqs/#Automatic_Backups_and_Database_Snapshots).

* Monthly snapshots with a default retention of 90 days.

* Hourly snapshots by SCCOS tools with a default retention of 35 days.


Also, you can create DB snapshots manually.

## Create a DB snapshot

1.  In the AWS Management Console, go to **Services** > [**RDS**](https://console.aws.amazon.com/rds/).

2.  In the navigation pane, select **Databases**.

3.  In the _Databases_ pane, select the DB you want to take a snapshot of.

4.  Select **Actions&nbsp;<span aria-label="and then">></span> Take snapshot**.

    This opens the _Take DB snapshot_ page.

5.  Enter a **Snapshot name**.  

{% info_block infoBox "Meaningful Snapshot name" %}

Ensure that you enter a meaningful **Snapshot name**. It is used as an identifier when restoring a DB.

{% endinfo_block %}

6. Select **Take snapshot**.

This opens the _Snapshots_ page. The created snapshot is displayed in the _Manual snapshots_ pane.

## Restore a database


To restore a DB from a snapshot, follow the steps below.

{% info_block warningBox "Expected downtime" %}

During database restoration, your application is not accessible. For production environments, we recommend setting up a maintenance page. To do that, provide your custom HTML page or request to set up a generic one via [support](https://spryker.force.com/support/s/create-request-case).

{% endinfo_block %}


### Rename a DB

1. In the AWS Management Console, go to **Services** > [**RDS**](https://console.aws.amazon.com/rds/).

2. In the navigation pane, select **Databases**.

3. In the _Databases_ pane, select the DB you want to rename.

4. Select **Modify**.  
This takes you to the _Modify DB instance: {DB name}_ page.

5. In the _Settings_ pane, update the **DB instance identifier**.

6. Scroll down the page and select **Continue**.

7. In the _Scheduling of modifications_ pane:

* To apply the changes immediately, select **Immediately**. This can cause an outage in some cases. For more information, see  [Modifying an Amazon RDS DB Instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html).

* To apply the changes during the next scheduled maintenance window of the DB, select **During the next scheduled maintenance window**. In this case, you have to wait for the database to be renamed before you can [restore it from a snapshot](#restore-a-db-from-a-snapshot).

8. Review your changes and select **Modify DB Instance**_._  
This takes you to the _Databases_ page with the success message displayed.  

{% info_block infoBox %}

Even if you selected to apply the change immediately, it may take a few minutes to update the DB name.

{% endinfo_block %}


### Restore a DB from a snapshot

1. In the AWS Management Console, go to **Services** > [**RDS**](https://console.aws.amazon.com/rds/).

2. In the navigation pane, select **Snapshots**.

3. Select the snapshot you want to restore.

4. Select **Actions** > **Restore snapshot**.  
This takes you to the _Restore snapshot_ page.

5. Enter the settings of the original DB.

{% info_block warningBox "DB settings" %}

Ensure that:

*   **DB instance identifier** corresponds to the name of the original DB _before_ you renamed it.

*   The settings exactly replicate those of the original DB. Otherwise, the DB may fail to restore correctly or work with the application.

{% endinfo_block %}


6. Select **Restore DB Instance**.  
This takes you to the _Databases_ page with the success message displayed. The entry of the restored DB is displayed in the list.

{% info_block infoBox %}

It may take a few minutes for the DB to restore.

{% endinfo_block %}


### Re-sync data from the restored database to ElasticSearch and Redis

1.  Connect to OpenVPN.

2.  Open Jenkins web interface at `http://jenkins.{environment_hostname}`.

3.  Select **New Item**.

4.  For **Enter an item name**, enter a job name.

5.  Select **Freestyle project**.

6.  Select **OK**.

7.  In the _Build_ section, select **Add build step** > **Execute shell**.

8.  In the _Execute shell_ pane, for **Command**, enter the script with the `vendor/bin/console sync:data` command. You can add the command to the script from another Jenkins job in your environment.

9.  Select **Save**.  



![Set up a jenkins job](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Creating+and+restoring+database+backups/set-up-a-jenkins-job.png)

10.  On the page that opens, select **Build Now**.  
    Give it a few minutes to execute the job. You can track the execution in the _Build History_ pane.  


You’ve re-synced data from a restored database to ElasticSearch and Redis.

## Restore an application


Application restoration is part of a regular deployment workflow. See [Rolling back an application](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html#roll-back-an-application) to learn about restoring a previous version of an application.

## Delete recovery points

To delete recovery steps via Terraform Cloud, follow the steps in the sections below.

### Install AWS CLI and configure the session

1. [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

2. Open a terminal.

3. Export AWS credentials:
```shell
export AWS_ACCESS_KEY_ID="{{YOUR_ACCESS_ID}}"
export AWS_SECRET_ACCESS_KEY="{{YOUR_SECRET_ACCESS_KEY}}"
export AWS_SESSION_TOKEN="{{YOUR_SESSION_TOKEN}}"
```

4. Set the region you want to remove delete recovery points in:
```shell
aws configure set region {REGION_NAME}
```

### Clone Terraform Cloud and delete recovery points


1. Clone Terraform Cloud:
```shell
git clone git@github.com:spryker/tfcloud.git
```

2. Delete recovery points:
```shell
/tfcloud/tools/scripts./backup_vault_clear.sh {ENVIRONMENT_NAME}_rds_backup
```



## Next step

* [Deploying in a staging environment](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html)
