---
title: Migration Guide - Customer
originalLink: https://documentation.spryker.com/v6/docs/mg-customer
redirect_from:
  - /v6/docs/mg-customer
  - /v6/docs/en/mg-customer
---

## Upgrading from Version 6.* to Version 7.0

Case insensitivity for queries containing `filterByEmail` conditions will be out of the box for the `Customer` module.

### 1. Regenerate Propel Models
To apply the fix, you need to regenerate Propel models. During this migration table schemas should NOT be updated.
                
{% info_block warningBox %}
Before you start, please check that all migrations are applied and you don't have technical dept here.
{% endinfo_block %}
                
Run the following commands: 

```bash
vendor/bin/console propel:diff 
vendor/bin/console propel:model:build
```

Propel models should be updated, no migrations should be created.

### 2. Fix Removed Deprecations

Find usages of `\Spryker\Shared\Customer\CustomerConstants::HOST_YVES` and replace them with `\Spryker\Shared\Customer\CustomerConstants::BASE_URL_YVES`.
                
Find usages of `\Spryker\Zed\Customer\Communication\Form\AddressForm::setDefaultOptions`and replace with `\Spryker\Zed\Customer\Communication\Form\AddressForm::configureOptions`.
                
Find usages of `\Spryker\Zed\Customer\Dependency\Facade\CustomerToCountryInterface::getIdCountryByIso2Code`and replace with `\Spryker\Zed\Customer\Dependency\Facade\CustomerToCountryInterface::getCountryByIso2Code`.
                
Fins usages of `\Spryker\Zed\Customer\Business\CustomerFacadeInterface::forgotPassword` and replace with `\Spryker\Zed\Customer\Business\CustomerFacadeInterface::sendPasswordRestoreMail`.
                
Find usages of `\Spryker\Client\Customer\CustomerClientInterface::hasCustomerWithEmailAndPassword(...)`and replace with `\Spryker\Client\Customer\CustomerClientInterface::login(...)`.
                
Find usages of `\Spryker\Zed\Customer\Dependency\Service\CustomerToUtilSanitizeInterface`and replace with `\Spryker\Zed\Customer\Dependency\Service\CustomerToUtilSanitizeServiceInterface`.
                
`\Spryker\Zed\Customer\Business\Exception\CountryNotFoundException` is removed from the `Customer` module. Please make sure there are no usages in your code. Instead of it, `\Spryker\Zed\Country\Business\Exception\MissingCountryException`will be thrown, but take care that your code does not use Spryker exceptions to implement business logic.

## Upgrading from version 5.* to Version 6.* 

In the `Customer` module version 5, we changed how customer data is stored when order is placed, instead of a foreign key, now `customer_reference` is stored. Because of this you will have to migrate all your old orders.

## Upgrading from version 4.* to Version 5.0

Customer delete functionality has been added to the `Customer` module. These changes require DB migration (new customer fields) but not code changes to use the basic functionality.

### 1. Database Migration

* `vendor/bin/console propel:diff`, also manual review is necessary for the generated migration file.
* `vendor/bin/console propel:migrate`
* `vendor/bin/console propel:model:build`
* `vendor/bin/console transfer:generate`

After running the last command, you'll find a new field `anonymized_at` in entities `Orm\Zed\Customer\Persistence\SpyCustomer`, `Orm\Zed\Customer\Persistence\SpyCustomerAddress` and their transfer objects `Generated\Shared\Transfer\CustomerTransfer` and `Generated\Shared\Transfer\CustomerAddressTransfer`.


### 2. Plugin Integration
By default, we provide one plugin for Newsletter anonymization.
1. Make sure you have the `Newsletter` module version >=4.1.0 and 
`Spryker\Zed\Newsletter\Communication\Plugin\CustomerAnonymizer\CustomerUnsubscribePlugin` in your project.
2. Open your `CustomerDependencyProvider` or create a new one (if you don't have one in the path) `Pyz\Zed\Customer\CustomerDependencyProvider`. 
3. Add the `getCustomerAnonymizerPlugins` method with  `CustomerUnsubscribePlugin` to the execution stack as follows:

```php
<?php
namespace Pyz\Zed\Customer;

...

class Pyz\Zed\Customer\CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{

    /**
     * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerAnonymizerPluginInterface[]
     */
    protected function getCustomerAnonymizerPlugins()
    {
        return [
            new CustomerUnsubscribePlugin([
                NewsletterConstants::EDITORIAL_NEWSLETTER
            ])
        ];
    }
    
}
```

<!-- Last review date: Nov 13, 2017 by Denis Turkov -->
