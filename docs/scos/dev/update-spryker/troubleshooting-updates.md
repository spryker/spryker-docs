---
title: Troubleshooting updates
description: Common update issues and how to solve them
last_updated: Jun 16, 2021
template: concept-topic-template
---

This section contains common issues related to updates and provides solutions on how to fix them. If an issue is not on the list, and you need help, [contact us](#let-us-know).

### I see Spryker Code Sniffer updates

If you see Code Sniffer updates from Spryker, check if the new code sniffer rules were added. Investigate what they are doing and decide if you need them. If you don't need those rules, exclude them from the list.

{% info_block infoBox "Note" %}

In some projects, all Spryker sniffs might be included automatically.

{% endinfo_block %}

To exclude or include sniff rules, in `ruleset.xml`, adjust the following section:

```xml
<rule ref="vendor/spryker/code-sniffer/Spryker/ruleset.xml">
	<exclude name="Spryker.Factory.NoPrivateMethods"/>
  ...
</rule>
```

### Update is not possible

There can be several cases when the update is not possible:

#### Update is "ignored" by Composer

There may be situations when you know there is a new version, but Composer returns the following message:

```BASH
...
Updating dependencies (including require-dev)
Nothing to install or update....
```

Most likely, this means that the update requires some other dependencies that currently can not be satisfied in the project.
One of the ways to check what’s missing is to use `composer why-not` command like this:

```BASH
php -d memory_limit=-1 composer.phar why-not "spryker/symfony:^3.2.0"
```

Composer will return what exactly is needed:

```BASH
spryker/symfony 3.2.0 requires symfony/stopwatch (^4.0.0)
myProject/platform dev-develop does not require symfony/stopwatch (but v2.8.34 is installed)
```

Make sure to first update the packages that are required first, and then try updating again.

#### 2. Dependencies prevent package from updating

You might see a message like this one:

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

To understand what's missing, run `composer why-not` as in the previous step.

#### Complicated cases

Each situation requires a custom approach. If you have not found your solution here, but think it might help others, please feel free to add it here by clicking **Edit or Report** right under the title of this article.

## Let us know

Please let us know if anything goes wrong with your update:

* You find an issue in the code while reviewing the diff in a Spryker repo.
* After running automated tests or testing the website, you find an issue that broke the website. If it's not a project-related conflict, and other projects can potentially be affected, please report the issue as soon as you can.
* There are missing steps in an upgrade guide.

Reach out to us using one of the following channels:
* Support and community: share your issue or solution and learn from others in our [community slack](https://sprykercommunity.slack.com/join/shared_invite/zt-gdakzwk3-~B_gJXbUxMdzkBwTQVjNgg#/).
* Create a request on our [support portal](https://spryker.force.com/support/s/).
* Contribute to code: share your fix with us. We can implement the fix and make it available for other projects. To contribute, create a pull request on the module's [Github repository](https://github.com/spryker).
* Contribute to the docs: if you found any issue in an upgrade guide or any other document,  you can edit the document by clicking **Edit on GitHub** next to the document's name.
