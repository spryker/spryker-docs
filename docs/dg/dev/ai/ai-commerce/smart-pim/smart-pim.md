---
title: Smart PIM
description: Technical overview of the Smart PIM feature — architecture, AiFoundation integration, plugin structure, and configuration options.
last_updated: Apr 23, 2026
template: concept-topic-template
---

Smart PIM is an AI assistant embedded in the Back Office product creation and editing pages. It provides AI-powered capabilities for product content improvement, image alt text generation, category suggestions, and translation — all accessible from within the product management form.

For the business overview and Back Office usage, see [Smart PIM](/docs/pbc/all/ai-commerce/latest/smart-pim.html).

## Architecture

Smart PIM is built on the `AiFoundation` abstraction layer and runs entirely in the Zed (Back Office) application.

The AI capabilities are surfaced in the product management form via `ProductManagementAiProductAbstractFormTabContentProviderWithPriorityPlugin`, which adds an AI panel as a tab content provider in the product form. The AI modals are rendered on each product page through Twig templates that include the `product-management-ai-modals.twig` partial from the `AiCommerce` module.

Category suggestion requires the `ProductCategoryAbstractFormExpanderPlugin` to be present in the product form, and the `ProductCategoryProductAbstractPostCreatePlugin` and `ProductCategoryProductAbstractAfterUpdatePlugin` plugins to persist category assignments on product save.

## Capabilities

| CAPABILITY | CONFIG METHOD | DESCRIPTION |
|------------|---------------|-------------|
| Content improvement | `getContentImproverAiConfigurationName()` | Rewrites or enriches product descriptions and attributes using AI. |
| Image alt text | `getImageAltTextAiConfigurationName()` | Generates descriptive alt text for product images. |
| Category suggestion | `getCategorySuggestionAiConfigurationName()` | Suggests relevant product categories based on product content. |
| Translation | `getTranslationAiConfigurationName()` | Translates product content into configured store languages. |

## AI configuration

All four capabilities share the `AI_CONFIGURATION_SMART_PIM` named configuration entry in `AiFoundation`. This is set by overriding the corresponding methods in `AiCommerceConfig`. Using a dedicated named configuration isolates Smart PIM audit log entries from other AI features in the project.

The following project-level constant is used to reference the Smart PIM model configuration managed through the Back Office Configuration UI:

| CONSTANT | KEY | DESCRIPTION |
|----------|-----|-------------|
| `CONFIGURATION_KEY_OPENAI_SMART_MODEL` | `ai_commerce:open_ai:general:openai_smart_model` | Model used for Smart PIM agent operations (default: `gpt-4.1`). |

## Install

[Install Smart PIM](/docs/dg/dev/ai/ai-commerce/smart-pim/install-smart-pim.html)
