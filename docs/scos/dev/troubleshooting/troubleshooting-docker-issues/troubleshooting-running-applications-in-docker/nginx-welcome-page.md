---
title: Nginx welcome page
description: Learn how to fix the issue when you get Nginx welcome page upon opening an application in browser
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/nginx-welcome-page
originalArticleId: 27e0d295-8262-41c9-affb-f2339556ef1c
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/nginx-welcome-page.html

---

You get the Nginx welcome page by opening an application in the browser.

1. Update the `nginx:alpine` image:

```bash
docker pull nginx:alpine
```

2. Re-build applications:

```bash
docker/sdk up
```
