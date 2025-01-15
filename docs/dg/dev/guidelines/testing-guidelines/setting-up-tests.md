---
title: Setting up tests
description: Learn how to set up an efficient organization for your tests for your Spryker based projects.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/setting-up-tests
originalArticleId: c8894db9-1871-41a4-a1fc-2c57d8de84c2
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/setting-up-tests.html
  - /docs/scos/dev/guidelines/testing/setting-up-tests.html
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
  - title: Test framework
    link: docs/dg/dev/guidelines/testing-guidelines/test-framework.html
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

To get all the things working, you need to prepare a proper organization for your tests. For this, you, first of all, have the root `codeception.yml` file . Its main responsibility is to include other `codeception.yml` files that contain the suite configuration. See [Configuration](/docs/dg/dev/guidelines/testing-guidelines/test-framework.html#configuration) for details.

### Directory structure

To organize your tests, follow this structure of the tests directory:

```
tests/
    PyzTest/
        ApplicationA/
            ModuleA/
                Communication/
                Presentation/
                ...
                codeception.yml
        ApplicationB
            ModuleA
                Communication/
                Presentation/
                Business/
                ...
                codeception.yml
```

Check out the organization within the [tests/PyzTest/](https://github.com/spryker-shop/suite/tree/master/tests/PyzTest) directory in Spryker Master Suite for example.

Together with the [root configuration](/docs/dg/dev/guidelines/testing-guidelines/test-framework.html#configuration), you are now able to organize your tests in a way that each test suite can have its own helper applied and can be executed separately.

## Next steps

* Learn about the [available test helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html).
* [Create or enable a test helper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html).
