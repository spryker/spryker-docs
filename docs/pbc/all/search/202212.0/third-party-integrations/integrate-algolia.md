---
title: Integrate Algolia
description: Integrate Algolia in your Spryker shop
template: howto-guide-template
---

To start using Algolia for your shop, you need an account with Algolia. You can create the account at the [Algolia website](https://www.algolia.com).

To integrate the Algolia app, do the following:

1. In your store's Back Office, go to **Apps**.
2. Click **Algolia**. This takes you the Algolia app details page.
3. In the top right corner of the Algolia app details page, click **Connect app**. The message saying that application connection pending is displayed.
4. Log in to the [Algolia website](https://www.algolia.com).
5. On the Algolia website, go to **Settings -> Team and Access -> API keys**:
![algolia-keys](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-keys.png)
6. Copy the following keys:
    - Application ID
    - Search-Only API Key
    - Admin API Key
7. Go back to your store's Back Office, to the Algolia app details page.
8. In the top right corner of the Algolia app details page, click **Configure**.
9. In the **Configure** pane, populate the _APPLICATION ID_, _SEARCH-ONLY API KEY_, and _ADMIN API KEY_ fields with the values from step 6.
![algolia-settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-settings.png)
10. Click **Save**.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-integration.mp4" type="video/mp4">
  </video>
</figure>

The Algolia app is now integrated to your store and starts exporting your product data automatically. Wait for a few minutes and go back to the Algolia website, to the **Overview -> Search -> Index** page. 

{% info_block infoBox "Info" %}

The more products you have, the longer you have to wait until Algolia finishes the export. The average export speed is around 100 products per minute.

{% endinfo_block %}

The index is now populated with data from your store:
![algolia-index-data](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-index-data.png)

For details on the created index data, see [Indexes](/docs/pbc/all/search/{{page.version}}/third-party-integrations/algolia.html#indexes).