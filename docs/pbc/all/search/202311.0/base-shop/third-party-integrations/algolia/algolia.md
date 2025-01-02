---
title: Algolia
description: Algolia empowers Builders with Search and Recommendation services to create world-class digital experiences.
last_updated: June 26 2023
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/search/202311.0/third-party-integrations/algolia.html  - 
  - /docs/pbc/all/search/202311.0/base-shop/third-party-integrations/algolia.html
---

![algolia-hero](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/algolia/algolia-hero.png)

Spryker is shipped with [Elasticsearch](https://www.elastic.co/elasticsearch/) as the default search engine. However, you can replace it with [Algolia](https://www.algolia.com/). The Algolia search engine stands out because of its performance. With the Algolia app, your users can conduct advanced searches of active concrete products in your store.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/algolia/Algolia_ACPApp_Demo.mp4" type="video/mp4">
  </video>
</figure>

To use Algolia as your search engine, you need an account with Algolia. For details about Algolia integration, see [Integrate Algolia](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html).

{% info_block infoBox "Note" %}

With the current ACP Algolia App, you can retrieve Algolia search results in your Strorefront from the Spryker API endpoint `GET /catalog-search`. The Spryker Storefront will soon be supported.

{% endinfo_block %}

## Searchable attributes

Your users can search for active concrete products by the following attributes:

- SKU
- Name
- Description
- Keywords

{% info_block infoBox "Note" %}

Spryker groups all concrete products that belong to the same abstract product if a search query returns the concrete products.

{% endinfo_block %}

## Indexes

An index is a place where the data used by Algolia is stored.

In case of the Spryker store, the index is a complete list of all active concrete products that can appear in search results.
There are separate indexes for each locale and sorting strategy. With the Algolia app, the search results in your store can be sorted by the following options:

- Primary index
- From highest to lowest rating
- By price in ascending order
- By price in descending order
- By name in ascending order
- By name in descending order

For example, if you have two locales, there will be 12 indexes for your store in Algolia. One for each locale and sorting strategy:

![algolia-indexes](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/algolia/algolia-index.png)

The Algolia index is always kept up to date with product data changes. That means that if a Back Office user added or changed some searchable product attribute such as a description, the change is immediately reflected in the Algolia search results.

### How products are stored in Algolia

Here is an example of product data stored in Algolia:

```json
{
  "sku": "017_21748906",
  "name": "Sony Cyber-shot DSC-W800",
  "abstract_name": "Sony Cyber-shot DSC-W800",
  "description": "Styled for your pocket Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
  "url": "/en/sony-cyber-shot-dsc-w800-17",
  "product_abstract_sku": "017",
  "rating": 4.5,
  "keywords": "Sony,Entertainment Electronics",
  "images": {
    "default": [
      {
        "small": "https://images.icecat.biz/img/norm/medium/21748906-Sony.jpg",
        "large": "https://images.icecat.biz/img/norm/high/21748906-Sony.jpg"
      }
    ]
  },
  "category": [
    "Demoshop",
    "Cameras & Camcorders",
    "Digital Cameras"
  ],
  "label": [],
  "hierarchical_categories": {
    "lvl0": "Demoshop",
    "lvl1": "Demoshop > Cameras & Camcorders",
    "lvl2": "Demoshop > Cameras & Camcorders > Digital Cameras"
  },
  "attributes": {
    "brand": "Sony",
    "color": "Silver",
    "digital_zoom": "40 x",
    "internal_memory": "29 MB",
    "optical_zoom": "5 x",
    "upcs": "0013803252897",
    "usb_version": "2"
  },
  "merchant_name": [ // Marketplace only
    "Video King",
    "Budget Cameras"
  ],
  "merchant_reference": [ // Marketplace only
    "MER000002",
    "MER000005"
  ],
  "search_metadata": [], // Put inside this list all your ranking attributes
  "concrete_prices": {
    "eur": {
      "gross": 345699,
      "net": 311129
    },
    "chf": {
      "gross": 397554,
      "net": 357798
    }
  },
  "prices": {
    "eur": {
      "gross": 345699,
      "net": 311129
    },
    "chf": {
      "gross": 397554,
      "net": 357798
    }
  },
  "objectID": "017_21748906"
}
```

## Next step
[Integrate Algolia](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html)
