---
title: Drive Usage and Support with Problems
description: Drive Usage and Support with Problems
last_updated: Jun 7, 2024
template: howto-guide-template
related:
  - title: Go to the Next Step.
    link: docs/dg/dev/third-party-module-development/distribute.html
---

We would recommend 4 steps how to improve usage of your module:
1. Provide complete integration guide for you module in **README.md** file.
   - You can find an example [here](/docs/pbc/all/data-exchange/{{site.version}}/install-and-upgrade/install-the-data-exchange-api.html#configure-the-scheduler)
   - It is important to:
     - Keep guide up to date for the latest release. (After all the steps executed, the functionality should work for the end user)
     - Have **Verification** step that clearly states how to check that everything is done properly and functionality works as expected.

2. If you do not have Support Portal or similar, we recommend to use https://docs.github.com/en/issues/tracking-your-work-with-issues/quickstart for collaboration with module users, mention (In **README.md** file of your module) how issues can be reported.
   - If you have domain specific requirements for the details needed from a module user to identify the issue, feel free to add them to the readme file.
3. If you have several Major (see https://semver.org/) releases, provide a migration guide for each of them.
   You can find an example [here](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-categorygui-module.html)
   It is important to:
      - Have migration for each **Major** version starting from 2nd.
      - Have **Verification** step that clearly states how to check that everything is done properly and functionality works as expected.

4: Request a review of your module from **Spryker** to obtain **Verified by Spryker** badge, it will allow to promote it and increase trust from the end users into it.
   
   - **More details coming soon.**

5. Publish the module in Spryker Application Catalog
      
    - **More details coming soon.**