---
title: Push Notification feature overview
description: The Customer Access feature lets you receive push notifications
last_updated: Feb 2, 2023
template: concept-topic-template
---

The *Push Notifications* lets users subscribe to the web push notifications. Notifications can be sent from the server to all registered subscriptions.

## Subscribing to notifications

There are two tasks that enable the feature. The first lets the user subscribe to the web push notifications. For this,the site page must install a service (service-worker) with which the user is registered on the server, and received messages are processed. The service-worker is downloaded in the background to the user's platform, which lets it be executed outside of the site page's context.

If a user subscribes to the service, the service-worker is registered. The service-worker requests all required information through the web push API and sends this through an HTTP request to the server. The server stores this information in its database so that notifications can be sent to the client.

## Sending notifications

Notifications are sent from the server to all registered subscriptions with an HTTP request. To correctly identify a user, a signature must be transmitted in the request header. This signature is generated from the public key used for registration and the private key. The actual message and further information are transmitted as user data. If the encryption and formatting are correct and the signature is validated, the push service sends the notification to the user.