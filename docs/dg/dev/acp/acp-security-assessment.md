---
title: ACP security assessment
Descriptions: Ensure your Spryker ACP setup meets security standards with our comprehensive security assessment guide for robust protection.
template: howto-guide-template
last_updated: Aug 30, 2023
redirect_from:
- /docs/acp/user/intro-to-acp/aop-security-assessment.html
---

This document outlines the threat modeling and security assessment requirements and process for apps listed on the Spryker’s app catalog or the app store. It covers the following app types:

- Pure API integrations (with 3rd party services and vendors)
- Apps extending the Spryker Cloud Commerce Operating System (SCCOS)
- Hybrid apps

## ACP security

In the context of listings on the ACP apps catalog, security is a measure of trust. For our enterprise customers to trust us with their data, it is important that every app they use with SCCOS offers a satisfactory level of security.

## Security responsibility

The main participants in a transaction related to the ACP are:

1. ACP Owner - Spryker
2. The Platform - Spryker SCCOS
3. The Integration Developer - Spryker or Technology Partners
4. The Integration Consumer - Customer
5. The Integration Implementor - Solution Partners

All of these participants are responsible for the security of customer data.

## Threat modeling

Spryker will conduct threat modeling to identify and prioritize potential threats to a system and determine the value that potential mitigations would have in reducing or neutralizing those threats for commercially distributed apps through the ACP apps catalog.  
The threat model document will be shared in a PDF, Word or HTML format and will contain the following information:

- How data flows through a system to identify where the ACP application might be attacked.
- Document as many potential threats to the ACP app (PBC) as possible.
- Security controls that may be put in place to reduce the likelihood or impact of a potential threat.

During threat modeling, the following list of risks and threat libraries sources are recommended to define the possible threats an application might be facing:

