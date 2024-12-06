---
title: Opentelemetry overview
description: Describing what is Opentelemetry and how Spryker integrates it in the SCCOS
template: howto-guide-template
last_updated: Dec 5, 2024
related:
---

Spryker allows to integrate different monitoring tools like NewRelic into the SCCOS. But usually those tools are vendor locked and allows to work only with limited amount of backends or have not so much customizability options.
In order to give more customisable options, Spryker introduces a OpenTelemetry integration that allows to make your monitoring system be custom tailored for you and in the same time uses open standards that are widely accepted in community.

## Overview

You may want to get familiar with [OpenTelemetry Documentation first](https://opentelemetry.io/docs/concepts/signals/traces/), but we are going to give you a brief overview here too.

### Things that you should know

#### Trace
Trace represents a single transaction. It has an unique ID and all spans are related to it. Trace have a name that is defined automatically or can be changed with `\Spryker\Service\Monitoring\MonitoringServiceInterface::setTransactionName` method if you wire a plugin for it.

#### Span
A span represents a unit of work or operation. Spans are the building blocks of Traces. In OpenTelemetry, they include the following information:
- Name
- Parent span ID (empty for root spans)
- Start and End Timestamps
- Span Context
- Attributes
- Span Events
- Span Links
- Span Status

You can say that Span in our case represents an execution of single method of the class.

#### Hook
OpenTelemetry provide a way to instrument your code without modifying it directly. Hook is a function that execute a function before and after method execution.

Example of hook you can see below. Hooks should be registered before the class is executed.
```php
<?php
\OpenTelemetry\Instrumentation\hook(
                class: CLASS_NAME,
                function: METHOD_NAME,
                pre: static function ($instance, array $params, string $class, string $function, ?string $filename, ?int $lineno) {
                    $context = \OpenTelemetry\Context\Context::getCurrent();

                    $span = \Spryker\Shared\OpenTelemetry\Instrumentation\CachedInstrumentation::getCachedInstrumentation()
                        ->tracer()
                        ->spanBuilder('ModuleName-ClassName::methodName')
                        ->setParent($context)
                        ->setAttribute(\OpenTelemetry\SemConv\TraceAttributes::CODE_FUNCTION, $function)
                        ->setAttribute(\OpenTelemetry\SemConv\TraceAttributes::CODE_NAMESPACE, $class)
                        ->setAttribute(\OpenTelemetry\SemConv\TraceAttributes::CODE_FILEPATH, $filename)
                        ->setAttribute(\OpenTelemetry\SemConv\TraceAttributes::CODE_LINENO, $lineno)
                        ->startSpan();

                    \OpenTelemetry\Context\Context::storage()->attach($span->storeInContext($context));
                },

                post: static function ($instance, array $params, $returnValue, ?\Throwable $exception) {
                    $scope = \OpenTelemetry\Context\Context::storage()->scope();

                    if (null === $scope) {
                        return;
                    }

                    $error = error_get_last();

                    if (is_array($error) && in_array($error['type'], [E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR, E_PARSE], true)) {
                        $exception = new \Exception(
                            'Error: ' . $error['message'] . ' in ' . $error['file'] . ' on line ' . $error['line']
                        );
                    }

                    $scope->detach();
                    $span = \Spryker\Service\Opentelemetry\Instrumentation\Span\Span::fromContext($scope->context());

                    if ($exception !== null) {
                        $span->recordException($exception);
                        $span->setAttribute('error_message', isset($exception) ? $exception->getMessage() : '');
                        $span->setAttribute('error_code', isset($exception) ? $exception->getCode() : '');
                    }

                    $span->setStatus($exception !== null ? \OpenTelemetry\API\Trace\StatusCode::STATUS_ERROR : \OpenTelemetry\API\Trace\StatusCode::STATUS_OK);

                    $span->end();
                }
            );
```

### Collector
Collector does what you think it is. It collects traces and send it to your backend after. Sending traces to collector is done after that request is sent, so it will make a client wait just for that.

## Integration
For the integration you can use a script from a [Installer repo](https://github.com/spryker/opentelemetry-installer/). Use the latest version and run it in your system.
Also all steps can be done manually and with more control from your side.

### Install required packages
Spryker provides a few packages in order to instrument as much of code and services as we can.
- [The main package spryker/opentelemetry](https://packagist.org/packages/spryker/opentelemetry). It includes the entry point for instrumentation, plugin that you can wire in your monitoring service and a console command that allows you to generate [hooks](https://opentelemetry.io/docs/zero-code/php/#how-it-works) that will generate spans automatically.
- [Propel instrumentation package](https://packagist.org/packages/spryker/otel-propel-instrumentation). It instruments all database queries that were made via Propel.
- [RabbitMq instrumentation package](https://packagist.org/packages/spryker/otel-rabbit-mq-instrumentation). Instruments how Spryker works with a Queue via RabbitMQ.
- [Elastic Search instrumentation package](https://packagist.org/packages/spryker/otel-elastica-instrumentation). Instruments calls to the Elasticsearch and adds those to a trace.

Last 3 are optional and you should install them if you are interested that those thins are part of your monitoring system. The spryker/opentelemetry one is a mandatory one to install.

In addition you can install packages from 3rd party vendors to instrument other parts. E.g. we tested `mismatch/opentelemetry-auto-redis` for instrumenting Redis and `open-telemetry/opentelemetry-auto-guzzle` for Guzzle (that is used in Gateway calls in SCCOS).
You also feel free to install packages that you are interested in. Usually such instrumentation packages require only installation and will be auto-wired after.

### (Optional) Install Monitoring module
Opentelemetry integration doesn't require to use Monitoring service. But it allows you to add custom attributes or change your tracaes (transaction) name during the request execution.
You can get a module [here](https://packagist.org/packages/spryker/monitoring).
After an install you can wire a plugin from a spryker/opentelemtry module.
```php
<?php

namespace Pyz\Service\Monitoring;

use Spryker\Service\Monitoring\MonitoringDependencyProvider as SprykerMonitoringDependencyProvider;
use Spryker\Service\Opentelemetry\Plugin\OpentelemetryMonitoringExtensionPlugin;

class MonitoringDependencyProvider extends SprykerMonitoringDependencyProvider
{
    /**
     * @return array<\Spryker\Service\MonitoringExtension\Dependency\Plugin\MonitoringExtensionPluginInterface>
     */
    protected function getMonitoringExtensions(): array
    {
        return [
            new OpentelemetryMonitoringExtensionPlugin(),
        ];
    }
}

```
After that you can call method from Monitoring service and they will be transalted to Opentelemtry action. Be advised that some of the methods are not covered due to the fact  that those things have no direct implementation. E.g. `\Spryker\Service\Opentelemetry\Plugin\OpentelemetryMonitoringExtensionPlugin::markAsConsoleCommand` does nothing and transaction is marked as console command automatically.

### Wire a console command

```php
<?php

namespace Pyz\Zed\Console;

...
use Spryker\Zed\Opentelemetry\Communication\Plugin\Console\OpentelemetryGeneratorConsole;
...

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            ...
            new OpentelemetryGeneratorConsole(),
            ...
        ];

        return $commands;
    }
}

```

Wire new console command into your install script. It allows it to be executed on every deploy and generated filed during it.

```yaml
sections:
    build:
        generate-open-telemetry:
            command: 'vendor/bin/console open-telemetry:generate'
```

### Configure hooks generation

`open-telemetry:generate` command will do a heavy lifting and generate hooks for your code base. You can control what exactly you want to instrument by updating a few configuration methods.

`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getExcludedDirs` - controls what directories MUST NOT be instrumented. You may not want to see in your traces spans from some infra code that is not relevant for you. So you can just exclude the whole directory with a provided name. OOTB we excluded bunch of directories, so you can check it as example.
`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getExcludedSpans` - allows you to exclude specific spans that you noticed in your traces. You need to use specific span name for that.
`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getPathPatterns` - allows to add a path pattern that shows where console command should look for you classes to cover them with hooks. OOTB all Spryker directories are covered together with `Pyz` namespace on the project. Be advised that you should not cover code that is autogenerated.
`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getOutputDir` - specifies in what directory you want to put generated hooks. Default value is `src/Generated/OpenTelemetry/Hooks/`.
`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::areOnlyPublicMethodsInstrumented` - OOTB we cover with hooks only public methods (except Controller classes), but you can change that with this configuration method.
`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getCriticalClassNamePatterns` - some of the spans can be marked as critical in order to give them more priority on sampling. You can define what classes you are interested in for that. OOTB we have Controllers and Facades here.

### Enable PHP extension

Hooks processing require you to have a few PHP extensions in place. Spryker prepares our PHP images, so you need to install nothing, but just enable it in your deploy.yml file

```yaml
namespace: spryker-otel
tag: 'dev'

environment: docker.dev
image:
    tag: spryker/php:8.3
    php:
        ini:
            'opentelemetry.allow_stack_extension': 1
            'grpc.allow_stack_extension': 1
            'protobuf.allow_stack_extension': 1
            'opentelemetry.validate_hook_functions': 'Off'
        enabled-extensions:
            - opentelemetry
            - grpc
            - protobuf
```
Be advised that `blackfire` extension can have a conflict with a `opentelemetry` one, so make sure that you are not using both in the same time.

## Recommendations

Due to the fact that we use PHP code to instrument codebase, you should consider performance. Tracing is an expensive operation and we should use it wisely.

Minimise amount of generated spans per request. OpenTelemetry documentation recommends to have no more than 1000 of them. So you can skip some spans via configuration that are not relevant to you. Don't be afraid, erros will be processed even if the method was not instrumented as Error Event will be attached to the parent span.

Use sampling to not get a full trace every time. You can change a sampling probability with `OTEL_TRACES_SAMPLER_ARG` env variable.

Skip some traces. You may not want to get a full trace for all of your transactions. You can define a probability of detailed trace overview by setting a probability via `TEL_TRACE_PROBABILITY` env variable. Be advised that Trace still will be processed and root span will be there for you. Also requests that are changing something in your application (POST, DELETE, PUT, PATCH) considered as critical and will be processed anyway.