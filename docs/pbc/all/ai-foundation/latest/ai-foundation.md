---
title: AI Foundation
description: Provider-agnostic AI connectivity layer for commerce
template: concept-topic-template
last_updated: Feb 23, 2026
label: early-access
related:
  - title: Install the AI Foundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-module
  - title: AI Conversation History
    link: /docs/pbc/all/ai-foundation/latest/ai-foundation-conversation-history.html
  - title: AI Tool Support
    link: /docs/pbc/all/ai-foundation/latest/ai-foundation-tool-support.html
  - title: AI Structured Responses
    link: /docs/pbc/all/ai-foundation/latest/ai-foundation-structured-responses.html
  - title: AI Workflow Orchestration
    link: /docs/pbc/all/ai-foundation/latest/ai-foundation-workflow-orchestration.html

---

## Overview

Spryker AI Foundation is the core layer that connects your Spryker Commerce OS to leading AI providers in an enterprise- and EU-friendly way.

You get a standardized, provider-agnostic way to build AI-powered commerce experiences, and you can choose the right AI provider and model for each use case, using:

- Global cloud AI platforms such as **Azure OpenAI**, **AWS Bedrock**, and **Google Vertex AI / Gemini**
- Frontier model providers such as **OpenAI** and **Anthropic Claude**
- European sovereign AI providers such as **Mistral AI**

The goal is simple: make AI a first-class capability of your commerce platform, not a collection of isolated experiments.

---

## Business problems it solves

Traditional AI projects in commerce often run into the same obstacles:

- Many separate integrations with different AI providers and libraries
- No common standards for security, logging, or error handling
- High dependency on a specific provider or model
- Lack of options for EU data residency or sovereignty-sensitive use cases
- Slow rollout of AI features across multiple markets and storefronts

Spryker AI Foundation addresses these challenges by introducing one common layer for AI in your commerce stack.

---

## Key value for your business

- **Faster delivery**  
  Developers get ready-to-use building blocks and connectors, so AI features reach your customers in weeks instead of months.

- **Provider freedom**  
  Your teams can connect to Azure OpenAI, AWS Bedrock, Google Vertex AI, OpenAI, Anthropic Claude, Mistral AI, or other providers through a single abstraction and keep the option to switch providers or combine them later.

- **Consistent developer experience**  
  A unified approach to prompts, requests, and responses across providers simplifies onboarding, code reviews, and long-term ownership.

- **Lower maintenance effort**  
  Handle changes to models, prompts, or providers in a central layer to reduce duplicate work across projects and rollouts.

- **Best fit provider per use case**  
  Use different providers and models for different needs. For example, use a model optimized for complex reasoning in a shopping assistant and another model optimized for cost-efficient content generation, without changing your commerce applications.

---

## Who benefits and how

### For business leaders

- **Reduced risk**  
  Avoid lock-in to a single AI provider and keep strategic options open as the AI market evolves.

- **EU and compliance readiness**  
  Combine global platforms with European sovereign AI providers such as Mistral AI to address data residency, GDPR, and EU AI Act requirements.

- **Faster innovation cycles**  
  New AI-driven use cases can be piloted and rolled out more quickly on top of a common foundation.

- **Better use of internal teams**  
  Developers focus on customer value and differentiation, not on building and maintaining low-level AI integrations.

### For product and commerce teams

- **Reusable patterns**  
  Once a pattern for AI-powered search, content, or assistance is proven, it can be reused across channels, brands, and countries.

- **More experiments, lower cost**  
  Trying a new provider or model for a specific use case becomes a configuration and testing activity, not a project.

- **Closer collaboration with tech**  
  A common foundation and shared vocabulary make it easier to plan AI initiatives together with engineering.

### For developers and architects

- **Standardized APIs**  
  Use one consistent API to call AI providers such as Azure OpenAI, AWS Bedrock, Google Vertex AI, OpenAI, Anthropic Claude, and Mistral AI instead of learning each provider SDK and behavior.

