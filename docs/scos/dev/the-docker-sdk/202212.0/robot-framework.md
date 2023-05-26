---
title: Running tests with the Robot Framework
description: Learn how to run tests with the Robot Framework.
last_updated: May 26, 2023
template: howto-guide-template
related:
  - title: The Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/the-docker-sdk.html
  - title: Docker SDK quick start guide
    link: docs/scos/dev/the-docker-sdk/page.version/docker-sdk-quick-start-guide.html
  - title: Docker environment infrastructure
    link: docs/scos/dev/the-docker-sdk/page.version/docker-environment-infrastructure.html
  - title: Configuring services
    link: docs/scos/dev/the-docker-sdk/page.version/configure-services.html
  - title: Docker SDK configuration reference
    link: docs/scos/dev/the-docker-sdk/page.version/docker-sdk-configuration-reference.html
  - title: Choosing a Docker SDK version
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-debugging-in-docker.html
  - title: Running tests with the Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
---

This document describes how use Robot Framework for running tests.

## How to run tests
Robot Framework test cases are executed from the command line, and the end result is, by default, an output file in XML format and an HTML report and log. After the execution, output files can be combined and otherwise post-processed with the Rebot tool.

**Basic usage example:**
`docker/sdk robot-framework robot -v env:{ENVIRONMENT} {PATH}`

### Supported CLI Parameters

| Parameter | Comment| Example | Required |
|:--- |:--- |:--- |:--- |
| `-v env:{env}` | Environment variable. Demo data, locators and hosts in tests depend on this variable value. **It's crucial to pass the env variable as tests fully depend on it.** Supported parameters are: `api_b2b`, `api_b2c`, `api_mp_b2b`, `api_mp_b2c`, `api_suite`, `ui_b2b`, `ui_b2c`, `ui_mp_b2b`, `ui_mp_b2c`, `ui_suite`| `docker/sdk robot-framework robot -v env:api_b2b -s tests.api.b2b.glue .` | **yes** |
| `-v db_engine:{engine}`| Depending on your system setup, you can run tests against MySQL or PostgreSQL. Possible values: `mysql` or `postgresql`. **Default:** `mysql`| `docker/sdk robot-framework robot -v env:api_b2b -v db_engine:postgresql -s tests.api.b2b.glue .` | optional |
| `-v db_host:{host}`| Depending on your system setup, you can specify db_host if it differs from the default one. **Default:** `127.0.0.1`| `docker/sdk robot-framework robot -v env:api_b2b -v db_host:127.2.3.4 -s tests.api.b2b.glue .` | optional |
| `-v db_port:{port}`| Depending on your system setup, you can specify db_port if it differs from the default one. **Default MariaDB:** `3306` / **Default PostgreSQL:** `5432`| `docker/sdk robot-framework robot -v env:api_b2b -v db_port:3390 -s tests.api.b2b.glue .` | optional |
| `-v db_user:{user}`| Depending on your system setup, you can specify db_user if it differs from the default one. **Default:** `spryker`| `docker/sdk robot-framework robot -v env:api_b2b -v db_user:fake_user -s tests.api.b2b.glue .` | optional |
| `-v db_password:{pwd}`| Depending on your system setup, you can specify db_password if it differs from the default one. **Default:** `secret`| `docker/sdk robot-framework robot -v env:api_b2b -v db_password:fake_password -s tests.api.b2b.glue .` | optional |
| `-v db_name:{name}`| Depending on your system setup, you can specify db_name if it differs from the default one. **Default:** `eu-docker`| `docker/sdk robot-framework robot -v env:api_b2b -v db_name:fake_name -s tests.api.b2b.glue .` | optional |
| `-s test_suite_name` | Test suite name is the name of any subfolder in tests folder (without path) or filename (without extension). If specified, tests from that folder/file folder will be executed.| `docker/sdk robot-framework robot -v env:api_b2b -s tests.api.b2b.glue .` | optional |
| `-v yves_env:{URL}` | You can specify Yves URL if you would like to run your tests on cloud environment| `docker/sdk robot-framework robot -v env:ui_b2c -v yves_env:http://example.com tests/ui/e2e/e2e_b2c.robot`| optional |
| `-v yves_at_env:{URL}` | You can specify Yves AT store URL if you would like to run your tests on cloud environment| `docker/sdk robot-framework robot -v env:ui_b2c -v yves_env:http://example.com -v yves_at_env:http://at.example.com tests/ui/e2e/e2e_b2c.robot`| optional |
| `-v zed_env:{URL}` | You can specify Zed URL if you would like to run your tests on cloud environment| `docker/sdk robot-framework robot -v env:ui_b2c -v yves_env:http://example.com -v zed_env:http://bo.example.com tests/ui/e2e/e2e_b2c.robot`| optional |
| `-v glue_env:{URL}` | You can specify Glue URL if you would like to run your tests on cloud environment| `docker/sdk robot-framework robot -v env:api_b2c -v glue_env:http://glue.example.com -s tests.api.b2c.glue .`| optional |
| `-v bapi_env:{URL}` | You can specify BAPI URL if you would like to run your tests on cloud environment| `docker/sdk robot-framework robot -v env:api_b2c -v glue_env:http://glue.example.com -v bapi_env:http://bapi.example.com -s tests.api.b2c.bapi .`| optional |
| `-v mp_env:{URL}` | You can specify Merchant Portal URL if you would like to run your tests on cloud environment| `docker/sdk robot-framework robot -v env:ui_mp_b2c -v yves_env:http://example.com -v zed_env:http://bo.example.com -v mp_env:http://mp.example.com tests/ui/e2e/e2e_mp_b2c.robot`| optional |
| `-v browser:{browser}`| Defines in which browser run tests. Possible values: `chromium`,`firefox`, `webkit`. **Default:** `chromium`| `docker/sdk robot-framework robot -v env:ui_mp_b2c -v browser:firefox tests/ui/e2e/e2e_mp_b2c.robot` | For UI tests only. optional |
| `-v headless:{headless}` |Defines if the browser should be launched in the headless mode. Possible values: `true`,`false`. **Default:** `true`| `docker/sdk robot-framework robot -v env:ui_mp_b2c -v headless:false tests/ui/e2e/e2e_mp_b2c.robot` | For UI tests only. optional |
| `-v browser_timeout:{timeout}` |Default time for Implicit wait in UI tests. **Default:** `60s`| `docker/sdk robot-framework robot -v env:ui_mp_b2c -v browser_timeout:30s tests/ui/e2e/e2e_mp_b2c.robot` | For UI tests only. optional |
| `-v api_timeout:${timeout}` |Default time for Implicit wait of the response in API tests. **Default:** `60s`| `docker/sdk robot-framework robot -v env:api_b2c -v api_timeout:30s -s tests.api.b2c.glue .` | For API tests only. optional |
| `-v verify_ssl:bool` |Enables/Disables SSL verification in API and UI tests **Default:** `false`| `docker/sdk robot-framework robot -v env:api_b2c -v verify_ssl:true -s tests.api.b2c.glue .` | optional |
| `{PATH}` | Path to the **file** to execute| `docker/sdk robot-framework robot -v env:api_b2b tests/api/b2b/glue/cart_endpoints/carts/positive.robot` / `docker/sdk robot-framework robot -v env:ui_b2c tests/ui/e2e/e2e_b2c.robot`| **yes for UI tests** |

