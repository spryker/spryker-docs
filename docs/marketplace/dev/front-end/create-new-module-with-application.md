---
title: Create new module with application
description: This articles provides details how to create new module with application
template: concept-topic-template
---

This articles provides details how to create new module with application.

## Module Scaffolding

First step is to create proper scaffolding structure see [link to the project structure doc](project-structure.md) Module structure section. Every new module may provide it’s own set of Web Components for the Twig.

## Module Scaffolding

To register components a special Angular Module is created that lists all Angular Components that will be exposed as a Web Components in the `components.module.ts` file.

Web Components registration:

```ts
/// Registration
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

Then we have to register `ComponentsModule` to the whole modules list inside `entry.ts`

```ts
import { registerNgModule } from '@mp/zed-ui';

import { ComponentsModule } from './app/components.module';

registerNgModule(ComponentsModule);
```

When this module is registered and rebuilded a new JS bundle is created and must be manually included in the Twig page so that Web Components are loaded.
Be aware that on registration Angular Component as Web Component there are will be added `web-` prefix ot the Angular Component selector name.
e.g

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'mp-some-component',
    ....
})
export class SomeComponentComponent {
}

/// After web component registration selector will be look like if we use this component as web inside twig file:
'web-mp-some-component'
```

```twig
{% extends '@ZedUi/Layout/merchant-layout-main.twig' %}

{% block headTitle %}
    {{ 'Module title' | trans }}
{% endblock %}

{% block content %}
  <web-some-component></web-some-component>
{% block content %}

{% block footerJs %}
    <script src="{{ assetsPath('js/mp/spy/module-name-es2015.js') }}" type="module"></script>
    <script src="{{ assetsPath('js/mp/spy/module-name-es5.js') }}" nomodule defer></script>
    {{ parent() }}
{% endblock %}
```
