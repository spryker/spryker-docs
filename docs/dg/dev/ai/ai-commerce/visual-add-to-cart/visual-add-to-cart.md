---
title: Visual Add to Cart
description: Technical overview of the Visual Add to Cart feature — architecture, AiFoundation integration, supported files, configuration options, and plugin structure.
last_updated: Nov 18, 2026
template: concept-topic-template
---

Visual Add to Cart lets storefront users upload a product image, a screenshot, or a PDF order form on the Quick Order page. AI recognizes the ordered products and quantities, and the quick order form is populated with the matching catalog items. PDFs can be digital or scanned and can have several pages.

For the business overview and storefront usage, see [Visual Add to Cart](/docs/pbc/all/ai-commerce/latest/visual-add-to-cart.html).

## Architecture

The feature is built on the `AiFoundation` abstraction layer, which decouples the recognition logic from any specific AI provider. The AI model and provider are configured per named configuration entry, so you can swap or reconfigure them without changing application code.

The Yves-side plugin `AiCommerceQuickOrderVisualAddToCartFormPlugin` handles the upload form and orchestrates the workflow. Images are sent to the AI as image attachments. PDFs are sent as document attachments, so the AI reads every page of a multi-page file in one request. Catalog matching is done via a configurable text-similarity threshold to tolerate minor differences between AI-returned product names and catalog names.

## How it works

1. The user uploads an image or a PDF on the Quick Order page.
2. The system validates the file type, format, and size. The MIME type is detected from the file content, not from the file name.
3. The file is encoded and sent to the AI model via the `AiFoundation` abstraction layer, together with the image prompt or the document prompt.
4. The AI returns a list of recognized products with quantities. For a multi-page PDF, the line items of all pages are returned as one list.
5. Each recognized product name is searched in the catalog.
6. Matched products are added to the quick order form with their SKU and quantity. The user reviews and edits the rows before adding them to the cart.
7. Products that are not matched generate a flash notification.

## Supported files

| FILE TYPE | FORMATS | SENT TO THE AI AS |
|-----------|---------|-------------------|
| Image | PNG, JPEG, JPG | Image attachment |
| Document | PDF, digital or scanned, single- or multi-page | Document attachment named `order-form.pdf`. The original file name is not sent to the AI. |

Both file types share the same limits: 10 MB per file and 20 recognized products per upload.

## Configuration

The following options can be configured at the project level in `AiCommerceConfig`:

| CONFIGURATION | DEFAULT | DESCRIPTION |
|---------------|---------|-------------|
| `isQuickOrderVisualAddToCartEnabled()` | `false` | Enables or disables the feature. |
| `getQuickOrderVisualAddToCartSupportedImageMimeTypes()` | `image/jpeg`, `image/jpg`, `image/png` | Allowed image MIME types. |
| `getQuickOrderVisualAddToCartSupportedImageExtensions()` | `png`, `jpeg`, `jpg` | Allowed image file extensions. |
| `getQuickOrderVisualAddToCartSupportedDocumentMimeTypes()` | `application/pdf` | Allowed document MIME types. Files of these types are sent to the AI as document attachments. |
| `getQuickOrderVisualAddToCartSupportedDocumentExtensions()` | `pdf` | Allowed document file extensions. |
| `getQuickOrderVisualAddToCartSupportedFileMimeTypes()` | Image and document MIME types | All allowed MIME types. Combines the image and document lists; override those getters instead. |
| `getQuickOrderVisualAddToCartSupportedFileExtensions()` | Image and document extensions | All allowed file extensions. Combines the image and document lists; override those getters instead. |
| `getQuickOrderVisualAddToCartMaxFileSizeInBytes()` | `10485760` (10 MB) | Maximum upload file size. |
| `getQuickOrderVisualAddToCartMaxProducts()` | `20` | Maximum number of products recognized per upload. |
| `getQuickOrderVisualAddToCartTextSimilarityThresholdPercent()` | `30` | Minimum word-overlap percentage required to consider a catalog match valid. |
| `getQuickOrderVisualAddToCartAiConfigurationName()` | `null` | Named AI model configuration identifier used to look up the provider config from `AiFoundation`. When `null`, the default configuration is used. |

