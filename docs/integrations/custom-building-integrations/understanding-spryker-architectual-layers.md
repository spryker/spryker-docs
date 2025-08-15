---
title: Understanding Spryker Architectual Layers
description: Explore the Spryker Client layer, a lightweight communication layer connecting the front end to storage, search, and the Zed back end. Learn how it handles persistence, session management, and integrates third-party services effectively.
last_updated: July 9, 2025
template: default
layout: custom_new
---

The Client layer is a lightweight communication layer that connects the front end to storage, search, and the Zed back end. Because it already handles persistence (for example, Redis) and session management, it is the ideal place to isolate calls to third‑party services.

- Place all HTTP or SDK calls in the Client layer.
- Expose clear, reusable methods so any other layer can call the integration.

<a class="fl_cont" href="https://docs.spryker.com/docs/dg/dev/backend-development/client/client">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Yves Application Layer Client</div>
</a>

<a class="fl_cont" href="https://docs.spryker.com/docs/dg/dev/backend-development/client/implement-a-client">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Implement a Client</div>
</a>

<a class="fl_cont" href="https://docs.spryker.com/docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Use and Configure Redis as a Key-value storage</div>
</a>

