---
title: Npm checker
description: Learn about the NPM checker and how it identifies and reports security vulnerabilites in npm dependencies within your Spryker project.
template: howto-guide-template
last_updated: Oct 24, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html
---

This checker identifies and reports security vulnerabilities in npm dependencies.

## Problem description

Because frontend packages are created by different developers and teams, they can  include vulnerabilities that can be exploited by malicious actors to compromise the security and functionality of an application.

The npm vulnerabilities checker addresses this concern by actively scanning and identifying potential vulnerabilities in frontend packages. It accomplishes this by comparing the versions of packages used in a project against a continuously updated database of known vulnerabilities. When a package with a known vulnerability is detected, the checker gives an alert, provides information about the nature of the vulnerability, potential risks, and the recommended actions to help mitigate the threat.

By using the npm vulnerabilities checker with the Evaluator, you can safeguard  your applications against security breaches and ensure that you are using the latest and  secure versions of frontend packages.

## Example of an evaluator error message

```sh
===========
NPM CHECKER
===========

Message: [critical] Prototype pollution in webpack loader-utils
         https://github.com/advisories/GHSA-76p3-8jx3-jpfq      
 Target: loader-utils  

Message: [high] d3-color vulnerable to ReDoS
         https://github.com/advisories/GHSA-36jr-mh4h-2g58
 Target: d3-color

Message: [high] Cross-realm object access in Webpack 5
         https://github.com/advisories/GHSA-hc6q-2mpp-qw7j
 Target: webpack

Read more: https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html
```

## Configuration

There are four levels of security vulnerabilities:
* Low
* Moderate
* High
* Critical

By default, the npm checker evaluates the code against the high and critical levels. To define the levels to be checked, create or update `tooling.yml` in the project's root directory. Here's an exemplary configuration for evaluating against all vulnerability errors:

```yaml
evaluator:
    checkerConfiguration:
        - checker: NPM_CHECKER
          var:
              ALLOWED_SEVERITY_LEVELS: [low, moderate, high, critical]
```

## Resolve the error

To resolve the issue, update the npm dependencies with vulnerabilities to the versions with the vulnerability issues fixed.


## Run only this checker

To run only this checker, include `NPM_CHECKER` into the checkers list. Example:

```bash
vendor/bin/evaluator evaluate --checkers=NPM_CHECKER
```
