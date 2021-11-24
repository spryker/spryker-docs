1. In the AWS management console, go to **Services** > **RDS**.
2. In the navigation pane, select **Databases**.

3. In the *Databases* pane, select the database of the desired environment.

   This opens the page of the database. To check for issues, do the following:

- In the *Summary* pane, check the *Status*. If the status is *Available*, the database is running.
- Switch to the **Monitoring** tab and, In the *CloudWatch* pane, check if there are any spikes on the graphs. Consider ten times more of a usual usage a spike. For example, if the usual CPU Utilization is 4%, consider any usage above 40% a spike.  

![rds-database-graphs](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/checking-rds-database-status.md/rds-database-graphs.png)
