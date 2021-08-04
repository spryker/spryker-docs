---
title: Money
originalLink: https://documentation.spryker.com/v2/docs/money
redirect_from:
  - /v2/docs/money
  - /v2/docs/en/money
---

{% info_block infoBox "Money" %}
Handling monetary values can be a problem and is often quite hard. The Money bundle makes it easier to work with monetary values.
{% endinfo_block %}


Spryker handles all monetary values as integer and provides conversions from decimal values to cent values and vice versa.

The key feature of this module is to convert a `MoneyTransfer` into the proper string version of it, given the current locale and currency.


## Usage
The Money module is very straight forward and easy to use. The MoneyFacade exposes the following methods:

- `MoneyFacade::fromInteger()`
- `MoneyFacade::fromFloat()`
- `MoneyFacade::fromString()`
- `MoneyFacade::formatWithCurrency()`
- `MoneyFacade::formatWithoutCurrency()`
- `MoneyFacade::convertIntegerToDecimal()`
- `MoneyFacade::convertDecimalToInteger()`

### MoneyFacade::from*() methods

Internally we use a powerful implementation of the Money Pattern. Outside the Money module you will only see the MoneyTransfer which encapsulates our internals.

To get a money object you can call the `MoneyFacade::from*()` methods:

| Module | Called with |
| --- | --- |
| MoneyFacade::fromInteger(1000) | integer |
| MoneyFacade::fromInteger(1000, 'EUR') | integer and currency |
| MoneyFacade::fromFloat(10.00) | float |
| MoneyFacade::fromFloat(10.00, 'EUR') | float and currency |
| MoneyFacade::fromString('1000') | string |
| MoneyFacade::fromString('1000', 'EUR') | string and currency |

All of them will return a `MoneyTransfer` with a `MoneyTransfer::$amount` of `‘1000’`.

{% info_block infoBox %}
The only difference between them is the `MoneyTransfer::$currency`. This value differs if you pass a currency to the `MoneyFacade::from*(
{% endinfo_block %}` methods or not.)

* In case you don’t pass a currency, the currency configured as default one will be used.
* If you pass a specific currency, it will be used instead of the one that’s configured as default one.

**`MoneyFacade::formatWithSymbol()`**
`MoneyFacade::formatWithSymbol()` method accepts only one argument - a MoneyTransfer. It will return a string representation of the given object, considering the current locale.

{% info_block infoBox "Example:" %}
MoneyTransfer::$amount = 1000<br>MoneyTransfer::$currency = ‘EUR’<br>Current locale is de_DE<br>The output would be 10,00 €<br>If the current locale would be en_US, the output would be: €10.00 when passing the same object.
{% endinfo_block %}

**`MoneyFacade::formatWithoutSymbol()`**
`MoneyFacade::formatWithoutSymbol()` method has the same behavior as the `MoneyFacade::formatWithSymbol()`, except of the fact that the currency symbol is not included.

{% info_block infoBox %}
The output would then be `10,00` or `10.00` for the above example.
{% endinfo_block %}

**`MoneyFacade::convertIntegerToDecimal()`**
In some cases you will need a plain decimal representation of the value in integer (e.g. cents). This can be useful e.g. for API calls.

**`MoneyFacade::convertDecimalToInteger()`**
In some cases you will need an integer (e.g. cents) representation for a decimal value. This can be useful when you want to store monetary values in the database.

## Money Collection Form Type
From Money version 2.2.*, you can have money collection form type inside your forms which will allow to include complex form collection that will render table with currency per store and gross/net price.

For example, add FormBuilder in your form Type:

```php
/**
 * @param \Symfony\Component\Form\FormBuilderInterface $builder
 *
 * @return $this
 */
protected function addMoneyValueCollectionType(FormBuilderInterface $builder)
	{
    	$builder->add(
        	DiscountCalculatorTransfer::MONEY_VALUE_COLLECTION, //is the property in the main form you want to map. It should be transferred as in example
         	MoneyCollectionType::class,
            	[
                	MoneyCollectionType::OPTION_AMOUNT_PER_STORE => false, //If you want to render per store, set it to true
              	]
        );

        return $this;
	}
```

Also, you need to modify twig template to include form money value collection table.

```
{% raw %}{{{% endraw %} form_money_collection(mainForm.moneyValueCollection) {% raw %}}}{% endraw %}
```

This will render table with all currencies enabled in store. You have to handle persistence yourself, which means that you have to save and read data to `MoneyValueTransfer` collection.

{% info_block infoBox %}
Component provides only initial data.
{% endinfo_block %}

<!-- Last review date: Oct 6, 2017 by Aurimas Ličkus -->
