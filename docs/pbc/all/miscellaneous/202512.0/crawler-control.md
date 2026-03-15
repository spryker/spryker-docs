---
title: Crawler Control
description: Crawler Control best practices
last_updated: Nov 10, 2025
template: concept-topic-template
related:
  - title: Sitemap feature overview
    link: /docs/pbc/all/miscellaneous/latest/sitemap-feature-overview.html
---

Crawler control is needed to manage how automated bots (like search engine crawlers) access your website. Without control, bots can cause issues, waste resources, or index content incorrectly.

## Configure the `robots.txt` file

The `robots.txt` (also called Robots Exclusion Protocol) is a simple text file placed in the root of your website which gives instructions to web crawlers (bots) about what parts of your site they may or may not crawl.

- Allow or block crawlers from accessing certain folders/pages.

- Reduce server load by preventing bots from crawling heavy or useless URLs.

- Improve SEO crawl efficiency by guiding search engines to important content.

- Prevent indexing of duplicate or internal pages.

- Point crawlers to your sitemap for better discovery of pages.

The demo shop includes a preliminary [robots.txt example](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/public/Yves/robots.txt) that is recommended as a baseline, but it can be customized to project needs.


## Configure the sitemap

A sitemap is a file (usually `sitemap.xml`) that lists the important pages of your website so search engines can find, understand, and crawl them efficiently.

- Guides bots to the right pages — instead of crawling random or low-value URLs.

- Reduces unnecessary crawling — bots waste less time on filters, search pages, or dynamic URLs.

- Improves crawl budget usage — especially important for large or e-commerce sites where bots can get lost in thousands of URLs.

- Works together with `robots.txt`.
