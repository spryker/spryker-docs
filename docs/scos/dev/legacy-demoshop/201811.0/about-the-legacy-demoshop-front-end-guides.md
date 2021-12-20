---
title: About the Legacy Demoshop Front-end Guides
description: The Legacy Demoshop Front-end guides provide information of how the front-end was built in the Legacy Demoshop.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/about-legacy-demoshop-guides
originalArticleId: eaea41d9-f876-48ea-ba2b-8ab71b06c027
redirect_from:
  - /2021080/docs/about-legacy-demoshop-guides
  - /2021080/docs/en/about-legacy-demoshop-guides
  - /docs/about-legacy-demoshop-guides
  - /docs/en/about-legacy-demoshop-guides
  - /v6/docs/about-legacy-demoshop-guides
  - /v6/docs/en/about-legacy-demoshop-guides
  - /v5/docs/about-legacy-demoshop-guides
  - /v5/docs/en/about-legacy-demoshop-guides
  - /v4/docs/about-legacy-demoshop-guides
  - /v4/docs/en/about-legacy-demoshop-guides
  - /v3/docs/about-legacy-demoshop-guides
  - /v3/docs/en/about-legacy-demoshop-guides
  - /v2/docs/about-legacy-demoshop-guides
  - /v2/docs/en/about-legacy-demoshop-guides
  - /v1/docs/about-legacy-demoshop-guides
  - /v1/docs/en/about-legacy-demoshop-guides
---

The Legacy Demoshop Front-end guides provide information of how the front-end was built in the Legacy Demoshop. Here you will find the following information:

* [Overview of the Twig Template Engine](/docs/scos/dev/legacy-demoshop/201811.0/twig-templates/overview-twig.html) used for building the front-end;
* [Twig Templates best practices](/docs/scos/dev/legacy-demoshop/{{page.version}}/twig-templates/best-practices-twig-templates.html) providing in-depth information on how to extend Twig templates: create pages in Zed, add multiple widgets to pages, add forms etc.

The [Demoshop Guide](/docs/scos/dev/legacy-demoshop/{{page.version}}/demoshop-guide.html)  will work you through the process of building your assets. The assets is a set of resources used to build the UI, that includes html, css (or less, sass, stylus, etc.) and js (or jsx, etc.) files, images, fonts and so on.

Assets represent a large collection of files, and to manage them effectively, we came up with the following 4-step procedure:

1. [Download and structure](/docs/scos/dev/legacy-demoshop/{{page.version}}/download-and-structure.html): get external dependencies and put assets into the corresponding folders;
2. [Development tools](/docs/scos/dev/sdk/development-tools/development-tools.html): create your project front-end;
3. [Transpile/build and optimization](/docs/scos/dev/legacy-demoshop/{{page.version}}/build-and-optimization.html): manipulate and optimize assets;
4. [Public folder](/docs/scos/dev/legacy-demoshop/{{page.version}}/public-folder.html): place built output into a public and accessible folder.

We use the following path aliases to help you dive into the assets docs:

* `@project`: your project root folder;
* `@core`: Spryker core folder, usually (but not necessary) `@project/vendor/spryker`.
 
