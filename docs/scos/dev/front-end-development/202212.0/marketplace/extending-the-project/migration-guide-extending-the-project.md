---
title: "Migration guide - Extending the project"
description: This document provides details for migration of the marketplace modules to be able to extend the project.
last_updated: Aug 5, 2022
template: module-migration-guide-template
related:
  - title: Extending the project
    link: docs/scos/dev/front-end-development/page.version/marketplace/extending-the-project/index.html
---

This document outlines the changes that need to be made at a project level to [extend the frontend part of your project](/docs/scos/dev/front-end-development/{{page.version}}/marketplace/extending-the-project/index.html).

*Estimated migration time: 1h 30m*

To update the project, do the following:

1. Update the following files in the root:

```bash
wget -O angular.json https://raw.githubusercontent.com/spryker-shop/suite/master/angular.json
wget -O tsconfig.json https://raw.githubusercontent.com/spryker-shop/suite/master/tsconfig.json
wget -O tsconfig.mp.json https://raw.githubusercontent.com/spryker-shop/suite/master/tsconfig.mp.json
```

2. In the `frontend/merchant-portal` folder, update or create the following files:

```bash
wget -O frontend/merchant-portal/entry-points.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/entry-points.js
wget -O frontend/merchant-portal/utils.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/utils.js
wget -O frontend/merchant-portal/mp-paths.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/mp-paths.js
wget -O frontend/merchant-portal/tsconfig.spec.json https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/tsconfig.spec.json
wget -O frontend/merchant-portal/update-config-paths.js https://raw.githubusercontent.com/spryker-shop/suite/master/frontend/merchant-portal/update-config-paths.js
```

3. In the `src/Pyz/Zed` folder, create the files tree on the project level:

- ZedUi
    - Presentation
        - Components
            - app
                - app.module.ts
            - assets
                - .gitkeep
            - environments
                - environment.prod.ts
                - environment.ts
            - index.html
            - main.ts
            - polyfills.ts
            - styles.less
            - public-api.ts
    - mp.public-api.ts


4. Fill in the newly created files with the following code:

**app.module.ts**

```ts
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DefaultMerchantPortalConfigModule, RootMerchantPortalModule } from '@mp/zed-ui';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RootMerchantPortalModule,
        DefaultMerchantPortalConfigModule,
    ],
})
export class AppModule extends RootMerchantPortalModule {}

```

**environment.prod.ts**

```ts
export const environment = {
    production: true,
};
```

**environment.ts**

```
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import must be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
```

**main.ts**

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    /* tslint:disable-next-line: no-console */
    .catch((error) => console.error(error));
```

**polyfills.ts**

```ts
import '@mp/polyfills';
```

**mp.public-api.ts**

```ts
export * from './Presentation/Components/public-api';
```

**public-api.ts**

```ts
export * from './app/...';
...
// Packages that you want to be exported as public api
```

5. Reinstall `node_modules`:

```bash
rm -rf node_modules && npm install
```

6. Build the Marketplace project:

```bash
npm run mp:build
```

Related articles:

[Extending the project](/docs/scos/dev/front-end-development/{{page.version}}/marketplace/extending-the-project/index.html)
