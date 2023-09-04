---
title: "Oryx: Versioning"
description: Oryx framework uses semantic versioning to ensure stability
template: concept-topic-template
last_updated: Mar 3, 2023
---

This document describes the methods used in Oryx to deliver an advanced application development platform while maintaining stability. The goal of implementing versioning methods is to ensure that any upcoming changes are introduced in a predictable manner. This makes sure that all Oryx users are informed and adequately prepared for the release of new features and removal of outdated ones.

Stability is a critical aspect of any software framework, and it's especially important for frontend frameworks like Oryx. The stability of a framework refers to its ability to function reliably and consistently over time, despite changes in the environment or updates to its components.

The following sections describe how the Oryx framework achieves stability through its versioning and release processes, uses version numbers to indicate changes, and ensures backward compatibility.

## Semantic versioning

Oryx follows the principles of [semantic versioning](https://semver.org/).

This means that, for version `x.y.z`, the following applies:
- If critical bug fixes are released, a patch release is made by changing the `z` number. For example, `1.5.2` to `1.5.3`.
- If new features or non-critical fixes are released, a minor release is made by changing the `y` number. For example, `1.5.2` to `15.6.0`.
- If significant changes that may break compatibility are released, a major release is made by changing the `x` number. For example, `1.5.2` to `2.0.0`.

### Release previews

For those who want to know what's to come beforehand, for every major and minor release, we offer prerelease versions called Release Candidates (RC).

## Release process

The Oryx framework consists of two components that are released separately:
- Libraries
- Labs

### Libraries

The primary source of functionality within the Oryx framework is the Oryx libraries. They include core features, utilities and helpers, domain-specific functionality, as well as predesigned themes and presets that can be used as provided by default.

The libraries are released as [packages](https://www.npmjs.com/org/spryker-oryx) under the same version.

### Labs

The Oryx labs consist of experimental or demo functionality. Its version is tied to the current version of the libraries and is never considered stable. Therefore, the labs version number consists of three parts:

```
0.{Libraries-version}.{patch}
```

For example, if the current libraries version is `1.5.2`, the version of the labs is `0.152.0`. If we release the next version of labs before releasing the libraries, the version of the labs is updated to `0.152.1`.

## Upgrading Oryx

To perform a minor or patch update of the Oryx framework, you need to update every Oryx-related package you are using to the latest version of the same major version. For example, if you want to update Oryx from version `1.2` to `1.3`, you should update all Oryx-related packages to version `1.3` using a command similar to the following:
```
npm i @spryker-oryx/{package-name}@1.3
```

Specific package names and versions may vary depending on your project and its dependencies. For the correct package names and versions, check the documentation or release notes of the specific Oryx version you are upgrading to.

A major upgrade may require significant code changes that may be incompatible with previous versions of Oryx. To perform a major upgrade of the Oryx framework, refer to a respective migration or upgrade guide provided in the documentation.

<!--

## Public API

Oryx consists of a range of packages, applications, and tools. To avoid inadvertent use of private APIs and get a clear understanding of what's included or excluded from the private API, see public API](//TODO: add link)-->.

## Backward compatibility

The Oryx framework provides maximum compatibility with previous versions. If a feature is deprecated, it is removed completely only after a few releases.

Minor releases are fully backward compatible and do not require any developer assistance.

### Deprecation practices

If a newer and better alternative to a feature is introduced in a minor release, the old one is deprecated. Deprecated features remain functional until the next major release, in which they are removed completely.

## Feature Flag Versioning

### Overview

Oryx introduces Feature Flag Versioning to add new functionalities without affecting backward compatibility. This allows you to use new features before they are released in the next major version. This requires an explicit opt-in, using the `ORYX_FEATURE_VERSION` environment variable.

### Code Optimization

Setting `ORYX_FEATURE_VERSION` optimizes your build by leveraging Dead Code Elimination (DCE). Any code unrelated to the specified version will not be included in the final bundle, making your application leaner.

### Usage

Set the `ORYX_FEATURE_VERSION` environment variable to enable specific versions.

```
ORYX_FEATURE_VERSION=1.1
```

By doing so, you can control feature rollouts while optimizing your application's performance.

You can also use `featureVersion` utility in your code or third-party libraries to conditionally enable features.

```typescript
import { featureVersion } from '@spryker-oryx/utilities';
if (featureVersion >= '1.1') { /* New feature code */ }
```
