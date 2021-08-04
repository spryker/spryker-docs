---
title: Setup tests
originalLink: https://documentation.spryker.com/v5/docs/setup-tests
redirect_from:
  - /v5/docs/setup-tests
  - /v5/docs/en/setup-tests
---

## Setup tests
To get all the good things working you need to prepare a proper setup for your tests. As already mentioned you will have a root `codeception.yml` which main responsebility is to include other `codecpetion.yml`'s that contain the suite configuration.

```
namespace: PyzTest
actor: Tester

include:
    - tests/PyzTest/*/*
```

### Directory structure
To organize your tests you have to follow this structure:

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
                
Together with the root configuration you will now be able to organize your tests in a way that each suite can have it's own helper applied and can be executed separately.
               
