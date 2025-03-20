---
title: Angular Components
description: This document provides details about the Angular Components, and how to create and use them.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/angular-components.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/angular-components.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/angular-components.html

related:
  - title: Angular Services
    link: docs/dg/dev/frontend-development/page.version/marketplace/angular-services.html
  - title: Web Components
    link: docs/dg/dev/frontend-development/page.version/marketplace/web-components.html
---

This document describes what Angular Components are, how to create and use them.

## Introduction

Components are the building blocks of a UI in an Angular application. These components are associated with a template and are subsets of directives. A single webpage can have many such components. Each component focuses on a section of a page and is independent of others. Components can have child components and parent components.

Here are some of the features of an Angular Component:

- Components are typically custom HTML elements, and each of these elements can instantiate only one component.
- A TypeScript class is used to create a component. This class is then decorated with the `@Component` decorator.
- The decorator accepts a metadata object that contains information about the component.
- For a component to be usable by another component or application, it must belong to the NgModule.
- A component's runtime behavior is controlled by its life-cycle hooks.

Sharing data between a parent component and one or more child components is a common pattern in Angular. You can implement this pattern by using the `@Input()` and `@Output()` decorators.

## Component inputs

An Angular Component has Inputs—these are the properties or attributes that can be passed to them from the outside. In the web component form, inputs are translated to HTML attributes and read as strings, so extra parsing is usually required (we ship a set of decorators for most commonly used parsing types, such as `@ToJson`, `ToBoolean`).

To define the input, you have to use `@Input` angular decorator, which marks a class field as an input property and provides configuration metadata. The input property is bound to a DOM property in the template. During change detection, Angular automatically updates the data property with the DOM property's value.

## Component outputs

Angular Component has Outputs—these are the events that the component can emit to the outside at any time. In the web component, form outputs are translated to DOM Custom Events.

To define output, you have to use `@Output` angular decorator, which marks a class field as an output property and supplies configuration metadata. Each time output is emitted, the callback method associated with the output property is invoked.

## Component lifecycle

### Hooks for the component

`constructor`  
It is invoked when Angular creates a component or directive by calling new on the class.

`ngOnChanges`  
Every time an input property of the component is changed, this method is called.

`ngOnInit`  
Invoked when the given component has been initialized.
This hook is only called once after the first `ngOnChanges`.

`ngDoCheck`  
Invoked when the change detector of the given component is invoked. It lets you implement your own change detection algorithm for the given component.

`ngOnDestroy`  
This method is invoked just before Angular destroys the component.
Use this hook to unsubscribe observables and detach event handlers to avoid memory leaks.

### Hooks for the component's children

`ngAfterContentInit`  
Invoked after Angular performs any content projection into the component's view (see the previous lecture on Content Projection for more info). To get more info about content query, see the official documentation [ContentChildren](https://angular.io/api/core/ContentChildren), [ContentChild](https://angular.io/api/core/ContentChild).

`ngAfterContentChecked`  
Invoked each time the content of the given component has been checked by Angular's change detection mechanism.

`ngAfterViewInit`  
Invoked when the component's view has been fully initialized. To get more info about the content query see official documentation [ViewChildren](https://angular.io/api/core/ViewChildren), [ViewChild](https://angular.io/api/core/ViewChild).

`ngAfterViewChecked`  
Invoked each time the view of the given component has been checked by Angular's change detection mechanism.

## Component metadata

The `@Component` decorator identifies the class immediately below it as a component class, and specifies its metadata. Component metadata tells Angular where to find the major building blocks it needs to create and present the component and its view. In particular, it associates a template with the component, either directly with inline code, or by reference. Together, the component and its template describe a view.

In addition to containing or pointing to the template, the `@Component` metadata configures, for example, how the component can be referenced in the HTML and what services it requires.

#### Main properties

`selector`  
It is the CSS selector that identifies the component in a template. It corresponds to the HTML tag that is included in the parent component. You can create your own HTML tag. However, the same has to be included in the parent component.

`template`  
It is an inline-defined template for the view. The template defines some markup. The markup could typically include some headings or paragraphs that are displayed in the UI.

`templateUrl`  
It is the URL for the external file containing the template for the view.

`styles`  
These are inline-defined styles to be applied to the component's view.

`styleUrls`  
List of URLs to the stylesheets to be applied to the component's view.

`providers`  
It is an array where certain services for the component can be registered.

`animations`  
Animations for the components can be listed.

You can find a full list of component metadata properties in the [official documentation](https://angular.io/api/core/Component).

## Component creation

To create a new component, a CLI tool NX can be used to scaffold boilerplate code:

```bash
nx generate component [my-component-name] --path=path/to/the/module
```

## Typical component example

Below, you can find an example of the typical component:

```ts
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

@Component({
    selector: 'spy-example',
    templateUrl: './path-to-example.component.html',
    styleUrls: ['./path-to-example.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent implements OnInit {
    @Input() exampleInput = '';
    @Input() @ToBoolean() exampleBooleanInput = false;

    @Output() exampleOutput = new EventEmitter<void>();

    ngOnInit() {
        // Logic that has to be done when component will be created
    }

    componentSpecificMethod() {}
}
```

For more details about the components, use [official Angular documentation](https://angular.io/guide/architecture-components).
