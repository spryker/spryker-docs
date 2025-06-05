---
title: Test framework
description: Spryker uses Codeception framework for running tests. Learn how to configure and use it in your project.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/test-framework
originalArticleId: e48e759c-0e27-4cfa-82f7-e34f82b2b6ad
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/test-framework.html
  - /docs/scos/dev/guidelines/testing/test-framework.html
related:
  - title: Available test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html
  - title: Code coverage
    link: docs/dg/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/dg/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html
  - title: Publish and Synchronization testing
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html
  - title: Setting up tests
    link: docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/using-test-helpers.html
  - title: Testify
    link: docs/dg/dev/guidelines/testing-guidelines/testify.html
  - title: Testing best practices
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
  - title: Testing concepts
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/testing-concepts.html
  - title: Testing console commands
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/test-console-commands.html
---

To easily test every aspect of Spryker and the code you write, Spryker uses the [Codeception testing framework](https://codeception.com/) and [PHPUnit](https://phpunit.de/).

{% info_block infoBox %}

We strongly recommend reading the documentation of both frameworks to get the best out of your tests.

{% endinfo_block %}

Codeception offers many handy things to write better and cleaner tests. Many solutions this framework has are built on top of PHPUnit. In the next articles, we will only reference Codeception even if these features are available in PHPUnit as well.

On top of Codeception, we have built the [Testify](https://github.com/spryker/testify/) module, which provides many handy helpers. See [Testify](/docs/dg/dev/guidelines/testing-guidelines/testify.html) for more details on Testify itself, and [Testify Helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#testify-helpers) for details on the existing Testify helpers.

## Basic test setup

To start running tests, you require a single `codeception.yml` file. Configuration provided in this file is used by default when executing the [vendor/bin/codecept run](#console-commands) command. This file, along with others, is included in the default Spryker installation and should be regarded as a starting point for your tests.

Here is an example of the `codeception.yml` file:

```yaml
namespace: PyzTest
actor: Tester

include:
    # This will include all codeception.yml's that can be found in the defined path
    - tests/PyzTest/*/*

...
```
## Configuration

The `codeception.yml` file at the root of your project is the main entry point for your tests. In this file, you define the basic configuration for your test suite.

In this file, you can include other `codeception.yml` files to organize your tests better.

Example:

```yml
namespace: PyzTest
actor: Tester

include:
    - tests/PyzTest/*/*
...
```

For an example, refer to [codeception.yml in Spryker Master Suite](https://github.com/spryker-shop/suite/blob/master/codeception.yml).

For more information, see [Codeception configuration documentation](https://codeception.com/docs/reference/Configuration).


{% info_block infoBox "Environment variables" %}

You can specify `.env` files with environment variables in the `codeception.yml` file. The environment variables help configure your system for specific conditions. For example, they can define the store under which tests should be executed:

```yml
params:
    - .env
    - .env.store-a.testing
```

{% endinfo_block %}

## Separating tests

In numerous scenarios, you will need to improve your test setup by separating it into logical groups. By default, all test groups are located in `tests/Pyz`.  The structure of items within this directory mirrors that of the `src` code:

```text
tests/
-- Pyz/
---- Glue/
---- Shared/
---- Yves/
---- Zed/
```

This structure is foundational in nearly all Spryker projects. All of the tests inside those directories are executed based on the configuration in the root `codeception.yml` file.

### Separating tests by namespace

Especially in the development environment, it often makes sense to separate tests by their application namespace. This approach lets you, for example, to run only Zed-related tests. To separate tests by namespaces, place the `codeception.yml` file into the `tests/Pyz/Zed` directory.

Here is an example of the `codeception.yml` file illustrating namespace-based separation:

```yml
namespace: PyzTest
actor: Tester

include:
    # This will include all codeception.yml's that can be found in the defined path for this specific application namespace
    - tests/PyzTest/Zed/*
...
```

### Separating tests by stores
Imagine you have a large code base, and you use stores to implement additional or different behavior from the standard module. Suppose you have 10 thousand tests that are testing all your code, but you wish to execute tests for a particular store. In this situation, there's no need to execute all tests twice—once for the default store and once for each individual store. Instead, you can execute your test suite once for the default store and then execute tests for the specific stores you require:

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;ac.draw.io\&quot; modified=\&quot;2023-08-22T10:37:03.721Z\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36\&quot; etag=\&quot;S2hL0IvwRyO6C0J7OFjW\&quot; version=\&quot;21.6.1\&quot; type=\&quot;embed\&quot;&gt;\n  &lt;diagram id=\&quot;-PcddZtNe2u36sAn28E2\&quot; name=\&quot;Page-1\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1050\&quot; dy=\&quot;568\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;850\&quot; pageHeight=\&quot;1100\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-10\&quot; value=\&quot;\&quot; style=\&quot;shape=flexArrow;endArrow=classic;html=1;rounded=0;strokeColor=#000000;fillColor=#000000;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry width=\&quot;50\&quot; height=\&quot;50\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;359.5\&quot; y=\&quot;160\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;360\&quot; y=\&quot;630\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-6\&quot; value=\&quot;\&quot; style=\&quot;shape=flexArrow;endArrow=classic;html=1;rounded=0;strokeColor=#000000;fillColor=#000000;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry width=\&quot;50\&quot; height=\&quot;50\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;269.5\&quot; y=\&quot;160\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;270\&quot; y=\&quot;630\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-5\&quot; value=\&quot;\&quot; style=\&quot;shape=flexArrow;endArrow=classic;html=1;rounded=0;strokeColor=#000000;fillColor=#000000;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry width=\&quot;50\&quot; height=\&quot;50\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;180\&quot; y=\&quot;160\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;180\&quot; y=\&quot;630\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-1\&quot; value=\&quot;Module A\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;120\&quot; y=\&quot;220\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-2\&quot; value=\&quot;Module A Store A\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;210\&quot; y=\&quot;290\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-3\&quot; value=\&quot;Module B\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;120\&quot; y=\&quot;360\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-4\&quot; value=\&quot;Module C\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;120\&quot; y=\&quot;430\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-7\&quot; value=\&quot;Default Store&amp;lt;br&amp;gt;Tests\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;135\&quot; y=\&quot;113\&quot; width=\&quot;90\&quot; height=\&quot;40\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-8\&quot; value=\&quot;Store A&amp;lt;br&amp;gt;Tests\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;240\&quot; y=\&quot;113\&quot; width=\&quot;60\&quot; height=\&quot;40\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-9\&quot; value=\&quot;Module C Store B\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;300\&quot; y=\&quot;500\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;qy1XQQReTDcXhqz7JYdl-11\&quot; value=\&quot;Store B&amp;lt;br&amp;gt;Tests\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;330\&quot; y=\&quot;113\&quot; width=\&quot;60\&quot; height=\&quot;40\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

You can achieve this by having separated `codeception.yml` files for the default store and for any other store.

As you can see, there are many ways to leverage Codeception configuration files to achieve fine-grained or coarse-grained groups based on your testing needs.

## Console commands

There are many console commands provided from Codeception, but the most used ones are:

- `vendor/bin/codecept build` - generates classes
- `vendor/bin/codecept run`  - executes all your tests

For information on other Codeception console commands, run `vendor/bin/codecept list`.

See [Executing Tests](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html) for details on some commands.

## Testing with Spryker

On top of Codeception, we have added a basic infrastructure for tests. We have divided our tests by the applications, and for the layer we test. Thus, the organization of tests in most cases looks like this:

* `tests/OrganizationTest/Application/Module/Communication` - for example, controller or plugin tests.
* `tests/OrganizationTest/Application/Module/Presentation` - for example, testing pages with JavaScript.
* `tests/OrganizationTest/Application/Module/Business` - for example, testing facades or models.

The **Communication** suite can contain unit and functional tests. The controller tests can be used to test like a user that interacts with the browser but without the overhead of the GUI rendering. This suite should be used for all tests that do not need JavaScript.

The **Business** suite can contain unit and functional tests. The facade test is one kind of an API test approach. For more information, see [Test API](/docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html#api-tests).

The **Presentation** suite contains functional tests that can be used to interact with a headless browser. These tests should be used when you have JavaScript on the page under test.

All test classes follow the exact same path as the class under test, except that tests live in the `tests` directory, and the organization part of the namespace is suffixed with `Test`. For example, `tests/PyzTest/*`. For details on the `tests` directory structure, see [Directory Structure](/docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html#directory-structure).

Each test suite contains a `codeception.yml`configuration file. This file includes, for example, [helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html) that are enabled for the current suite.

For example, check the organization in the [Application](https://github.com/spryker-shop/suite/tree/master/tests/PyzTest/Yves/Application) module of Spryker Master Suite.

## Next step

[Set up an organization of your tests](/docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html)
