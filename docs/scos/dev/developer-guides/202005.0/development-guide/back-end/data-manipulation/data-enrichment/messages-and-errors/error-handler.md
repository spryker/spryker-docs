---
title: Handling Errors with ErrorHandler
originalLink: https://documentation.spryker.com/v5/docs/error-handler
redirect_from:
  - /v5/docs/error-handler
  - /v5/docs/en/error-handler
---

The Spryker Commerce OS uses a dedicated error handling mechanism to collect detailed error related information. The ErrorHandler handles notices, warnings and other types of minor issues usually not thrown as exceptions as strict as more serious errors. By default, they all throw meaningful exceptions for developers and provide an early warning system for isolating minor issues in code that are normally overlooked.

Errors in the CLI are exposed differently than errors displayed in the web interface. In the front-end application you receive a formatted error page. In the CLI you get in-depth details regarding the exception and a proper stack trace. In this topic, we will show how to manage and configure how errors are rendered.

**Note**: We use whoops for error rendering on the Zed side. For more information please check [whoops library documentation](https://filp.github.io/whoops/).

## Configuration
The ErrorHandler module has a rich list of configuration options for controlling the ErrorHandler’s behavior. We include a detailed list including specifications in the module’s `ErrorHandlerConstants` file.

## ErrorRenderer
You can change the ErrorRenderer error output to suit the environment you are working on (development or production).

The renderer is changed in your configuration files as follows:

* To change the renderer, use the `ErrorHandlerConstants::ErrorRenderer` constant:
* To display a formatted HTML page in production environments, use `WebErrorHtmlRenderer`.
* To display exception details in a development environment, use `WebExceptionErrorRenderer` this displays developer relevant messages and the exception’s stack trace.

The following example shows how to change the error renderer for a development environment:

```php
<?php
use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;
use Spryker\Shared\ErrorHandler\ErrorRenderer\WebExceptionErrorRenderer;

$config[ErrorHandlerConstants::ERROR_RENDERER] = WebExceptionErrorRenderer::class;
```

## Error Pages
Yves and Zed have their own specific templates for rendering exceptions.

To change the path to another file: Use the `ErrorHandlerConstants::ZED_ERROR_PAGE|YVES_ERROR_PAGE` constants.

## Connecting the ErrorHandler to your IDE
As of version 1.1 of the ErrorHandler module, you can connect Zed error pages to your IDE in order use one click navigation to stack trace file.

**To connect the ErrorHandler to your IDE**: Enable a config in your `config_local.php` file as follows:

```php
<?php
use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;

$config[ErrorHandlerConstants::USER_BASE_PATH] = '/absolute/path/to/project';

```

The `SERVER_BASE_PATH` config defaults to the DevVM internal `/data/shop/development/current`, but can also be configured if necessary.

**Note**: In the example above, the connection was done to the PHPStorm IDE. The same method should work with other IDEs although in some cases, `AS_AJAX` config may be needed.

### Configuration for Linux
While the above-mentioned instructions work out of the box for most operating systems including MacOS, Linux needs the following script to get PHPStorm to open files:

```php
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

Replace `/locale/path/to/PhpStorm/bin/phpstorm.sh` with your IDE’s local path and make this script executable. Save this script as phpstorm-url-handler and execute:

```
chmod +X phpstorm-url-handler
cp phpstorm-url-handler /usr/local/bin/phpstorm-url-handler
```

Make this available on your local machine by using the command phpstorm-url-handler.

The final step is to enable the protocol in your local browser.

For example: In Firefox, if the protocol is unknown, we need to enable the `phpstorm://` protocol via `about:config`. To enable the PHPStorm protocol, add a new boolean value for `network.protocol-handler.expose.phpstorm` and keep the default value `false`.
