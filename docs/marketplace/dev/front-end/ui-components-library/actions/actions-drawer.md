---
title: Actions Drawer
description: This article provides details about the Actions Drawer service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Drawer service in the Components Library.

## Overview

Actions Drawer is an Angular Service that opens the Drawer with a component/template.
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

## Main Service

The main module provides an opportunity to register a component by key via static method `withComponents`. 
It assigns the object of components to the `DrawerActionComponentTypesToken` under the hood.

The main service injects all registered types from the `DrawerActionComponentTypesToken`.

`handleAction` method checks if `config` (from the argument) contains `component` or `template` keys and returns observable 
with data by `DrawerRef.openComponent` or `DrawerRef.openTemplate` accordingly.

```ts
handleAction<C>(
  injector: Injector,
  config: DrawerActionConfig,
  context: C,
): Observable<DrawerRef<C>> {
  ...
});
```

Below you can find an explanation on how both of them works:

### Via Component

If a component type is a string

```ts
handleAction(injector, config: { component: 'simple_component' }, context);
```

`DrawerActionComponentTypesToken` will return component by key from registered components collection 
and then `DrawerRef.openComponent` method will be called.

If a component type is an Angular component

```ts
handleAction(injector, config: { component: SimpleComponent }, context);
```

Then `DrawerRef.openComponent` method will be called without any manipulations with `DrawerActionComponentTypesToken`.

### Via Template

Another way to open drawer with `ng-template`. You need to create a template, get reference 
of it and throw it as `template` config prop to the `handleAction` method.

```html
  <ng-template #contentTpl>
     ...
  </ng-template>
```

```ts
// Find the template
import { DrawerTemplateContext } from '@spryker/drawer';

@ViewChild(‘contentTpl’) contentTpl?: TemplateRef<DrawerTemplateContext>;

// Call the method 
handleAction(injector, config: { template: contentTpl }, context);
```

`DrawerRef.openTemplate` will be called and drawer will be open with `contentTpl` template.

## Service registration

Any existing Angular component can be registered and used within the drawer.
Also, it's possible to create and register a custom component that will be rendered inside the drawer.

```ts
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