### Accept images only

To turn off PDF uploads, return empty lists from both document getters:

```php
<?php

namespace Pyz\Yves\AiCommerce;

use SprykerFeature\Yves\AiCommerce\AiCommerceConfig as SprykerAiCommerceConfig;

class AiCommerceConfig extends SprykerAiCommerceConfig
{
    /**
     * @return array<string>
     */
    public function getQuickOrderVisualAddToCartSupportedDocumentMimeTypes(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    public function getQuickOrderVisualAddToCartSupportedDocumentExtensions(): array
    {
        return [];
    }
}
```

## AI provider support for PDF

The selected model must accept image and PDF input and support structured output. How a PDF reaches the model depends on the provider:

| PROVIDER | HOW THE PDF IS SENT |
|----------|---------------------|
| OpenAI (Responses API) | `input_file` with base64 file data |
| Anthropic | `document` block with a base64 source |
| AWS Bedrock | Converse `document` block |
| Ollama | Not sent. The Ollama message mapper drops document attachments without an error, so the model answers without the file. If your AI configuration uses Ollama, accept images only. |

## System prompts

The prompts used to recognize products on the Quick Order page are managed in the Back Office under **AI Commerce > Quick Order > System Prompts**. The default prompts are defined in `ai_commerce.configuration.yml` and can be customized per environment through the configuration UI or a project configuration file, without a code change.

| CONFIGURATION KEY | DESCRIPTION |
|--------------------|-------------|
| `ai_commerce:quick_order:system_prompts:image_recognition_prompt` | Prompt used to recognize products and quantities from an uploaded image. |
| `ai_commerce:quick_order:system_prompts:document_recognition_prompt` | Prompt used to recognize products and quantities from an uploaded PDF. By default, it tells the AI to read every page, keep only order lines, and use the product description as the product name. |

Each prompt keeps a `%s` placeholder for the current store locale. The placeholder is replaced as plain text, so a prompt can contain a literal `%` character, such as `100%`.

If an overridden prompt is blank or contains only whitespace, Visual Add to Cart falls back to the default prompt instead of sending an empty value to the AI provider.

## Naming changes from previous versions

In previous versions of the `AiCommerce` module, the feature was named `QuickOrderImageToCart` in code. All public names now use `VisualAddToCart`. Configuration Management keys and the stored AI configuration names are unchanged, so saved settings keep working.

| AREA | PREVIOUS NAME | CURRENT NAME |
|------|---------------|--------------|
| Plugin | `QuickOrderImageToCart\Plugin\QuickOrderPage\AiCommerceQuickOrderImageToCartFormPlugin` | `QuickOrderVisualAddToCart\Plugin\QuickOrderPage\AiCommerceQuickOrderVisualAddToCartFormPlugin` |
| Config methods | `isQuickOrderImageToCartEnabled()`, `getQuickOrderImageToCart*()` | `isQuickOrderVisualAddToCartEnabled()`, `getQuickOrderVisualAddToCart*()` |
| Config methods renamed beyond the prefix | `getQuickOrderImageToCartSupportedMimeTypes()`, `getQuickOrderImageToCartPromptTemplate()` | `getQuickOrderVisualAddToCartSupportedImageMimeTypes()`, `getQuickOrderVisualAddToCartImagePromptTemplate()` |
| Glossary keys | `ai-commerce.quick-order-image-to-cart.image-order.errors.*`, `ai-commerce.quick-order-image-to-cart.image-upload.*` | `ai-commerce.quick-order-visual-add-to-cart.order-file.errors.*`, `ai-commerce.quick-order-visual-add-to-cart.file-upload.*` |
| Twig molecule | `quick-order-image-to-cart`, data `supportedImageExtensions` | `quick-order-visual-add-to-cart`, data `supportedFileExtensions` |
| Form request names | Field `uploadImageOrder`, button `uploadImage` | Field `orderFile`, button `uploadOrderFile` |

After upgrading, update the plugin wiring and any config overrides, rename overridden Twig templates, import the glossary again, and rebuild the Yves assets.

## Install

[Install Visual Add to Cart](/docs/dg/dev/ai/ai-commerce/visual-add-to-cart/install-visual-add-to-cart.html)
