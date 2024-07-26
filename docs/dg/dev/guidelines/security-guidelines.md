---
title: Security guidelines
last_updated: Sep 15, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/making-your-spryker-shop-secure
originalArticleId: 892e11f7-ef46-47ed-aba2-7efc2ea83c60
redirect_from:
  - /docs/scos/dev/guidelines/security-guidelines.html
  - /docs/scos/dev/guidelines/making-your-spryker-shop-secure.html
related:
  - title: Data Processing Guidelines
    link: docs/scos/dev/guidelines/data-processing-guidelines.html
  - title: Module configuration convention
    link: docs/scos/dev/guidelines/module-configuration-convention.html
  - title: Project development guidelines
    link: docs/scos/dev/guidelines/project-development-guidelines.html
---

This document describes the data security guidelines you need to implement on the  application level. Infrastructure security measures are not described, because they are implemented by default cloud environments.

## Passwords

The most important about password security is to not save it in plain text. Therefore, Spryker uses BCrypt based on Blowfish to hash passwords and add a random salt to each hash, preventing rainbow table attacks. To prevent dictionary and brute force attacks, you can force users to use special characters by adding validation rules to needed forms. For even higher security, use 2-factor authentication and CAPTCHA.

## Secrets

Store a secret in a secrets management system. See [Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html) for more information about secrets and parameters.

## Encrypted communication

As HTTP is a textual protocol having no built-in encryption, passwords and customer personal data are transferred to shops in plain text. So, a good practice is to configure and implement transport layer security (TLS), which is widely known to most users as HTTPS.

In most cases, it prevents eavesdropping on traffic of users in local public networks like free Wi-Fi hotspots. Besides, it can be used to authenticate users using third-party integrations by requiring a client certificate to be trusted.

You can force HTTPS for the Storefront, Back Office, and Glue using the `Strict-Transport-Security` header:
* `HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`
* `HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`
* `HttpConstants::GLUE_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::GLUE_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`

## Access to the Back Office and Merchant Portal

The Back Office and Merchant Portal applications serve as administration panels. So, we highly recommend adding an extra layer of security by introducing a VPN, IP whitelisting, or additional authentication. This ensures that only authorized users have access to them.

## Allowlisting IP addresses of third-party systems

