---
title: Configuring New Relic logging
template: howto-guide-template
redirect_from:
    - /scos/dev/technology-partner-guides/202200.0/operational-tools-monitoring-legal-etc/new-relic/configuring-new-relic-logging.html
---


Every request is automatically logged by New Relic. The name of the requests will be the name of the used route for Yves and the `[module]/[controller]/[action]` for Zed. Also, URL request and the host are stored as custom parameters for each request.

To enable the New Relic monitoring extension, see corresponding section in (Configure Services)[https://docs.spryker.com/docs/scos/dev/the-docker-sdk/202212.0/configure-services.html#local-configure-new-relic]
