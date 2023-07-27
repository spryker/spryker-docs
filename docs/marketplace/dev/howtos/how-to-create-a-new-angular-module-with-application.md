---
title: "HowTo: Create a new Angular module with application"
last_updated: Jan 17, 2023
description: This document shows how to create a new Angular module with the application
template: howto-guide-template
redirect_from:
  - /docs/marketplace/dev/howtos/how-to-create-a-new-module-with-application.html
---

This document describes how to create a new Angular module with the application.

You may want to create a new Angular module for a few reasons:

- Create new Angular and Web components on the project level.
- Extend existing core an Angular module on the project level.
- Override an existing core Angular module on the project level.

## 1) Create an Angular module scaffolding structure

A new Angular module needs a proper scaffolding structure.
The necessary list of files is provided in the [Project structure document, Module structure section](/docs/scos/dev/front-end-development/{{site.version}}/marketplace/project-structure.html#module-structure).
Each new Angular module can contain its own set of Twig Web Components.

## 2) Register a new Angular module

To register components, a special Angular module is created. The `components.module.ts` file contains a list of all Angular components exposed as Web Components.

1. Register Web Components:

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

By registering and rebuilding this Angular module, a new JS bundle is created, which must be manually added to the Twig page in order to load Web components.

{% info_block warningBox %}

Angular component names are prefixed with `web-` when registered as Web components—for example:

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
    <web-some-component></web-some-component>
{% block content %}

{% block footerJs %}
    {{ view.importJsBundle('module-name', importConfig) }}

    {{ parent() }}
{% endblock %}
{% endraw %}
```

{% endinfo_block %}
