---
title: Npm checker
description: Reference information for evaluator tools.
template: howto-guide-template
---

This checker executes the `npm audit` command on a project code and provides the list of npm packages vulnerabilities.

## Problem description

Some project npm dependencies could contain some known vulnerabilities that should be fixed by updating the package version.

## Example of an evaluator error message

```sh
===========
NPM CHECKER
===========

Message: [high] d3-color vulnerable to ReDoS
         https://github.com/advisories/GHSA-36jr-mh4h-2g58
 Target: d3-color

Message: [high] Cross-realm object access in Webpack 5
         https://github.com/advisories/GHSA-hc6q-2mpp-qw7j
 Target: webpack


Read more: https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html
```