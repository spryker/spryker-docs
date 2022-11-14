---
title: Security guidelines for on-premise Application
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
  - /docs/scos/dev/guidelines/making-your-spryker-shop-secure.html
related:
  - title: Data Processing Guidelines
    link: docs/scos/dev/guidelines/data-processing-guidelines.html
  - title: Module configuration convention
    link: docs/scos/dev/guidelines/module-configuration-convention.html
  - title: Project development guidelines
    link: docs/scos/dev/guidelines/project-development-guidelines.html
---

This document describes the guidelines for securing your customers' and partners' data.

> Cloud topics related to the configuration infrastructure (like AWS) for customers have been managed by Spryker and not described in the document

## Passwords ```app```

The most important about password security is to not save it in plain text. Therefore, Spryker uses BCrypt based on Blowfish to hash passwords and add a random salt to each hash, preventing rainbow table attacks. To prevent dictionary and brute force attacks, you can force users to use special characters by adding validation rules to needed forms. For even higher security, use 2-factor authentication and CAPTCHA.

## Encrypted communication ```app```

As HTTP is a textual protocol having no built-in encryption, passwords and customer personal data are transferred to shops in plain text. So, a good practice is to configure and implement transport layer security (TLS), which is widely known to most users as HTTPS.

In most cases, it prevents eavesdropping on traffic of users in local public networks like free Wi-Fi hotspots. Besides, it can be used to authenticate users using third-party integrations by requiring a client certificate to be trusted.

