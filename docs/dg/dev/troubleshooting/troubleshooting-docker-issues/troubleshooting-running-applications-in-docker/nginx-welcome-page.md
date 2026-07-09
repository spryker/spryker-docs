---
title: Nginx welcome page
description: Learn how to fix the issue when you get Nginx welcome page upon opening an application in browser
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/nginx-welcome-page.html

---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


You get the Nginx welcome page by opening an application in the browser.

1. Update the `nginx:alpine` image:

```bash
docker pull nginx:alpine
```

2. Re-build applications:

```bash
docker/sdk up
```
