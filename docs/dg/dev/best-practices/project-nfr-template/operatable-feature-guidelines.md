---
title: Operatable feature guidelines
description: Guidelines for enabling application operation.
last_updated: April 23, 2024
template: concept-topic-template
related:
  - title: NFR guidelines
    link: docs/dg/dev/best-practices/project-nfr-template/nfr-guidelines.html
  - title: Process documentation guidelines
    link: docs/dg/dev/best-practices/project-nfr-template/process-documentation-guidelines.html
  - title: Monitorable process guidelines
    link: docs/dg/dev/best-practices/project-nfr-template/monitorable-process-guidelines.html
---

{% info_block warningBox "Warning" %}

This document provides a set of guidelines for project development, intended as a flexible template and starting point for development teams striving for high-quality software. While these guidelines offer a default ruleset, it's imperative to tailor them to meet the specific requirements and commitments of each project. Defining and following these guidelines may be necessary to fulfill project Service Level Agreements (SLAs), with each guideline explicitly outlining the responsible team. Alignment with all involved teams is essential for ensuring a functioning concept.

{% endinfo_block %}

To ensure that Applications can be operated, it is recommended that project development teams consider the following
elements. By addressing these issues, development teams can help ensure that the Operations team has the necessary information and resources to maintain the reliability of the applications.

# Survive-ability
An application - during its life-cycle - faces various expected and unexpected challenges. To increase its survive-ability with the help of Operations Team, it is recommended to design additional flexible configuration options (feature or workflow disabling/switching) that can be adjusted on-the-fly (without re-deployment) to decrease resolution impact on critical business flows (such options need to be handed over in the Operational guidelines).

# Stability
It is very common for business or technical teams to identify project-specific risks that may temporarily challenge the stability of the application.

To enable the Operations team to effectively address such events or explore alternative solutions, it is recommended that any gathered information related to these specific cases be shared via the Operational guidelines. This will help ensure that the Operations team has the necessary information to address stability issues and maintain the reliability of the application.

# Readability
Code readability is a major quality attribute that can impact various aspects of a project, including code review time, code fix time, feature delivery time, developer onboarding time, error evaluation time, and the number of human errors. 

To improve the efficiency and effectiveness of the team, it is important to establish a set of readability rules that need to be followed. This will help ensure that the codebase is easy to understand and maintain, which can lead to faster delivery of features and fewer errors.

# Credibility
To ensure a credible application that can operate continuously (24/7/365) and implement significant changes on a regular basis, it is recommended to develop and adhere to testing best practices that aim for error-free behavior in the production environment. As an optional step, a set of production-targeted smoke tests (considering their impact on the production environment) can be conducted to verify the proper behavior of recent changes to the system. These tests can be included as part of the operational or deployment guidelines.

Note: it is recommended to put extra attention over the environment specific application/infrastructure configurations and settings as those carry a higher risk of business impact on error.

# Fault-tolerance
It is our recommendation to prepare fallback mechanism to your business critical workflows (e.g. order placement fails) to make sure that the intension of your end-users are never lost.

# Interruptibility
Scheduled tasks need to be interruptible as they are more prune to face critical failures (or deliberate interruption due to their “always running” state). Accordingly, they need to leave the processed entities (and their related modified entities) in a consistent state and not to loose any critical business information in-between. Special, not-recurring, long-running scheduled tasks have to be marked to be distinguishable from regular scheduled tasks for easy observation and management.
