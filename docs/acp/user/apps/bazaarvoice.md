---
title: Bazaarvoice
description: Find out how you can integrate and use Bazaarvoice in your Spryker shop
template: howto-guide-template
redirect_from:
   - docs/aop/user/apps/bazaarvoice.html
---

The [Bazaarvoice](https://www.bazaarvoice.com/) app lets you collect and add user-generated content (UGC) to your product pages. 

The Bazaarvoice service offers the following UGC: 

- [Rating summaries](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#rating-summary), or star ratings
- [Product reviews](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#reviews)  
<!---- [Questions and answers](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#questions--answers)-->

Bazaarvoice uses the content syndication approach, which means that stores using Bazaarvoice republish each others' content. For example, if a store within the Bazaarvoice's network has got a new product review, this review is shared across all other stores in the network that also have this product.

{% info_block warningBox "Important" %}

To enable Bazaarvoice to match your products to products in other stores and upload product reviews into your store, you must use UPCs or EANs as unique identifiers for your products.

{% endinfo_block %}

When you connect Bazaarvoice, the app puts JavaScrip tags into your store, and the JavaScript code tells the app where to insert the Bazaarvoice content—reviews, star ratings, or questions and answers.

{% info_block infoBox "Info" %}

If you have Bazaarvoice integrated, the Spryker default [Product Ratings and Reviews feature](/docs/scos/user/features/product-rating-and-reviews-feature-overview.html) is turned off. This means that ratings and reviews collected with the default Spryker Product Ratings and Reviews feature are replaced with the BazzareVoice ratings and reviews.

{% endinfo_block %}

## Bazaarvoice integration and configuration

To integrate or configure Bazaarvoice:

1. In your store's Back Office, go to **Apps > Catalog**.
2. Click **Bazaarvoice**.
   This takes you to the Bazaarvoice app details page, from where you can do the integration and configuration.

### Integrating Bazaarvoice into your store

To integrate the Bazaarvoice app into your store:

1. In the top right corner of the Bazaarvoice app details page, click **Connect app**.
   This takes you to the Bazaarvoice site with the signup form.
2. Fill out the Bazaarvoice signup form and submit it.
   You should receive the Bazaarvoice credentials.
3. Go back to your store's Back Office, to the Bazaarvoice app details page.
4. In the top right corner of the Bazaarvoice app details page, click **Configure**.
5. In the **Configure** pane, enter the credentials you received from Bazaarvoice.

That's it. You have integrated the Bazaarvoice app into your store. It usually takes Bazaarvoice a few days to process your product feed. Therefore, you should see the external ratings and reviews from Bazaarvoice in about 2-3 days after you integrated the app.

{% info_block infoBox "Info" %}

You can do the administration work on the Bazaarvoice reviews from the [Bazaarvoice portal](https://portal.bazaarvoice.com/signin). For example, you can approve individual reviews. See [Workbench overview](https://knowledge.bazaarvoice.com/wp-content/brandedge-pro-wb/en_US/basics/workbench_overview.html#log-in-to-workbench) for details on how you can manage reviews from the Bazaarvoice portal.

{% endinfo_block %}

Now, you can configure the BazzareVoice app for your store.

### Configuring Bazaarvoice for your store

For the Bazaarvoice app, you can configure the following for your store:
- Bazaarvoice services you need
- Stores you want the Bazaarvoice UGC to be displayed in

To configure the app, on the Bazaarvoice app details page, click **Configure**.

To configure the Bazaarvoice services:

In **Settings > Select Services** select the services that you need:
   - RATINGS & REVIEWS: These are the accumulated star ratings along with reviews that are displayed on the product details page.
   <!---- QUESTIONS & ANSWERS:--> 
   - INLINE RATINGS: This service displays the star ratings directly in these lists of products, for example, in search results, in the product catalog, etc.
   - Bazaarvoice PIXEL: Adds a single tracking pixel to your shopping cart page and product details page. It lets Bazaarvoice track whether the products that have more UGC have a better conversion rate than products without many ratings and reviews.
   - CONTAINER PAGE: Lets your users add their reviews on the product details page.

To configure the stores where you want to turn on the Bazaarvoice app, in **Settings** > **Store**, select the stores.

## Disconnecting Bazaarvoice from your store
You can always disconnect the Bazaarvoice app from your store. For example, after the trial period, you might decide not to continue with the app. 
To disconnect Bazaarvoice, on the Bazaarvoice app details page, next to the **Configure** button, hold the pointer over <span class="inline-img"><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/bazzarvoice/disconnect-button.png"></span> and click **Disconnect**. Disconnecting the app removes the Bazaarvoice UGC and automatically restores the default Spryker [Product Ratings and Reviews feature](/docs/scos/user/features/product-rating-and-reviews-feature-overview.html) feature.
