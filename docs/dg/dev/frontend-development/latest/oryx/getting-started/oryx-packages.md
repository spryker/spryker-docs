---
title: "Oryx: Packages"
description: Use Oryx packages from npm to ensure you can easily upgrade to newer versions.
last_updated: Aug 6, 2026
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/oryx/oryx-packages.html
  - /docs/scos/dev/front-end-development/202404.0/oryx/getting-started/oryx-packages.html

---



The Oryx code base is publicly [available on Github](https://github.com/spryker/oryx/) and the code is published on [npmjs.com](https://www.npmjs.com/). Npm is a widely used registry for npm packages, which is used by package managers, like npm, yarn, deno, or bun, to install dependencies in an application.

The dependencies are typically configured in the [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) file of an application.

Oryx packages are distributed under the [spryker-oryx](https://www.npmjs.com/org/spryker-oryx) organization. Each time a new version is published, the version number is bumped. For more information on the versioning strategy, see [Versioning](/docs/dg/dev/frontend-development/latest/oryx/getting-started/oryx-versioning.html).

We recommend [installing](/docs/dg/dev/frontend-development/latest/oryx/getting-started/set-up-oryx.html) the packages rather than cloning the source code from the Oryx repository. By depending on packages, you can easily upgrade them to later versions.

The Oryx framework relies on its own packages and third-party dependencies to provide a robust development experience. This document describes how Oryx manages these packages to ensure stability, security, and flexibility.

## Oryx Packages

While packages are distributed as a flat list, there is an architectural hierarchy. The hierarchy protects from cyclic dependencies. Packages inside a layer can depend on sibling packages inside the layer without any issues. Packages never depend on a layer above.

While the package layering might be irrelevant during your development, it might help you to better understand the package dependencies. The following diagram shows four package layers. The top layer is the [boilerplate application](/docs/dg/dev/frontend-development/latest/oryx/getting-started/oryx-boilerplate.html), which is set up using a [preset](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-presets.html).

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-06-01T08:37:41.648Z\&quot; agent=\&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36\&quot; etag=\&quot;OLOlMTo7IhtjW8uWJgKW\&quot; version=\&quot;21.3.6\&quot; type=\&quot;device\&quot;&gt;\n  &lt;diagram name=\&quot;Page-1\&quot; id=\&quot;5CuXT_aMRRrbBBxqcC0p\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;830\&quot; dy=\&quot;514\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;827\&quot; pageHeight=\&quot;1169\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-3\&quot; value=\&quot;Application\&quot; style=\&quot;rounded=1;absoluteArcSize=1;arcSize=14;whiteSpace=wrap;strokeWidth=2;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;100\&quot; y=\&quot;20\&quot; width=\&quot;96\&quot; height=\&quot;34\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-4\&quot; value=\&quot;Template packages\&quot; style=\&quot;rounded=1;absoluteArcSize=1;arcSize=14;whiteSpace=wrap;strokeWidth=2;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;128\&quot; y=\&quot;188\&quot; width=\&quot;151\&quot; height=\&quot;34\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-5\&quot; value=\&quot;Domain packages\&quot; style=\&quot;rounded=1;absoluteArcSize=1;arcSize=14;whiteSpace=wrap;strokeWidth=2;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;79\&quot; y=\&quot;272\&quot; width=\&quot;138\&quot; height=\&quot;34\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-6\&quot; value=\&quot;Platform packages\&quot; style=\&quot;rounded=1;absoluteArcSize=1;arcSize=14;whiteSpace=wrap;strokeWidth=2;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;20\&quot; y=\&quot;355\&quot; width=\&quot;147\&quot; height=\&quot;34\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-7\&quot; value=\&quot;Base packages\&quot; style=\&quot;rounded=1;absoluteArcSize=1;arcSize=14;whiteSpace=wrap;strokeWidth=2;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;89\&quot; y=\&quot;439\&quot; width=\&quot;117\&quot; height=\&quot;34\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-8\&quot; value=\&quot;use presets&amp;#xa;(e.g. b2c)\&quot; style=\&quot;curved=1;dashed=1;dashPattern=2 3;startArrow=none;endArrow=block;exitX=0.7297710487228667;exitY=0.9852941176470589;entryX=0.4978140521523179;entryY=0;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;0S-H_rIAtWfVoGd9S_6Z-3\&quot; target=\&quot;0S-H_rIAtWfVoGd9S_6Z-4\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;203\&quot; y=\&quot;79\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-9\&quot; value=\&quot;\&quot; style=\&quot;curved=1;startArrow=none;endArrow=block;exitX=0.26758409450629994;exitY=0.9852941176470589;entryX=0.3383193700913391;entryY=-0.014705882352941176;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;0S-H_rIAtWfVoGd9S_6Z-3\&quot; target=\&quot;0S-H_rIAtWfVoGd9S_6Z-5\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;93\&quot; y=\&quot;79\&quot; /&gt;\n              &lt;mxPoint x=\&quot;93\&quot; y=\&quot;247\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-10\&quot; value=\&quot;\&quot; style=\&quot;curved=1;startArrow=none;endArrow=block;exitX=0.4978140521523179;exitY=0.9852941176470589;entryX=0.6598407295463421;entryY=-0.014705882352941176;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;0S-H_rIAtWfVoGd9S_6Z-4\&quot; target=\&quot;0S-H_rIAtWfVoGd9S_6Z-5\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;203\&quot; y=\&quot;247\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-11\&quot; value=\&quot;\&quot; style=\&quot;curved=1;startArrow=none;endArrow=block;exitX=0.3412436336565999;exitY=0.9705882352941176;entryX=0.5005580357142857;entryY=0;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;0S-H_rIAtWfVoGd9S_6Z-5\&quot; target=\&quot;0S-H_rIAtWfVoGd9S_6Z-6\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;94\&quot; y=\&quot;330\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-12\&quot; value=\&quot;\&quot; style=\&quot;curved=1;startArrow=none;endArrow=block;exitX=0.5005580357142857;exitY=0.9852941176470589;entryX=0.31702240550949384;entryY=-0.014705882352941176;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;0S-H_rIAtWfVoGd9S_6Z-6\&quot; target=\&quot;0S-H_rIAtWfVoGd9S_6Z-7\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;94\&quot; y=\&quot;414\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0S-H_rIAtWfVoGd9S_6Z-13\&quot; value=\&quot;\&quot; style=\&quot;curved=1;startArrow=none;endArrow=block;exitX=0.6569164659810813;exitY=0.9705882352941176;entryX=0.6893544641486258;entryY=-0.014705882352941176;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;0S-H_rIAtWfVoGd9S_6Z-5\&quot; target=\&quot;0S-H_rIAtWfVoGd9S_6Z-7\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;202\&quot; y=\&quot;330\&quot; /&gt;\n              &lt;mxPoint x=\&quot;202\&quot; y=\&quot;414\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

### Template packages

The template layer contains packages that can be used as quick starters for demos and projects. Templated packages follow semantic versioning and ensure upgradability. Some packages in the template layer, like presets, are opinionated and might not be used inside your final setup. Their main purpose is to quickly get up and running a standard frontend application.

| PACKAGES                                                               | LOCATION                    |
| ---------------------------------------------------------------------- | --------------------------- |
|                                                                        |                             |
| [Application](https://www.npmjs.com/package/@spryker-oryx/application) | `@spryker-oryx/application` |
| [Presets](https://www.npmjs.com/package/@spryker-oryx/presets)         | `@spryker-oryx/presets`     |
| [Labs](https://www.npmjs.com/package/@spryker-oryx/labs)              | `@spryker-oryx/labs`        |
| [Themes](https://www.npmjs.com/package/@spryker-oryx/themes)          | `@spryker-oryx/themes`      |
| [Resources](https://www.npmjs.com/package/@spryker-oryx/resources)     | `@spryker-oryx/resources`   |

{% info_block infoBox %}

The Labs package is an exception. It consists of experimental or demo functionality and is not recommended to be used in production.

{% endinfo_block %}

### Domain packages

Domain packages provide components and service logic for certain domains. Organizing packages in domains improves the developer experience by making it easy to understand where to find a certain component or service. For example, the `product` domain package contains all product-related components, as well as product services and adapters that integrate with Spryker APIs.

| PACKAGES                                                         | LOCATION                 |
| ---------------------------------------------------------------- | ------------------------ |
| [Cart](https://www.npmjs.com/package/@spryker-oryx/cart)         | `@spryker-oryx/cart`     |
| [Checkout](https://www.npmjs.com/package/@spryker-oryx/checkout) | `@spryker-oryx/checkout` |
| [Content](https://www.npmjs.com/package/@spryker-oryx/content)   | `@spryker-oryx/content`  |
| [Order](https://www.npmjs.com/package/@spryker-oryx/order)       | `@spryker-oryx/order`    |
| [Picking](https://www.npmjs.com/package/@spryker-oryx/picking)   | `@spryker-oryx/picking`  |
| [Product](https://www.npmjs.com/package/@spryker-oryx/product)   | `@spryker-oryx/product`  |
| [Search](https://www.npmjs.com/package/@spryker-oryx/search)     | `@spryker-oryx/search`   |
| [Site](https://www.npmjs.com/package/@spryker-oryx/site)         | `@spryker-oryx/site`     |
| [User](https://www.npmjs.com/package/@spryker-oryx/user)         | `@spryker-oryx/user`     |

### Platform packages

The platform layer contains the core packages of the Oryx framework. They provide the infrastructure to the whole system.

| PACKAGES                                                                           | LOCATION                          |
| ---------------------------------------------------------------------------------- | --------------------------------- |
| [Auth](https://www.npmjs.com/package/@spryker-oryx/auth)                           | `@spryker-oryx/auth`              |
| [Core](https://www.npmjs.com/package/@spryker-oryx/core)                           | `@spryker-oryx/core`              |
| [Experience](https://www.npmjs.com/package/@spryker-oryx/experience)               | `@spryker-oryx/experience`        |
| [Form](https://www.npmjs.com/package/@spryker-oryx/form)                           | `@spryker-oryx/form`              |
| [I18n](https://www.npmjs.com/package/@spryker-oryx/I18n)                           | `@spryker-oryx/i18n`              |
| [Indexed-db](https://www.npmjs.com/package/@spryker-oryx/indexed-db)               | `@spryker-oryx/indexed-db`        |
| [Offline](https://www.npmjs.com/package/@spryker-oryx/offline)                     | `@spryker-oryx/offline`           |
| [Push-notification](https://www.npmjs.com/package/@spryker-oryx/push-notification) | `@spryker-oryx/push-notification` |
| [Router](https://www.npmjs.com/package/@spryker-oryx/router)                       | `@spryker-oryx/router`            |

### Base packages

The base layer contains packages that serve as utilities to all layers above. An important part of the base layer is the design system package (UI).

| PACKAGES                                                           | LOCATION                  |
| ------------------------------------------------------------------ | ------------------------- |
| [UI](https://www.npmjs.com/package/@spryker-oryx/ui)               | `@spryker-oryx/ui`        |
| [Utilities](https://www.npmjs.com/package/@spryker-oryx/utilities) | `@spryker-oryx/utilities` |
| [DI](https://www.npmjs.com/package/@spryker-oryx/di)               | `@spryker-oryx/di`        |

## Managing third-party dependencies

Oryx follows a careful approach when incorporating third-party components. Third-party components are included only when they bring significant value to projects. This approach involves minimizing unnecessary dependencies and thoroughly assessing their worth to prevent issues like outdated packages, vulnerabilities, and compatibility problems that may disrupt code stability.

We conduct regular inspections of third-party components to check for updates and compatibility, identify and fix vulnerabilities. Attention is also given to optimizing bundle size and performance to maintain applications fast and responsive.

To continue innovating and keep the ecosystem healthy, we follow the guidelines:

- Avoid unnecessary third party dependencies: minimize the use of third-party dependencies to mitigate risks and maintain control over the ecosystem.

- Evaluate dependencies carefully: before adding a new third-party dependency, we carefully evaluate its risks and benefits, considering factors such as maintenance, community support, security track record, and adherence to semantic versioning.

- Use semantic versioning and caret (^) notation in `package.json`: this ensures compatibility and allows for seamless updates without introducing breaking changes. Ideally, versions only include the major version number, so that the minor and patch are controlled by application owners and can be updated over time. Example: `"lit": "^2.0.0"`.

- Avoid shipping lock files in the boilerplate: Lock files, like `package-lock.json`, are not included in the Oryx boilerplate to let application developers benefit from the latest versions of dependencies when creating their projects.

- Use peer dependencies: enables application owners to choose specific versions of dependencies while maintaining compatibility with the framework.

- Document version resolutions: when known security concerns or significant improvements can only be solved with a breaking change to the dependencies, we add *version resolutions* to the Oryx documentation. Application owners can change their `package.json` accordingly to override specific dependencies.

By following these guidelines, Oryx aims to maintain a stable and secure ecosystem while providing flexibility for application developers to choose the versions of dependencies that suit their needs.
