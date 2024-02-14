---
title: Secure Coding Practices (External packages)
description: Unsafe coding practices can make the software application vulnerable to theft of sensitive data. In this article, we’ll present a series of coding practices that we recommend using when developing an e-commerce application using Spryker Commerce OS, that will keep your software solution secured.
last_updated: Feb 02, 2024
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/secure-coding-practices
originalArticleId: 8c51239e-377e-427a-9d1f-4d15c355fa3c
redirect_from:
related:
  - title: Code Architecture Guide
    link: docs/scos/dev/guidelines/coding-guidelines/code-architecture-guide.html
  - title: Code Quality
    link: docs/scos/dev/guidelines/coding-guidelines/code-quality.html
  - title: Code style guide
    link: docs/scos/dev/guidelines/coding-guidelines/code-style-guide.html
  - title: Secure Coding Practices
    link: docs/scos/dev/guidelines/coding-guidelines/secure-coding-practices.html
---

## How to add new external package to your project

Sometimes you would like to add a new external package to your project. In this case check our doc to make sure that your project is secure.

### Check security (now and future)

1. Check that the package has no known security vulnerabilities. 
2. Add an automated SAST&SCA tool to your CI/CD to check it regularly for all the packages.

### Check with your Legal (now and future)

Every package comes with a license.
1. Check with your legal team that you can use the package with its license.
2. Add an automated tool to your CI/CD to check it regularly for all the packages.

We can recommend [Snyk](https://snyk.io/) for all the stated above actions. But you are free to use any other tool. 
