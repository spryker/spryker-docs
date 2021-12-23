---
title: BazzarVoice
description: Find out how you can integrate and use BazzarVoice in your Spryker shop
template: howto-guide-template
---

The [BazzarVoice](https://www.bazaarvoice.com/) app lets you collect and add user-generated content (UGC) to your product pages. 

The BazzarVoice service offers the following UGC: 

- [Rating summaries](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#rating-summary) (stars)
- [Product reviews](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#reviews)  
- [Questions and answers](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html#questions--answers)

BazzarVoice uses the content syndication approach, which means that stores using BazzarVoice republish each others' content. For example, if a store within the BazzarVoice's network has got a new product review, this review is shared across all other stores in the network that also have this product.

{% info_block warningBox "Important" %}

To enable BazzarVoice match your products to products in other stores and upload product reviews into your store, you must use UPCs or EANs as unique identifiers for your products.

{% endinfo_block %}

When you connect BazzarVoice, the app puts JavaScrip tags into your store, and the JavaScript code tells where to insert the BazzarVoice content - reviews, star ratings or questions and answers.

{% info_block infoBox "Info" %}

If you have BazzarVoice integrated, the Spryker default [Product Ratings and Reviews feature](/docs/scos/user/features/{{page.version}}/product-rating-and-reviews-feature-overview.html#current-constraints) is turned off. This means that ratings and reviews collected with the default Spryker Product Ratings and Reviews feature are replaced with the BazzareVoice ratings and reviews.

{% endinfo_block %}

## Integrating BazzarVoice into your store

To integrate the BazzarVoice app into your store:

1. In your store's Back Office, go to Apps.
2. Click BazzarVoice.
   This takes you to the BazzarVoice app details page.
3. In the top right corner of the BazzarVoice app details page, click **Connect app**.
   This takes you to the BazzarVoice site with the signup form.
4. Fill out the BazzarVoice signup form and submit it.
   You should receive the BazzarVoice credentials.
5. Go back to your store's Back Office, to the BazzarVoice app details page.
6. In the top right corner of the BazzarVoice app details page, click **Cofigure**.
7. In the *Configure* pane, enter the credentials you received from BazzarVoice.

That's it. You have integrated the BazzarVoice app into your store. Now, configure the app. See the next sections for the configuration details.

## Configuring BazzarVoice for your store
