---
title: Support ticket statuses
description: Discover Spryker's support ticket statuses to track your issues effectively, from reporting through resolution, with clear updates at each stage.
last_updated: Oct 8, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/understanding-ticket-status
originalArticleId: ca538168-f995-48b4-8caf-d295647d2701
redirect_from:
- /docs/scos/user/intro-to-spryker/support/understanding-ticket-status.html
---

When you report an issue, and we discover an underlying problem with Spryker, we create a Jira Bug Ticket. Then, this ticket is handed over to our development department, and our colleagues evaluate how to address the problem best and resolve it. After the issue is resolved, it's then released to our repositories.

## Status descriptions

Since we began to communicate the status of bug tickets on our Support Portal for the reporters to see, we want to explain what the different statuses mean. On a high level, we distinguish between Bug Tickets and Cloud Tickets.

### Bug tickets

{% info_block infoBox "Info" %}

Usually, a bug ticket does not go through all of these stages. You might see a ticket status not listed here in special cases, but the following covers the majority of ticket cases.

{% endinfo_block %}

| STATUS | EXPLANATION |
| --- | --- |
| New | The case was reported and is being analyzed |
| In Progress | A strategy to resolve the issue was developed, and a developer is working on resolving the issue. |
| On Hold | Work on this issue was paused. |
| In CR | A developer has found a resolution to the issue, and the resolution is currently with another developer for review. |
| Ready for Final Architecture Review | We currently evaluate whether the resolution fits overall architecture design. |
| QA Done | Quality Assurance was done. |
| Ready for Release | The resolution has passed all checks and is now waiting for release. |
| Resolved | The issue was fully analyzed, a resolution was developed, checked, and released. |

### Cloud tickets

Our DevOps team usually uses the following status to indicate progress on tickets assigned to them.

| STATUS | EXPLANATION |
| --- | --- |
|Requirements Clarification|The DevOps team is currently gathering info on the task at hand to determine what team member should work on this ticket.|
|Selected for Development|The task was assigned to an engineer.|
|In Progress|An engineer has started working on the task.|
|On Hold|The task is currently not being worked on actively since there is either information missing or there is a dependency.|
|Blocked|Working on this issue is currently not possible since there is a dependency that needs to be resolved first.|
|Done|The ticket was resolved.|

## Resolution times

Before getting processed, most bug tickets spend some time in the `New` status. As with any Software, we have a backlog of bug tickets that we are working on. Unlike the DevOps tasks, Generally, we can't give you a satisfyingly accurate estimate on when a bug you have reported will be resolved. This is especially the case as long as the ticket is still in the earlier stages of processing. When you see your bug reaching the `In CR` status, we might be able to give you a rough estimate.

For Cloud tickets, we are currently starting a Beta Test where we communicate ETAs to our partners and customers. These ETAs are not binding delivery dates but should serve as a rough indicator of when we can finish a particular task. These ETAs are communicated by a status notification (email) and are listed in the case detail view on the support portals.

## Prioritizing bug tickets
In general, bugs that impact many customers, business, and security receive the highest priority and are regularly put on the top of the queue. However, even if things are not clear-cut, we take the prioritization of bug tickets very seriously. We have a team comprised of members of various teams, such as Customer Success, Support, and Engineering, meeting weekly to make sure prioritization is evaluated regularly and from different perspectives.
