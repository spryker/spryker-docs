---
title: Configure Algolia
description: Learn how you can configure and integrate Spryker Third party Algolia in to your Spryker based projects.
last_updated: March 12, 2025
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/search/202311.0/third-party-integrations/configure-algolia.html
  - /docs/pbc/all/search/202311.0/base-shop/third-party-integrations/configure-algolia.html
---

This document describes how to connect your Algolia account with Spryker and configure product export.

## Prerequisites

- To sign up for Algolia, contact your Customer Success Manager
- [Integrate the Algolia app](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html)


## Configure Algolia

1. In your store's Back Office, go to **Apps**.
2. In **App Composition Platform Catalog**, click **Algolia**. This takes you to the Algolia app details page.
3. In the top right corner of the Algolia app details page, click **Connect app**. The notification saying that the application connection is pending is displayed.
4. Log in to the [Algolia website](https://www.algolia.com).
5. On the Algolia website, go to **Settings**.
6. Under **Team and Access**, click **API keys**.

![algolia-keys](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-keys.png)

7. In the **Your API Keys** tab, take note of following keys:
    - **Application ID**
    - **Search API Key**
    - **Admin API Key**
8. In the Back Office, go to the Algolia app details page.
9. In the top right corner of the Algolia app details page, click **Configure**.
10. In the **Configure** pane, for **APPLICATION ID**, **SEARCH API KEY**, and **ADMIN API KEY**, enter the values you've retrieved in step 7.

![algolia-settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-settings.png)

11. Optional: If your store model has products without prices, select **Products without prices**.
  This setting is used for the initial index setup of Algolia and can't be changed later. Select this only if products without prices can exist in the application.
12. To enable Algolia, select **Use Algolia instead of Elasticsearch**.
  After you save the settings, this enables Algolia search on your frontends: Yves or Glue API-based application. You can also enable it later, for example–after all your products are synced with Algolia.
13. Click **Save**.

The Algolia app is now added to your store and starts exporting product data. For a product to be exported, it must fulfill the following requirements:

- Product is `approved` and `isActive`
- Product has `prices` unless **Products without prices** is selected

{% info_block infoBox "" %}

Depending on the size of your product catalog, Algolia can take from few minutes to several hours to export it. The average export speed is 300 products per minute.

{% endinfo_block %}

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-integration.mp4" type="video/mp4">
  </video>
</figure>


{% info_block warningBox "Verification" %}

Verify that your index is populated with data from your store:
1. Go to the Algolia website.
2. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
3. Make sure that the index is populated with data from your store.

![algolia-index-data](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-index-data.png)

{% endinfo_block %}

For details about the created index data, see [Indexes](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/algolia.html#indexes).
