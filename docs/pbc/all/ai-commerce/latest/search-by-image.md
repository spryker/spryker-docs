---
title: Search by Image
description: Let customers upload a photo to search for products. AI analyzes the image, identifies a search term, and redirects to search results or a matching product page.
last_updated: Apr 10, 2026
template: concept-topic-template
related:
  - title: Search by Image
    link: /docs/dg/dev/ai/ai-commerce/search-by-image/search-by-image.html
  - title: Install Search by Image
    link: /docs/dg/dev/ai/ai-commerce/search-by-image/install-search-by-image.html
---

Search by Image lets customers find products by uploading a photo. A camera icon next to the search input opens an image upload dialog. After the image is uploaded, AI analyzes it, identifies a relevant search term, and redirects the customer — either to the catalog search results page or directly to the first matching product detail page (PDP).

**Use case:** A customer sees a product they want to buy but does not know what it is called. They photograph the product and upload the image using the Search by Image button. The system identifies the product and takes the customer directly to the matching product or a list of similar results.

Accepted file formats: JPEG, PNG, WebP, and GIF.

## Use Search by Image on the Storefront

1. On any page with the search bar, click the camera icon next to the search input.

   ![Search by Image button](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/search-by-image-button.png)

2. In the dialog that opens, click **Upload image** and select a photo from your device or take a new one using your smartphone camera.

   ![Search by Image upload dialog](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/search-by-image-upload.png)

3. The system analyzes the image and redirects you to the search results or the matching product page.

   ![Search by Image results](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/search-by-image-results.png)

## Enable Search by Image

To enable the feature, in the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Search by Image&nbsp;<span aria-label="and then">></span>&nbsp;Search by Image** and turn on **Enable Search by Image**.

![Search by Image configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/search-by-image-config.png)

## Configure the redirect behavior

After enabling Search by Image, you can control where customers land after a successful image search. In the same settings group, set **Redirect type** to one of the following options:

| OPTION | DESCRIPTION |
|--------|-------------|
| Search results | Redirects the customer to the catalog search results page for the identified search term. This is the default. |
| First result product detail page | Redirects the customer directly to the PDP of the first matching product. |

## Developer resources

| RESOURCE | DESCRIPTION |
|----------|-------------|
| [Search by Image](/docs/dg/dev/ai/ai-commerce/search-by-image/search-by-image.html) | Technical overview: architecture, configuration options, and AiFoundation integration. |
| [Install Search by Image](/docs/dg/dev/ai/ai-commerce/search-by-image/install-search-by-image.html) | Step-by-step installation guide. |
