  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/router-generates-absolute-url-with-localhost.html
---
title: Router generates absolute URL with localhost
description: Learn how to fix the issue when router generates URLs with an absolute path instead of a relative one
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/router-generates-absolute-url-with-localhost
originalArticleId: d9195e61-e421-4623-88bf-343a48b2d707
redirect_from:
  - /2021080/docs/router-generates-absolute-url-with-localhost
  - /2021080/docs/en/router-generates-absolute-url-with-localhost
  - /docs/router-generates-absolute-url-with-localhost
  - /docs/en/router-generates-absolute-url-with-localhost
  - /v6/docs/router-generates-absolute-url-with-localhost
  - /v6/docs/en/router-generates-absolute-url-with-localhost
related:
  - title: A command fails with a `Killed` message
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/a-command-fails-with-a-killed-message.html
  - title: Class Silex/ControllerProviderInterface not found
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/class-silex-controllerproviderinterface-not-found.html
  - title: Composer version 2 compatibility issues
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/composer-version-2-compatibility-issues.html
  - title: ERROR - remove spryker_logs - volume is in use
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/error-remove-spryker-logs-volume-is-in-use.html
  - title: Error response from daemon - OCI runtime create failed - .... \\\"no such file or directory\\\"\""- unknown
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/error-response-from-daemon-oci-runtime-create-failed-no-such-file-or-directory-unknown.html
  - title: Fail whale on the frontend
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/fail-whale-on-the-front-end.html
  - title: No data on the Storefront
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/no-data-on-the-storefront.html
  - title: PHPStan memory issues
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/phpstan-memory-issues.html
  - title: ProcessTimedOutException after queue-task-start
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/processtimedoutexception-after-queue-task-start.html
  - title: RabbitMQ - Zed.CRITICAL- PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq-zed.critical-phpamqplib-exception-amqpchannelclosedexception-channel-connection-is-closed.html
  - title: RuntimeException - Failed to execute regex - PREG_JIT_STACKLIMIT_ERROR
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error.html
  - title: The spy_oms_transition_log table takes up too much space
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html
  - title: Unable to resolve hosts for Mail, Jenkins, and RabbitMQ
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/unable-to-resolve-hosts-for-mail-jenkins-and-rabbitmq.html
---

Router generates URLs with an absolute path instead of a relative one.

## Cause

Prior to version 1.9.0 of the [Router](https://github.com/spryker/router) module, Spryker did not set the `RequestContext` properly in `ChainRouter`. This led to an issue that URLs were generated with an absolute path instead of a relative one. This silently happens inside Symfony's router when the host retrieved from `RequestContext` doesn't match the one that the resolved route has.

## Solution

Do the following:

1. Update the [Router](https://github.com/spryker/router) module to at least version 1.9.0.
2. Set `RequestContext` as follows: Extend `\Spryker\Yves\Router\Router\ChainRouter` in your project, add a new `addRequestContext()` method to it and call that method in the constructor of that class.

```php
/**
 * @param \Symfony\Component\Routing\RequestContext|null $requestContext
 *
 * @return void
 */
protected function addRequestContext(?RequestContext $requestContext = null): void
{
    $request = Request::createFromGlobals();

    if (!$requestContext) {
        $requestContext = new RequestContext();
    }
    $requestContext->fromRequest($request);

    $this->setContext($requestContext);
}

```

3. Update the constructor:

```php
/**
 * @param \Spryker\Yves\RouterExtension\Dependency\Plugin\RouterPluginInterface[] $routerPlugins
 * @param \Psr\Log\LoggerInterface|null $logger
 * @param \Symfony\Component\Routing\RequestContext|null $requestContext
 */
public function __construct(array $routerPlugins, ?LoggerInterface $logger = null, ?RequestContext $requestContext = null)
{
    parent::__construct($logger);

    $this->addRequestContext($requestContext);
    $this->addRouterPlugins($routerPlugins);
}
```
