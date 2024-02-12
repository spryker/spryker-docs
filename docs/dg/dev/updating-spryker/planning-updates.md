---
title: Planning updates
description: Learn how to plan updates in your development process
last_updated: Apr 3, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/dev/updating-spryker/installing-features-and-updating-modules.html
- /docs/scos/dev/updating-spryker/plan-updates.html
---

This section provides recommendations on how you can build a process around updating your Spryker project, so you can plan, estimate, and continuously deliver updates, just like any feature you are building.

According to the statistics from 2019, Spryker is doing *12 releases of individual modules per day*. So if you haven't done an update for a while (3+ months), there are a lot of things to be updated. If you approach Spryker update as an "everything at once" task, you may end up with a quite time-consuming routine that lasts a couple of iterations, conflicting with the main feature development process.

{% info_block infoBox %}

To see why you have something installed, and why something must not be installed, run `composer why` and `composer why-not` commands, respectively.

{% endinfo_block %}

To streamline your update process, prepare for it. First of all, check how big your update is going to be by following the steps below.

## Check all outdated packages

Check for outdated packages:

```BASH
php -d memory_limit=-1 composer.phar outdated | grep spryker
```

The command returns a list of outdated Spryker packages. It gives you a clear picture of what is outdated, how many majors, minors, and bugfixes you have, and lets you estimate the effort for the update. See [Semantic Versioning: Major vs. Minor vs. Patch Release](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html) for information about the module release types.
As any feature update can take a while, the best approach is to split the update into deliverable chunks.

## Build up update iterations

From the list of the outdated packages, you've got in the previous step, create the update iterations. We recommend including the following number of updates into each of the update iterations:
* 30+ bugfix updates or
* around 10 minor updates or
* 1-5 major updates

The numbers depend on how many customizations for the respective modules you've done on your project or how complicated the migration effort is.

## Plan, estimate, and prioritize

Like with any other task, you can prioritize and estimate the update iterations. You can also distribute them across different sprints and share them between several team members, mixing in features required from the business perspective.

## Next steps

[Installing features and updating modules](/docs/dg/dev/updating-spryker/installing-features-and-updating-modules.html)
