---
title: Angular Components
description: This articles provides details about the Angular Components, and how to create and use them.
template: concept-topic-template
---

This article describes what Angular Components are, how to create and use them.

## Introduction

Components are the building blocks of a UI in an Angular application. These components are associated with a template and are a subset of directives. You can have many such components on a single web page. Each component is independent of each other and manages a section of the page. The components can have child components and parent components.

Here are some of the features of Angular Component:

- Components are typically custom HTML elements, and each of these elements can instantiate only one component.
- A TypeScript class is used to create a component. This class is then decorated with the “@Component” decorator.
- The decorator accepts a metadata object that gives information about the component.
- A component must belong to the NgModule in order for it to be usable by another component or application.
- Components control their runtime behavior by implementing Life-Cycle hooks.

A common pattern in Angular is sharing data between a parent component and one or more child components. You can implement this pattern by using the `@Input()` and `@Output()` decorators.

## Component Inputs

Angular Component has Inputs - these are the properties/attributes that can be passed to it from the outside. In the web component form the inputs are translated to HTML attributes and read as strings so extra parsing usually is required (we ship a set of decorators for most common types parsing e.g. `@ToJson`, `ToBoolean`...).

To define input you have to use `@Input` angular decorator that marks a class field as an input property and supplies configuration metadata. The input property is bound to a DOM property in the template. During change detection, Angular automatically updates the data property with the DOM property's value.

## Component Outputs

Angular Component has Outputs - these are the events that the component may emit at any point in time to the outside. In the web component form outputs are translated to DOM Events.

To define input you have to use `@Output` angular decorator that marks a class field as an output property and supplies configuration metadata. The DOM property bound to the output property is automatically updated during change detection.

## Component Lifecycle

### Hooks for the Component

`constructor`
This is invoked when Angular creates a component or directive by calling new on the class.

`ngOnChanges`
Invoked every time there is a change in one of th input properties of the component.

`ngOnInit`
Invoked when given component has been initialized.
This hook is only called once after the first ngOnChanges

`ngDoCheck`
Invoked when the change detector of the given component is invoked. It allows us to implement our own change detection algorithm for the given component.

`ngOnDestroy`
This method will be invoked just before Angular destroys the component.
Use this hook to unsubscribe observables and detach event handlers to avoid memory leaks.

### Hooks for the Component’s Children

`ngAfterContentInit`
Invoked after Angular performs any content projection into the component’s view (see the previous lecture on Content Projection for more info).

`ngAfterContentChecked`
Invoked each time the content of the given component has been checked by the change detection mechanism of Angular.

`ngAfterViewInit`
Invoked when the component’s view has been fully initialized.

`ngAfterViewChecked`
Invoked each time the view of the given component has been checked by the change detection mechanism of Angular.

## Component Metadata

The `@Component` decorator identifies the class immediately below it as a component class, and specifies its metadata. The metadata for a component tells Angular where to get the major building blocks that it needs to create and present the component and its view. In particular, it associates a template with the component, either directly with inline code, or by reference. Together, the component and its template describe a view.

In addition to containing or pointing to the template, the @Component metadata configures, for example, how the component can be referenced in HTML and what services it requires.

#### Main properties

`Selector`
It is the CSS selector that identifies this component in a template. This corresponds to the HTML tag that is included in the parent component. You can create your own HTML tag. However, the same has to be included in the parent component.

`Template`
It is an inline-defined template for the view. The template can be used to define some markup. The markup could typically include some headings or paragraphs that are displayed on the UI.

`TemplateUrl`
It is the URL for the external file containing the template for the view.

`Styles`
These are inline-defined styles to be applied to the component’s view

`styleUrls`
List of URLs to stylesheets to be applied to the component’s view.

`Providers`
It is an array where certain services can be registered for the component

`Animations`
Animations can be listed for the components

To get full information about component metadata properties list you can check [official documentation](https://angular.io/api/core/Component)

## Component Creation

To create a new component a CLI tool NX may be used to scaffold boilerplate code: nx generate component [my-component-name] --path=path/to/the/module

## Typical Component Example

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
    /// Logic that has to be done when component will be created
  }

  componentSpecificMethod() {}
}
```

For more info about components, use [official Angular documentation](https://angular.io/guide/architecture-components).
