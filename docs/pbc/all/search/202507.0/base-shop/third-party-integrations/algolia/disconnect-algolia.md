---
title: Disconnect Algolia
description: Learn how you can disconnect Spryker Third party Algolia in to your Spryker based projects.
template: howto-guide-template
last_updated: Oct 17, 2025
redirect_from:
  - /docs/pbc/all/search/202311.0/third-party-integrations/disconnect-algolia.html
  - /docs/pbc/all/search/202311.0/base-shop/third-party-integrations/disconnect-algolia.html
---

Disconnecting the Algolia app immediately restores the default [Elasticsearch](https://www.elastic.co/elasticsearch/) search engine for your store.

{% info_block infoBox "Algolia indexes" %}

When disconnecting Algolia, indexes are NOT deleted from Algolia, so you can access previously collected data from your Spryker shop.

{% endinfo_block %}

To disconnect the Algolia app from your store, do the following:

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Algolia**.
3. On the Algolia app details page, next to the **Configure** button, select **<span class="inline-img">![disconnect-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/bazzarvoice/disconnect-button.png)</span><span aria-label="and then">></span> Disconnect**.
4. In the message that appears, click **Disconnect**.
  This disables the Algolia app for your store.


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/disconnect-algolia/disconnect-algolia.mp4" type="video/mp4">
  </video>
</figure>
