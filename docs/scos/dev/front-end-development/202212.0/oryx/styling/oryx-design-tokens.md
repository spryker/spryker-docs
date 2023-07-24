---
title: "Oryx: Design Tokens"
description: Design tokens provide a centralized and consistent approach for styling components in Oryx applications.
last_updated: July 24, 2023
template: concept-topic-template
---

Design tokens are a fundamental aspect of the Oryx web framework, providing a powerful system for achieving consistent and customizable styles throughout the application. Design tokens are extensively used inside the [color system](/docs/scos/dev/front-end-development/{{page.version}}/oryx/styling/oryx-colors-system.html), typography, icons and many more. Design tokens ensure a clean separation between styles and components, making it easier to manage and maintain the application's design system. This document focuses on the structure and usage of design tokens in Oryx.

## CSS variables

Design tokens are provided as CSS variables in the application code. The variables follow a structured naming convention to ensure consistency and avoid conflicts. The variables are prefixed with "oryx" to avoid naming conflicts with 3rd party variables and are written in kebab-case.

The CSS variables are written in the root element of the application. This is the `oryx-app` component by default. CSS variables are inherited by all descendants of the root component. This makes is convenient to access the variables throughout the entire application. CSS variables can however be overridden at any element in te application.

If you like to reuse the CSS variables outside the root element of the application, or if you are not using the `oryx-app` as the root, you can bootstrap the application using an alternative root:

```ts
import { appBuilder } from "@spryker-oryx/core";

appBuilder().withAppOptions({ components: { root: "body" } });
```

## Usage of Design Tokens

Design tokens are used extensively throughout Oryx components to achieve consistent and cohesive visual styles. Instead of hardcoding style values directly in component CSS, design tokens are used as CSS variables to define the styles. This way, developers can easily modify the visual appearance of the entire application by adjusting the corresponding design token values.

### Example: Using Design Tokens in CSS

```css
.button {
  background-color: var(--oryx-color-primary-9);
  font-size: var(--oryx-typography-h1-size);
}
```

## Themes

Design tokens are organized in themes. This allows you to quickly switch from one theme to another as well as to create your own theme.
