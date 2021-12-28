---
title: BazzarVoice
description: Find out how you can integrate and use BazzarVoice in your Spryker shop
template: howto-guide-template
---

The [BazzarVoice](https://www.bazaarvoice.com/) app lets you collect and add user-generated content (UGC) to your product pages. 

The BazzarVoice service offers the following UGC: 

- [Rating summaries](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#rating-summary), or star ratings
- [Product reviews](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#reviews)  
<!---- [Questions and answers](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#questions--answers)-->

BazzarVoice uses the content syndication approach, which means that stores using BazzarVoice republish each others' content. For example, if a store within the BazzarVoice's network has got a new product review, this review is shared across all other stores in the network that also have this product.

{% info_block warningBox "Important" %}

To enable BazzarVoice to match your products to products in other stores and upload product reviews into your store, you must use UPCs or EANs as unique identifiers for your products.

{% endinfo_block %}

When you connect BazzarVoice, the app puts JavaScrip tags into your store, and the JavaScript code tells the app where to insert the BazzarVoice content - reviews, star ratings, or questions and answers.

{% info_block infoBox "Info" %}

If you have BazzarVoice integrated, the Spryker default [Product Ratings and Reviews feature](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html) is turned off. This means that ratings and reviews collected with the default Spryker Product Ratings and Reviews feature are replaced with the BazzareVoice ratings and reviews.

{% endinfo_block %}

## BazzarVoice integration and configuration

To integrate or configure BazzarVoice:

1. In your store's Back Office, go to *Apps*.
2. Click BazzarVoice.
   This takes you to the BazzarVoice app details page, from where you can do the integration and configuration.

### Integrating BazzarVoice into your store

To integrate the BazzarVoice app into your store:

1. In the top right corner of the BazzarVoice app details page, click **Connect app**.
   This takes you to the BazzarVoice site with the signup form.
2. Fill out the BazzarVoice signup form and submit it.
   You should receive the BazzarVoice credentials.
3. Go back to your store's Back Office, to the BazzarVoice app details page.
4. In the top right corner of the BazzarVoice app details page, click **Configure**.
5. In the *Configure* pane, enter the credentials you received from BazzarVoice.

That's it. You have integrated the BazzarVoice app into your store. It usually takes BazzarVoice a few days to process your product feed. Therefore, you should see the external ratings and reviews from BazzarVoice in about 2-3 days after you integrated the app.

{% info_block infoBox "Info" %}

You can do the administration work on the BazzarVoice reviews from the [BazzarVoice portal](https://portal.bazaarvoice.com/signin). For example, you can approve individual reviews. See [Workbench overview](https://knowledge.bazaarvoice.com/wp-content/brandedge-pro-wb/en_US/basics/workbench_overview.html#log-in-to-workbench) for details on how you can manage reviews from the BazzarVoice portal.

{% endinfo_block %}

Now, you can configure the BazzareVoice app for your store.

### Configuring BazzarVoice for your store

For the BazzarVoice app, you can configure the following for your store:
- BazzarVoice services you need
- Stores you want the BazzarVoice UGC to be displaed in

To configure the app, on the BazzarVoice app details page, click **Configure**.

To configure the BazzarVoice services:

In *Settings*->*Select Services* select the services you need:
   - RATINGS & REVIEWS: These are the accumulated star ratings along with reviews that are displayed on the product details page.
   <!---- QUESTIONS & ANSWERS:--> 
   - INLINE RATINGS: This service displays the star ratings directly in these lists of products, for example, in search results, in the product catalog, etc.
   - BAZZARVOICE PIXEL: Adds a single tracking pixel to your shopping cart page and product details page. It allows BazzarVoice to track whether the products that have more UGC have a better conversion rate than products without many ratings and reviews.
   - CONTAINER PAGE: Lets your users add their reviews on the product details page.

To configure the stores where you want to turn on the BazzarVoice app, in *Settings->Store*, select the stores.

## Disconnecting BazzarVoice from your store
You can always disconnect the BazzarVoice app from your store. For example, after the trial period, you might decide not to continue with the app. 

To disconnect BazzarVoice, on the BazzarVoice app details page, next to the **Configure** button, hold the pointer over <div class="inline-img">![disconnect-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/bazzarvoice/disconnect-button.png)</div> and click **Disconnect**.

Disconnecting the app removes the BazzarVoice UGC and automatically restores the default Spryker [Product Ratings and Reviews feature](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html) feature.
