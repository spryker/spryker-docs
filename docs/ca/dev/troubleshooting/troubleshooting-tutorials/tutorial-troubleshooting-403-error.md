---
title: Tutorial — Troubleshooting 403 error
description: Learn how to troubleshoot 403 error
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-403-error.html
---
A website functionality is not working properly, or there is a 403 status response code in the frontend logs.

## Checking errors via browser console

To check 403 errors via browser console, do the following:

{% include checking-errors-via-browser-console.md %} <!-- To edit, see /_includes/checking-errors-via-browser-console.md -->

## Checking the WAF rule that triggered the 403 error

If you found a 403 status response code in the frontend logs or in the browser console, it is most likely that it had been triggered by a [WAF(web application firewall)](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html) rule. Knowing the rule that triggered the error will help you to understand the source of the issue.  

To check the WAF rule that triggered the error, do the following:

1. In the AWS Management Console, go to **Services** > **S3**.
2. In the *Buckets* pane, select the WAF bucket of the desired environment.

![select-the-waf-logs-folder](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-403-error.md/select-the-waf-logs-folder.png)

3. According to when the error occurred, navigate to the respective folder by year > month > day > hour.

![navigate-by-date-and-time](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-403-error.md/navigate-by-date-and-time.png)

4. Based on the date and time in **Last modified** column, select the needed log file.

![select-the-waf-logs-file](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/troubleshooting/troubleshooting-tutorials/tutorial-troubleshooting-403-error.md/select-the-waf-logs-file.png)

5. To download the file, select **Download**.

6. Open the file in an editor and find the triggered WAF rule by the following parameters:
* `clientIp`
* `"action":"BLOCK"`
* `uri`
* `requestId`

An example of a blocking request from the WAF log file:


```
{
"timestamp":1639057983286,
"formatVersion":1,
"webaclId":"arn:aws:wafv2:eu-west-1:407138308974:regional/webacl/cloud-prod-waf/b76ce670-1ded-4ced-bd93-ec066aaef41e",
"terminatingRuleId":"managed_sqli_ruleset",
"terminatingRuleType":"MANAGED_RULE_GROUP",
"action":"BLOCK","terminatingRuleMatchDetails":[{"conditionType":"SQL_INJECTION","location":"URI","matchedData":["SELECT","1e1","FROM","test"]}],
"httpSourceName":"ALB","httpSourceId":"407138308974-app/cloud-prod/352755e24d058e25",
"ruleGroupList":[{"ruleGroupId":"AWS#AWSManagedRulesPHPRuleSet","terminatingRule":null,"nonTerminatingMatchingRules":[],"excludedRules":null},{"ruleGroupId":"AWS#AWSManagedRulesSQLiRuleSet","terminatingRule":{"ruleId":"SQLi_URIPATH","action":"BLOCK","ruleMatchDetails":null},"nonTerminatingMatchingRules":[],"excludedRules":null}],
"rateBasedRuleList":[],
"nonTerminatingMatchingRules":[],
"requestHeadersInserted":null,
"responseCodeSent":null,
"httpRequest":
{"clientIp":"85.90.*.*","country":"UA","headers":[{"name":"host","value":"SITE_URL"},{"name":"user-agent","value":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0"}],
"uri":"/SELECT-1e1FROM%60test%60",
"args":"","httpVersion":"HTTP/2.0",
"httpMethod":"GET","requestId":"1-61b20a3f-64070a154c5fd6b37cec5df7"},
"labels":[{"name":"awswaf:managed:aws:sql-database:SQLi_URIPath"}]
}

```
