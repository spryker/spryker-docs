---
title: Frontend Overview
originalLink: https://documentation.spryker.com/v3/docs/frontend-overview
redirect_from:
  - /v3/docs/frontend-overview
  - /v3/docs/en/frontend-overview
---

To learn how to build your assets in our Demoshop, see [Demoshop Guide](/docs/scos/dev/developer-guides/201907.0/development-guide/front-end/legacy-demoshop/demoshop-guide).

## Asset Management
A set of resources used to build the UI, that includes html, css (or less, sass, stylus, etc.) and js (or jsx, etc.) files, images, fonts and so on.

Assets are files, a large collection of files; a solution to manage them it’s crucial.

We point out 4 different steps to achieve this:

1. [download and structure](/docs/scos/dev/developer-guides/201907.0/development-guide/front-end/legacy-demoshop/download-struct): get external dependencies and put assets into the corresponding folders;
2. [development](/docs/scos/dev/features/201907.0/sdk/development): create your frontend;
3. [transpile/build and optimization](/docs/scos/dev/developer-guides/201907.0/development-guide/front-end/legacy-demoshop/build-optimizat): manipulate and optimize assets;
4. [public folder](/docs/scos/dev/developer-guides/201907.0/development-guide/front-end/legacy-demoshop/public-folder): place built output into a public and accessible folder.

### Legend
We will use path aliases to help you dive into the assets docs:

* `@project`: your project root folder;
* `@core`: Spryker core folder, usually (but not necessary) `@project/vendor/spryker`.
