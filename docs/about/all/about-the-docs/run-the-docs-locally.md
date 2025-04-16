---
title: Run the docs locally
description: Learn how to Build and run Spryker Documentation directly on your local machine with this guide.
last_updated: Jul 18, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/building-the-documentation-site.html
  - /docs/scos/user/intro-to-spryker/contribute-to-the-documentation/build-the-documentation-site.html

related:
  - title: Add product sections to the documentation
    link: docs/about/all/about-the-docs/contribute-to-the-docs/add-global-sections-to-the-docs.html
  - title: Edit documentation via pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-using-a-web-browser.html
  - title: Report documentation issues
    link: docs/about/all/about-the-docs/contribute-to-the-docs/report-docs-issues.html
  - title: Review pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/review-docs-pull-requests.html
  - title: Markdown syntax
    link: docs/about/all/about-the-docs/style-guide/markdown-syntax.html
---

This document describes how to run Spryker docs locally using Docker. You may want to run docs locally to preview your changes, but it's not required for contributing. 

For instructions on contributing, see [Edit the docs locally](/docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-locally.html)


## Prerequisites

1. Create an account on [GitHub](https://github.com/).
2. Install [GitHub Desktop](https://desktop.github.com/).
3. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
4. Clone the Spryker docs repository. For detailed instructions, see [Clone the Spryker docs repository](https://docs.spryker.com/docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-locally.html#clone-the-spryker-docs-repository).


## Run the docs

1. In Docker Desktop, click **>_Terminal**.
2. In terminal, go to the `spryker-docs` directory. If you didn't change the default path when cloning the repository, the command to do it looks as follows:

```bash
cd Documents/GitHub/spryker-docs
```  

3. Run the docs:
```bash
docker compose up
```

The first launch can take up to 15 minutes. When the build is done, you should see a message that the server is running and its local address. You can access the local copy of Spryker docs by opening `http://localhost:4000` in your browser. If you update a file in the repository, it will be automatically refreshed so you can see it on your local website.















































