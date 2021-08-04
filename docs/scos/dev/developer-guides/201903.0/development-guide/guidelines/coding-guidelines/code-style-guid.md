---
title: Code Style Guide
originalLink: https://documentation.spryker.com/v2/docs/code-style-guide
redirect_from:
  - /v2/docs/code-style-guide
  - /v2/docs/en/code-style-guide
---

We follow the [PSR-2 standards](http://www.php-fig.org/psr/psr-2/). To achieve a styled codebase, we integrated the well known [PHP-CS Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) and [PHPCodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer).

## Code Sniffer and Fixer

We use a very powerful tool to help keeping the code clean and preventing simple mistakes.

### Automate Code Style Correction

The sniffer can find all the issues, and can also auto-fix most of them (when used with -f option).

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



Tip: `c:s:s` can be used as a shortcut.

**Additional options**:

* `-v:` Verbose output
* `-d:` Dry-run, only output the command to be run

Always commit your changes before executing this command!

Run `–help` or `-h` to get help about usage of all options available.

See the [code sniffer](https://github.com/spryker/code-sniffer) documentation for details and information on how to set it up for your CI system as a checking tool for each PR.

### Necessary Project Adjustments

Make sure you change the composer package name of your application, once you forked or copied the demoshop code. By default it reads this in the main `composer.json`:

```
 "name": "spryker/demoshop", 
```

Modify this in order to skip the MIT license checks.

The [code sniffer](https://github.com/spryker/code-sniffer) documentation shows how to extend and customize the sniffer rules in general for your project.

## Conventions and Guidelines

Always try to follow these best practices, they help to avoid certain classes of problems. These are more guidelines than absolute rules. If you feel the need to deviate from them, please document why you are doing so.

### Use Statements

Use statements must be ordered.

### Alias for Use

When you need an alias to use a Spryker class, follow this naming: use `Spryker\Foo\Bar as SprykerBar;`

Do not use `CoreBaror` any other naming.

### One Programming Language per File

Only ever use one programming language per file. This allows us to use language specific tooling on those files. This means no inline JavaScript or CSS, no generation of HTML in PHP, no execution of raw SQL statements from PHP. (Currently all *Table.php files are an exception to this, HTML is allowed here.)

### Comparison

Don’t use loose comparison, always be as strict as possible.

Bad

```php
<?php
if ($a == $b)
```



Good

```php
<?php
if ($a === $b)
```



For null checks use comparison to null instead of invoking method `is_null()`.

Bad

```php
<?php
if (is_null($variable))
```



Good

```php
<?php
if ($variable === null)
```



Don’t use Yoda conditions (reversed order) and don’t use inline assignment (assignment inside conditions). They easily introduce bugs.

Bad

```php
<?php
if (static::SOME_CONST === ($b = $a->getFoo()))
```



Good

```php
<?php
$b = $a->getFoo();
if ($b === static::SOME_CONST)
```



Only use `empty()` and `isset()` where the variable or array key could possibly not exist:

Bad

```php
<?php
$var = $this->getVar();
if (!$var) {
}
```



Good

```php
<?php
$var = $this->getVar();
if (empty($var)) {
}
```



You can also be more strict and use `!== null` check, especially if the returned value is either an object or not (null).

### Typecasting

Don’t use `intval()` or other casting functions. Use `(int)`, `(bool)`, etc.

Don’t use `!!` to cast to bool, use `(bool)`. There is no space after casts.

### String Functions

Always use the multibyte string functions when available ([Multibyte String Functions](http://php.net/manual/en/ref.mbstring.php)) and where non-ascii input is possible.

The performance costs are negligible and it makes it really easy to see where we might still use the wrong function.

### Switch Statements

Don’t use switch statements in PHP, they only do loose comparison and it’s easy to mess up the break.

### Return Early and Else

Return as soon as you know your method cannot do some meaningful work anymore. Reduce indentation by using `if/return` instead of a top-level `if/else`. Try to keep the “meat” of your method at the lowest indentation level. Using else is almost always a code smell. Read up on how to refactor to return early if you find yourself in deeply nested conditions.

### Return Types

All functions and methods need to declare a `@return` statement.

**The only exception**: Do not use return statements for constructor `__construct()` and destructor `__destruct()`, as per definition both of them cannot return anything.

Be explicit about your return type. Even though `return;` and return `null;` are technically the same, we make a semantic differentiation between them. This way we can also see when a return parameter was forgotten or someone tries to use a void method.

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



Bottom line: `void` if nothing is expected to be returned, `null` otherwise (or if mixed with others). Try to return only one type, mixed return types are often a code smell. Also, proper object is better than associative arrays most of the time.

### Avoid "no-op" Methods

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



The first would allow "no-ops" like `$this->foo()` which does not do any operation at all.

So semantically this makes no sense. In this case no default value may be used and a first argument is actually required for the first if statement to make sense (`$this->foo($requiredArgument)`). You can still pass `null`, of course, to break out early. Default values may only be used if their usage does make this method still do an operation (apart from returning `early`).

### Datetimes

Always use UTC Datetimes when you are storing and processing them. The only place Datetimes should be converted to a different timezone, is in the presentation layer.

### Deprecations

When you deprecate a method, class or alike, it is recommended to add a short sentence on what to use instead.

```php
<?php
/**
 * @deprecated Use Foo::bar() instead.
 */
```



So all people know immediately what to do without having to investigate deeper.

### Exceptions

Always throw custom exceptions from the module namespace. Never throw base exceptions.

This allows better handling of exceptions.

### Error Handling

Never use the error control operator (@).

### Environments and Configuration

If you have behavior that depends on the current environment, never check the environment directly. Use a configuration setting for that behavior and set it to the appropriate value for the environment. The environment should only affect the fact which configuration is used.

### Documentation Annotations

If a method returns `$this` (the class instance itself), please hint that in the doc comment with:

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

<!-- Last review date: Oct. 13th, 2017 by Mark Scherer -->
