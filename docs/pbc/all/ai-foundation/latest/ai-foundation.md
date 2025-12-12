---
title: AI Foundation
description: Provider agnostic AI connectivity layer for commerce
template: concept-topic-template
last_updated: Dec 12, 2025
related:
  - title: Install the AI Foundation module
    link: docs.spryker.com/docs/dg/dev/ai/ai-foundation/ai-foundation-module#install-the-aifoundation-module.html
---

## 1. Overview

Spryker AI Foundation is the core layer that connects your Spryker Commerce OS to leading AI providers in an enterprise and EU friendly way.

It gives your development teams a standardized, provider agnostic way to build AI powered commerce experiences, and lets you choose the right AI provider and model per use case, using:

- Global cloud AI platforms such as **Azure OpenAI**, **AWS Bedrock** and **Google Vertex AI / Gemini**
- Frontier model providers such as **OpenAI** and **Anthropic Claude**
- European sovereign AI providers such as **Mistral AI**

The goal is simple:  
Make AI a first class capability of your commerce platform, not a collection of isolated experiments.

---

## 2. Business problems it solves

Traditional AI projects in commerce often run into the same obstacles:

- Many separate integrations with different AI providers and libraries
- No common standards for security, logging or error handling
- High dependency on a specific provider or model
- Lack of options for EU data residency or sovereignty sensitive use cases
- Slow rollout of AI features across multiple markets and storefronts

Spryker AI Foundation addresses these challenges by introducing one common layer for AI in your commerce stack.

---

## 3. Key value for your business

- **Faster delivery**  
  Developers get ready to use building blocks and connectors, so AI features reach your customers in weeks instead of months.

- **Provider freedom**  
  Your teams can connect to Azure OpenAI, AWS Bedrock, Google Vertex AI, OpenAI, Anthropic Claude, Mistral AI or other providers through one abstraction and keep the option to change or combine them later.

- **Consistent developer experience**  
  A unified way of working with prompts, requests and responses across providers simplifies onboarding, code reviews and long term ownership.

- **Lower maintenance effort**  
  Changes to models, prompts or providers are handled in one central layer, which reduces duplicated work across projects and rollouts.

- **Best fit provider per use case**  
  Use different providers and models for different needs for example one model optimized for complex reasoning in a shopping assistant, another one optimized for cost efficient content generation, without changing your commerce applications.

---

## 4. Who benefits and how

### For business leaders

- **Reduced risk**  
  Avoid lock in to a single AI provider and keep strategic options open as the AI market evolves.

- **EU and compliance readiness**  
  Combine global platforms with European sovereign AI providers such as Mistral AI to address data residency, GDPR and EU AI Act related requirements.

- **Faster innovation cycles**  
  New AI driven use cases can be piloted and rolled out more quickly on top of a common foundation.

- **Better use of internal teams**  
  Developers focus on customer value and differentiation, not on building and maintaining low level AI integrations.

### For product and commerce teams

- **Reusable patterns**  
  Once a pattern for AI powered search, content or assistance is proven, it can be reused across channels, brands and countries.

- **More experiments, lower cost**  
  Trying a new provider or model for a specific use case becomes a configuration and testing activity, not a project.

- **Closer collaboration with tech**  
  A common foundation and shared vocabulary make it easier to plan AI initiatives together with engineering.

### For developers and architects

- **Standardized APIs**  
  One consistent way to call different AI providers such as Azure OpenAI, AWS Bedrock, Google Vertex AI, OpenAI, Anthropic Claude and Mistral AI instead of learning each specific SDK and semantics.

- **Simpler architecture**  
  AI related concerns such as configuration, error handling and response normalization sit in one layer rather than spread across services.

- **Future readiness**  
  New providers or models can be added behind the same interface, which keeps the overall architecture stable.

---

## 5. Typical use cases built on Spryker AI Foundation

The AI Foundation itself is not a single feature. It is the base for many AI enabled scenarios, for example:

- **GenAI shopping assistants**  
  Conversational assistants that help B2B buyers find the right product, check compatibility and understand technical details, using one or more providers in the background. For example, OpenAI or Anthropic for reasoning, combined with an EU provider for sensitive data.

- **AI powered product content**  
  Translation, enrichment and improvement of product descriptions and attributes at scale, aligned with your brand and channel guidelines. This can use specialized translation capabilities together with general purpose models.

- **Smart search and discovery**  
  AI enhanced search and navigation that can better understand intent, synonyms and domain specific language, running on your preferred cloud AI platform.

- **AI assisted backoffice workflows**  
  Context aware suggestions for catalog management, pricing or data imports that make business users more productive, while keeping data in EU based providers where required.

Each of these use cases can evolve independently while still relying on the same AI Foundation underneath.

---

## 6. How Spryker AI Foundation fits into your architecture

At a high level, Spryker AI Foundation sits inside Spryker Commerce OS and connects your channels (Storefronts, GLUE API, Backoffice) with the AI providers you choose for each use case:

![Spryker AI Foundation architecture](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/ai-foundation/ai-foundation.md/ai-foundation-architecture.png)

```text
[ Storefronts ]   [ GLUE API ]   [ Backoffice ]
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
