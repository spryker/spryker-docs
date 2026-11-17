---
title: Run the docs locally
description: Learn how to Build and run Spryker Documentation directly on your local machine with this guide.
last_updated: Nov 17, 2026
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
4. Clone the [Spryker docs repository](https://github.com/spryker/spryker-docs). For detailed instructions, see [Clone the Spryker docs repository](https://docs.spryker.com/docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-locally.html#clone-the-spryker-docs-repository).


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

## Run only selected sections of the docs

The full site contains thousands of pages, so each build and rebuild takes minutes. If you work on pages in one section, you can build only that section. A build of one section takes seconds, and a rebuild after you save a file takes about one second.

A section is a top-level folder in the `docs` directory. The following sections are available:

| SECTION | CONTENT |
|---------|---------|
| `about` | About Spryker, release notes, support, and contribution guides |
| `ca` | Cloud administration |
| `dg` | Developer guides |
| `integrations` | Third-party integrations |
| `pbc` | Packaged Business Capabilities |

### Prerequisites

In addition to the [general prerequisites](#prerequisites), install [Node.js](https://nodejs.org/) 18 or later. The `npm` command is included in Node.js.

### Run the selected sections

1. In a terminal, go to the `spryker-docs` directory.
2. Run the `docs:serve` command and pass the section names after `--`:

```bash
npm run docs:serve -- {section}
```

Examples:

| COMMAND | RESULT |
|---------|--------|
| `npm run docs:serve -- pbc` | Builds only `docs/pbc`. |
| `npm run docs:serve -- pbc dg` | Builds `docs/pbc` and `docs/dg`. Separate several sections with spaces. |
| `npm run docs:serve` | Builds the full site. |

{% info_block infoBox "The -- separator" %}

The `--` separator passes the section names to the script instead of to `npm`. If you omit it, `npm` does not pass the section names, and the script builds the full site.

{% endinfo_block %}

3. When the terminal shows `Server running... press ctrl-c to stop.`, open `http://localhost:4000` in your browser.
4. To stop the server, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the terminal.

If you pass a section name that does not exist, the command stops and lists the available sections.

### How the command works

The `docs:serve` command runs the `_scripts/serve-docs.js` script. The script does the following:

1. Generates the `_config_dev.yml` file. This file excludes all sections that you did not pass from the build. The file is ignored by Git, so do not edit or commit it.
2. If the selected sections differ from the previous run, deletes the `_site` folder. This removes pages of previously built sections.
3. Starts the Jekyll server in the Docker container that `docker compose up` uses.

### Limitations

- Pages in excluded sections are not built. Links to these pages and their sidebar entries return a 404 error locally.
- Changes in the `_data` folder, such as sidebar files, are not detected while the server is running. To apply them, stop the server and run the command again.
- Do not run `docker compose up` and `npm run docs:serve` at the same time. Both use ports 4000 and 35729.

