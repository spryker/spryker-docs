The evaluation tool is a utility that performs automated quality checks against our own and industry standards.

## Installing the evaluation tool

To install the evaluation tool, run the following command:

```bash
1composer require --dev spryker-sdk/evaluator
```

## Using the evaluation tool

To get up-to-date information about using the evaluation tool, run the following command:

```bash
1docker/sdk cli evaluator
```

For detailed instructions, see [Running the evaluation tool](/docs/scos/dev/upgradability-services/running-the-evaluation-tool.html).

## How the evaluation tool works

The evaluation tool performs a number of checks that are based on the static analysis of our own and third-party tools. Currently, it performs the following checks:

- [Architecture Sniffer](https://github.com/spryker/architecture-sniffer)
- [Code Sniffer](https://github.com/spryker/code-sniffer)
- [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer)
- [PHPStan](https://github.com/phpstan/phpstan)
- [PHPMD](https://github.com/phpmd/phpmd)
- [Psalm](https://github.com/vimeo/psalm)

We attuned the third-party tools to Spryker, so the e[valuation tool checks that your code is up to date both with the industry and Spryker specific standards.

The evaluation tool provides you with informative output about your code. If all the checks you’ve run are successful, the tool returns a success message.

Example of a successful evaluation:

```bash
====================================================================================================
phpcs
----------------------------------------------------------------------------------------------------
Finished successfully
====================================================================================================
====================================================================================================
phpmd
----------------------------------------------------------------------------------------------------
Finished successfully
====================================================================================================
====================================================================================================
phpstan
----------------------------------------------------------------------------------------------------
Finished successfully
====================================================================================================
====================================================================================================
psalm
----------------------------------------------------------------------------------------------------
Finished successfully
====================================================================================================
Overall evaluation has been finished successfully
```

If one or more checks fail, the Evaluation tool returns the errors per check.


<details>
  <summary markdown='span'>Example of a failed evaluation</summary>

```bash
====================================================================================================
phpcs
----------------------------------------------------------------------------------------------------
................E 17 / 17 (100%)



FILE: ...tor.tool/src/Evaluator/Communication/Console/EvaluateConsole.php
----------------------------------------------------------------------
FOUND 3 ERRORS AFFECTING 2 LINES
----------------------------------------------------------------------
 24 | ERROR | [x] Found more than a single empty line between content
 25 | ERROR | [x] Expected 1 blank line between class members, found
    |       |     2.
 25 | ERROR | [x] Method does not have a docblock with return void
    |       |     statement: configure
----------------------------------------------------------------------
PHPCBF CAN FIX THE 3 MARKED SNIFF VIOLATIONS AUTOMATICALLY
----------------------------------------------------------------------

Time: 664ms; Memory: 14MB



Finished with errors
====================================================================================================
====================================================================================================
phpmd
----------------------------------------------------------------------------------------------------
Finished successfully
====================================================================================================
====================================================================================================
phpstan
----------------------------------------------------------------------------------------------------
Finished successfully
====================================================================================================
====================================================================================================
psalm
----------------------------------------------------------------------------------------------------
Finished successfully
====================================================================================================
Overall evaluation has been finished with errors
```

You can run the evaluation tool to perform all the checks or run a particular check. For example, if only one check returns an error, after troubleshooting it, you might run only the failed check.  

Example of running a particular check:

```bash
====================================================================================================
phpcs
----------------------------------------------------------------------------------------------------
................E 17 / 17 (100%)



FILE: ...tor.tool/src/Evaluator/Communication/Console/EvaluateConsole.php
----------------------------------------------------------------------
FOUND 1 ERROR AFFECTING 1 LINE
----------------------------------------------------------------------
 24 | ERROR | [x] Method does not have a docblock with return void
    |       |     statement: configure
----------------------------------------------------------------------
PHPCBF CAN FIX THE 1 MARKED SNIFF VIOLATIONS AUTOMATICALLY
----------------------------------------------------------------------

Time: 547ms; Memory: 14MB



Finished with errors
====================================================================================================
Overall evaluation has been finished with errors
```



## Next steps

[Running the evaluation tool](/docs/scos/dev/upgradability-services/running-the-evaluation-tool.html)
