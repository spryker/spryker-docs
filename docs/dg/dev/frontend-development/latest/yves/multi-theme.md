---
title: Multi-theme
description: The article describes Spryker Frontend - Atomic Frontend and Modular Frontend that support theming - current theme and default theme.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/front-end-development/yves/multi-theme.html
  - /docs/scos/user/features/202009.0/multi-channel/multi-theme/multi-theme-feature-overview.html
  - /docs/scos/dev/front-end-development/202404.0/yves/multi-theme.html
related:
  - title: Yves multi-themes
    link: docs/dg/dev/frontend-development/latest/yves/yves-multi-themes.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


Spryker Frontend consists of two main parts: [Atomic Frontend](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/atomic-frontend.html) (JS/CSS/Twg) and [Modular Frontend](/docs/dg/dev/backend-development/yves/modular-frontend.html) (Widgets and Pages). Both support theming and the same inheritance strategy: Current Theme > Default Theme.

A theme is a combination of twig, CSS and JS files that make your user interface unique.

- **Current Theme**—a single theme defined on a project level, such as B2B-theme or B2C-theme.
- **Default Theme**—a theme provided from Spryker by default and used in the Spryker Commerce OS. Used for incremental project updates (start from default and change components one-by-one) and a graceful fallback in case Spryker provides a new functionality which does not have own frontend in a project.

From now on, besides the default theme, you, as a shop owner, can create and use different themes for different stores. When you select a theme, you decide how your shop is displayed. For example, you may have a New Year theme with the New year attributes that is enabled every year during the New Year holidays. Because of the development of the Spryker Commerce OS, the entities that previously were called stores (DE, EN, AT) - are now renamed into namespaces.

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

To learn how the frontend is being built, use this [Frontend Builder for Yves](/docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves.html).
