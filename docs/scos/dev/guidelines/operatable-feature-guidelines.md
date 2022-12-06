---
title: Operatable feature guidelines
description: @TODO
last_updated: @TODO
template: concept-topic-template
related:
- title: NFR guidelines
  link: docs/scos/dev/guidelines/nfr-guidelines.html
- title: Process documentation guidelines
  link: docs/scos/dev/guidelines/process-documentation-guidelines.html
- title: Monitorable process guidelines
  link: docs/scos/dev/guidelines/monitorable-process-guidelines.html
---

In order to enable Operations Teams to best-possible operate Applications, the following elements are suggested to be addressed.

### Survive-ability
An application - during its life-cycle - faces various expected and unexpected challenges. To increase its survive-ability with the help of Operations Team, 
it is recommended to design additional flexible configuration options (feature or workflow disabling/switching) that can be adjusted on-the-fly 
(without re-deployment) to decrease resolution impact on critical business flows (such options need to be handed over in the Operational guidelines).

### Stability
It is very common use-case that your business/technical teams identifies project specific risks that temporary challenge the stability of your application. 
To enable us counter such events with a joined team effort or apply alternative solutions for these specific cases, it is recommended to hand over such 
gathered information to us via the Operational guidelines.

### Readability
Code readability is a major quality attribute that affects code review time, code fix time, feature delivery time, developer onboarding time, error 
evaluation time, human error count (etc.) over your application team and us. In order to decrease all of those negative effects in your application, 
the QG establishes a set of readability rules that need to be fulfilled.

### Credibility
In order to have a credible application that aims to work 24/7/365 while rolling out huge change-sets during this time, it’s recommended to build/follow 
test best-practices to aim errorless behaviour on production environment. Optionally a set of production targeted smoke tests (in consideration with their 
impact on the production environment itself) can be handed over to us (as part of Operational guidelines or Deployment guidelines), to verify the proper 
behaviour of a recent change in the system.

Note: it is recommended to put extra attention over the environment specific application/infrastructure configurations and settings as those carry a higher 
risk of business impact on error.

### Fault-tolerance
It is our recommendation to prepare fallback mechanism to your business critical workflows (e.g. order placement fails) to make sure that the intension of 
your end-users are never lost.

### Interruptibility
Scheduled tasks need to be interruptible as they are more prune to face critical failures (or deliberate interruption due to their “always running” state). 
Accordingly, they need to leave the processed entities (and their related modified entities) in a consistent state and not to loose any critical business 
information in-between. Special, not-recurring, long-running scheduled tasks have to be marked to be distinguishable from regular scheduled tasks for 
easy observation and management.
