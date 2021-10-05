---
title: Actions Redirect 
description: This article provides details about the Actions Redirect service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Redirect service in the Components Library.

## Overview

Actions Redirect is an Angular Service that performs the hard redirect to the URL.
Check out this example below to see how to use Actions Redirect service.

- `type` - an action type.  
- `url` - a URL to redirect.  

```html
<spy-button-action
  [action]="{
    type: 'redirect',
    url: 'https://spryker.com',
  }"
>
  ...
</spy-button-action>
```

## Interfaces

Below you can find interfaces for the Actions Redirect.

```ts
export interface RedirectActionConfig extends ActionConfig {
  url: string;
}

// Service registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      redirect: RedirectActionHandlerService,
    }),
  ],
})
export class RootModule {}
```
