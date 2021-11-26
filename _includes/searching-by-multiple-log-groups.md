1. In the AWS Management Console, go to **Services** > **CloudWatch**.
2. In the navigation pane, select **Logs** > **Logs Insights**.
3. Select the desired log groups.

![log-insigts-log-groups](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/searching-by-multiple-log-groups.md/log-insigts-log-groups.png)

4. Select the desired time period.
5. Insert a search query into the query field. Use the following examples as a reference.
6. Select **Run query**.
7. Check the logs that appear in the pane below.

Example 1: search for 500 errors during the last 6 hours.
![log-insights-query-example-1](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/searching-by-multiple-log-groups.md/log-insights-query-example-1.png)

Example 2: search for build errors, excluding `rds_backup`, during the last 3 hours.
![log-insights-query-example-2](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/_includes/searching-by-multiple-log-groups.md/log-insights-query-example-2.png)

To learn more about the syntax of the queries, see [CloudWatch Logs Insights query syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax-regex). For more examples of queries, see [Sample queries - Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax-examples.html).
