---
title: CrefoPay notifications
description: Merchant Notification System (MNS) is a push notification service for merchants that CrefoPay module uses.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/crefopay-notifications
originalArticleId: 9d73a078-a32b-47d7-bbda-4f7198f75043
redirect_from:
  - /v3/docs/crefopay-notifications
  - /v3/docs/en/crefopay-notifications
---

Merchant Notification System (MNS) is a push notification service for merchants. The MNS allows merchants to receive a multitude of notifications asynchronously in order to decouple the merchant system from CrefoPay’s payment systems. Also, with the MNS, merchants can react to any kind of change in the payment status of processed transactions.

Notification calls will be targeted at the notification-URL that is configured for the shop. Multiple notification-URLs may be configured for a single shop. This allows merchants to inform more than one system, for example shop system and ERP system.

The Notification-URL can be configured in merchant back end and must have the following format: `http://de.mysprykershop.com/crefo-pay/notification`.
