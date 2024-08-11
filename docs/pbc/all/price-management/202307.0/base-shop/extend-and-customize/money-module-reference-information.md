---
title: "Money module: reference information"
last_updated: Aug 18, 2021
description: Spryker Commerce OS handles all monetary values as integer and provides conversions from decimal values to cent values and vice versa.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202108.0/prices-feature-walkthrough/money-module-reference-information.html
  - /docs/scos/dev/feature-walkthroughs/202307.0/prices-feature-walkthrough/money-module-reference-information.html
  - /docs/pbc/all/price-management/extend-and-customize/money-module-reference-information.html
---

{% info_block infoBox "Money" %}

Handling monetary values can be a problem and is often quite hard. The Money bundle makes it easier to work with monetary values.

{% endinfo_block %}

Spryker handles all monetary values as integers and provides conversions from decimal values to cent values and vice-versa.

The key feature of this module is to convert a `MoneyTransfer` into the proper string version of it, given the current locale and currency.

## Usage

The Money module is very straight forward and easy to use. `MoneyFacade` exposes the following methods:

- `MoneyFacade::fromInteger()`
- `MoneyFacade::fromFloat()`
- `MoneyFacade::fromString()`
- `MoneyFacade::formatWithCurrency()`
- `MoneyFacade::formatWithoutCurrency()`
- `MoneyFacade::convertIntegerToDecimal()`
- `MoneyFacade::convertDecimalToInteger()`

### MoneyFacade::from*() methods

Internally, a powerful implementation of the Money Pattern is used. Outside the Money module, you only see the MoneyTransfer, which encapsulates our internals.

To get a money object, call the `MoneyFacade::from*()` methods:

| MODULE | CALLED WITH |
| --- | --- |
| MoneyFacade::fromInteger(1000) | integer |
| MoneyFacade::fromInteger(1000, 'EUR') | integer and currency |
| MoneyFacade::fromFloat(10.00) | float |
| MoneyFacade::fromFloat(10.00, 'EUR') | float and currency |
| MoneyFacade::fromString('1000') | string |
| MoneyFacade::fromString('1000', 'EUR') | string and currency |

All of them return a `MoneyTransfer` with a `MoneyTransfer::$amount` of `‘1000'`.

{% info_block infoBox "" %}

The only difference between them is `MoneyTransfer::$currency`. This value differs if you pass a currency to the `MoneyFacade::from*()` methods or not.

{% endinfo_block %}

* In case you don't pass a currency, the currency configured as default is used.
* If you pass a specific currency, it is used instead of the one that's configured as default.

**`MoneyFacade::formatWithSymbol()`**

The `MoneyFacade::formatWithSymbol()` method accepts only one argument — a MoneyTransfer. It will return a string representation of the given object, considering the current locale.

{% info_block infoBox "Example" %}

* MoneyTransfer::$amount = 1000
* MoneyTransfer::$currency = ‘EUR'
* Current locale is de_DE
* The output would be 10,00 €
* If the current locale would be en_US, the output would be: €10.00 when passing the same object.

{% endinfo_block %}

**`MoneyFacade::formatWithoutSymbol()`**

`MoneyFacade::formatWithoutSymbol()` method has the same behavior as `MoneyFacade::formatWithSymbol()`, except the fact that the currency symbol is not included.

{% info_block infoBox "" %}

Then, for the above example, the output is `10,00` or `10.00`.

{% endinfo_block %}

**`MoneyFacade::convertIntegerToDecimal()`**

In some cases, you need a plain decimal representation of the value in integer (for example, cents). This can be useful, for example, for API calls.

**`MoneyFacade::convertDecimalToInteger()`**

In some cases, you need an integer (for example, cents) representation for a decimal value. This can be useful for storing monetary values in the database.

## Money collection form type

From Money version 2.2.*, you can have a money collection form type inside your forms which let you include a complex form collection that render a table with currency per store and gross/net price.

For example, add FormBuilder in your form type:

```php
/**
 * @param /Symfony/Component/Form/FormBuilderInterface $builder
 *
 * @return $this
 */
protected function addMoneyValueCollectionType(FormBuilderInterface $builder)
	{
    	$builder->add(
        	DiscountCalculatorTransfer::MONEY_VALUE_COLLECTION, //is the property in the main form you want to map. It must be transferred as in example
         	MoneyCollectionType::class,
            	[
                	MoneyCollectionType::OPTION_AMOUNT_PER_STORE => false, //If you want to render per store, set it to true
              	]
        );

        return $this;
	}
```

Also, modify the twig template to include the form money value collection table.

```twig
{% raw %} {{ form_money_collection(mainForm.moneyValueCollection) }} {% endraw %}
```

This renders the table with all currencies enabled in the store. You have to handle persistence yourself, which means that you have to save and read data to the `MoneyValueTransfer` collection.

{% info_block infoBox "" %}

The component provides only initial data.

{% endinfo_block %}

<!-- Last review date: Oct 6, 2017 by Aurimas Ličkus -->
