---
title: Atomic Frontend- General Overview
originalLink: https://documentation.spryker.com/v1/docs/atomic-frontend
redirect_from:
  - /v1/docs/atomic-frontend
  - /v1/docs/en/atomic-frontend
---

To provide each customer with the features they require, Spryker Commerce OS has been split into modules. Each customer can have a unique set of modules, and even module versions, specific to their business requirements. This fact combined with the possibility for customers to develop functionality on their own poses a big challenge for frontend developers. To ease the task, Spryker Frontend implements a design methodology called **atomic design**. Because of this, the UI layer of Spryker is called *Atomic Frontend*.

The following document describes the basic principles of Spryker UI implementation and explains how to perform the tasks required to design Spryker UI.

## Basic Concepts
Spryker UI is based upon the following concepts:

### Component Model
*Atomic design* is an approach that allows you to develop user interface as a set of self-contained, independent and reusable functional units, or components. Within the approach, frontend design can be viewed as a process of bonding components together to fulfill a certain functional goal. By combining various components, you can create powerful and flexible UI applications of any level of complexity.

The main idea of a component is that it should contain and carry in itself all the behavior and visual assets necessary to use it on a web page. Also, components should not manipulate DOM directly, they are always declarative. This makes integrating different components seamlessly and effortlessly regardless of where and how they are used.

{% info_block warningBox %}
For more details on the component module implemented by Spryker, and detailed specifications, see [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components
{% endinfo_block %}.)

The component model provides the following benefits:

* decoupling of backend from frontend
* support for Spryker modularity with a UI component library
* possibility to define clear contracts between backend and frontend in terms of data
* better atomicity and encapsulation of frontend
* improved UI reusability
* better code quality

The following peculiarities are characteristic of Spryker usage of Web Components:

* *Shadow DOM* is not used. DOM implementation is always explicit.
* Web Components are used only for behavior management. No client side rendering or logic is implemented in the frontend.
* HTML rendering is done by Twig.

## Atomic Design
Based on their structure and use, all components are divided into the following logical and functional categories:

* **atom** - These are the smallest, most basic building blocks of UI design. Typical examples of atoms are labels, input fields or buttons. Usually, atoms are very abstract in their essence and limited to a single functionality that can be included in many pages. They are not very useful by themselves. Being the smallest building block of atomic design, atoms cannot include other components.
* **molecules** - Molecules typically include two or more atoms or other molecules bonded together to serve a single purpose. These structures are already complex enough to have their own properties, however, they should not be overcomplicated and built for wide reuse.
* **organisms** - Such components are rather specific and already provide sufficient context for the molecules and atoms they are composed of. Usually, organisms do not form a certain page, but they are rather specific as to what they do and what is their function. Typical examples of organisms can include a header, a footer, the sidebar etc. Such components are already complex enough to be used directly on a page.
* **widgets** - This is a special type of components that can be used to inject information from an external data source that might be unavailable On the backend side, a widget must contain logic to access the data source and verify whether it is available. On the frontend side, a widget must provide means to show or hide information in such a way as not to break the functionality of the entire shop if the data source is not available. A typical use case for widgets is to show information from Spryker modules that can be missing in a specific customer implementation. For example, if the Discounts module is not used in a project, this should not break the calculation of the overall price, for which reason discounts information is injected as a widget. Generally, it is recommended to limit the use of widgets as much as possible in your projects.
* **templates** - Templates can be viewed as combinations of components composed according to a specific graphic layout. They are used to define a visual schema for a set of pages. Typically, pages with a common template have the same structure and share most of content with the exception of a small portion of page-specific or widget-specific information that changes from page to page. Thus, a template serves as a backbone that defines a set of shared components and the overall layout. Examples of templates are the main site layout or the checkout layout.
* **views** - This is the highest point in the frontend hierarchy. A view is a template filled with specific content for use in a specific case. It represents a specific page or widget. Views are the only components that can be called by the backend directly which means that they also serve as a connection point between backend and frontend. On the backend side, views are always connected to controllers.

For more details on the component model that inspired Spryker frontend, see [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).

