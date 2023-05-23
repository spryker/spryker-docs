---
title: Test coverage: Is critical custom functionality of E-com flow covered?
description: This document allows you to assess if critical custom functionality of E-com flow is covered with tests.
template: howto-guide-template
---

# Test coverage: Is critical custom functionality of E-com flow covered?

{% info_block infoBox %}

## Resources for assessment Backend

{% endinfo_block %}

## Description

Do a code review of the archived project received as part of the prerequisites and identify if the following functionalities
were covered with tests:
* Third-party integrations.
* Data management-related features:
    * import;
    * export;
    * calculation.

These functionalities have to be covered with at least one type of testing from the list: unit, functional, behavioural.
It’s acceptable to have other testing technologies except for default codeception, for example, Behat, phpspec etc…

## Formula for calculating the migration effort

Approximately 1 day per functionality/module.
