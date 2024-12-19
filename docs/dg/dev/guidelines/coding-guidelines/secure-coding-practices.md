---
title: Secure Coding Practices
description: In this article, we’ll present a series of coding practices that we recommend using when developing an e-commerce application using Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/secure-coding-practices
originalArticleId: 8c51239e-377e-427a-9d1f-4d15c355fa3c
redirect_from:
  - /docs/scos/dev/guidelines/coding-guidelines/secure-coding-practices.html
related:
  - title: Code Architecture Guide
    link: docs/dg/dev/guidelines/coding-guidelines/code-architecture-guide.html
  - title: Code Quality
    link: docs/dg/dev/guidelines/coding-guidelines/code-quality.html
  - title: Code style guide
    link: docs/dg/dev/guidelines/coding-guidelines/code-style-guide.html
---

Unsafe coding practices can make the software application vulnerable to theft of sensitive data. In this article, we’ll present a series of coding practices that we recommend using when developing an e-commerce application using Spryker Commerce OS, that will keep your software solution secured.

## HTTP strict transport security (HSTS)

The HTTP Strict Transport Security policy defines a time frame where a browser must connect to the web server via HTTP. By implementing this policy, you help protect the application against protocol downgrade attacks and cookie hijacking. The HSTS policy instructs the web browser that it can communicate with the server only through HTTP secure connections.

### HSTS mechanism

An application implements the HSTS policy by sending a Strict-Transport-Security HTTP header with each HTTPS response.

The syntax is as follows:

```php
Strict-Transport-Security: max-age=<seconds>[; includeSubDomains]
```

By sending this header in the response, it instructs that future requests to the domain for the next configured time interval should use only HTTPS.

### HSTS mechanism in Spryker

#### Zed

To configure the HSTS policy for Zed, make sure you register `ZedHstsServiceProvider` in `ApplicationDependencyProvider:getServiceProvider(Container $container)`. In the configuration file, setup the timeframe for the HSTS policy. For example, to send a header such that future requests to the domain for the next year use only HTTPS, add the following configuration:

```php
<?php
$config[ApplicationConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED] = true;
$config[ApplicationConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG] = [
    'max_age' => 31536000,
    'include_sub_domains' => true,
    'preload' => true
    ];
```

#### Yves

To configure the HSTS policy for Yves, make sure you register `YvesHstsServiceProvider` in `YvesBootstrap:registerServiceProviders()`.

In the configuration file, setup the timeframe for the HSTS policy. For example, to send a header such that future requests to the domain for the next year use only HTTPS, add the following configuration:

```php
<?php
$config[ApplicationConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED] = true;
$config[ApplicationConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG] = [
    'max_age' => 31536000,
    'include_sub_domains' => true,
    'preload' => true
    ];
```

## Prevent host header attack vulnerability

HTTP_HOST header attacks refer to injecting malicious host in the header of the response. This is caused by inconsistencies in handling the `Host` header. The `Host` can be manipulated by an attacker and have malicious URLs injected.

There are two main ways to exploit this vulnerability. One would be web-cache poisoning and the other is manipulating the password reset emails to contain links to malicious applications.

To prevent this, the HTTP_HOST request header must checked by the application. Spryker integrates Symfony’s trusted_hosts to secure the application from this type of attacks.

You can add the trusted hosts in the configuration file. The trusted hosts must be registered in `ApplicationServiceProvider:register(Application $app)()`

```php
<?php
$trustedHosts = Config::get(ApplicationConstants::YVES_TRUSTED_HOSTS);
Request::setTrustedHosts($trustedHosts);
```

## Code injection vulnerabilities

Code injection refers to any mean that allows the attacker to inject malicious code into a web application so that it gets interpreted and executed. PHP Code Inclusions Vulnerabilities PHP code inclusion vulnerabilities refer to allowing to influence either a part or the entire file name used in an include or require statement. Possible targets for this kind of attack are:

* `include()`
* `include_once()`
* `require()`
* `require_once()`

Untrusted input should be prevented to be used to determine the path to the parameter that’s passed to these functions.

### PHP Code evaluation vulnerabilities

PHP code evaluation vulnerabilities refers to allowing code injection through the parameters of the PHP functions that are evaluating/executing the received input.

This class of vulnerabilities can cause execution of malicious code from remote.

Possible targets for this kind of attacks are:

* `eval()`
* `assert()`
* `unserialize()`
* `exec()`

Untrusted input should be prevented to be passed to the PHP functions that are possible targets for these kind of attacks.
