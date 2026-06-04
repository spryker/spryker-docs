---
title: Content Assistant
description: An AI-powered panel in the Back Office CMS Page and CMS Block glossary editors that generates and refines placeholder content per locale through a conversational interface.
last_updated: Jun 04, 2026
template: concept-topic-template
---

Content Assistant is an AI-powered panel embedded in the Back Office CMS Page and CMS Block glossary editors. Back Office users can ask the AI to generate or refine the title and body content for each placeholder and locale, using the full entity context — including the page name, template, URL slug, SEO metadata, and assigned stores.

## Capabilities

| CAPABILITY | DESCRIPTION |
|------------|-------------|
| Placeholder content generation | Generates title and body content for each placeholder and locale based on the entity context and a user prompt. |
| Content widget context | Provides the AI with the list of CMS content widgets available in the current editor, so it can reference them in generated content. |
| Content item reference | Allows the AI to look up existing content items (banners, product lists, navigation, and others) from the database and include them in the generated content. |
| File attachment | Allows attaching files to a prompt (for example, a brand guideline document or a product image) to inform the generated content. |

## Use Content Assistant

1. In the Back Office, open a CMS Page or CMS Block and go to the glossary editor.
2. In the AI panel, select the placeholder and locale to generate content for.
3. Type your prompt — for example, *"Write a short promotional banner for our summer sale, targeting DE store customers."*
4. Review the generated content and apply it to the editor or request further refinements.

## Enable Content Assistant

To enable the feature, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;CMS AI Editing&nbsp;<span aria-label="and then">></span>&nbsp;AI Vendor** in the Back Office and select an AI configuration.

## Developer resources

| RESOURCE | DESCRIPTION |
|----------|-------------|
| [Content Assistant](/docs/dg/dev/ai/ai-commerce/content-assistant/content-assistant.html) | Technical overview: architecture, plugin wiring, AI configuration, and feature flag. |
| [Install Content Assistant](/docs/dg/dev/ai/ai-commerce/content-assistant/install-content-assistant.html) | Step-by-step installation guide. |
