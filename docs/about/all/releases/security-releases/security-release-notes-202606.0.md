---
title: Security release notes 202606.0
description: Security updates released for version 202606.0
last_updated: Jul 7, 2026
template: concept-topic-template
publish_date: "2026-06-08"
redirect_from:
- /docs/about/all/releases/security-releases/security-release-notes-202605.0.html
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Information disclosure via phpinfo() method

{% info_block warningBox "Prerequisite" %}

This security update requires [Spryker 202604.0](/docs/about/all/releases/release-notes-202604.0.html) or later. Ensure your project is upgraded to this version before applying the fix.

{% endinfo_block %}

Instances of phpinfo() were identified in the codebase, which could potentially expose sensitive configuration details and environment variables to unauthorized parties. Such an instance was found to be part of the default Back Office setup.

### Affected modules

- `spryker/setup`: < 4.8.0
- `spryker/maintenance`: < 3.6.0

### Fix the vulnerability

Update the `spryker/setup` package to version 4.8.0 or higher:

```bash
composer update spryker/setup:"^4.8.0"
composer show spryker/setup # Verify the version
```

Update the `spryker/maintenance` package to version 4.0.0 or higher:

```bash
composer update spryker/maintenance:"^4.0.0"
composer show spryker/maintenance # Verify the version
```


## Possible brute force attack in adding discount voucher / gift card codes

An automated attack could attempt to guess valid strings by using every possible combination and/or pre-defined dictionaries.
In the site frontend, there is the possibility to use a discount code (voucher) or a gift card code, which is a predefined or randomized string.

### Affected modules

- `spryker-shop/cart-code-widget`: < 1.6.0

### Fix the vulnerability

Update the `spryker-shop/cart-code-widget` package to version 1.7.0 or higher:

```bash
composer update spryker-shop/cart-code-widget:"^1.7.0"
composer show spryker-shop/cart-code-widget # Verify the version
```


Enable `SecurityBlockerCartCodeEventDispatcherPlugin` plugin:

**src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use SprykerShop\Yves\CartCodeWidget\Plugin\EventDispatcher\SecurityBlockerCartCodeEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new SecurityBlockerCartCodeEventDispatcherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. From the cart page, submit an invalid voucher or gift card code multiple times.
2. After exceeding the configured number of attempts, make sure the request is blocked and the `cart_code_widget.error.too_many_requests` error message is displayed.

{% endinfo_block %}

Add glossary translations for the message `cart_code_widget.error.too_many_requests`.


## File enumeration via predictable file IDs in File Manager

Files stored through the File Manager module were referenced using sequential numeric IDs, making it possible to enumerate and access files by guessing IDs. Introducing UUID-based identifiers for file entities prevents unauthorized enumeration of file resources.

### Affected modules

- `spryker/file-manager`: < 2.9.0
- `spryker/file-manager-storage`: < 2.7.0
- `spryker-shop/content-file-widget`: < 2.1.0
- `spryker-shop/file-manager-widget`: < 2.1.0
- `spryker/synchronization-behavior`: < 1.15.0
- `spryker/propel`: < 3.50.1

### Fix the vulnerability

Update the affected packages:

```bash
composer update spryker/file-manager:"^2.9.0" spryker/file-manager-storage:"^2.7.0" spryker-shop/content-file-widget:"^2.1.0" spryker-shop/file-manager-widget:"^2.1.0" spryker/synchronization-behavior:"^1.15.0" spryker/propel:"^3.50.1" --update-with-dependencies
```

### Activate UUID for file entities

1. Enable UUID generation by overriding `FileManagerConfig::isUuidEnabled()` in your project configuration. By default, UUID generation is disabled.

**src/Pyz/Zed/FileManager/FileManagerConfig.php**

```php
<?php

namespace Pyz\Zed\FileManager;

use Spryker\Zed\FileManager\FileManagerConfig as SprykerFileManagerConfig;

class FileManagerConfig extends SprykerFileManagerConfig
{
    /**
     * @return bool
     */
    public function isUuidEnabled(): bool
    {
        return true;
    }
}
```

2. Re-save all existing file entities to generate UUIDs for them. Make sure that the UUID field is populated for each file entity.

3. Rebuild the storage data:

```bash
console publish:trigger-events -r file
```


## PHP code injection via Twig template name

The `Compiler::string()` method in Twig failed to escape single quotes when generating PHP double-quoted string literals. An attacker could craft a template name containing a single quote to terminate the surrounding PHP string early, injecting arbitrary PHP expressions into the compiled Twig cache file. The injected code executes when the cache file is loaded, bypassing the Twig sandbox and enabling remote code execution. Because `SecurityPolicy` permits `{% raw %}{% use %}{% endraw %}` tags in sandboxed templates, this vulnerability is exploitable even in restricted environments.

### Affected modules

- `twig/twig`: < 3.26.0
- `spryker/twig`: < 3.31.0

### Fix the vulnerability

Update the affected packages:

```bash
composer update twig/twig:"^3.26.0" spryker/twig:"^3.31.0"
composer show twig/twig spryker/twig # Verify the versions
```


## DOM-based cross-site scripting (XSS) in Back Office JavaScript modules

Several Back Office JavaScript modules passed untrusted, unsanitized data directly into jQuery execution sinks, such as the `$()` constructor, `.append()`, `.html()`, or sensitive attributes like `href`. If the data contained malicious HTML or JavaScript, jQuery's internal engine evaluated and executed it, leading to DOM-based cross-site scripting (XSS).

### Affected modules

