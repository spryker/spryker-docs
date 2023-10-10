---
title: Use API Key authorization
description: This document describes how to use API Key authorization mechanism in Spryker.
last_updated: October 10, 2023
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/use-api-key-authorization.html
  - /docs/scos/dev/glue-api-guides/202212.0/use-api-key-authorization.html
---

This document describes how to use API Key authorization mechanism in Spryker.

## How authentication works

The API Key authorization mechanism lets users authenticate themselves with their API Key generated from Backoffice. The generated API Key can then be used to access protected resources.

## Prerequisites

Install the required features:

| NAME | VERSION | INTEGRATION GUIDE                                                                                                                                        |
| --- | --- |----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue Application | {{page.version}} | [Integrate the API Key Authorization](/docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-api-key-authorization.html) |

## Create an API Key in Backoffice

To create an API Key in Backoffice, follow these steps:
1. Log in to Backoffice.
2. Navigate to **Administration** > **API Keys**.
3. Click **Create API Key**.
4. Enter a name for the API Key.
5. Enter a Valid To date if needed. Note that if you **do not enter a date**, the API Key will be valid indefinitely.
6. Click **Create**.
7. Copy the generated API Key and save it in a secure place. Spryker does not store the API Key, so if you lose it, you will need to generate a new one or regenerate the current Key.

## Use the API Key to access protected resources

There are 2 ways to pass the API Key to access protected resources:
1. Pass the API Key in the `X-Api-Key` header.
2. Pass the API Key in the `api_key` URL parameter.

<details open>
<summary markdown='span'>An example of how to pass the API Key in the `X-Api-Key` header:</summary>

```bash
curl --location 'http://glue-backend.de.spryker.local/dynamic-entity/countries \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'X-Api-Key: 6264714260f980fe38c6be2439b0a8e9'
```
</details>

<details open>
<summary markdown='span'>An example of how to pass the API Key in the `api_key` URL parameter:</summary>

```bash
curl --location 'http://glue-backend.de.spryker.local/dynamic-entity/countries?api_key=6264714260f980fe38c6be2439b0a8e9 \
--header 'Content-Type: application/json' \
--header 'Accept: application/json'
```
</details>