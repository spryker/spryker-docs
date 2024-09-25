This document describes how to install the [OpenAi]() feature.

## Install feature core <!-- Skip if there won't be a frontend section in the doc -->

Follow the steps below to install the {Feature Name} feature core.

### Prerequisites

### 1) Install the required modules

```bash
composer require spryker-eco/open-ai:"^0.1.1" --update-with-dependencies
```

**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

<!--Each step needs verification to make sure that the customer did not skip anything unintentionally.
The verification needs to cover the entire "step".
The verification step often needs to use an example domain, use
 - "mysprykershop.com"
 - "zed.mysprykershop.com"
 - "glue.mysprykershop.com"
domains according to your requirements.-->

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY <!--for public Demo Shops--> |
|--------|-------------------------------------------------|
| OpenAi | vendor/spryker-eco/open-ai                             |

### Set up the configuration
<!--Describe system and module configuration changes. If the default configuration is enough for a primary behavior, skip this step.-->

<!--Only define those configs which have to be overridden / defined by the customer. Configs that are working out of the box, should not be listed.-->

<!--Conventions:
* The "prerequisites" column in the installation guide tables can define behavioral requirements (fulfilled by any "specification" column).
* The "specification" column has to describe what is the behavior of the widget so that the customer can understand it.
* The "specification" column has to describe what is the behavior of the controller so that the customer can understand it.
-->

Add the following configuration:

| CONFIGURATION   | SPECIFICATION    | NAMESPACE                |
| --------------- |------------------|--------------------------|
| OpenAiConstants::API_TOKEN | OpenAi API token | SprykerEco/Shared/OpenAi |

**config/Shared/config_default.php**

```php
<?php

use SprykerEco\Shared\OpenAi\OpenAiConstants;

$config[OpenAiConstants::API_TOKEN] = getenv('OPEN_AI_API_TOKEN');
```

{% info_block warningBox "Verification" %}

{% endinfo_block %}


### Set up transfer objects
<!--Provide the following with a description before each item:
* Code snippets with DB schema changes.
* Code snippets with transfer schema changes.
* The console command to apply the changes in project and core. -->

Set up transfer objects as follows:

```bash
console transfer:generate
```

**Verification**

Make sure the following changes have been triggered in transfer objects:

| TRANSFER   | TYPE  | EVENT   | PATH                    |
| ---------- |-------|---------|-------------------------|
| OpenAiChatRequest | class | created | src/Generated/Transfer/OpenAiChatRequest |
| OpenAiChatResponse | class | created | src/Generated/Transfer/OpenAiChatResponse |
