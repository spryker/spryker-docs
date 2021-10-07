---
title: Actions HTTP
description: This article provides details about the Actions HTTP service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions HTTP service in the Components Library.

## Overview

Actions HTTP is an Angular Service that renders content via the HTML request.
Check out this example below to see how to use Actions HTTP service.

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
  ...
</spy-button-action>
```

## Interfaces

Below you can find interfaces for the Actions HTTP.

```ts
export interface HttpActionConfig extends ActionConfig {
  url: string;
  method?: string;
}

export interface HttpActionResponse {
  actions?: ActionConfig[];
}

// Service registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      http: HttpActionHandlerService,
    }),
  ],
})
export class RootModule {}
```
