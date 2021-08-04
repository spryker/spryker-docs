---
title: Penetration test executive summary
originalLink: https://documentation.spryker.com/2021080/docs/penetration-test-executive-summary
redirect_from:
  - /2021080/docs/penetration-test-executive-summary
  - /2021080/docs/en/penetration-test-executive-summary
---

During October and November 2020 the “Spryker Commerce B2C” & “Spryker Commerce
B2B” of Spryker Systems GmbH were tested for security vulnerabilities and risks. The penetration testers of Port Zero GmbH rated all security vulnerabilities and gave tips for improving and fixing the issues in Penetration test report. 

The penetration test was conducted voluntarily and is based on the recognized industry standard of the "OWASP Testing Guide v4.1 (2020)" as well as on the "Implementation Concept for Penetration Tests" of the German Federal Office for Information Security.
Overall, the security of *Spryker Commerce B2C* and *Spryker Commerce B2B* gave a positive impression. The penetration test revealed some information leakages, including subdomain names, software in use, version numbers, and TCP timestamps (all available without login). However, regarding the transport layer security (TLS), a very high security standard (see Appendix) is in place. The security of the central authentication mechanisms and session management is working well.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/What's+new/Security+audit/penetration-test-executive-summary.png){height="" width=""}

During the penetration test a few medium and high rated vulnerabilities such as weak password policies, persistent Cross-Site-Scripting (XSS) and Cross-Site-Request-Forgery (CSRF) were discovered. Due to the general security concept it was not possible to harm the security in such a manner that the server or complete was taken over. There are several mitigation mechanisms like security header in place and it is made use of best practice like using secure and httpOnly flag on each cookie.
In summary, the security of the shop systems is ensured by effective protection measures and can be enhanced at some points.

For each of the security vulnerabilities, a detailed risk analysis has been performed that is documented throughout the report. For more information, please reach out for a more extended version of this report to Spryker Systems.

