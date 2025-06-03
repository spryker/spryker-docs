---
title: Bazaarvoice
description: Find out how you can integrate and use Spryker third party integration Bazaarvoice in your Spryker shop
template: howto-guide-template
last_updated: Nov 21, 2023
redirect_from:
   - docs/aop/user/apps/bazaarvoice.html
   - docs/acp/user/apps/bazaarvoice.html
   - docs/pbc/all/ratings-reviews/third-party-integrations/bazaarvoice.html  
   - /docs/pbc/all/ratings-reviews/202204.0/third-party-integrations/bazaarvoice.html
---

![Bazaarvoice](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/ratings-reviews/third-party-integrations/bazaarvoice/bazaarvoice.png)

The [Bazaarvoice](https://www.bazaarvoice.com/?ref=spryker-documentation) app lets you collect and add user-generated content (UGC) to your product pages.

{% wistia fhyuouxbpp 960 720 %}

The Bazaarvoice service offers the following UGC: 

- [Rating summaries](https://docs.bazaarvoice.com/articles/ratings-reviews/display_integration/a/rating-summary?ref=spryker-documentation), or star ratings
- [Product reviews](https://docs.bazaarvoice.com/articles/#!ratings-reviews/display_integration/a/reviews?ref=spryker-documentation)  
<!---- [Questions and answers](hhttps://docs.bazaarvoice.com/articles/#!ratings-reviews/display_integration/a/questions--answers?ref=spryker-documentation)-->

Bazaarvoice uses the content syndication approach, which means that stores using Bazaarvoice republish each others' content. For example, if a store within the Bazaarvoice's network has got a new product review, this review is shared across all other stores in the network that also have this product.

{% info_block warningBox "Important" %}

To enable Bazaarvoice to match your products to products in other stores and upload product reviews into your store, you must use UPCs or EANs as unique identifiers for your products.

{% endinfo_block %}

When you connect Bazaarvoice, the app puts JavaScrip tags into your store, and the JavaScript code tells the app where to insert the Bazaarvoice content—reviews, star ratings, or questions and answers.

{% info_block infoBox "Info" %}

If you have Bazaarvoice integrated, the Spryker default the [Ratings and Reviews](/docs/pbc/all/ratings-reviews/{{page.version}}/ratings-and-reviews.html) feature is turned off. This means that ratings and reviews collected with the default Spryker Product Ratings and Reviews feature are replaced with the BazzareVoice ratings and reviews.

{% endinfo_block %}

## Next step
[Integrate Bazaarvoice](/docs/pbc/all/ratings-reviews/{{page.version}}/third-party-integrations/integrate-bazaarvoice.html)
