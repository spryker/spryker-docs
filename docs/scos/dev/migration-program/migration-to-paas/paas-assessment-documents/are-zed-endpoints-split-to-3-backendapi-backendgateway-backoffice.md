---
title: Are ZED endpoints split into BackendApi, BackendGateway, and Backoffice?
description: This document allows you to assess if ZED endpoints are split to 3 (BackendApi, BackendGateway, Backoffice).
template: howto-guide-template
---



## Resources for assessment

Backend

## Description

1. In the `public` folder of the project's root, check if `BackendApi`, `BackendGateway`, and `Backoffice`
    folders with `index.php` entry points inside exist.
2. Ensure this [integration guide](/docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html) is implemented.

## Formula for calculating the migration effort

Approximately 1d if required packages are already installed.
