---
title: Actions HTTP
description: This document provides details about the Actions HTTP service in the Components Library.
template: concept-topic-template
---

This document explains the Actions HTTP service in the Components Library.

## Overview

Actions HTTP is an Angular Service that renders content via the HTML request.

Check out an example usage of the Actions HTTP.

Service configuration:

- `type` - an action type.  
- `url` - an action request URL.  
- `method` - an action request method (`GET` by default).  

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