### CLI Examples
* Execute all tests in api/b2b folder (all glue and bapi API tests that exist).
   ```sh
   docker/sdk robot-framework robot -v env:api_b2b -d results -s tests.api.b2b .
   ```
* Execute all tests in a specific folder (all API tests that exist inside the folder and sub-folders).
   ```sh
   docker/sdk robot-framework robot -v env:api_b2b -d results -s tests.api.b2b.glue.access_token_endpoints .
   ```
* Execute only positive tests in api folder (all positive API tests that exist, from all folders).
   ```sh
   docker/sdk robot-framework robot -v env:api_suite -d results -s positive .
   ```
* Execute all positive and negative API tests in tests/api/suite/glue/abstract_product_endpoints folder. Subfolders (other endpoints) will be executed as well.
   ```sh
   docker/sdk robot-framework robot -v env:api_suite -d results -s tests.api.suite.glue.abstract_product_endpoints .
   ```
* Execute all positive and negative API tests in tests/api/suite/glue/abstract_product_endpoints/abstract_products
   ```sh
   docker/sdk robot-framework robot -v env:api_suite -d results -s tests.api.suite.glue.abstract_product_endpoints.abstract_products .
   ```
* Execute all E2E UI tests for MP-B2B on specific cloud environment.
   ```sh
   docker/sdk robot-framework robot -v env:ui_mp_b2b -v yves_env:http://yves.example.com -v zed_env:http://zed.example.com -v mp_env:http://mp.example.com -d results tests/ui/e2e/e2e_mp_b2b.robot
   ```