1. Risks with [OWASP Top 10](https://owasp.org/www-project-top-ten/).
2. Testing Procedure with [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/).
3. Risks with [SANS Top 25](https://www.sans.org/top25-software-errors).
4. Microsoft [STRIDE](https://en.wikipedia.org/wiki/STRIDE_%28security%29).

{% info_block infoBox "Info" %}

Threat modeling is highly recommended but not mandatory for the apps listed in the ACP catalog. Some Spryker customers ask for threat modeling explicitly in addition to a penetration test. If the partner chooses not to get this done initially, they will need to go through that upon customer request.

{% endinfo_block %}

## Security assessment and testing

Spryker will conduct a security assessment for apps that are commercially distributed through the ACP apps catalog. These tests include SAST (Static Application Security Testing) and penetration testing activities. The objective of these tests is to replicate what a malicious actor would typically do to gain unauthorized access to the app and steal information.

{% info_block infoBox "Info" %}

Penetration testing is mandatory for all applications in the ACP catalog.

{% endinfo_block %}

Every app that clears the review successfully will be awarded a badge of Security Approval that will be displayed on the listing details. While searching for apps on the catalog, customers will have the ability to filter their results based on the security approval status.

Other apps (those without the approval) could be listed on the catalog, but they will not have the security approval badge. Examples of such apps are template apps, starter apps, code samples, etc. Any unapproved app cannot be distributed commercially, that is, customers cannot be charged for such apps.

## Security standards

Penetration testing should be conducted in accordance with or based on the following methodologies and recommendations:

- Web Security Testing Guide – [OWASP WSTG](https://owasp.org/www-project-web-security-testing-guide/)
- The Penetration Testing Execution Standard – [PTES](http://www.pentest-standard.org/index.php/Main_Page)
- Open Source Security Testing Methodology Manual – [OSSTMM](https://www.isecom.org/OSSTMM.3.pdf)
- Payment Card Industry Data Security Standard – [PCI DSS](https://www.pcisecuritystandards.org/document_library?category=pcidss&document=pci_dss)

## Testing requirements

Spryker will be provided with the following information for conducting a test:

- List and nature of environments (production, sandbox, test site, etc.)
- If the endpoint isn't a production site, confirmation that the test site or sandbox accurately reflects the production environment
- Login credentials for the test environment
- The entire code base of the integration

## Test output

Test results will be shared in a PDF, Word, or HTML format and will contain the following information:

- The type/classification of the vulnerability - (XSS, SQL Injection, CSRF, etc.) according to [OWASP](https://owasp.org/www-community/vulnerabilities/), [CWE](https://cwe.mitre.org/data/definitions/699.html), or [NIST NVD](https://nvd.nist.gov/vuln/).
- The location of the issue within the code or steps to reproduce the issue (e.g. example of a network request triggering the vulnerability).
- Recommendation on how to fix or mitigate it.
As stated earlier, these results will not cover the entire code base.

## Testing scope

Wherever the protected data goes, that is in scope. All the processing happening on SCCOS and all integrations where the data is sent out to or brought in from will be in scope for testing.

External integrations will undergo an endpoint assessment in accordance with OWASP Top 10 for Web Application testing. Spryker will not conduct any security assessment of the external system itself or of subsequent integrations from this external system.

{% info_block infoBox "Example" %}

**In-Scope**: Data being sent from SCCOS to a CRM system.

**Out of Scope**: CRM system further processing and sending this data to a survey system.

{% endinfo_block %}


Spryker (or an authorized third party) will test code that runs on ACP/SCCOS or code that a partner makes available to us for review. This testing will consist of Static Code Analysis with a SAST tool, as well as a manual review of the code for critical parts of the application. Partners will provide documentation to indicate the critical features of the app.

Vulnerabilities will be sent back to the partner to fix. The partner will be expected to conduct a full review on their side before resubmitting for another round of testing. The review fee includes **three** cycles of testing. If the app requires more cycles of testing because the issues weren’t fixed, every subsequent test cycle will attract a cost.

Every app will undergo an annual full test cycle. The partner can continue enhancing the app and use static code checkers to test every release on their side.

![threat-moddelling](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/aop-security-assessment/threat-modelling.png)

## Expectations from partners and app developers

Spryker expects that the following actions are taken by partners and app developers:

- Developers should take the necessary steps to ensure the security of their applications before sending them for assessment.
- Using the SAST (Static Application Security Testing) and DAST (Dynamic Application Security Testing) tools, they should perform automated scans and fix all issues reported.
- If the scanner reports issues that developers consider to be false positives, they should provide necessary documentation listing those.
- Once the scan reports are clean, they should do a full manual review of the code to check for OWASP Top-10 vulnerabilities.

{% info_block warningBox "Warning" %}

The app developers should not consider Spryker as an outsourced security QA team. Rather, Spryker’s assessment process is a validation of the measures they have taken to ensure a secure app. They should always aim to clear the review in the first attempt.

{% endinfo_block %}

## Review cost

For each app, a review fee of EUR 2500 / USD 3000 will be applicable. This amount is due every time the app goes through a full review cycle (typically annually) and is exclusive of any other fee or revenue share that has been agreed upon between the partner and Spryker.
The fee covers an initial round of testing and up to two rounds of re-tests in case the application fails to pass the earlier rounds. If more testing is required because the partner wasn't able to address issues with earlier rounds of testing, each additional round will require a fee of EUR 800/USD 1000.

Similarly, a fee of EUR 2500 / USD 3000 is applicable for threat modeling. This is an optional test, as stated earlier.

{% info_block infoBox "Info" %}

As stated earlier, Spryker will provide a few examples of vulnerabilities with the expectation that the partner does a thorough review of their app and fixes any issues across the app.

{% endinfo_block %}

## Threat modeling process

The following diagram demonstrates the threat modeling process:

![image 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/aop-security-assessment/image2.jpg)

## Security assessment process

The diagram below demonstrates the security assessment procedure:

![image 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/aop-security-assessment/image1.jpg)

## Review results

- As soon as a review is cleared, an app is marked as approved, and a badge is displayed on the marketplace listing.
- During subsequent full reviews (typically annually), the app will retain its badge while it is in the test cycles. Nevertheless, in the following scenarios, the badge will be removed, and customers notified of it:
	- The app developer fails to respond to repeated requests for annual re-assessments.
	- During the re-assessment,  the app fails repeatedly (about 5 times), and the app developer isn’t able to fix the reported issues.
- At this time, customers can choose to look at an alternate application or work with the developer to remedy the issues.
- Spryker can also decide to terminate the partner contract in such a scenario.

## Communication channels

- For the app developers to ask questions related to security, Spryker will create a (private) subforum in our [CommerceQuest](https://commercequest.space/) community platform. Security experts will monitor this channel and respond to the questions.
- Communication during individual assessments would be handled through emails.
- In cases where a discussion is needed to resolve open questions, a call can be set up between the developer and Spryker security experts.

## Approved tools and scanners

Spryker recommends using the following approved tools and scanners:

- [Burp Suite](https://portswigger.net/burp), [ZAP](https://www.zaproxy.org/), [Netsparker](https://www.netsparker.com/plp/dast/), [Acunetix](https://www.acunetix.com/plp/dast/), [Rapid7](https://www.rapid7.com/) as DAST tools.
- [Checkmarx](https://checkmarx.com/), [Veracode](https://www.veracode.com/products/binary-static-analysis-sast), [Micro Focus Fortify SCA](https://www.microfocus.com/en-us/cyberres/application-security/static-code-analyzer), [SonarQube](https://www.sonarsource.com/), [Snyk](https://snyk.io/product/snyk-code/), [Kuiwan](https://www.kiuwan.com/code-security-sast/) for static code analysis/code scanner (PHP, JS, Java, Python, Go, Ruby, Scala).

## Resources

Security assessment recommendations are created based on the following guides and practices:

- [OWASP Top-10](https://owasp.org/www-project-top-ten/)
- [OWASP Web Security Testing guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP Secure Coding Practices - Quick Reference Guide](https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf)
- [OWASP Security Knowledge Framework](https://owasp.org/projects/spotlight/historical/2021.02.03/)
