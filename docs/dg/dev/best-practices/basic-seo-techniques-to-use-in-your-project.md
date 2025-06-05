---
title: Basic SEO techniques to use in your project
description: Learn how you can effectively use headings and mircodata to improve SEO for your project
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/basic-seo-techniques-to-use-in-your-project
originalArticleId: 56e34beb-79e3-44b0-a7b9-06489c78e9ac
redirect_from:
  - /docs/scos/dev/best-practices/basic-seo-techniques-to-use-in-your-project.html
---

Search Engine Optimization or SEO is the process of improving a site to increase its visibility for relevant searches. The better visibility a page has in search results, the more likely you are to garner attention and attract prospective and existing customers to your business.

Search engines use bots to crawl pages on the web, going from site to site, collecting information about those pages, and putting them in an index. Next, algorithms analyze pages in the index, taking into account a lot of ranking factors, to determine the order pages should appear in the search results for a given query.

To increase search result ranking in the Spryker system, we use some basic SEO approaches. To utilize them in your project, first of all, you need to define the landing pages, which will collect the basic traffic and should be indexed first. By default, in the Spryker system, these landing pages are *Product details*, *Catalog*, *Shared Shopping List*, and *Product bundle* pages.

The simplest and basic way to optimize SEO of page content is the proper usage of headings on the pages and microdata usage.

## Using headings

Headings allow for easy navigation through page content and help users and search engines read and understand the text. However, for the headings to be helpful for users and search engines, the headings must be structured well, and contain the key phrases.

{% info_block warningBox "H1 headings" %}

It is important to use the `h1` heading. However, the number of `h1` elements on each page must be limited to one. The `h1` heading must be the name or title of the page.

{% endinfo_block %}

For example, on a catalog page, `h1` is the name of the chosen category. Or, on a product details page, it's the product name.
Then `h2` and `h3` subheadings are used to introduce different sections. Those individual sections might also use more specific headers (`h3` tags, then `h4` tags) to introduce sub-sections. It's rare for most content to get deep enough to need to use h4 tags.

Check out the headings structure on a catalog page in the Spryker Demo Shop:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Applying+basic+SEO+approaches+to+your+project/catalog-page.png)

To keep the initial Spryker design, we use the service CSS classes title with modifiers h1-h6. At the same time, headings in CMS blocks are div elements, as these blocks can be injected anywhere and potentially could break the common heading structure.

## Using microdata

After introducing the headings structure, the next step towards increasing the search result ranking is using the microdata. There are different approaches to using microdata on a page, and one of them is the usage of the [Schema.org](https://schema.org/) vocabulary, which we also implemented for the Spryker system. [Schema.org](https://schema.org/) (often called Schema) is a semantic vocabulary of tags or microdata that you can add to your HTML to improve the way search engines read and represent your page on search engine results pages (SERPs). Microdata is one of three code languages designed to provide search-engine spider programs with information about the website content. The failure to use microdata leads to the reduction of search ranks of the shop pages. Because the content is not typed for search engines in this case, and they can not build structured pages to index them well.

Integrating microdata into code offers a number of potential advantages. First, microdata can give search engine crawlers more context for the type of information on a website and the way the site should be indexed and ranked. Another benefit of microdata is the creation of *rich snippets*, which display more information on the SERPs than traditional listings.

Considering that Spryker is an e-commerce platform, the most important types of information are:

- Product: any offered product or service
- Offer: an offer to transfer some rights to an item or to provide a service
- Review: a review of an item
- AggregateRating: the average rating based on multiple ratings or reviews
- PropertyValue: a property-value pair represents a feature of a product or place

Here is an example of the [Schema.org](https://schema.org/) microdata implementation for a page:

```html
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="name">Product name</span>  
</div>
```

The `itemscope` element in an HTML tag encloses information about the item. The `itemscope` specifies that the HTML contained in the tag is about a particular item. To specify the type of the item, we use the itemtype attribute right after the `itemscope`. For example, on the following Spryker Product details page, the `itemtype` attribute specifies that the item contained in the tag has the Product type, as defined in the [schema.org](https://schema.org/) type hierarchy. Item types are provided as URLs, in our case `http://schema.org/Product`. To label properties of items, we use the itemprop attribute:

<details>
<summary>Name, image, and product wrapper</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Applying+basic+SEO+approaches+to+your+project/name-image-product-wrapper.png)

 </details>

<details>
 <summary>Brand,  SKU, offer, and price</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Applying+basic+SEO+approaches+to+your+project/brand-sku-offer-price.png)

</details>

<details>
<summary>Description, product details, ratings</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Applying+basic+SEO+approaches+to+your+project/description-product-details-ratings.png)

 </details>

<details>
 <summary>Review</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Applying+basic+SEO+approaches+to+your+project/review.png.png)

 </details>

## Applying the basic SEO techniques in your project

For details about applying the basic SEO techniques in your project, see [Basic SEO techniques integration guide](/docs/dg/dev/integrate-and-configure/integrate-basic-seo-techniques.html).