- `spryker/cms`: < 7.20.1
- `spryker/cms-slot-block-gui`: < 1.6.1
- `spryker/company-role-gui`: < 1.11.1
- `spryker/content-gui`: < 3.1.1
- `spryker/file-manager-gui`: < 3.1.1
- `spryker/gui`: < 5.3.1

### Fix the vulnerability

Update the affected packages:

```bash
composer update spryker/cms:"^7.20.1" spryker/cms-slot-block-gui:"^1.6.1" spryker/company-role-gui:"^1.11.1" spryker/content-gui:"^3.1.1" spryker/file-manager-gui:"^3.1.1" spryker/gui:"^5.3.1"
composer show spryker/cms spryker/cms-slot-block-gui spryker/company-role-gui spryker/content-gui spryker/file-manager-gui spryker/gui # Verify the versions
```

If you extended any of the affected JavaScript modules on the project level, never pass untrusted user input directly into the jQuery `$()` constructor or DOM manipulation methods. Use secure alternatives such as `.text()` or the native `textContent` property to render text. If you must render dynamic HTML, sanitize the input first with [DOMPurify](https://www.npmjs.com/package/dompurify).

1. Install the `dompurify` package:

```bash
npm install dompurify
```

2. Import `DOMPurify` and sanitize the untrusted data before passing it into a jQuery sink:

```js
import DOMPurify from 'dompurify';

// Before
$(container).html(untrustedData);

// After
$(container).html(DOMPurify.sanitize(untrustedData));
```

### Update frontend dependencies

Spryker frontend modules do not define their own npm dependencies. Their assets are built with the packages defined in the project-level `package.json`, so the fixed modules rely on the npm package versions installed in your project.

The updated frontend assets use newer Sass functionality. If your project uses an older `sass` version, the frontend build fails with an error similar to the following:

```text
SassError: @use rules must be written before any other rules.
     |
2154 | @use 'sass:map';
     | ^^^^^^^^^^^^^^^
```

To avoid the build error, update the `sass` package in `devDependencies` to version 1.97.0 or higher:

```bash
npm install --save-dev sass@~1.97.0
```

We also recommend aligning the rest of the frontend dependencies in your project's `package.json` with the following versions. The list does not include Merchant Portal (Angular) packages.

<details>
  <summary>Recommended frontend dependency versions</summary>

```json
{
    "dependencies": {
        "dompurify": "~3.2.0"
    },
    "devDependencies": {
        "@babel/plugin-transform-class-properties": "~7.25.9",
        "@babel/plugin-transform-runtime": "~7.28.5",
        "@babel/preset-env": "~7.28.5",
        "@babel/preset-typescript": "~7.28.5",
        "@eslint/js": "^9.39.2",
        "@jsdevtools/file-path-filter": "~3.0.2",
        "@prettier/plugin-xml": "~3.4.2",
        "@spryker/frontend-config.eslint": "~0.1.0",
        "@spryker/frontend-config.stylelint": "~0.0.6",
        "@spryker/oryx-for-zed": "~3.6.1",
        "@types/node": "~25.0.3",
        "@types/webpack": "~5.28.5",
        "@typescript-eslint/eslint-plugin": "~8.50.0",
        "@typescript-eslint/parser": "~8.50.0",
        "autoprefixer": "~10.4.23",
        "babel-loader": "~10.0.0",
        "commander": "~4.0.1",
        "compression-webpack-plugin": "~11.1.0",
        "copy-webpack-plugin": "~13.0.1",
        "css-loader": "~7.1.2",
        "css-minimizer-webpack-plugin": "~7.0.4",
        "eslint": "~9.39.2",
        "fast-glob": "~3.3.3",
        "mini-css-extract-plugin": "~2.9.4",
        "npm-run-all": "~4.1.5",
        "postcss": "~8.5.6",
        "postcss-loader": "~8.2.0",
        "prettier": "~3.7.4",
        "rimraf": "~6.1.2",
        "sass": "~1.97.0",
        "sass-loader": "~16.0.6",
        "stylelint": "~16.26.1",
        "stylelint-config-standard-less": "~3.0.1",
        "stylelint-config-standard-scss": "~16.0.0",
        "terser-webpack-plugin": "~5.3.16",
        "ts-node": "~10.9.2",
        "tslib": "~2.8.1",
        "typescript": "~5.9.3",
        "typescript-eslint": "^8.51.0",
        "webpack": "~5.103.0",
        "webpack-merge": "~6.0.1"
    }
}
```

</details>

After updating the dependencies, reinstall the packages and rebuild the frontend:

```bash
npm install
console frontend:yves:build
```

## Vulnerability in symfony third-party dependency

Multiple security vulnerabilities were identified in several Symfony third-party packages, potentially affecting application security, routing, email handling, and string processing.

### Affected modules

- `symfony/security-http`: < 6.4.41
- `symfony/monolog-bridge`: 6.0.0 - 6.4.39
- `symfony/mailer`: 6.0.0 - 6.4.39
- `symfony/runtime`: 6.4.14 - 6.4.39
- `symfony/string`: 7.4.0 - 7.4.11
- `symfony/routing`: < 6.4.41
- `symfony/mime`: 6.4.0 - 6.4.40

### Fix the vulnerability

Update the affected Symfony packages:

```bash
composer update symfony/security-http:"^6.4.41" symfony/monolog-bridge:"^6.4.40" symfony/mailer:"^6.4.40" symfony/runtime:"^6.4.40" symfony/routing:"^6.4.41" symfony/mime:"^6.4.41" symfony/string:"^7.4.13"
composer show symfony/security-http symfony/monolog-bridge symfony/mailer symfony/runtime symfony/routing symfony/mime symfony/string # Verify the versions
```
