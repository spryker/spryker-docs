---
title: Security Audit
originalLink: https://documentation.spryker.com/v3/docs/security-audit
redirect_from:
  - /v3/docs/security-audit
  - /v3/docs/en/security-audit
---

<!--used to be: http://spryker.github.io/getting-started/security-audit-results/-->
The first part of the security audit on Spryker Commerce OS was performed  between September 26th and October 1st, 2018, and the second part between November 7th and December 8th, 2018.

[SektionEins](https://www.sektioneins.de/) conducted the audit.

The evaluation of the Commerce OS was done without having prior knowledge of the source code, to protect it from attackers. Where it was the case, the found vulnerabilities were verified using the B2B and B2C Demo Shops. See the [Demo shops](https://documentation.spryker.com/v4/docs/demoshops) article for more details.

{% info_block warningBox %}
All of the high-risk vulnerabilities and almost all of the medium risk vulnerabilities after the security audit have already been fixed in the version as of April 10th, 2019.
{% endinfo_block %}

You can view a [summary of the security audit report](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/Summary-Report-Spryker-B2B-B2C.pdf).

## Procedure
The security audit followed the steps below:

* **Source code audit**
This step mainly consisted of manual reading the source code with added support from using pattern scanning tools that search for specific functions known to add vulnerabilities to the system.

* **Penetration testing**
The Spryker Commerce OS was tested manually as well as with automated attack tools to detect the most obvious security issues.

* **Risk assessment**
A risk evaluation was performed on all the vulnerabilities that were found during the previous two steps.

## Commerce OS Security Audit Results
During the source code audit, no actual vulnerabilities could be identified while the penetration test revealed some problems, mainly Cross-Site Scripting (XSS). Other problems included outdated libraries and dependencies and some missing but recommended HTTP headers.

The safe use of functions and the lack of critical vulnerabilities such as SQL injection show that the framework seems very robust against a vast range of attacks. The source code of Spryker Commerce OS application is well structured and easy to read and extend. We use the functionality to make sure that no critical PHP functions are used which can easily be extended to cover other probable issues.

To enforce the secure coding practices, our team has improved a custom code sniffer, that prevents usage of potentially vulnerable code patterns. You can find an overview of the sniffer tool in the [Code Sniffer](/docs/scos/dev/features/202001.0/sdk/development-tools/code-sniffer) article. We recommend using a code sniffer when developing a project that uses our Commerce OS.

For each of the security vulnerabilities, a detailed risk analysis has been performed that is documented throughout the report. For more information, please reach out for a more extended version of this report to [Spryker Systems](mailto:academy@spryker.com).

See [Secure Coding Practices](/docs/scos/dev/developer-guides/202001.0/development-guide/guidelines/coding-guidelines/secure-coding-p) for a list of secure coding recommendations.
