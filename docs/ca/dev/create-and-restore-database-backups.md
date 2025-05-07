---
title: Create and restore database backups
description: Learn to create and restore database backups in Spryker Cloud, with steps for manual snapshots, automated backups, and data restoration for production environments.
last_updated: July 28, 2022
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/creating-and-restoring-database-backups
originalArticleId: e2174fdf-a9f6-4fd9-80ee-4d9e46f6d72d
redirect_from:
  - /docs/creating-and-restoring-database-backups
  - /docs/en/creating-and-restoring-database-backups
  - /docs/cloud/dev/spryker-cloud-commerce-os/creating-and-restoring-database-backups.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/create-and-restore-database-backups.html
---

This doc describes how to create and restore database (DB) backups in Spryker Cloud Commerce OS (SCCOS).

As all the data is stored in relational databases, you don't need to back up the codebase. DB backups are managed via [Amazon Relational Database Service (Amazon RDS)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html).

The following DB backups are created automatically:

* Transaction log backups via [AWS Point-in-time recovery](https://aws.amazon.com/rds/faqs/#Automatic_Backups_and_Database_Snapshots).

* Monthly snapshots with a default retention of 90 days.

* Hourly snapshots by SCCOS tools with a default retention of 35 days.


Also, you can create DB snapshots manually.

## Create a DB snapshot

1. In the AWS Management Console, go to **Services** > [**RDS**](https://console.aws.amazon.com/rds/).

2. In the navigation pane, click **Databases**.

3. In the **Databases** pane, select the DB you want to take a snapshot of.

4. Click**Actions&nbsp;<span aria-label="and then">></span> Take snapshot**.

    This opens the **Take DB snapshot** page.

5. Enter a **Snapshot name**.
    Make sure to enter a meaningful **Snapshot name**. It is used as an identifier when restoring the DB.

6. Click **Take snapshot**.

This opens the **Snapshots** page. The created snapshot is displayed in the **Manual snapshots** pane.

## Restore a database


The following sections describe how to restore databases from snapshots and backups. You will need to rename your original database and give its name to the restored one.

{% info_block warningBox "Expected downtime" %}

During database restoration, your application is not accessible. For production environments, we recommend setting up a maintenance page. To do that, provide your custom HTML page or request to set up a generic one via [support](https://spryker.force.com/support/s/create-request-case).

{% endinfo_block %}


### Rename a DB

1. In the AWS Management Console, go to **Services** > [**RDS**](https://console.aws.amazon.com/rds/).

2. In the navigation pane, click **Databases**.

3. In the **Databases** pane, select the DB you want to restore.

4. Click **Modify**.  
    This opens the **Modify DB instance: {DB name}** page.

5. In the **Settings** pane, copy and save the **DB instance identifier**.  
    You will need to give this name to a restored database later.

6. Scroll down the page and click **Continue**.

7. In the **Scheduling of modifications** pane, select when you want to apply the changes:

* To apply the changes immediately, select **Immediately**. This can cause an outage in some cases. For more information, see  [Modifying an Amazon RDS DB Instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html).

* To apply the changes during the next scheduled maintenance window of the DB, select **During the next scheduled maintenance window**. In this case, you have to wait for the DB to be renamed before you can restore it.

8. Review your changes and click **Modify DB Instance**.
    This takes you to the **Databases** page with the success message displayed.  

{% info_block infoBox %}

Even if you selected to apply the change immediately, it may take a few minutes to update the DB name.

{% endinfo_block %}

9. Restore the DB in one of the following ways:

* [Restore the DB from a snapshot](#restore-the-db-from-a-snapshot)
* [Restore the DB from an AWS backup](#restore-the-db-from-an-aws-backup)


### Restore the DB from a snapshot

1. In the AWS Management Console, go to **Services** > [**RDS**](https://console.aws.amazon.com/rds/).

2. In the navigation pane, click **Snapshots**.

3. Select the snapshot you want to restore.

4. Select **Actions** > **Restore snapshot**.  
This takes you to the **Restore snapshot** page.

5. Enter the settings of the original DB.

{% info_block warningBox "DB settings" %}

Make sure to configure the following:

* **DB instance identifier** corresponds to the name of the original DB _before_ you renamed it.

* The settings exactly replicate those of the original DB. Otherwise, the DB may fail to restore correctly or work with the application.

{% endinfo_block %}


6. Click **Restore DB Instance**.  
    This opens the **Databases** page with the success message displayed. The restored DB is displayed in the list.

{% info_block infoBox %}

It may take a few minutes for the DB to restore.

{% endinfo_block %}


### Restore the DB from an AWS Backup

1. In the AWS Management Console, go to **Services** > [**AWS Backup**](https://console.aws.amazon.com/backup).

2. In the navigation pane, click **Backup vaults**.

3. Select the vault of the environment you want to restore the backup for. For example, for a `production` environment, select the `production_rds_backup` vault.

4. In the **Recovery points** pane, select the `recovery point ID` of a continuous backup you want to restore.
    The name should start with `continuous:`.

5. On the page of the recovery point, click **Restore**.
    This opens the **Restore backup** page.

6. On the **Restore to point in time** pane, do one of the following:
    * To restore the latest backup, select the displayed date.
    * To restore from a specific point in time, do the following:
        1. Select **Specify date and time**.
            This adds date and time fields.
        2. Select date and time between **Latest restorable time** and **Earliest restorable time**.

7. In **Instance specifications** pane, select the **DB instance class** of the original database.

8. On the **Settings** pane, enter the **DB Instance Identifier** of the original database.

9. In **Network and security** tab, select the **Virtual Private Cloud (VPC)** the original database belongs to.

10. Select a **Subnet group** of the original database.

11. Select a **Public accessibility**.

12. In the **Database options** pane, enter the **Database port** of the original database.

13. Select a **DB parameter group** of the original database.

14. In the **Log exports** pane, select the log types to publish to Amazon CloudWatch Logs.

15. In **Maintenance** pane, select **Auto minor version upgrade**.

16. In **Restore role** pane, select an IAM role to restore the backup with in one of the following ways:
    * Select **Default role**.
    * Select a specific role:
        1. Select **Choose an IAM role**.
        2. Select a **Role name**.

17. Click **Restore backup**.
This opens the **Jobs** page where you can see the progress of restoration. Wait for the process to finish.

18. In the AWS Management Console, go to **Services** > [**RDS**](https://console.aws.amazon.com/rds/).

19. In the navigation pane, click **Databases**.

20. On the **Databases** page, select the restored DB.

21. On the page of the DB, click **Modify**.
    This opens the **Modify DB instance: {DB name}** page.

22. In **Connectivity** pane, select the **Security group** of the original database.

23. Click **Continue**.

24. In the **Scheduling of modifications** pane, for **When to apply modifications**, select **Apply immediately**.

25. Click **Modify DB instance**.

Restored DB is created and modified.


### Re-sync data from the restored database to Elasticsearch and Redis

1. Connect to OpenVPN.

2. Open Jenkins web interface at `http://jenkins.{environment_hostname}`.

3. Select **New Item**.

4. For **Enter an item name**, enter a job name.

5. Select **Freestyle project**.

6. Select **OK**.

7. In the **Build** section, select **Add build step** > **Execute shell**.

8. In the **Execute shell** pane, for **Command**, enter the script with the `vendor/bin/console sync:data` command. You can add the command to the script from another Jenkins job in your environment.

9. Select **Save**.  


![Set up a jenkins job](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Creating+and+restoring+database+backups/set-up-a-jenkins-job.png)

10. On the page that opens, select **Build Now**.  
    Give it a few minutes to execute the job. You can track the execution in the **Build History** pane.  


You've restored the database and connected it ot your application.

## Restore an application


Application restoration is part of a regular deployment workflow. See [Rolling back an application](/docs/ca/dev/deploy-in-a-staging-environment.html#roll-back-an-application) to learn about restoring a previous version of an application.


## Next step

* [Deploying in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html)
