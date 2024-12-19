---
title: Secure coding practices for external packages
description: Coding practices for developing your app to ensure its security with external packages for your Spryker based projects.
last_updated: Feb 02, 2024
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/secure-coding-practices
originalArticleId: 8c51239e-377e-427a-9d1f-4d15c355fa3c
redirect_from:
related:
  - title: Code Architecture Guide
    link: docs/dg/dev/guidelines/coding-guidelines/code-architecture-guide.html
  - title: Code Quality
    link: docs/dg/dev/guidelines/coding-guidelines/code-quality.html
  - title: Code style guide
    link: docs/dg/dev/guidelines/coding-guidelines/code-style-guide.html
  - title: Secure Coding Practices
    link: docs/dg/dev/guidelines/coding-guidelines/secure-coding-practices.html
---
Unsafe coding practices can expose your application to the theft of sensitive data. In this document, we recommend coding practices for developing your app to ensure its security.

## How to add new external package to your project

Before adding a new external package to your project, make sure to comply with the following security recommendations:

### Regularly check security

1. Check that the package has no known security vulnerabilities. 
2. To regularly check all packages, add an automated SAST&SCA tool to your CI/CD.

### Perform regular compliance checks

Every package comes with a license. Do the following:
1. Check with your legal team that you can use the package with its license.
2. To regularly check all packages, add an automated tool to your CI/CD.

We recommend [Snyk](https://snyk.io/) for all the listed recommendations. However, you are free to use any other tool. 