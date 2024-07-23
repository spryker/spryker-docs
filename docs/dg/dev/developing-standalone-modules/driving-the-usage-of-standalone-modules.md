---
title: Driving the usage of standalone modules
description: Drive Usage and Support with Problems
last_updated: Jun 7, 2024
template: howto-guide-template
related:
  - title: Go to the Next Step.
    link: docs/dg/dev/third-party-module-development/distribute.html
---

To drive usage of your standalone modules, we recommend covering the following points.

## Provide installation instructions

Provide complete, accurate and up-to-date installation instructions in README. For an example of installation instructions, see [Install the Data Exchange API](/docs/pbc/all/data-exchange/{{site.version}}/install-and-upgrade/install-the-data-exchange-api.html).

Make sure each section contains a verification step that clearly explains how to verify the changes are implemented correctly. After completing all the steps of an installation guide, for end users, the functionality should work as expected.


## Support users

Set up a support portal or use [GitHub issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/quickstart) to enable users to collaborate with you on problems and bugs. Include the instructions for submitting issues in your README. Make sure to mention any domain-specific details needed from a user to identify the issue.


## Provide migration instructions

If a module has multiple major releases, provide a migration guide for each of them. For an exmple of a migration guide, see [Upgrade the CategoryGUI module](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-categorygui-module.html). Make sure each section contains a verification step that clearly explains how to verify the changes are implemented correctly. After completing all the steps of an installation guide, for end users, the functionality should work as expected.

For more details about major releases, see [Semantic Versioning](https://semver.org/).


<!-- 4. Request a review of your module from **Spryker** to obtain **Verified by Spryker** badge, it will allow to promote it and increase trust from the end users into it.

   - **More details coming soon.**


5. Publish the module in Spryker Application Catalog

    - **More details coming soon.**


-->


## Next step

[Publish modules on Packagist](/docs/dg/dev/developing-standalone-modules/publish-standalone-modules-on-packagist.html)
