---
title: Failed to decode response- zlib_decode()- data error
description: Learn how to fix the issue Failed to decode response- zlib_decode()- data error
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/failed-to-decode-response-zlib-decode-data-error
originalArticleId: 9d1d83ed-12e8-426f-a292-f6ec31574325
redirect_from:
  - /2021080/docs/failed-to-decode-response-zlib-decode-data-error
  - /2021080/docs/en/failed-to-decode-response-zlib-decode-data-error
  - /docs/failed-to-decode-response-zlib-decode-data-error
  - /docs/en/failed-to-decode-response-zlib-decode-data-error
  - /v6/docs/failed-to-decode-response-zlib-decode-data-error
  - /v6/docs/en/failed-to-decode-response-zlib-decode-data-error
---

## Description
When running `composer install` or `composer update`, you might get the issue *Failed to decode response: zlib_decode(): data error* .

## Solution
Change the composer configuration by running `composer config -ge` in the terminal and replacing the configuration with the following one

```php
{
    "repositories": {
        "packagist": { "url": "https://packagist.org", "type": "composer" }
    }
}
```
