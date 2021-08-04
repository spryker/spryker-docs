---
title: Making Your Spryker Shop Secure
originalLink: https://documentation.spryker.com/v4/docs/making-your-spryker-shop-secure
redirect_from:
  - /v4/docs/making-your-spryker-shop-secure
  - /v4/docs/en/making-your-spryker-shop-secure
---

Digital security is critical in our modern digital world, especially for successful businesses. Therefore, Spryker is advising to go through the following security actions to ensure the safety of your customers’ and partners’ data.

## Security Advisory
### Passwords
The most important about password security is not to save it in plain text. Therefore, Spryker uses BCrypt, which uses Blowfish to hash a password and adds a random salt to each hash, preventing Rainbow-Table based attacks. Additionally, you can force your users to use special characters to prevent dictionary-attacks or brute-forcing by adding validation rules to relevant forms. In case you need even higher security, you can use the 2-factor authentication mechanisms to increase security, and CAPTCHA systems to prevent brute-force.

### Encrypted communication
Passwords and customer personal data are transferred to shop in plain text since HTTP is a textual protocol having no built-in encryption. Therefore, a good practice is to configure and implement transport layer security, also known as TLS, which is widely known to most users as HTTPS.

In most cases, it allows preventing eavesdropping on traffic of your users in local public  networks like free Wi-Fi hotspots.

Besides, it can be used to authenticate parties passwordless in integrations with other systems by requiring a client certificate to be trusted.

TLS configuration is not applied to Spryker directly, but is configured on the webserver level:

* [Nginx](https://nginx.org/en/docs/http/configuring_https_servers.html) 
* [Apache](https://httpd.apache.org/docs/2.4/ssl/ssl_howto.html) 

Forcing HTTPS can also be done via the `Strict-Transport-Security` header and can be configured for Yves and Zed with:
* `ApplicationConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `ApplicationConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED`
* `ApplicationConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`
* `ApplicationConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG`

Server configuration can be tested with online tools like  [SSL Server Test](https://www.ssllabs.com/ssltest/).

### Session security and session hijacking
Modern websites include many third-party Javascript libraries that could access the content of the page:
* To prevent access to session cookies from Javascript, Spryker sets the httponly attribute of the session cookie by default. It is advised to set this attribute for all sensitive cookies.
* In addition, when using TLS, a *secure* cookie flag can be used to instruct the browser to send this cookie back to the server only via an encrypted connection. These can be configured with `*_SESSION_COOKIE_SECURE` configuration keys.
* To prevent session fixation, the session identifier is refreshed on login and logout events. It is suggested to implement the same behavior for other sensitive cookies if you use them in your shop.
* Check that your web server configuration does not cut these flags from cookie headers.
* Pay attention to `*_SESSION_COOKIE_DOMAIN` to match only your domain to disallow the browser to send the cookie to another domain or subdomain.
* Never send a session ID as a GET parameter of a URL, because these can be logged in logs or forwarded to external websites in HTTP Referer header.

### Cross-site request forgery (CSRF)
CSRF forces a user to execute unwanted actions while being logged in and either clicking on a specially crafted link or just embedding the URL into some HTML tags triggering the request automatically (for example, the *src* attribute of the *img*). To prevent such attacks, Symfony Form provides the `csrf_protection` token by default. It is advisable to use this functionality in all forms.

### Cross-site scripting (XSS)
Cross-site scripting is a possibility to inject malicious scripts to be executed in the browser context, for example, for a logged-in user to scrape information from the page or steal cookies. To prevent such vulnerabilities, developers should filter input and sanitize output to prevent rendering HTML or JS code from user input.

Twig template engine has autoescaping enabled by default, so developers should pay attention to not using a “raw” filter. HTML should be stripped from user input.

Usually, shop operators are trusted to enter raw HTML. In this case, it is impossible to limit them, and it is advised to increase security by restricting access to the administrative panel and to hide Zed with, for example, VPN, IP whitelisting, or introducing additional authentication.

In addition “X-XSS-Protection” can be set via `HeadersSecurityServiceProvider`. See the [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) article for details.

### Yves-&gt;Zed Security
Yves uses HTTP RPC calls to communicate with Zed. These calls can be secured in different ways:
* Securing Zed with whitelisting and implementing isolated DMZ between Yves and Zed. It is strongly recommended not to make Zed publicly available.
* Using TLS for communication if it is happening through untrusted networks when DMZ is not possible (see previous sections). But this adds some latency to communication.
* Enabling Zed authorization for Yves requests:
    * `ZedRequestConstants::AUTH_ZED_ENABLED` and `AuthConstants::AUTH_ZED_ENABLED` should be set to true.
    * `AuthConstants::AUTH_DEFAULT_CREDENTIALS[‘yves_system’][‘token’]` should be set to a random value for each environment.
    * Optionally: change a user name used by Yves via `UserConstants::USER_SYSTEM_USERS`.

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
Clickjacking is a possibility to tweak the UI or craft a malicious webpage, embedding the attacked one to force the user to click on specific buttons or links. Clickjacking is prevented by setting correct headers in “X-Frame-Options” and “Content-Security-Policy” already provided by `HeadersSecurityServiceProvider`. However, make sure that the headers are not deleted by webserver configuration. For more information about clickjacking, see the [OWASP](https://www.owasp.org/index.php/Clickjacking) article.

### Obsolete or outdated dependencies
Keep your dependencies up-to-date.

### Summary
To sum up, the main points recommended to keep the data secure are:

* Educate: Learn and spread OWASP guidelines in your team
* Check web server configuration and presence of security-related HTTP headers
* Check cookie settings
* Configure TLS
* Secure Zed, do not make it public
* Check Spryker configuration and change default authentication parameters (users, passwords)
* Keep systems and applications up-to-date

<!-- Last review date: Nov 19, 2019 -->

