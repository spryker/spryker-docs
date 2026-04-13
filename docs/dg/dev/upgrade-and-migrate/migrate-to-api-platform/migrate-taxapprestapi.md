---
title: "Migrate TaxAppRestApi to API Platform"
description: Step-by-step guide to migrate the TaxAppRestApi module to the API Platform TaxApp module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `TaxAppRestApi` Glue module to the API Platform `TaxApp` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `TaxAppRestApi` module provided a webhook processor endpoint for tax calculation callbacks from external tax services. This is now served by the API Platform `TaxApp` module.

## 1. Update module dependencies

```bash
composer require spryker/tax-app:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `TaxAppRestApi` module did not register any relationship plugins. No relationship changes are needed.
