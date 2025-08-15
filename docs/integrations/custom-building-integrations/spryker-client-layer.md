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

## Further reading

- [Yves Application Layer Client](/docs/dg/dev/backend-development/client/client)  

- [Implement a Client](/docs/dg/dev/backend-development/client/implement-a-client)  

- [Use and configure Redis as a key-value storage](/docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage)  


