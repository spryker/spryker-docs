---
title: Back Office Assistant
description: Technical overview of the Back Office Assistant feature — architecture, agents, AiFoundation integration, and configuration options.
last_updated: Oct 29, 2026
template: concept-topic-template
---

Back Office Assistant is an AI-powered chat widget embedded in the Spryker Back Office. It lets admin users ask natural language questions, navigate the Back Office, manage orders, and create or update discounts — all through a conversational interface.

For the business overview, see [Back Office Assistant](/docs/pbc/all/ai-commerce/latest/backoffice-assistant.html).

## Architecture

Back Office Assistant is built on the `AiFoundation` abstraction layer and runs entirely in the Zed (Back Office) application. The chat widget is rendered by a Twig plugin injected into the Back Office layout.

Each conversation is routed through an intent router that selects the most appropriate specialized agent. Each agent has its own system prompt, named AI configuration, and toolset — so they can be configured, observed, and scaled independently.

Streaming responses are delivered to the browser using Server-Sent Events (SSE), which are triggered by pre- and post-tool-call plugins registered in `AiFoundationDependencyProvider`.

The chat widget uses the shared chat frontend of the `AiCommerce` module, which Storefront Assistant also uses. For details, see [Chat frontend](#chat-frontend).

## Agents

Back Office Assistant ships with four built-in agents:

<div class="width-100">

| AGENT | PLUGIN | DESCRIPTION |
|-------|--------|-------------|
| General Purpose | `GeneralAgentPlugin` | Answers general Spryker Back Office questions and provides navigation guidance. |
| Order Management | `OrderManagementAgentPlugin` | Provides read-only access to order data and OMS state information for diagnosing order issues. |
| Discount Management | `DiscountManagementAgentPlugin` | Creates and updates discounts through the Back Office API. |
| Form Fill | `FormFillAgentPlugin` | Fills Back Office forms using natural language instructions. |

</div>

Agents are registered in `AiCommerceDependencyProvider::getBackofficeAssistantAgentPlugins()`. To implement and register a custom agent, see [Add a custom Back Office Assistant agent](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/add-custom-backoffice-assistant-agent.html).

## Toolsets

Each agent uses a set of tools registered in `AiFoundationDependencyProvider::getAiToolSetPlugins()`:

<div class="width-100">

| PLUGIN | DESCRIPTION |
|--------|-------------|
| `NavigationToolSetPlugin` | Provides tools for resolving Back Office navigation paths. |
| `OrderManagementToolSetPlugin` | Provides tools for fetching order lists and OMS process information. |
| `OrderDetailsToolSetPlugin` | Provides tools for fetching detailed order data by reference or ID. |
| `DiscountManagementToolSetPlugin` | Provides tools for reading, creating, and updating discounts. |
| `FormFillToolSetPlugin` | Provides tools for filling Back Office form fields with values derived from natural language instructions. |

</div>

## SSE streaming

Tool call progress is streamed to the browser in real time using Server-Sent Events:

<div class="width-100">

| PLUGIN | DESCRIPTION |
|--------|-------------|
| `BackofficeAssistantSsePreToolCallPlugin` | Sends a streaming event before each tool call. |
| `BackofficeAssistantSsePostToolCallPlugin` | Sends a streaming event after each tool call. |

</div>

The stream uses the same protocol as Storefront Assistant: the AI SDK UI Message Stream Protocol. Before each tool call, the stream contains the `tool-input-start` and `tool-input-available` events. After each tool call, the stream contains the `tool-output-available` event. For the event format, see [Stream protocol](/docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html#stream-protocol).

## Endpoints

`BackofficeAssistantChatController` handles all requests of the chat widget:

<div class="width-100">

| ENDPOINT | METHOD | DESCRIPTION |
|----------|--------|-------------|
| `/ai-commerce/backoffice-assistant-chat/prompt` | `POST` | Sends a message and returns the answer as an SSE stream. |
| `/ai-commerce/backoffice-assistant-chat/conversations` | `GET` | Returns the conversations of the user, the available agents, and the agent that the user selected. |
| `/ai-commerce/backoffice-assistant-chat/conversation-messages` | `GET` | Returns the messages of the conversation in the `conversationReference` query parameter. |
| `/ai-commerce/backoffice-assistant-chat/delete-conversation` | `DELETE` | Deletes the conversations in the `conversationReferences` list. |

</div>

The `prompt` and `delete-conversation` requests must have the `X-CSRF-Token` header with the `backoffice-assistant` CSRF token.

## Chat frontend

The Back Office chat widget and the Storefront Assistant use one shared chat frontend. The shared chat is the `<spryker-chat>` custom element and its features, such as chat history, attachments, and the agent selector. The module ships it in `vendor/spryker-feature/ai-commerce/src/SprykerFeature/Shared/AiCommerce/Theme/default/Chat/`.

The Back Office loads the shared chat as follows:

- `SharedThemeTwigLoaderPlugin` makes the shared Twig templates available as `@AiCommerce/Chat/...`.
- The `@shared/ai-commerce/*` alias of the Back Office frontend builder resolves the shared TypeScript and SCSS files.
- `@AiCommerce/Partials/chat-widget.twig` renders the chat and a floating button in the bottom-right corner that opens and closes the chat.
- The Back Office features `chat-form-fill` and `chat-form-context` are in `src/SprykerFeature/Zed/AiCommerce/assets/Zed/chat/features/`. Their Twig templates are in `src/SprykerFeature/Zed/AiCommerce/Presentation/Partials/Chat/`.

To change a Back Office feature, put a template with the same name in `src/Pyz/Zed/AiCommerce/Presentation/Partials/Chat/` and extend the core template, for example `@SprykerFeature:AiCommerce/Partials/Chat/page-context.twig`. To change the chat on all hosts, put a file with the same path in `src/Pyz/Shared/AiCommerce/Theme/default/Chat/`. The project file replaces the core file.

The module README describes the blocks, the events, the style tokens, and the extension points of the shared chat: `vendor/spryker-feature/ai-commerce/src/SprykerFeature/Shared/AiCommerce/Theme/default/Chat/README.md`.

## AI configuration

Each agent uses a dedicated named AI configuration entry in `AiFoundation`. This isolates model settings per agent and keeps audit log entries separate.

The following `AiCommerceConfig` methods return the AI configuration name for the intent router and each agent. Each method returns `null` by default to use the `AiFoundation` default configuration, and you override it to return a named configuration entry:

<div class="width-100">

| METHOD | DESCRIPTION |
|--------|-------------|
| `AiCommerceConfig::getIntentRouterAiConfigurationName()` | Configuration for the intent routing model. |
| `AiCommerceConfig::getGeneralAgentAiConfigurationName()` | Configuration for the General Purpose agent. |
| `AiCommerceConfig::getOrderManagementAgentAiConfigurationName()` | Configuration for the Order Management agent. |
| `AiCommerceConfig::getDiscountManagementAgentAiConfigurationName()` | Configuration for the Discount Management agent. |
| `AiCommerceConfig::getFormFillAgentAiConfigurationName()` | Configuration for the Form Fill agent. |

</div>

## System prompts

System prompts for each agent are managed in the Back Office under **AI Commerce > Back Office Assistant > System Prompts**. The default prompts are defined in `ai_commerce.configuration.yml` and can be customized per environment through the configuration UI.

## Feature flags

The feature and individual agents can be enabled or disabled from the Back Office under **AI Commerce > Back Office Assistant > General**:

<div class="width-100">

| SETTING | DEFAULT | DESCRIPTION |
|---------|---------|-------------|
| `is_enabled` | `false` | Enables or disables the Back Office Assistant chat widget. |
| `is_order_management_agent_enabled` | `true` | Enables or disables the Order Management Agent. |
| `is_discount_management_agent_enabled` | `true` | Enables or disables the Discount Management Agent. |
| `is_form_fill_agent_enabled` | `true` | Enables or disables the Form Fill Agent. |

</div>

## Install

[Install Back Office Assistant](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/install-backoffice-assistant.html)
