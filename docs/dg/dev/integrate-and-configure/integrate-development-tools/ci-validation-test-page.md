---
title: CI validation test page
description: Test page that checks the documentation CI gates for a new page. Do not merge.
last_updated: Nov 18, 2026
template: concept-topic-template
related:
  - title: Development tools
    link: docs/dg/dev/development-tools.html
  - title: Web Profiler
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/web-profiler.html
---

This page is a test page. It checks that the documentation CI gates accept a new page with a sidebar entry.

## Why this page exists

When you add a new page, the CI gates check the prose, the Markdown syntax, the sidebar, the related links, and the `last_updated` date. This page triggers all of these checks.

## Check the page

To check the page, follow these steps:

1. Open the [Development tools](/docs/dg/dev/development-tools.html) page.
2. In the sidebar, find **CI validation test page**.
3. Make sure that the page renders correctly.

{% info_block infoBox "Info" %}

This page is for testing only. Do not merge the pull request that adds it.

{% endinfo_block %}
