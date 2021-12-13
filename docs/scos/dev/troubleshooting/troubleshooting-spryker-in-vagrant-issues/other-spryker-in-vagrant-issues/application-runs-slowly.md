---
title: Application runs slowly
description: Fix the issue when the Spryker application runs slowly
template: troubleshooting-guide-template
---

## Description

Your Spryker shop runs slowly.

## Cause

By default, Xdebug is enabled, and OPcache is disabled when you run the application. This slows down the application, so consider disabling Xdebug and enabling OPcache. 

## Solution

To disable Xdebug and enable OPcache:

1. Log into the virtual machine:
   ```bash
   vagrant ssh
   ```
2. Run 
```bash
  # Disable XDebug, enable OPcache, clear disk cache, restart FPM
sudo -i bash -c " \
  phpdismod -v 8.0 -s cli -m xdebug; \
  phpdismod -v 8.0 -s fpm -m xdebug; \
  phpenmod -v 8.0 -s cli -m opcache; \
  phpenmod -v 8.0 -s fpm -m opcache; \
  rm -rf /var/tmp/opcache/*; \
  systemctl restart php8.0-fpm \
  "
  ```

To enable Xdebug and disable OPcache back:
```bash
  # Enable XDebug, disable OpCache, clear disk cache, restart FPM
sudo -i bash -c " \
  phpenmod -v 8.0 -s cli -m xdebug; \
  phpenmod -v 8.0 -s fpm -m xdebug; \
  phpdismod -v 8.0 -s cli -m opcache; \
  phpdismod -v 8.0 -s fpm -m opcache; \
  rm -rf /var/tmp/opcache/*; \
  systemctl restart php8.0-fpm \
  "
```

