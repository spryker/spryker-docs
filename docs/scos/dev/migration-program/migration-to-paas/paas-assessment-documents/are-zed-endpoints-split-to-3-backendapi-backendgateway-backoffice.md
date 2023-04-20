---
title: Are ZED endpoints split to 3 (BackendApi, BackendGateway, Backoffice)?
description: This document allows you to assess if ZED endpoints are split to 3 (BackendApi, BackendGateway, Backoffice).
template: howto-guide-template
---

# Are ZED endpoints split to 3 (BackendApi, BackendGateway, Backoffice)?

{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

1. Navigate to `public` folder in the root of the project, if you don’t see **BackendApi**, **BackendGateway**, and **Backoffice**
    folders with `index.php` entry points inside then it means endpoints are not split.
2. Ensure this [integration guide](/docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html#update-modules-using-composer) is implemented.

## Formula

Approximately 1d if required packages are already installed.
