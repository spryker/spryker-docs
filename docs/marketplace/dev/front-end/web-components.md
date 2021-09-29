---
title: Web Components
description: This articles provides details how web components are used and what their purpose is in the Merchant Portal Frontend.
template: concept-topic-template
---

This articles provides details how web components are used and what their purpose is in the Merchant Portal Frontend.

## Introduction

The main development of Merchant Portal is done withing Angular Components and Angular infrastructure. When a component is needed to be accessed from Twig it is exposed as a Web Component.
Some of the internal component will always remain as Angular Component unless they will be required to be used from the Twig side.

## Web Components

Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

You can see the example of registration angular components as web components below:

```ts
import { NgModule } from '@angular/core';
import { WebComponentsModule } from '@spryker/web-components';

import { SomeComponentComponent } from './some-component/some-component.component';
import { SomeComponentModule } from './some-component/some-component.module';

@NgModule({
  imports: [
    WebComponentsModule.withComponents([SomeComponentComponent]),
    SomeComponentModule,
  ],
  providers: [],
})
export class ComponentsModule {}
```

While registration web components will get a `web` prefix to their selectors by default. There is also a possibility to customize web component selector.

```ts
import { NgModule } from '@angular/core';
import { WebComponentsModule } from '@spryker/web-components';

import { SomeComponentComponent } from './some-component/some-component.component';
import { SomeComponentModule } from './some-component/some-component.module';

@NgModule({
  imports: [
    WebComponentsModule.withComponents([
      {
        selector: 'new-web-component-selector',
        component: SomeComponentComponent,
      },
    ]),
    SomeComponentModule,
  ],
  providers: [],
})
export class ComponentsModule {}
```

The full cycle of the new module creation and registration it as a web component you can see in the [following document](/docs/marketplace/dev/howtos/how-to-create-a-new-module-with-application.html).
