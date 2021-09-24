---
title: Release Notes - August - 1 2017
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-august-1-2017
originalArticleId: ef744a9e-510c-4931-ad36-a3f238c9fdce
redirect_from:
  - /2021080/docs/release-notes-august-1-2017
  - /2021080/docs/en/release-notes-august-1-2017
  - /docs/release-notes-august-1-2017
  - /docs/en/release-notes-august-1-2017
---

## Announcements
### PHP 7.2 is There Soon / EOL for PHP5.6
With the release of PHP 7.2, we want our Spryker code to stay cutting edge and using the best features available. Soon, we want to start leveraging the new typehinting features the language provides and for that we need to stop supporting legacy version 5.*.

With the **end of October**, we stop supporting PHP 5.6 and PHP 7.0. Please make sure your infrastructure is running on 7.1+ before that. Read [gophp71.org](https://gophp71.org/) for details on why 7.1+ is the next minimum version.

## Features
### Shipment Discount
Current Spryker discounts (vouchers and cart rules) are calculated with fixed value or percentage reduction and those are applied to value of product(s). One of yet another very common discount concepts is free shipping or discounts that are applied to shipping costs. You might want to offer free shipment for various reasons. One of the most common ones is to motivate customers to increase the basket volume by offering free shipping for example for orders over 50€.

With this feature, our current discount engine now makes it possible to define discounts that are applied not only to products, but also to shipping expenses.

For this reason, three shipment discount types have been implemented:

* Carrier – a discount by a specific carrier (DHL, UPS etc)
* Method – a discount by a shipment method (To pick-up point, Door to Door etc)
* Price – a discount to a delivery price

You can now create discount calculation rules like the one in the example below. The example below will ensure that if the selected shipment carrier is the Spryker Dummy Shipment, selected shipment method is the Express and the price of this Express shipment method is greater than or equal to 5, then the discount is applied. If, for example, you remove the middle rule ("shipment-method equal Express (Spryker Dummy Shipment)", then the discount will be applied for all shipment methods from Spryker Dummy Shipment shipment carrier if the price of the shipment method is greater than or equal to 5.
![Shipment discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Archive/RN_shipment_discount.png)

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [ShipmentDiscountConnector 1.0.0](https://github.com/spryker/shipment-discount-connector/releases/tag/1.0.0) | [Shipment 5.1.0](https://github.com/spryker/Shipment/releases/tag/5.1.0) | n/a |

**Documentation**
For module documentation, see [Shipment Module Guide](/docs/scos/dev/feature-walkthroughs/{{site.version}}/shipment-module-overview.html).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major:

```bash
composer require spryker/shipment-discount-connector:"^1.0.0"
```

## Improvements
### Create Injection Points for Project Logic for Twig Templates
Before it was not possible to extend Spryker GUI tables and replace Twig template paths. With this release, we are introducing configuration points through an extension of the abstract class to allow extensions.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Gui 3.7.1](https://github.com/spryker/Gui/releases/tag/3.7.1) |

### Optional Category Template
In the `Category` module, an assigned template is not required (to make the migration easier),  however, in `CmsBlockCategoryConnector`, this field was required. With this release, now a category template is not required in both modules.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | [CmsBlockCategoryConnector 2.0.1](https://github.com/spryker/cms-block-category-connector/releases/tag/2.0.1) |

### Shipment Delivery Time
One of the `Shipment` models, `ShipmentMethodTransfer` had the wrong PHPDoc information for delivery time. This issue is fixed now. Before, when expecting a string, you would get string or integer. To avoid confusion, we have changed return type of `getDeliveryTime` to the proper one (int|null).

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | [Shipment 5.0.2](https://github.com/spryker/Shipment/releases/tag/5.0.2) |

### Reset Password
We had templates for changing a customer password, but this did not support passing a recovery token. With this release, we deliver the complete functionality of password reset, including the request for it and update.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | [Customer 6.2.0](https://github.com/spryker/Customer/releases/tag/6.2.0) |  n/a|

### NULL Password in Config for Storage
After predis/predis library changed the approach of handling connection, params had an issue with supporting its new versions  (&gt;=1.1.0). Now, Spryker config handling is adjusted to Predis library.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>Collector 5.1.6</li><li>Storage 3.1.1</li></ul> |

### Missing Breadcrumbs
In some pages of Zed, the breadcrumb navigation was missing. We added all missing navigation entries into the navigation.xml files to fix all breadcrumbs.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Acl 3.0.1](https://github.com/spryker/Acl/releases/tag/3.0.1)<li>[AvailabilityGui 2.0.3](https://github.com/spryker/availability-gui/releases/tag/2.0.3)</li><li>[Category 4.0.1](https://github.com/spryker/Category/releases/tag/4.0.1)</li><li>[Cms 6.1.2](https://github.com/spryker/Cms/releases/tag/6.1.2)</li><li>[CmsBlock 1.2.2](https://github.com/spryker/cms-block/releases/tag/1.2.2)</li><li>[CmsBlockGui 1.1.1](https://github.com/spryker/cms-block-gui/releases/tag/1.1.1)</li><li>[CmsGui 4.2.1](https://github.com/spryker/cms-gui/releases/tag/4.2.1)</li><li>[Customer 6.2.1](https://github.com/spryker/Customer/releases/tag/6.2.1)</li><li>[CustomerGroup 2.1.2](https://github.com/spryker/customer-group/releases/tag/2.1.2)</li><li>[Development 3.1.4](https://github.com/spryker/Development/releases/tag/3.1.4)</li><li>[Glossary 3.1.5](https://github.com/spryker/Glossary/releases/tag/3.1.5)</li><li>[Gui 3.7.2](https://github.com/spryker/Gui/releases/tag/3.7.2)</li><li>[Oms 7.0.2](https://github.com/spryker/Oms/releases/tag/7.0.2)</li><li>[ProductManagement 0.7.6](https://github.com/spryker/product-management/releases/tag/0.7.6)</li><li>[ProductOption 5.2.1](https://github.com/spryker/product-option/releases/tag/5.2.1)</li><li>[ProductRelation 1.0.6](https://github.com/spryker/product-relation/releases/tag/1.0.6)</li><li>[ProductSearch 5.1.1](https://github.com/spryker/product-search/releases/tag/5.1.1)</li><li>[Sales 7.1.1](https://github.com/spryker/Sales/releases/tag/7.1.1)</li><li>[Search 6.4.2](https://github.com/spryker/Search/releases/tag/6.4.2)</li><li>[Shipment 5.0.3](https://github.com/spryker/Shipment/releases/tag/5.0.3)</li><li>[StateMachine 2.0.3](https://github.com/spryker/state-machine/releases/tag/2.0.3)</li><li>[Tax 5.1.1](https://github.com/spryker/Tax/releases/tag/5.1.1)</li><li>[Testify 3.2.7](https://github.com/spryker/Testify/releases/tag/3.2.7)</li><li>[User 3.0.2](https://github.com/spryker/User/releases/tag/3.0.2)</li><li>[ZedNavigation 1.1.1](https://github.com/spryker/zed-navigation/releases/tag/1.1.1)</li><li>[ZedRequest 3.1.3](https://github.com/spryker/zed-request/releases/tag/3.1.3)</li></ul> |

### Elasticsearch Client Config
We've added new environment config parameters to be able to customize the Elasticsearch connection configuration with Elastica Client.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>Application 3.3.0</li><li>Collector 5.2.0</li><li>Heartbeat 3.1.0</li><li>Search 6.5.0</li></ul> | n/a |

### Architecture Sniffer
Previously, we only had a Zed backend page displaying architecture violations. A backend page listing all the sniffer rules for each application namespace has been added now including a short explanation. We now offer a CLI command as convenience wrapper to quickly check either modules or complete paths. We also introduced multiple priorities and use 2 by default for now. 3 stays experimental.

Please note that the sniff commands now are as follows:

* `console code:sniff:style` (the alias for `code:sniff` is still present for BC)
* `console code:sniff:architecture`

**Tip**: You can use `console c:s:s` and `console c:s:a` as shortcuts.

For guidelines and documentation, see [Code Architecture Guide](/docs/scos/dev/guidelines/coding-guidelines/code-architecture-guide.html).

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Development 3.2.0](https://github.com/spryker/Development/releases/tag/3.2.0) | n/a |

### Increment Counter for Unlimited Vouchers
Previously, the number of uses was not increased for an unlimited voucher (not limit on a number of uses). It was inconvenient with voucher of a limited use. Now, the counter increases do not depend on the type of a voucher.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Discount 4.4.1](https://github.com/spryker/Discount/releases/tag/4.4.1) |

### Change Path to last_yves_request Log
Previously, there was no possibility to define a path for the `yves_requests` and they were stored under the logs directory. Those `yves_request` files are not log files. The path for them is now configurable.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ZedRequest 3.1.4](https://github.com/spryker/zed-request/releases/tag/3.1.4) |

### Allow Check for Breadcrumbs in Communication
Previously, we used `Request::createFromGlobals()` in  `ZedNavigationServiceProvider`. We are now using the request object from the application instead.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Gui 3.8.0](https://github.com/spryker/Gui/releases/tag/3.8.0)</li><li>[ZedNavigation 1.2.0](https://github.com/spryker/zed-navigation/releases/tag/1.2.0)</li></ul> | [Testify 3.2.9](https://github.com/spryker/Testify/releases/tag/3.2.9)  |

### Exclusive Custom Search and Storage Client Configuration
With this release, we enable setting exclusive search (Elastica) client and storage (Predis) client configuration.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Application 3.4.0](https://github.com/spryker/Application/releases/tag/3.4.0)</li><li>[Collector 5.3.0](https://github.com/spryker/Collector/releases/tag/5.3.0)</li><li>[Heartbeat 3.2.0](https://github.com/spryker/Heartbeat/releases/tag/3.2.0)</li><li>[Search 6.6.0](https://github.com/spryker/Search/releases/tag/6.6.0)</li><li>[Storage 3.2.0](https://github.com/spryker/Storage/releases/tag/3.2.0)</li></ul> | n/a |

### Update to Allow symfony/http-kernel V2 or V3
With this update, we now allow `symfony/http-kerne`l v2 or v3. In addition to this, we have also removed unneeded `symfony/http-foundation` dependency.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | [Symfony 3.1.0](https://github.com/spryker/Symfony/releases/tag/3.1.0) | n/a |

## Bugfixes
### Unmapped Sort on Empty Category
Previously, an empty category (category that does not have products assigned to it) was throwing an Elastic exception. This was due to missing sort-s. This issue is fixed now by ignoring sort-s which are not mapped to the existing data in your Elastic.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Search 6.4.1](https://github.com/spryker/Search/releases/tag/6.4.1) |

### Drop Timestamped Storage Keys
Zed / Maintenance / Storage contained a link to drop time stamped storage keys. This was not working as expected due to a bug in a passed parameter. With this fix, now it's possible to delete time stamp storage keys successfully.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CollectorStorageConnector 1.0.2](https://github.com/spryker/collector-storage-connector/releases/tag/1.0.2) |

### Dependencies Fixes
Some third party modules have been locked down on bugfix level, which was making it difficult for projects to get small improvements. We want to be more allowing on core level by default for the vendor libraries that follow semantic versioning.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Zend 2.1.0](https://github.com/spryker/Zend/releases/tag/2.1.0) | <ul><li>[Graphviz 2.0.1](https://github.com/spryker/Graphviz/releases/tag/2.0.1)</li><li>[Money 2.0.2](https://github.com/spryker/Money/releases/tag/2.0.2)</li><li>[Monolog 2.0.3](https://github.com/spryker/Monolog/releases/tag/2.0.3)</li></ul> |

### currentLocale in Stores.php
Previously, `currentLocale` was only set for Zed. This is now set also for Yves. A call to `Store::getInstance()->getCurrentLocale()` will not throw an exception in Yves anymore.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Kernel 3.5.1](https://github.com/spryker/Kernel/releases/tag/3.5.1) |

### Composer Dependency to Kernel for CmsGui
Composer constraint from `CmsGui` to Kernel module was wrong. This issue is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a |[CmsGui 4.2.2](https://github.com/spryker/cms-gui/releases/tag/4.2.2)  |

### Count Statements
The `Cms` and `Price` modules were wrongly not throwing an exception for an empty collection when looking for CMS pages. This has now been resolved.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Cms 6.1.3](https://github.com/spryker/Cms/releases/tag/6.1.3)</li><li>[Price 4.2.1](https://github.com/spryker/Price/releases/tag/4.2.1)</li></ul> |

### Guzzle Option 'strict' =&gt; true
We have added `"strict" => true` for HTTP client calls to ZED, so that when redirect from HTTPs to HTTP is made, it does not drop the payload. See [Guzzle documentation for allow_redirects](http://docs.guzzlephp.org/en/stable/request-options.html#allow-redirects).

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | [ZedRequest 3.1.5](https://github.com/spryker/zed-request/releases/tag/3.1.5)|

## Documentation Updates
The following content has been added to the Academy:

* [Authorization and Preauthorization-Capture Flows](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/bs-payone/legacy-demoshop-integration/payone-authorization-and-preauthorization-capture-flows.html)
* [PayPal Express Checkout Payment - Payone](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-paypal-express-checkout-payment.html)