We highly recommend allowlisting the IP Addresses of third-party systems, such as ERP or WMS. To request allowlisting, provide the IP addresses or CIDR by [creating a support case](https://support.spryker.com)

## Security Headers

Security headers are directives used by web applications to configure security defenses in web browsers.
Based on these directives, browsers can make it harder to exploit client-side vulnerabilities such as Cross-Site Scripting or Clickjacking.
Headers can also be used to configure the browser to only allow valid TLS communication and enforce valid certificates,
or even enforce using a specific server certificate.

The sections below detail configure places for various security headers. You can change them at the project level.

### X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Content-Security-Policy

#### Yves
For Yves set of default security headers in: `\Spryker\Yves\Application\ApplicationConfig::getSecurityHeaders()`.

Default values:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: frame-ancestors 'self'; sandbox allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation; base-uri 'self'; form-action 'self'
```

#### Zed

For Zed set of default security headers in: `\Spryker\Zed\Application\ApplicationConfig::getSecurityHeaders()`.

Default values:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: frame-ancestors 'self'
```

#### Glue

For Glue set of default security headers in:  `\Spryker\Glue\GlueApplication\GlueApplicationConfig::getSecurityHeaders()`.

Default values:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: frame-ancestors 'self'
```

#### Glue Storefront

Glue is in the set of default security headers in: `\Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationConfig:::getSecurityHeaders()`.

Default values:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: frame-ancestors 'self'
```

#### Glue Backend

Glue is in the set of default security headers in: `\Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationConfig::getSecurityHeaders()`.

Default values:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: frame-ancestors 'self'
```

####  Cache-Control header

You can enable custom Cache-Control header for the Storefront, Back Office, and Glue using plugins:
* `Spryker\Zed\Http\Communication\Plugin\EventDispatcher\CacheControlHeaderEventDispatcherPlugin` plugin can be added into application specific method for Zed `\Pyz\Zed\EventDispatcher::getEventDispatcherPlugins()`
and configure using: `Spryker\Shared\Http\HttpConstants::ZED_HTTP_CACHE_CONTROL_ENABLED`, `Spryker\Shared\Http\HttpConstants::ZED_HTTP_CACHE_CONTROL_CONFIG`.
* `Spryker\Yves\Http\Plugin\EventDispatcher\CacheControlHeaderEventDispatcherPlugin` plugin can be added into application specific method for Yves `\Pyz\Yves\EventDispatcher::getEventDispatcherPlugins()`
  and configure using: `Spryker\Shared\Http\HttpConstants::YVES_HTTP_CACHE_CONTROL_ENABLED`, `Spryker\Shared\Http\HttpConstants::YVES_HTTP_CACHE_CONTROL_CONFIG`.
* `Spryker\Glue\Http\Plugin\EventDispatcher\CacheControlHeaderEventDispatcherPlugin` plugin can be added into application specific method for Glue `\Pyz\Glue\EventDispatcher::getEventDispatcherPlugins()`
  and configure using: `Spryker\Shared\Http\HttpConstants::GLUE_HTTP_CACHE_CONTROL_ENABLED`, `Spryker\Shared\Http\HttpConstants::GLUE_HTTP_CACHE_CONTROL_CONFIG`.




## Session security and hijacking

Websites include many third-party JavaScript libraries that can access the content of a page.

* To prevent access to session cookies from Javascript, Spryker sets the HttpOnly attribute of the session cookie by default. We advise to set this attribute for all sensitive cookies.
* When using TLS, you can use a `secure` cookie flag to instruct a browser to send this cookie back to the server only via an encrypted connection. To configure it, use the  `*_SESSION_COOKIE_SECURE` configuration keys.
* To prevent session fixation, session identifier is refreshed on login and logout events. We recommend implementing the same behavior for other sensitive cookies if you use them in your shop.
* Make sure that your web server configuration does not cut these flags from cookie headers.
* Make sure that `*_SESSION_COOKIE_DOMAIN` matches only your domain to disallow a browser to send the cookie to another domain or subdomain.
* Never send a session ID as a GET parameter of a URL, because the ID can be logged in logs or forwarded to external websites in HTTP Referer header.

## Cross-site request forgery (CSRF)

CSRF forces a user to execute unwanted actions while being logged in and either click on a specially crafted link or just embed the URL into some HTML tags triggering the request automatically—for example, the `src` attribute of `img`. To prevent such attacks, Symfony Form provides the `csrf_protection` token by default. We recommend using it in all forms.

## Cross-site scripting (XSS)

Cross-site scripting is a possibility to inject malicious scripts to be executed in the browser context, for example, for a logged-in user to scrape information from the page or steal cookies. To prevent such vulnerabilities, developers should filter input and sanitize output to prevent rendering HTML or JS code from user input.

Twig template engine has autoescaping enabled by default, so make sure to not use a `raw` filter. HTML should be stripped from user input.

Usually, shop operators are trusted to enter raw HTML. Because you can't limit them in this case, we recommend restricting access to the Back Office and other administrative panels in your shop. For example, introduce a VPN, IP whitelisting, or additional authentication.

Additionally, you can set [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) using `HeadersSecurityServiceProvider`.

## Security between the Storefront and the Back Office

The Storefront uses HTTP RPC calls to communicate with the Back Office. Secure these calls by enabling Back Office authorization for Storefront requests:

* Set `ZedRequestConstants::AUTH_ZED_ENABLED` and `AuthConstants::AUTH_ZED_ENABLED` to true.
* Set a random value of `AuthConstants::AUTH_DEFAULT_CREDENTIALS[‘zed_request’][‘token’]` for each environment.
* Optional: Change the username used by Storefront in `UserConstants::USER_SYSTEM_USERS`.

## Remote code execution

Avoid triggering remote code execution as follows:

* Local file inclusion: using unsanitized paths in `include` statements. To limit locations of files to be included, use the `include_path` PHP configuration option.
* Remote file inclusion: avoid using unsanitized URLs or user input in `include` statements.
* Unsafe deserialization. Serialized data should not be sent to the browser and should not be accepted back by the server. During deserialization of serialized data, PHP might instantiate classes mentioned in the payload and invoke some actions. Avoid this behavior or implement signature verification methods to validate this input.
* Command injection: avoid forwarding user input to `exec`, `system`, `passthru`, or similar functions.

## SQL injection

SQL injections are happening when unsanitized user input is embedded into an SQL statement. Use the following mechanisms to prevent SQL injections:

* Propel to build queries and avoid plain SQL.
* Prepared statements (used by Propel by default) and typed placeholders.
* Casting incoming data to concrete data types like integer or string.
* The `CastId` method in Zed controllers.

## Clickjacking

Clickjacking is when UI tweaked to force users to click on specific buttons or links. To prevent clickjacking, set correct headers in `X-Frame-Options` and `Content-Security-Policy` provided by `HeadersSecurityServiceProvider`. Make sure that the headers are not deleted by webserver configuration. For more information about clickjacking, see the [OWASP](https://owasp.org/www-community/attacks/Clickjacking) article.

## Obsolete or outdated dependencies

To make sure that all the security updates are installed, keep Spryker and third-party modules up to date. For upgradability guidelines, see [Keeping a project upgradable](/docs/dg/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).

## Packages security vulnerabilities

To be up-to-speed with the security vulnerabilities, we recommend doing the following:

- Check if Spryker packages have known vulnerabilities. We recommend checking [security release notes](https://docs.spryker.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes.html) under every release.
- Verify whether `composer` packages have known vulnerabilities. You can use the `./vendor/bin/console security:check` command to inspect third-party vulnerabilities.
- Verify whether `npm` packages have known vulnerabilities. You can use `npm audit` command to inspect third-party vulnerabilities.

## Exceptions and debug mode

Make sure that, in your production environment, the debugging mode is disabled, and exceptions are not shown.


Debug mode is configured with the following:
* `ApplicationConstants::ENABLE_APPLICATION_DEBUG`
* `ShopApplicationConstants::ENABLE_APPLICATION_DEBUG`
* `GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG`

## Demo data

*Remove all the demo data from the environment*. A project should only use the real data that will be used after going live. Remove all the demo data that comes with Spryker, which includes demo and admin users. Demo admin users in a live shop pose a significant security risk for your project. Also, make sure to set strong passwords when creating new admin users.

## OAuth configuration

We recommend using environment variables to define security configuration. Example:
```php
$config[OauthConstants::PRIVATE_KEY_PATH] = getenv('SPRYKER_OAUTH_KEY_PRIVATE');
$config[OauthConstants::PUBLIC_KEY_PATH]
    = $config[OauthCryptographyConstants::PUBLIC_KEY_PATH]
    = getenv('SPRYKER_OAUTH_KEY_PUBLIC');
$config[OauthConstants::ENCRYPTION_KEY] = getenv('SPRYKER_OAUTH_ENCRYPTION_KEY') ?: null;
$config[OauthConstants::OAUTH_CLIENT_CONFIGURATION] = json_decode(getenv('SPRYKER_OAUTH_CLIENT_CONFIGURATION'), true) ?: [];
```

## ACL configuration

* Make sure that, acl configuration to suit your requirements and restrict access to sensitive data. For more information, see [ACL configuration](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-portal-core-feature-overview/persistence-acl-configuration.html).


## Summary

To sum up, the main points to keep the data secure are the following:

* Educate: Learn and spread [OWASP guidelines](https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf) in your team.
* Check the presence of security-related HTTP headers.
* Check cookie settings.
* Configure TLS.
* Secure the Back Office.
* Check the Spryker configuration and change default authentication parameters like users and passwords.
* Keep systems and applications up to date.
* Make sure that exceptions are not shown and debug mode is disabled on production.
* Make sure that the keys data is taken from secure environment variables and is not embedded into the configuration files.
