---
title: "Environment Variables"
description: Oryx environment variables
last_updated: Sep 17, 2023
template: concept-topic-template
---

[Environment variables](https://en.wikipedia.org/wiki/Environment_variable) - is a user-definable value that can affect the way running process(es) will behave on a computer. Environment variables are part of the environment in which a process runs.

They are useful when:

- Values are different across developer machines
- Values are different across multiple environments: (dev, staging, qa, prod)
- Values change frequently and are highly dynamic (especially when running in CI)

Make sure that values **do not leak** in the code repository, especially secrets/passwords/keys etc. Keep them secure.

Oryx uses vite [.env files]([https://github.com/motdotla/dotenv](https://vitejs.dev/guide/env-and-mode.html#env-files)) for environment variables management. 

## Storefront Variables

The list of environment variables to configure Storefront:

| Variable | Required | Default | Description                               |
|----------|----------|---------|-------------------------------------------|
| `SCOS_BASE_URL` | Yes | None | Spryker GLUE API URL |
