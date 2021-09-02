---
title: Actions Drawer
description: This article provides details about the Actions Drawer service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Drawer service in the Components Library.

## Overview

Actions Drawer is an Angular Service that opens component/template in the Drawer.
See an example below, how to use the Actions Drawer service.

`type` - an action type.  
`component` - a component name.  
`options` - an object with a component options.  
  - `inputs` - inputs of the component.  

```html
<spy-button-action
  [action]="{
    type: 'drawer',
    component: 'component_name',
    options: {
      inputs: { ... },
    },
  }"
>
  ...
</spy-button-action>
```

## Interfaces

Below you can find interfaces for Actions Drawer.

```ts
export interface DrawerActionConfigComponent extends ActionConfig {
  component: DrawerActionComponentType | Type<unknown>;
  options?: Partial<DrawerOptionsComponent>;
}

export interface DrawerActionConfigTemplate extends ActionConfig {
  template: TemplateRef<DrawerTemplateContext>;
  options?: Partial<DrawerOptionsTemplate>;
}

export type DrawerActionConfig =
  | DrawerActionConfigComponent
  | DrawerActionConfigTemplate;

// Component registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      drawer: DrawerActionHandlerService,
    }),
    DrawerActionModule.withComponents({
      component_name: Component,
    }),
    ComponentModule,
  ],
})
export class RootModule {}
```
