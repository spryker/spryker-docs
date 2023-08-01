---
title: Check if ZED endpoints split into BackendApi, BackendGateway, and Backoffice
description: Assess if ZED endpoints are split into BackendApi, BackendGateway and Backoffice.
template: howto-guide-template
---

In this step, you need to check

## Resources for assessment

Backend

## Description

1. In the `public` folder of the project's root folder, check if `BackendApi`, `BackendGateway`, and `Backoffice` folders with `index.php` entry points inside exist.
2. Check if separate endpoint bootstraps are [integrated](/docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html).

## Formula for calculating the migration effort

Approximately 1d for splitting the endpoints.
