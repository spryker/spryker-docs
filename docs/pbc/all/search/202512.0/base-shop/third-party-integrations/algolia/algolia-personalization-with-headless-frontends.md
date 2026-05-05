---
title: Algolia Personalization with headless frontends
description: Find out how you can enable Algolia personalization in your Spryker shop based on headless approach (custom frontend or mobile application).
last_updated: Nov 24, 2024
template: howto-guide-template
---

Algolia requires events from your application to support the following premium features:

- Dynamic Re-Ranking
- Query Categorization
- Search analytics
- Revenue analytics
- A/B Testing


Spryker collects only Yves events by default. For custom frontends and mobile applications, we recommend using the Algolia SDK for your specific framework or platform and the built-in Algolia UI components.
Algolia UI components support event tracking for most of the required events by default. For information on Aloglia SDK for different platform, see the following docs.

For web applications:  
- JavaScript applications: [API Reference - JavaScript Widgets](https://www.algolia.com/doc/api-reference/widgets/js/)  
  - Standalone client for events (insights): [Insights API Client - JavaScript](https://www.algolia.com/doc/api-client/methods/insights/?client=javascript)  
- React: [API Reference - React Widgets](https://www.algolia.com/doc/api-reference/widgets/react/)  
- Vue: [Getting Started with Vue](https://www.algolia.com/doc/guides/building-search-ui/getting-started/vue/)  
- Angular: [Getting Started with Angular](https://www.algolia.com/doc/guides/building-search-ui/getting-started/angular/)  
- Flutter: [Getting Started with Flutter](https://www.algolia.com/doc/guides/building-search-ui/getting-started/flutter/)  

For mobile applications:  
- Android: [Getting Started with Android](https://www.algolia.com/doc/guides/building-search-ui/getting-started/android/)  
- iOS: [Getting Started with iOS](https://www.algolia.com/doc/guides/building-search-ui/getting-started/ios/)  

For additional conversion events, such as Add to Cart, Add to Shopping List, or Add to Wishlist, use the Insights API client for your framework or platform and the methods from [Insights API client methods](https://www.algolia.com/doc/api-client/methods/insights/).
