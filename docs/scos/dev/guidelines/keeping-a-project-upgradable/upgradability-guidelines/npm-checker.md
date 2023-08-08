---
title: Npm checker
description: Reference information for evaluator tools.
template: howto-guide-template
---

This checker executes the `npm audit` command on a project code and provides the list of npm packages vulnerabilities.

## Problem description

Some project npm dependencies could contain some known vulnerabilities that should be fixed by updating the package version.

## ## Example of an evaluator error message

```sh
===========
NPM CHECKER
===========

+---+-------------------------------------------------------------------------------------------------------+----------------+
| # | Message                                                                                               | Target         |
+---+-------------------------------------------------------------------------------------------------------+----------------+
| 1 | [moderate] Cross site scripting in datatables.net                                                     | datatables.net |
|   | https://github.com/advisories/GHSA-h73q-5wmj-q8pj                                                     |                |
+---+-------------------------------------------------------------------------------------------------------+----------------+
| 2 | [high] glob-parent before 5.1.2 vulnerable to Regular Expression Denial of Service in enclosure regex | glob-parent    |
|   | https://github.com/advisories/GHSA-ww39-953v-wcq6                                                     |                |
+---+-------------------------------------------------------------------------------------------------------+----------------+
| 3 | [high] Path Traversal: 'dir/../../filename' in moment.locale                                          | moment         |
|   | https://github.com/advisories/GHSA-8hfj-j24r-96c4                                                     |                |
+---+-------------------------------------------------------------------------------------------------------+----------------+
| 4 | [high] Moment.js vulnerable to Inefficient Regular Expression Complexity                              | moment         |
|   | https://github.com/advisories/GHSA-wc69-rhjr-hc9g                                                     |                |
+---+-------------------------------------------------------------------------------------------------------+----------------+
| 5 | [high] Inefficient Regular Expression Complexity in nth-check                                         | nth-check      |
|   | https://github.com/advisories/GHSA-rp65-9cf3-cjxr                                                     |                |
+---+-------------------------------------------------------------------------------------------------------+----------------+
| 6 | [moderate] Regular Expression Denial of Service in postcss                                            | postcss        |
|   | https://github.com/advisories/GHSA-566m-qj78-rww5                                                     |                |
+---+-------------------------------------------------------------------------------------------------------+----------------+
| 7 | [moderate] semver vulnerable to Regular Expression Denial of Service                                  | semver         |
|   | https://github.com/advisories/GHSA-c2qf-rxjj-qqgw                                                     |                |
+---+-------------------------------------------------------------------------------------------------------+----------------+

Read more: https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html
```