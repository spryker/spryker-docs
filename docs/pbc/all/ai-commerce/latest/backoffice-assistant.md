---
title: Back Office Assistant
description: An AI-powered chat widget embedded in the Spryker Back Office that lets admin users manage orders, create discounts, and get navigation help through natural language.
last_updated: Mar 31, 2026
template: concept-topic-template
---

Back Office Assistant is an AI-powered chat widget embedded in the Spryker Back Office. Admin users can ask natural language questions to get instant guidance, navigate the Back Office, diagnose order issues, and create or update discounts — without switching contexts or searching through menus.

**Use case:** A Back Office admin needs to create a promotional discount but is unsure about the required fields. Instead of browsing documentation, the admin opens the Back Office Assistant, describes the discount in plain language, and the assistant creates it automatically and provides a link to review it in the Back Office.

## Capabilities

| CAPABILITY | DESCRIPTION |
|------------|-------------|
| Navigation guidance | Answers questions about where to find features and provides clickable navigation links. |
| Order management | Looks up orders by reference or ID, explains OMS states, and helps diagnose stuck orders. Read-only — does not modify orders. |
| Discount management | Creates and updates discounts through a conversational interface. |
| Form fill | Populates Back Office form fields using natural language instructions. |

## Use Back Office Assistant

1. In the Back Office, click the chat icon in the bottom-right corner.

   ![Back Office Assistant icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/backoffice-assistant-icon.png)

2. Type your question or request in plain language.
3. The assistant routes your request to the appropriate agent and responds.

![Back Office Assistant chat](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/backoffice-assistant-chat.png)

**Examples:**
- *"Where do I configure tax rates?"*
- *"What is the current state of order DE--1001?"*
- *"Create a 10% discount for all orders over 50 EUR, valid for the next 30 days."*
- *"Fill in the product form with name 'Premium Widget', SKU 'PW-001', and price 99.99."*

## Enable Back Office Assistant

To enable the feature, in the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Back Office Assistant&nbsp;<span aria-label="and then">></span>&nbsp;General** and turn on **Enable Back Office Assistant**.

![Back Office Assistant configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/backoffice-assistant-config.png)

Individual agents can also be enabled or disabled separately from the same settings group.

## Developer resources

| RESOURCE | DESCRIPTION |
|----------|-------------|
| [Back Office Assistant](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/backoffice-assistant.html) | Technical overview: architecture, agents, toolsets, configuration options, and AiFoundation integration. |
| [Install Back Office Assistant](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/install-backoffice-assistant.html) | Step-by-step installation guide. |
