---
title: About the Legacy Demoshop Front-end Guides
description: The Legacy Demoshop Front-end guides provide information of how the front-end was built in the Legacy Demoshop.
originalLink: https://documentation.spryker.com/v2/docs/about-legacy-demoshop-guides
originalArticleId: 0b787c39-36e1-407a-82dc-b420cdb9be2c
redirect_from:
  - /v2/docs/about-legacy-demoshop-guides
  - /v2/docs/en/about-legacy-demoshop-guides
---

The Legacy Demoshop Front-end guides provide information of how the front-end was built in the [Legacy Demoshop](/docs/scos/user/intro-to-spryker/{{site.version}}/about-spryker.html#what-is-the--legacy-demoshop--). Here you will find the following information:

* [Overview of the Twig Template Engine](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/twig-templates/overview-twig.html) used for building the front-end;
* [Twig Templates best practices](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/twig-templates/best-practices-twig-templates.html) providing in-depth information on how to extend Twig templates: create pages in Zed, add multiple widgets to pages, add forms etc.

The [Demoshop Guide](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/demoshop-guide.html)  will work you through the process of building your assets. The assets is a set of resources used to build the UI, that includes html, css (or less, sass, stylus, etc.) and js (or jsx, etc.) files, images, fonts and so on.

Assets represent a large collection of files, and to manage them effectively, we came up with the following 4-step procedure:

1. [Download and structure](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/download-and-structure.html): get external dependencies and put assets into the corresponding folders;
2. [Development](/docs/scos/dev/features/201903.0/sdk/development.html): create your project front-end;
3. [Transpile/build and optimization](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/build-and-optimization.html): manipulate and optimize assets;
4. [Public folder](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/public-folder.html): place built output into a public and accessible folder.

We use the following path aliases to help you dive into the assets docs:

* `@project`: your project root folder;
* `@core`: Spryker core folder, usually (but not necessary) `@project/vendor/spryker`.
 

