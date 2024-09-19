---
title: Operational and deployment guidelines
description: Guidelines for defining and implementing Operational and Deployment Non-Functional Requirements (NFRs) to ensure the technical success of a project.
last_updated: April 23, 2024
template: concept-topic-template
related:
- title: Operatable feature guidelines
  link: docs/dg/dev/best-practices/non-functional-requirement-templates/operatable-feature-guidelines.html
- title: Process documentation guidelines
  link: docs/dg/dev/best-practices/non-functional-requirement-templates/process-documentation-guidelines.html
- title: Monitorable process guidelines
  link: docs/dg/dev/best-practices/non-functional-requirement-templates/monitorable-process-guidelines.html
- title: Architecture performance guidelines
  link: docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
---

This document provides guideline templates for development teams striving for high-quality software. These templates are flexible and serve as a starting point, so make sure to adjust them to your project's requirements. Defining and following these guidelines may be necessary to fulfill project Service Level Agreements (SLAs), with each guideline explicitly outlining the responsible team. Alignment with all involved teams is essential for ensuring a functioning concept.

The following are generic NFRs grouped by quality, acting as a starting point for your project. Be sure to tailor the list to the specific requirements and constraints of your project, and to prioritize and organize the NFRs in a logical manner.


## Non-functional requirements

Non-functional requirements (NFRs) are one of the core tools for architects and developers to describe how the system under development is supposed to work from a technical perspective. Defining NFRs can be as important as defining functional requirements, which are usually done by business, for example—Product Owners. Developing a project without NFRs usually results in
unintended behaviors being discovered late in the product's lifecycle, which costs a lot of resources to deal with.

Involving all the relevant stakeholders into creating NFRs ensures there is a common understanding of how the system is supposed to work and its key characteristics. The list of stakeholders can include architects, developers, business analysts, and end users.

Using a structured approach to creating NFRs ensures that all relevant NFRs are identified, and that they are prioritized and organized in a logical manner. This can involve using a specific framework or methodology, such as the [ISO 25010 standard](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010), or the Quality Attribute Workshop method, or even [PASSME](https://nick-goupinets.medium.com/passme-muster-846a9997645b).

As the system is being developed, the NFRs may also need to be adjusted to reflect changes in the project's goals and objectives. Regularly revisiting and updating NFRs ensures that the system continues to meet the technical and functional needs of the business and end users.

## Availability guidelines

Software architecture and design must ensure that there is no negative impact on application availability by following the guidelines:

* Avoid designing the application to limit its own startup and shutdown:
  * Avoid design patterns or coding practices that cause the application to exit unexpectedly in the middle of execution.
  * Avoid using flags or other mechanisms to block the application from starting.
  * Avoid setting limits on the number of concurrent processes that can be run by the application.
* Avoid designing the application to lock shared resources at the application level. For example, if the application uses a database, it shouldn't lock the database tables or rows that it reads or writes to. This can cause other parts of the system to become unavailable.
* Align resource consumption with expected workloads. For example, if using PHP-FPM, make sure the number of worker processes is sufficient to handle the expected workload without overloading the system.

## Security guidelines

Make sure to define and follow your own project's [security best practices](/docs/scos/dev/guidelines/security-guidelines.html).

## Deployability guidelines

* The same release candidate and branch must be redeployable without side effects.
* Deploy scripts must not break the behavior of the current system.
  * Deploy script elements must be configured according to your project setup following the [deployment pipeline](/docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-pipelines.html) process.
  * The application to be deployed (version N+1) must upgrade the data structures and constants and data sets without causing downtime and without failing, losing, or compromising any (version N+1 or N) functionality.
  * The message consumers to be deployed (version N+1) must be backward compatible with the present (<N+1) messages and broker structure.
  * The deployed (version N+1) application *can* clean up obsolete data structures, constants, and data sets if it causes no downtime, unless it's breaking version N.

## Rollback-ability guidelines

The rollback scripts must not break the behavior of the current system:
* Rollback script elements must be configured according to your project setup following the rollback pipeline process.
* The deployed (version N+1) application can rollback current version (N+1) data structures, constants, and data sets to previous version (N) without causing downtime.

## Performance guidelines

* Zed UI's average load performance should be under 450ms.
* Glue GET requests with subsequent Zed requests should be under 180ms on average.
* Glue GET requests without subsequent Zed requests should be under 140ms on average.
* Glue POST, PATCH, and PUT requests with subsequent Zed requests should be under 290ms on average.

## Scaleability guidelines

* The publish and synchronize processes must scale linearly with the number of entities they are processing. Specifically, memory and CPU consumption must grow proportionally to the number of entities. For example, if the process handles 100 entities, the resource consumption should be X. When the process handles 200 entities, the maximum resource consumption must not exceed 2X.
