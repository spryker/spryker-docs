---
title: Angular Services
description: This document provides details about the Angular Services, and how to create and use them.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/angular-services.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/angular-services.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/angular-services.html

related:
  - title: Angular Components
    link: docs/dg/dev/frontend-development/page.version/marketplace/angular-components.html
  - title: Web Components
    link: docs/dg/dev/frontend-development/page.version/marketplace/web-components.html
---

This document describes what Angular Services are, how to create and use them.

## Introduction

The Angular Services are stateless objects which provide useful functionality. These functions can be invoked from any component of Angular, such as Components and Directives. It enables services to organize and share business logic, models, data and functions with other components of an Angular application and thus divide the web application into small, reusable logical units. A service typically encapsulates a particular aspect/function of the system (HTTP, part of business logic).
Using Angular Services methods, the data is maintained throughout the life of an application, that is, it's never refreshed and is always available.

#### Component communication using Angular services

You can use services to manage the state of a set of related components (such as the Redux pattern). Reusable Angular services can also be used to establish communication between two components. Components can be siblings or in a parent-child relationship. No matter what type of relationship exists, the services can be used to share data between components. All you need is public properties in the service class that one component sets and the other consumes, and vice versa. A service that acts as a bridge between two components has to be injected into both components.

## How to Create a service

To define a class as a service in Angular, the `@Injectable()` decorator is used. By providing metadata, Angular can inject it into a component as a dependency. Similarly, the `@Injectable()` decorator indicates that a component or other class (such as another service, a pipe, or a `NgModule`) has a dependency. To learn more information about `@Injectable()`, see [official Angular documentation](https://angular.io/api/core/Injectable).

```ts
import { Injectable } from '@angular/core';

@Injectable({
    // Declares that this service should be created
    // by the root application injector.
    providedIn: 'root',
})
export class SomeService {
    reusableMethod(): void {
        // ...some logic
    }
}
```

## How to use service

To use the service, you simply need to import it and inject it via DI in the constructor of either a Component or another Service.

```ts
import { Component } from '@angular/core';

@Component({
    ...,
})
export class ServiceConsumer {
    constructor(private someService: SomeService) {}

    invokeServiceMethod(): void {
        this.someService.reusableMethod();
    }
}
```

For more info about services, use [official Angular documentation](https://angular.io/guide/architecture-services).
