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
export interface DrawerActionComponentsRegistry {
  // type: Type<unknown>
}

export type DrawerActionComponentType = RegistryType<
  DrawerActionComponentsRegistry
>;

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
```

## Component registration

There are already a two existing components in Components Library that may be used within the drawer.

`ajax-form` - renders the html form via ajax request.  
`url-html-renderer` - renders html content via `html-renderer` component and `urlHtml` directive `<spy-html-renderer urlHtml="/html-request"></spy-html-renderer>`.  

```ts
@NgModule({
  imports: [
    ActionsModule.withActions({
      drawer: DrawerActionHandlerService,
    }),
    DrawerActionModule.withComponents({
      'ajax-form': AjaxFormComponent,
      'url-html-renderer': UrlHtmlRendererComponent,
    }),
    AjaxFormModule,
    UrlHtmlRendererModule,
  ],
})
export class RootModule {}
```

Also, it's possible to create and register a custom component that will be rendered inside the drawer.

```ts
// Registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      drawer: DrawerActionHandlerService,
    }),
    DrawerActionModule.withComponents({
      'custom': CustomComponent,
    }),
    CustomModule,
  ],
})
export class RootModule {}
```

```html
// Usage
<spy-button-action
  [action]="{
    type: 'drawer',
    component: 'custom',
  }"
>
  ...
</spy-button-action>
```
