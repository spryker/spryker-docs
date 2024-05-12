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

This document provides guideline templates for development teams striving for high-quality software. These templates are flexible and serve as a starting point, so make sure to adjust them to your project's requirements. Defining and following these guidelines may be necessary to fulfill project Service Level Agreements (SLAs), with each guideline explicitly outlining the responsible team. Alignment with all involved teams is essential for ensuring a functioning concept.

The process documentation guidelines enhance the communication between teams over all processes and ensure that they can operate and deploy their applications the best possible way.

## Deployment guidelines

The following guidelines apply to the deployment of each release candidate.

### Environment variable assertion

In large teams, effective communication and issue management can be challenging. As a result, some environment variables or their expected values may not be properly set in the production environment. To minimize the risk of critical errors, we recommend running a final validation on the production environment to verify that the expected setup changes match the actual state. To run a proper validation with the understanding of the scope of these changes, make sure to provide a list of the requested changes as part of the deployment standard service request for the operations team. This final validation step ensures that the production environment is correctly configured and minimizes the risk of errors.

### Special manual steps

If there are manual one-time steps that aren't automated on the application side via the deployment pipeline processes, the uniformed instructions to these exclusive requests need to be handed over to the operations team in the deployment standard service request.

This also includes any dependencies that may appear between the deployment elements. For example, one component needs to be released before another; or a special timing is needed.

### Infrastructure changes

Changes to the platform infrastructure and application infrastructure are carefully evaluated because mistakes in this area can cause critical problems. To reduce risks, when submitting a deployment standard service request, make sure to carefully document the intention behind each impact on infrastructure.

### Expected behavior
In special cases, like technical debts, functional debts, or accepted risks, a release can lead to release specific, temporary, expected critical or warning states that doesn't have to be handled or mitigated by the operations team. To decrease unnecessary fire-fighting on both sides, list and explain these scenarios when submitting a deployment standard service request.

### Example for deployment standard service request

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

## Operational guidelines

The following guidelines apply to operating applications or for special failure scenarios that may as well occur during deployment or rollback.

Given the size and complexity of a large applications, which delivers many features with each release, unexpected errors can have multiple potential resolutions. To ensure that the most effective resolution is chosen with minimal disruption to the functionality of a successfully deployed release, implement the following operation guidelines.

### Main workflows
To understand the main and critical workflows in the application, operational guidelines should outline the normal behavior of
important features and workflows at the logical, component, and infrastructure levels.

This forms a general overview of the logic, components, and infrastructure. This overview is necessary for making informed operational decisions and building project-specific operational dashboards, for example—to to identify and highlight project-specific bottlenecks. Also, it's needed for analyzing, answering, and resolving requests.

### Risks, early warnings, and counter actions
Building a large application is usually coupled with massive application-level logging. In some cases, a critical system issue can be prevented or minimized with timely warning signals. By using regular signals, like logs and metrics, from identified business or technical bottlenecks or risks, the operations team can improve the application's stability. We recommend maintaining a list of such signals and risks in the operational guidelines. This includes recommended actions to take in order to deliver the best mitigation strategy. For more information on these guidelines, see [Operatable feature guidelines](docs/scos/dev/guidelines/operatable-feature-guidelines.html).

### Silent undesired scenario
Although monitoring systems are used to detect unwanted states, some business functionality may be within acceptable metrics but not desirable under certain conditions. For example, the minimum daily browsing customer count is 10, but 11 customers during Black Friday is not considered normal. To monitor such cases, these scenarios need to be documented for the operations team.

### User guide
To minimize the impact of resolution efforts and optimize the process, make sure to provide the operations team with the necessary business context. For example, resolving a small number of errors through the Back Office may be more optimal than rolling back an entire release.

### Entity size expectations

The cardinality of entities plays an important role in determining how an application will function in a production environment. To mitigate risks in this area, performance, scaling, manual tests, and reviews can be applied. However, the identified and estimated entity cardinality for the project can serve as a warning to pay extra attention to these entities in order to further reduce risks. For example, a marketing campaign bringing 10,000 active users to the homepage at 17:08 on Friday.


### Remote service catalog

To properly handle and monitor the cooperation between local and remote or third-party services, provide the operations team with a detailed communication protocol. Make sure to additionally include the known/expected service-out or major impacts that otherwise not directly accessible. This way, it will be possible ignore expected outages or compensate/build-workarounds over temporary problems or actively focus on known risks.

As an example, consider a payment provider connected to the project that needs to be monitored to ensure the availability of the
external service. The following communication protocol is used:

* The local service sends an HTTP GET request to the remote service's API endpoint, along with any necessary headers and query parameters.
* The remote service responds with an HTTP status code and a JSON payload containing the requested data.
* The local service processes the data and displays it to the user or performs any necessary actions.

It's important to note that this is just one example of a communication protocol, and the specific details will vary depending
on the specific requirements and capabilities of the local and remote services.
