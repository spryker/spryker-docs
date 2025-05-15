---
title: Atomic frontend
description: Learn the basic principles of Spryker UI implementation and how to perform the tasks required to design Spryker UI.
last_updated: Aug 31, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/atomic-front-end-general-overview
originalArticleId: 98f5fe06-2e55-4271-a793-928272216dd5
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/atomic-frontend/atomic-front-end-general-overview.html
  - /docs/atomic-frontend
  - /docs/en/atomic-frontend
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/atomic-frontend-general-overview.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/atomic-front-end-general-overview.html
related:
  - title: Customizing Spryker Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/customizing-spryker-frontend.html
  - title: Integrating JQuery into Atomic Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/integrate-jquery-into-atomic-frontend.html
  - title: Integrating React into Atomic Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/integrate-react-into-atomic-frontend.html
---

To provide each customer with the features they require, Spryker Commerce OS has been split into modules. Each customer can have a unique set of modules, and even module versions, specific to their business requirements. This fact combined with the possibility for customers to develop functionality on their own poses a big challenge for frontend developers. To ease the task, Spryker Frontend implements a design methodology called *atomic design*. Because of this, the UI layer of Spryker is called *Atomic Frontend*.

This document describes the basic principles of Spryker UI implementation and explains how to perform the tasks required to design Spryker UI.

## Basic concepts

Spryker UI is based upon the following concepts:

### Component model

*Atomic design* is an approach that lets you develop user interface as a set of self-contained, independent, and reusable functional units, or components. Within the approach, frontend design can be viewed as a process of bonding components together to fulfill a certain functional goal. By combining various components, you can create powerful and flexible UI applications of any level of complexity.

The main idea of a component is that it contains and carries in itself all the behavior and visual assets necessary to use it on a web page. Also, components do not manipulate DOM directly; they are always declarative. This makes integrating different components seamless and effortless regardless of where and how they are used.

