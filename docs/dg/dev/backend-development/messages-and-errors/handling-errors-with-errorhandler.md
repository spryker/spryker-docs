---
title: Handling errors with ErrorHandler
description: The Spryker Commerce OS uses a dedicated error handling mechanism to collect detailed error-Wrelated information. The ErrorHandler handles notices, warnings and other types of minor issues usually not thrown as exceptions as strict as more serious errors.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/error-handler
originalArticleId: 6b2b8617-7839-4220-aa59-51bf3d5bbd7d
redirect_from:
  - /docs/scos/dev/back-end-development/messages-and-errors/handling-errors-with-errorhandler.html
related:
  - title: Handling Internal Server messages
    link: docs/scos/dev/back-end-development/messages-and-errors/handling-internal-server-messages.html
  - title: Showing messages in Zed
    link: docs/dg/dev/backend-development/messages-and-errors/show-messages-in-the-back-office.html
---

The Spryker Commerce OS uses a dedicated error handling mechanism to collect detailed information on errors. Normally, notices, warnings, and other types of minor issues are not thrown as exceptions, but ErrorHandler converts them into meaningful exceptions. These exceptions pose an early warning system for isolating minor issues in code that are usually overlooked.

{% info_block infoBox %}

We use whoops for error rendering on the Zed side. For more information, check the [whoops library documentation](https://filp.github.io/whoops/).

{% endinfo_block %}

Errors in CLI are exposed differently than errors displayed in the web interface. In the frontend application, you receive a formatted error page. In CLI, you get in-depth details regarding the exception and a proper stack trace. This document shows how to manage and configure the way errors are rendered.

{% info_block warningBox "PrettyErrorHandler" %}

Do not enable the PrettyErrorHandler in production-like environments. If an exception occurs and the PrettyErrorHandler is enabled, sensitive data is not displayed.

Always double check that `\Spryker\Shared\ErrorHandler\ErrorHandlerConfig::isPrettyErrorHandlerEnabled()` is returns false in production environments.

{% endinfo_block %}

## Configuration

The [ErrorHandler module](https://github.com/spryker/error-handler) has a rich list of configuration options for controlling the ErrorHandler's behavior. Check the detailed list, including specifications, in the module's [ErrorHandlerConstants file](https://github.com/spryker/error-handler/blob/c1884be8035b42ea89a12cbfc69b2d4a68e34d82/src/Spryker/Shared/ErrorHandler/ErrorHandlerConstants.php).

## ErrorRenderer

You can change the ErrorRenderer error output to suit the environment you work in (development or production).

Change the renderer in your configuration files as follows:

* To change the renderer, use the `ErrorHandlerConstants::ErrorRenderer` constant.
* To display a formatted HTML page in production environments, use `WebErrorHtmlRenderer`.
* To display exception details in a development environment, use `WebExceptionErrorRenderer`. This displays the relevant developer messages and the exception's stack trace.

The following example shows how to change the error renderer for a development environment:

```php
<?php
use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;
use Spryker\Shared\ErrorHandler\ErrorRenderer\WebExceptionErrorRenderer;

$config[ErrorHandlerConstants::ERROR_RENDERER] = WebExceptionErrorRenderer::class;
```

## Error pages

Yves and Zed have their own specific templates for rendering exceptions.

To change the path to another file, use the `ErrorHandlerConstants::ZED_ERROR_PAGE|YVES_ERROR_PAGE` constants.

## Exception message sanitizing

Starting from ErrorHandler version [2.5.0](https://github.com/spryker/error-handler/releases/tag/2.5.0), you can sanitize exception messages.

Usually, sensitive data is not used in exception messages. However, in some special cases, data is seen as sensitive data, and for these cases, you can manipulate exception messages.

All exception messages are handled in the `\Spryker\Shared\ErrorHandler\ErrorHandler::handleException()` method. These messages can be manipulated through the `\Spryker\Service\UtilSanitize\UtilSanitizeServiceInterface::sanitizeString()` method.

Since Spryker can't know what needs to be removed from the exception messages, you need to add `\Spryker\Service\UtilSanitizeExtension\Dependency\Plugin\StringSanitizerPluginInterface`'s plugins to the `\Spryker\Service\UtilSanitize\UtilSanitizeDependencyProvider::getStringSanitizerPlugins()` method.

The exception message is then passed to all applied `StringSanitizerPluginInterface`'s and you can manipulate them as you need.

## Connecting the ErrorHandler to your IDE

Starting from ErrorHandler version [1.1](https://github.com/spryker/error-handler/releases/tag/1.1.0), you can connect Zed error pages to your IDE in order to use one-click navigation to stack trace file.

To connect the ErrorHandler to your IDE, enable the config in your `config_local.php` file as follows:

```php
<?php
use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;

$config[ErrorHandlerConstants::USER_BASE_PATH] = '/absolute/path/to/project';

```

The `SERVER_BASE_PATH` config defaults to the DevVM internal `/data/shop/development/current`, but can also be configured if necessary.

{% info_block infoBox %}

In the preceding example, the connection was done to the PHPStorm IDE. The same method must work with other IDEs. Although, in some cases, `AS_AJAX` config may be needed.

{% endinfo_block %}

### Configuration for Linux

While the above-mentioned instructions work out of the box for most operating systems, including MacOS, Linux needs the following script to get PHPStorm to open files:

```bash
#!/usr/bin/env bash
# PhpStorm URL Handler
#
# phpstorm://open?file=@file&line=@line
# Adapted from https://github.com/sanduhrs/phpstorm-url-handler
#
# @license GPL
# @author Stefan Auditor <stefan.auditor@erdfisch.de>
arg=${1}
# Get the file path.
file=$(echo "${arg}" | sed -r 's/.*file=(.*)&line=.*/\1/')
# Get the line number.
line=$(echo "${arg}" | sed -r 's/.*file=.*&line=(.*)/\1/')
/locale/path/to/PhpStorm/bin/phpstorm.sh --line "${line}" "${file}"
```

Replace `/locale/path/to/PhpStorm/bin/phpstorm.sh` with your IDE's local path and make this script executable. Save this script as `phpstorm-url-handler` and execute the following:

```bash
chmod +X phpstorm-url-handler
cp phpstorm-url-handler /usr/local/bin/phpstorm-url-handler
```

Make this available on your local machine:

```bash
phpstorm-url-handler
```

The final step is to enable the protocol in your local browser.

For example, in Firefox, if the protocol is unknown, you need to enable the `phpstorm://` protocol using `about:config`. To enable the PHPStorm protocol, add a new boolean value for `network.protocol-handler.expose.phpstorm` and keep the default value `false`.
