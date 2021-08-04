---
title: Tutorial - Testing and TDD - Spryker Commerce OS
originalLink: https://documentation.spryker.com/2021080/docs/t-testing-tdd-scos
redirect_from:
  - /2021080/docs/t-testing-tdd-scos
  - /2021080/docs/en/t-testing-tdd-scos
---

{% info_block infoBox %}
This tutorial is also available on the Spryker Training web-site. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp
{% endinfo_block %} web-site.)

## Challenge Description
This task helps to understand the main concepts of testing with Spryker and see how simple it is to build tests. You will use the **Test-Driven Development (TDD)** approach.

Spryker's testing structure and data handling make it very easy to develop using TDD. You will build a simple module that reverses a string and test it.

Using TDD, you will write the test first, see it fails, and then write the string reverser that makes the test pass.

## 1. Build the test that fails
As everything in Spryker is modular, tests are also modular. To build a new test, you simply add a new module inside your tests. 

{% info_block warningBox %}
Spryker introduces a new namespace for testing in your project called **PyzTest**.
{% endinfo_block %}

As you are going to work with Zed, the test module will be for Zed:

1. Create a new test module inside the tests directory in you project `tests/PyzTest/Zed` and call it `StringReverser`.
2. Spryker uses `Codeception` as a testing framework. Using `Codeception`, add the config file for your new module inside `tests/PyzTest/Zed/StringReverser` and call it `codeception.yml`. The config looks like this:

**Code sample**
    
```php
namespace: PyzTest\Zed\StringReverser

paths:
    tests: .
    data: _data
    support: _support
    log: _output

coverage:
    enabled: true
    remote: false
    whitelist: { include: ['../../../../src/*'] }

suites:
    Business:
        path: Business
        class_name: StringReverserBusinessTester
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
4. Add the Business folder inside `tests/PyzTest/Zed/StringReverser`.
5. To generate the needed test classes from Codeception, run the command `vendor/bin/codecept build -c tests/PyzTest/Zed/StringReverser`.
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

7. Spryker can generate transfer objects for testing using a concept called **Data Builders**. Data Builders generators work similarly to transfer generators, except that they use data fakers to generate random data for testing purposes. You can generate Data Builders using the same transfer object schemas and running the command `console transfer:databuilder:generate`.

To add the data faker rules for the test we need to create a data builder schema. Inside `tests/`, create a new directory called `_data` and inside it add the data builder schema. Call it `string_reverser.databuilder.xml`.

{% info_block infoBox %}
The schema looks very similar to a transfer object schema. This schema will only add the rules when generating the data builders.
{% endinfo_block %}

{% info_block warningBox %}
Remember, you can generate the data builders without the rules and without the schema.
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

8. Data builders return transfer objects of the same type of the data builder. So, you need to have a transfer object called StringReverser in order for the data builder to work. 

Data builders cannot even be generated if the transfer object is not there. Add the `StringReverser` transfer inside `src/Pyz/Shared/StringReverser/Transfer`.

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

9. Run the command `console transfer:generate` to generate the transfer object first, then run the command `console transfer:databuilder:generate` to generate the data builder. 

You should have both of them generated by now.

10. It is time to add the test method. You will test if the string is reversed correctly. 

A test in Spryker consists of three main blocks:

* **Arrange** - to prepare the test data.
* **Act** - to act on the data.

{% info_block infoBox %}
In the case described in this tutorial, **Act** will be calling the facade method.
{% endinfo_block %}

* **Assert** - to check the results.

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

11. Run the test using the command `vendor/bin/codecept run -c tests/PyzTest/Zed/StringReverser`.

The test at this point should fail and give an error that the `StringReverserFacade` cannot be resolved because it does not exist.

## 2. Make the test pass
Now you can write the actual logic (feature) to reverse a string and make the test pass:

1. Add a new module in Zed called `StringReverser`. 
2. Add the facade and the needed logic to reverse the string in a model. Your Zed module should have a `StringReverserConfig` and a `StringReverserDependencyProvider` so that the class locator can work with you test. 

{% info_block warningBox %}
Use the code generators to generate the module in Zed console `code:generate:module:zed StringReverser`.
{% endinfo_block %}

**Code sample**
    
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

3. Run the test again `vendor/bin/codecept run -c tests/PyzTest/Zed/StringReverser`. The test should pass.
