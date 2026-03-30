---
title: Visual Add to Cart
description: Let buyers upload a product image on the Quick Order page to automatically recognize products and populate the order form using AI.
last_updated: Mar 30, 2026
template: concept-topic-template
---

The Visual Add to Cart feature lets storefront users upload a product image on the Quick Order page. AI automatically recognizes the products in the image and populates the quick order form with matching catalog items.

**Use case:** A buyer photographs a shelf, a product list, or product packaging. The system identifies the products and quantities visible in the image, finds matching SKUs in the catalog, and pre-fills the quick order form — enabling rapid bulk ordering without manual entry.

Accepted file formats: JPEG and PNG (up to 10 MB).

## How it works

1. The user uploads an image on the Quick Order page.
2. The system validates the file format and size.
3. The image is encoded and sent to the AI model via the `AiFoundation` abstraction layer.
4. The AI returns a list of recognized products with quantities.
5. Each recognized product name is searched in the catalog.
6. Matched products are added to the quick order form with their SKU and quantity.
7. Products that are not matched generate a flash notification.

## Use Visual Add to Cart on the Storefront

1. Open the Quick Order page.
2. Click the image upload button.
3. Upload a photo where one or more products are recognizable.
   The recognized products are pre-filled in the quick order form.
4. Review the pre-filled items and adjust if needed.
5. Add the items to cart.

## Configuration

The following options can be configured at the project level:

| CONFIGURATION | DEFAULT | DESCRIPTION |
|---------------|---------|-------------|
| `isQuickOrderImageToCartEnabled()` | `false` | Enables or disables the feature. |
| `getQuickOrderImageToCartSupportedMimeTypes()` | `image/jpeg`, `image/png` | Allowed upload MIME types. |
| `getQuickOrderImageToCartMaxFileSizeInBytes()` | `10485760` (10 MB) | Maximum upload file size. |
| `getQuickOrderImageToCartMaxProducts()` | `20` | Maximum number of products recognized per image. |
| `getQuickOrderImageToCartTextSimilarityThresholdPercent()` | `30` | Minimum word-overlap percentage required to consider a catalog match valid. |
| `getQuickOrderImageToCartAiConfigurationName()` | `null` | AI model configuration identifier. |

## Install

[Install Visual Add to Cart](/docs/pbc/all/ai-commerce/visual-add-to-cart/install-visual-add-to-cart.html)
