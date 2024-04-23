---
title: Process documentation guidelines
description: Process documentation guidelines to improve communication and ensure smooth deployment of applications within cross-functional teams.
last_updated: April 23, 2024
template: concept-topic-template
related:
  - title: NFR guidelines
    link: docs/dg/dev/best-practices/project-nfr-templates/nfr-guidelines.html
  - title: Operatable feature guidelines
    link: docs/dg/dev/best-practices/project-nfr-templates/operatable-feature-guidelines.html
  - title: Monitorable process guidelines
    link: docs/dg/dev/best-practices/project-nfr-templates/monitorable-process-guidelines.html
---

{% info_block warningBox "Warning" %}

This document provides a set of guidelines for project development, intended as a flexible template and starting point for development teams striving for high-quality software. While these guidelines offer a default ruleset, it's imperative to tailor them to meet the specific requirements and commitments of each project. Defining and following these guidelines may be necessary to fulfill project Service Level Agreements (SLAs), with each guideline explicitly outlining the responsible team. Alignment with all involved teams is essential for ensuring a functioning concept.

{% endinfo_block %}

The process documentation guidelines are in place to enhance the communication between cross-teams over all processes and to ensure that they can operate and deploy their applications the best-possible way.

# Deployment guidelines
The following elements apply in the scope of deployment/rollback of each release candidate. Below you can also find an example how a deployment
standard service request could look like based on the guidelines.

## Environment variable assertion
In large-scale teams, effective communication and issue management can be challenging. As a result, it is possible that some environment variables
or their expected values may not be properly set in the production environment. To minimize the risk of critical errors, it is recommended to run
a final validation on the production environment to verify that the expected setup changes match the actual state. In order to understand the scope
of these changes, it is important to provide a list of the requested changes as part of the deployment standard service request for the Operations team.
This final validation step can help ensure that the production environment is correctly configured and minimize the risk of errors.

## Special manual steps
In case of needed un-regular, one-time, manual steps that are not automated on application side via our deployment / rollback pipeline processes, 
the uniformed instructions to these exclusive requests need to be handed over to our Operations Team in the deployment standard service request. 
This also includes any dependencies that may appear between the deployment elements (eg: 1 component needs to be released before another; or a 
special timing is necessary; etc.).

## Infrastructure changes
Changes to the infrastructure and application infrastructure are carefully evaluated, as mistakes in this area can cause critical problems. 
To reduce risks, the intention behind each impact on this field should be highlighted in handed over documentation (as part of the deployment 
standard service request) to enable comparison with the actual implementation.

## Expected behaviour
Some special cases (technical debts / functional debts / accepted risks / etc.) can lead to release specific, temporary, expected critical/warning 
state that should not be mitigated or handled by us. In order to decrease unnecessary fire-fighting on both sides, such scenarios need to be 
listed and explained via the deployment standard service request.

## Example for deployment standard service request

**Title**: Deployment of version 1.2.3 to production

**Description**:<br/>
This request is for the deployment of version 1.2.3 of the MyProject application to the production environment.

**Requested Changes**:

* Deployment of version 1.2.3 of the MyProject application
* Update of the following environment variables:
  * Expected environment variable name: `DATABASE_URL`<br/>
    Expected value: `postgresql://user:password@localhost:5432/mydatabase`
  * Expected environment variable name: `API_KEY`<br/>
    Expected value: `abcd1234`
  * Expected environment variable name: `DEBUG`<br/>
    Expected value: `false`
* Special manual steps:
  * **Step 1**: Run the database migration script before starting the application.
  * **Step 2**: Update the DNS records for the new application version.
* Infrastructure changes:
  * Add an additional application server to the load balancer pool.
  * Increase the size of the database server's disk.
*Expected behavior:
  * There may be a temporary increase in error log entries due to a known issue with the new version that will be fixed in the next release.

**Impact**:<br/>
This deployment will include updates to the application's database connection and API key, as well as changes to the infrastructure. There is a low risk of downtime during the deployment.

**Rollback Plan**:<br/>
In the event of an issue during the deployment, we will roll back to the previous version of the application and revert any infrastructure changes.

**Testing**:<br/>
This release has been thoroughly tested in the staging environment. A final validation on the production environment to verify that the expected setup changes match the actual state will be performed before the deployment.

**Approvals**:
* Lead developer: approved
* QA team: approved
* Operations team: approved

# Operational guidelines
The following elements apply in the scope of operating applications or for special failure scenarios that may as well occur during deployment/rollback.

Given the size and complexity of a large-sized application, which delivers many features with each release, unexpected errors can have multiple 
potential resolutions. To ensure that the most effective resolution is chosen with minimal disruption to the functionality of a successfully 
deployed release, it is recommended to maintain an operational guideline that are described below.

## Main workflows
To understand the main and critical workflows in the application, operational guidelines should outline the normal behavior of 
important features and workflows at the logical, component, and infrastructure levels.

This helps to form a general overview of the logic, components, and infrastructure, which is necessary for making informed operational 
decisions or building project-specific operational dashboards (e.g. to identify and highlight project-specific bottlenecks) or analyzing, 
answering, and resolving requests.

## Risks, early warnings & counter actions
Building a huge application is usually coupled with massive application level logging. In some cases, a critical system issue can be prevented 
(or minimized) with timely warning signals. By utilizing regular signals (logs and metrics) from identified business or technical bottlenecks 
or risks, the Operations Team can improve the application's stability. It is recommended to maintain a list of such signals and risks in the 
Operational guidelines, including recommended actions to take in order to deliver the best selected mitigation action (see 
[Operatable feature guidelines](docs/scos/dev/guidelines/operatable-feature-guidelines.html)).

## Silent undesired scenario
Although monitoring systems are used to detect unwanted states, it is possible that business functionality falls within acceptable metrics 
but is not desirable under certain conditions (e.g. the minimum daily browsing customer count is 10, but 11 customers during Black Friday 
is not considered normal). To monitor such cases, these scenarios need to be specified for the Operations Team.

## User guide
To minimize the impact of resolution efforts and optimize the process (e.g. resolving a small number of errors through the backoffice rather than rolling back
the entire release), it is important to provide the Operations Team with a user guide that includes the necessary business context.

## Entity size expectations
The cardinality of entities plays an important role in determining how an application will function in a production environment. To mitigate 
risks in this area, performance, scaling, manual tests, and reviews can be applied. However, the identified and estimated entity cardinality 
for the project can serve as a warning to pay extra attention to these entities in order to further reduce risks (e.g. a marketing campaign 
bringing 10,000 active users to the homepage at 17:08 on Friday).

## Remote service catalog
To properly handle and monitor the co-operation between local and remote services (aka 3rd party services), the expected and detailed communication 
protocol needs to be forward to the Operations Team, in addition with the known/expected service-out or major impacts that otherwise not directly 
accessible. This way, it will be possible ignore expected outages or compensate/build-workarounds over temporary problems or actively 
focus on known risks.

As an example, consider a payment provider connected to the project that needs to be monitored to ensure the availability of the 
external service. The following communication protocol is used:

* The local service sends an HTTP GET request to the remote service's API endpoint, along with any necessary headers and query parameters.
* The remote service responds with an HTTP status code and a JSON payload containing the requested data.
* The local service processes the data and displays it to the user or performs any necessary actions.

It's important to note that this is just one example of a communication protocol, and the specific details will vary depending 
on the specific requirements and capabilities of the local and remote services.
