---
title: Visual Add to Cart
description: Technical overview of the Visual Add to Cart feature — architecture, AiFoundation integration, configuration options, and plugin structure.
last_updated: Mar 31, 2026
template: concept-topic-template
---

Visual Add to Cart lets storefront users upload a product image on the Quick Order page. AI automatically recognizes the products in the image and populates the quick order form with matching catalog items.

For the business overview and storefront usage, see [Visual Add to Cart](/docs/pbc/all/ai-commerce/latest/visual-add-to-cart.html).

## Architecture

The feature is built on the `AiFoundation` abstraction layer, which decouples the image recognition logic from any specific AI provider. The AI model and provider are configured per named configuration entry, so you can swap or reconfigure them without changing application code.

The Yves-side plugin `AiCommerceQuickOrderImageToCartFormPlugin` handles the upload form and orchestrates the workflow. Catalog matching is done via a configurable text-similarity threshold to tolerate minor differences between AI-returned product names and catalog names.

## How it works

1. The user uploads an image on the Quick Order page.
2. The system validates the file format and size.
3. The image is encoded and sent to the AI model via the `AiFoundation` abstraction layer.
4. The AI returns a list of recognized products with quantities.
5. Each recognized product name is searched in the catalog.
6. Matched products are added to the quick order form with their SKU and quantity.
7. Products that are not matched generate a flash notification.

## Configuration

The following options can be configured at the project level in `AiCommerceConfig`:

| CONFIGURATION | DEFAULT | DESCRIPTION |
|---------------|---------|-------------|
| `isQuickOrderImageToCartEnabled()` | `false` | Enables or disables the feature. |
| `getQuickOrderImageToCartSupportedMimeTypes()` | `image/jpeg`, `image/png` | Allowed upload MIME types. |
| `getQuickOrderImageToCartMaxFileSizeInBytes()` | `10485760` (10 MB) | Maximum upload file size. |
| `getQuickOrderImageToCartMaxProducts()` | `20` | Maximum number of products recognized per image. |
| `getQuickOrderImageToCartTextSimilarityThresholdPercent()` | `30` | Minimum word-overlap percentage required to consider a catalog match valid. |
| `getQuickOrderImageToCartAiConfigurationName()` | `null` | Named AI model configuration identifier used to look up the provider config from `AiFoundation`. When `null`, the default configuration is used. |

## Install

[Install Visual Add to Cart](/docs/dg/dev/ai/ai-commerce/visual-add-to-cart/install-visual-add-to-cart.html)
