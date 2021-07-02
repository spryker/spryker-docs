---
title: Angular Services
description: This articles provides details about what are Angular Services, how to use them and how to create them.
template: concept-topic-template
---

This articles provides details about what are Angular Services, how to use them and how to create them.

## Introduction

Angular services are stateless objects and provides some very useful functions. They contain methods that maintain data throughout the life of an application, i.e. data does not get refreshed and is available all the time. The main objective of a service is to organize and share business logic, models, or data and functions with different components of an Angular application.

## Why Services Are Needed

The separation of concerns is the main reason why Angular services came into existence. An Angular service is a stateless object and provides some very useful functions. These functions can be invoked from any component of Angular, like Components, Directives, etc. This helps in dividing the web application into small, different logical units which can be reused. Services usually encapsulate specific aspect/functionality of the system (HTTP, part of business logic, etc.)

#### Component Communication Using Angular Services

Services may be used to manage state for a set of related component (like Redux pattern).
Reusable Angular services can also be used to establish communication between two components. The components can be in a parent-child relationship or can be siblings. Irrespective of the relationship type, the services can be used to share data between two components. All you need is public properties in the service class which one component will set and the other component will consume and vice-versa. The service that is being used as a bridge between the two components has to be injected into both the components.

## How to Create Service

To define a class as a service in Angular, the `@Injectable() `decorator is used. It provides the metadata that allows Angular to inject it into a component as a dependency. Similarly, the `@Injectable()` decorator is used to indicate that a component or other class (such as another service, a pipe, or an NgModule) has a dependency. [More info about @Injectable()](https://angular.io/api/core/Injectable)

```ts
import { Injectable } from '@angular/core';

@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class SomeService {

  reusableMethod(): void {
    ...some logic
  }
}
```

## How to Use Service

To use the service user just needs to import it and inject it via DI in constructor of either a Component or another Service.

```ts
import { Component } from '@angular/core';

@Component({
  ....,
})
export class ServiceConsumer {
  constructor(private someService: SomeService) {}

  invokeServiceMethod(): void {
    this.someService.reusableMethod();
  }
}
```

For more info about services use official Angular documentation https://angular.io/guide/architecture-services
