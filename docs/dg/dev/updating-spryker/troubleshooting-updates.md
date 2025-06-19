---
title: Troubleshooting updates
description: Learn how to troubleshoot and resolve common update issues and errors within your Spryker based projects.
last_updated: Jun 16, 2021
template: concept-topic-template
redirect_from:
- /docs/scos/dev/updating-spryker/troubleshooting-updates.html
- /docs/scos/dev/updating-spryker/preventing-update-issues.html
---

This document contains common issues related to updates and provides solutions for fixing them. If an issue is not on the list, and you need help, [contact us](#get-help-with-an-update).

## You see Spryker Code Sniffer updates

If you see Code Sniffer updates from Spryker, check if the new code sniffer rules were added. Investigate what they are doing and decide if you need them. If you don't need the rules, exclude them from the list.

{% info_block infoBox %}

In some projects, all Spryker sniffs are included automatically.

{% endinfo_block %}

To exclude or include sniff rules, in `ruleset.xml`, adjust the following section:

```xml
<rule ref="vendor/spryker/code-sniffer/Spryker/ruleset.xml">
	<exclude name="Spryker.Factory.NoPrivateMethods"/>
  ...
</rule>
```

## Nothing to install or update or your requirements could not be resolved

You know there is a new version, but Composer returns the following message:

```BASH
...
Updating dependencies (including require-dev)
Nothing to install or update....
```

Or you get an error similar to the following:

```BASH
Updating dependencies (including require-dev)
Your requirements could not be resolved to an installable set of packages.
Problem 1
- Conclusion: don't install silex/web-profiler v1.0.8
- Conclusion: remove symfony/stopwatch v4.1.7
- Installation request for silex/web-profiler ~1.0.8 -> satisfiable by silex/web-profiler[1.0.x-dev, v1.0.8].
- Conclusion: don't install symfony/stopwatch v4.1.7
....
```

Most likely, the update requires some other dependencies that currently can not be satisfied in the project.
To check what is missing, use the `composer why-not` command. Example:

```BASH
php -d memory_limit=-1 composer.phar why-not "spryker/symfony:^3.2.0"
```

Composer returns what is needed for the update:

```BASH
spryker/symfony 3.2.0 requires symfony/stopwatch (^4.0.0)
myProject/platform dev-develop does not require symfony/stopwatch (but v2.8.34 is installed)
```

Update the required packages, then try updating the original module again.

## Inherited class is updated on the core level

One of the issues projects often face during an upgrade is when a Spryker class that was inherited on the project level gets updated on the core level. This can result in code syntax issues or logical issues, which you need to fix manually. To avoid such issues, follow the [Spryker Extension best practices](/docs/dg/dev/backend-development/extend-spryker/extend-spryker.html).

## Get help with an update

Let us know if anything goes wrong with an update:

- You find an issue in the code while reviewing the diff in a Spryker repo.
- After running automated tests or testing the website, you find an issue that broke the website. If it's not a project-related conflict, and other projects can potentially be affected,  report the issue as soon as you can.
- There are missing steps in an upgrade guide.

Reach out to us using one of the following channels:
- Support and community: share your issue or solution and learn from others in our [community slack](https://sprykercommunity.slack.com/join/shared_invite/zt-gdakzwk3-~B_gJXbUxMdzkBwTQVjNgg#/).
- Create a request on our [support portal](https://support.spryker.com).
- Contribute to code: share your fix with us. We can implement the fix and make it available for other projects. To contribute, create a pull request on the module's [Github repository](https://github.com/spryker).
- Contribute to the docs: if you found any issue in an upgrade guide or any other document,  you can edit the document by clicking **Edit on GitHub** next to the document's name.