For more information about the component module implemented by Spryker and detailed specifications, see [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

The component model provides the following benefits:

- Decoupling of the backend from the frontend.
- Support for Spryker modularity with a UI component library.
- Possibility to define clear contracts between the backend and frontend in terms of data.
- Better atomicity and encapsulation of the frontend.
- Improved UI reusability.
- Better code quality.

The following peculiarities are characteristic of Spryker usage of Web components:

- *Shadow DOM* is not used. DOM implementation is always explicit.
- Web Components are used only for behavior management. No client-side rendering or logic is implemented in the frontend.
- HTML rendering is done by Twig.

## Atomic design

Based on their structure and use, all components are divided into the following logical and functional categories:

- *Atom*. These are the smallest, most basic building blocks of UI design. Typical examples of atoms are labels, input fields, or buttons. Usually, atoms are very abstract in their essence and limited to a single functionality that can be included in many pages. They are not very useful by themselves. Being the smallest building block of atomic design, atoms cannot include other components.
- *Molecules*. Molecules typically include two or more atoms or other molecules bonded together to serve a single purpose. These structures are already complex enough to have their own properties; however, they must not be overcomplicated and built for wide reuse.
- *Organisms*. Such components are rather specific and already provide sufficient context for the molecules and atoms they are composed of. Usually, organisms do not form a certain page, but they are rather specific as to what they do and what is their function. Typical examples of organisms can include a header, a footer, or a sidebar. Such components are already complex enough to be used directly on a page.
- *Widgets*. This is a special component type that can be used to inject information from an external data source that might be unavailable On the backend side, a widget must contain logic to access the data source and verify whether it's available. On the frontend side, a widget must provide means to show or hide information in such a way as not to break the functionality of the entire shop if the data source is not available. A typical use case for widgets is to show information from Spryker modules that can be missing in a specific customer implementation. For example, if the Discounts module is not used in a project, this does not break the calculation of the overall price, for which reason discount information is injected as a widget. Generally, it's recommended to limit the use of widgets as much as possible in your projects.
- *Templates*. Templates can be viewed as combinations of components composed according to a specific graphic layout. They are used to define a visual schema for a set of pages. Typically, pages with a common template have the same structure and share most of the content with the exception of a small portion of page-specific or widget-specific information that changes from page to page. Thus, a template serves as a backbone that defines a set of shared components and the overall layout. Examples of templates are the main site layout or the checkout layout.
- *Views*. This is the highest point in the frontend hierarchy. A view is a template filled with specific content for use in a specific case. It represents a specific page or widget. Views are the only components that can be called by the backend directly which means that they also serve as a connection point between the backend and frontend. On the backend side, views are always connected to controllers.

## BEM methodology

The styling of Spryker Shop UI components is based upon BEM methodology. It is applied on the **SASS** layer of the shop UI. For a detailed specification and recommended practices, see [CSS with BEM](https://en.bem.info/methodology/css/). For BEM conventions, see the *Naming Conventions* section.

### Technology stack

The following technologies are used to enable Spryker Atomic Frontend:

**Twig**

Twig is the template engine behind the frontend. It allows easy integration of frontend with Spryker backend, which is PHP-based, and also deeply integrates with Symfony that is used as a Spryker framework. For details, see the [Twig](https://twig.symfony.com/) documentation. Spryker uses version 1 of Twig,

**SASS**

SASS is a very powerful superset of CSS that provides the benefit of using variables, mixins, functions, and conditions in CSS. For more information, see [CSS with superpowers](https://sass-lang.com/).

**ES6 Javascript***

The ES6 implementation of Javascript benefits from advanced features, such as class, array, and object methods. It gives you a cleaner and more organized code while simplifying it to a big degree. For more information about this implementation of Javascript, see [Exploring ES6](https://exploringjs.com/es6/).

**Typescript**

Typescript is a superset of Javascript that lets you reinforce the object-oriented approach in programming behaviors. It is used to make Javascript strictly typed, increasing readability and maintainability, reducing the likelihood of type-related mistakes and enforces strong contracts in terms of data. For more information, see the [Typescript](https://www.typescriptlang.org/) documentation.


{% info_block infoBox %}

If necessary, you can develop in pure Javascript. For details, see [How to Customize Spryker Frontend](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/customizing-spryker-frontend.html).

{% endinfo_block %}

**Web Components**

The Web Component standard was chosen as a reliable, high-performance, and consistent approach to creating UI components. The main benefit of this approach is that any user interface created with the help of Web Components is non-changeable across platforms and browsers. Also, it reduces the number of project dependencies required. Basically, everything that is needed to enable Web Components is a set of polyfills. For more information, see [Web Components](https://www.webcomponents.org/) Overview.

**Webpack**

The frontend is based on [Webpack](https://webpack.js.org/). This bundler is responsible for building and compiling project assets. It provides the benefit that lets  you use Typescript for manipulating behavior, SASS for designing styles, and Twig as a template language, compiling them to native HTML, Javascript, and CSS that can be rendered by the browser. In addition to that, it provides Polyfills to enable support for older web browsers. It is extremely flexible and totally configurable to the project's needs.

## Implementation details

Spryker Shop is a modular system composed of several independent modules. The atomic frontend follows the general modular approach:

**`ShopUi`**

`ShopUi` is the main module that implements the core part of the Spryker Shop frontend. It contains basic and shared code, such as global styles, main application bootstrap for Javascript, or Twig models. Also, it implements all general-purpose components that are not related to a specific feature and can be used in every module. It is the main application of the atomic frontend.

**Feature Modules**

In addition to the main application module, there are several other modules that define components, templates, and views. Such modules are dedicated to specific features, or distinctive parts of them, and contain only the assets that can be used within the framework of those features. The design of this module's components is very specific to the feature it implements and can hardly be used out of its context. Examples of such modules are `CartPage` or `ProductImageWidget`.

Although each feature module is a self-contained entity, there are some exceptions. Sometimes, two or more modules might depend on one another (this does not include the `ShopUi` module, on which all frontend modules are dependent). In this case, you can use components across modules. If you resort to such a methodology, be sure to explicitly declare the module dependency in the `composer.json` files of the respective modules. As the general best practice, this behavior is not recommended unless really needed.

The naming and other conventions, as well as folder structure applied in the `ShopUi` module are also valid and applied in each module that implements user interface. This approach must be strictly followed to standardize the folder structure and ensure that Webpack can crawl into all Spryker Shop folders and load every component. The same is also necessary for Twig managed by PHP.

## Folder structure

Spryker Frontend implementation is split into several folders depending on their usage and function:

- `frontend`. It contains Webpack implementation for Spryker Frontend.
- `public`. It contains Webpack compiled assets, such as Javascript files, CSS styles, images, and fonts.
- `vendor/spryker-shop`. It contains the main application (ShopUi) as shipped by Spryker.
- `src/Pyz/Yves`. It contains your own implementation of the Shop Suite and its modules.

### Shop UI

The application is implemented by module ShopUI. It is located in the following folders:

- `vendor/spryker-shop/shop-ui`. It contains the default shop implementation as shipped by Spryker.
- `src/Pyz/Yves/ShopUi`. It is used to override certain parts of the default implementation, or the shop UI implementation as a whole, on the project level.

Components, styles, and templates are loaded from the following folders:

- `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default`— on the Spryker core level.
- `src/Pyz/Yves/ShopUi/Theme/default`— on the project level.

{% info_block infoBox %}

The project-level implementation has a higher priority and applied on top of Spryker Core functionality.

{% endinfo_block %}

The structure of the default folder is as follows (both on the core and project level):

- `components`, `/atoms`, `/molecules`, `/organisms`. These are folders for low-level components. Each component must be placed in its own folder.
- `models`. It contains the Twig models used in the frontend.
- `resources`. It contains application resources.
- `styles`. It contains all SCSS-related assets, such as utility classes, variables, reset for browser styles, grids and so on.
- `templates`. It contains Twig files with templates. Each template must be placed in its own folder.
- `views`. It contains Twig files with views. Each view must be placed in its own folder.
- `app.ts`, `vendor.ts`. These are Typescript entry points.

### Feature components

The feature components are located in the `vendor/spryker-shop` folder of the `ShopUi` module. Regardless of their function and use, every module that has UI on its own contains the `ModuleName/Theme/default` folder. It includes the UI implementation for the module. The folder structure is the same as that of the ShopUi application.

## Application Bootstrap

When you build the shop application, the builder (*Webpack*) finds all entry points of all components. Entry points are the files that Webpack uses to create the output assets.

There are two entry points that are loaded in the DOM in the following order:
- *vendor*: `src/Pyz/Yves/ShopUi/Theme/default/vendor.ts`—contains all external dependencies required for your project.
- *app*: `src/Pyz/Yves/ShopUi/Theme/default/app.ts`—contains the initialization logic for the project and the bootstrap code for the shop application.
  - `src/Pyz/Yves/ShopUi/Theme/default/styles/basic.scss`—contains basic styles.
  - `Components`—when basic styles are loaded, behavior logic and styles of every component are loaded. This ensures that the styles of each component override the basic styles.
  - `src/Pyz/Yves/ShopUi/Theme/default/styles/util.scss`—contains util styles for the project. It is loaded at the very end as the styles defined in it must override all styles, even the styles defined in components.

## Webpack

The core Spryker Frontend functionality is provided by Webpack. It serves as the main basis for the shop application and is used to compile Typescript code and SASS into Javascript and CSS. In addition to that, Webpack collects static assets, such as images and fonts.

Out of the box, the Webpack implementation provided by Spryker is sufficient to satisfy the needs of supporting a shop with the help of a Spryker shop application. However, if necessary, you can configure it the way you need.

The Webpack implementation is located in the frontend folder and has the following structure:

- `settings.js`. It sets the main project settings.
- `build.js`. It is a Webpack loader. This file is called by `npm` when running `npm run yves`.
- `libs/alias.js`. It takes the `paths` property defined in the `tsconfig.json` file and transforms them into Webpack aliases. Using this file ensures that an alias defined in Typescript is available not only everywhere in Typescript, but also in SASS.
- `libs/compiler.js`. It calls Webpack as a compiler and prints out a human-readable output of the build process.
- `libs/finder.js`. Finder is a set of functions needed to locate the assets for the frontend. This is necessary because of the Spryker architecture. Spryker, being a modular application, can contain various modules. Some of them have a frontend implementation, and some do not. The finder locates all frontend assets in all modules and passes them to Webpack to compile. For this purpose, a set of glob operations on the file system are used.
- `configs/development.js`. It is Webpack configuration for development environment.
- `configs/development-watch.js`. It is Webpack configuration for development environment that also provides watchers.
- `configs/production.js`. It is Webpack configuration for production environment.
- `assets/`. It contains static assets (images and fonts) used in the project. This the place to put static files used in your project. They are copied to the `public` folder automatically.

The resulting compiled data is placed in the `public` folder of your Spryker code installation.

## SASS layer

The SASS layer is responsible for styling the frontend UI. It contains the styles, mixins, functions, and variables necessary to provide visual styling for Shop UI components.

Depending on their location and function, SASS styles are divided into four types:
- *Basic Styles*. They comprise the most basic styles used everywhere. Typical examples include HTML reset, grid layouts, or animations. Such styles are loaded by Webpack at the very beginning of application bootstrapping and can be easily overridden at the component level. They are located in the following files:
  - `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/basic.scss` on the Spryker core level.
  - `src/Pyz/Yves/ShopUi/Theme/default/styles/basic.scss` on the project level.

    You can find default basic styles in the `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/basics` folder.

- *Component styles*. These are the styles of each specific component. These styles are defined for each component separately in its own SCSS file. Such styles are loaded after the basic styles, thus they can override them. Depending on where a component is located, the visibility of its styles is different. Mixins that define styles of core components located in the vendor folder are visible everywhere and shared across the whole application. Mixins of project components located in the `src/Pyz` folder are not shared and are visible only within the component itself by default.
- *Util Styles*. This group includes utility styles for the Shop UI—for example, the spacing system, text helpers, float-right, float-left, or is-hidden implementations. Such styles are typically used to modify or even override the default layout or behavior of the components whenever necessary. For example, *is-hidden* implementations can be used to hide elements that are usually visible. For this reason, such styles must not be overridden by any other styles. Because of this, they are loaded at the very end of application bootstrap, when all other styles are loaded. Utility styles are located in the following files:
  - `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/util.scss`— on the Spryker core level.
  - `src/Pyz/Yves/ShopUi/Theme/default/styles/util.scss`—on the project level. You can find default util styles in the following folder: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/util`.
- *Shared Styles*. It is the place to put global SASS variables, functions and mixins. Such style files are loaded automatically before loading each style file, and thus available in any style file in the project. The Spryker core implementation is located in the following file: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/shared.scss`. You can provide your global SASS components in the following file:  `src/Pyz/Yves/ShopUi/Theme/default/style/shared.scss`.

By default, global styles are imported from the settings and helpers folders. Any imports can be overridden directly in your `shared.scss` file. The folders contain the following:
- `settings`. It contains only variables, organized by topic.
- `helpers`. It contain all global functions and mixins used in the system.

## Naming conventions

The following naming conventions must be observed in Spryker Shop:

### Files and folders**

Atomic frontend uses *kebab-case* as naming convention for every file and folder name within the `default` folder

### Variables and functions

- *Twig*: everything related to atomic frontend follows camelCase.
- *SASS*: follows kebab-case and implements BEM methodology with the following syntax:
  - Block: `.component-name`
  - *Element*: `.component-name__element`
  - *Modifier*: `.component-name--modifier` or `.component-name__element--modifier`

{% info_block infoBox "Note" %}

Because block modfiers are the only parameters, you can use to customize a component when using it (include or embed), sometimes, you can find open violations of BEM in Spryker code. In particular, some block modifiers might be in cascade with elements in order to customize them.

{% endinfo_block %}

- *Typescript*: follows camelCase.

## Main templates

Templates are `.twig` files containing a structure of a page or widget. It defines how a component is visually organized and arranged in terms of spacing and positions.

The main templates in *ShopUi* are the following:

- `page-blank`. It efines a blank page. It does not contain any html in the `<body>` tag. This template defines all basic assets for the frontend, such as the `<head>` content (meta info, styles, high priority scripts and page title), as well as the bottom part of the `<body>` content (vendor and application scripts).
- `page-layout-main`. It extends the page-blank template and defines the main layout for every single page in Spryker Suite. This template contains the header, footer, and sidebars, but does not predefine the content of the page. This part is left blank to be defined by specific views.

## Components

Every component is a self-contained entity that implements a certain functional purpose. It does not have parts that are executed in other components, nor it executes parts of code for them. However, a part of a component is executed on the server side (Twig), and the other part is run on the client side (SCSS and Typescript). For this reason, data required for a component must be retrieved by Twig, and then rendered into HTML code. As the data source, you can use controller code or output of another component.

The following conventions are applied to components:
- Every component, template or view is always contained in a folder with the same name.
- Atoms, molecules, and organisms are always placed in the `components` folder of the module they belong to.
- Templates are always stored in folder templates.
- Views are always stored in folder called views.
- Every component extends a model defined in `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.twig`.

### Component loading

For a component to be used by the shop application, it needs to be compiled by Webpack and provide a function to register it in the DOM. Thus, when DOM is loaded, the application checks which of the registered components are present there and mounts only those that are available at `DomContentLoaded`. For each component that is being mounted, Webpack calls the chunk related to a component and loads the code and assets. As soon as all components have finished mounting, the application calls the `app.ready` event indicating that each component has finished loading and ready to use.
Mounting of components is asynchronous, which means that several components can be loaded at the same time, reducing the overall load time.

### Component structure

A typical component folder consists of the following files:

- `index.ts`. It pecifies the component entry point for Webpack. This file is necessary to locate the component styles and Typescript code.
- `component-name.ts`. It specifies the behavior for the component in Typescript.
- `component-name.scss`. It contains the SCSS style for the component, wrapped into a mixin.<br>Note: If a component contains the `style.scss` file, this file only declares a mixin.
- `style.scss`. It imports the style when `component-name.scss` contains only mixin declaration.
- `component-name.twig`. It efines a template for the component layout.

The above structure contains a fully featured component, with styles and Typescript that defines the component behavior. Depending on what you are trying to achieve, you can have a component that includes both styles and behavior, or any of these separately. In addition to this, you can even create a component that has neither styles, nor behavior. In the latter case, the component contains a template only consisting of a `.twig` file.
*Views* and *templates* always consist of a `.twig` file only.

### Twig

When defining a component template with Twig, you need to use the following default entities:

- The `config` variable specifies the following base information about a component:

**Example:**

```twig
{% raw %}{% define config = {
    name: 'new-component-counter',
    tag: 'new-component-counter'
} %}{% endraw %}
```

**Attributes:**

  * `name`: It specifies the component name. This name is also used as the main class name for the component; therefore, the HTML element and modifiers have this name as the base.
  * Optional: `jsName`: It is a Javascript name of the component. By convention, whenever Javascript behavior is added to a component, the DOM addressing for elements must be performed using dedicated classnames starting with the `-js` prefix. This prevents confusion in who-does-what: a classname starting with `js-` has no style attached to it, but only Javascript behaviour. On the other hand, any classname that does not start with `js-` is a pure style. If `jsName` is not defined explicitly, it's created automatically by prefing `js-` to the component name.
  * Optional: `tag`. It specifies the HTML tag name for the component. Every component is defined in the DOM as an HTML class with its dedicated tag name. Therefore, a tag name must be specified. You can use either a standard HTML5 tag name (for example, `p` or `td`) or have a custom element tag name in order to attach Javascript behavior. To create a component with custom behavior defined in Javascript, Web Component specification, specify a custom tag name. If tag name is not specified, `div`is used by default.
  * `data`. It is the variable defining the data contract for the component. This variable is used the data contract for the component. The contract consists of the attributes required for the component to function properly. The attributes provided by this variable can be either required or optional. Required attributes must always be defined whenever a component is used, while optional ones can be left undefined. Nevertheless, by convention, attributes cannot have their value undefined. For this reason, if you define an optional attribute in your contract, you must set a default value for it. The default value is used if an attribute value is not set explicitly or by context.

Whenever possible, use primitive types—for example, strings or numbers. Avoid complex objects as a change in the object might lead to a broken component outside the contract itself.

**Example:**

```twig
{% raw %}{% define data = {
    name: required,
    description: 'no description'
} %}{% endraw %}
```

- `attributes`. It is the variable defining HTML5 attributes for the component. If *not null* or *false*, the specified attributes are rendered in the component's HTML5 tag. The same as data attributes, an HTML5 attribute can be required or optional with a default value.

**Example:**

```twig
{% raw %}{% define attributes = {
    'element-selector': required
} %}{% endraw %}
```

- `class`. It is the variable defining external class names that a component might receive from the context.
- `modifiers`. The array defining a list of modifiers received from the context that can be applied to the main block.
- `embed`. The variable defining a list of variables that a component might receive from the context, specifically to be used for Twig embedding.
- `macros`:
  - `renderClass`. It renders the classnames for the component. According to BEM specifications, the following is rendered:
    - *Name* (as defined in the config variable).
    - *Modifiers* (if passed by the modifiers array).
    - *External class names* (if passed by the class varible).
  - `renderAttributes`. It renders the HTML5 attributes defined in the attributes variable.
- `blocks`:
  - `component`. The main block that contains all the logic to render a component.
  - `class`. It contains the class names for the component.
  - `attributes`. It contains the HTML5 attributes for the component.
  - `body`. It contains the body for the component. Use this block to fill a component with content.
- `qa`. It is an experimental custom HTML5 attribute that renders a list of items that can be used later in QA to address a specific component or part of it.

**Builtin Twig functions and filters:**

The following builtin twig functions and filters can be used in your components to enable them with builtin Shop UI functionality:

**`function model($modelName: string): string`**

It returns a string in the following format: `@ShopUi/models/modelName.twig`.

The string is used internally to resolve the model location within the `ShopUi` module.

`$modelName`: model name.

**`function atom($componentName: string, $componentModule: string = "ShopUi"): string`**

The function is used to resolve atom paths. It returns a string in the following format: `@componentModule/components/atoms/componentName/componentName.twig`.

The string is used internally to resolve the component location within the provided module.
* `$componentName`: component name.
* Optional: `$componentModule`: Spryker module in which the component is located. If `$componentModule` is not specified, `ShopUi` is used.

**`function molecule($componentName: string, $componentModule: string = "ShopUi"): string`**

The function is used to resolve molecule paths. It returns a string in the following format: `@componentModule/components/molecules/componentName/componentName.twig`.

The string is used internally to resolve the component location within the provided module.
* `$componentName`: component name.
* Optional: `$componentModule`: Spryker module in which the component is located. If `$componentModule` is not specified, `ShopUi` is used.

**`function organism($componentName: string, $componentModule: string = "ShopUi"): string`**

The function is used to resolve organism paths. It returns a string in the following format: `@componentModule/components/organisms/componentName/componentName.twig`.

The string is used internally to resolve the component location within the provided module.
* `$componentName`: component name.
* Optional: `$componentModule`: the Spryker module in which the component is located. If `$componentModule` is not specified, `ShopUi` is used.

**`function template($templateName: string, $templateModule: string = "ShopUi"): string`**

The function is used to resolve template paths. It returns a string in the following format: `@templateModule/templates/templateName/templateModule.twig`.

The string is used internally to resolve the component location within the provided module.
* `$templateName` - template name
* Optional: `$templateModule` - Spryker module in which the template is located. If `$templateModule` is not specified, `ShopUi` is used.

**`function view($viewName: string, $viewModule: string = "ShopUi"): string`**

The function is used to resolve view paths. It returns a string in the following format: `@viewModule/views/viewName/viewName`.

The string is used internally to resolve the component location within the provided module.
* `$viewName`: view name.
* Optional: `$viewModule: Spryker module in which the view is located. If `$viewModule` is not specified, `ShopUi` is used.

**`function publicPath($relativePath: string): string`**

The function is used to provide a safe way to access the public folder where compiled assets are located. It returns a string in the following format:`public/path/relative/path`.

The string is used internally to resolve the component location within the provided module.

`$relativePath`: asset relative path.

**`function qa($qaValues: string[] = []): string`**

It returns a string in the following format: `data-qa="qa values here"`.

**`unction qa_($qaName: string, $qaValues: string[] = []): string`**

It returns a string in the following format: `data-qa-name="qa values here"`.

`$qaName`: specifies the name to add in the left side of the data structure.

**Custom tag define**

This function can be used for the following purposes:
- Create a default object that can be changed from the incoming context.
- Define tags used to pass properties and contract for a specific component.

**Typical implementation:**

```twig
{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define config = {
    name: 'component-name',
    tag: 'tag'
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    ...
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    ...
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

## SCSS

A typical `component-name.scss` file looks as follows:

```scss
@mixin module-name-component-name($name: '.component-name') {
    #{$name} {
        // BEM styles

        @content;
    }
}
```

When defining styles for a component, you can include the global mixins, variables and styles as defined in the `ShopUi` module. They are exposed to every component by default. Also, you can use the styles and mixins of every built-in component, because they are exposed transparently to the project level—for example:

```scss
@include shop-ui-side-drawer('.new-existing-component-side-drawer') { //Create component style based on mixin of a core component
    color: $setting-color-alt; // Use system-wide variables

    &__overlay {
        background-color: $setting-color-main; // Use system-wide variables
    }
}
```

A component can also contain a `style.scss` file that imports the component style. In this case, `component-name.scss` just defines the style, while `style.scss` imports it, producing an output once. This is useful when a mixin might be used multiple times or extended. In that case, import using a separate file prevents the content to be rendered in the output every time a mixin is called.

{% info_block warningBox %}

The use of a `style.scss` file is required for Spryker core components only, project-level components may ignore it.

{% endinfo_block %}

### Behavior

The `component-name.ts` file contains the typescript implementation defined as a custom element.

The component class must element a DOM callback. You can use any callback defined by the Web Components Specification. It is recommended to use ready callback. This callback is triggered when the component is ready and all other components have already been loaded in the DOM. It is the safest approach from the point of view of DOM manipulation. When the component receives the callback you define, it executes the behavioral logic.

In your code, you can use keyword this to access the public API of the HTML element associated with the component.

**Typical implementation:**

```ts
import Component from 'ShopUi/models/component';

export default class ComponentName extends Component {
    protected readyCallback(): void {
        // TODO: your code here
    }
}
```

The preceding example extend the default Component model defined in the ShopUi application. However, you can extend from any component both on the Spryker core and on the project level. In this case, your new component inherits the logic and behavior of the component it's derived from. The following example shows a component inherited from the default side-drawer component of Spryker Shop:

```ts
// Import class SideDrawer
import SideDrawer from 'ShopUi/components/organisms/side-drawer/side-drawer';

// Export the extended class
export default class ComponentName extends SideDrawer {
    protected readyCallback(): void {
        // TODO: your code here
    }
}
```

### The `index.ts` file

The `index.ts` file is required to load the client-side of the component with Webpack. The latter globs the system looking for these files and bundles them into an output file. Create this file whenever you need to include a style and/or a Typescript/Javascript file as part of the component.

To register the component in the DOM, you need to use the `register` function of the shop application. It accepts two arguments:

- `name`. It specifies the component's tag name. This name is associated with the component and can be used in Twig to insert the component into a template. Also, it's used in the DOM as a tag name. Whenever a tag with the specified name occurs in the DOM, the Shop Application loads the component.

- `importer`. It must be a call of Webpack's import function to import Typescript code for the component. The call must include a Webpack magic comment that specifies which type of import you want for the component, 'lazy' or 'eager'. For details, see [Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports).

**Typical implementation:**

```ts
import './component-name.scss';

// Import the 'register' function from the Shop Application
import register from 'ShopUi/app/registry';

// Export the component behavior
export default register(
    'component-name',
    () => import(/* webpackMode: "lazy" */'./component-name')
);
```


## Next steps

The following documents can help you in developing Spryker Atomic Frontend step-by-step:

- [Tutorial: Customize Spryker Frontend](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/customizing-spryker-frontend.html)
- [Tutorial: Frontend - Create a Component](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/managing-components/creating-components.html)
- [Tutorial: Frontend - Override a Component](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/managing-components/overriding-components.html)
- [Tutorial: Frontend - Extend a Component](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/managing-components/extending-components.html)
- [Tutorial: Frontend - Integrate JQuery into Atomic Frontend](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/integrate-jquery-into-atomic-frontend.html)
- [Tutorial: Frontend - Use a Component](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/managing-components/using-components.html)
