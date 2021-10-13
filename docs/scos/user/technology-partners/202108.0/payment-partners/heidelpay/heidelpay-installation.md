---
title: Heidelpay - Installation
description: This article contains installation information for the Heidelpay module into the Spryker Legacy Demoshop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-installation
originalArticleId: b3bc4292-2daf-4054-b987-2adcf53414a8
redirect_from:
  - /2021080/docs/heidelpay-installation
  - /2021080/docs/en/heidelpay-installation
  - /docs/heidelpay-installation
  - /docs/en/heidelpay-installation
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
