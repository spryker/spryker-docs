---
title: Security guidelines
last_updated: Sep 2, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/making-your-spryker-shop-secure
originalArticleId: 892e11f7-ef46-47ed-aba2-7efc2ea83c60
redirect_from:
  - /2021080/docs/making-your-spryker-shop-secure
  - /2021080/docs/en/making-your-spryker-shop-secure
  - /docs/making-your-spryker-shop-secure
  - /docs/en/making-your-spryker-shop-secure
  - /v6/docs/making-your-spryker-shop-secure
  - /v6/docs/en/making-your-spryker-shop-secure
  - /v5/docs/making-your-spryker-shop-secure
  - /v5/docs/en/making-your-spryker-shop-secure
  - /v4/docs/making-your-spryker-shop-secure
  - /v4/docs/en/making-your-spryker-shop-secure
related:
  - title: Data Processing Guidelines
    link: docs/scos/dev/guidelines/data-processing-guidelines.html
  - title: Module configuration convention
    link: docs/scos/dev/guidelines/module-configuration-convention.html
  - title: Project development guidelines
    link: docs/scos/dev/guidelines/project-development-guidelines.html
---

This doc describes the guidelines for securing your customers' and partners' data.

## Passwords

The most important about password security is to not save it in plain text. Therefore, Spryker uses BCrypt, which uses Blowfish to hash passwords and add a random salt to each hash, preventing rainbow table attacks. To prevent dictionary and brute force attacks, you can force users to use special characters by adding validation rules to needed forms. For even higher security, use 2-factor authentication and CAPTCHA.

## Encrypted communication

As HTTP is a textual protocol having no built-in encryption, passwords and customer personal data are transferred to shops in plain text. So, a good practice is to configure and implement transport layer security (TLS), which is widely known to most users as HTTPS.

In most cases, it prevents eavesdropping on traffic of users in local public networks like free Wi-Fi hotspots. Besides, it can be used to authenticate users using third-party integrations by requiring a client certificate to be trusted.

TLS configuration is configured on the webserver level. See the following configuration references for both web servers:

