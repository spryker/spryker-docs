---
title: Setting up Tests
originalLink: https://documentation.spryker.com/v6/docs/setting-up-tests
redirect_from:
  - /v6/docs/setting-up-tests
  - /v6/docs/en/setting-up-tests
---

To get all the things working, you need to prepare a proper organization for your tests. For this, you, first of all, have the root `codeception.yml` file . Its main responsibility is to include other `codecpetion.yml` files that contain the suite configuration. See [Configuration](https://documentation.spryker.com/docs/en/test-framework#configuration) for details.

### Directory Structure
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

Together with the [root configuration](https://documentation.spryker.com/docs/en/test-framework#configuration), you are now able to organize your tests in a way that each test suite can have its own helper applied and can be executed separately.

## Next Steps
* Learn about the [available test helpers](https://documentation.spryker.com/docs/available-test-helpers).
* [Create or enable a test helper](https://documentation.spryker.com/docs/test-helpers).

               
