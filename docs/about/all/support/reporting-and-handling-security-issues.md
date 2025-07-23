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

Spryker is committed to maintaining a secure platform for all users. This document describes how to report security issues and what to expect during our security issue review and resolution process.

## Reporting a security issue

To report a security issue, always send an email to [security@spryker.com](mailto:security@spryker.com). When submitting a report, follow [Vulnerability report submission guidelines](#vulnerability-report-submission-guidelines) to help us understand and process the issue effectively. Our internal security team will get back to you with a confirmation and any follow-up questions if necessary.

Do not use public Slack channels or any other public forums to report security issues.

## Vulnerability Disclosure Program

Spryker operates a Vulnerability Disclosure Program (VDP) through HackerOne, enabling security researchers to report potential security vulnerabilities responsibly. To participate in the VDP program and submit vulnerability reports via the HackerOne platform, contact us at [security@spryker.com](mailto:security@spryker.com).

## Vulnerability report submission guidelines

To help streamline our review process, ensure your submission meets the following criteria:

- Submit reports in English
- Submit one vulnerability per report, unless multiple vulnerabilities need to be chained to demonstrate impact
- Provide a clear description of the vulnerability
- Describe detailed steps to reproduce the issue
- Provide proof of exploitability such as screenshots or video
- Describe the potential impact on users or the organization
- Provide a proposed CVSSv3.1 vector and score, excluding environmental and temporal modifiers
- List URLs and affected parameters
- Include any other vulnerable URLs, additional payloads, and Proof-of-Concept code
- Specify the browser, OS, and application version used during testing
- Include full URLs and do not use URL shorteners such as tiny URL
- Attach all evidence and supporting materials directly in the report; don't user external file hosting services

## How we are handling security reports

We process all reports as follows:

1. Confirm the reported issue and notify the reporter.
2. Assess the severity and impact in discussion with the reporter.  
3. Develop a fix and coordinate publication:
- For Spryker Core (`vendor/spryker*`):
  - Prepare a project-level code snippet if applicable
  - Create a code release
  - Verify the fix with the reporter
  - Inform customers via the security newsletter
  - After at least seven working days, publish the fix details in the docs
    Security releases are not mentioned in product release notes
- For Spryker Demo Shops (`spryker-shop/suite`, `b2b-demo-shop`, `b2c-demo-shop`):
  - Prepare a project-level code snippet
  - Verify the fix with the reporter
  - Inform customers via the security newsletter
  - Release the fix in public Demo Shops after seven working days
  - Publish issue details in the docs after at least seven working days

We avoid sending notifications on Friday, Saturday, or Sunday to ensure recipients have at least one working day to act.







































