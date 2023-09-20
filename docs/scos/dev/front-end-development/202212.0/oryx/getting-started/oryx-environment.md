---
title: "Environment Variables"
description: Oryx environment variables
last_updated: Sep 20, 2023
template: concept-topic-template
---

[Environment variables](https://en.wikipedia.org/wiki/Environment_variable) - is a user-definable value that can affect the way running process(es) will behave on a computer. Environment variables are part of the environment in which a process runs. 

While most of the features in Oryx are driven by data coming from a backend, there are some exceptions where an environment variable is required:

- Values are different across developer machines
- Values are different across multiple environments: (dev, staging, qa, prod)
- Values change frequently and are highly dynamic (especially when running in CI)

Make sure that sensitive data **do not leak** in the code repository, especially secrets/passwords/keys etc. Keep them secure.

Oryx uses vite [.env files](https://vitejs.dev/guide/env-and-mode.html#env-files) for environment variables management. 

## Storefront Variables

The list of environment variables to configure Storefront:

| Variable | Required | Introduced in | Default | Description                               |
|----------|-------------|---------------|---------------|-------------------------------------------|
| `SCOS_BASE_URL` | Yes | 1.0 | None<sup>*<sup> | Spryker GLUE API URL |
| `ORYX_PRESET` | No | 1.1 | `b2c` | Used to set a preset name, available options: `b2b`, `b2c` |
| `ORYX_FEATURE_VERSION` | No | 1.1 | `latest` | Used to set a feature level, available options: `latest`, `1.0`, `1.1`, etc. Only major and minor versions can be used |

<sub>*The [boilerplate repostiory](https://github.com/spryker/composable-frontend) comes with [a fallback env variable](https://github.com/spryker/composable-frontend/blob/master/.env) that uses a public Spryker backend API to get you up and running fast. You can configure your custom backend, by setting the `SCOS_BASE_URL` value.<sub>
