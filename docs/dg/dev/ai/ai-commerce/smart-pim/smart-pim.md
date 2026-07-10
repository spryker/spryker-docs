---
title: Smart PIM
description: Technical overview of the Smart PIM feature — architecture, AiFoundation integration, plugin structure, and configuration options.
last_updated: Jul 08, 2026
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

## System prompts

Each Smart PIM capability uses its own prompt template, managed in the Back Office under **AI Commerce > Smart PIM > System Prompts**. The default prompts are defined in `ai_commerce.configuration.yml` and can be customized per environment through the configuration UI or a project configuration file, without a code change.

| CAPABILITY | CONFIGURATION KEY | DESCRIPTION |
|------------|--------------------|-------------|
| Content improvement | `AiCommerceConstants::CONFIGURATION_KEY_SMART_PIM_CONTENT_IMPROVER_PROMPT` | Prompt used to improve product content. Keeps the `%s` placeholder for the text to improve. |
| Translation | `AiCommerceConstants::CONFIGURATION_KEY_SMART_PIM_TRANSLATION_PROMPT` | Prompt used to translate product content. Keeps the `%s` placeholders for the text, source locale, and target locale. |
| Translation collection | `AiCommerceConstants::CONFIGURATION_KEY_SMART_PIM_TRANSLATION_COLLECTION_PROMPT` | Prompt used to translate product content into a collection of locales in a single request. Keeps the `%s` placeholders for the text, source locale, and target locales. |
| Category suggestion | `AiCommerceConstants::CONFIGURATION_KEY_SMART_PIM_CATEGORY_SUGGESTION_PROMPT` | Prompt used to suggest product categories. Keeps the `%s` placeholders for the product name, description, and existing categories. |
| Image alt text | `AiCommerceConstants::CONFIGURATION_KEY_SMART_PIM_IMAGE_ALT_TEXT_PROMPT` | Prompt used to generate alt text for a product image. Keeps the `%s` placeholder for the locale. |

If an overridden prompt is blank or contains only whitespace, Smart PIM falls back to the default prompt instead of sending an empty value to the AI provider.

## Install

[Install Smart PIM](/docs/dg/dev/ai/ai-commerce/smart-pim/install-smart-pim.html)
