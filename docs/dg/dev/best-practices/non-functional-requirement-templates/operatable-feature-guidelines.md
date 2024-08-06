---
title: Operatable feature guidelines
description: Guidelines for enabling application operation.
last_updated: April 23, 2024
template: concept-topic-template
related:
  - title: NFR guidelines
    link: docs/dg/dev/best-practices/non-functional-requirement-templates/operational-and-deployment-guidelines.html
  - title: Process documentation guidelines
    link: docs/dg/dev/best-practices/non-functional-requirement-templates/process-documentation-guidelines.html
  - title: Monitorable process guidelines
    link: docs/dg/dev/best-practices/non-functional-requirement-templates/monitorable-process-guidelines.html
---


This document provides guideline templates for development teams striving for high-quality software. These templates are flexible and serve as a starting point, so make sure to adjust them to your project's requirements. Defining and following these guidelines may be necessary to fulfill project Service Level Agreements (SLAs), with each guideline explicitly outlining the responsible team. Alignment with all involved teams is essential for ensuring a functioning concept.

By addressing the following items, a development team can ensure that the operations team has the necessary information and resources to maintain the reliability of applications.

## Survivability
An application, during its life cycle, faces various expected and unexpected challenges. To enable the operations team to increase an application's survivability, it's recommended to design additional flexible configuration options, like feature or workflow disabling or switching, that can be adjusted on the fly without redeployment to decrease resolution impact on critical business flows. Such options need to be handed over in the operational guidelines.

## Stability
It is very common for business or technical teams to identify project-specific risks that may temporarily challenge the stability of the application.

To enable the operations team to effectively address such events or explore alternative solutions, it's recommended that any gathered information related to these specific cases are shared via the Operational guidelines. This ensures that the operations team has the necessary information to address stability issues and maintain the reliability of the application.

## Readability
Code readability is a major quality attribute that can impact various aspects of a project, such as the following:
* Code review time
* Code fix time
* Feature delivery time
* Developer onboarding time
* Error evaluation time
* The number of human errors

To improve the efficiency and effectiveness of the team, it's important to establish a set of readability rules that need to be followed. This ensures that the codebase is easy to understand and maintain, which can lead to faster delivery of features and fewer errors.

## Credibility
To ensure a credible application that can operate continuously, that is 24/7/365, and implement significant changes on a regular basis, it's recommended to develop and adhere to testing best practices that aim for error-free behavior in the production environment. As an optional step, a set of production-targeted smoke tests, considering their impact on the production environment, can be conducted to verify the proper behavior of recent changes to the system. These tests can be included as part of the operational or deployment guidelines.

{% info_block infoBox %}
It's recommended to put extra attention over the environment specific application and infrastructure configuration and settings because they carry a higher risk of business impact on error.
{% endinfo_block %}


## Fault-tolerance
We recommend preparing a fallback mechanism for your business critical workflows, like order placement, to make sure that the intentions of your end users are never lost.

## Interruptibility
Scheduled tasks need to be interruptible because they're more prune to face critical failures and deliberate interruptions if they are always running. Accordingly, they need to leave the processed entities and their related modified entities in a consistent state and not loose any critical business information in between. Special, not-recurring, long-running scheduled tasks need to be marked to be distinguishable from regular scheduled tasks for easy observation and management.
