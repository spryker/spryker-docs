---
title: Merge docs pull requests
description: Learn how you can propose your changes to a pull request
last_updated: May 18, 2024
template: howto-guide-template
---

This document describes how to merge pull requests (PRs) without a Technical Writer's review. This should only happen in rare cases, for example—when you need to merge an urgent PR. When you merge a PR without a Technical Writer's review, it's your responsibility to make sure the PR is reviewed retrospectively.

To merge a docs PR, take the steps in the following sections.

## Add changes

To retain the quality of information architecture in the docs, you can only merge PRs that introduce changes to existing docs. For instructions on adding changes, see [Edit the docs locally](/docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-locally.html).

## Optional: Review changes locally

When merging without a review, we recommend building the docs locally and checking the updated pages for visual and formatting bugs. If you find any bugs, you must fix them before merging the PR. For instructions on running docs, see [Run the docs locally](/docs/about/all/about-the-docs/run-the-docs-locally.html).

## Add labels

Add the following labels to the PR:

* **Updated**: because you can merge PRs with updated and not new docs.
* **Bypassed TW Review**: this lets us track and retrospectively review such PRs.

## Fix CI

The CI ensures no bugs or broken links are deploy to the production website. Before you merge a PR, you must wait for all the CI checks to finish. If a check is failed, you must fix the error. You can merge a PR when the following checks are successful:

| CI CHECK | DESCRIPTION |
| Enforce PR labels / enforce-label | Checks for required labels. To learn about the required labels, see [Add labels](#add-labels). |
| CI / Build | Checks if the website can be built with your changes. |
| CI / Page validation | Checks for bugs in the pages. |
| CI / Links validation (check_about) | Checks for 404s in the About Spryker section. |
| CI / Links validation (check_ca) | Checks for 404s in the Cloud Administration section. |
| CI / Links validation (check_pbc) | Checks for 404s in the Packaged Business Capabilities section. |
| CI / Links validation (check_dg) | Checks for 404s in the Development Guide section. |

### Fixing build and page validation

When one of these fails, you need to check the details for the specific errors and fix them.
