---
title: AI Commerce overview
description: Technical overview of the AI Commerce SprykerFeature package — architecture, AiFoundation integration, and available features.
last_updated: Apr 22, 2026
template: concept-topic-template
---

AI Commerce is a `SprykerFeature` package (`spryker-feature/ai-commerce`) that provides AI-powered storefront capabilities. All features in this package are built on top of the `AiFoundation` abstraction layer, which decouples business logic from the underlying AI provider.

## Package structure

The `spryker-feature/ai-commerce` package follows the standard Spryker module structure and ships modules for both Yves and the Shared layer. Each AI feature within the package is self-contained — it registers its own plugins, configuration, and translations.

## AiFoundation integration

Every AI feature in the package communicates with an AI provider exclusively through `AiFoundation`. This means:

- **Provider-agnostic** — the AI provider (for example, OpenAI) is configured outside the feature code. Switching providers requires only a configuration change.
- **Named configurations** — each feature can use a dedicated named configuration entry in `AiFoundation`. This isolates provider settings per feature and keeps audit log entries separate, making it easy to review or debug AI interactions for a specific feature.
- **Audit logging** — all AI calls made through `AiFoundation` are recorded in the audit log. Using a named configuration per feature lets you filter the log by feature.

For the base `AiFoundation` setup, see [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html#2-configure-aifoundation).

## Available features

| FEATURE | DESCRIPTION |
|---------|-------------|
| [Visual Add to Cart](/docs/dg/dev/ai/ai-commerce/visual-add-to-cart/visual-add-to-cart.html) | Lets buyers upload a product image on the Quick Order page. AI recognizes products and quantities in the image and pre-fills the quick order form with matching SKUs. |
| [Back Office Assistant](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/backoffice-assistant.html) | An AI-powered chat widget embedded in the Back Office. Admin users can ask natural language questions, navigate the Back Office, diagnose order issues, and create or update discounts. |
| [Smart PIM](/docs/dg/dev/ai/ai-commerce/smart-pim/smart-pim.html) | An AI assistant embedded in the Back Office product creation and editing pages. Helps catalog managers fill in product attributes, descriptions, and metadata through a conversational interface. |

## Installation

To install the AI Commerce base package, see [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html). Individual features require additional installation steps — see their respective installation guides linked in the table above.
