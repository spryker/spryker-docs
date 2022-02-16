---
title: HowTo - Overcome current limitations with the Multi-store functionality
description: Learn about the current limitations of the Multi-store functionality and ways to overcome them
last_updated: Feb 16, 2022
template: howto-guide-template
related:
    - title: 'Managing stocks in a multi-store environment: Best practices'
      link: docs/scos/dev/feature-walkthroughs/page.version/inventory-management-feature-walkthrough/managing-stocks-in-a-multi-store-environment-best-practices.html
    
---

When it comes to the Multi-store functionality, there are no issues if you have different stores and want to implement different business logic in them. However, if you want different data for different stores on one website, this is where the current Multi-store functionality has got some limitations, as the Multi-store concept is not yet complete. 
In this document, we consider the possible ways for you to overcome the limitations.

## Multiple languages
Currently, we do not support multiple languages for the same store. For example, if you want to use different locales within one store, like *de-de*, *de-at* on the same website, you cannot do so. It's because we always shorten the URL to the store value, *de* in our example.
The only solution for this case is to have different websites with different stores and locales.

## Different concrete products per different stores
Another limitation with Multi-store is that all the image, product, categories, etc. URLs are limited per locale. Let's consider an example.
Suppose you have a product with many variations, like different colors and sizes. You don't want some variation to be available in a specific store. So, you don't want some concrete product to be in some of your stores. However, by default, concrete products are not assigned per store. Only abstract products can have assignments to stores. Therefore, there are two ways for you to implement this scenario:
1. Revisit your PIM structure. That means you create two copies of the same abstract product, and for every copy, you have only those concrete products that should appear in each store. However, we do not recommend following this approach, as you would have to sync the stock of the product between different stores, which can ultimately cause issues with stock. Also, breaking your PIM structure like that is not preferable.
2. Different databases tailored for different requirements and stores. See [Scenario for the separate warehouses and databases](/docs/scos/dev/feature-walkthroughs/{{site.version}}/inventory-management-feature-walkthrough/managing-stocks-in-a-multi-store-environment-best-practices.html#scenario-1-separate-warehouses-and-databases) for details about how to use and implement this solution.
However, with this approach, you can encounter some issues like:
- Higher cost of your project, as you have multiple independent projects with their infrastructure for each locale that you should maintain.
- Different Back Offices for each locale imply more administrative work and resources.

Anyway, this approach is preferable and more efficient than the first one, and you generally should consider following it any time you face limitations with the current Multi-store functionality.

For more use-cases and solutions relating to products and their stocks in the multi-store environment, see [Managing stocks in a multi-store environment: Best practices](/docs/scos/dev/feature-walkthroughs/{{site.version}}/inventory-management-feature-walkthrough/managing-stocks-in-a-multi-store-environment-best-practices.html).
