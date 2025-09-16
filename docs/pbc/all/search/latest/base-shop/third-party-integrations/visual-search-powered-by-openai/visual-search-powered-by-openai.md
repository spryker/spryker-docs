---
title: Product Management powered by OpenAI
description: Generate and apply product translations in the Spryker Back Office. Translate names and descriptions between locales with AI assistance to speed up localization.
last_updated: Sep 16, 2025
template: concept-topic-template
---

This feature enables a shop customer to search for products by uploading a photo instead of typing the search terms.

The back office power user can configure if the customer is redirected to either the catalog search result page with a list of products or to the product detail page of the highest ranked product for the search.

This feature uses OpenAI for translating the picture into a text search terms and letting the Spryker search PBC to perform the search based on the resulting text search terms and the product data stored in the catalog name, description and attributes.

This means in order to successfully use this feature you need:
- Photo of the product or a section of it where the product name, serial number or something similar is clearly recognisable.
- Product with acceptable quality data that means meaningful and real, name, description and attributes like manufacturer name, product number, EAN, serial number or similar.

### How to use

#### As a Shop User

1. Anywhere where the search box is displayed.
2. Click on the icon located at the right.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/visual-search-powered-by-openai/screenshot.png" alt="Visual Search">

3. Upload a photo where a product is recognisable.
4. You will be redirected to either the catalog search or the best ranking product PDP.

#### As a Backoffice Power User

1. Login into the backoffice
2. Go to "Search" → "Visual Search"
3. Select the preferred redirect type:
   - Search results.
   - First result product detail page.

#### Limitations

- JPEG, PNG, GIF and HEIC are the only accepted image formats.
- The catalog product data should have a good quality and as close as possible to real data for example product name, description and attributes for example brand, manufacturer, EAN, serial number… Otherwise the feature will lead to the wrong results.

### Demo Data

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/visual-search-powered-by-openai/thumb.jpeg" alt="Image of a demo product">

## Install

[Install Visual Search powered by OpenAI](/docs/pbc/all/search/latest/base-shop/third-party-integrations/visual-search-powered-by-openai/install-visual-search-powered-by-openai)


































