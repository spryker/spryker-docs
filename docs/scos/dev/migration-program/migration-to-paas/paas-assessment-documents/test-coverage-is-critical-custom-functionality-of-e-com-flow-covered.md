---
title: Test coverage: Is critical custom functionality of E-com flow covered?
description: This document allows you to assess if critical custom functionality of E-com flow is covered with tests.
template: howto-guide-template
---

Do a code review of the archived project received as part of the prerequisites and identify if the following functionalities were covered with tests:
* Third-party integrations.
* Data management-related features:
    * Import
    * Export
    * calculation

These functionalities must be covered with at least one type of testing:
* Unit
* Functional
* Behavioural

Apart from Codeception, other testing technologies, like Behat or phpspec, are acceptable.

## Resources for assessment

Backend

## Formula for calculating the migration effort

Approximately 1 day per functionality and module not covered with tests.
