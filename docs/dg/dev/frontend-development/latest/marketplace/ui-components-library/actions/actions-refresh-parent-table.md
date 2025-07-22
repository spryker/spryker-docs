---
title: Actions Refresh Parent Table
description: This document provides details about the Actions Refresh Parent Table service in the Components Library.
template: concept-topic-template
last_updated: Jan 11, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/actions/actions-refresh-parent-table.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/actions/actions-refresh-parent-table.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/actions/actions-refresh-parent-table.html

related:
  - title: Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/ui-components-library-actions.html
  - title: Actions Close Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-close-drawer.html
  - title: Actions Confirmation
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-confirmation.html
  - title: Actions Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-drawer.html
  - title: Actions HTTP
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-http.html
  - title: Actions Notification
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-notification.html
  - title: Actions Redirect
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-redirect.html
  - title: Actions Refresh Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-drawer.html
  - title: Actions Refresh Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-table.html

---

This document explains the Actions Refresh Parent Table service in the Components Library.

## Overview

Actions Refresh Parent Table is an Angular Service that refreshes the data of the parent table of a Table in the current context.

{% info_block warningBox "Note" %}

Make sure that the table opened from another table, for ex. in the Drawer.

{% endinfo_block %}

Check out an example usage of the Actions Refresh Parent Table.

Service configuration:

- `rowActions`—the table row actions. For more details, see [Table Feature Row Actions](/docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-row-actions.html).  
- `actions`—an array with actions configuration.  
- `type`—an action type.  

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        rowActions: {
            enabled: true,
            actions: [
                {
                    type: 'refresh-parent-table',
                },
            ],
        },
    }"
>
</spy-table>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        'refresh-parent-table': RefreshParentTableActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            'refresh-parent-table': RefreshParentTableActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Actions Refresh Parent Table:

```ts
export interface RefreshParentTableActionConfig extends ActionConfig {}
```
