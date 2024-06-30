---
title: Debug payment integrations locally
description: This document shows how to debug most payment integrations locally to make sure that your integration works before deploying it.
past_updated: Jul 27, 2022
template: howto-guide-template
last_updated: Oct 26, 2023
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-debug-payment-integrations-locally.html
---

Unlike [cloud](/docs/ca/dev/getting-started-with-cloud-administration.html) environments, local development environments let you debug your application using your IDE. This document shows how to debug most payment integrations locally to ensure that your integration works before deploying it.
Most payment integrations rely on a push notification to send feedback to requests made by your application. Normally, these push notifications would never reach your local development environment because the payment provider would not be able to resolve its DNS name. You can use tools like NGROK to set up a publicly available reverse proxy that gives you a publicly reachable URL that you can add to the configuration on your payment provider’s management console.

## Prerequisites
* Read access to your code base.
* Get a free account for [NGROK](https://ngrok.com).

## Debug payment integrations locally

1. Set up your local development environment in SSL/TLS mode. Most payment providers do not work without this. In the `deploy.yml` file you want to use, change the following setup:

```
ssl:
       enabled: true
       redirect: true
```
2. Boot your edited `deploy.yml` file and start your application.
3. Install and start up NGROK to receive the public URL:

```
./ngrok http --host-header=rewrite YOUR.APPLICATION_BASE.TLD:443
//Example:
./ngrok http --host-header=rewrite yves.de.spryker.local:443
//forwarding your requests like this let you keep most of your URL configuration as is. If your base url differs from the example, make sure to update the command to match.
```

A status dashboard for NGROK appears in your terminal. It also displays a useful local web UI where you can see and inspect incoming requests and payloads.
4. Update your payment configuration.
This step depends on the payment provider you are using. Most payment providers provide a management console or web UI where you can specify notification endpoints for sending notifications to your application. You need to update those, so they match your NGROK URL.

{% info_block infoBox "Info" %}

You might also need to adjust other settings on your payment provider's side. If your payment provider is using iframes to embed payment components, you might need to add your local development environment domain and URL to the allowed origins.

{% endinfo_block %}

After you have done so, you can test your payment integration locally and receive all notifications from your payment provider.
