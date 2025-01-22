---
title: Using the Support Portal
description: How to navigate Spryker's Support Portal to create, track, and manage support cases efficiently for seamless issue resolution
last_updated: Sep 28, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/how-to-use-the-support-portal
originalArticleId: b215730b-98ee-4661-8281-c45104e51044
redirect_from:
- /docs/scos/user/intro-to-spryker/support/how-to-use-the-support-portal.html
related:
  - title: How Spryker Support works
    link: docs/about/all/support/how-spryker-support-works.html
  - title: Getting the most out of Spryker Support
    link: docs/about/all/support/getting-the-most-out-of-spryker-support.html
---

This document describes how to use the support portal to create and manage your cases.

## Prerequisites

* You should have a customer account provisioned for you. If you don't, request one using this [form](https://www.surveymonkey.com/r/XYK5R26).
* Log in at the [support portal](https://support.spryker.com).

## Create new cases

To create new cases, click **Create a case** and select the needed case type. Alternatively, click on the case type on the landing page. When creating cases, use the recommendations in [Share secrets with the Spryker Support team](/docs/about/all/support/share-secrets-with-the-spryker-support-team.html).

Case Assistant guides you through the process of creating your requests by asking questions making sure they are routed properly.

The following are the top-level categories of cases and their description.

### Report a Problem or Incident

Problems can be reports suspecting a bug or issues with the hosting services. To speed up the resolution of such cases, make sure to follow [Getting the most out of Spryker support](/docs/about/all/support/getting-the-most-out-of-spryker-support.html) before you submit your request.

### Ask a Question

For any questions about Spryker. We want the knowledge about Spryker to be available to everyone. So, we'll provide you with a link to [Spryker Community](https://commercequest.space/) to ask your question there. If there are docs on the topic, we will provide a link to that.

### Request help with Alumio

Report problems with Alumio, request its provisioning for your environments, or schedule an appointment with Alumio Support.

### Infrastructure Change Request and Access Management

Request all currently supported standard changes, such as requesting changes to non-production environments sizing, IAM users and environment provisioning.

### Reporting a Problem with Spryker CI

Report an issue with Spryker CI (Buddy), such as errors or issues with its UI or pipeline runs.

### Announce a Go Live

Inform the Customer Success Team about being close to go live.

### Request Help with Spryker ACP

Report an issue with an Spryker ACP connector.

### Request Professional Services

This category offers a selection of professional services we are offering. For example, you may need it when implementing a complex custom feature.

### Request Help with Spryker Code Upgrader

Request help with the Upgrader. These requests are processed by our Upgrader experts.

### Announce High Traffic/Load

Let us know about events or time periods in which you expect a higher than usual load on your production enviornments. We can use this information to check auto scaling settings and evaluate if they need to be adjusted to meet your demands.

### Emergencies

Emergencies are reserved for problems that have significant business impact now or very soon. Emergency cases regularly start an [escalation](/docs/about/all/support/support-case-escalations.html). This category shouldn't be used to speed up requests or problem reports. Emergencies need to be associated with significant risk or business impact, like revenue, security, or go-lives.

### Info on Change Requests

{% info_block warningBox "Plan your change requests and use the right request form" %}

Because of verification processes and role-based access control mechanisms, change requests take some time to process. Expect 3-5 days of processing time.

Because of contractual reasons, only customers can request new environments or access to environment monitoring, not partners.

{% endinfo_block %}

## Manage cases

Clicking on **Our Cases** opens the list of cases you've opened. To take a look at the details of a particular case, click on the case number. On the page of a case, you can take a look at the communication history, view the status of the case and associated Jira ticket, or ask to reevaluate the assigned priority.

### Case receipts and notifications

When creating a case, or when there are meaningful updates to your case, like a status change or new comments, you will receive email notifications. Notifications are sent to the email address associated with the Support Portal account that was used to create a case; optionally notifications are also sent to the email address specified as "Additional Contact to notify" in the Case Assistant.

If you are managing multiple projects or have a high volume of cases and communication with us, knowing the structure of our notifications and receipts can help you prepare forwarding or labelling rules in your email client:


* Case confirmation emails are sent when you create a case or when its status is updated. Subject pattern:
```bash
Case Receipt - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} - Status: {STATUS}. {TRACKING ID}
```

* Change request confirmation emails are sent when you create a change request. Subject pattern:
```bash
Change Request Receipt - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} - Status: {STATUS}. {TRACKING ID}
```

* ETA update notification emails are sent when the ETA on your case is updated. Subject pattern:
```bash
Case ETA Update - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME}} - ETA: {ETA}. {TRACKING ID}
```

* Emergency case emails are sent when you declare an emergency or your emergency case's status is updated. Subject pattern:
```bash
Emergency {STATUS} - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} {TRACKING ID}
```

* Case comment notification emails are sent when there is a new comment in your case. Subject pattern:
```bash
Case Comment Notification - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} - Status: {STATUS} {Tracking ID}
```
