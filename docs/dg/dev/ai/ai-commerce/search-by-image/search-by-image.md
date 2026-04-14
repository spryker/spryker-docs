---
title: Search by Image
description: Technical overview of the Search by Image feature — architecture, AiFoundation integration, configuration options, and plugin structure.
last_updated: Apr 10, 2026
template: concept-topic-template
---

Search by Image lets storefront customers find products by uploading a photo. AI analyzes the image, identifies a search term, and redirects the customer to either a catalog search results page or the first matching product detail page (PDP).

For the business overview and storefront usage, see [Search by Image](/docs/pbc/all/ai-commerce/latest/search-by-image.html).

## Architecture

The feature is built on the `AiFoundation` abstraction layer, which decouples the image analysis logic from any specific AI provider. The AI model and provider are configured per named configuration entry, so you can swap or reconfigure them without changing application code.

The Yves-side widget `ImageSearchAiWidget` renders the camera icon and the image upload dialog next to the search input. Routing is handled by `SearchByImageRouteProviderPlugin`. After the AI returns a search term, the redirect target is determined by the Back Office configuration — either the catalog search results page or the PDP of the first matching result.

## How it works

1. The customer clicks the camera icon next to the search bar.
2. The customer uploads an image.
3. The system validates the file format and size.
4. The image is encoded and sent to the AI model via the `AiFoundation` abstraction layer.
5. The AI returns a search term derived from the image content.
6. Depending on the configured redirect type, the customer is sent to:
   - The catalog search results page for the identified search term, or
   - The PDP of the first matching product.

## Configuration

The following options can be configured at the project level in `AiCommerceConfig`:

| CONFIGURATION | DEFAULT | DESCRIPTION |
|---------------|---------|-------------|
| `isSearchByImageEnabled()` | `false` | Enables or disables the feature. Controlled via the Back Office. |
| `getSearchByImageSupportedMimeTypes()` | `image/jpeg`, `image/png`, `image/webp`, `image/gif` | Allowed upload MIME types. |
| `getSearchByImageMaxFileSizeInBytes()` | Defined in `AiCommerceConfig` | Maximum upload file size in bytes. |
| `getSearchByImageAiConfigurationName()` | `null` | Named AI model configuration identifier used to look up the provider config from `AiFoundation`. When `null`, the default configuration is used. |
| `getSearchByImageRedirectType()` | `search_results` | Controls the redirect target after a successful image search. Controlled via the Back Office. |

## Install

[Install Search by Image](/docs/dg/dev/ai/ai-commerce/search-by-image/install-search-by-image.html)
