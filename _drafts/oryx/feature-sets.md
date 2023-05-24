---
title: Feature sets
description: Setup your frontend application using feature sets that contain all standard features
last_updated: May 24, 2023
template: concept-topic-template
---

A feature set is a group of related features that can be added to an Oryx application with a single reference. Feature sets simplify the process of setting up an application by reducing the amount of [boilerplate code](./boilerplate.md) required to configure and initialize the application. Feature sets can be seen as _demo apps_ and are useful to quickly setup a project without developing.

Feature sets are organized by business model, such as B2C, B2B, marketplace or fulfillment, but we call them "Application feature sets" in this document. The feature sets represent the available features provided by Oryx. Feature sets may be too opinionated in some cases. You can decide to use a full feature set, adjust a set to your needs, or [create your own sets](#create-feature-sets).

Each set provides its own features. For example, the product package exposes all product features available. This includes components and the associated business logic. The application feature sets simply aggregate all the package feature sets as a set.

## Available feature sets

Oryx includes predefined feature sets that cover common use cases for web applications. The application feature sets are provided in the [presets package](./presets.md). The following feature sets are available:

- b2cFeatures: Includes features commonly used in B2C applications.
- fulfillmentFeatures: Includes features used in a PWA, used for picking products for fulfillment.

In future, we will most likely introduce B2B and marketplace feature sets.

## Labs

The labs package provides experimental features that are not build for production environments. They may evolve into standard feature set over time, but this is not guaranteed. You can use a labs feature set in your demos and POCs or local development.

## Create feature sets

In addition to the predefined feature sets, you can create custom feature sets tailored to your business requirements. To create a custom feature set, create an array of feature objects that implement the `AppFeature` interface and pass it to the `withFeature()` method of the `appBuilder()` object. For example:

```ts
import { appBuilder } from "@spryker-oryx/core";
import { customFeature1, customFeature2 } from "./my-features";

const customFeatures = [customFeature1, customFeature2];

const app = appBuilder().withFeature(customFeatures).create();
```