* [Nginx](https://nginx.org/en/docs/http/configuring_https_servers.html)
* [Apache](https://httpd.apache.org/docs/2.4/ssl/ssl_howto.html)

Optionally, you can force HTTPS for the Storefront, Back Office, and Glue using the  `Strict-Transport-Security` header:
* `HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`
* `HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`
* `HttpConstants::GLUE_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::GLUE_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`

To test web server configuration, use online tools like [SSL Server Test](https://www.ssllabs.com/ssltest/).

## Session security and hijacking

Modern websites include many third-party JavaScript libraries that can access the content of the page:

* To prevent access to session cookies from Javascript, Spryker sets the HttpOnly attribute of the session cookie by default. We advise to set this attribute for all sensitive cookies.
* When using TLS, you can use a `secure` cookie flag to instruct a browser to send this cookie back to the server only via an encrypted connection. To configure it, use the  `*_SESSION_COOKIE_SECURE` configuration keys.
* To prevent session fixation, session identifier is refreshed on login and logout events. We recommend implementing the same behavior for other sensitive cookies if you use them in your shop.
* Make sure that your web server configuration does not cut these flags from cookie headers.
* Make sure that `*_SESSION_COOKIE_DOMAIN` matches only your domain to disallow a browser to send the cookie to another domain or subdomain.
* Never send a session ID as a GET parameter of a URL, because the ID can be logged in logs or forwarded to external websites in HTTP Referer header.

### Cross-site request forgery (CSRF)

CSRF forces a user to execute unwanted actions while being logged in and either clicking on a specially crafted link or just embedding the URL into some HTML tags triggering the request automatically (for example, the *src* attribute of the *img*). To prevent such attacks, Symfony Form provides the `csrf_protection` token by default. It is advisable to use this functionality in all forms.

### Cross-site scripting (XSS)

Cross-site scripting is a possibility to inject malicious scripts to be executed in the browser context, for example, for a logged-in user to scrape information from the page or steal cookies. To prevent such vulnerabilities, developers should filter input and sanitize output to prevent rendering HTML or JS code from user input.

Twig template engine has autoescaping enabled by default, so developers should pay attention to not using a “raw” filter. HTML should be stripped from user input.

Usually, shop operators are trusted to enter raw HTML. In this case, it is impossible to limit them, and it is advised to increase security by restricting access to the administrative panel and to hide Zed with, for example, VPN, IP whitelisting, or introducing additional authentication.

In addition “X-XSS-Protection” can be set via `HeadersSecurityServiceProvider`. See the [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) article for details.

### Yves-&gt;Zed security

Yves uses HTTP RPC calls to communicate with Zed. These calls can be secured in different ways:
* Securing Zed with whitelisting and implementing isolated DMZ between Yves and Zed. It is strongly recommended not to make Zed publicly available.
* Using TLS for communication if it is happening through untrusted networks when DMZ is not possible (see previous sections). But this adds some latency to communication.
* Enabling Zed authorization for Yves requests:
    * `ZedRequestConstants::AUTH_ZED_ENABLED` and `AuthConstants::AUTH_ZED_ENABLED` should be set to true.
    * `AuthConstants::AUTH_DEFAULT_CREDENTIALS[‘zed_request’][‘token’]` should be set to a random value for each environment.
    * Optionally: change a user name used by Yves via `UserConstants::USER_SYSTEM_USERS`.

Previously, we used the configuration key `yves_system` but this wasn't reflecting that this key is used for all applications that do make requests to the Zed application. We kept the possibility to use `yves_system` for backwards-compatibility.

### Remote code execution

There are many possibilities to trigger remote code execution in a web application:

* Local file inclusion: using unsanitized paths in *include* statements. PHP provides the `include_path` configuration option to limit locations of files to be included.
* Remote file inclusion: using unsanitized URLs or user input in *include* statements. These should be avoided by developers.
* Unsafe deserialization. Serialized data should not be sent to the browser and should not be accepted back by the server. During deserialization of serialized data, PHP might instantiate classes mentioned in the payload and invoke some actions. This should be avoided by developers, or signature verification methods should be in place to validate this input.
* Command injection: user input should not be forwarded to “exec”, “system”, “passthru” or similar functions.

### SQL Injection

SQL injections are happening when unsanitized user input is embedded into an SQL statement. You can use the following mechanisms to prevent SQL injections:

* Propel to build queries and avoid plain SQL
* Prepared statements (used by Propel by default) and typed placeholders
* Casting incoming data to concrete data types, for example, integer, string etc.
* `CastId` method in Zed controllers

Given Spryker limits access to an SQL database only for Zed, and Yves does not have access to it, then an additional measure is to limit access to Zed for the public via VPN, IP whitelisting, etc.

### Clickjacking

Clickjacking is a possibility to tweak the UI or craft a malicious webpage, embedding the attacked one to force the user to click on specific buttons or links. Clickjacking is prevented by setting correct headers in “X-Frame-Options” and “Content-Security-Policy” already provided by `HeadersSecurityServiceProvider`. However, make sure that the headers are not deleted by webserver configuration. For more information about clickjacking, see the [OWASP](https://owasp.org/www-community/attacks/Clickjacking) article.

### Obsolete or outdated dependencies

To make sure that all the security updates are installed, keep Spryker and third-party modules up to date.

### Exceptions/Debug

Make sure that, in your production environment, the debugging mode is disabled, and exceptions are not shown.


Debug mode is configured with:
* `ApplicationConstants::ENABLE_APPLICATION_DEBUG`
* `ShopApplicationConstants::ENABLE_APPLICATION_DEBUG`
* `GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG`

### Demo data

*Remove all the demo data from the environment*. The project should only use the real data that will be used after the go-live. Remove all the demo data that comes with the Spryker repository, which includes demo and admin users. Demo admin users in a live shop pose a significant security risk for your project. In addition, make sure to set strong passwords when creating new admin users.

### Summary

To sum up, the main points recommended to keep the data secure are:

* Educate: Learn and spread OWASP guidelines in your team
* Check web server configuration and presence of security-related HTTP headers
* Check cookie settings
* Configure TLS
* Secure Zed, do not make it public
* Check Spryker configuration and change default authentication parameters (users, passwords)
* Keep systems and applications up-to-date
* Make sure that exceptions are not shown and debug mode is disabled on production
