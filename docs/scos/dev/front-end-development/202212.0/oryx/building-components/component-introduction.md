---
title: "Oryx: Building Components"
description: Components are the building blocks of Oryx Applications
last_updated: Sept 10, 2023
template: concept-topic-template
---

Oryx provides a fully component-based architecture, where only components are used to render the application. Components are the building blocks that developers can use to create modular and reusable elements. The components are primarily concerned with the UI/UX, leaving business logic and integrations to other application layers.

Oryx contains a library of standard components, organized and distributed in [packages](/docs//scos/dev/front-end-development/{{page.version}}/getting-started/oryx-packages.html). There are different [types of components](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-components/component-types.html), including a design system. The components are build with strong usability features, including:

- Responsive design
- Themable (using [design tokens](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/styling/oryx-design-tokens.html))
- [Typography](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/styling/oryx-typography.html)
- [Icon system](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/styling/oryx-icon-system.html)
- Internationalization (i18n) features:
  - [locales](/docs/scos/dev/front-end-development/{{page.version}}/oryx/architecture/dependency-injection/oryx-service-layer.html)
  - number and price formatting
  - directionality (left-to-right vs right-to-left)
- Accessibility features:
  - dark and light mode
  - [color contrast](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/styling/oryx-color-system.html)
  - keyboarding
  - screen reader support

Oryx components are rendered inside [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html) and [pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html). The pages and the organization and layout of the components are provided in standard [feature sets](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-feature-sets.html). When you install an Oryx application, the feature sets are installed from the [presets](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/oryx-presets.html) package.

You can use standard components in your application in combination with custom components. A common approach is to start your project with the standard components and configure the application theme and [component options](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-components/component-options.html) to meet the application design. When the application requires a custom component, you can [implement your custom components](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-components/components-implementation.html) or customize an existing Oryx components.

Oryx components are built as web components, which makes them highly reusable in other web frameworks and systems. Read more about the [interoperability of Oryx components](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-components/components-interoperability.html) in other frameworks and systems.

Oryx provides a reactive framework and is designed to work highly efficiently in a Single Page Application architecture. To ensure _reactivity_ throughout the application, Oryx only re-renders those fragments of the components that have been affected by the changing application state. You can read more about this in the [key concepts of reactivity](/docs/scos/dev/front-end-development/{{page.version}}/oryx/architecture/reactivity/key-concepts-of-reactivity.html).
