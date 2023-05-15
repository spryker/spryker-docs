---
title: Versioning
description: Versioning
template: concept-topic-template
---

This document outlines the methods we use to deliver an advanced application development platform while maintaining stability. Our goal is to ensure that any upcoming changes are introduced in a predictable manner. We want all Oryx users to be informed about the release of new features and adequately prepared for the removal of outdated ones.

Stability is a critical aspect of any software framework, and it's especially important for frontend frameworks like Oryx. The stability of a framework refers to its ability to function reliably and consistently over time, despite changes in the environment or updates to its components.

Ensuring that a framework is stable requires careful planning, testing, and versioning. In this article, we will explore how the Oryx framework achieves stability through its versioning and release processes. We'll look at how Oryx manages its releases, how it uses version numbers to indicate changes, and how it ensures backward compatibility for its users.

## Semantic versioning

Oryx follows [semantic versioning](https://semver.org/) principles.

This means that, for the version `x.y.z`, the following applies:
- If there are critical bug fixes to be released, a patch release is made by changing the `z` number. For example, `1.5.2` to `1.5.3`.
- If new features or non-critical fixes are being released, a minor release is made by changing the `y` number. For example, `1.5.2` to `15.6.0`.
- If there are significant changes that may break compatibility, a major release is made by changing the `x` number. For example, `1.5.2` to `2.0.0`.

### Release previews

For those who want to know what's to come beforehand, for every major and minor release, we offer pre-release versions called Release Candidates (RC).

## Release process

The Oryx framework consists of two components that are released separately:
- Libraries
- Labs

### Libraries

The primary source of functionality within the Oryx framework are the Oryx libraries. They include core features, utilities and helpers, domain-specific functionality, as well as pre-designed themes and presets that can be used as provided by default.

All the [packages](https://www.npmjs.com/org/spryker-oryx) are released together under the same version.

### Labs package

The Oryx labs package consists of experimental or demo functionality. Its version is tied to the current version of the libraries and is never considered stable. Therefore, the Labs version number consists of three parts:

```
0.{Libraries-version}.{patch}
```

For example, if the current Libraries version is `1.5.2`, the version of the Labs package is `0.152.0`. If we release the next version of labs before releasing the Libraries, the version of the Labs package is updated to `0.152.1`.

## Upgrading

To perform a minor or patch update of the Oryx framework, you need to update every Oryx-related package you are using to the latest version of the same major version. For example, if you want to update Oryx from version 1.2 to 1.3, you should update all Oryx-related packages to version 1.3 using a command similar to the following:
```
npm i @spryker-oryx/[package-name]@1.3
```

Specific package names and versions may vary depending on your project and its dependencies. For the correct package names and versions, check the documentation or release notes of the specific Oryx version you are upgrading to.

A major upgrade may require significant code changes may not be compatible with previous versions of Oryx. To perform a major upgrade of the Oryx framework, refer to a respective migration or upgrade guide provided in the documentation. This is because .

### Public API

Oryx consists of a range of packages, applications, and tools. To avoid inadvertent use of private APIs and get a clear understanding of what's included or excluded from the private API, see public API<!--](//TODO: add link)-->.

## Backward compatibility


Oryx framework provides maximum compatibility with previous versions. If a feature is deprecated, it is removed completely only after a few releases.

Minor releases do not require any developer assistance during an update, as they are fully backward compatible.

### Deprecation practices

If we are introducing a newer and better alternative to a feature, we deprecate the old one in a minor release. Such features remain functional until the next major release, in which they are removed completely.
