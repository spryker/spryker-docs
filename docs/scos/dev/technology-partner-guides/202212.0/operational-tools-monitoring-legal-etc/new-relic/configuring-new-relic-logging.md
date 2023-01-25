---
title: Configuring New Relic logging
template: howto-guide-template
redirect_from:
    - /scos/dev/technology-partner-guides/202200.0/operational-tools-monitoring-legal-etc/new-relic/configuring-new-relic-logging.html
---


Every request is automatically logged by New Relic. The name of the requests is the name of the used route for Yves and the `[module]/[controller]/[action]` for Zed. Also, URL request and the host are stored as custom parameters for each request.

To enable the New Relic monitoring extension, see [Local: Configure New Relic](/docs/scos/dev/the-docker-sdk/{{page.version}}/configure-services.html#local-configure-new-relic) in "Configure services".
