---
title: Feature sets
description: Setup your frontend application using feature sets that contain all standard features
last_updated: May 24, 2023
template: concept-topic-template
---

A feature set is a group of related features that can be added to an Oryx application with a single reference. Using feature sets simplifies the process of setting up an application by reducing the amount of [boilerplate code](./boilerplate.md) required to configure and initialize the application. Feature sets can be seen as _demo apps_ and are useful to quickly setup a project without developing code.

Feature sets are organized by business model (e.g. b2c, b2b, fulfillment, etc.), but we call them "Application feature sets" in this document. The feature sets demonstrate the available features that Oryx provides. A feature list might be too opinionated for your project though. You can therefor decide to use a full feature set, a partial set, or define your own feature set.

Each package provides its own features. For example, the product package exposes all product features available. This includes both components as well as the associated business logic. The application feature sets simply aggregate all the package feature sets as a set.

## Application Feature Sets

Oryx includes several predefined feature sets that cover common use cases for web applications. The application feature sets are provided in the [presets package](./presets.md). The (currently) available sets are:

- b2cFeatures: Includes features commonly used in B2C (business-to-consumer) applications.
- fulfillmentFeatures: Includes features used in a PWA, used for picking products for fulfillment.

Future feature sets will likely represent other business models, such as b2b,marketplace, etc.

## Labs

The labs package provides experimental features that are not build for production. They might evolve to the standard feature set over time, but this is not guaranteed. You can use the labs feature set in your demo's and POCs or local development, by configuring the feature set in your application.

## Configure feature sets

The following code snippet demonstrate how to configure your application with feature sets. The `withFeature` method, provided by `appBuilder` can be used with a single feature set, or with an array of sets.

```ts
import { appBuilder } from "@spryker-oryx/application";
import { b2cFeatures } from "@spryker-oryx/presets";

export const app = appBuilder().withFeature(features).create();
```

## Creating Custom Feature Sets

In addition to the predefined feature sets, developers can create their own custom feature sets tailored to their specific business requirements. To create a custom feature set, create an array of feature objects that implement the AppFeature interface and pass it to the withFeature() method of the appBuilder() object. For example:

```ts
import { appBuilder } from "@spryker-oryx/core";
import { customFeature1, customFeature2 } from "./my-features";

const customFeatures = [customFeature1, customFeature2];

const app = appBuilder().withFeature(customFeatures).create();
```

By creating custom feature sets, developers can tailor the application to their specific business requirements and avoid including unnecessary features.
