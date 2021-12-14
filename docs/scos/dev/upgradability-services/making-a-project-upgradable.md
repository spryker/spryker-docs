---
title: Keeping a project upgradable
description: Learn how to make your project upgradable
last_updated: Nov 25, 2021
template: concept-topic-template
---

Spryker can be highly customizable to fit each unique business need.

While developers are encouraged to customize, it’s important to understand that customizations may directly impact your compatibility with new releases, including minor and patches.

This documentation aims at helping you customize your Spryker solution in a Spryker compliant way, giving you the flexibility to build your unique solution while ensuring that you minimize any incompatibilities with future releases.


## Customization strategies

There are different strategies you can use to customize your solution.

Detailed information is available [here](/docs/scos/dev/guidelines/project-development-guidelines.html) and [here](/docs/scos/dev/back-end-development/extending-spryker/extending-the-core.html).

| **Customization method** | **Current Upgrade support** | **Notes**                                                    |
| :----------------------- | :-------------------------- | :----------------------------------------------------------- |
| Configurations           | HIGH                        | Existing modules are untouched (only extended)               |
| Plug & Play              | HIGH                        | Existing modules are untouchedBuild your own plugins for existing plugin stacks in separate Project modulesCreate new module with new plugin and replace the default Spryker plugin with the plugin of the new module |
| Project modules          | N/A                         | Spryker modules are untouchedCreate new modules              |
| Code extension           | **LOW**                     | 3 ways to extend code:replacement classinheritance objectcomposition |

It is important to understand that if you do a core extension, you are behind the stable internal APIs, so there is no guarantee that the extended class is not modified, renamed or even non-existing in the next release.

So the important question is: How can you safely use Spryker extension points to build your custom solution while keeping your platform upgradable?

## What extension points are available at Spryker?



## Customization cases & impact on upgradability

Here we list the most frequent customization points & our best practices

### Customization Case/Method 1



#### Impact on upgradability

E.g. Can’t apply minor and patches safely

#### How to make this customization in a compliant, upgradable way? (Guideline)

i.e. what coding principles should I follow

#### Example

Check out this detailed example – [link to upgradability guidelines with concrete principles]