You can force HTTPS for the Storefront, Back Office, and Glue using the `Strict-Transport-Security` header:
* `HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`
* `HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`
* `HttpConstants::GLUE_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `HttpConstants::GLUE_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`

## Encrypted communication ```cloud```

For [PaaS+ projects](/docs/paas-plus/dev/platform-as-a-service-plus.html), encyrpted communication is implemented on the infrastructure level.

TLS configuration is configured on the webserver level. See the following configuration references for both web servers:

* [Nginx](https://nginx.org/en/docs/http/configuring_https_servers.html)
* [Apache](https://httpd.apache.org/docs/2.4/ssl/ssl_howto.html)

To test web server configuration, use online tools like [SSL Server Test](https://www.ssllabs.com/ssltest/).

## Session security and hijacking ```app```

Websites include many third-party JavaScript libraries that can access the content of a page.

* To prevent access to session cookies from Javascript, Spryker sets the HttpOnly attribute of the session cookie by default. We advise to set this attribute for all sensitive cookies.
* When using TLS, you can use a `secure` cookie flag to instruct a browser to send this cookie back to the server only via an encrypted connection. To configure it, use the  `*_SESSION_COOKIE_SECURE` configuration keys.
* To prevent session fixation, session identifier is refreshed on login and logout events. We recommend implementing the same behavior for other sensitive cookies if you use them in your shop.
* Make sure that your web server configuration does not cut these flags from cookie headers.
* Make sure that `*_SESSION_COOKIE_DOMAIN` matches only your domain to disallow a browser to send the cookie to another domain or subdomain.
* Never send a session ID as a GET parameter of a URL, because the ID can be logged in logs or forwarded to external websites in HTTP Referer header.

## Cross-site request forgery (CSRF) ```app```

CSRF forces a user to execute unwanted actions while being logged in and either click on a specially crafted link or just embed the URL into some HTML tags triggering the request automatically—for example, the `src` attribute of `img`. To prevent such attacks, Symfony Form provides the `csrf_protection` token by default. We recommend using it in all forms.

## Cross-site scripting (XSS) ```app```

Cross-site scripting is a possibility to inject malicious scripts to be executed in the browser context, for example, for a logged-in user to scrape information from the page or steal cookies. To prevent such vulnerabilities, developers should filter input and sanitize output to prevent rendering HTML or JS code from user input.

Twig template engine has autoescaping enabled by default, so make sure to not use a `raw` filter. HTML should be stripped from user input.

Usually, shop operators are trusted to enter raw HTML. Because you can't limit them in this case, we recommend restricting access to the Back Office and other administrative panels in your shop. For example, introduce a VPN, IP whitelisting, or additional authentication.

Additionally, you can set [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) using `HeadersSecurityServiceProvider`.

## Security between the Storefront and the Back Office ```app```

The Storefront uses HTTP RPC calls to communicate with the Back Office. Secure these calls by enabling Back Office authorization for Storefront requests:

* Set `ZedRequestConstants::AUTH_ZED_ENABLED` and `AuthConstants::AUTH_ZED_ENABLED` to true.
* Set a random value of `AuthConstants::AUTH_DEFAULT_CREDENTIALS[‘zed_request’][‘token’]` for each environment.
* Optional: Change the username used by Storefront in `UserConstants::USER_SYSTEM_USERS`.

## Security between the Storefront and the Back Office ```cloud```

* Implement whitelisting or DMZ between the Storefront and the Back Office. If possible, make the Back Office unavailable publicly.
* When communication is happening through untrusted networks and DMZ is not possible, use TLS. This adds some latency to communication.

## Remote code execution ```app```

Avoid triggering remote code execution as follows:

* Local file inclusion: using unsanitized paths in `include` statements. To limit locations of files to be included, use the `include_path` PHP configuration option.
* Remote file inclusion: avoid using unsanitized URLs or user input in `include` statements.
* Unsafe deserialization. Serialized data should not be sent to the browser and should not be accepted back by the server. During deserialization of serialized data, PHP might instantiate classes mentioned in the payload and invoke some actions. Avoid this behavior or implement signature verification methods to validate this input.
* Command injection: avoid forwarding user input to `exec`, `system`, `passthru`, or similar functions.

## SQL injection ```app```

SQL injections are happening when unsanitized user input is embedded into an SQL statement. Use the following mechanisms to prevent SQL injections:

* Propel to build queries and avoid plain SQL.
* Prepared statements (used by Propel by default) and typed placeholders.
* Casting incoming data to concrete data types like integer or string.
* The `CastId` method in Zed controllers.

## Clickjacking ```app```

Clickjacking is when UI tweaked to force users to click on specific buttons or links. To prevent clickjacking, set correct headers in `X-Frame-Options` and `Content-Security-Policy` provided by `HeadersSecurityServiceProvider`. Make sure that the headers are not deleted by webserver configuration. For more information about clickjacking, see the [OWASP](https://owasp.org/www-community/attacks/Clickjacking) article.

## Obsolete or outdated dependencies ```app```

To make sure that all the security updates are installed, keep Spryker and third-party modules up to date. For upgradability guidelines, see [Keeping a project upgradable](/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).

## Exceptions and debug mode ```app```

Make sure that, in your production environment, the debugging mode is disabled, and exceptions are not shown.


Debug mode is configured with the following:
* `ApplicationConstants::ENABLE_APPLICATION_DEBUG`
* `ShopApplicationConstants::ENABLE_APPLICATION_DEBUG`
* `GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG`

## Demo data ```app```

*Remove all the demo data from the environment*. A project should only use the real data that will be used after going live. Remove all the demo data that comes with Spryker, which includes demo and admin users. Demo admin users in a live shop pose a significant security risk for your project. Also, make sure to set strong passwords when creating new admin users.

## Summary ```app``` + ```cloud```

To sum up, the main points to keep the data secure are the following:

* Educate: Learn and spread [OWASP guidelines](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/migrated_content) in your team.
* Check web server configuration and presence of security-related HTTP headers.
* Check cookie settings.
* Configure TLS.
* Secure the Back Office, do not make it public.
* Check Spryker configuration and change default authentication parameters like users and passwords.
* Keep systems and applications up to date.
* Make sure that exceptions are not shown and debug mode is disabled on production.
