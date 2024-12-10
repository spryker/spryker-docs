---
title: Configure Bazaarvoice
description: Find out how you can configure Spryker third party integration Bazaarvoice in your Spryker shop.
template: howto-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/pbc/all/ratings-reviews/third-party-integrations/configure-bazaarvoice.html
  - /docs/pbc/all/ratings-reviews/202204.0/third-party-integrations/configure-bazaarvoice.html
---

After you have [integrated the Bazaarvoice app](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/integrate-bazaarvoice.html), you can configure the following for your store:
- Bazaarvoice services you need
- Stores you want the Bazaarvoice  user-generated content (UGC) to be displayed in

To configure the Bazaarvoice the app, do the followoing:

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
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

8. Optional: To track whether the products that have more UGC have a higher conversion rate than those without many ratings and reviews, in **sFTP Settings**, fill out the following fields:

| FIELD    |                    DESCRIPTION                     |
|----------|:--------------------------------------------------:|
| Username |   The user name to connect to Bazaarvoice's sFTP.   |
| Password |   The password to connect to Bazaarvoice's sFTP.    |
| Region   | The region where your data is hosted on Bazaarvoice. |

{% info_block warningBox "Credentials and region information" %}

If you are unsure of your credentials or the region, reach out to the internal Bazaarvoice contact that manages your product feed. Alternatively, you can open a support case with [Bazaarvoice](https://support.bazaarvoice.com/).

{% endinfo_block %}

![bv-sftp-settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/ratings-reviews/third-party-integrations/configure-bazaarvoice/bv-sftp-settings.png)

9. In **Settings&nbsp;<span aria-label="and then">></span> Select Services**, select the services that you need:
   - RATINGS & REVIEWS: These are the accumulated star ratings along with reviews that are displayed on the product details page.
   <!---- QUESTIONS & ANSWERS:-->
   - INLINE RATINGS: This service displays the star ratings directly in these lists of products, for example, in search results, in the product catalog, etc.

10. To configure the stores where you want to turn on the Bazaarvoice app, in **Settings&nbsp;<span aria-label="and then">></span> Store**, select the stores.

11. Click **Save**.

This adds the Bazaarvoice app to your store. It usually takes Bazaarvoice a few days to process your product feed. Therefore, you should see the external ratings and reviews from Bazaarvoice in about 2-3 days after you connected the app.

{% info_block infoBox "Info" %}

You can do the administration work on the Bazaarvoice reviews from the [Bazaarvoice portal](https://portal.bazaarvoice.com/signin?ref=spryker-documentation). For example, you can approve individual reviews. See [Workbench overview](https://knowledge.bazaarvoice.com/wp-content/brandedge-pro-wb/en_US/basics/workbench_overview.html#log-in-to-workbench?ref=spryker-documentation) for details on how you can manage reviews from the Bazaarvoice portal.

{% endinfo_block %}

## Retain Bazaarvoice configuration after a destructive deployment

{% info_block errorBox "" %}
[Destructive deployment](https://spryker.com/docs/dg/dev/acp/retaining-acp-apps-when-running-destructive-deployments.html) permanently deletes the configuration of Bazaarvoice.

To run a destructive deployment, follow the steps:
1. Disconnect Bazaarvoice.
2. Run a destructive deployment.
3. Reconnect Bazaarvoice.

{% endinfo_block %}
