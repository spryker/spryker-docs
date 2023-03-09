---
title: Configure Algolia
description: Find out how you can configure Algolia in your Spryker shop
last_updated: Feb 21 2023
template: howto-guide-template
---
Once you have integrated the Algolia app, you can configure it.

## Prerequisites

To start using Algolia for your shop, you need an account with Algolia. You can create the account on the [Algolia website](https://www.algolia.com).

## Configure Algolia

To configure Algolia, do the following:

1. In your store's Back Office, go to **Apps**.
2. In **App Composition Platform Catalog**, click **Algolia**. This takes you to the Algolia app details page.
3. In the top right corner of the Algolia app details page, click **Connect app**. The notification saying that the application connection is pending is displayed.
4. Log in to the [Algolia website](https://www.algolia.com).
5. On the Algolia website, go to **Settings**. 
6. Under **Team and Access**, click **API keys**.

![algolia-keys](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-keys.png)

7. From the **Your API Keys** tab, copy the following keys:
    - Application ID
    - Search-Only API Key
    - Admin API Key
8. Go back to your store's Back Office, to the Algolia app details page.
9. In the top right corner of the Algolia app details page, click **Configure**.
10. In the **Configure** pane, fill in the **APPLICATION ID**, **SEARCH-ONLY API KEY**, and **ADMIN API KEY** fields with the values from step 7.

![algolia-settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-settings.png)

11. Click **Save**. 

The Algolia app is now added to your store and starts exporting your product data automatically.

{% info_block infoBox "Info" %}

You need to wait for a few minutes until Algolia finishes the product export.
The more products you have, the longer you have to wait. 
The average export speed is around *100 products per minute*.

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

{% endinfo_block %}

![algolia-index-data](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-index-data.png)

For details about the created index data, see [Indexes](/docs/pbc/all/search/{{page.version}}/third-party-integrations/algolia.html#indexes).

## Optional: Adjust Algolia configuration

The default Algolia app configuration mimics the default Spryker search configuration. However, you may want to adjust some of those settings to your needs.

### Overview of searchable attributes

![algolia-searchable-attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-searchable-attributes.png)

Algolia's **Searchable attributes** configuration determines which attributes are used to find results while searching with a search query.

Default fields for searchable attributes are the following:
- `sku`
- `name`
- `description`
- `keywords`

### Adjust the searchable attributes list

1. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**. 
2. Open the Algolia indices list and find all primary indices. 
3. On the **Configuration** tab, select **Searchable attributes**. 
4. To adjust the **Searchable attributes** list, add and remove needed searchable attributes.
5. Click **Review and save settings**. This opens the **Review and save settings** window.
6. Enable **Copy these settings to other indices and/or replicas** and click **Save settings**.

### Overview of facets list

![algolia-facets](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-facets.png)

Algolia **Facets** configuration determines which attributes are used for search faceting.

Default attributes for faceting are as follows:
- `attributes.brand`
- `attributes.color`
- `category`
- `label`
- `prices`
- `rating`

The `prices` attribute is an object with nested fields. Algolia creates facets for each nested field and creates facets for all the currencies and pricing modes available in product entities.

### Add new attributes for faceting

1. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**. 
2. Find all primary indices.
3. On the **Configuration** tab, select **Facets**.
4. To adjust the **Attributes for faceting** list, add and remove attributes. 
5. Click **Review and save settings**. This opens the **Review and save settings** window.
6. Enable **Copy these settings to other indices and/or replicas** and click **Save Settings**.

### Custom ranking and sorting

![algolia-ranking](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-ranking.png)


Algolia's **Ranking and sorting** configuration determines which products can be shown before others when customers search your catalog. Spryker creates a **Popularity** index where you can use Product properties as ranking or sorting attributes. Learn more about Custom Ranking and Sorting in the [Algolia documentation](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/).
