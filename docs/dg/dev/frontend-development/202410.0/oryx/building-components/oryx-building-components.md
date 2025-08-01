---
title: "Oryx: Building components"
description: Components are the building blocks of Oryx applications
last_updated: Sep 19, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/dev/front-end-development/202404.0/oryx/building-components/oryx-building-components.html

---

Oryx provides a fully component-based architecture where only components are used to render the application. Components are the building blocks used to create modular and reusable elements. The components are primarily concerned with UI/UX, leaving business logic and integrations to other application layers.

Oryx contains a library of standard components organized and distributed in [packages](/docs/dg/dev/frontend-development/{{page.version}}/oryx/getting-started/oryx-packages.html). There are different [types of components](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-components/oryx-component-types.html), including a design system. The components are built with powerful UI/UX features:

- Responsive design
- Themes support using [design tokens](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-applications/styling/oryx-design-tokens.html)
- [Typography](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-applications/styling/oryx-typography.html)
- [Icon system](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-applications/styling/oryx-icon-system.html)
- Internationalization (i18n) features:
  - [Locales](/docs/dg/dev/frontend-development/{{page.version}}/oryx/architecture/dependency-injection/oryx-service-layer.html)
  - Number and price formatting
  - Directionality: left-to-right versus right-to-left
- Accessibility features:
  - Dark and light mode
  - [Color contrast](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-applications/styling/oryx-color-system.html)
  - Keyboarding
  - Screen reader support

The components are rendered inside [compositions](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-pages/oryx-compositions.html) and [pages](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-pages/oryx-pages.html). The pages, organization, and layout of the components are provided in standard [feature sets](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-applications/oryx-feature-sets.html). When you install an Oryx application, the feature sets are available in the [presets](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-applications/oryx-presets.html) package.

You can customize the components with a custom theme, style rules, [component options](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-components/oryx-managing-component-options.html), or component logic. You can also [implement custom components](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-components/oryx-implementing-components.html) and add them to the application.

The components are built as web components, which makes them highly reusable in other web frameworks and systems. For more details, see [Integration of components](/docs/dg/dev/frontend-development/{{page.version}}/oryx/building-components/oryx-integrating-components.html).

Oryx provides a reactive framework and is designed to work efficiently in a single page application architecture. To ensure *reactivity* throughout the application, Oryx rerenders only  fragments of the components that are affected by the changing application state. For more details, see [key concepts of reactivity](/docs/dg/dev/frontend-development/{{page.version}}/oryx/architecture/reactivity/key-concepts-of-reactivity.html).