* Execute all API tests for B2B on specific cloud environment with custom DB configuration.
   ```sh
   docker/sdk robot-framework robot -v env:api_b2b -v db_engine:postgresql -v db_host:124.1.2.3 -v db_port:5336 -v db_user:fake_user -v db_password:fake_password -v db_name:fake_name -s tests.api.b2b.glue .
   ```
---
### [Supported Browsers in UI tests](https://marketsquare.github.io/robotframework-browser/Browser.html#SupportedBrowsers)
Since [Playwright](https://github.com/microsoft/playwright) comes with a pack of builtin binaries for all browsers, no additional drivers e.g. geckodriver are needed.

All these browsers that cover more than 85% of the world wide used browsers, can be tested on Windows, Linux and MacOS. Theres is not need for dedicated machines anymore.
| Browser  	|Browser with this engine|
|:--- |:--- |
|chromium| 	Google Chrome, Microsoft Edge (since 2020), Opera|
|firefox| 	Mozilla Firefox|
|webkit| 	Apple Safari, Mail, AppStore on MacOS and iOS|
---
## Helper
For local testing, all tests are commonly executed against default hosts. To avoid typos in execution commands, you can use the [Makefile](https://makefiletutorial.com/) helper to quickly start your runs. 

### Supported Helper commands
| Command | Comment| Optional arguments |
|:--- |:--- |:--- |
|`docker/sdk robot-framework make test_api_b2b`| Run all API tests for B2B on default local environment| `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_api_b2c`| Run all API tests for B2C on default local environment| `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_api_mp_b2b`| Run all API tests for MP-B2B on default local environment| `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_api_mp_b2c`| Run all API tests for MP-B2C on default local environment| `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_api_suite`| Run all API tests for Suite on default local environment| `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_ui_suite`| Run all UI tests for Suite on default local environment|`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
|`docker/sdk robot-framework make test_ui_b2b`| Run all UI tests for B2B on default local environment|`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
|`docker/sdk robot-framework make test_ui_b2c`| Run all UI tests for B2C on default local environment|`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
|`docker/sdk robot-framework make test_ui_mp_b2b`| Run all UI tests for MP-B2B on default local environment|`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
|`docker/sdk robot-framework make test_ui_mp_b2c`| Run all UI tests for MP-B2C on default local environment|`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
### Helper Examples
* Run all API tests for B2B on local environment
   ```sh
   docker/sdk robot-framework make test_api_b2b
   ```
* Run all API tests for B2B on cloud environment
   ```sh
   docker/sdk robot-framework make test_api_b2c glue_env=http://glue.example.com bapi_env=http://bapi.example.com
   ```
---
## Automatically re-executing failed tests
There is often a need to re-execute a subset of tests, for example, after fixing a bug in the system under test or in the tests themselves. This can be accomplished by selecting test cases by names (--test and --suite options), tags (--include and --exclude), or by previous status (--rerunfailed or --rerunfailedsuites).

Combining re-execution results with the original results using the default combining outputs approach does not work too well. The main problem is that you get separate test suites and possibly already fixed failures are also shown. In this situation it is better to use --merge (-R) option to tell Rebot to merge the results instead. In practice this means that tests from the latter test runs replace tests in the original.
| Command  	|Description| 
|:--- |:--- |
|`docker/sdk robot-framework robot -v env:ui_b2c -d results tests/ui/e2e/e2e_b2c.robot`|first execute all tests|
|`docker/sdk robot-framework robot -v env:ui_b2c --rerunfailed results/output.xml --output results/rerun.xml tests/ui/e2e/e2e_b2c.robot`|then re-execute failing|
|`docker/sdk robot-framework rebot --merge results/output.xml results/rerun.xml`| finally merge results|

The message of the merged tests contains a note that results have been replaced. The message also shows the old status and message of the test.

Merged results must always have same top-level test suite. Tests and suites in merged outputs that are not found from the original output are added into the resulting output.

---
## Output files
Several output files are created when tests are executed, and all of them are somehow related to test results.

**Log** files contain details about the executed test cases in HTML format. They have a hierarchical structure showing test suite, test case and keyword details. Log files are needed nearly every time when test results are to be investigated in detail. Even though log files also have statistics, reports are better for getting an higher-level overview.

The command line option `--log (-l)` determines where log files are created. Unless the special value NONE is used, log files are always created and their default name is log.html.
