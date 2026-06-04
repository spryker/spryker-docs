---
title: Content Assistant
description: Technical overview of the Content Assistant feature — architecture, AiFoundation integration, plugin structure, and configuration options.
last_updated: Jun 04, 2026
template: concept-topic-template
---

Content Assistant is an AI-powered panel embedded in the Back Office CMS Page and CMS Block glossary editors. It lets Back Office users generate and refine placeholder content per locale using a conversational AI interface, with full access to the entity context, SEO metadata, available CMS content widgets, and existing content items.

For the business overview and Back Office usage, see [Content Assistant](/docs/pbc/all/ai-commerce/latest/content-assistant.html).

## Architecture

Content Assistant is built on the `AiFoundation` abstraction layer and runs entirely in the Zed (Back Office) application.

The AI panel is injected into both glossary editors through Twig overrides at the project level:

- **CMS Page glossary** — `src/Pyz/Zed/CmsGui/Presentation/CreateGlossary/index.twig`
- **CMS Block glossary** — `src/Pyz/Zed/CmsBlockGui/Presentation/EditGlossary/index.twig`

Both overrides use the `isCmsAiEditingEnabled()` Twig function (provided by `AiCommerceTwigPlugin`) to conditionally render the AI panel partial `@AiCommerce/Partials/cms-glossary-ai-panel.twig`. The panel is only rendered when the feature is enabled in the Back Office configuration.

The panel collects entity context (name, template, URL slug, key, SEO meta, stores) and current placeholder/locale state client-side. The JavaScript component (`CmsAiContentPanel`) sends requests to `CmsAiContentController`, which delegates to `CmsAiContentGenerator` through the `AiCommerceFacade`.

## Capabilities

| CAPABILITY | DESCRIPTION |
|------------|-------------|
| Placeholder content generation | Generates title and body content per placeholder and locale using the entity context and system prompt. |
| Content widget reuse | Collects available CMS content widgets from the editor DOM and makes them available to the AI as context. |
| Content item reference | Uses the `get_content_items` tool (provided by `GetContentItemsToolPlugin`) to retrieve existing content items from the database and reference them in generated content. |
| File attachment | Allows attaching files (base64-encoded) to the prompt. Both client-side and server-side validation are applied via `AttachmentValidator`. |

## Plugin wiring

| PLUGIN | LOCATION | DESCRIPTION |
|--------|----------|-------------|
| `CmsAiContentToolSetPlugin` | `AiFoundationDependencyProvider::getAiToolSetPlugins()` | Registers the Content Assistant toolset, including the `get_content_items` tool. |

Content widget plugins are registered in `AiCommerceDependencyProvider::getContentGuiEditorPlugins()` and are used to resolve available CMS widgets that the AI can reference in generated content:

| PLUGIN | NAMESPACE |
|--------|-----------|
| `ContentBannerContentGuiEditorPlugin` | `Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui` |
| `ContentProductContentGuiEditorPlugin` | `Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui` |
| `ContentProductSetGuiEditorPlugin` | `Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui` |
| `ContentFileListContentGuiEditorPlugin` | `Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui` |
| `ContentNavigationContentGuiEditorPlugin` | `Spryker\Zed\ContentNavigationGui\Communication\Plugin\ContentGui` |

## AI configuration

Content Assistant uses a dedicated named AI configuration entry in `AiFoundation`. The active configuration is resolved at runtime based on the AI vendor selected in the Back Office configuration UI.

| CONSTANT | DESCRIPTION |
|----------|-------------|
| `AiCommerceConstants::AI_CONFIGURATION_CMS_AI_EDITING_OPENAI` | Configuration for the OpenAI-backed Content Assistant agent. |
| `AiCommerceConstants::AI_CONFIGURATION_CMS_AI_EDITING_AWS` | Configuration for the AWS Bedrock-backed Content Assistant agent. |
| `AiCommerceConstants::AI_CONFIGURATION_CMS_AI_EDITING_ANTHROPIC` | Configuration for the Anthropic-backed Content Assistant agent. |

The active configuration is selected by `AiCommerceConfig::getCmsAiEditingAiConfigurationName()`, which reads `AiCommerceConstants::CONFIGURATION_KEY_CMS_AI_EDITING_AI_CONFIGURATION` from the Back Office configuration UI. The default is `AI_CONFIGURATION_CMS_AI_EDITING_OPENAI`.

## Feature flag

The feature can be enabled or disabled from the Back Office under **AI Commerce > CMS AI Editing > AI Vendor**. The `isCmsAiEditingEnabled()` Twig function reads this flag and controls panel visibility in both glossary editors.

## Install

[Install Content Assistant](/docs/dg/dev/ai/ai-commerce/content-assistant/install-content-assistant.html)
