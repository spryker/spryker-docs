---
title: Integrating React into Atomic Frontend
originalLink: https://documentation.spryker.com/v6/docs/integrating-react-into-atomic-frontend
redirect_from:
  - /v6/docs/integrating-react-into-atomic-frontend
  - /v6/docs/en/integrating-react-into-atomic-frontend
---

This guide aims to illustrate how to integrate React within Spryker frontend.

## Setup
1. Install *React*, *ReactDOM*, and relative types.
        Add required dependencies to the project by running the following command from the root folder:

    ```bash
    npm install react react-dom @types/react @types/react-dom --save
    ```
    
    
{% info_block warningBox %}
`./package.json` is updated as follows:
{% endinfo_block %}

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
      * `index.ts` - will be used as the component entry point, automatically globbed by the application and injected into the DOM;
      
    ```php
    import(/* webpackMode: "lazy" */'./react-component');
    ```
      * `react-component.tsx` - contains the component implementation.

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
