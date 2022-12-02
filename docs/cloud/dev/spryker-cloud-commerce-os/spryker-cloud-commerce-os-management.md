---
title: Spryker Cloud Commerce OS management
description: Assignment of responsibilities, consultation and reporting obligations.
last_updated: Nov 21, 2022
template: concept-topic-template
---

This RACI Matrix defines responsibilities, consultation and reporting obligations while providing Platform-as-a-Service (PaaS) hosting for Spryker customers.

<div class="bg-section">
<h2> Glossary</h2>
<dl>
<dt>Responsible</dt>
<dd>Those who do the work to complete a task.</dd>

<dt>Accountable</dt>
<dd>The one ultimately answerable for the correct and thorough completion of a deliverable or task, and the one who delegates the work to those responsible.</dd>

<dt>Consulted</dt>
<dd>Those whose opinions are sought, typically subject matter experts; and with whom there is a  two-way communication.</dd>

<dt>Informed</dt>
<dd>Those who are kept up to date on progress, often only on completion of a task or deliverable; and with whom there is just one-way communication.</dd>

<dt>Application</dt>
<dd>Customer Commerce Solution build using Spryker Commerce OS.</dd>

<dt>Infrastructure</dt>
<dd>Underlying cloud infrastructure managed by Spryker to deliver Spryker Cloud Commerce to Spryker customers.</dd>

</dl>
</div>

## RACI Matrix

| ACTIVITY | CUSTOMER | RESPONSIBLE DEVELOPING PARTY (CUSTOMER OR PARTNER) | SPRYKER |
| --- | ---| --- | --- |
| Application Health, Security and Performance|
| Provide code operational application (docker-sdk and Spryker Code) | C | A/R | I | 
| Optimize Application  performance applying best practices | I/C | R/A | I | 
| Maintain Application up-to-date and secure | I/C | R/A | I |
| Infrastructure Configuration and Scaling | 
| Manage environment sizing depending on the current needs | - | C | R/A |
| Maintain the Infrastructure up-to-date and secure | I | I | R/A |
| Configuration of the infrastructure for the Application | I | C | R/A |
| Provide deploy file that can be used in the Spryker Cloud setup | I | R/A | C |
| Deployments |
| Provide valid access tokens for the repositories and the repository is available to Spryker Cloud as per requirements | - | R/A | I |
| Conduct appropriate (load) testing, especially regarding data imports before production deployment | I/C | R/A | I |
| Initial troubleshooting of deployment issues | - | R/A | - |
| Fix deployment problems with data (data imports, timeouts during data import, wrong data structure, etc) and code | - | R/A | I |
| Fix deployment infrastructure problems (Placement issues, timeouts building of images, deployment of containers (e.g. Jenkins)) | - | - | R/A |
| Monitoring/Alerting and Troubleshooting |
| Analyze logs and conduct troubleshooting to determine Infrastructure problems | I | I| R/A |
| Analyze logs and conduct troubleshooting to determine Application problems | I/C | R/A | - |
| Monitor Infrastructure and inform stakeholders about infrastructure problems proactively | I | I | R/A |
| Monitor Application and inform stakeholders about application problems proactively | I/C | R/A | - |
