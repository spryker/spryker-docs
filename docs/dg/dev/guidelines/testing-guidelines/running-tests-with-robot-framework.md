---
title: Running tests with Robot Framework
description: Learn how to run tests with the Robot Framework.
last_updated: May 26, 2023
template: howto-guide-template
related:
  - title: Running tests with the Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
---

This document describes how to run tests with Robot Framework.

## Running tests

Robot Framework test cases are executed from the command line. By default, the end result of the tests is an output file in the XML format, an HTML report, and a log file. After the execution, you can combine and otherwise post-process the output files with the Robot tool.

To run tests with Robot Framework, use the following command:
```bash
docker/sdk robot-framework robot -v env:{ENVIRONMENT} {PATH}`
```

### Supported CLI Parameters

| PARAMETER | COMMENT | EXAMPLE | REQUIRED |
|:--- |:--- |:--- |:--- |
| `-v env:{env}` | Environment variable. Demo data, locators, and hosts in tests depend on this variable. Supported parameters: `api_b2b`, `api_b2c`, `api_mp_b2b`, `api_mp_b2c`, `api_suite`, `ui_b2b`, `ui_b2c`, `ui_mp_b2b`, `ui_mp_b2c`, `ui_suite`. | &check; | `docker/sdk robot-framework robot -v env:api_b2b -s tests.api.b2b.glue .`. |
| `-v db_engine:{engine}`| Defines the database engine to run tests with. Possible values: `mysql` or `postgresql`. The default value is `mysql`. |  | `docker/sdk robot-framework robot -v env:api_b2b -v db_engine:postgresql -s tests.api.b2b.glue .` |  
| `-v db_host:{host}`| Endpoint of the database to test with. The default value is `127.0.0.1`. |  | `docker/sdk robot-framework robot -v env:api_b2b -v db_host:127.2.3.4 -s tests.api.b2b.glue .` |  
| `-v db_port:{port}`| Port of the database to test with. The default value for MariaDB is `3306`. The default value for PostgreSQL is `5432`.|  | `docker/sdk robot-framework robot -v env:api_b2b -v db_port:3390 -s tests.api.b2b.glue .` |  
| `-v db_user:{user}`| Database user that has access to the database to test with. The default value is `spryker`.|  | `docker/sdk robot-framework robot -v env:api_b2b -v db_user:fake_user -s tests.api.b2b.glue .` |  
| `-v db_password:{pwd}`| Password to the database to test with. The default value is `secret`.|  | `docker/sdk robot-framework robot -v env:api_b2b -v db_password:fake_password -s tests.api.b2b.glue .` |  
| `-v db_name:{name}`| Name of the database to test with. The default value is `eu-docker`.|  | `docker/sdk robot-framework robot -v env:api_b2b -v db_name:fake_name -s tests.api.b2b.glue .` |  
| `-s test_suite_name` | Name of any subfolder in the tests folder without path or file name without extension. If specified, tests from that folder or file are executed. |  | `docker/sdk robot-framework robot -v env:api_b2b -s tests.api.b2b.glue .` |  
| `-v yves_env:{URL}` | Yves URL to test with. |  For cloud environments. | `docker/sdk robot-framework robot -v env:ui_b2c -v yves_env:http://example.com tests/ui/e2e/e2e_b2c.robot`|
| `-v yves_at_env:{URL}` | URL of the Yves AT store to test with. | For cloud environments. | `docker/sdk robot-framework robot -v env:ui_b2c -v yves_env:http://example.com -v yves_at_env:http://at.example.com tests/ui/e2e/e2e_b2c.robot`|
| `-v zed_env:{URL}` | Zed URL to test with.| For cloud environments. | `docker/sdk robot-framework robot -v env:ui_b2c -v yves_env:http://example.com -v zed_env:http://bo.example.com tests/ui/e2e/e2e_b2c.robot`|
| `-v glue_env:{URL}` | Glue API URL to test with. | For cloud environments. | `docker/sdk robot-framework robot -v env:api_b2c -v glue_env:http://glue.example.com -s tests.api.b2c.glue .`|
| `-v bapi_env:{URL}` | Backend API URL to test with.| For cloud environments. | `docker/sdk robot-framework robot -v env:api_b2c -v glue_env:http://glue.example.com -v bapi_env:http://bapi.example.com -s tests.api.b2c.bapi .`|
| `-v mp_env:{URL}` | Merchant Portal URL to test with.| For cloud environments. |`docker/sdk robot-framework robot -v env:ui_mp_b2c -v yves_env:http://example.com -v zed_env:http://bo.example.com -v mp_env:http://mp.example.com tests/ui/e2e/e2e_mp_b2c.robot`|
| `-v browser:{browser}`| Defines the browser to run tests in. For UI tests only. Possible values: `chromium`, `firefox`, `webkit`. The default value is `chromium`. |  | `docker/sdk robot-framework robot -v env:ui_mp_b2c -v browser:firefox tests/ui/e2e/e2e_mp_b2c.robot` |
| `-v headless:{headless}` | Defines if the browser should be launched in the headless mode. For UI tests only. Possible values: `true`,`false`. The default value is `true`.|  | `docker/sdk robot-framework robot -v env:ui_mp_b2c -v headless:false tests/ui/e2e/e2e_mp_b2c.robot` |
| `-v browser_timeout:{timeout}` | Implicit wait in UI tests. For UI tests only. The default value is `60s`. |  | `docker/sdk robot-framework robot -v env:ui_mp_b2c -v browser_timeout:30s tests/ui/e2e/e2e_mp_b2c.robot` |
| `-v api_timeout:${timeout}` | Implicit wait of the response in API tests. For UI tests only. The default value is `60s`.|  | `docker/sdk robot-framework robot -v env:api_b2c -v api_timeout:30s -s tests.api.b2c.glue .` |
| `-v verify_ssl:{bool}` | Enables or disables SSL verification in API and UI tests. The default value is `false`.|  | `docker/sdk robot-framework robot -v env:api_b2c -v verify_ssl:true -s tests.api.b2c.glue .` |
| `-v env:{PATH}` | Path to the file to execute. | Only for UI tests. | `docker/sdk robot-framework robot -v env:api_b2b tests/api/b2b/glue/cart_endpoints/carts/positive.robot` / `docker/sdk robot-framework robot -v env:ui_b2c tests/ui/e2e/e2e_b2c.robot`|

