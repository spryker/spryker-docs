# Versioning and release policy

Stability is a critical aspect of any software framework, and it's especially important for frontend frameworks like Oryx. The stability of a framework refers to its ability to function reliably and consistently over time, despite changes in the environment or updates to its components. 

Ensuring that a framework is stable requires careful planning, testing, and versioning. In this article, we will explore how the Oryx framework achieves stability through its versioning and release processes. We'll look at how Oryx manages its releases, how it uses version numbers to indicate changes, and how it ensures backward compatibility for its users. 

## Oryx versioning

Oryx follows [semantic versioning](https://semver.org/) principles. 

### Libraries

Oryx libraries are [packages](//TODO: add link) released together under the same version. 

### Applications

Oryx applications are [packages](//TODO: add link) released together under the same version. This version is different and independent from library packages version.

### Labs package

Oryx labs package contains experimental or demo functionality. It's version depends on current libraries version and never will be stable. So the Labs version numbers have three parts:

`0.[Libraries-version].[patch]`

So for example, to version of the Labs package in case the current Libraries version is 1.3.2 and will be `0.132.0`. In case we have one more labs release when Libraries version is still the same the version of Labs will be changed to `0.132.1`.

## Release Cycle

### Release frequency

### Deprecation practices

### Support policy

### LTS fixes