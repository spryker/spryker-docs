---
title: "Migrate QuoteRequestsRestApi and QuoteRequestAgentsRestApi to API Platform"
description: Step-by-step guide to migrate the QuoteRequestsRestApi and QuoteRequestAgentsRestApi modules to the API Platform QuoteRequest and QuoteRequestAgent modules.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `QuoteRequestsRestApi` and `QuoteRequestAgentsRestApi` Glue modules to the API Platform `QuoteRequest` and `QuoteRequestAgent` modules.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

These two modules provided the following storefront endpoints:

| Endpoint | Operation | Old plugin | Source module |
|---|---|---|---|
| `GET /quote-requests` | List quote requests | `QuoteRequestsResourceRoutePlugin` | `QuoteRequestsRestApi` |
| `POST /quote-requests` | Create quote request | `QuoteRequestsResourceRoutePlugin` | `QuoteRequestsRestApi` |
| `PATCH /quote-requests/{id}` | Update quote request | `QuoteRequestsResourceRoutePlugin` | `QuoteRequestsRestApi` |
| `DELETE /quote-requests/{id}/cancel` | Cancel quote request | `QuoteRequestCancelResourceRoutePlugin` | `QuoteRequestsRestApi` |
| `PATCH /quote-requests/{id}/revise` | Revise quote request | `QuoteRequestReviseResourceRoutePlugin` | `QuoteRequestsRestApi` |
| `POST /quote-requests/{id}/send-to-customer` | Send quote request | `QuoteRequestSendResourceRoutePlugin` | `QuoteRequestsRestApi` |
| `POST /quote-requests/{id}/convert-to-cart` | Convert to cart | `QuoteRequestConvertResourceRoutePlugin` | `QuoteRequestsRestApi` |
| `GET /agent-quote-requests` | List quote requests (agent) | `QuoteRequestAgentsResourceRoutePlugin` | `QuoteRequestAgentsRestApi` |
| `PATCH /agent-quote-requests/{id}` | Update quote request (agent) | `QuoteRequestAgentsResourceRoutePlugin` | `QuoteRequestAgentsRestApi` |
| `DELETE /agent-quote-requests/{id}/cancel` | Cancel quote request (agent) | `QuoteRequestAgentCancelResourceRoutePlugin` | `QuoteRequestAgentsRestApi` |
| `PATCH /agent-quote-requests/{id}/revise` | Revise quote request (agent) | `QuoteRequestAgentReviseResourceRoutePlugin` | `QuoteRequestAgentsRestApi` |
| `POST /agent-quote-requests/{id}/send-to-customer` | Send to customer (agent) | `QuoteRequestAgentSendResourceRoutePlugin` | `QuoteRequestAgentsRestApi` |

These are now served by the API Platform `QuoteRequest` and `QuoteRequestAgent` modules.

## 1. Update module dependencies

```bash
composer require spryker/quote-request:"^X.Y.Z" spryker/quote-request-agent:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the versions that include the API Platform resources. Check the module changelogs for the exact versions.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `QuoteRequestsResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestsResourceRoutePlugin` |
| `QuoteRequestCancelResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestCancelResourceRoutePlugin` |
| `QuoteRequestReviseResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestReviseResourceRoutePlugin` |
| `QuoteRequestSendResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestSendResourceRoutePlugin` |
| `QuoteRequestConvertResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestConvertResourceRoutePlugin` |
| `QuoteRequestAgentsResourceRoutePlugin` | `Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentsResourceRoutePlugin` |
| `QuoteRequestAgentCancelResourceRoutePlugin` | `Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentCancelResourceRoutePlugin` |
| `QuoteRequestAgentReviseResourceRoutePlugin` | `Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentReviseResourceRoutePlugin` |
| `QuoteRequestAgentSendResourceRoutePlugin` | `Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentSendResourceRoutePlugin` |

## 3. Create the Pyz QuoteRequest Glue DependencyProvider

Create a new file `src/Pyz/Glue/QuoteRequest/QuoteRequestDependencyProvider.php` to wire resource data expander plugins:

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\QuoteRequest;

use Spryker\Glue\Discount\Plugin\QuoteRequest\DiscountQuoteRequestResourceDataExpanderPlugin;
use Spryker\Glue\MerchantProductOffer\Plugin\QuoteRequest\MerchantProductOfferQuoteRequestResourceDataExpanderPlugin;
use Spryker\Glue\QuoteRequest\QuoteRequestDependencyProvider as SprykerQuoteRequestDependencyProvider;

class QuoteRequestDependencyProvider extends SprykerQuoteRequestDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\QuoteRequestExtension\Dependency\Plugin\QuoteRequestResourceDataExpanderPluginInterface>
     */
    protected function getQuoteRequestResourceDataExpanderPlugins(): array
    {
        return [
            new DiscountQuoteRequestResourceDataExpanderPlugin(),
            new MerchantProductOfferQuoteRequestResourceDataExpanderPlugin(),
        ];
    }
}
```

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `QuoteRequestsRestApi` and `QuoteRequestAgentsRestApi` modules did not register any relationship plugins in `GlueApplicationDependencyProvider`. No relationship changes are needed.
