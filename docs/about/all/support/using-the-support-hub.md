---
title: Using the Support Hub
description: How to navigate Spryker's Support Hub on the Spryker Portal to create, track, and manage support tickets efficiently for seamless issue resolution
last_updated: Sep 4, 2026
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/support/how-to-use-the-support-portal.html
- /docs/about/all/support/using-the-support-portal.html
---

This document describes how to use the Support Hub to create and manage your tickets.

## Prerequisites

- Log in at the [Spryker Portal](https://portal.spryker.com). If you do not have access to the Spryker Portal, request it using [this form](https://portal.spryker.com/request-access).
- Go to the Support Hub using the squares menu in the top right.

## Create a new ticket

To create a new ticket, click **Create a ticket** and follow the wizard.

When creating a ticket, use the recommendations in [Share secrets with the Spryker Support team](/docs/about/all/support/share-secrets-with-the-spryker-support-team.html).


The following are the top-level categories of tickets and their descriptions.

### Report a Problem or Incident

Problems can be reports of a suspected bug or issues with the hosting services. To speed up the resolution of such tickets,
make sure to follow [Getting the most out of Spryker support](/docs/about/all/support/getting-the-most-out-of-spryker-support.html) before you submit your request.

### Ask a Question

Use this category for any questions about Spryker. We want knowledge about Spryker to be available to everyone, so we will provide you with a
link to the [Spryker community Slack]({{ site.community_slack_invite }}) to ask your question there. If there are docs on the topic, we will provide a link to that.

### Infrastructure Change Request and Access Management

Request all currently supported standard changes, such as requesting changes to non-production environment sizing, IAM users and environment provisioning.

### Reporting a Problem with Spryker CI

Report an issue with Spryker CI (Buddy), such as errors or issues with its UI or pipeline runs.

### Announce a Go Live

Inform the Customer Success Team that you are close to going live.

### Request Professional Services

This category offers a selection of professional services. For example, you may need it when implementing a complex custom feature.

### Request Help with Spryker Code Upgrader

Request help with the Upgrader. These requests are processed by our Upgrader experts.

### Announce High Traffic/Load

Let us know about events or time periods in which you expect a higher than usual load on your production environments.
We can use this information to check the auto-scaling settings and evaluate if they need to be adjusted to meet your demands.

### Emergencies

Emergencies are reserved for problems that have significant business impact now or very soon. Emergency tickets regularly start an [escalation](/docs/about/all/support/support-case-escalations.html).
Do not use this category to speed up requests or problem reports. Emergencies need to be associated with significant risk or business impact, like revenue, security, or go-lives.

### Info on Change Requests

{% info_block warningBox "Plan your change requests and use the right request form" %}

Because of verification processes and role-based access control mechanisms, change requests take some time to process. Expect 3-5 days of processing time.

Because of contractual reasons, only customers can request new environments or access to environment monitoring, not partners.

{% endinfo_block %}

## Manage tickets

Click **View tickets** to open the list of tickets your organization has opened. To view the details of a particular ticket, click **Details**.
Here you can take a look at the communication history, view the status of the ticket and associated Jira ticket, and inspect the assigned priority.

### Ticket receipts and notifications

When creating a ticket, or when there are meaningful updates to your ticket, like a status change or new comments, you will receive email notifications.
Notifications are sent to the email address associated with the Spryker Portal account that was used to create a ticket.

If you are managing multiple projects or have a high volume of tickets and communication with us, knowing the structure of our notifications and receipts can help you prepare forwarding or labeling rules in your email client:


- Ticket confirmation emails are sent when you create a ticket or when its status is updated. Subject pattern:

```bash
Case Receipt - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} - Status: {STATUS}. {TRACKING ID}
```

- Change request confirmation emails are sent when you create a change request. Subject pattern:

```bash
Change Request Receipt - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} - Status: {STATUS}. {TRACKING ID}
```

- ETA update notification emails are sent when the ETA on your ticket is updated. Subject pattern:

```bash
Case ETA Update - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} - ETA: {ETA}. {TRACKING ID}
```

- Emergency ticket emails are sent when you declare an emergency or your emergency ticket's status is updated. Subject pattern:

```bash
Emergency {STATUS} - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} {TRACKING ID}
```

- Ticket comment notification emails are sent when there is a new comment in your ticket. Subject pattern:

```bash
Case Comment Notification - Case ID: {CASE NUMBER} - Customer: {CUSTOMER NAME} - Status: {STATUS} {TRACKING ID}
```
