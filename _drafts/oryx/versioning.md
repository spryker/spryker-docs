---
title: Versioning
description: Versioning and release policy
template: concept-topic-template
---

# Versioning and release policy

In this document, we outline the methods we use to deliver an advanced application development platform while maintaining stability. Our goal is to ensure that any upcoming changes are introduced in a predictable manner. We want all Oryx users to be informed about the addition of new features and adequately prepared for the removal of outdated ones.

Stability is a critical aspect of any software framework, and it's especially important for frontend frameworks like Oryx. The stability of a framework refers to its ability to function reliably and consistently over time, despite changes in the environment or updates to its components. 

Ensuring that a framework is stable requires careful planning, testing, and versioning. In this article, we will explore how the Oryx framework achieves stability through its versioning and release processes. We'll look at how Oryx manages its releases, how it uses version numbers to indicate changes, and how it ensures backward compatibility for its users. 

## Oryx versioning

Oryx follows [semantic versioning](https://semver.org/) principles. 

This indicates that with a version number x.y.z:
- If there are critical bug fixes to be released, a patch release is made by altering the z number (e.g., 1.5.2 to 1.5.3).
- If new features or non-critical fixes are being released, a minor release is made by modifying the y number (e.g., 1.5.2 to 15.6.0).
- If there are significant changes that may break compatibility, a major release is made by changing the x number (e.g., 1.5.2 to 2.0.0).

The Oryx framework comprises three distinct components, each of which is released separately:
- Libraries
- Application
- Labs

### Libraries

The primary sources of functionality within the Oryx frameworks are the Oryx libraries, which include core features, utilities and helpers, domain-specific functionality, as well as pre-designed themes and presets that can be readily used. 
All the [packages](//TODO: add link) released together under the same version. 

### Applications


Oryx applications serve as boilerplate templates for specific domains or areas, such as b2c storefronts, fulfillment applications, and more.
Oryx applications are [packages](//TODO: add link) released together under the same version. 
This version is different and independent from library packages version.

### Labs package

The Oryx labs package consists of experimental or demo functionality, and its version is tied to the current version of the libraries and is never considered stable. Therefore, the Labs version number comprises three parts:

```
0.[Libraries-version].[patch]
```

For instance, if the current Libraries version is 1.5.2, the version of the Labs package will be 0.152.0. If there is another labs release when the Libraries version remains the same, the version of the Labs package will be updated to 0.152.1.

## Release Cycle and frequency

Oryx does not follow a fixed release cycle, and therefore, there is no set schedule for its releases.

### Deprecation practices

From time to time, we may deprecate certain features in minor releases if there are newer and improved alternatives available. Although these features will still be functional, they will be removed in the major release following their deprecation.

### Support policy

All major releases are typically supported for 12 months. But there are two different states of support

| Support Stage | Support period | Description |
|---|---|---|
| Current/Active |  6 month | Regular updates and patches |
| LTS | 12 month | Only critical and security bugfixes | 

## Public API

Oryx comprises a range of packages, applications, and tools. In order to avoid inadvertent use of private APIs and to provide a clear understanding we have documented what is included and excluded from our [public API](//TODO: add link).