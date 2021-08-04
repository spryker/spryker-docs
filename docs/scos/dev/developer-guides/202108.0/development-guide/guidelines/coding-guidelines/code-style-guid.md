---
title: Code style guide
originalLink: https://documentation.spryker.com/2021080/docs/code-style-guide
redirect_from:
  - /2021080/docs/code-style-guide
  - /2021080/docs/en/code-style-guide
---

We at Spryker follow the [PSR-2 standards](http://www.php-fig.org/psr/psr-2/) as the coding style guide. To achieve a styled codebase, we integrated the well known [PHP-CS Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) and [PHPCodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer).

## Code Sniffer and Fixer
[Code Sniffer](https://documentation.spryker.com/docs/code-sniffer) helps to keep the code clean and to prevent simple mistakes. To make the most of the Code Sniffer, follow the recommendations below.

### Automate code style correction

The sniffer can find all the issues and auto-fix most of them (when used with `-f` option):

```php
$ vendor/bin/console code:sniff:style
 
// Fix fixable errors instead of just reporting
$ vendor/bin/console code:sniff:style -f

// Sniff a specific module in your project (looks into all application layers Zed, Yves, Client, ...)
$ vendor/bin/console code:sniff:style -m Discount

// Sniff a specific subfolder of your project
$ vendor/bin/console code:sniff:style src/Pyz/Zed
 
// Run a specific sniff only
$ vendor/bin/console code:sniff:style ... -s Spryker.Commenting.FullyQualifiedClassNameInDocBlock
```

 {% info_block infoBox "Tip" %}

`c:s:s` can be used as a shortcut.

{% endinfo_block %}

Additional options:

* `-v:` Verbose output
* `-d:` Dry-run, only output the command to be run

{% info_block warningBox "Important" %}

Always commit your changes before executing this command!

{% endinfo_block %}

Run `–help` or `-h` to get help about the usage of all the available options.

See the [code sniffer](https://github.com/spryker/code-sniffer) documentation for details and information on how to set it up for your CI system as a checking tool for each PR.

### Make the necessary project adjustments

Make sure you change the composer package name of your application once you forked or copied the Demo Shop code. By default, the tool reads the name in the main `composer.json`:

```
 "name": "spryker/demoshop", 
```

Modify this in order to skip the MIT license checks.

The [code sniffer](https://github.com/spryker/code-sniffer) documentation shows how to extend and customize the sniffer rules in general for your project.

## Conventions and guidelines

We highly recommend following the best practices described below, as they help you to avoid certain classes of problems. These are more guidelines than absolute rules. If you feel the need to deviate from them, please document why you are doing so.

### Use statements

Use statements must be ordered.

### Alias for use

When you need an alias to use a Spryker class, follow this naming: use `Spryker\Foo\Bar as SprykerBar;`

Do not use `CoreBar` or any other naming.

### One Programming language per file

Always use one programming language per file. This allows us to use language-specific tooling on those files. This means no inline JavaScript or CSS, no generation of HTML in PHP, no execution of raw SQL statements from PHP. (Currently, all *Table.php files are an exception to this, HTML is allowed here.)

### Comparison

Don’t use loose comparison, always be as strict as possible.

Bad:

```php
<?php
if ($a == $b)
```

Good:

```php
<?php
if ($a === $b)
```



For null checks, use comparison to null instead of invoking method `is_null()`.

Bad:

```php
<?php
if (is_null($variable))
```

Good:

```php
<?php
if ($variable === null)
```


Don’t use Yoda conditions (reversed order), and don’t use inline assignment (assignment inside conditions). They easily introduce bugs.

Bad:

```php
<?php
if (static::SOME_CONST === ($b = $a->getFoo()))
```

Good:

```php
<?php
$b = $a->getFoo();
if ($b === static::SOME_CONST)
```

Only use `empty()` and `isset()` where the variable or array key could possibly not exist:

Bad:
```php
<?php
$var = $this->getVar();
if (empty($var)) {
}
```

Good:

```php
<?php
$var = $this->getVar();
if (!$var) {
}
```

You can also be more strict and use `!== null` check, especially if the returned value is either an object or not (null).

### Typecasting

Don’t use `intval()` or other casting functions. Use `(int)`, `(bool)`, etc.

Don’t use `!!` to cast to bool, use `(bool)`. There is no space after casts.

### String functions

Always use the multibyte string functions when available ([Multibyte String Functions](http://php.net/manual/en/ref.mbstring.php)) and where non-ASCII input is possible.

The performance costs are negligible, but you can easily see where you might still use the wrong function.

### Switch statements

Don’t use switch statements in PHP. They only make loose comparisons, and it’s easy to mess up the break.

### Return early and else

Return as soon as you know your method cannot do some meaningful work anymore. Reduce indentation by using `if/return` instead of the top-level `if/else`. Try to keep the body of your method at the lowest indentation level. Using `else` is almost always a code smell. Read up on how to refactor to return `early` if you find yourself in deeply nested conditions.

### Return types

All functions and methods need to declare a `@return` statement.

{% info_block warningBox "The only exception" %}

Do not use return statements for constructor `__construct()` and destructor `__destruct()`, as per definition both of them cannot return anything.

{% endinfo_block %}

Be explicit about your return type. Even though `return;` and `return null;` are technically the same, we make a semantic differentiation between them. This way, we can also see when a return parameter was forgotten or someone tries to use a void method.

```php
<?php
/**
 * @return void
 */
public function doNotReturnSth()
{
    if ($this->returnEarly()) {
        return;
    }
    // ...
}
 
/**
 * @return Object|null
 */
public function doReturnSth()
{
    if ($this->shouldReturnEarly()) {
        return null;
    }
    $object = ...;
 
    return $object;
}
```


Bottom line: use `void` if nothing is expected to be returned, use `null` otherwise, or if mixed with others. Try to return only one type, as mixed return types are often a code smell. Also, a proper object is better than associative arrays most of the time.

### Avoid "no-op" methods

```php
<?php
/*
 * //Bad
 *
 * @param string|null $input
 *
 * @return void
 */
public function foo($input = null)
{
    if ($input === null) {
        return;
    }
    ...
}
 
/*
 * //Good
 *
 * @param string|null $input
 *
 * @return void
 */
public function foo($input)
{
    if ($input === null) {
        return;
    }
    ...
}
```



The first example in the code above would allow "no-ops" like `$this->foo()`, which does not do any operation at all.

So semantically, this makes no sense. In this case, no default value may be used, and a first argument is actually required for the first *if* statement to make sense (`$this->foo($requiredArgument)`). You can still pass `null`, of course, to break out early. Default values may only be used if they still make this method do an operation (apart from returning `early`).

### Datetimes

Always use UTC Datetimes when you are storing and processing them. The only place Datetimes should be converted to a different timezone is in the Presentation layer.

### Deprecations

When you deprecate a method, class, or alike, it is recommended to add a short sentence on what to use instead, so all people know what to do without having to investigate deeper.

```php
<?php
/**
 * @deprecated Use Foo::bar() instead.
 */
```


### Exceptions

Always throw custom exceptions from the module namespace. Never throw base exceptions.
This allows for better handling of exceptions.

### Error Handling

Never use the error control operator (@).

### Environments and configuration

If you have behavior that depends on the current environment, never check the environment directly. Use a configuration setting for that behavior and set it to the appropriate value for the environment. The environment should only affect the fact which of configuration is used.

### Documentation annotations

If a method returns `$this` (the class instance itself), hint that in the doc comment with:

```php
<?php
/**
 * @return $this
 */
```

We group the doc block types, so there is space around the params, and the order is:

```php
<?php
/**
 * @param ...
 * @param ...
 *
 * @throws ...
 *
 * @return ...
 */
```

All classes use FQCN in doc block annotations. We only outline exceptions in annotations for them being thrown in the same method.

## Naming conventions for projects
For projects, we recommend sticking to naming conventions of variables and methods as described below.

### Naming of variables

| Nave of a variable | Expected content and type |
| --- | --- |
| $userEntity | Propel user entity (PyzUser) |
| $userEntityTransfer | Transfer object of the Propel user entity PyzUserEntityTransfer |
| $userTransfer | User transfer object |
| $userEntities</br>$userEntityCollection  | Collection of transfer objects of the Propel user entity |
| $email | Scalar (string or int) |
| $idUser | User ID (int) |
| $userIds | plural for user IDs (int[ ]) |
| $users | Array with the user-releated data |
| $isValidatedPassword</br>$hasPassword | boolean |
| $i, $j, $x, $y, $k, $m | Pointer in loops |

### Naming of methods

| Type | Method |
| --- | --- |
| singular | getFoo() / setFoo() |
| plural | getFoos() / setFoos() |
| boolean | getIsActive() / setIsActive(), </br> optionally hasActive() to only check |
| Find or not (nullable) | find...() |
| Get or throw exception (not nullable), applies to empty collection returns) | get...() |
| Check if exists - usually used with get | has....() |
| Check if something non-specific exists | ...Exists() |
| Retrieves a transfer object of a propel object (`PyzUserEntityTransfer`) | getUserEntity() |
| Retrieves a custom user transfer object | getUser()</br>getUserTransfer() |
| Get an indexed array of single values/objects (one key - one value) | getXXXIndexedByYYY() </br> For example, getProductNamesIndexedByIdProduct(array $productAbstracts) |
| Get an array of value/object collection grouped by some criteria (one key - multiple values)	| getXXXGroupedByYYY()</br> For example, getOrderItemsGroupedByIdShipment(array $orderItems) |
