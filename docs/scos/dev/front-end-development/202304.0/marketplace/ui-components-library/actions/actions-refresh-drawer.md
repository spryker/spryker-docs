---
title: Actions Refresh Drawer
description: This document provides details about the Actions Refresh Drawer service in the Components Library.
template: concept-topic-template
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/actions/actions-refresh-drawer.html
related:
  - title: Actions
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/index.html
  - title: Actions Close Drawer
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-close-drawer.html
  - title: Actions Drawer
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-drawer.html
  - title: Actions HTTP
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-http.html
  - title: Actions Notification
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-notification.html
  - title: Actions Redirect
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-redirect.html
  - title: Actions Refresh Parent Table
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-refresh-parent-table.html
  - title: Actions Refresh Table
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-refresh-table.html

---

This document explains the Actions Refresh Drawer service in the Components Library.

## Overview

Actions Refresh Drawer is an Angular Service that refreshes/re-renders the currently opened drawer.

Check out an example usage of the Actions Refresh Drawer.

Service configuration:

- `type`—an action type.

```html
<spy-button-action
    [action]="{
        type: 'refresh-drawer',
    }"
>
</spy-button-action>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        'refresh-drawer': RefreshDrawerActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            'refresh-drawer': RefreshDrawerActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Actions Refresh Drawer:

```ts
export interface RefreshDrawerActionConfig extends ActionConfig {}
```
