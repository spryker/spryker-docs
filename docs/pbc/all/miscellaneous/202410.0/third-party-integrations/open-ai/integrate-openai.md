---
title: Integrate OpenAI
description: Learn how to integrate the OpenAi module into a Spryker project.
last_updated: Nov 12, 2024
template: feature-integration-guide-template
---


This document describes how to integrate OpenAI. This integration enables other functionalities to use AI.


## Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                           |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

## 1) Install the required modules

Install the required module:

```bash
composer require spryker-eco/open-ai:"^0.1.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE |  EXPECTED DIRECTORY        |
|--------|----------------------------|
| OpenAi | vendor/spryker-eco/open-ai |

{% endinfo_block %}

## 2) Set up the configuration

1. Using the data from your OpenAI account, add the OpenAI secret key as a `OPEN_AI_API_TOKEN` env variable to the needed configuration file. For an example, see [Migrate to cloud: Define environment variables](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-define-environment-variables.html)

2. Add the following configuration:

| CONFIGURATION               | SPECIFICATION                   | NAMESPACE                |
|-----------------------------|---------------------------------|--------------------------|
| OpenAiConstants::API_TOKEN  | Specifies the OpenAI API token. | SprykerEco\Shared\OpenAi |

**config/Shared/config_default.php***

```php

use SprykerEco\Shared\OpenAi\OpenAiConstants;

$config[OpenAiConstants::API_TOKEN] = getenv('OPEN_AI_API_TOKEN');

```

## 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER           | TYPE  | EVENT   | PATH                                                     |
|--------------------|-------|---------|----------------------------------------------------------|
| OpenAiChatRequest  | class | created | src/Generated/Shared/Transfer/OpenAiChatRequestTransfer  |
| OpenAiChatResponse | class | created | src/Generated/Shared/Transfer/OpenAiChatResponseTransfer |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Add and run the following code in your application:

```php

<?php

use Generated\Shared\Transfer\OpenAiChatRequestTransfer;
use SprykerEco\Client\OpenAi\OpenAiClient;

$openAiClient = new OpenAiClient();
$openAiChatResponseTransfer = $openAiClient->chat((new OpenAiChatRequestTransfer())->setMessage('Hello'));

```

Make sure `$openAiChatResponseTransfer` contains the OpenAI response.

{% endinfo_block %}
