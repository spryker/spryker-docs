---
title: CrefoPay notifications
description: Merchant Notification System (MNS) is a push notification service for merchants that CrefoPay module uses.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/crefopay-notifications
originalArticleId: 16d24825-5c36-4fa7-94d3-2c55711881ba
redirect_from:
  - /2021080/docs/crefopay-notifications
  - /2021080/docs/en/crefopay-notifications
  - /docs/crefopay-notifications
  - /docs/en/crefopay-notifications
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/crefopay/crefopay-notifications.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/crefopay/crefopay-notifications.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/crefopay/crefopay-notifications.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/crefopay/crefopay-notifications.html
---

Merchant Notification System (MNS) is a push notification service for merchants. The MNS allows merchants to receive a multitude of notifications asynchronously in order to decouple the merchant system from CrefoPay’s payment systems. Also, with the MNS, merchants can react to any kind of change in the payment status of processed transactions.

Notification calls will be targeted at the notification-URL that is configured for the shop. Multiple notification-URLs may be configured for a single shop. This allows merchants to inform more than one system, for example shop system and ERP system.

The Notification-URL can be configured in merchant back end and must have the following format: `http://de.mysprykershop.com/crefo-pay/notification`.
