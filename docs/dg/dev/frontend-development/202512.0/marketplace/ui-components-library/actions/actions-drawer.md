---
title: Actions Drawer
description: This document provides details about the Actions Drawer service in the Components Library.
template: concept-topic-template
last_updated: Jan 11, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/actions/actions-drawer.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/actions/actions-drawer.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/actions/actions-drawer.html

related:
  - title: Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/ui-components-library-actions.html
  - title: Actions Close Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-close-drawer.html
  - title: Actions Confirmation
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-confirmation.html
  - title: Actions HTTP
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-http.html
  - title: Actions Notification
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-notification.html
  - title: Actions Redirect
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-redirect.html
  - title: Actions Refresh Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-drawer.html
  - title: Actions Refresh Parent Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-parent-table.html
  - title: Actions Refresh Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-table.html

---

This document explains the Actions Drawer service in the Components Library.

## Overview

Actions Drawer is an Angular Service that opens the Drawer with a component/template.

Check out an example usage of the Actions Drawer.

Service configuration:

- `type`—an action type.
- `component`—a component name.
- `options`—an object with a component options.
   —`inputs`—inputs of the component.

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
</spy-button-action>
```

## Main Service

The main module registers a component by key via a static method `withComponents()`.
It assigns the object of components to the `DrawerActionComponentTypesToken` under the hood.

The main service injects all registered types from the `DrawerActionComponentTypesToken.`

`handleAction()` method checks if the `config` (from the argument) contains `component` or `template` keys and returns an observable with data by `DrawerRef.openComponent()` or `DrawerRef.openTemplate()` accordingly.

```ts
handleAction<C>(
    injector: Injector,
    config: DrawerActionConfig,
    context: C,
): Observable<DrawerRef<C>> {
    ...
};
```

Below, you can find an explanation of how both of them works:

### Via the component

- If a component type is a string:

```ts
handleAction(injector, config: { component: 'simple_component' }, context);
```

the `DrawerActionComponentTypesToken` returns a component by key from the registered components collection, and then `DrawerRef.openComponent()` method is called.

- If a component type is an Angular component:

```ts
handleAction(injector, config: { component: SimpleComponent }, context);
```

the `DrawerRef.openComponent()` method is called without any manipulations with `DrawerActionComponentTypesToken`.

### Via the template

Another way to open the Drawer is with `ng-template.` You need to create a template, get its reference and pass it to the `handleAction()` method as a `template` config prop.

```html
<ng-template #contentTpl>
    ...
</ng-template>
```

```ts
import { DrawerTemplateContext } from '@spryker/drawer';

// Find the template
@ViewChild(‘contentTpl’) contentTpl?: TemplateRef<DrawerTemplateContext>;

// Call the method
handleAction(injector, config: { template: contentTpl }, context);
last_updated: Jan 11, 2024
```

`DrawerRef.openTemplate()` is called, and the Drawer is opened with `contentTpl` template.

## Service registration

Any existing Angular component can be registered and used within the Drawer.
Also, it's possible to create and register a custom component that is rendered inside the Drawer.

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        drawer: DrawerActionHandlerService;
    }
}

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

Below you can find interfaces for the Actions Drawer:

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
last_updated: Jan 11, 2024
    options?: Partial<DrawerOptionsTemplate>;
}

export type DrawerActionConfig =
    | DrawerActionConfigComponent
    | DrawerActionConfigTemplate;
```
