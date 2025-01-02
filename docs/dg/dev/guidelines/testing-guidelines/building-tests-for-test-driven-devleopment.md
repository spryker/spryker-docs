---
title: Building tests for test-driven development
description: Use the tutorial to understand how testing concepts work with Spryker by using the test-driven development approach.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-testing-tdd-scos
originalArticleId: 1bc316e9-d1d2-4514-af9e-7459a9c97fa0
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-testing-and-tdd-spryker-commerce-os.html
---

This document helps you understand the main concepts of testing with Spryker and see how simple it is to build tests. You will use the *test-driven development (TDD)* approach.

Spryker's testing structure and data handling make it very easy to develop using TDD. You will build a simple module that reverses a string and test it.

Using TDD, you will write the test first, see it fail, and then write the string reverser that makes the test pass.

## 1. Build the test that fails

As everything in Spryker is modular, tests are also modular. To build a new test, you simply add a new module inside your tests.

{% info_block warningBox %}

Spryker introduces a new namespace for testing in your project called `PyzTest`.

{% endinfo_block %}

As you are going to work with Zed, the test module is for Zed:

1. Create a new test module inside the tests directory in you project `tests/PyzTest/Zed` and call it `StringReverser`.
2. Spryker uses `Codeception` as a testing framework. In `tests/PyzTest/Zed/StringReverser`, using `Codeception`, add the config file for your new module and call it `codeception.yml`. The config looks like this:

```php
namespace: PyzTest\Zed\StringReverser

paths:
    tests: .
    data: _data
    support: _support
    output: _output

coverage:
    enabled: true
    remote: false
    whitelist: { include: ['../../../../src/*'] }

suites:
    Business:
        path: Business
        actor: StringReverserBusinessTester
        modules:
            enabled:
                - Asserts
                - \PyzTest\Shared\Testify\Helper\Environment
                - \SprykerTest\Shared\Testify\Helper\LocatorHelper:
                    projectNamespaces: ['Pyz']
```

3. Add modules `Config` and `DependencyProvider`:

```php
namespace Pyz\Zed\StringReverser;

use Spryker\Zed\Kernel\AbstractBundleConfig;

class StringReverserConfig extends AbstractBundleConfig
{

}


namespace Pyz\Zed\StringReverser;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;

class StringReverserDependencyProvider extends AbstractBundleDependencyProvider
{

}
```

4. Add the `Business` folder inside `tests/PyzTest/Zed/StringReverser`.
5. From `Codeception`, generate the needed test classes:
```bash
vendor/bin/codecept build -c tests/PyzTest/Zed/StringReverser
```

6. Create a facade test class to add your test inside it. The facade test class looks like this:

**Code sample**

```php
namespace PyzTest\Zed\StringReverser\Business;

use Codeception\Test\Unit;

/**
 * @group PyzTest
 * @group Zed
 * @group StringReverser
 * @group Business
 * @group Facade
 * @group StringReverserFacadeTest
 * Add your own group annotations below this line
 */
class StringReverserFacadeTest extends Unit
{
	/**
	 * @var \PyzTest\Zed\StringReverser\StringReverserBusinessTester
	 */
	protected $tester;
}
```

7. Spryker can generate transfer objects for testing using a concept called *Data Builders**. Data Builders generators work similarly to transfer generators, except that they use data fakers to generate random data for testing purposes. You can generate Data Builders using the same transfer object schemas and running the command `console transfer:databuilder:generate`.

To add the data faker rules for the test, create a data builder schema. Inside `tests/`, create a new directory called `_data`. Then, add the data builder schema inside the directory and call it `string_reverser.databuilder.xml`.

{% info_block infoBox %}

The schema looks very similar to a transfer object schema. This schema only adds the rules when generating the data builders.

You can generate the data builders without the rules and without the schema.

{% endinfo_block %}

**Code sample**

```xml
<?xml version="1.0"?>
	<transfers
		xmlns="spryker:transfer-01"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd"
	>

	<transfer name="StringReverser">
		<property name="originalString" dataBuilderRule="realText(20, 2)"/>
		<property name="reversedString" dataBuilderRule="realText(20, 2)"/>
        </transfer>

    </transfers>
```

