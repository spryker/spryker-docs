---
title: Algolia Personalization for headless frontends
description: Find out how you can enable Algolia personalization in your Spryker shop based on headless approach (custom frontend or mobile application). 
last_updated: Nov 24, 2024
template: howto-guide-template
---

{% info_block infoBox "Info" %}

Default Spryker installation supports Algolia personalization only for YVES frontend.

{% endinfo_block %}

The events from your site/application are required to enable Algolia premium features such as

- Personalization
- Dynamic Re-Ranking
- Query Categorization
- Search analytics
- Revenue analytics
- A/B Testing


For custom frontends or mobile application it's recommended to use Algolia SDK for specific framework or platform and use built-in Algolia UI components.
They already support event tracking for most of the required events.

For Web
* Any JavaScript applications:
  * https://www.algolia.com/doc/api-reference/widgets/js/ 
  * standalone client for events (Insights): https://www.algolia.com/doc/api-client/methods/insights/?client=javascript
* React:
  * https://www.algolia.com/doc/api-reference/widgets/react/
* Vue:
  * https://www.algolia.com/doc/guides/building-search-ui/getting-started/vue/
* Angular:
  * https://www.algolia.com/doc/guides/building-search-ui/getting-started/angular/
* Flutter:
  * https://www.algolia.com/doc/guides/building-search-ui/getting-started/flutter/

For mobile applications:
* Android https://www.algolia.com/doc/guides/building-search-ui/getting-started/android/
* iOS https://www.algolia.com/doc/guides/building-search-ui/getting-started/ios/


For additional "conversion" events such as "Add to Cart", "Add to Shopping List", or "Add to Wishlist" use Insights API client for your framework/platform
and the methods from this page https://www.algolia.com/doc/api-client/methods/insights/.
