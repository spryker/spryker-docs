---
title: Project Development Non-Functional Requirement guidelines
description: @TODO
last_updated: @TODO
template: concept-topic-template
related:
- title: Operatable feature guidelines
  link: docs/scos/dev/guidelines/operatable-feature-guidelines.html
- title: Process documentation guidelines
  link: docs/scos/dev/guidelines/process-documentation-guidelines.html
- title: Monitorable process guidelines
  link: docs/scos/dev/guidelines/monitorable-process-guidelines.html
---


## Introduction

Non-Functional Requirements (NFRs) are one of the core tools for architects and developers to describe how the system under development supposed to work from technical perspective.
Defining NFRs can be as important as defining functional requirements, which are usually done by business people (i.e. Product Owners). Missing out on them usually result in
too late realization of certain unintended behavior that costs a lot of resources/money for the projects to deal with.

## NFR guidelines

To ensure that the most important aspects are not missed to be considered when defining NFRs, we suggest using the Software Quality Attributes like Availability, Security, Performance, etc.
You can use the [ISO 25010 standard](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010) as a baseline for Quality Attributes, but you can also come up your own Quality Attributes (QAs)
and ad it to your list, whichever makes sense for your project's case best.

Below you can find several generic NFRs grouped by QAs. Not all of them may be relevant in all cases, so you should use this list 
as a guide or template to help to start with your own NFRs. Change or extend this list for each of your projects as appropriate.

### Availability
Software architecture & design must ensure that there is no negative impact on application availability.

Examples:
* Do not limit a new application start.
  * exit in the middle
  * flag based blocking of application start
  * process count limit on application level
* Do not lock shared resources on application level.
* Aligned adjustments of resource consumptions.
  * FPM worker count changes

### Security
* Make sure to define and follow your own team's [Security best practices](/docs/scos/dev/guidelines/security-guidelines.html).

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

### Deployability, Rollback-ability, Consistency, Monitor-ability
* Asynchronous tasks MUST be limited to 1-at-a-time during deployment/rollback processes.
* The asynchronous task runner MUST report for monitoring: start & end.
* Application MUST report a failed async migration by throwing an error event to new relic.

### Performance
* Zed UI average load performance should be under 450ms.
* Glue GET requests with subsequent Zed requests on average should be under 180ms.
* Glue GET requests without subsequent Zed requests on average should be under 140ms.
* Glue POST/PATCH/PUT requests with subsequent Zed requests on average should be under 290ms.