8. Data builders return transfer objects of the same type of the data builder. You need to have a transfer object called `StringReverser` so that the data builder can work.

Data builders cannot even be generated if the transfer object is not there. In `src/Pyz/Shared/StringReverser/Transfer`, add the `StringReverser` transfer.

**Code sample**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

	<transfer name="StringReverser">
		<property name="originalString" type="string"/>
		<property name="reversedString" type="string"/>
	</transfer>
</transfers>
```

9. Generate the transfer object first:
```bash
console transfer:generate
```

10. Generate the data builder:
```bash
console transfer:databuilder:generate
```

You must have both of them generated.

11. Add the test method. Test if the string is reversed correctly.

A test in Spryker consists of three main blocks:

* *Arrange*—to prepare the test data.
* *Act*—to act on the data.

{% info_block infoBox %}

In the case described in this tutorial, *Act* calls the facade method.

{% endinfo_block %}

* *Assert*—to check the results.

**Code sample**

```php
/**
 * @return void
 */
public function testStringIsReversedCorrectly(): void
{
	// Arrange
	$stringReverserTransfer = (new StringReverserBuilder([
		'originalString' => 'Hello Spryker!'
	]))->build();

	// Act
	$stringReverserFacade = $this->tester->getLocator()->stringReverser()->facade();
	$stringReverserResultTransfer = $stringReverserFacade->reverseString($stringReverserTransfer);

	// Assert
	$this->assertEquals(
		'!rekyrpS olleH',
		$stringReverserResultTransfer->getReversedString()
	);
}
```

12. Run the test using the command `vendor/bin/codecept run -c tests/PyzTest/Zed/StringReverser`.

The test at this point must fail and give an error that the `StringReverserFacade` cannot be resolved because it does not exist.

## 2. Make the test pass

Write the actual logic (feature) to reverse a string and make the test pass:

1. In Zed, add a new module called `StringReverser`.
2. Add the facade and the needed logic to reverse the string in a model. Your Zed module must have `StringReverserConfig` and `StringReverserDependencyProvider` so that the class locator can work with your test.

{% info_block warningBox %}

Use the code generators to generate the module in Zed console `code:generate:module:zed StringReverser`.

{% endinfo_block %}

<details><summary>Code samples</summary>

```php
namespace Pyz\Zed\StringReverser\Business;

use Generated\Shared\Transfer\StringReverserTransfer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\StringReverser\Business\StringReverserBusinessFactory getFactory()
 */
class StringReverserFacade extends AbstractFacade implements StringReverserFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\StringReverserTransfer $stringReverserTransfer
     *
     * @return \Generated\Shared\Transfer\StringReverserTransfer
     */
    public function reverseString(StringReverserTransfer $stringReverserTransfer): StringReverserTransfer
    {
        return $this->getFactory()
            ->createStringReverser()
            ->reverse($stringReverserTransfer);
    }
}
```

```php
namespace Pyz\Zed\StringReverser\Business;

use Pyz\Zed\StringReverser\Business\Reverser\StringReverser;
use Pyz\Zed\StringReverser\Business\Reverser\StringReverserInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class StringReverserBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\StringReverser\Business\Reverser\StringReverserInterface
     */
    public function createStringReverser(): StringReverserInterface
    {
        return new StringReverser();
    }
}
```

```php
namespace Pyz\Zed\StringReverser\Business\Reverser;

use Generated\Shared\Transfer\StringReverserTransfer;

class StringReverser implements StringReverserInterface
{
    /**
     * @param \Generated\Shared\Transfer\StringReverserTransfer $stringReverserTransfer
     *
     * @return \Generated\Shared\Transfer\StringReverserTransfer
     */
    public function reverse(StringReverserTransfer $stringReverserTransfer): StringReverserTransfer
    {
        $reversedString = strrev($stringReverserTransfer->getOriginalString());
        $stringReverserTransfer->setReversedString($reversedString);

        return $stringReverserTransfer;
    }
}
```

</details>

3. Run the test again
```bash
vendor/bin/codecept run -c tests/PyzTest/Zed/StringReverser
```

 The test must pass.
