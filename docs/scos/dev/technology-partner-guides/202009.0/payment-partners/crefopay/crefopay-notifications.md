---
title: CrefoPay notifications
description: Merchant Notification System (MNS) is a push notification service for merchants that CrefoPay module uses.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/crefopay-notifications
originalArticleId: 1d4ee1a9-9f2d-4cbe-b062-bb3c6c047863
redirect_from:
  - /v6/docs/crefopay-notifications
  - /v6/docs/en/crefopay-notifications
---

Merchant Notification System (MNS) is a push notification service for merchants. The MNS allows merchants to receive a multitude of notifications asynchronously in order to decouple the merchant system from CrefoPay’s payment systems. Also, with the MNS, merchants can react to any kind of change in the payment status of processed transactions.

Notification calls will be targeted at the notification-URL that is configured for the shop. Multiple notification-URLs may be configured for a single shop. This allows merchants to inform more than one system, for example shop system and ERP system.

The Notification-URL can be configured in merchant back end and must have the following format: `http://de.mysprykershop.com/crefo-pay/notification`.
