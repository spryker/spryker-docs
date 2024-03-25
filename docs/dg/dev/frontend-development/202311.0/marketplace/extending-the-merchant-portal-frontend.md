---
title: Extending the Merchant Portal frontend
description: This document provides details about how to extend the new project.
template: howto-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/extending-the-project/index.html
  - /docs/marketplace/dev/front-end/202212.0/extending-the-project/migration-guide-extending-the-project.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/extend-the-marketplace-frontend.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/extend-the-marketplace-frontend.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/extend-the-merchant-portal-frontend.html

---

To add additional frontend functionality beyond the one provisioned out-of-the-box, the project must be extended.

This document can help you understand how you can extend the frontend project.

## Prerequisites

Prior to starting the project extension, verify that the Merchant Portal modules are up-to-date:

| NAME                                        | VERSION   |
| ------------------------------------------- | --------- |
| ZedUi                                       | >= 0.4.1  |
| DashboardMerchantPortalGui (optional)       | >= 0.4.1  |
| MerchantProfileMerchantPortalGui (optional) | >= 0.7.1  |
| ProductMerchantPortalGui (optional)         | >= 0.6.1  |
| ProductOfferMerchantPortalGui (optional)    | >= 0.10.2 |
| SalesMerchantPortalGui (optional)           | >= 0.8.1  |
| SecurityMerchantPortalGui (optional)        | >= 0.4.2  |

## Extending/customizing configuration modules

There are several modules having global configuration in `app.module.ts `(for example,`LocaleModule`, `DefaultUnsavedChangesConfigModule`, `DefaultTableConfigModule`) that influence any component in each module.

To extend/customize or override the default configuration, you must add a module with the proper static methods to the `app.module.ts` imports. Below, you can find an example with table configuration:

```ts
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DefaultMerchantPortalConfigModule,

        // Extend module on the project level
        TableModule.withActions({
            action_name: SpecificActionService,
        })

        // Customize module on the project level
        TableModule.withActions({
            already_used_action_name: ToOverrideActionService,
        })
    ],
    providers: [appBootstrapProvider()],
})
export class AppModule {}
```

## Overriding / creating new angular components

For webpack to compile project-based modules rather than vendor-based, `entry.ts` and `components.module.ts` must be created with the appropriate scaffolding (see [Module Structure](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/marketplace-frontend-project-and-module-structure.html#module-structure) section).

Default `entry.ts` should use the same code as vendor-level `entry.ts`.

Add angular components in the app folder [Angular Components](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/angular-components.html).

Add newly-created component `Module` and `Component` classes to the `components.module.ts`.

`components.module.ts` overrides vendor `components.module.ts` with a list of custom web components.

**DashboardMerchantPortalGui - vendor level**

```ts
import { NgModule } from '@angular/core';
import { ChipsComponent, ChipsModule } from '@spryker/chips';
import { WebComponentsModule } from '@spryker/web-components';

import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardCardModule } from './dashboard-card/dashboard-card.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
    imports: [
        WebComponentsModule.withComponents([
            DashboardComponent,
            DashboardCardComponent,
            ChipsComponent,
        ]),
        ChipsModule,
        DashboardModule,
        DashboardCardModule,
    ],
    providers: [],
})
export class ComponentsModule {}
```

**DashboardMerchantPortalGui** **- project level (any core component is overridden)**

```ts
import { NgModule } from '@angular/core';
import { ChipsComponent, ChipsModule } from '@spryker/chips';
import { WebComponentsModule } from '@spryker/web-components';
// Import from vendor
import {
    DashboardComponent,
    DashboardModule,
} from '@mp/dashboard-merchant-portal-gui';

import { OverridedDashboardCardComponent } from './overrided-dashboard-card/overrided-dashboard-card.component';
import { OverridedDashboardCardModule } from './overrided-dashboard-card/overrided-dashboard-card.module';

import { NewComponent } from './new-component/new-component.component';
import { NewModule } from './new-module/new-module.module';

@NgModule({
    imports: [
        WebComponentsModule.withComponents([
            DashboardComponent,
            ChipsComponent,

            // Project
            OverridedDashboardCardComponent,
            NewComponent,
        ]),

        ChipsModule,
        DashboardModule,

        // Project
        OverridedDashboardCardModule,
        NewModule,
    ],
    providers: [],
})
export class ComponentsModule {}
```

**DashboardMerchantPortalGui** **- project level** **(a new component to the core module is added)**

```ts
import { NgModule } from '@angular/core';
import { WebComponentsModule } from '@spryker/web-components';
// Import from vendor
import { ComponentsModule as CoreComponentsModule } from '@mp/dashboard-merchant-portal-gui';

import { NewComponent } from './new-component/new-component.component';
import { NewModule } from './new-module/new-module.module';

@NgModule({
    imports: [
        CoreComponentsModule,
        WebComponentsModule.withComponents([NewComponent]),

        NewModule,
    ],
})
export class ComponentsModule {}
```

## Overriding twig files

To use a `twig` file in your project, you must create a file with the same name and scaffolding as on the vendor level. For example, `ZedUi/Presentation/Layout/merchant-layout-main.twig`.

All content used on the project level overrides the vendor.

It is also possible to extend the vendor twig blocks. You need to extend the vendor file and declare existing blocks to accomplish this.

**ZedUi/src/Spryker/Zed/ZedUi/Presentation/Example/example.twig - vendor level**

```twig
{%- raw -%}
{% block headTitle %}
    {{ 'Title' | trans }}
{% endblock %}

// Any other content
{% endraw %}
```

**ZedUi/Presentation/Example/example.twig - project level**

```twig
{%- raw -%}
{% extends '@Spryker:ZedUi/Example/example.twig' %}

{% block headTitle %}
    {{ 'Project Title' | trans }}
{% endblock %}
{% endraw %}
```

If a project file isn’t reflected in the browser, try to clean cache:

```bash
console cache:empty-all
```

## Overriding CSS variables

CSS variables can be overridden in any `.less`/`.css` file related to the Merchant Portal at the project level.

Global override changes a variable for the whole project:

- Variables in the root library

```less
@border-radius-base: var(--spy-border-radius-base, 10px);
@green: var(--spy-green, #17b497);
```

- Overridden variables at the project level (for example, `src/Pyz/Zed/ZedUi/Presentation/Components/styles.less`)

```less
:root {
  --spy-border-radius-base: 15px;
  --spy-green: green;
}
```

A partial override changes a variable for a specific scope (for example, inside a component):

- Variable in the root library

```less
@btn-padding-base: var(
  --spy-btn-padding-base,
  @btn-horizontal-vertical-base @btn-horizontal-padding-base
);
```

- Overridden variable at the project level

```less
.mp-test-selector {
  --spy-btn-padding-base: 10px 15px;

  // styles
  ...
}
```
