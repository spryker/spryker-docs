---
title: Integration of the Algolia UI Library in the Front End
description: A how-to guide for integrating the Algolia UI Library into the Spryker front end, covering architectural considerations, component customization, and key feature implementation.
last_updated: Sep 1, 2025
template: howto-guide-template
---

This guide provides technical instructions for integrating the Algolia UI Library into the Spryker front end for the Algolia ACP App. It focuses on architectural approach, component customization, and implementation of core features. The key challenge is that the Algolia UI Library is not natively aligned with the Spryker front-end architecture, so your implementation will function as an independent set of components that consume data directly from the Algolia API.

The purpose of this guide is to walk you through building a modern search experience within your Spryker shop. By following these steps, you will be able to implement a flexible and powerful search interface with features like advanced filtering, sorting, and search suggestions, while managing performance and maintaining visual consistency with your existing design.

## Risks and Considerations

- **Support & Maintenance**: Be aware of the additional effort required to support Algolia components. Changes in related Spryker Core components may not automatically apply and could require manual updates.
- **Architectural Alignment**: Algolia UI components are not natively aligned with the Spryker architecture. This may result in different APIs or extension points than you are used to.
- **Performance**: Additional API calls to SCOS to get product data (for example for variants or detailed information) could impact performance. A UX solution, such as skeleton loaders or partial rendering, is recommended to mitigate the impact of slow API calls.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* The **Algolia ACP App** is installed and configured.
* Product data is successfully **synced to your Algolia indices** for each locale and sorting strategy.
* You have a clear understanding of your indexed product attributes (for example SKU, Name, Description).
* You have chosen which **InstantSearch flavor** to use: vanilla JS, React InstantSearch, or Vue InstantSearch.
* The Algolia **application ID**, **Search-Only API key**, and the index name for the current locale are determined in the application context.

## Implementing the Algolia UI Library

Follow this step-by-step process to integrate the Algolia UI Library.

### 1. Initialize InstantSearch

First, add the necessary dependencies and initialize a single `InstantSearch` instance on your page. It is crucial to maintain only one instance and attach all search widgets to it using selectors. Enable URL routing to ensure search states (queries, filters) are shareable and linkable.

### 2. Mount Core Widgets

Mount the essential Algolia widgets to build the search interface. This includes:
- **`searchBox`**: For user queries.
- **`hits`**: To display search results. Use a custom renderer to display product information like URL, name, image, price, and rating directly from Algolia's attributes to avoid extra API calls.
- **`refinementList`**: For category and attribute filters (for example brand).
- **`sortBy`**: To allow users to switch between different sort strategies (for example rating, price ascending/descending). Ensure the index names are consistent with those created by the ACP app.
- **`pagination`** and **`stats`**: For navigation and displaying result counts.
- **Advanced Filters**: Widgets like `ratingMenu` or `rangeSlider` for price can be implemented for more advanced filtering, provided the corresponding fields exist and are correctly formatted in your index.

### 3. Customize Component Rendering and Styling

To ensure the new components match your site's design, you will need to customize their appearance.

- **Styling**: Apply your own styles to the Algolia UI components. For branding consistency and code independence, reuse existing style tokens and variables from Spryker, but **avoid reusing the exact CSS class names** from other Core components. This ensures that your Algolia implementation remains loosely coupled.
- **HTML Structure**: Customize the HTML structure and CSS classes for most components to align with your design system.
- **Granular Rendering**: Use granular rendering functions for components to maximize flexibility and make future customizations easier.

### 4. Handle Spryker-Specific Data

Displaying complex product data like variants and prices requires a specific approach to maintain performance.

- **Product Variants**: This is a critical feature that requires a custom solution, as default Algolia components may not handle this complexity. You will need to make additional API calls to SCOS to fetch variant data (for example colors or sizes). Because these calls can be slow, a clear UX solution like skeleton loaders is necessary to manage user perception of performance.
- **Pricing**: Whenever possible, render prices directly from the data stored in Algolia records. **Avoid on-demand API calls to SCOS for prices**, as the potential latency can degrade the user experience. For dynamic pricing, consider a deferred hydration pattern.
- **Categories**: Use the `hierarchical_categories` attribute from your Algolia index to render category breadcrumbs and facets.
- **Merchants**: Render `merchant_name` or `merchant_reference` if present.

### 5. Wire Events for Analytics

To enable analytics and personalization features, you must wire user interaction events.

- **Enable Insights**: Activate the `insights` feature in your `instantsearch` configuration. This allows user interactions to be sent to Algolia, powering features like Dynamic Re-Ranking and A/B testing.
- **Track Conversions**: Use `search-insights` to send additional conversion events, such as "Add to Cart," to Algolia.


## Summary

By following this guide, you have integrated the Algolia UI Library into your Spryker front end. You have created an independent set of search components that call the Algolia API directly, styled them to match your brand, and implemented core features like filtering, sorting, and variant display. The end result is a fast, responsive, and modern search experience for your users, complete with analytics tracking.

## Next Steps

Now that you have a baseline implementation, you can focus on further enhancements:

- **Performance Optimization**: Implement advanced strategies like caching or batching for any necessary SCOS API calls.
- **A/B Testing**: Use the analytics data you are now collecting to run A/B tests within the Algolia dashboard to optimize your search configuration.
- **Quality Assurance**: Thoroughly test the implementation, verifying URL synchronization, locale switching, and performance, while ensuring analytics events are visible in the Algolia dashboard.