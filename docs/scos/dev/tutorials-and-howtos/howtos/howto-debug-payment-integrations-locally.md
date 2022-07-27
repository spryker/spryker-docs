---
title: HowTo: Debug Payment Integrations locally
description: {Meta description}
template: howto-guide-template
---

#HowTo: Debug Payment Integrations locally
Unlike your PaaS environment, local development environments allow you to debug your application using your IDE. In this article, we want to show you how you can debug most payment integrations locally so you can make sure that your integration works before deploying it.
Most payment integrations rely on a push notification to send feedback to requests made by your application. Normally, these push notification would never reach your local development environment, as the payment provider would not be able to resolve its DNS name. You can use tools like NGROK to set up a publicly available reverse proxy that will give you a publicly reachable URL that you can add to the configuration on your payment provider’s management console. 

## Prerequisites
Read access to your code base
(Free) account for [NGROK](https://ngrok.com)

## Step-by-step instructions
1. Setup your local development environment in SSL/TLS mode. Most payment providers will not work without this. In the deploy.yml file you want to use, change the following setuo:
```
ssl:
       enabled: true
       redirect: true
```
2. Boot your edited deploy.yml file and start your application 
3. Install and Start up NGROK to receive the public URL
```
./ngrok http -host-header=rewrite your.application.base.urll:443
//Example:
./ngrok http -host-header=rewrite yves.de.spryker.local:443
//forwarding your requests like this will allow you to keep most of your URL configuration as is. If your base url differs from the example, make sure to update the command to match.
```
You should now be presented with NGROKs status dashboard in your terminal. It will also display you a useful local web UI where you can see and inspect incoming requests and payloads.
4. Update your payment configuration
This step will very much depend on the payment provider you are using. Normally, payment providers will have a management console or web UI that allows you to specify notification endpoints that will be used to send notifications to your application. You should update those so they match your NGROK URL. Please note, that you might also need to adjust other settings on your payment providers side. If your payment provider is using iframes to embed payment components, you might need to add your local development environment domain and URL to the allowed origins. 

## {Summary and the end result description}
After you have done so, you should be able to test your payment integration locally and receive all notifications from your payment provider. 
