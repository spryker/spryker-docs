---
title: Release Notes - November - 2 2017
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-november-2-2017
originalArticleId: d2b19933-8cf8-4812-847d-f36c5d6253be
redirect_from:
  - /2021080/docs/release-notes-november-2-2017
  - /2021080/docs/en/release-notes-november-2-2017
  - /docs/release-notes-november-2-2017
  - /docs/en/release-notes-november-2-2017
---

## Improvements
### Inspinia Update
With this update, we bring the latest version of Inspinia (2.7.1) into Zed Administration Interdace. You can now take full advantage Inspinia's latest feature set and improvements. 

In order to take the latest changes introduced by this version, 

* remove the existing `node_modules` folder from `vendor/spryker/gui/assets/Zed folder` and 
* either 
    * re-run `./setup -i from` the VM or 
    * run `npm install` from `vendor/spryker/gui/assets/Zed` to update the dependencies

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a | [Gui 3.11.0](https://github.com/spryker/Gui/releases/tag/3.11.0) | <ul><li>[NavigationGui 2.0.2](https://github.com/spryker/navigation-gui/releases/tag/2.0.2)</li><li>[ProductSetGui 1.1.3](https://github.com/spryker/product-set-gui/releases/tag/1.1.3)</li></ul> |

### Filter Out Certain Orders from Listing in Yves Customer Account
In certain cases, you might not want to list certain orders to the customer in Yves. Like, for example, orders failing the post-check should be filtered out in the list of orders in the Yves customer account. Previously, those orders were not being filtered out in Yves. The problem with displaying those is that in Yves when post-check fails, the "order placed successfully" message is not displayed to a customer, so the customer does not know that those orders are actually persisted. Yet it is important to have those in Zed, for example, to later be able to investigate and analyze what happened, as well as have statistics on the order placement process. However, as this is not relevant to the Yves user, they should not see failed orders mixed with successfully submitted ones.

With this release, we now filter those orders in the Yves customer account. Now, it is possible to add a special flag to order items "exclude from customer". If all items in the order have this state, the order won't be listed for the customer.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Oms 7.3.0](https://github.com/spryker/Oms/releases/tag/7.3.0)</li><li>[Sales 8.2.0](https://github.com/spryker/Sales/releases/tag/8.2.0)</li></ul> | [DummyPayment 2.1.3](https://github.com/spryker/dummy-payment/releases/tag/2.1.3) |

### Limits for Sequence Numbers
For the multi-server architecture, it's useful to set a maximal sequence number to differentiate a server which has issued the number (for example, if you would like to split the same order range between multiple systems allocating a subrange for each).

With this release, we are introducing limits for sequence numbers. Sequence limits are now available in the environment configuration.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [SequenceNumber 3.1.0](https://github.com/spryker/sequence-number/releases/tag/3.1.0) | n/a |

### Double Click Protection for Submit Action in Zed Administration Interface
This release adds double click prevention in Zed Administration Interface. By adding the class name `.safe-submit` to an html button or link, it will be disabled after the first click, preventing the action connected to be executed more than once.

In order to obtain this feature, you need to get [Gui 3.12.0](https://github.com/spryker/Gui/releases/tag/3.12.0) or higher module version. Otherwise, the `.safe-submit` class name will be ignored and the behavior simply won't change.

In this release, a Twig function `submit_button` has been added. It provides a basic input field with `btn btn-primary safe-submit` class name. This is meant to replace the submit input fields across Zed Interface, providing consistency. The usage is `{% raw %}{{{% endraw %} submit_button('value', { attr: {...} }) {% raw %}}}{% endraw %}`.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Discount 5.1.0](https://github.com/spryker/Discount/releases/tag/5.1.0)</li><li>[Gui 3.12.0](https://github.com/spryker/Gui/releases/tag/3.12.0)</li><li>[ProductOption 5.5.0](https://github.com/spryker/product-option/releases/tag/5.5.0)</li><li>[Sales 8.1.0](https://github.com/spryker/Sales/releases/tag/8.1.0)</li></ul> |<ul><li>[Acl 3.0.4](https://github.com/spryker/Acl/releases/tag/3.0.4)</li><li>[AvailabilityGui 2.0.4](https://github.com/spryker/availability-gui/releases/tag/2.0.4)</li><li>[Category 4.2.2](https://github.com/spryker/Category/releases/tag/4.2.2)</li><li>[Cms 6.3.3](https://github.com/spryker/Cms/releases/tag/6.3.3)</li><li>[CmsBlockGui 1.1.5](https://github.com/spryker/cms-block-gui/releases/tag/1.1.5)</li><li>[CmsGui 4.3.2](https://github.com/spryker/cms-gui/releases/tag/4.3.2)</li><li>[Customer 6.3.3](https://github.com/spryker/Customer/releases/tag/6.3.3)</li><li>[CustomerGroup 2.2.1](https://github.com/spryker/customer-group/releases/tag/2.2.1)</li><li>[Glossary 3.2.1](https://github.com/spryker/Glossary/releases/tag/3.2.1)</li><li>[NavigationGui 2.0.3](https://github.com/spryker/navigation-gui/releases/tag/2.0.3)</li><li>[ProductAttributeGui 1.0.3](https://github.com/spryker/product-attribute-gui/releases/tag/1.0.3)</li><li>[ProductCategory 4.4.2](https://github.com/spryker/product-category/releases/tag/4.4.2)</li><li>[ProductLabelGui 1.1.2](https://github.com/spryker/product-label-gui/releases/tag/1.1.2)</li><li>[ProductManagement 0.8.3](https://github.com/spryker/product-management/releases/tag/0.8.3)</li><li>[ProductRelation 1.1.1](https://github.com/spryker/product-relation/releases/tag/1.1.1)</li><li>[ProductSearch 5.2.1](https://github.com/spryker/product-search/releases/tag/5.2.1)</li><li>[ProductSetGui 1.1.4](https://github.com/spryker/product-set-gui/releases/tag/1.1.4)</li><li>[Shipment 6.0.2](https://github.com/spryker/Shipment/releases/tag/6.0.2)</li><li>[Tax 5.1.4](https://github.com/spryker/Tax/releases/tag/5.1.4)</li><li>[User 3.1.1](https://github.com/spryker/User/releases/tag/3.1.1)</li></ul> |

### Success Codes for NewRelic Record Deployment Response
Previously, the `NewRelic` response code was too strict, only 200 were allowed. With this fix, we allow for `recordDeployment()` response also 201 and other 2xx codes.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [NewRelic 3.1.1](https://github.com/spryker/new-relic/releases/tag/3.1.1) |

## Bugfixes
### Case Sensitive Propel and Duplicate Email Addresses
Previously, we had a problem with duplicated email addresses when running on PostgreSQL. We updated Propel schema to implement case-insensitive flag for columns. The flag is enabled for the email field in `Customer` module by default.

This change does not require database changes but it does require Propel model regeneration.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [Customer 7.0.0](https://github.com/spryker/Customer/releases/tag/7.0.0) | [PropelOrm 1.5.0](https://github.com/spryker/propel-orm/releases/tag/1.5.0) | <ul><li>[CustomerApi 0.1.3](https://github.com/spryker/customer-api/releases/tag/0.1.3)</li><li>[CustomerGroup 2.2.2](https://github.com/spryker/customer-group/releases/tag/2.2.2)</li><li>[CustomerUserConnector 1.0.1](https://github.com/spryker/customer-user-connector/releases/tag/1.0.1)</li><li>[CustomerUserConnectorGui 1.0.1](https://github.com/spryker/customer-user-connector-gui/releases/tag/1.0.1)</li><li>[Newsletter 4.1.5](https://github.com/spryker/Newsletter/releases/tag/4.1.5)</li><li>[ProductReviewGui 1.0.1](https://github.com/spryker/product-review-gui/releases/tag/1.0.1)</li><li>[Sales 8.2.1](https://github.com/spryker/Sales/releases/tag/8.2.1)</li><li>[Wishlist 4.2.1](https://github.com/spryker/Wishlist/releases/tag/4.2.1)</li></ul> |

**Documentation**
For module documentation, see Customer Module Guide<!--/capabilities/crm/customer-module-overview.htm)-->.
For detailed migration guides, see [Customer Module Migration Guide from Version 6. to 7](/docs/scos/dev/migration-and-integration/{{ page.version }}/module-migration-guides/migration-guide-customer.html#upgrading-from-version-6---to-version-7-0).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/customer:"^7.0.0"
```

### Thread/Process -safe Sequence Generator
Previously, the row with the current counter was not being locked for the sequence generator, which could have resulted in many concurrent processes approaching the `sequence->save();` having the same number generated. This is now resolved by locking the row when one process reads the sequence number; in this case other processes need to wait until the current process is finished.

We provide row-level locks functionality using Propel. To acquire a row-level lock on a row, there is now a new method in QueryBuilder `forUpdate(true|false)` which can be called in SELECT queries. The lock is held until the transaction commits or rolls back, just like table-level locks. For more information, please check [PostgreSQL 9.1.24 Documentation for Explicit Locking](https://www.postgresql.org/docs/9.1/explicit-locking.html), [MySQL 5.7 Reference Manual for SELECT Syntax](https://dev.mysql.com/doc/refman/5.7/en/select.html).

Please make sure to

* adjust the namespaces in your `config_*.php` files

```PHP
//use Spryker\Zed\Propel\Business\Builder\ObjectBuilder; (remove)
                        //use Spryker\Zed\Propel\Business\Builder\QueryBuilder; (remove)
                        use Spryker\Zed\PropelOrm\Business\Builder\ObjectBuilder;
                        use Spryker\Zed\PropelOrm\Business\Builder\QueryBuilder;
```

* and run `console propel:model:build` to update your Query classes

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a| [PropelOrm 1.4.0](https://github.com/spryker/propel-orm/releases/tag/1.4.0) | <ul><li>[Propel 3.2.4](https://github.com/spryker/Propel/releases/tag/3.2.4)</li><li>[SequenceNumber 3.0.1](https://github.com/spryker/sequence-number/releases/tag/3.0.1)</li></ul> |

### Resizable Table Headers
Previously, we had an issue with the table headers in Zed Administration Interface. When resizing the browser window, the content of the table was resized, but the headers were not adjusted accordingly. This fix makes sure that the data table headers grow/shrink with the window width.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a |  [Gui 3.10.2](https://github.com/spryker/Gui/releases/tag/3.10.2) |

### Breadcrumb for Product Attribute Translation Management Interface
Previously, breadcrumbs were missing for the product attribute translation management interface. This issue has been fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductAttributeGui 1.0.2](https://github.com/spryker/product-attribute-gui/releases/tag/1.0.2) |

## Documentation Updates
The following content has been added to the Academy:

* [Payment Integration - BS Payone - 1.1](/docs/scos/dev/technology-partners/{{ page.version }}/payment-partners/bs-payone/bs-payone.html) 
* Integration With Project - Payone
* [PayPal Express Checkout Payment - Payone - 1.1](/docs/scos/dev/technology-partners/{{ page.version }}/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-paypal-express-checkout-payment.html)
 
Your feedback would be highly appreciated. Please help us understand what you need from the Spryker Academy by filling out a very short [survey] [here](https://docs.google.com/forms/d/1_vZg0lfqq24Qf9-fQhU50NgsEBy4eDqnDyx7gKz9Faw/edit).
