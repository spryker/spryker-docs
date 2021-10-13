---
title: Heidelpay - Installation
description: This article contains installation information for the Heidelpay module into the Spryker Legacy Demoshop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/heidelpay-installation
originalArticleId: 5ca78a43-0b9f-4fc0-9547-a01b97e2298e
redirect_from:
  - /v3/docs/heidelpay-installation
  - /v3/docs/en/heidelpay-installation
---

To install Heidelpay, if necessary, add  the Heidelpay repo to your repositories in composer.json:

 ```php
 "repositories": [
 ...
 {
 "type": "git",
 "url": "https://github.com/spryker-eco/Heidelpay.git"
 }
 ],
 ```

and run the following console command:
```php
composer require spryker-eco/heidelpay
```
