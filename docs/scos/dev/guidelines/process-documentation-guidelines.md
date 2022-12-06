---
title: Process documentation guidelines
description: @TODO
last_updated: @TODO
template: concept-topic-template
originalLink: @TODO
originalArticleId: @TODO
related:
- title: NFR guidelines
  link: docs/scos/dev/guidelines/nfr-guidelines.html
- title: Operatable feature guidelines
  link: docs/scos/dev/guidelines/operatable-feature-guidelines.html
- title: Monitorable process guidelines
  link: docs/scos/dev/guidelines/monitorable-process-guidelines.html
---

-- NOTE: THIS IS A TEMPLATE THAT PROJECTS SHOULD TAKE AND CUSTOMIZE

The process documentation guidelines are in place to enhance the communication between cross-teams over all processes and to 
ensure that they can operate and deploy their applications the best-possible way.

## Deployment guidelines
The following elements apply in the scope of deployment/rollback of each release candidate.

### Environment variable assertion
In huge-scaled teams, the human communication (and issue administration) may face many challenges - as a side-effect, some environment variable 
or their expected value set may not reach the production environment as expected. To decrease the risk of a critical mistake in the line, we 
offer to run a final validation on the production environment to match the expected setup change with the actual state. In order to understand 
the scope of changes, we need the list of these handed over with the deployment standard service request.

### Special manual steps
In case of needed un-regular, one-time, manual steps that are not automated on application side via our deployment / rollback pipeline processes, 
the uniformed instructions to these exclusive requests need to be handed over to our Operations Team in the deployment standard service request. 
This also includes any dependencies that may appear between the deployment elements (eg: 1 component needs to be released before another; or a 
special timing is necessary; etc.).

### Infrastructure changes
Impacts on the infrastructure and application infrastructure are evaluated carefully, since mistakes in this area may cause critical problems. 
To decrease the risks, the intension behind each impact on this field needs to be highlighted in handed over documentation (as part of the the 
deployment standard service request) to enable us compare them with the actual implementation.

### Expected behaviour
Some special cases (technical debts / functional debts / accepted risks / etc.) can lead to release specific, temporary, expected critical/warning 
state that should not be mitigated or handled by us. In order to decrease unnecessary fire-fighting on both sides, such scenarios need to be 
listed and explained via the deployment standard service request.



## Operational guidelines
The following elements apply in the scope of operating applications or for special failure scenarios that may as well occur during deployment/rollback.

Given a huge size application (that delivers tons of features every release), an unexpected error can be resolved in many ways. To ensure that the 
business-best resolution is chosen with minimal (or zero) revoked functionality of a successfully deployed release, it is recommended to maintain 
an operational guideline .

### Main workflows
To allow us understand what are the main/critical workflows in the application, the operational guidelines should address the normal behaviour of 
the important features/workflows (logical-, component- and infrastructure-level).

This enables us to form a general overview over/and-between the logic & components & infrastructure, that is necessary to make the best operational 
decisions or build project specific operational dashboards (to eg enhance/highlight project specific sinkholes) or analyse/answer/solve requests 
that have reached us.

### Risks, early warnings & counter actions
Building a huge application is usually coupled with massive application level logging. In some cases, a system critical issue could be prevented 
(or minimised) with necessary warnings triggered afore. Utilising the regular signals (logs & metrics) on already identified business- or 
technical-sinkholes or risks, the application’s stability can be enhanced by the Operations Team. It is recommended to maintain a list of such 
signals and risks in the Operational guideline, including the best recommended actions (business-wise) to enable us deliver the best selected 
mitigation action (see Operatable feature guidelines ).

### Silent undesired scenario
Although the applications well utilise their monitoring systems to be aware of unwanted states, it may happen that business functionality is within 
the allowed metrics but should not be considered desired for the given, special conditions (eg: the minimum everyday browsing customer count is 10; 
but 11 customers during black Friday is still not considered normal). To enable us monitoring such cases, these scenarios need to be specificied 
for Operations Team.

### User guide
To decrease/optimise resolution impact (eg: a few-entity-error that is desired to be resolvable through backoffice rather than rolling back the 
entire release), the user guide with necessary business background needs to be handed over to the Operations Team.

### Entity size expectations
The cardinality of entities plays an important role on how an application will actually work in production environment. Although we apply 
performance-, scaling-, manual-tests and reviews to eliminate risks on this field, the already identified and assumed/estimated entity cardinality 
on the project side can warn us to apply additional care over these entities to possibly further decrease risks (eg: marketing campaign drives 10.000 
active users to your homepage on Friday 17:08).

### Remote service catalog
To properly handle and monitor the co-operation between local and remote services (aka 3rd party services), the expected and detailed communication 
protocol needs to be forward to us, in addition with the known/expected service-out or major impacts that otherwise not directly accessible to us. 
This way, we can ignore expected outages or compensate/build-workarounds over temporary problems or actively focus on known risks.
