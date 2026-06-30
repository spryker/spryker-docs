---
title: Integrate React into Atomic Frontend
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/integrating-react-into-atomic-frontend
originalArticleId: c15f25d7-9cb8-421a-87aa-6dcccf79b633
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/atomic-frontend/integrating-react-into-atomic-frontend.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/integrating-react-into-atomic-frontend.html
related:
  - title: Atomic Frontend - general overview
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/atomic-frontend.html
  - title: Customizing Spryker Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/customizing-spryker-frontend.html
  - title: Integrating JQuery into Atomic Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/integrate-jquery-into-atomic-frontend.html
---

This guide aims to illustrate how to integrate React within Spryker Frontend.

## Setup

1. Install *React*, *ReactDOM*, and relative types.
        Add required dependencies to the project by running the following command from the root folder:

    ```bash
    npm install react react-dom @types/react @types/react-dom --save
    ```


{% info_block warningBox %}

`./package.json` is updated as follows:

```php
"dependencies": {
  ...
  "@types/react": "~16.7.18",
  "@types/react-dom": "~16.0.11",
  "react": "~16.7.0",
  "react-dom": "~16.7.0"
  ...
}
```

{% endinfo_block %}

2. Update webpack configuration.
			React relies on `.jsx` (or `.tsx`) files. As they must be specifically transpiled into Javascript, you need to tell Webpack to read them. Add the following to `./frontend/configs/development.js`:

```php
resolve: {
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'], // add .jsx and tsx here
  ...
},

module: {
  rules: [
    {
      test: /\.tsx?$/, // change from /\.ts$/ to /\.tsx?$/
      loader: 'ts-loader',
      ...
    }
  },
  ...
}
```

3. Add the following into `./tsconfig.json` to make Typescript transpile React:

```php
{
  "compilerOptions": {
    ...
    "jsx": "react",
    ...
  }
}
```

4. Add the following lines to  `./src/Pyz/Yves/ShopUi/Theme/default/vendor.ts` to make sure that React is included into the final output:

```php
import 'react';
import 'react-dom';
```

By doing this, Webpack will know to place React source code inside the vendor chunk and require it from there whenever needed.

## Usage

1. Create your first React component.
    a. Create the example folder `./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/react-component`.
    b. In this folder, create 2 files:
      - `index.ts` - will be used as the component entry point, automatically globbed by the application and injected into the DOM;

    ```php
    import(/* webpackMode: "lazy" */'./react-component');
    ```

      - `react-component.tsx` - contains the component implementation.

```php
import * as React from 'react';
import { render } from 'react-dom';

export const ReactComponent = () => <h1>Hello from React!</h1>;

document
  .querySelectorAll('.react-component')
  .forEach(element => render(<ReactComponent />, element));

```

2. Run the command from the project root folder to rebuild frontend, including React and every new created component:

```bash
npm run yves
```

3. To use the component, add an html element with the class name `.react-component` anywhere in your twig files to see the React component `<div class="react-component"></div>`.
