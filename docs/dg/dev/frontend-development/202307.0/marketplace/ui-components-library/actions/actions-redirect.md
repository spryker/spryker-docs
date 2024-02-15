---
title: Actions Redirect
description: This document provides details about the Actions Redirect service in the Components Library.
template: concept-topic-template
last_updated: Aug 2, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/actions/actions-redirect.html
  - /docs/scos/dev/front-end-development/202307.0/marketplace/ui-components-library/actions/actions-redirect.html

related:
  - title: Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/ui-components-library-actions.html
  - title: Actions Close Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-close-drawer.html
  - title: Actions Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-drawer.html
  - title: Actions HTTP
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-http.html
  - title: Actions Notification
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-notification.html
  - title: Actions Refresh Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-drawer.html
  - title: Actions Refresh Parent Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-parent-table.html
  - title: Actions Refresh Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-table.html

---

This document explains the Actions Redirect service in the Components Library.

## Overview

Actions Redirect is an Angular Service that performs the hard redirect to the URL.

Check out an example usage of the Actions Redirect.

Service configuration:

- `type`—an action type.  
- `url`—a URL to redirect.  

```html
<spy-button-action
    [action]="{
        type: 'redirect',
        url: 'https://spryker.com',
    }"
>
</spy-button-action>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        redirect: RedirectActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            redirect: RedirectActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Actions Redirect:

```ts
export interface RedirectActionConfig extends ActionConfig {
    url: string;
}
```
