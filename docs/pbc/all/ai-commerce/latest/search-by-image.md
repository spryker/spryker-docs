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

Search by Image helps B2B buyers identify a product quickly by uploading a photo. It removes the need to search through long catalogs or remember specific product names. A single image is enough for the system to recognize what is shown and guide the buyer to the right product.

Search by Image supports teams who work with shelf layouts, packaging, spare parts, equipment, or product sets that are easier to photograph than describe. It is part of the wider Search by Image capabilities that allow ordering and discovery workflows to begin with a photo.

## Why Search by Image is useful
Product names and SKUs can be difficult to recall in B2B environments where assortments are large or highly technical. Field staff, store teams, and buyers often rely on visual cues in their daily work. Search by Image makes use of these cues by letting users take a photo and move directly to the right item.

This improves product discovery, reduces errors, and speeds up workflows where time and accuracy are critical.

## How buyers use it
1. The buyer clicks the camera icon next to the storefront search bar.
2. They upload a photo or take a new one.
3. The system analyzes the image and identifies what is shown.
4. The buyer is directed to the most relevant product or product results.

## Ideal use cases
Search by Image is effective in environments where buyers interact with physical products or need quick identification. Common scenarios include:
- Reordering products from shelves or storage areas
- Identifying consumables or spare parts
- Helping field teams find items during customer visits
- Supporting buyers who manage large assortments or private labels
- Enabling mobile-first workflows when exact naming is unknown

## Benefits for your business
- Improves product discovery in large catalogs
- Reduces mistakes caused by manual search or inconsistent naming
- Supports mobile buying and field sales workflows
- Helps teams identify items with similar or technical naming
- Enhances buyer satisfaction by reducing effort

## Supported file formats
Search by Image accepts JPEG, PNG, WebP, and GIF files. These formats are widely supported by mobile devices and work well in B2B environments where users take photos on the go.

## How buyers use Visual Search on the storefront

1. Open any page that contains the search bar and tap the camera icon next to the search field.

   ![Search by Image button](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/search-by-image-button.png)

2. In the dialog that appears, select **Upload image**. You can choose a photo from your device or take a new one with your mobile camera.

   ![Search by Image upload dialog](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/search-by-image-upload.png)

3. Visual Search analyzes the image and identifies the product shown. Once the analysis is complete, you are redirected either to the most relevant product page or to a list of suitable results.

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
