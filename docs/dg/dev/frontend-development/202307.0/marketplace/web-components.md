---
title: Web Components
description: This document provides details how web components are used and what their function is in the Merchant Portal Frontend.
template: concept-topic-template
last_updated: Aug 15, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/web-components.html
  - /docs/scos/dev/front-end-development/202307.0/marketplace/web-components.html

related:
  - title: Angular Components
    link: docs/dg/dev/frontend-development/page.version/marketplace/angular-components.html
  - title: Angular Services
    link: docs/dg/dev/frontend-development/page.version/marketplace/angular-services.html
---

This document provides details how web components are used and what their function is in the Merchant Portal Frontend.

## Introduction

Merchant Portal is primarily developed using Angular Components and Angular infrastructure. Twig exposes a component as a *Web Component* when it needs to be accessed from Twig.
Internal components will remain as Angular Components unless they are required to be used from the Twig side.

## Overview

Web Components are a collection of technologies for creating reusable custom elements—with their functionality encapsulated away from the rest of your code and incorporated into your web applications.

Below is an example of how to register Angular components as web components:

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

In the registration process, web components will automatically get a `web` prefix to their selectors. Selectors can also be customized.

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

The complete process of creating a new module and registering it as a web component can be found in the [How-To: Create a new Angular module with application](/docs/dg/dev/frontend-development/{{page.version}}/create-angular-modules.html).
