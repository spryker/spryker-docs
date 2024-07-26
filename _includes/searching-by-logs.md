
1. In the AWS Management Console, go to **Services** > **CloudWatch** > **[Log groups](http://console.aws.amazon.com/cloudwatch/home?region=eu-central-1#logsV2:log-groups)**.

2. In the *Log groups* pane, filter log groups by entering a query in the search bar. For example, enter *staging*.

![filter log groups](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Working+with+logs/filter-log-groups.png)

3. Select the desired log group.

4. In the *Log streams* pane, select the log stream according the last event. The last event time should match the time when the issue occurred.

![select log stream](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Working+with+logs/select-log-stream.png)

5. In the *Log events* pane, filter events by entering a query in the search bar.
  When browsing audit logs, you might want to filter by tile, like `audit`, or by a user, like `sonia@spryker.com`.
