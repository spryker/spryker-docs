---
title: "Environment Variables"
---

Environment variables are useful when:

- Values are different across developer machines.
- Values are different across multiple environments: (dev, staging, qa, prod)
- Values change frequently and are highly dynamic.

Environment variables can be changed easily - especially when running in CI.

Oryx uses [dotenv](https://github.com/motdotla/dotenv) for environment variables management. 

## Storefront Variables 

The list of environment variables to configure Storefront:

| Variable | Required | Default | Description                               |
|----------|----------|---------|-------------------------------------------|
| `SCOS_BASE_URL` | Yes | None | Spryker GLUE API URL |
| `STORE` | Yes | None | Default store name, e.g. DE, AT etc. The value is case-sensitive |
| `PRICE_MODE` | No | None | Can be used to initialise the application with default price mode. When this variable is not provided, the backend will set the default one |
| `ORYX_PRESET` | No | `b2c` | Used to set a preset name, available options: `b2b`, `b2c` |
| `ORYX_FEATURE_VERSION` | No | `latest` | Used to set a feature level, available options: `latest`, `1.0`, `1.1`, etc. Only major and minor versions can be used |
| `ORYX_LABS` | No | `false` | Turns on/off oryx labs features. These features are in experimental state and are not production ready |

### Labs Variables

There are some additional variables, which are available only when [labs feature](TODO: ADD LINK) is turned on:

| Variable | Required | Default | Description                               |
|----------|----------|---------|-------------------------------------------|
| `ORYX_CLOUDINARY_ID` | No | None | [Cloudinary](https://cloudinary.com/) API token |
| `ORYX_STORYBLOK_TOKEN` | No | None | [Storyblock](https://www.storyblok.com/home) CMS API token |
| `ORYX_STORYBLOK_SPACE` | No | None | [Storyblock](https://www.storyblok.com/home) CMS space name/id |
| `ORYX_CONTENTFUL_TOKEN` | No | None | [Contentful](https://www.contentful.com/) CMS API token |
| `ORYX_CONTENTFUL_SPACE` | No | None | [Contentful](https://www.contentful.com/) CMS space name/id |