### CLI examples

* Execute all tests in the `api/b2b` folder, that is, all Glue and BAPI tests that exist:
```sh
docker/sdk robot-framework robot -v env:api_b2b -d results -s tests.api.b2b .
```

* Execute all tests in a specific folder, that is, all API tests that exist inside the folder and subfolders:
```sh
docker/sdk robot-framework robot -v env:api_b2b -d results -s tests.api.b2b.glue.access_token_endpoints .
```

* Execute only positive tests in the `api` folder, that is, all positive API tests that exist, from all folders:
```sh
docker/sdk robot-framework robot -v env:api_suite -d results -s positive .
```

* Execute all positive and negative API tests in the `tests/api/suite/glue/abstract_product_endpoints` folder. Subfolders, that is, other endpoints, will be executed as well:
```sh
docker/sdk robot-framework robot -v env:api_suite -d results -s tests.api.suite.glue.abstract_product_endpoints .
```

* Execute all positive and negative API tests in `tests/api/suite/glue/abstract_product_endpoints/abstract_products`:
```sh
docker/sdk robot-framework robot -v env:api_suite -d results -s tests.api.suite.glue.abstract_product_endpoints.abstract_products .
```

* Execute all E2E UI tests for MP-B2B in a specific cloud environment:
```sh
docker/sdk robot-framework robot -v env:ui_mp_b2b -v yves_env:http://yves.example.com -v zed_env:http://zed.example.com -v mp_env:http://mp.example.com -d results tests/ui/e2e/e2e_mp_b2b.robot
```

* Execute all API tests for B2B in a specific cloud environment with a custom database configuration:

```sh
docker/sdk robot-framework robot -v env:api_b2b -v db_engine:postgresql -v db_host:124.1.2.3 -v db_port:5336 -v db_user:fake_user -v db_password:fake_password -v db_name:fake_name -s tests.api.b2b.glue .
```

### Supported browsers in UI tests

