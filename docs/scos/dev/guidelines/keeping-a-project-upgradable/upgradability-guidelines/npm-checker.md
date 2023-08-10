---
title: Npm checker
description: Reference information for evaluator tools.
template: howto-guide-template
---

This checker executes the `npm audit` command on a project code and provides the list of npm packages vulnerabilities.

## Problem description

Frontend packages play an integral role in building modern web applications. Since these packages are created by different developers and teams, they can inadvertently include vulnerabilities that could be exploited by malicious actors to compromise the security and functionality of an application.

The npm vulnerabilities checker addresses this concern by actively scanning and identifying potential vulnerabilities in frontend packages. It accomplishes this by comparing the versions of packages used in a project against a continuously updated database of known vulnerabilities. When a package with a known vulnerability is detected, the checker alerts developers, provides information about the nature of the vulnerability, the potential risks it poses, and any recommended actions to help mitigate the threat.

By using the npm vulnerabilities checker with the Evaluator, developers can safeguard their applications against security breaches and ensure that they are using the latest and most secure versions of frontend packages. This approach helps maintain the integrity of web applications and provides developers with the necessary information to make informed decisions about the packages they include in their projects.

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
 
Message: [critical] Prototype pollution in webpack loader-utils 
         https://github.com/advisories/GHSA-76p3-8jx3-jpfq      
 Target: loader-utils  


Read more: https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html
```