---
title: Actions HTTP
description: This document provides details about the Actions HTTP service in the Components Library.
template: concept-topic-template
last_updated: Jan 11, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/actions/actions-http.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/actions/actions-http.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/actions/actions.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/actions/actions-http.html

related:
  - title: Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/ui-components-library-actions.html
  - title: Actions Close Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-close-drawer.html
  - title: Actions Confirmation
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-confirmation.html
  - title: Actions Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-drawer.html
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

This document explains the Actions HTTP service in the Components Library.

## Overview

Actions HTTP is an Angular Service that renders content via the HTML request.

Check out an example usage of the Actions HTTP.

Service configuration:

- `type`—an action type.  
- `url`—an action request URL.  
- `method`—an action request method (`GET` by default).  

```html
<spy-button-action
    [action]="{
        type: 'http',
        url: '/html-request',
        method: 'GET',
    }"
>
</spy-button-action>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        http: HttpActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            http: HttpActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Actions HTTP:

```ts
export interface HttpActionConfig extends ActionConfig {
    url: string;
    method?: string;
}

export interface HttpActionResponse {
    actions?: ActionConfig[];
}
```
