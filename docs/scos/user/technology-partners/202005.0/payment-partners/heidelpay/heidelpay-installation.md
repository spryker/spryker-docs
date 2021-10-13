---
title: Heidelpay - Installation
description: This article contains installation information for the Heidelpay module into the Spryker Legacy Demoshop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/heidelpay-installation
originalArticleId: 67bcd483-2e01-4784-8db0-7971fb288eec
redirect_from:
  - /v5/docs/heidelpay-installation
  - /v5/docs/en/heidelpay-installation
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
