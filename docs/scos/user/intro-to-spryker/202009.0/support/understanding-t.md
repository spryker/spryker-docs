---
title: Understanding ticket status
originalLink: https://documentation.spryker.com/v6/docs/understanding-ticket-status
redirect_from:
  - /v6/docs/understanding-ticket-status
  - /v6/docs/en/understanding-ticket-status
---

When you report an issue and we discover an underlying problem with Spryker, we create a Jira Bug Ticket. This ticket will then be handed over to our development department. Our colleagues will then evaluate how to best address the problem and resolve it. After the issue is resolved it is then released in our repositories.

## Status Descriptions
Since we began to communicate the status of bug tickets on our Support Portal for the reporters to see, we want to explain what the different status mean. Please note that normally a bug ticket will not go through all of these stages. You might see a ticket status not listed here in special cases, but the below will cover the majority of ticket cases very well.


| Status | Explanation |
| --- | --- |
| New | The case was reported and is being analyzed |
| In Progress | A strategy to resolve the issue was developed and a developer is working on resolving the issue |
| On Hold | Work on this issue was paused |
| In CR | A developer has found a resolution to the issue and the resolution is currently with another developer for review |
| Ready for Final Architecture Review | We currently evaluate whether the resolution fits overall architecture design |
| QA Done | Quality Assurance was done |
| Ready for Release | The resolution has passed all checks and is now waiting for release |
| Resolved | The issue was fully analyzed, a resolution was developed, checked and released. |

## Resolution Times
Most bug tickets will spend some time in the "New" status, before getting processed. As with any Software, we have a backlog of bug tickets that we are working on. Different to DevOps Tasks it is generally not possible for us to give you a satisfyingly accurate estimate on when a bug you have reported will be resolved. This is especially the case as long as the ticket is still in the earlier stages of processing. When you see your bug reaching "In CR" status we might be able to give you a rough estimate.

## How are Bug Tickets prioritized?
In general, bugs that impact many customers and have impact on business and security will receive the highest priority and regularly will be put on the top of the queue. But even if things are not clear-cut, we take the prioritization of bug tickets very seriously. We have a team comprised of members of various teams, such as Customer Success, Support, and Engineering that is meeting on a weekly basis to make sure prioritization evaluated regularly and from different perspectives.

