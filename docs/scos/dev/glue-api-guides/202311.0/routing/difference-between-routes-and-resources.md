---
title: Difference between routes and resources
description: This document describes what is a difference between routes and resources.
last_updated: December 12, 2023
template: howto-guide-template

---

When you want to expose something as an API endpoint in Glue Storefront API or in Glue Backend API applications you need to define it as a resource or a custom route.
This document will describe when you need to use resources and when you should a custom route instead.

## Resource

What is a resource? A resource is an object with a type, associated data, relationships to other resources, and a set of methods that operate on it.
In the Glue API infrastructure it means that you need define your resource as a resource plugin that implements one of existing convention resource interfaces.
Resources can have [relationships](/docs/scos/dev/glue-api-guides/{{page.version}}/create-glue-api-resources-with-parent-child-relationships.html) (available for resources that follows JSON:API convention).
The main purpose of resource is to provide an easy and well defined way to expose CRUD actions for your resource. Resource configuration OOTB allows you to define actions for GET, POST, PATCH and DELETE actions.
If you need some custom resource that cannot be covered with CRUD actions - you should use custom routes approach.

## Custom route

Custom route allows to expose endpoint with any custom route you wish to define. This is suitable for cases when you need to expose some custom actions. E.g. if you want your resource to have a very specific name, like `/unsubscribe`. You still can expose it as a resource, but custom routes allow you to do it properly from semantic point of view.
There is an article that describes how to [configure your own custom resource](/docs/scos/dev/glue-api-guides/{{page.version}}/routing/create-routes.html)