- **Simpler architecture**  
  AI related concerns such as configuration, error handling and response normalization sit in one layer rather than spread across services.

- **Future readiness**  
  New providers or models can be added behind the same interface, which keeps the overall architecture stable.

---

## Key features

Spryker AI Foundation provides the following core capabilities that can be used independently or combined to build powerful AI experiences:

### Conversation History

Maintain context across multiple customer interactions. AI remembers previous exchanges, builds on earlier discussions, and provides contextually relevant responses throughout extended dialogues.

**When to use:** Multi-turn shopping assistance, technical support, complex B2B procurement, any scenario where customers interact over multiple sessions.

[Learn more about Conversation History](/docs/pbc/all/ai-foundation/latest/ai-foundation-conversation-history.html)

### AI Tool Support

Enable AI to execute business operations and retrieve real-time data. AI can check inventory, create support tickets, calculate shipping costs, add items to carts, and invoke any custom business logic you define.

**When to use:** AI needs to interact with your systems to provide accurate data or complete operations such as order status checks, inventory lookups, and automated task execution.

[Learn more about AI Tool Support](/docs/pbc/all/ai-foundation/latest/ai-foundation-tool-support.html)

### Structured Responses

Receive validated, type-safe data from AI in predefined formats. Instead of free-form text, AI returns data in consistent schemas that integrate directly into your databases, APIs, and business workflows.

**When to use:** AI output must feed into systems requiring specific data fields, such as product data extraction, inquiry classification, content generation with metadata, and form and document generation.

[Learn more about Structured Responses](/docs/pbc/all/ai-foundation/latest/ai-foundation-structured-responses.html)

### AI Workflow Orchestration

Build multi-step processes where different AI agents collaborate to complete complex operations. Design workflows with decision points, branching logic, and specialized agents for each stage.

**When to use:** Business processes with multiple stages or decision points, such as product onboarding pipelines, customer inquiry routing, content approval workflows, and order processing and fulfillment.

[Learn more about AI Workflow Orchestration](/docs/pbc/all/ai-foundation/latest/ai-foundation-workflow-orchestration.html)

---

## Typical use cases built on Spryker AI Foundation

AI Foundation is not a single feature. It is the base for many AI-enabled scenarios, for example:

- **Generative AI (GenAI) shopping assistants**  
  Conversational assistants that help B2B buyers find the right product, check compatibility, and understand technical details by using one or more providers in the background. For example, you can use OpenAI or Anthropic for reasoning and combine them with an EU provider for sensitive data.

- **AI-powered product content**  
  Translation, enrichment, and improvement of product descriptions and attributes at scale, aligned with your brand and channel guidelines. This can use specialized translation capabilities together with general-purpose models.

- **Smart search and discovery**  
  AI-enhanced search and navigation that can better understand intent, synonyms, and domain-specific language, running on your preferred cloud AI platform.

- **AI-assisted back office workflows**  
  Context-aware suggestions for catalog management, pricing, or data imports that make business users more productive, while keeping data in EU-based providers where required.

Each of these use cases can evolve independently while still relying on the same AI Foundation underneath.

---

## How Spryker AI Foundation fits into your architecture

At a high level, Spryker AI Foundation sits inside Spryker Commerce OS and connects your channels (Storefronts, GLUE API, Back Office) with the AI providers you choose for each use case:

```text
[ Storefronts ]   [ GLUE API ]   [ Back Office ]
          \          |             /
           \         |            /
            v        v           v
           [ Spryker Commerce OS ]
          [ Spryker AI Foundation ]
               - Common API
               - Provider abstraction
               - Configuration
               - Routing per use case
                     |
                     v
              [ AI providers ]
                - Azure OpenAI
                - AWS Bedrock
                - Google Vertex AI / Gemini
                - OpenAI
                - Anthropic Claude
                - Mistral AI
                - Others, based on project needs
```

## Documentation
