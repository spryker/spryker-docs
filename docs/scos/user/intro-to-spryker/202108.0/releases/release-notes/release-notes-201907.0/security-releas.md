---
title: Security Release Notes 201907.0
originalLink: https://documentation.spryker.com/2021080/docs/security-release-notes-201907-0
redirect_from:
  - /2021080/docs/security-release-notes-201907-0
  - /2021080/docs/en/security-release-notes-201907-0
---

The following information pertains to security-related issues that were discovered and resolved.
Issues are listed by description and affected modules.

{% info_block infoBox %}
If you need any additional support with this content, please contact [support@spryker.com](mailto:support@spryker.com
{% endinfo_block %}. If you found a new security vulnerability, please inform us via  [security@spryker.com](mailto:security@spryker.com).)

## OMS and StateMachine Module Vulnerability
Both OMS and standalone StateMachine module were exposing their State Machine triggers directly via URL in Zed backend. Those actions could be invoked via GET which violated basic HTTP specs and security audits, thus allowing “hidden” or accidental links, faced images etc.

We have solved this issue by changing the type of HTTP request for OMS triggering button from GET to POST.

**Affected modules**:

* Oms (10.1.0) <!-- add links https://documentation.spryker.com/module_guide/spryker/oms.htm -->
* Sales (10.2.0) <!-- https://documentation.spryker.com/module_guide/spryker/sales.htm -->
* SalesReclamationGui (1.2.0) <!-- https://documentation.spryker.com/module_guide/spryker/sales-reclamation-gui.htm -->

**How to get the fix:**

Just update the modules with

```bash
composer update spryker/oms spryker/sales spryker/sales-reclamation-gui
```
***
## Incorrect Usage of Zed Request Configuration Constants
This issue is not a security vulnerability itself but may prevent mistakes. Currently, there is an unused and deprecated factory method `\Spryker\Shared\ZedRequest\Provider\AbstractZedClientProvider::createZedClient()`. In this method, when instance of `\Spryker\Client\ZedRequest\Client\HttpClient` class is created, the string value is passed from `Config::get(ZedRequestConstants::TRANSFER_PASSWORD)` as the third argument `$isAuthenticationEnabled`, which is incorrect and misleading. Thus, unexpected behavior might occur when using that factory method on a project level. Since those constants are not used in the default config, the solution, for now, was to deprecate `ZedRequestConstants::TRANSFER_PASSWORD` and `ZedRequestConstants::TRANSFER_USERNAME` to remove them later in a major release.

**Affected module:**

* ZedRequest (3.8.1) <!-- https://documentation.spryker.com/module_guide/spryker/zed-request.htm -->

**How to get the fix:**

* Update the modules with 
    ```
    composer update spryker/product-attribute-gui
    ```
* Remove the lines where `$config[ZedRequestConstants::TRANSFER_USERNAME]` and `$config[ZedRequestConstants::TRANSFER_USERNAME]` are used inside the `config_defaul.php` file. Also, do the same for `config_defaul_{env}_{store}.php` if needed.
***
## Missing “Host” Header Validation (Server-side Injection Vulnerability)
Previously, application functionality was trusting the user-supplied *Host* header. Supplying a malicious Host header for example with a password reset request might lead to a poisoned password reset link and is considered vulnerable for the classic server-side injection. Depending on the configuration of the server and any caching proxies in between, it might also be possible to use this technique for cache poisoning attacks. To prevent this, Yves trusted hosts list `$config[ApplicationConstants::YVES_TRUSTED_HOSTS]` has been utilized, configured and set in the project config files `config_default_AT.php`, `config_default_DE.php`, `config_default_US.php`.

**Affected module:**

* non-split only

**How to get the fix:**
Set a correct value for `$config[ApplicationConstants::YVES_TRUSTED_HOSTS]` in config files on the project level.
***
## Missing Referrer-Policy and Feature-Policy Headers Defaults
Initially, neither *Referrer-Policy* nor *Feature-Policy*  headers were used in the application. In this release, we have fixed the missing security headers Referrer-Policy and Feature-Policy by adjusting `HeadersSecurityServiceProvider::onKernelResponse()` with added Referrer-Policy: `same-origin` and `Feature-Policy:`.

**Affected module:**

* Application (3.18.0)

**How to get the fix:**

1. Update the modules with 

```bash
composer update spryker/application
```

2. Add new `\Spryker\Yves\Application\Communication\Plugin\EventDispatcher\HeadersSecurityEventDispatcherPlugin()` inside the `EventDispatcherDependencyProvider::getEventDispatcherPlugins()` plugins stack for the Yves layer.
3. Add new `\Spryker\Zed\Application\Communication\Plugin\EventDispatcher\HeadersSecurityEventDispatcherPlugin()` inside the `EventDispatcherDependencyProvider::getEventDispatcherPlugins()` plugins stack for the Zed layer.
4. Un-register `Spryker\Shared\Application\ServiceProvider\HeadersSecurityServiceProvider` by removing line `$this->application->register(new HeadersSecurityServiceProvider());` from the `\Pyz\Yves\ShopApplication\YvesBootstrap::registerServiceProviders()` method.

***
## Disabled CSFR Validation in ManualOrderEntryGui
Previously, all form data providers in `ManualOrderEntryGui` module had `csrf_protection` equal to false. This release provides a fix for csrf-protection which had been disabled on the manual order entry in the back-office.

**Affected module:**
ManualOrderEntryGui (0.7.1) <!-- add link https://documentation.spryker.com/module_guide/spryker/manual-order-entry-gui.htm-->

**How to get the fix:**
Update the modules with 

```bash
composer update spryker/manual-order-entry-gui
```
***
## Fixed Various JS Vulnerabilities

* Updated `plotly.js` dependency to the newest version 1.48.3
* Security fix: `safeLoad()` can hang when arrays with nested refs are used as a key. Now an exception is thrown for the nested arrays. Fix possible code execution in (already unsafe) `.load()`.
* Updated `dot` dependency to the newest version 1.1.2.
* Updated `jquery` dependency to the newest version 3.4.1.j
* Query 3.4.0 includes a fix for some unintended behavior when using `jQuery.extend(true, {}, ...)`. If an unsanitized source object contained an enumerable `__proto__` property, it could extend the native `Object.prototype`.
* Updated `bootstrap-sass` dependency to the newest version 3.4.1.
* Fixed an XSS vulnerability (CVE-2019-8331) in our tooltip and popover plugins by implementing a new HTML sanitize.

**Affected modules:**

* Chart (1.2.0)
* Discount (9.1.0)
* ProductRelation (2.3.0)
* Gui (3.23.0)

**How to get the fix:**
1. Update the modules with 

```bash
composer update spryker/chart spryker/discount spryker/product-relation spryker/gui
```
2. Run 

```bash
console frontend:zed:install-dependencies
```
