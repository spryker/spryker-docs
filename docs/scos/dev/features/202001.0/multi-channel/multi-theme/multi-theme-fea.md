---
title: Multi-Theme Feature Overview
originalLink: https://documentation.spryker.com/v4/docs/multi-theme-feature-overview-201907
redirect_from:
  - /v4/docs/multi-theme-feature-overview-201907
  - /v4/docs/en/multi-theme-feature-overview-201907
---

Spryker Frontend consists of two main parts: [Atomic Frontend](https://documentation.spryker.com/v4/docs/atomic-frontend) (JS/CSS/Twg) and [Modular Frontend](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/yves/modular-fronten) (Widgets and Pages). Both support theming and the same inheritance strategy: Current Theme > Default Theme.

A theme is a combination of twig, CSS and JS files that make your user interface unique. 

* **Current Theme** - a single theme defined on a project level. E.g., B2B-theme, B2C-theme.
* **Default Theme** - a theme provided from Spryker by default and used in the Spryker Commerce OS. Used for incremental project updates (start from default and change components one-by-one) and a graceful fallback in case Spryker provides a new functionality which does not have own frontend in a project.

From now on, besides the default theme, you, as a shop owner, can create and use different themes for different stores. When you select a theme, you decide how your shop is displayed. For example, you may have a New Year theme with the New year attributes that is enabled every year during the New Year holidays. Due to the development of the Spryker Commerce OS, the entities that previously were called stores (DE, EN, AT) - are now renamed into namespaces.

```xml
{
	"path": "assets/%namespace%/%theme%",
	"namespaces": [
		{
			"moduleSuffix": "DE",
			"namespace": "DE",
			"themes": [],
			"defaultTheme": "default"
		}
		{
			"moduleSuffix": "US",
			"namespace": "US",
			"themes": [],
			"defaultTheme": "default"
		}
		{
			"moduleSuffix": "AT",
			"namespace": "AT",
			"themes": [],
			"defaultTheme": "default"
		}
	]
}
```
Every namespace has a list of all available themes that you need to build and a default theme that is configured as a fallback (in case, the theme you are using now is broken).

To learn how the frontend is being built, use this [Frontend Builder for Yves](https://documentation.spryker.com/v4/docs/frontend-builder-for-yves).

<!-- Last review date: Aug 06, 2019 by Oksana Karasyova -->
