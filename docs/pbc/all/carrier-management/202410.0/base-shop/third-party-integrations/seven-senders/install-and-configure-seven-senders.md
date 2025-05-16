---
title: Install and configure Seven Senders
description: Learn how to install and configure Seven Senders for Spryker Cloud Commerce OS to enhance shipping capabilities and integrate with third-party logistics services.
template: howto-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/shipment/seven-senders/installing-and-configuring-seven-senders.html
  - /docs/scos/dev/technology-partner-guides/202204.0/shipment/seven-senders/installing-and-configuring-seven-senders.html
  - /docs/scos/dev/technology-partner-guides/202311.0/shipment/seven-senders/installing-and-configuring-seven-senders.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/third-party-integrations/seven-senders/install-and-configure-seven-senders.html

---

This document describes how to install and configure the Seven Senders technology partner.

## Installation

```bash
composer require spryker-eco/sevensenders:1.0.0
```

## Configuration

To set up the Seven Senders initial configuration, use the credentials you received from your Seven Senders server. Space ID, key ID and secret can all be acquired from the Settings → API keys panel on Seven Senders' server:
```php
$config[SevensendersConstants::API_KEY] = '';
$config[SevensendersConstants::API_URL] = '';
```
