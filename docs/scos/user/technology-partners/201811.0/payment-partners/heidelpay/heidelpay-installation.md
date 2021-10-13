---
title: Heidelpay - Installation
description: This article contains installation information for the Heidelpay module into the Spryker Legacy Demoshop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/heidelpay-installation
originalArticleId: 6209bf72-5ede-4287-883f-10c3f1822a53
redirect_from:
  - /v1/docs/heidelpay-installation
  - /v1/docs/en/heidelpay-installation
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