## BEM Methodology
The styling of Spryker Shop UI components is based upon BEM methodology. It is applied on the **SASS** layer of the shop UI. For a detailed specification and recommended practices, see [CSS with BEM](https://en.bem.info/methodology/css/). For BEM conventions, see the *Naming Conventions* section.

### Technology stack
The following technologies are used to enable Spryker Atomic Frontend:

* **Twig**

    Twig is the template engine behind the frontend. It allows easy integration of frontend with Spryker backend, which is PHP-based, and also deeply integrates with Symfony that is used as Spryker framework. For details, see the [Twig](https://twig.symfony.com/) documentation. Spryker uses version 1 of Twig,

* **SASS**

    SASS is a very powerful superset of CSS that provides the benefit of using variables, mixins, functions, and conditions in CSS. For information information, see [CSS with superpowers](https://sass-lang.com/).

* **ES6 Javascript**

    The ES6 implementation of Javascript benefits from advanced features, such as class, array and object methods. It allows you to have a cleaner and more organized code, while simplifying it to a big degree. For more information on this implementation of Javascript, see [Exploring ES6](https://exploringjs.com/es6/).

* **Typescript**

    Typescript is a superset of Javascript that allows you to reinforce the object-oriented approach in programming behaviors. It is used to make Javascript strictly typed, increasing readability and maintainability, reducing the likelihood of type-related mistakes and enforces strong contracts in terms of data. For more information, see the [Typescript](https://www.typescriptlang.org/) documentation.
    
    
<!-- {% info_block warningBox %}
If necessary, you can develop in pure Javascript. For details, see //How to Customize Spryker Frontend TODO:.
{% endinfo_block %}-->

* **Web Components**

    The Web Component standard was chosen as a reliable, high-performance and consistent approach to creating UI components. The main benefit of this approach is that any user interface created with the help of Web Components will be non-changeable across platforms and browsers. Also, it reduces the number of project dependencies required. Basically, everything that is needed to enable Web Components is a set of polyfills. For more information, see [Web Components](https://www.webcomponents.org/) Overview.

* **Webpack**
    The frontend is based on [Webpack](https://webpack.js.org/). This bundler is responsible for building and compiling project assets. It provides the benefit that allows using Typescript for manipulating behavior, SASS for designing styles, and Twig as the template language, compiling them to native HTML, Javascript and CSS that can be rendered by the browser. In addition to that, it provides Polyfills to enable the support for older web browsers. It is extremely flexible and totally configurable to the project needs.
    
## Implementation Details
Spryker Shop is a modular system composed of several independent modules. The atomic frontend follows the general modular approach:

**ShopUi**
*ShopUi* is the main module that implements the core part of Spryker Shop frontend. It contains basic and shared code, such as global styles, main application bootstrap for Javascript, Twig models etc. Also, it implements all general-purpose components that are not related to a specific feature and can be used in every module. It is the main application of the atomic frontend.

**Feature Modules**
In addition to the main application module, there are several other modules that define components, templates and views. Such modules are dedicated to specific features, or distinctive parts of it, and contain only the assets that can be used within the framework of those features. The design of this module components is very specific to the feature it implements and can hardly be used out of its context. Examples of such modules are `CartPage` or `ProductImageWidget`.

Although each feature module is a self-contained entity, there are some exceptions. Sometimes, it might happen that two or more modules are dependent on one another (this does not include the `ShopUi` module, on which all frontend modules are dependent). In this case, it is allowed to use components across modules. If you resort to such a methodology, be sure to explicitly declare the module dependency in the `composer.json` files of the respective modules. As the general best practice, this behavior is not recommended unless really needed.

The naming and other conventions, as well as folder structure applied in the `ShopUi` module are also valid and applied in each module that implements user interface. This approach must be strictly followed to standardize the folder structure and ensure that Webpack can crawl into the all Spryker Shop folders and load every component. The same is also necessary for Twig managed by PHP.

## Folder Structure

Spryker frontend implementation is split into several folders depending on their usage and function:

* **frontend**: Contains Webpack implementation for Spryker frontend.
* **public**: Contains Webpack compiled assets, such as Javascript files, CSS styles, images, fonts etc.
* **vendor/spryker-shop**: Contains the main application (ShopUi) as shipped by Spryker.
* **src/Pyz/Yves**: Contains your own implementation of the Shop Suite and its modules.

### Shop UI
The application is implemented by module ShopUI. It is located in the following folders:

* **vendor/spryker-shop/shop-ui**: Contains the default shop implementation as shipped by Spryker.
* **src/Pyz/Yves/ShopUi**: Used to override certain parts of the default implementation, or the shop UI implementation as a whole, on the project level.


Components, styles and templates will be loaded from the following folders:

* `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default` - on the global level;
* `src/Pyz/Yves/ShopUi/Theme/default` - on the project level.

{% info_block infoBox %}
Note that the project-level implementation has a higher priority and loaded after the global implementation.
{% endinfo_block %}

The structure of the default folder is as follows (both on the global and project level):

* **components,   /atoms, /molecules, /organisms**: Folders for low-level components. Each component must be placed in its own folder.
* **models**: Contains the Twig models used in the frontend.
* **resources**: Contains application resources.
* **styles**: Holds all SCSS-related assets, such as utility classes, variables, reset for browser styles, grids and so on.
* **templates**:Contains Twig files with templates. Each template must be placed in its own folder.
* **views**: Contains Twig files with views. Each view must be placed in its own folder.
* **app.ts**, **es6-polyfill.ts**, **vendor.ts**: Typescript entry points.

### Feature Components
The feature components are located in the `vendor/spryker-shop` folder of the `ShopUi` module. Regardless of their function and use, every module that has UI on its own contains the `ModuleName/Theme/default` folder. It includes the UI implementation for the module. The folder structure is the same as that of the ShopUi application.

## Main Application (Shop UI)
### Application Bootstrap
When you build the shop application, the builder (*Webpack*) will find all entry points of all components. Entrypoints are the files that Webpack uses to create the output assets.

There are 3 entrypoints that will be loaded in the DOM in the following order:

* **es6-polyfill**:
    `src/Pyz/Yves/ShopUi/Theme/default/es-polyfill.ts`
    Provides ES6 polyfills used for compatibility with older browsers.
    
* **vendor**: 
    `src/Pyz/Yves/ShopUi/Theme/default/vendor.ts`
    Contains all external dependencies required for your project.
    
* **app**:
    `src/Pyz/Yves/ShopUi/Theme/default/app.ts`
    Contains the initialization logic for the project and the bootstrap code for the shop application.
    </br>
    `src/Pyz/Yves/ShopUi/Theme/default/styles/basic.scss`
    Contains basic styles.
    </br>
    `Components`
     When basic styles are loaded, behavior logic and styles of every component is loaded. This ensures that styles of each component override the basic styles.
 </br>
 `src/Pyz/Yves/ShopUi/Theme/default/styles/util.scss`
 Contains util styles for the project. It is loaded at the very end as the styles defined in it must override all styles, even the styles defined in components.
    
### Webpack
The core Spryker frontend functionality is provided by Webpack. It serves as the main basis for the shop application and used to compile Typescript code and SASS into Javascript and CSS. In addition to that, Webpack collects static assets, such as images and fonts. 

Out of the box, the Webpack implementation provided by Spryker is sufficient to satisfy the needs of supporting a shop with the help of a Spryker shop application. However, if necessary, you can configure it the way you need.

The Webpack implementation is located in the frontend folder and has the following structure:

* **settings.js**: Sets the main project settings.
* **build.js**: Webpack loader. This file is called by `npm` when running `npm run yves`.
* **libs/alias.js**: Takes the `paths` property defined in the `tsconfig.json` file and transforms them into Webpack aliases. Using this file ensures that an alias defined in Typescript is available not only everywhere in Typescript, but also in SASS.
* **libs/compiler.js**: Calls Webpack as a compiler and prints out a human-readable output of the build process.
* **libs/finder.js**:  Finder is a set of functions needed to locate the assets for the frontend. This is necessary because of Spryker architecture. Spryker, being a modular application, can contain various modules. Some of them have a frontend implementation, and some do not. The finder locates all frontend assets in all modules and passes them to Webpack to compile. For this purpose, a set of glob operations on the file system are used.
* **configs/development.js**: Webpack configuration for development environment.
* **configs/development-watch.js**: Webpack configuration for development environment that also provides watchers.
* **configs/production.js**: Webpack configuration for production environment.
* **assets/**: Contains static assets (images and fonts) used in the project. This the place to put static files used in your project. They will be copied to the *public* folder automatically.

The resulting compiled data is placed in the *public* folder of your Spryker code installation.

### SASS Layer
The SASS layer is responsible for styling the frontend UI. It contains the styles, mixins, functions, variables etc necessary to provide visual styling for Shop UI components.

Depending on their location and function, SASS styles are divided into 4 types:

* **Basic Styles** - comprise the most basic styles used everywhere. Typical examples include HTML reset, grid layouts or animations etc. Such styles are loaded by Webpack at the very beginning of application bootstrapping and can be easily overridden at the component level. They are located in the following files: 
    `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/basic.scss`
        - on the global level;
      `src/Pyz/Yves/ShopUi/Theme/default/styles/basic.scss` - on the project level.
      You can find default basic styles in the following folder: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/basics`.
      
* **Component Styles** - are styles of each specific component. These styles are defined for each component separately in its own *SCSS* file. Such styles are loaded after the basic styles, thus they can override them. Depending on where a component is located, the visibility of its styles is different. Mixins that define styles of core components located in the vendor folder are visible everywhere and shared across the whole application. Mixins of project components located in the `src/Pyz` folder are not shared and visible only within the component itself by default.
* **Util Styles** - this group includes utility styles for the Shop UI, like, for example, the spacing system, text helpers, float-right, float-left or is-hidden implementations. Such styles are typically used to modify or even override the default layout or behavior of the components whenever necessary. For example, *is-hidden* implementations can be used to hide elements that are usually visible. For this reason, such styles should not be overridden by any other styles. Because of this, they are loaded at the very end of application bootstrap, when all other styles are loaded. Utility styles are located in the following files:

    `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/util.scss`- on the global level;
    `src/Pyz/Yves/ShopUi/Theme/default/styles/util.scss` - on the project level.
    You can find default util styles in the following folder: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/util`.
    

* **Shared Styles** - is the place to put global SASS variables, functions and mixins. Such style files are loaded automatically before loading each style file, and thus available in any style file in the project.

    The global implementation is located in the following file: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/shared.scss`.
    You can provide your global SASS components in the following file:  `src/Pyz/Yves/ShopUi/Theme/default/style/shared.scss`.
    
By default, global styles are imported from the settings and helpers folders. Any imports can be overridden directly in your shared.scss file. The folders contain the following:

* **settings** - contains only variables, organized by topic
* **helpers** - contains all global functions and mixins used in the system.
        
## Naming Conventions
The following naming conventions must be observed in Spryker Shop:
**Files and Folders:**
Atomic frontend uses **kebab-case** as naming convention for every file/folder name within the *default* folder;

**Variables and Functions:**

* **Twig**: everything related to atomic frontend follows camelCase;
* **SASS**: follows kebab-case and implements BEM methodology with the following syntax:
    * **block**: .component-name
    * **element**: .component-name__element
    * **modifier**: .component-name--modifier or .component-name__element--modifier
    * Note: as block modfiers are the only parameters we can use to customize a component when using it (include or embed), sometimes, you will find open violations of BEM in Spryker code. In particular, some block modifiers might be in cascade with elements in order to customize them.
* **Typescript**: follows camelCase.

## Main Templates
Templates are `.twig` files containing a structure of a page or widget. It defines how a component is visually organised and arranged in terms of spacing and positions.

The main templates in *ShopUi* are:

* **page-blank** - defines a blank page. It does not contain any html in the &lt;body&gt; tag. This template defines all basic assets for the frontend, such as the &lt;head&gt; content (meta info, styles, high priority scripts and page title), as well as the bottom part of the &lt;body&gt; content (vendor and application scripts).
* **page-layout-main**: extends the page-blank template and defines the main layout for every single page in Spryker Suite. This template contains the header, footer, sidebars etc, but does not predefine the content of the page. This part is left blank to be defined by specific views.

## Components
Every component is a self-contained entity that implements a certain functional purpose. It does not have parts that are executed in other components, nor it executes parts of code for them. However, a part of a component is executed on the server side (Twig), and the other part is run on the client side (SCSS         and Typescript). For this reason, data required for a component should be retrieved via Twig, and then rendered into HTML code. As the data source, it is possible to use controller code or output of another component.
        
The following conventions are applied to components:

* every component, template or view is always contained in a folder with the same name;
* atoms, molecules, and organisms are always placed in the **components** folder of the module they  belong to;
* templates are always stored in folder templates;
* views are always stored in folder called views;
* every component extends a model defined in `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.twig`.

### Component Loading

For a component to be used by the shop application, it needs to be compiled by Webpack and provide a function to register it in the DOM. Thus, when DOM is loaded, the application checks which of the registered components are present there and mounts only those that are available at *DomContentLoaded*. For each component that is being mounted, Webpack calls the chunk related to a component and loads the code and assets. As soon as all components have finished mounting, the application calls the `app.ready`event indicating that each component has finished loading and ready to use.
Mounting of components is asynchronous, which means that several components can be loaded at the same time, reducing the overall load time.

### Component Structure
A typical component folder consists of the following files:

* **index.ts**: Specifies the component entry point for Webpack. This file is necessary to locate the component styles and Typescript code.
* **component-name.ts**: Specifies the behavior for the component in Typescript.
* **component-name.scss**: Contains the SCSS style for the component, wrapped into a mixin.</br>Note: If a component contains the `style.scss` file, this file only declares a mixin.
* **style.scss**: Imports the style when `component-name.scss`contains only mixin declaration.
* **component-name.twig**: Defines a template for the component layout.

The above structure contains a fully featured component, with styles and Typescript that defines the component behavior. Depending on what you are trying to achieve, you can have a component that includes both styles and behavior, or any of these separately. In addition to this, you can even create a component that has neither styles, nor behavior. In the latter case, the component will contain a template only consisting of a `.twig` file.
*Views* and *templates* always consist of a `.twig` file only.

### Twig
When defining a component template with Twig, you need to use the following default entities:

* `config` variable: specifies the following base information about a component:
    <details open>
    <summary>Example:</summary>
    
    ```php
    % define config = {
        name: 'new-component-counter',
        tag: 'new-component-counter'
    } {% raw %}%}{% endraw %}
    ```

    </br>
    </details>

    *Attributes*:

    * **name**: component name (required)
    Specifies the component name. This name is also used as the main class name for the component,  therefore the HTML element and modifiers will have this name as the base.
    * **jsName**: Javascript name of the component (optional)
    By convention, whenever Javascript behavior is added to a component, the DOM addressing for elements should be performed using dedicated classnames starting with the *-js* prefix. This prevents confusion in who-does-what: a classname starting with js- will have no style attached to it, but only Javascript behaviour. On the other hand, any classname that does not start with js- will be a pure style.
    If `jsName` is not defined explicitly, it will be created automatically by prefing js- to the component name.
   * **tag**: specifies the HTML tag name for the component (optional)
   Every component is defined in the DOM as an HTML class with its dedicated tag name. Therefore a tag name must be specified. You can use either a standard HTML5 tag name (for example, `p` or `td`) or have a custom element tag name in order to attach Javascript behavior. In case you want to create a component with custom behavior defined in Javascript, Web Component specification, you must specify a custom tag name.
   If tag name is not specified, `div`is used by default.
   
* `data` variable: defines the data contract for the component.
This variable is used the data contract for the component. The contract consists of the attributes required for the component to function properly. The attributes provided by this variable can be either required or optional. Required attributes must always be defined whenever a component is used, while optional ones can be left undefined. Nevertheless, by convention, attributes cannot have their value undefined. For this reason, if you define an optional attribute in your contract, you must set a default value for it. The default value will be used if an attribute value is not set explicitly or via context.

Whenever possible, use primitive types (e. g. strings, numbers etc). Avoid complex objects as a change in the object might lead to a broken component outside the contract itself.

<details open>
<summary>Example:</summary>
    
```php
% define data = {
    name: required,
    description: 'no description'
} {% raw %}%}{% endraw %}
```

</br>
</details>

* `attributes` variable: defines HTML5 attributes for the component
If not **null** or **false**, the specified attributes will be rendered in the component's HTML5 tag. The same as data attributes, an HTML5 attribute can be required or optional with a default value.

<details open>
<summary>Example:</summary>
    
```php
% define attributes = {
    'element-selector': required
} {% raw %}%}{% endraw %}
```

</br>
</details>

* `class` variable: defines external class names that a component might receive from the context.
* `modifiers` array: defines a list of modifiers received from the context that can be applied to the main block.
* `embed` variable: defines a list of variables that a component might receive from the context, specifically to be used for Twig embedding.
* `macros`
    * `renderClass`: renders the classnames for the component. According to BEM specifications, the following is rendered:
        * *name* (as defined in the config variable),
        * *modifiers* (if passed via the modifiers array)
        * *external class names* (if passed via the class varible).
    * `renderAttributes`: renders the HTML5 attributes defined in the attributes variable.
* **blocks**
    * component: the main block that contains all the logic to render a component
    * class: contains the class names for the component
    * attributes: contains the HTML5 attributes for the component
    * body: contains the body for the component. Use this block to fill a component with content
 * **qa**: Experimental custom HTML5 attribute that renders a list of items that can be used later in QA to address a specific component or part of it.

**Builtin Twig Functions and Filters**
The following builtin twig functions and filters can be used in your components to enable them with builtin Shop Ui functionality:

**function model($modelName: string): string**
Returns a string in the following format: `@ShopUi/models/modelName.twig`
The string is used internally to resolve the model location within the ShopUi module.
`$modelName` - model name (required)

**function atom($componentName: string, $componentModule: string = "ShopUi"): string**
The function is used to resolve atom paths. Returns a string in the following format: `@componentModule/components/atoms/componentName/componentName.twig`
The string is used internally to resolve the component location within the provided module.
`$componentName` - component name (required)
`$componentModule` - Spryker module in which the component is located (optional)
If `$componentModule` is not specified, ShopUi is used.

**function molecule($componentName: string, $componentModule: string = "ShopUi"): string**
The function is used to resolve molecule paths. Returns a string in the following format: `@componentModule/components/molecules/componentName/componentName.twig`
The string is used internally to resolve the component location within the provided module.
`$componentName` - component name (required)
`$componentModule` - Spryker module in which the component is located (optional)
If `$componentModule` is not specified, ShopUi is used.

**function organism($componentName: string, $componentModule: string = "ShopUi"): string**
The function is used to resolve organism paths. Returns a string in the following format: `@componentModule/components/organisms/componentName/componentName.twig`
The string is used internally to resolve the component location within the provided module.
`$componentName` - component name (required)
`$componentModule` - Spryker module in which the component is located (optional)
If `$componentModule` is not specified, ShopUi is used.

**function template($templateName: string, $templateModule: string = "ShopUi"): string**
The function is used to resolve template paths. Returns a string in the following format: `@templateModule/templates/templateName/templateModule.twig`
The string is used internally to resolve the component location within the provided module.
`$templateName` - template name (required)
`$templateModule` - Spryker module in which the template is located (optional)
If `$templateModule` is not specified, ShopUi is used.

**function view($viewName: string, $viewModule: string = "ShopUi"): string**
The function is used to resolve view paths. Returns a string in the following format: `@viewModule/views/viewName/viewName`
The string is used internally to resolve the component location within the provided module.
`$viewName` - view name (required)
`$viewModule` - Spryker module in which the view is located (optional)
If `$viewModule` is not specified, ShopUi is used.

**function publicPath($relativePath: string): string**
The function is used to provide a safe way to access the public folder where compiled assets are located. Returns a string in the following format:`public/path/relative/path`
The string is used internally to resolve the component location within the provided module.
`$relativePath` - asset relative path (required)

**function qa($qaValues: string[] = []): string**
Returns a string in the following format: data-qa="qa values here"

**unction qa_($qaName: string, $qaValues: string[] = []): string**
Returns a string in the following format: data-qa-name="qa values here"
`$qaName` - specifies the name to add in the left side of the data strucure.

**custom tag define**
This function can be used for the following purposes:

* create a default object that can be changed from the incoming context;
* define tags used to pass properties and contract for a specific component.

<details open>
<summary>Typical implementation:</summary>

```php
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
    
</br>
</details>

## SCSS
A typical `component-name.scss` file looks as follows:

```php
@mixin module-name-component-name($name: '.component-name') {
    #{$name} {
        // BEM styles

        @content;
    }
}
```

When defining styles for a component, you can include the global mixins, variables and styles as defined in the ShopUi module. They are exposed to every component by default. Also, you can use the styles and mixins of every built-in component, as they are exposed transparently to the poject level, for example:

```php
@include shop-ui-side-drawer('.new-existing-component-side-drawer') { //Create component style based on mixin of a core component
    color: $setting-color-alt; // Use system-wide variables
 
    &__overlay {
        background-color: $setting-color-main; // Use system-wide variables
    }
}
```

A component can also contain a `style.scss` file that imports the component style. In this case, `component-name.scss` just defines the style, while `style.scss` imports it, producing an output once. This is useful when a mixin might be used multiple times or extended. In that case, import via a separate file prevents the content to be rendered in the output every time a mixin is called.

{% info_block warningBox %}
The use of a `style.scss` file is required for global components only, project-level components may ignore it.
{% endinfo_block %}

### Behavior
The component-name.ts file contains the typescript implementation defined as a custom element.

The component class must element a DOM callback. You can use any callback defined by the Web Components Specification. It is recommended to use ready callback. This callback is triggered when the component is ready and all other components have already been loaded in the DOM. It is the safest approach from the point of view of DOM manipulation. When the component receives the callback you define, it should execute the behavioral logic.

In your code, you can use keyword this to access the public API of the HTML element associated with the component.

<details open>
<summary>Typical implementation:</summary>
    
```php
import Component from 'ShopUi/models/component';

export default class ComponentName extends Component {
    protected readyCallback(): void {
        // TODO: your code here
    }
} 
```
    
</br>
</details>

The above example extend the default Component model defined in the ShopUi application. However, you can extend from any component both on the global and on the project level. In this case, your new component will inherit the logic and behavior of the component it is derived from. The following example shows a component inherited from the default side-drawer component of Spryker Shop:

```php
// Import class SideDrawer
import SideDrawer from 'ShopUi/components/organisms/side-drawer/side-drawer';
 
// Export the extended class
export default class ComponentName extends SideDrawer {
    protected readyCallback(): void {
        // TODO: your code here
    }
}
```

### Index.ts
The `index.ts` file is required to load the client-side of the component with Webpack. The latter globs the system looking for these files and bundles them into an output file. Create this file whenever you need to include a style and/or a Typescript/Javascript file as part of the component.

To register the component in the DOM, you need to use the **register** function of the shop application. It accepts 2 arguments:

* **name** - specifies the component's tag name. This name will be associated with the component and can be used in Twig to insert the component into a template. Also, it will be used in the DOM as a tag name. Whenever a tag with the specified name occurs in the DOM, the Shop Application will load the component.

* **importer** - must be a call of Webpack's import function to import Typescript code for the component. The call must include a Webpack magic comment that specifies which type of import you want for the component, 'lazy' or 'eager'. For details, see [Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports).

<details open>
<summary>Typical implementation:</summary>
    
```php
import './component-name.scss';

// Import the 'register' function from the Shop Application
import register from 'ShopUi/app/registry';
 
// Export the component behavior
export default register(
    'component-name',
    () => import(/* webpackMode: "lazy" */'./component-name')
);
```
    
</br>
</details>

See [Modules to Components Mapping](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/modules_to_components_mapping.pdf)  for description of modules and their components.

***
**What's next?**
The following topics will help you in developing Spryker Atomic Frontend step-by-step:

[Tutorial - Customize Spryker Frontend](/docs/scos/dev/developer-guides/201811.0/development-guide/front-end/yves/atomic-frontend/t-customize-spr)
[Tutorial - Frontend - Create a Component](/docs/scos/dev/developer-guides/201811.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-create-compon)
[Tutorial - Frontend - Override a Component](/docs/scos/dev/developer-guides/201811.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-override-comp)
[Tutorial - Frontend - Extend a Component](/docs/scos/dev/developer-guides/201811.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-extend-compon)
[Tutorial - Frontend - Integrate JQuery into Atomic Frontend](/docs/scos/dev/developer-guides/201811.0/development-guide/front-end/yves/atomic-frontend/t-integrate-jqu)
[Tutorial - Frontend - Use a Component](/docs/scos/dev/developer-guides/201811.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-use-component)
