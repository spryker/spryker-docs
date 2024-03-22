---
title: Project Operational and Deployment Non-Functional Requirement Guidelines
description: Guidelines for defining and implementing Operational and Deployment Non-Functional Requirements (NFRs) to ensure the technical success of a project.
last_updated: 
template: concept-topic-template
related:
- title: Operatable feature guidelines
  link: docs/scos/dev/guidelines/operatable-feature-guidelines.html
- title: Process documentation guidelines
  link: docs/scos/dev/guidelines/process-documentation-guidelines.html
- title: Monitorable process guidelines
  link: docs/scos/dev/guidelines/monitorable-process-guidelines.html
- title: Architecture performance guidelines
  link: docs/scos/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
---

Non-Functional Requirements (NFRs) are one of the core tools for architects and developers to describe how the system under development supposed to work from technical perspective.
Defining NFRs can be as important as defining functional requirements, which are usually done by business (i.e. Product Owners). Missing out on them usually result in
too late realization of certain unintended behavior that costs a lot of resources/money for the projects to deal with.

## Project Operational & Deployment NFR guidelines
There are several factors that can impact the success of NFR definition in a project. One key factor is the involvement of all relevant stakeholders, 
including architects, developers, business analysts, and end users. Ensuring that all of these parties are involved in the NFR definition 
process can help to ensure that all relevant requirements are captured and that there is a shared understanding of the technical 
characteristics and behaviors of the system being developed.

Another important factor is the use of a structured approach to NFR definition. This can involve using a specific framework or 
methodology, such as the [ISO 25010 standard](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010) or the Quality Attribute Workshop (QAW) method
or even [PASSME](https://nick-goupinets.medium.com/passme-muster-846a9997645b). Using a structured approach can help to ensure that all relevant 
NFRs are identified and that they are prioritized and organized in a logical manner.

Finally, it is important to regularly review and update NFRs as the project progresses. As the system being developed evolves, 
the NFRs may also need to be adjusted to reflect changes in the project's goals and objectives. Regularly revisiting and updating 
NFRs can help to ensure that the system being developed continues to meet the technical and functional needs of the business and end users.

## Template for Generic NFRs for Projects.

{% info_block warningBox "Warning" %}

Below you can find several generic NFRs grouped by quality. In this list, we have provided a starting point for common NFRs that MAY be relevant
to your project. Not all of these NFRs may be applicable in every case, so you SHOULD use this list as a guide or template to help to start
with your own NFRs. Be sure to tailor the list to the specific requirements and constraints of your project, and to prioritize and organize
the NFRs in a logical manner.

{% endinfo_block %}

### Availability
Software architecture & design must ensure that there is no negative impact on application availability.

Example fulfilment of NFRs:
* Avoid designing the application to limit its own start-up or shut-down.
  * Avoid design patterns or coding practices that cause the application to exit unexpectedly in the middle of execution.
  * Avoid using flags or other mechanisms to block the application from starting.
  * Avoid setting limits on the number of concurrent processes that can be run by the application.
* Avoid designing the application to lock shared resources at the application level.
  * For example, if the application uses a database, it should not lock the database tables or rows that it reads or writes to, as this can cause other parts of the system to become unavailable.
* Align resource consumption with expected workloads.
  * For example, if using PHP-FPM, ensure that the number of worker processes is sufficient to handle the expected workload without overloading the system.

### Security
* Make sure to define and follow your own project's [Security best practices](/docs/scos/dev/guidelines/security-guidelines.html).

### Deployability
* The same release candidate / branch MUST be re-deployable without side-effects.
* The deploy scripts MUST NOT break the behaviour of the current system.
  * Deploy script elements MUST be configured according to your project setup following the [Deployment Pipeline](/docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-pipelines.html) process.
  * The to-be deployed (version N+1) application MUST upgrade the data structures and constants and data sets without causing downtime and without failing or losing/compromising any (version N+1 or N) functionality.
  * The to-be deployed (version N+1) message consumers MUST be BC with the present (<N+1) messages and broker structure.
  * The deployed (version N+1) application CAN clean up obsolete data structures # constants and data sets if it causes no downtime, unless it's breaking version N.
  
### Rollback-ability
The rollback scripts MUST NOT break the behaviour of current system.

* Rollback script elements MUST be configured according to your project setup following the Rollback Pipeline process.
* The deployed (version N+1) application can rollback current version (N+1) data structures # constants and data sets to previous version (N) without causing downtime.

### Performance
* Zed UI average load performance should be under 450ms.
* Glue GET requests with subsequent Zed requests on average should be under 180ms.
* Glue GET requests without subsequent Zed requests on average should be under 140ms.
* Glue POST/PATCH/PUT requests with subsequent Zed requests on average should be under 290ms.

