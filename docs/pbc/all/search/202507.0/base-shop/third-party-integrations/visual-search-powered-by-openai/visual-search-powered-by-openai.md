---
title: Visual Search powered by OpenAI
description: Search for products by uploading a photo with Spryker Visual Search. Powered by OpenAI, it translates images into search terms for faster, accurate results.
last_updated: Sep 16, 2025
template: concept-topic-template
---

This feature enables a shop customer to search for products by uploading a photo instead of typing the search terms.

Back Office users can configure if the customer is redirected to either the catalog search result page with a list of products or to the product detail page of the highest ranked product for the search.

This feature uses OpenAI for translating the picture into a text search terms and letting the Spryker search to perform the search based on the resulting text search terms and the product data stored in the catalog name, description and attributes.

To use this feature, you need the following:
- Photo of the product or a section of it where the product name, serial number or something similar.
- Product with acceptable quality data that means meaningful and real, name, description and attributes such as manufacturer name, product number, EAN, serial number or similar.

Accepted file formats: JPEG, PNG, GIF, and HEIC

## Use visual search on the Storefront

1. Open a page with search.
2. Click the visual search icon.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/visual-search-powered-by-openai/screenshot.png" alt="Visual Search">

3. Upload a photo where a product is recognisable.
This opens the catalog search or the best ranking product details page.

## Configure visual search in the Back Office

1. In the Back Office, go to **Search** > **Visual Search**.
3. Select the preferred redirect type:
- Search results
- First result product detail page

## Demo data

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/visual-search-powered-by-openai/thumb.jpeg" alt="Image of a demo product">

## Install

[Install Visual Search powered by OpenAI](/docs/pbc/all/search/latest/base-shop/third-party-integrations/visual-search-powered-by-openai/install-visual-search-powered-by-openai)


































