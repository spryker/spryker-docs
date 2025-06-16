---
title: Reporting and handling security issues
description: Use this article to learn how to report a security issue and to understand how we handle these reports.
last_updated: Jun 13, 2025
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/handling-security-issues
originalArticleId: f4e006a1-e49e-4d54-beac-f0cbea5ebff2
redirect_from:
- /docs/scos/user/intro-to-spryker/support/handling-security-issues.html
---

If you find a security issue in a Spryker product, report it to us.

## Reporting a security issue

Do not use public Slack channels or any other public forums to report security issues. Instead, send an email to [security@spryker.com](mailto:security@spryker.com). When submitting a report, be sure to follow the guidelines outlined below under 'Crafting a report' section to help us understand and address the issue effectively. Your message will be forwarded to our internal security team, and we will confirm receipt and follow up with any additional questions if necessary.

## Vulnerability Disclosure Program (VDP)

Spryker operates a Vulnerability Disclosure Program (VDP) through HackerOne, enabling security researchers to report potential security vulnerabilities responsibly. Researchers interested in participating in the VDP and submitting a vulnerability report via the HackerOne platform are encouraged to contact us by email at [security@spryker.com](mailto:security@spryker.com).

## Crafting a report

To help streamline our review process, ensure your submission meets the following criteria:

1. Submit one vulnerability per report, unless multiple vulnerabilities need to be chained to demonstrate impact
2. Provide a clear description of the vulnerability
3. Include detailed steps on how to reproduce the issue
4. Supply proof of exploitability (for example screenshots or video evidence)
5. Explain the potential impact on users or the organization
6. Provide a proposed CVSSv3.1 vector and score (excluding environmental and temporal modifiers)
7. List URLs and affected parameters
8. Include any other vulnerable URLs, additional payloads, and Proof-of-Concept code, if applicable
9. Mention the browser, OS, or application version used during testing
10. Do not use shortened URLs (for example tiny URLs) in your reports. Submit your findings in English. All evidence and supporting materials must be included directly within the report submission. Hosting files on external services is not permitted. Failure to adhere to these requirements may delay the evaluation of your submission. Additionally, when assessing reports, we prioritize contributions that positively enhance the security community. This is a key factor in our evaluation process.

## How we are handling security reports

1. We try to confirm the issue and inform the reporter about it.
2. We determine and discuss with the reporter the severity and impact of the issue.
3. To protect our customers, we are not going to disclose the issue until we develop a fix and be ready to make it publicly available.
4. We develop a fix and publish relevant details:
   - Spryker Core (under `vendor/spryker*`).
     - If applicable, we prepare a code snippet, which lets us fix the vulnerability on the project level immediately.
     - We prepare a code release.
   - We verify the fix with the reporter.
   - The security code release is not marked in any special way in the module release notes.
     - We contact our customers and inform them about the update available via the security newsletter.
     - After at least 7 working days we are publishing the same information on our documentation website.
   - Spryker Demo Shops (spryker-shop/suite, spryker-shop/b2b-demo-shop, spryker-shop/b2c-demo-shop).
     - We prepare a code snippet, that allows fixing the vulnerability on the project level immediately.
     - We verify the fix with the reporter.
   - We contact our customers and inform them about the patch available via the security newsletter.
     - After seven working days, we release the fix in public Demo Shops.
     - After at least seven working days we are publishing the information about the issue on our documentation website.
5. We do not send any of the above notifications on Friday, Saturday, or Sunday to let subscribers have at least one working day to react.
