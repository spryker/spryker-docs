---
title: Release Notes - August - 2 2017
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-august-2-2017
redirect_from:
  - /2021080/docs/release-notes-august-2-2017
  - /2021080/docs/en/release-notes-august-2-2017
---

## Features
### Order Details Improvement
We have improved Zed usability for order management. Now, in the order view, you can have a convenient summary of products from the given order, including images and name of products. Product options related to the given product are visually differentiated making it easier to navigate through this view. Prices of products and options now display both the value before and after discount for a better overview. We have also extended our current solution to include payment information on the order view. Depending on the payment provider the displayed information in this section will vary.

To enable these changes:

* Add the following plugin to `Pyz\Yves\Checkout\CheckoutDependencyProvider`:
`new ItemMetadataSaverPlugin(),`

* Add the following plugins to `Pyz\Zed\Sales\SalesDependencyProvider`:

```
new ProductIdHydratorPlugin(),
new ProductOptionSortHydratePlugin(), // after ProductOptionOrderHydratePlugin
new CustomerOrderHydratePlugin(),
new ItemMetadataHydratorPlugin(),
new ProductBundleIdHydratorPlugin(),
new ProductOptionGroupIdHydratorPlugin(),
```

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[Sales 7.0.0](https://github.com/spryker/Sales/releases/tag/7.0.0)</li><li>[SalesProductConnector 1.0.0](https://github.com/spryker/sales-product-connector/releases/tag/1.0.0)</li></ul> | <ul><li>[Customer 6.1.0](https://github.com/spryker/Customer/releases/tag/6.1.0)</li><li>[ProductBundle 3.2.0](https://github.com/spryker/product-bundle/releases/tag/3.2.0)</li><li>[ProductCartConnector 4.1.0](https://github.com/spryker/product-cart-connector/releases/tag/4.1.0)</li><li>[ProductOption 5.1.0](https://github.com/spryker/product-option/releases/tag/5.1.0)</li></ul> | <ul><li>[Braintree 0.5.4](https://github.com/spryker/Braintree/releases/tag/0.5.4)</li><li>[Discount 4.3.2](https://github.com/spryker/Discount/releases/tag/4.3.2)</li><li>[DummyPayment 2.0.4](https://github.com/spryker/dummy-payment/releases/tag/2.0.4)</li><li>[Nopayment 3.0.2](https://github.com/spryker/Nopayment/releases/tag/3.0.2)</li><li>[Oms 7.0.1](https://github.com/spryker/Oms/releases/tag/7.0.1)</li><li>[Payolution 4.0.4](https://github.com/spryker/Payolution/releases/tag/4.0.4)</li><li>[Payone 4.0.3](https://github.com/spryker/Payone/releases/tag/4.0.3)</li><li>[Ratepay 0.6.2](https://github.com/spryker/Ratepay/releases/tag/0.6.2)</li><li>[Refund 5.0.1](https://github.com/spryker/Refund/releases/tag/5.0.1)</li><li>[SalesSplit 3.0.2](https://github.com/spryker/sales-split/releases/tag/3.0.2)</li><li>[Shipment 5.0.1](https://github.com/spryker/Shipment/releases/tag/5.0.1)</li></ul> |

**Documentation**
For detailed migration guides, see [Sales Module Guide from Version 6.* to 7.*](https://documentation.spryker.com/v4/docs/mg-sales#upgrading-from-version-6---to-version-7--).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major:

```bash
composer require spryker/sales:"^7.0.0" spryker/sales-product-connector:"^1.0.0"
```

## Improvements
### Enable isSearchable Checkbox for CMS Page
With this release, we enable the `isSearchable` checkbox in CMS page Zed Admin UI. When creating or editing a page, you can now define the page searchability.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CmsGui 4.2.3](https://github.com/spryker/cms-gui/releases/tag/4.2.3) |

### Initial Grand Total Calculator
The discount module provides a plugin to set up a discount condition to grand total. However, previously the `Calculation` module did not provide information about grand totals to make this kind of discount applicable. We have now extended the `Calculation` stack to provide all required information by discounts.

To enable this change, please adjust `\Pyz\Zed\Calculation\CalculationDependencyProvider::getQuoteCalculatorPluginStack` according to [Calculation Migration Guide](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-calculation). Place `InitialGrandTotalCalculatorPlugin()` in the right sequence.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Calculation 4.1.0](https://github.com/spryker/Calculation/releases/tag/4.1.0) | n/a |

### Product Price Size
We have added a constraint to validate price in Zed Admin UI. Price gets validated in 32 bit signed int range.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductManagement 0.7.7](https://github.com/spryker/product-management/releases/tag/0.7.7) |

### Query Only Non Assigned Product Abstracts for Assignment
In Zed, we have a few pages with similar UI for assigning product abstracts. To make an assignment of product abstracts easier, now only non-assigned records are proposed for assignment.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[ProductCategory 4.3.0](https://github.com/spryker/product-category/releases/tag/4.3.0)</li><li>[ProductOption 5.3.0](https://github.com/spryker/product-option/releases/tag/5.3.0)</li><li>[ProductSetGui 1.1.0](https://github.com/spryker/product-set-gui/releases/tag/1.1.0)</li></ul> | n/a |

### Remove Voucher Pool Key From Discount When Type Changes
Voucher codes have been disconnected from a discount if the discount changes its type from voucher to cart rule. Now, this type of cart rules will behave without traits from the previous voucher code type.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Discount 4.4.3](https://github.com/spryker/Discount/releases/tag/4.4.3) |

### Restore Password Link Generation
With this release, we are consolidating the business logic of restore password links in the Customer module configuration. This allows using the same restore logic both from Yves when customer requests a password, as well as from Zed UI to send a password token. By default we are pointing to ` ‹yves_host›;/password/restore` to restore user passwords. If you have a custom URL to restore passwords, please extend and update the `Spryker\Zed\Customer\CustomerConfig::getCustomerPasswordRestoreTokenUrl()`method with a proper Yves URL.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Customer 6.2.3](https://github.com/spryker/Customer/releases/tag/6.2.3) |

### Unique Name Validation for Carriers
To prevent confusion of being able to create carriers with the same name, we've added unique name validation in the carrier creation form in Zed UI.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a |  [Shipment 5.1.1](https://github.com/spryker/Shipment/releases/tag/5.1.1) |

## Bugfixes
### Apply Changes from Source Code When CMS Content Submitted
Formerly saving glossary translation in code view was not being persisted correctly. Certain HTML tags were being removed after saving in code view mode. This issue has been fixed now to save the full content.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[CmsBlockGui 1.1.2](https://github.com/spryker/cms-block-gui/releases/tag/1.1.2)</li><li>[CmsGui 4.2.4](https://github.com/spryker/cms-gui/releases/tag/4.2.4)</li><li>[Glossary 3.1.6](https://github.com/spryker/Glossary/releases/tag/3.1.6)</li></ul> |

### Exception When Viewing in Shop Was Used
We had a bug in product relations when a user would try to "View in Shop" from Zed UI. The URL generation as well as this exception is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductRelation 1.0.7](https://github.com/spryker/product-relation/releases/tag/1.0.7) |

### Glossary Table Sorting
We had an issue with the Zed UI Glossary table when sorting of the ID column was not available. This issue is fixed now, you can now sort this table by ID column ascending or descending.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Glossary 3.1.7](https://github.com/spryker/Glossary/releases/tag/3.1.7) |

### Incorrectly Registered Item State Change
When an order item entity state change was incorrectly registered as “changed”, the statemachine state was changing. Because of this any change to order item entity, for example, a command would create a record in the statemachine history table, leading to duplicates. This has been resolved now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Sales 7.1.3](https://github.com/spryker/Sales/releases/tag/7.1.3) |

### Invalidate Discount Rule if Customer Primary Key Is Not Set
Previously, a guest checkout was throwing an exception with an active cart rule with customer-group in conditions. To fix this issue, now we invalidate discount decision rule if a customer primary key is not present.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CustomerGroupDiscountConnector 2.0.1](https://github.com/spryker/customer-group-discount-connector/releases/tag/2.0.1) |

### Listen to Delete Events for Product Relations' Query Builder
We had an issue for rule result display in product relations. When a rule was added, the preview table was being updated dynamically to list the applicable products. However, when a rule was removed, the table was not being updated. This issue is fixed: when a rule is removed from query builder, the data table is updated now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductRelation 1.0.8](https://github.com/spryker/product-relation/releases/tag/1.0.8) |

### Mandatory Indicator for Discount Description and Apply to Fields
We had 2 incorrect mandatory indicators on Zed UI discount creation/edit form:

* General information &gt; Description (marked as mandatory)
* Discount calculation &gt; Apply to (not marked as mandatory)

Since the "Description" field is not mandatory, the indicator has been removed. Since the "Apply to" field is mandatory, the indicator has been added.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|  n/a| n/a | [Discount 4.4.2](https://github.com/spryker/Discount/releases/tag/4.4.2) |

### Minor Customer Fixes
With this release, we are fixing three issues regarding Customer User Interface:

* There was an issue of displaying the wrong country for the customer with multiple addresses. This issue is fixed now.
* The **Customer Overview** button had a wrong URL to customer view page. Now, the URL is fixed to the correct one.
* The **Add Customer Address** page didn't have breadcrumbs. Those are displayed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Customer 6.2.4](https://github.com/spryker/Customer/releases/tag/6.2.4) |

### Tax Rate as Required Field for Tax Set
Tax sets are strongly related to tax rates and the related field was marked as required, but this constraint was not applied for the field. A validation of this constraint has been added and now it is aligned to the form asterisks.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Tax 5.1.2](https://github.com/spryker/Tax/releases/tag/5.1.2) |

### Wrong Time Zone in Twig Views
Previously, there was a bug when displaying a date in different time zone, it was showing original time zone (GMT). We have fixed date time zone assignment to properly work with different time zones.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [UtilDateTime 1.0.1](https://github.com/spryker/util-date-time/releases/tag/1.0.1) |

### getStateDisplayName() for State in a Sub-process
When the `getStateDisplayName()` facade method was called on a state which is in a sub-process, an exception was thrown. This issue is fixed now, the new behavior “looks for” the state also in all sub-processes.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Oms 7.0.3](https://github.com/spryker/Oms/releases/tag/7.0.3) |

### Adding Non Existing Product to Wishlist
Previously, adding a product with a wrong SKU was causing a DB inserting error. The issue is fixed now. When a non-existing item is added to the wishlist, instead of throwing an exception a more customer friendly error message is displayed. 

To display an error message when wishlist add operation fails, add these few lines in `addItemAction` of  `\Pyz\Yves\Wishlist\Controller\WishlistController`

```php
$wishlistItemTransfer = $this->getClient()->addItem($wishlistItemTransfer);
                        if (!$wishlistItemTransfer->getIdWishlistItem()) {
                        $this->addErrorMessage(‘customer.account.wishlist.item.not_added’);
                    
```

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Wishlist 4.1.3](https://github.com/spryker/Wishlist/releases/tag/4.1.3) |

## Toolkit
### CodeSniffer
The CodeSniffer tool has been upgraded including its `php_codesniffer` dependency. Please upgrade to this new version in order to get a better handling of code sniffing and fixing.

The following command will make sure the latest versions are being placed in your `composer.json` file:

```bash
composer require --dev spryker/code-sniffer squizlabs/php_codesniffer
```

## Documentation Updates
The following content has been added to the Academy:

* [Fact-Finder - Campaigns](/docs/scos/dev/technology-partners/202001.0/marketing-and-conversion/analytics/fact-finder/search-factfind)
* [Fact-Finder - Recommendation](/docs/scos/dev/technology-partners/202001.0/marketing-and-conversion/analytics/fact-finder/search-factfind)
