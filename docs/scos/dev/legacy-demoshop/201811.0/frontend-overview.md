---
title: Frontend Overview
description: This article provides an overview of frontend and assets.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/frontend-overview
originalArticleId: fa3424cc-94c7-4fd7-8a18-9351bb6e072d
redirect_from:
  - /2021080/docs/frontend-overview
  - /2021080/docs/en/frontend-overview
  - /docs/frontend-overview
  - /docs/en/frontend-overview
  - /v6/docs/frontend-overview
  - /v6/docs/en/frontend-overview
  - /v5/docs/frontend-overview
  - /v5/docs/en/frontend-overview
  - /v4/docs/frontend-overview
  - /v4/docs/en/frontend-overview
  - /v3/docs/frontend-overview
  - /v3/docs/en/frontend-overview
  - /v2/docs/frontend-overview
  - /v2/docs/en/frontend-overview
  - /v1/docs/frontend-overview
  - /v1/docs/en/frontend-overview
---

To learn how to build your assets in our Demoshop, see [Demoshop Guide](/docs/scos/dev/legacy-demoshop/{{page.version}}/demoshop-guide.html).

## Asset Management
A set of resources used to build the UI, that includes html, css (or less, sass, stylus, etc.) and js (or jsx, etc.) files, images, fonts and so on.

Assets are files, a large collection of files; a solution to manage them it’s crucial.

We point out 4 different steps to achieve this:

1. [download and structure](/docs/scos/dev/legacy-demoshop/{{page.version}}/download-and-structure.html): get external dependencies and put assets into the corresponding folders;
2. [development tools](/docs/scos/dev/sdk/development-tools/development-tools.html): create your frontend;
3. [transpile/build and optimization](/docs/scos/dev/legacy-demoshop/{{page.version}}/build-and-optimization.html): manipulate and optimize assets;
4. [public folder](/docs/scos/dev/legacy-demoshop/{{page.version}}/public-folder.html): place built output into a public and accessible folder.

### Legend
We will use path aliases to help you dive into the assets docs:

* `@project`: your project root folder;
* `@core`: Spryker core folder, usually (but not necessary) `@project/vendor/spryker`.
