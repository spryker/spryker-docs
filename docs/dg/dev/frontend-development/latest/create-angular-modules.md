---
title: Create Angular modules
last_updated: Jan 17, 2023
description: This document shows how to create a new Angular module with the application
template: howto-guide-template
redirect_from:
  - /docs/marketplace/dev/howtos/how-to-create-a-new-module-with-application.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-create-an-angular-module-with-application.html

---

This document describes how to create an Angular module with the application.

Reasons to create a module:

- Create Angular and web components on the project level.
- Extend an existing core Angular module on the project level.
- Override an existing core Angular module on the project level.

## 1) Create an Angular module scaffolding structure

Based on [Project structure document, Module structure section](/docs/dg/dev/frontend-development/latest/marketplace/marketplace-frontend-project-and-module-structure.html#module-structure), create the scaffolding structure for the module.
The module can contain its own set of Twig web components.

## 2) Register an Angular module

To register components, you need to create a special Angular module. `components.module.ts` contains the list of all Angular components exposed as web components.

1. Register web components:

```ts
// Registration
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

2. Register `ComponentsModule` to the entire modules list inside `entry.ts`:

```ts
import { registerNgModule } from '@mp/zed-ui';

import { ComponentsModule } from './app/components.module';

registerNgModule(ComponentsModule);
```

By registering and rebuilding this Angular module, a new JS bundle is created, which needs to be manually added to the Twig page in order to load web components.

{% info_block warningBox %}

Angular component names are prefixed with `web-` when registered as web components. Example:

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'mp-some-component',
    ...,
})
export class SomeComponentComponent {}

// After web component registration selector looks like if we use this component as web inside a twig file:
'web-mp-some-component'
```

```twig
{%- raw -%}
{% extends '@ZedUi/Layout/merchant-layout-main.twig' %}

{% block headTitle %}
    {{ 'Module title' | trans }}
{% endblock %}

{% block content %}
    <web-mp-some-component></web-mp-some-component>
{% block content %}

{% block footerJs %}
    {{ view.importJsBundle('module-name', importConfig) }}

    {{ parent() }}
{% endblock %}
{% endraw %}
```

{% endinfo_block %}
