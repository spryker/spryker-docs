---
title: Add images and other media to the docs
description: Enrich your contributions to Spryker Documentation by adding media, this article explains exactly how you can add media to the Spryker docs articles.
last_updated: Jul 18, 2022
template: howto-guide-template
---

This document describes how to add images and other media when contributing to the docs.

To keep the repository lightweight, the media is stored separately in a dedicated Amazon S3 bucket.

For now, only the docs team can add media directly to the bucket. While we are working on a way to enable you to add media directly, you can add media as comments in your PRs, and we'll add it to the documents for you.

## Media guidelines

When sharing media, use any convenient form of sharing: directly upload content or provide a link.

For images, any format is accepted.
For animated content, MP4 is preferred.

* For more guidelines, see [Google's guide to media](https://developers.google.com/style/images).
* For instructions on adding diagrams, see [Add and edit diagrams](/docs/about/all/about-the-docs/contribute-to-the-docs/add-and-edit-diagrams-in-the-docs.html).

## Add media to a PR

1. Create a PR for the document you want to add media to using one of the following guides:
  * [Edit the docs locally](/docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-locally.html)
  * [Edit the docs using a web browser](/docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-using-a-web-browser.html)

  In the document you are creating a PR for, make sure to add a few empty lines in the place where you want to add media to. We'll use these lines to add the code for displaying the media.

2. On the PR's page, go to **Files changed**.
3. Hover over an empty line you want to add the media to.
  This displays a highlighted **+** symbol next to the line number.
4. Click on the highlighted **+** symbol.
  This opens a comment pane.
5. You can paste, drag-and-drop, or click **Paste, drop, or click too add files** button to add the media.
6. Click **Add single comment**.
  This adds the comment to the PR and displays the picture. When we review the PR, we'll see the comment and add the media for you.
