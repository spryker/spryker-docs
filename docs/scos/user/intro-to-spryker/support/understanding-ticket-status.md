---
title: Understanding ticket status
last_updated: Oct 8, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/understanding-ticket-status
originalArticleId: ca538168-f995-48b4-8caf-d295647d2701
redirect_from:
  - /2021080/docs/understanding-ticket-status
  - /2021080/docs/en/understanding-ticket-status
  - /docs/understanding-ticket-status
  - /docs/en/understanding-ticket-status
  - /v6/docs/understanding-ticket-status
  - /v6/docs/en/understanding-ticket-status
---

When you report an issue, and we discover an underlying problem with Spryker, we create a Jira Bug Ticket. This ticket will then be handed over to our development department. Our colleagues will then evaluate how to address the problem best and resolve it. After the issue is resolved, it is then released to our repositories.

## Status descriptions
Since we began to communicate the status of bug tickets on our Support Portal for the reporters to see, we want to explain what the different statuses mean. On a high level, we distinguish between Bug Tickets and Cloud Tickets.

### Bug tickets
Please note that usually, a bug ticket will not go through all of these stages. You might see a ticket status not listed here in special cases, but the below will cover the majority of ticket cases very well.

| STATUS | EXPLANATION |
| --- | --- |
| New | The case was reported and is being analyzed |
| In Progress | A strategy to resolve the issue was developed, and a developer is working on resolving the issue |
| On Hold | Work on this issue was paused |
| In CR | A developer has found a resolution to the issue, and the resolution is currently with another developer for review |
| Ready for Final Architecture Review | We currently evaluate whether the resolution fits overall architecture design |
| QA Done | Quality Assurance was done |
| Ready for Release | The resolution has passed all checks and is now waiting for release |
| Resolved | The issue was fully analyzed, a resolution was developed, checked, and released. |

### Cloud tickets
Our DevOps team usually uses the following status to indicate progress on tickets assigned to them.

| STATUS | EXPLANATION |
| --- | --- |
|Requirements Clarification|The DevOps team is currently gathering info on the task at hand to determine what team member should work on this ticket|
|Selected for Development|The task was assigned to an engineer|
|In Progress|An engineer has started working on the task|
|On Hold|The task is currently not being worked on actively since there is either information missing or there is a dependency|
|Blocked|Working on this issue is currently not possible since there is a dependency that needs to be resolved first|
|Done|The ticket was resolved|

## Resolution times
Most bug tickets will spend some time in the "New" status before getting processed. As with any Software, we have a backlog of bug tickets that we are working on. Unlike the DevOps tasks, it is generally not possible for us to give you a satisfyingly accurate estimate on when a bug you have reported will be resolved. This is especially the case as long as the ticket is still in the earlier stages of processing. When you see your bug reaching "In CR" status, we might be able to give you a rough estimate.

For Cloud tickets, we are currently starting a Beta Test where we communicate ETAs to our partners and customers. These ETAs are not binding delivery dates but should serve as a rough indicator of when we think we will be done with a particular task. These ETAs will be communicated via a status notification (email) and will be listed in the case detail view on the support portals.

## How are bug tickets prioritized?
In general, bugs that impact many customers and have an impact on business and security will receive the highest priority and regularly will be put on the top of the queue. But even if things are not clear-cut, we take the prioritization of bug tickets very seriously. We have a team comprised of members of various teams, such as Customer Success, Support, and Engineering, meeting weekly to make sure prioritization is evaluated regularly and from different perspectives.
