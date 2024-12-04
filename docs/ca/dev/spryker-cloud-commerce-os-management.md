---
title: Spryker Cloud Commerce OS management
description: Understand responsibilities in managing Spryker Cloud Commerce OS, defining who is accountable, responsible, consulted, and informed for cloud environment tasks.
last_updated: Nov 21, 2022
template: concept-topic-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/spryker-cloud-commerce-os-management.html
---

This RACI Matrix defines responsibilities, consultation and reporting obligations while providing Platform-as-a-Service (PaaS) hosting for Spryker customers.

<div class="bg-section">
<h2> Glossary</h2>
<dl>
<dt>Responsible (R)</dt>
<dd>Those who do the work to complete a task.</dd>

<dt>Accountable (A)</dt>
<dd>The one ultimately answerable for the correct and thorough completion of a deliverable or task, and the one who delegates the work to those responsible.</dd>

<dt>Consulted (C)</dt>
<dd>Those whose opinions are sought, typically subject matter experts; and with whom there is a  two-way communication.</dd>

<dt>Informed (I)</dt>
<dd>Those who are kept up to date on progress, often only on completion of a task or deliverable; and with whom there is just one-way communication.</dd>

<dt>Application (A)</dt>
<dd>Customer Commerce Solution build using Spryker Commerce OS.</dd>

<dt>Infrasatructure (I)</dt>
<dd>Underlying cloud infrastructure managed by Spryker to deliver Spryker Cloud Commerce to Spryker customers.</dd>

</dl>
</div>

## RACI Matrix

| ACTIVITY | CUSTOMER | RESPONSIBLE DEVELOPING PARTY (CUSTOMER OR PARTNER) | SPRYKER |
| --- | ---| --- | --- |
| <b>Application health, security, and performance. </b>|
| Provide an operational application based on the code of the Docker SDK and Spryker. | C | A/R | I |
| Optimize application performance by applying best practices. | I/C | R/A | I |
| Maintain application up to date and secure. | I/C | R/A | I |
| <b>Infrastructure configuration and scaling.	</b> |
| Resize environments according to changing needs. | - | C | R/A |
| Maintain the infrastructure up to date and secure. | I | I | R/A |
| Configure infrastructure for applications. | I | C | R/A |
| Provide deploy files for SCCOS environments. | I | R/A | C |
| <b> Deployment </b> |
| Provide valid access tokens for repositories and make them available per requirements. | - | R/A | I |
| Conduct appropriate testing, especially the load testing of data import  before production deployments. | I/C | R/A | I |
| Conduct initial troubleshoot of deployment issues. | - | R/A | - |
| Resolve deployment issues related to code and data, like data imports, timeouts during data import,  or wrong data structure. | - | R/A | I |
| Resolve deployment infrastructure issues: placement issues, timeouts of image building, deployment of containers like Jenkins. | - | - | R/A |
| <b> Monitoring, alerting, and troubleshooting. </b> |
| Analyze logs to detect and troubleshoot infrastructure issues. | I | I | R/A |
| Analyze logs to detect and troubleshoot application issues. | I/C | R/A | - |
| Monitor infrastructure and inform stakeholders about issues proactively. | I | I | R/A |
| Monitor application and inform stakeholders about issues proactively. | I/C | R/A | - |
