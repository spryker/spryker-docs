---
title: Prioritizing support cases
description: Learn how Spryker prioritizes support cases based on business impact and urgency to ensure timely assistance and effective solutions for critical issues.
last_updated: Sep 6, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/docs/scos/user/intro-to-spryker/support/understanding-ticket-status.html#how-are-bug-tickets-prioritized
originalArticleId: af927b8c-2fc0-46ab-a54d-4ae83d18ca89
redirect_from:
  - /docs/scos/user/intro-to-spryker/support/understanding-ticket-status.html#how-are-bug-tickets-prioritized
  - /docs/scos/user/intro-to-spryker/support/case-escalation.html
  - /docs/scos/user/intro-to-spryker/support/business-impact-and-case-priorities.html
---


While we are trying to solve cases on time, we need to triage and prioritize cases on a daily basis. When you create a case, you can indicate how urgent it's for you by choosing the correct case type and business impact and provide adequate info to help us assess how important your case is in relation to other cases that are in our backlog. At the end of the day, how high or low a case is prioritized by the support team is a function of the following:
* The business impact specified by the partner/customer and the explanation provided for it
* The subject matter
* The overall state and context of the project

{% info_block infoBox "" %}

Prioritization is only one aspect that influences how fast your case is solved. To learn important tips about what you can do to speed up resolution times, see [Getting the most out of Spryker Support](/docs/about/all/support/getting-the-most-out-of-spryker-support.html).

{% endinfo_block %}

## Business impact

By specifying the business impact, you can tell us directly how severely an issue affects your business. In the following, we would like to explain how to choose the appropriate business impact:

*P1—Urgent*: this is reserved for outages on production environments, security incidents, or issues that directly impact the normal flow of your business and for which you were not able to find an appropriate workaround.
Here are some examples of cases with P1 business impact:
* Your shop is no longer reachable.
* You suspect that there is a security flaw that is actively being exploited.
* It is no longer possible for customers to use your shop in an intended way, and this impacts your revenue.
* An issue blocks you from going live with your shop.

*P2—High*: the difference between high and urgent business impact is the factor of time and/or the severity of the issue. If you see an issue that affects the normal operation of your Spryker Shop in a significant way in the short term or see performance and quality degradation (but not outages) in central processes and functions of your shop, these issues must be assigned high business impact. Examples:
* You see very high server response rates that result in some customer churn.
* You find a bug that makes the use of a payment module impossible with the next planned update.

*P3—Medium*: this business impact should be chosen if the issue is affecting business in a constant, but less severe manner and does not directly result in loss of revenue. Examples:
* Performance of certain backend functions is lacklustre but working.
* You experience regular problems deploying to Spryker PaaS on non-prod environments

*P4—Low*: this is the correct impact to choose if the issue is only affecting processes and functions that are not or rarely used and if they are, they remain functional, albeit with degraded performance/quality. This impact can also be chosen if the problem is theoretical or only visual. Examples:
* You discover a bug that might, under certain conditions that are unlikely to occur, influence the performance of your website.
* You discover code that does not follow Spryker's usual code quality guidance.

## Priorities
Priority is an internal attribute that we set for cases after having evaluated them. There are 4 Priorities that we assign to cases:
* *Urgent*: urgent cases have the highest priority for us. Since there can only be a very limited number of urgent cases for us to be able to operate, we assign this priority only to the most severe cases (for example, Security Incidents or Infrastructure Outages).
* *High*: high priority cases are dealt with priority if there are no urgent cases in the backlog, or not all support representatives are currently busy working on urgent cases.
* *Medium*: most of the problem cases we receive are assigned `Medium` priority. They are dealt with if there are no urgent and high cases in the backlog or if enough free resources are available.
* *Low*: low priority cases are dealt with if there are no urgent and high priority cases in the Backlog or if a support representative thinks that the request can be dealt with very quickly or that they are working on a similar case already and it's beneficial to work on the related low priority case as well.

You can see what priority your case was assigned to in the case detail view on the Support and Partner Portal.

<!--

![image.png](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/image%28166%29.png)

-->

### Desired solution time
We recently gave our partners and customers the option to specify desired solution times on request, change request, and problem cases. Emergency cases do not have this field, because they are always dealt with as soon as possible.

### Case types
The case type you choose to create an issue also determines how high it's prioritized initially.
* *Request Cases* automatically receive low priority and are dealt with when there is time.
* *Problem Cases* let you specify business impact and desired solution time. We assign a priority to this case after evaluating the information provided, the business impact specified, and the desired solution time.
* *Emergency Cases* are reserved for severe outages with significant business impact. Emergency cases always receive the highest priority and can only be cases with business impact P1—Urgent.

{% info_block infoBox "Note" %}

Misusing Emergency Cases to try to expedite issues that do not have significant, immediate business impact, create significant work for us, and in your case result in getting deprioritized.

{% endinfo_block %}


## Increasing priority
If you feel that your issue is not receiving the attention it deserves, or if you feel you are getting stuck and you have already tried to resolve the situation with your support representative directly unsuccessfully, you can ask us to increase the priority of the task. You can do so by using the corresponding button on the Support and Partner Portal.

<!--
![image.png](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/image%28165%29.png)
-->

{% info_block infoBox "Info" %}

There is also a link in the signature of every mail sent by our support representatives that you can use to ask for an increase in priority.
Both options lead to a form where we ask you to explain why the priority of your case should be increased in relation to the other cases we currently work on. Make sure to provide relevant reasons for why we should increase the priority of your request.

{% endinfo_block %}