Since [Playwright](https://github.com/microsoft/playwright) comes with a pack of builtin binaries for all browsers, no additional drivers, like geckodriver, are needed.

All these browsers, comprising more than 85% of the total, can be tested on Windows, Linux, and MacOS without the need for dedicated machines.

| Browser  	|Browser with this engine|
|:--- |:--- |
|chromium| 	Google Chrome, Microsoft Edge (since 2020), Opera|
|firefox| 	Mozilla Firefox|
|webkit| 	Apple Safari, Mail, AppStore on MacOS and iOS|

For details on the browsers supported by Robot Framework, see [Browsers](https://marketsquare.github.io/robotframework-browser/Browser.html#SupportedBrowsers).

## Helper

For local testing, all tests are executed against the default hosts. To avoid typos in execution commands, use the [Makefile](https://makefiletutorial.com/) helper to start your runs quickly.

### Supported Helper commands
| Command | Comment| Optional arguments |
|:--- |:--- |:--- |
|`docker/sdk robot-framework make test_api_b2b`| Run all API tests for B2B in the default local environment. | `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_api_b2c`| Run all API tests for B2C in the default local environment. | `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_api_mp_b2b`| Run all API tests for MP-B2B in the default local environment. | `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_api_mp_b2c`| Run all API tests for MP-B2C in the default local environment. | `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_api_suite`| Run all API tests for Suite in the default local environment. | `glue_env=` / `bapi_env=` |
|`docker/sdk robot-framework make test_ui_suite`| Run all UI tests for Suite in the default local environment. |`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
|`docker/sdk robot-framework make test_ui_b2b`| Run all UI tests for B2B in the default local environment. |`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
|`docker/sdk robot-framework make test_ui_b2c`| Run all UI tests for B2C in the default local environment. |`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
|`docker/sdk robot-framework make test_ui_mp_b2b`| Run all UI tests for MP-B2B in the default local environment. |`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|
|`docker/sdk robot-framework make test_ui_mp_b2c`| Run all UI tests for MP-B2C in the default local environment. |`glue_env=` / `yves_env=` / `yves_at_env=` / `zed_env=` / `mp_env=`|

### Helper examples

* Run all API tests for B2B in the local environment:
```sh
docker/sdk robot-framework make test_api_b2b
```

* Run all API tests for B2B in a cloud environment:
```sh
docker/sdk robot-framework make test_api_b2c glue_env=http://glue.example.com bapi_env=http://bapi.example.com
```


## Automatic execution of failed tests

To re-execute a subset of tests, for example, after fixing a bug in the system or in the tests themselves, select test cases by the following:
* Names: `--test` and `--suite`
* Tags: `--include` and `--exclude`
* Previous status: `--rerunfailed` or `--rerunfailedsuites`

Combining re-execution results with the original results using the default combining outputs approach doesn't work well. The main issue is that you get separate test suites, and possibly already fixed failures are also shown. In this situation, it is better to use the `--merge (-R)` option to tell Rebot to merge the results instead. In practice, this means that tests from the latter test runs replace the tests in the original.

The following is the recommended way of re-executing failed tested:

1. Execute all tests:
```shell
docker/sdk robot-framework robot -v env:ui_b2c -d results tests/ui/e2e/e2e_b2c.robot
```

2. Re-execute failing tests:
```shell
docker/sdk robot-framework robot -v env:ui_b2c --rerunfailed results/output.xml --output results/rerun.xml tests/ui/e2e/e2e_b2c.robot
```

3. Merge test results:
```shell
docker/sdk robot-framework rebot --merge results/output.xml results/rerun.xml
```

The message of the merged tests contains a note that the results have been replaced. The message also shows the old status and message of the test.

Merged results must always have the same top-level test suite. Tests and suites in merged outputs that are not found from the original output are added into the resulting output.

## Output files

Once tests have been executed, several output files are created. All of the files are somehow related to test results.

Log files contain details about the executed test cases in the HTML format. They have a hierarchical structure showing test suite, test case, and keyword details. You might need log files to investigate test results in detail. Even though log files also have statistics, reports are better for getting a higher-level overview.

The command line option `--log (-l)` determines where log files are created. Unless the special value NONE is used, log files are always created, and their default name is `log.html`.
