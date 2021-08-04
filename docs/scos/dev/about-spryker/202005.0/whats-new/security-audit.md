---
title: Security Audit
originalLink: https://documentation.spryker.com/v5/docs/security-audit
redirect_from:
  - /v5/docs/security-audit
  - /v5/docs/en/security-audit
---

Between Oktober 7th and November 22nd 2019 SektionEins performed a source code audit and penetration test of the two variants of the Spryker Framework, called Spryker B2B and Spryker B2C.

[SektionEins](https://www.sektioneins.de/) conducted the audit.

The evaluation of the Commerce OS was done without having prior knowledge of the source code, to protect it from attackers. Where it was the case, the found vulnerabilities were verified using the B2B and B2C Demo Shops. See the [Demo shops](https://documentation.spryker.com/docs/en/demoshops) article for more details.

Here is the summary of the security audit report:
@(Embed)(https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/Summary-Report-Spryker-B2B-B2C-201907.0.pdf){height="320" width="640"}

## Procedure
The security audit followed the steps below:

* **Source code audit**
This step mainly consisted of manual reading the source code with added support from using pattern scanning tools that search for specific functions known to add vulnerabilities to the system.

* **Penetration testing**
The Spryker Commerce OS was tested manually as well as with automated attack tools to detect the most obvious security issues.

* **Risk assessment**
A risk evaluation was performed on all the vulnerabilities that were found during the previous two steps.

## Commerce OS Security Audit Results
During the source code audit and penetration testing no actual vulnerabilities could be identified within the Spryker code. Most of the findings are either marked as comment or have only low and medium impact. The functional problems are related to permissive regular expressions, unsafe file creation, instantiation of objects and problems with some missing but recommended HTTP headers.

The safe use of functions and the lack of critical vulnerabilities such as SQL injection and Cross-Site Scripting shows that the frameworks seem robust against a great range of attacks. The source code of Spryker is well structured and easy to read and extend. We uses a functionality to make sure that no critical PHP functions are used which can easily be extended to cover other probable issues. It also contains [PHPStan](https://github.com/phpstan/phpstan), a static analysis tool for PHP code.

For each of the security vulnerabilities, a detailed risk analysis has been performed that is documented throughout the report. For more information, please reach out for a more extended version of this report to [Spryker Systems](mailto:academy@spryker.com).

See [Secure Coding Practices](https://documentation.spryker.com/docs/en/secure-coding-practices) for a list of secure coding recommendations.
