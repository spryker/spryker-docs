---
title: Back Office Assistant
description: Technical overview of the Back Office Assistant feature — architecture, agents, AiFoundation integration, and configuration options.
last_updated: Jul 16, 2026
template: concept-topic-template
---

Back Office Assistant is an AI-powered chat widget embedded in the Spryker Back Office. It lets admin users ask natural language questions, navigate the Back Office, manage orders, and create or update discounts — all through a conversational interface.

For the business overview, see [Back Office Assistant](/docs/pbc/all/ai-commerce/latest/backoffice-assistant.html).

## Architecture

Back Office Assistant is built on the `AiFoundation` abstraction layer and runs entirely in the Zed (Back Office) application. The chat widget is rendered by a Twig plugin injected into the Back Office layout.

Each conversation is routed through an intent router that selects the most appropriate specialized agent. Each agent has its own system prompt, named AI configuration, and toolset — so they can be configured, observed, and scaled independently.

Streaming responses are delivered to the browser using Server-Sent Events (SSE), which are triggered by pre- and post-tool-call plugins registered in `AiFoundationDependencyProvider`.

## Agents

Back Office Assistant ships with four built-in agents:

| AGENT | PLUGIN | DESCRIPTION |
|-------|--------|-------------|
| General Purpose | `GeneralAgentPlugin` | Answers general Spryker Back Office questions and provides navigation guidance. |
| Order Management | `OrderManagementAgentPlugin` | Provides read-only access to order data and OMS state information for diagnosing order issues. |
| Discount Management | `DiscountManagementAgentPlugin` | Creates and updates discounts through the Back Office API. |
| Form Fill | `FormFillAgentPlugin` | Fills Back Office forms using natural language instructions. |

Agents are registered in `AiCommerceDependencyProvider::getBackofficeAssistantAgentPlugins()`. To implement and register a custom agent, see [Add a custom Back Office Assistant agent](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/add-custom-backoffice-assistant-agent.html).

## Toolsets

Each agent uses a set of tools registered in `AiFoundationDependencyProvider::getAiToolSetPlugins()`:

| PLUGIN | DESCRIPTION |
|--------|-------------|
| `NavigationToolSetPlugin` | Provides tools for resolving Back Office navigation paths. |
| `OrderManagementToolSetPlugin` | Provides tools for fetching order lists and OMS process information. |
| `OrderDetailsToolSetPlugin` | Provides tools for fetching detailed order data by reference or ID. |
| `DiscountManagementToolSetPlugin` | Provides tools for reading, creating, and updating discounts. |
| `FormFillToolSetPlugin` | Provides tools for filling Back Office form fields with values derived from natural language instructions. |

## SSE streaming

Tool call progress is streamed to the browser in real time using Server-Sent Events:

| PLUGIN | DESCRIPTION |
|--------|-------------|
| `BackofficeAssistantSsePreToolCallPlugin` | Sends a streaming event before each tool call. |
| `BackofficeAssistantSsePostToolCallPlugin` | Sends a streaming event after each tool call. |

## AI configuration

Each agent uses a dedicated named AI configuration entry in `AiFoundation`. This isolates model settings per agent and keeps audit log entries separate.

The following `AiCommerceConfig` methods return the AI configuration name for the intent router and each agent. Each method returns `null` by default to use the `AiFoundation` default configuration, and you override it to return a named configuration entry:

| METHOD | DESCRIPTION |
|--------|-------------|
| `AiCommerceConfig::getIntentRouterAiConfigurationName()` | Configuration for the intent routing model. |
| `AiCommerceConfig::getGeneralAgentAiConfigurationName()` | Configuration for the General Purpose agent. |
| `AiCommerceConfig::getOrderManagementAgentAiConfigurationName()` | Configuration for the Order Management agent. |
| `AiCommerceConfig::getDiscountManagementAgentAiConfigurationName()` | Configuration for the Discount Management agent. |
| `AiCommerceConfig::getFormFillAgentAiConfigurationName()` | Configuration for the Form Fill agent. |

## System prompts

System prompts for each agent are managed in the Back Office under **AI Commerce > Back Office Assistant > System Prompts**. The default prompts are defined in `ai_commerce.configuration.yml` and can be customized per environment through the configuration UI.

## Feature flags

The feature and individual agents can be enabled or disabled from the Back Office under **AI Commerce > Back Office Assistant > General**:

| SETTING | DEFAULT | DESCRIPTION |
|---------|---------|-------------|
| `is_enabled` | `false` | Enables or disables the Back Office Assistant chat widget. |
| `is_order_management_agent_enabled` | `true` | Enables or disables the Order Management Agent. |
| `is_discount_management_agent_enabled` | `true` | Enables or disables the Discount Management Agent. |
| `is_form_fill_agent_enabled` | `true` | Enables or disables the Form Fill Agent. |

## Install

[Install Back Office Assistant](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/install-backoffice-assistant.html)
