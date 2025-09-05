---
title: Configure Algolia
description: Learn how to configure and integrate Spryker's third-party Algolia into your Spryker-based projects.
last_updated: Sep 1, 2025
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/search/202311.0/third-party-integrations/configure-algolia.html
  - /docs/pbc/all/search/202311.0/base-shop/third-party-integrations/configure-algolia.html
---

This document explains how to connect your Algolia account to Spryker and configure data export.

## Prerequisites

- To sign up for Algolia, contact your Customer Success Manager.
- [Integrate the Algolia app](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/integrate-algolia.html)

## Configure Algolia

1. In your store's Back Office, go to **Apps**.
2. In the **App Composition Platform Catalog**, click **Algolia** to open the Algolia app details page.
3. In the top right corner of the Algolia app details page, click **Connect app**. A notification will appear indicating that the application connection is pending.
4. Log in to the [Algolia website](https://www.algolia.com).
5. On the Algolia website, go to **Settings**.
6. Under **Team and Access**, click **API keys**.

![algolia-keys](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-keys.png)

7. In the **Your API Keys** tab, note the following keys:
    - **Application ID**
    - **Search API Key**
    - **Admin API Key** (**Write API Key** with permission to create indexes also works)
8. In the Back Office, return to the Algolia app details page.
9. In the top right corner, click **Configure**.
10. In the **Configure** pane, enter the values you retrieved in step 7 for **APPLICATION ID**, **SEARCH API KEY**, and **ADMIN API KEY**. These keys are only required to start data export to Algolia.

![algolia-settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-settings.png)


11. **Use Algolia instead of Elasticsearch for products**: Select this option to use Algolia as the search engine for **products** instead of Elasticsearch. This setting is optional and can be enabled later.
12. **Use Algolia instead of Elasticsearch for CMS pages**: Select this option to use Algolia as the search engine for **CMS pages** instead of Elasticsearch. This setting is optional and can be enabled later.
13. If your store model includes products without prices, select **Products without prices**. This setting is used for the initial index setup in Algolia and cannot be changed later. Select this only if products without prices can exist in your application.
14. Optionally, to enable search in Spryker for other entities (such as Docs, Blog, or any custom entity), select [**Use Algolia instead of Elasticsearch for other entities**](#additional-configuration-use-algolia-for-other-entities).
15. Click **Save**.

The Algolia app is now added to your store and begins exporting product and/or CMS page data.
To be exported, a product must meet the following requirements:

- The product is `approved` and `isActive`.
- The product has `prices`, unless **Products without prices** is selected.

{% info_block infoBox "" %}

Depending on the size of your product catalog, Algolia may take from a few minutes to several hours to export it.
The average export speed is 300 products per minute.

{% endinfo_block %}

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-integration.mp4" type="video/mp4">
  </video>
</figure>

{% info_block warningBox "Verification" %}

Verify that your index is populated with data from your store:
1. Go to the Algolia Dashboard website.
2. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
3. Ensure the index is populated with data from your store.

![algolia-index-data](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-index-data.png)

{% endinfo_block %}

For details about the created index data, see [Indexes](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia.html#indexes).

## Additional configuration: Use Algolia for other entities

The setting **Use Algolia instead of Elasticsearch for other entities** allows you to enable Algolia search for entities beyond products and CMS pages, such as Docs, Blog, or any other custom entity from your Spryker application.
This is useful if you already have indexes in Algolia created manually, by other integrations, or by Algolia Crawler.
It allows you to integrate custom search for Spryker Yves and Glue API applications in the same way as for products and CMS pages,
using `spryker/search` and the Algolia ACP adapter from the `spryker/search-http` module by adding custom plugins.

![algolia-settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-settings-entity-mapping.png)
(All fields are required.)

When you enable this setting, you need to provide the following information for each entity you want to enable Algolia search for:

- **Entity Name**: The custom entity name, which is also used as `sourceIdentifier` in `SearchHttpQueryPlugin((new SearchContextTransfer())->setSourceIdentifier('document'))`.
- **Store**: The Spryker store name where the search will happen. Use '*' if all stores should use the same Algolia index.
- **Locales**: The locales for which the index will be used, for example `en_US,en_GB`, or '*' if all locales should use the same Algolia index.
- **Algolia Index Name**: The name of the Algolia index that contains the data for this entity, for example `documents_en`.
