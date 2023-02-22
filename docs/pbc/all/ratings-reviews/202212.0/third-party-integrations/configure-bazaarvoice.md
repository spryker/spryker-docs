---
title: Configure Bazaarvoice
description: Find out how you can configure Bazaarvoice in your Spryker shop
template: howto-guide-template 
redirect_from:
  - /docs/pbc/all/ratings-reviews/third-party-integrations/configure-bazaarvoice.html
---

After you have [integrated the Bazaarvoice app](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/integrate-bazaarvoice.html), you can configure the following for your store:
- Bazaarvoice services you need
- Stores you want the Bazaarvoice UGC to be displayed in

To configure the Bazaarvoice the app, do the followoing:

1. In your store's Back Office, go to **Apps > Catalog**.
2. Click **Bazaarvoice**.
3. In the top right corner of the Bazaarvoice app details page, click **Connect app**.
   This takes you to the Bazaarvoice site with the signup form.
4. Fill out the Bazaarvoice signup form and submit it.
   You should receive the Bazaarvoice credentials.
5. Go back to your store's Back Office, to the Bazaarvoice app details page.
6. In the top right corner of the Bazaarvoice app details page, click **Configure**.
7. In the **Configurations** pane, enter the credentials you received from Bazaarvoice.

![bv-configuration-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/ratings-reviews/third-party-integrations/configure-bazaarvoice/bv-config-page.png)

The following table explains where you can take the values for populating the fields.

<div class="width-100">

| Field   |      Where can you get this information in the Bazaarvoice Portal      |
|----------|:-------------:|
| Client name | This is the instance's name you want to connect to Spryker. You can find your list of instances [here](https://portal.bazaarvoice.com/configurations/sitemanager/clientselector).|
| Site ID | The Site ID can be found on [this page](https://config.portal.bazaarvoice.com/siteManager). Select the Site ID that matches the deployment zone you want to connect to your Spryker project.   |
| API Key | Select one of your API keys from [this page](https://portal.bazaarvoice.com/developer-tools/api-keys). If your account does not contain any API key, watch the video below for the details on how to create one. |

</div>

The following video explains how you can create an API key if it is not available in your account:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/ratings-reviews/third-party-integrations/configure-bazaarvoice/bv-api-key-creation-process.mov" type="video/mp4">
  </video>
</figure>

8. In **sFTP Settings** fill out BazaarVoice's SFTP credentials if you want to track whether the products that have more UGC have a better conversion rate than products without many ratings and reviews.

| Field    |                    Description                     |
|----------|:--------------------------------------------------:|
| Username |   The user name to connect on BazaarVoice's sFTP   |
| Password |   The password to connect on BazaarVoice's sFTP    |
| Region   | The region where you data is hosted on BazaarVoice |

{% info_block warningBox "Important" %}

If you do not know your credentials or you don't know your region, please reach out to the internal contact that manages your product feed or open a support case with Bazaarvoice.

{% endinfo_block %}

9. In **Settings > Select Services**, select the services that you need:
   - RATINGS & REVIEWS: These are the accumulated star ratings along with reviews that are displayed on the product details page.
   <!---- QUESTIONS & ANSWERS:--> 
   - INLINE RATINGS: This service displays the star ratings directly in these lists of products, for example, in search results, in the product catalog, etc.

10. To configure the stores where you want to turn on the Bazaarvoice app, in **Settings** > **Store**, select the stores.

11. Click **Save**.

This adds the Bazaarvoice app to your store. It usually takes Bazaarvoice a few days to process your product feed. Therefore, you should see the external ratings and reviews from Bazaarvoice in about 2-3 days after you connected the app.

{% info_block infoBox "Info" %}

You can do the administration work on the Bazaarvoice reviews from the [Bazaarvoice portal](https://portal.bazaarvoice.com/signin?ref=spryker-documentation). For example, you can approve individual reviews. See [Workbench overview](https://knowledge.bazaarvoice.com/wp-content/brandedge-pro-wb/en_US/basics/workbench_overview.html#log-in-to-workbench?ref=spryker-documentation) for details on how you can manage reviews from the Bazaarvoice portal.

{% endinfo_block %}
