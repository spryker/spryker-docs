---
title: Tutorial — Troubleshooting 403 error
description: Learn how to troubleshoot 403 error
template: troubleshooting-guide-template
---
Some site functionality is not working properly, or you have found in the frontend logs 403 status response code. 

## In case if site functionality is not working properly you can check for errors browser console:

{% include searching-for-error-via-browser-console.md %} <!-- To edit, see /_includes/searching-for-error-via-browser-console.md -->

## In case if you found 403 status response code in the frontend logs or in the browser console:

1. In the AWS management console, go to **Services** > **S3**.
2. In the **S3** pane, select the **waf-logs** bucket of the desired environment.
3. Choose desired time log folder (folder structure: year -> month -> day -> hour )
4. Select the log file by the **Last modified** column
5. Download the file and open it in your favorite editor. 
6. You can search by **IP address** / **"action":"BLOCK"** / **uri** / **requestId**

Example of blocking request from the log file


```
{
"timestamp":1639057983286,
"formatVersion":1,
"webaclId":"arn:aws:wafv2:eu-west-1:407138308974:regional/webacl/<ENVIRONMENT_NAME>-prod-waf/b76ce670-1ded-4ced-bd93-ec066aaef41e",
"terminatingRuleId":"managed_sqli_ruleset",
"terminatingRuleType":"MANAGED_RULE_GROUP",
"action":"BLOCK","terminatingRuleMatchDetails":[{"conditionType":"SQL_INJECTION","location":"URI","matchedData":["SELECT","1e1","FROM","test"]}],
"httpSourceName":"ALB","httpSourceId":"407138308974-app/<ENVIRONMENT_NAME>-prod/352755e24d058e25",
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

