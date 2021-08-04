---
title: HowTo - Integrate and Use Precise Decimal Numbers
originalLink: https://documentation.spryker.com/v6/docs/ht-integrate-and-use-precise-decimal-numbers
redirect_from:
  - /v6/docs/ht-integrate-and-use-precise-decimal-numbers
  - /v6/docs/en/ht-integrate-and-use-precise-decimal-numbers
---

The article provides information on how to install and work with precise decimal objects.
***
The `decimal-object` library allows you to work with precise decimal numbers. A decimal number is a number that is smaller than an integer. Decimal numbers can be used when more precision is required, while float numbers are imprecise and shouldn't be used for cases where exact precision is necessary. For example, when dealing with money (a price of a product), measuring weights or liquids (food or water respectively), and length (meters such as a cable), decimal numbers can be used.

## Why You Should Use Decimal Objects
Benefits of using decimal numbers are as follows:

* Managing long and short accurate values as needed.
* Supporting arithmetic, comparing, rounding, and casting operations.
* Representing objects instead of strings.
* Supporting exponential representation of the value.
* Being immutable: the operations construct a new decimal value and the value of the original decimal stays unchangeable. 

## Installation
To install the `{% raw %}{{{% endraw %}decimal-object{% raw %}}}{% endraw %}` library, composer can be used. For more information, see the [Decimal Object](https://github.com/spryker/decimal-object) documentation.

## How Decimal Numbers Work with Transfer Objects
You can specify Decimal as a type of your Data Transfer Object’s property. To define it, use the `decimal` type:  

```php
<transfer name="StockProduct">
    <property name="quantity" type="decimal"/>
</transfer>
```

For more information about how to work with Data Transfer Objects, see [Creating, Using and Extending the Transfer Objects](https://documentation.spryker.com/docs/ht-use-transfer-objects-201903).

## Creating a Decimal Value Object
Decimal objects can be created using one of the following types: int, numeric string (including numbers in exponential representation), float, objects that have the `__toString()` method defined and returning a numeric string, for example:

```php
$decimal = new Decimal(7);
$decimal = new Decimal(3.14);
$decimal = new Decimal('2.718');
$decimal = new Decimal('-.3');
$decimal = new Decimal('6.22e8');
```

As mentioned above, decimals are immutable. This means that arithmetic operations with decimals return a new decimal object without any impact on the original decimal object. Thus, the result of a decimal operation is always a new decimal.

## Using a Decimal Value Object in Arithmetic, Comparing, Casting, and Rounding Operations
Decimal objects can use decimal objects, plain integers, and string values. They support not only arithmetic operations but also can be used with comparing, casting, and rounding methods. Below you’ll find the explanation of each of them with some examples.

### Basic arithmetic operations
They always return a new Decimal object using the maximum precision of the object. Below you can see examples of using Decimal objects with different arithmetic methods:

1. **add():** Returns the sum of the decimal and the given value.

```php
$decimal = new Decimal(5);
$decimal = $decimal->add(5); //10

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$decimal = $decimalOne->add($decimalTwo); //5.858
```
2. **subtract():** Returns the subtraction of the decimal and given values.

```php
$decimal = new Decimal(5);
$decimal = $decimal->subtract(5); //0

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$decimal = $decimalOne->subtract($decimalTwo); //-0.422
```
3. **multiply():** Returns the multiplication of the decimal value by the given value.

```php
$decimal = new Decimal(5);
$decimal = $decimal->multiply(5); //25

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$decimal = $decimalOne->multiply($decimalTwo); //8.53452
```
4. **divide():** Returns the division of the decimal value by the given value.

```  php
$decimal = new Decimal(5);
$decimal = $decimal->divide(5, 3); //1.000

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$decimal = $decimalOne->divide($decimalTwo, 3); //0.865
```
5. **sqrt():** Extracts the square root of a decimal value.

```php
$decimal = new Decimal(144);
$decimal = $decimal->sqrt(); //12
```
6. **pow():** Raises a decimal value to power.

```php
$decimal = new Decimal(3);
$decimal = $decimal->pow(3); //27
```
7. **absolute():** Returns the absolute value of a number.

```php
$decimal = new Decimal(-17);
$decimal = $decimal->absolute(3); //17
```
8. **mod():** Returns the remainder of a division of any number type of the original decimal by another number type of the given decimal.

```php
$decimal = new Decimal(7);
$decimal = $decimal->mod(2); //1
```
9. **negate():** Returns a negative value of the decimal value.

```php
$decimal = new Decimal(7);
$decimal = $decimal->negate(); //-7
```
**Table of exceptions**
The table provides additional information about exceptions that may occur when working with decimal objects.

| Method | Exception | Description |
| --- | --- | --- |
| **add(), subtract(), multiply(), divide(), mod()** | `InvalidArgumentException` | Thrown if the given value is not a **decimal**, **float**, **string**, or **integer**. |
| **divide()** | `DivisionByZeroError` | Thrown if dividing by 0. |

### Comparing operations 
Decimal objects can be compared to the given values to check the equal or relative ordering of these values. You can determine whether the new decimal is positive or negative, equal or greater/less than a specified one.

1. **equals():** Returns *true* if the decimal value equals the specified value, otherwise *false*.

```php
$decimal = new Decimal(5);
$isEquals = $decimal->equals(5); //true

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$isEquals = $decimalOne->equals($decimalTwo); //false
```
2. **isPositive():** Returns *true* if the decimal value is positive, otherwise *false*.

```php
$decimal = new Decimal(5);
$isPositive = $decimal->isPositive(); //true
```
3. **isNegative():** Returns *true* if the decimal value is negative, otherwise *false*.

```php
$decimal = new Decimal(5);
$isNegative = $decimal->isNegative(); //false
```
4. **greaterThan():** Returns *true* if the decimal value is greater than the given value, otherwise *false*.

```php
$decimal = new Decimal(5);
$isGreater = $decimal->greaterThan(5); //false

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$isGreater = $decimalOne->greaterThan($decimalTwo); //false
```
5. **greaterThanOrEquals():** Returns *true* if the decimal value is greater or equals the given value, otherwise *false*.

```php
$decimal = new Decimal(5);
$isGreatherOrEquals = $decimal->greatherThanOrEquals(5); //true

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$isGreatherOrEquals = $decimalOne->greatherThanOrEquals($decimalTwo); //false
```
6. **lessThan():** Returns *true* if the decimal value is less than the given value, otherwise *false*.

```php
$decimal = new Decimal(5);
$isLess = $decimal->lessThan(5); //false

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$isLess = $decimalOne->lessThan($decimalTwo); //true
```
7. **lessThanOrEquals():** Returns *true* if the decimal value is less or equals the given value, otherwise *false*.

```php
$decimal = new Decimal(5);
$isLessOrEquals = $decimal->lessThanOrEquals(5); //true

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$isLessOrEquals = $decimalOne->lessThanOrEquals($decimalTwo); //true
```
8. **compareTo():** Returns the following:
* `-1` if the decimal value is less than $value

* `0` if the decimal value is equal to $value
* `1` if the decimal value is greater than $value.

where **$value** is the value being transferred in the method.

```php
$decimal = new Decimal(5);
$result = $decimal->compareTo(5); //0

$decimalOne = new Decimal(2.718);
$decimalTwo = new Decimal(3.14);
$result = $decimalOne->compareTo($decimalTwo); //-1
```

### Rounding operations
The rounding operations return a new decimal object value that rounds up or down to the original decimal value. The following methods can be used in the rounding mode for decimal objects:

1. **round():** Returns a rounded version of the given decimal value. 

{% info_block warningBox "Note" %}
Rounds follow the rules of mathematics.
{% endinfo_block %}

```php
$decimal = new Decimal(2.718);
$decimal = $decimal->round(2.718); //3
```
2. **floor():** Rounds the fractions of a decimal value down to the closest integer.

```php
$decimal = new Decimal(2.718);
$decimal = $decimal->floor(2.718); //2
```
3. **ceil():** Rounds fractions of a decimal value up to the closest integer.

```php
$decimal = new Decimal(2.718);
$decimal = $decimal->ceil(2.718); //3
```
4. **truncate():** Discards all digits behind the defined decimal point.

```php
$decimal = new Decimal(2.718);
$decimal = $decimal->truncate(2); //2.71
```

**Table of exceptions**

The table provides additional information about the exception that may be thrown when working with decimal objects in rounding operations.

| Method | Exception | Description |
| --- | --- | --- |
| **truncate()** | `InvalidArgumentException` | Thrown if the given scale is less than or equal to 0. |

### Casting operations
The casting operations convert decimal objects into simple data types: integer, float, or string using the following methods:

1. **toFloat():** Casts a decimal value to a float.

```php
$decimal = new Decimal(3.14);
$float = $decimal->toFloat(); //3.14
```
2. **toInt():** Casts a decimal value to an integer.

```php
$decimal = new Decimal(3.14);
$integer = $decimal->toInt(); //3
```
3. **toString():** Casts a decimal value to a string.

```php
$decimal = new Decimal(3.14);
$string = $decimal->toString(); //"3.14"
```
4. **toScientific():** Returns an exponential representation of the number.

```php
$decimal = new Decimal(3.14);
$string = $decimal->toScientific(); //"3.14e0"
```
5. **trim():** Trims trailing zeroes.

```php
$decimal = new Decimal(3.1400000);
$decimal = $decimal->trim(); //3.14
```

**Table of exceptions**

The table provides additional information about exceptions that may be thrown when working with decimal objects in casting operations.

| Method | Exception | Description |
| --- | --- | --- |
| **toInt()** | `TypeError` | Thrown if the integral part of the value is greater than `PHP_INT_MAX` or less than `PHP_INT_MIN`. |
| **toFloat()** | `TypeError` | Thrown if the integral or fractional part of the value is greater than `PHP_INT_MAX` or less than `PHP_INT_MIN`. |
