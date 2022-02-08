---
title: Installing and configuring Seven Senders
template: howto-guide-template
---


This document describes how to install and configure the Seven Senders technology partner.

## Installation

To install Seven Senders, run the command in the console:
```bash
composer require spryker-eco/sevensenders:1.0.0
```

## Configuration

To set up the Seven Senders initial configuration, use the credentials you received from your Seven Senders server. Space id, key id and secret you can get from Settings → API keys panel on Seven Senders server:
```php
$config[SevensendersConstants::API_KEY] = '';
$config[SevensendersConstants::API_URL] = '';
```
