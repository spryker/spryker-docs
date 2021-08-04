---
title: Handling security issues
originalLink: https://documentation.spryker.com/v1/docs/handling-security-issues
redirect_from:
  - /v1/docs/handling-security-issues
  - /v1/docs/en/handling-security-issues
---

If you found a security issue in a Spryker Product, please report it to us.

## Reporting a Security Issue

Please do not use public AHA Ideas, public Slack channels, or other public channels to report a security issue, instead please send an e-mail to security (at) spryker.com and include system configuration details, reproduction steps, and received results. Your e-mail will be forwarded to our internal team and we will confirm that we received your e-mail and ask for more details if needed.

## How are we handling these Reports

1. We try to confirm the issue and inform the reporter about it.
2. We determine and discuss with the reporter the severity and impact of the issue.
3. To protect our customers, we are not going to disclose the issue until we develop a fix and be ready to make it publicly available.
4. We develop a fix and publish relevant details:
    * Spryker Core (under `vendor/spryker*`)
        * If applicable, we prepare a code snippet, that allows to fix the vulnerability on the project level immediately 
        * We prepare a code release
    *    We verify the fix with the reporter
    *    The security code release is not marked in any special way in the module release notes
        * We contact our customers and inform them about the update available via the security newsletter
        * After at least 7 days we are publishing the same information on our documentation website
    * Spryker Demo Shops (spryker-shop/suite, spryker-shop/b2b-demo-shop, spryker-shop/b2c-demo-shop)
        * We prepare a code snippet, that allows to fix the vulnerability on the project level immediately
        * We verify the fix with the reporter
    *    We contact our customers and inform them about the patch available via the security newsletter
        * After 7 days we release the fix in public Demo Shops
        * After at least 7 days we are publishing the information about the issue on our documentation website
5. We will not send any of the above notifications on Friday, Saturday or Sunday to allow subscribers to have at least 1 working day to react.
