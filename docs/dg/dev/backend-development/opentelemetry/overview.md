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
                class: MyClass::class,
                function: 'methodName',
                pre: static function ($instance, array $params, string $class, string $function, ?string $filename, ?int $lineno) {
                    $context = \OpenTelemetry\Context\Context::getCurrent();

                    $span = \Spryker\Shared\OpenTelemetry\Instrumentation\CachedInstrumentation::getCachedInstrumentation()
                        ->tracer()
                        ->spanBuilder('ModuleName-MyClass::methodName')
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
Collector does what you think it is. It collects traces and send it to your backend after. Sending traces to collector is done after that request is sent, so it will not make a client wait just for that.

## Integration
For the integration you can use a script from a [Installer repo](https://github.com/spryker/opentelemetry-installer/). Use the latest version and run it in your system.
Below you can see what steps this script executes if you want to do everything manually.

### Install required packages
OpenTelementry provides instrumentation via packages that can be installed and register hooks automatically. If you want to instrument something that is not covered in our code base, but is required for you, you can try to install packages that are listed [here](https://opentelemetry.io/ecosystem/registry/?language=php) or something that you consider useful for you from other sources.
Spryker provides [spryker/opentelemetry](https://packagist.org/packages/spryker/opentelemetry) package that covers essential parts. It includes the entry point for instrumentation, plugin that you can wire in your monitoring service and a console command that allows you to generate [hooks](https://opentelemetry.io/docs/zero-code/php/#how-it-works) that will generate spans automatically. Also it includes instrumentation of Propel, Redis, ElasticSeach and RabbitMQ calls.
In addition, you may want to install a `open-telemetry/opentelemetry-auto-guzzle` package to cover Guzzle calls to 3rd party services or to the services in your application.

### (Optional) Install Monitoring module
Opentelemetry integration doesn't require to use Monitoring service, but this is highly recommended as it allows you to add custom attributes, change your traces (transaction) name during the request execution and have exceptions added to the root span for visibility.
You can get a module [here](https://packagist.org/packages/spryker/monitoring).
After install you can wire a Monitoring plugin from a `spryker/opentelemtry` module to get all listed features.
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
After that you can call method from Monitoring service and they will be translated to OpenTelemetry action. Be advised that some of the methods are not covered due to the fact that those things have no direct implementation, like `\Spryker\Service\Opentelemetry\Plugin\OpentelemetryMonitoringExtensionPlugin::markStartTransaction()` as transaction will start anyway.

### Wire a console command

Provided console command used to generate hooks automatically for classes that you want to be covered with spans.
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

`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getExcludedDirs()` - controls what directories MUST NOT be instrumented. You may not want to see in your traces spans from some infra code that is not relevant for you. So you can just exclude the whole directory with a provided name. OOTB we excluded a bunch of directories, so you can check it as example.
```php
class OpentelemetryConfig extends AbstractBundleConfig
{
    // We don't want to have traces for Monitroing module, Opentelemetry module and tests in existing module, so those will be excluded even if we scan those directories during the generation
    public function getExcludedDirs(): array
    {
        return [
        ...
            'Monitoring',
            'OpenTelemetry',
            'tests',
        ...
        ];
    }
}
```

`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getExcludedSpans()` - allows you to exclude specific spans that you noticed in your traces. You need to use specific span name for that.
```php
class OpentelemetryConfig extends AbstractBundleConfig
{
    // In this example we are not going to generate a span with a 'User-UserFacade::isSystemUser' name as it's not relevant for our traces, but in the same time it's called a lot of times during the request
    public function getExcludedSpans(): array
    {
        return [
            ...
            'User-UserFacade::isSystemUser',
            ...
        ];
    }

}
```

`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getPathPatterns()` - allows to add a path pattern that shows where console command should look for you classes to cover them with hooks. OOTB all Spryker directories are covered together with `Pyz` namespace on the project. Be advised that you should not cover code that is autogenerated.
```php
class OpentelemetryConfig extends AbstractBundleConfig
{
    public function getPathPatterns(): array
    {
        return [
            '#^vendor/spryker/[^/]+/.*/.*/(Zed|Shared)/.*/(?!Persistence|Presentation)[^/]+/.*#',
            '#^vendor/spryker/[^/]+/Glue.*#',
            '#^vendor/spryker(?:/spryker)?-shop/[^/]+/.*#',
            '#^vendor/spryker-eco/[^/]+/.*#',
            '#^src/Pyz/.*#',
        ];
    }

}
```

`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getOutputDir()` - specifies in what directory you want to put generated hooks. Default value is `src/Generated/OpenTelemetry/Hooks/`.
```php
class OpentelemetryConfig extends AbstractBundleConfig
{
    public function getOutputDir(): string
    {
        return APPLICATION_SOURCE_DIR . '/Generated/OpenTelemetry/Hooks/';
    }

}
```

`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::areOnlyPublicMethodsInstrumented()` - OOTB we cover with hooks only public methods (except Controller classes), but you can change that with this configuration method.
```php
class OpentelemetryConfig extends AbstractBundleConfig
{
    public function areOnlyPublicMethodsInstrumented(): bool
    {
        return true;
    }

}
```

`\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getCriticalClassNamePatterns()` - some of the spans can be marked as critical in order to give them more priority on sampling. You can define what classes you are interested in for that. OOTB we have Controllers and Facades here.
```php
class OpentelemetryConfig extends AbstractBundleConfig
{
    public function getCriticalClassNamePatterns(): array
    {
        return [
            'Facade',
            'Controller',
        ];
    }

}
```

### Enable PHP extension

Hooks processing require you to have a few PHP extensions in place. Spryker prepares our PHP images, so you need to install nothing, but just enable it in your deploy file

```yaml
namespace: spryker-otel
tag: 'dev'

environment: docker.dev
image:
    tag: spryker/php:8.3
    php:
        enabled-extensions:
            - opentelemetry
            - grpc
            - protobuf
```
Be advised that `blackfire` extension can have a conflict with a `opentelemetry` one, so make sure that you are not using both in the same time.

## Sampling
As already mentioned before, spans can be sampled. But what does it means?
Spryker is a big application with humongous amount of methods executed during the request. Some of them executed a lot of times. OpenTelemetry uses a PHP functions to open and close spans. This can add not desired load on your application, so we have a instruments to keep only things that are relevant for your application.
In our implementation sampling is done twice during the execution - first before we even open a span and second time after a span is closing.
In addition some requests can be not sampled completely in the same fashion with trace sampling.

### Opening span sampling
When we execute a method that is covered with hooks, we are trying to open a span for that piece of the code. But we don't want to open spans for each and every method that is instrumented. In this case before we open a span, we check some probability if we want to do so or not.
For doing so we generate a random float number from 0 to 1. After that we compare it to a configuration value and of the generated number is less than configured one - span will be sampled and opened. But if the number is bigger - span will be omitted and empty span will be opened instead. Empty span will not be shown in your traces.

### Closing span sampling
We also may want to filter super fast spans that had no errors inside of them. After the sampled span is closing we are checking it execution time and status. If span is successful and faster than a configured value it will also be omitted and will not appear in a trace.

### Tracing sampling
In addition, if you don't even want to instrument some part of your traces, you can sample them in the same fashion as `Opening span sampling`. There is also a probability that is used to decide if we are going to see a trace with all sampled spans or just a root one.
In order to not lose traces that were executed with errors, all exceptions that were thrown during the execution, still will be present in the root span.
And also all non GET request are considered as those that are required to be traced, so they bypass this sampling completely.

### Span criticality
Some of the spans are more relevant for the traces, some of them are not. So for span sampling we have 3 different span criticality: non critical, regular and critical one.
They are using different probability and execution time limits that can be configured separately.

#### Critical spans
All RabbitMQ and ElasticSearch spans are marked as critical OOTB.
Propel INSERT/DELETE/UPDATE calls also considered as critical.
Hooks for classes that are mentioned in `\Spryker\Zed\Opentelemetry\OpentelemetryConfig::getCriticalClassNamePatterns()` method also considered as critical (OOTB Facades and Controllers)
#### Non Critical spans
OOTB all SELECT queries are considered as non critical.
#### Regular spans
All the other generated hooks are regular ones.

#### How to make span critical or not.
By setting a span attribute `no_critical` and `is_critical`, span can be marked as critical or not.

### Sampling configuration
Like already mentioned, valued that used for sampling can be changed. In order to do so, you need to change a few env variables.

`OTEL_BSP_MIN_SPAN_DURATION_THRESHOLD` - this is value that is used in `Closing span sampling` for critical and regular spans. OOTB the value is `20`. This value will be used as nanosecond.
`OTEL_BSP_MIN_CRITICAL_SPAN_DURATION_THRESHOLD` - this is similar value to `OTEL_BSP_MIN_SPAN_DURATION_THRESHOLD` one, but used for non critical spans. Default value is `10`.
`OTEL_TRACES_SAMPLER_ARG` - this is a probability for `Opening span sampling` and is used for the regular spans. Default value is `0.3`.
`OTEL_TRACES_CRITICAL_SAMPLER_ARG` - same as a previous one, but for critical spans. Default value is `0.5`.
`OTEL_TRACES_NON_CRITICAL_SAMPLER_ARG` - same as a previous one, but for non critical spans. Default value is `0.1`.
`OTEL_TRACE_PROBABILITY` - is a probability for the `Tracing sampling`. Default value is `0.1`.

Increasing those values will make your traces bigger, but also can slow down your application as more spans will be generated and send to the collector.

### Additional configuration
`OTEL_SERVICE_NAMESPACE` - defines a namespace that is shown in the resource attributes of trace. Default value is `spryker`.
`OTEL_EXPORTER_OTLP_ENDPOINT` - defines a collector endpoint. Should be configured for your project as it varies from setup to setup. Default value is `http://collector:4317`.
`OTEL_SERVICE_NAME_MAPPING` - a json value that can be provided to define a service name is `MonitoringService::setApplicationName()` is not useful for you. By default OOTB Spryker application are mapped. `\Spryker\Service\Opentelemetry\OpentelemetryInstrumentationConfig::getServiceNameMapping()` can be checked for example.
`OTEL_DEFAULT_SERVICE_NAME` - if no mapping is provided and no name is provided via `MonitoringService::setApplicationName()` this value would be used as a fallback value. Default value is `Default Service`.
`OTEL_BSP_SCHEDULE_DELAY` - this value is used in SpanProcessor in order to flush all processed spans into exported after some delay. Default value is `1000` milliseconds.
`OTEL_BSP_MAX_QUEUE_SIZE` - defines max amount of spans that should be processed. All spans on top will be dropped. Default value is `2048`
`OTEL_BSP_MAX_EXPORT_BATCH_SIZE` - define a spans batch size that should be sent to an exporter. Default value `512`.

## Recommendations

Due to the fact that we use PHP code to instrument codebase, you should consider performance. Tracing is an expensive operation and we should use it wisely.

Please minimise amount of generated spans per request. OpenTelemetry documentation recommends to have no more than 1000 of them. So you can skip some spans via configuration that are not relevant to you. Don't be afraid, errors will be processed even if the method was not instrumented as Error Event will be attached to the root span.

Use sampling to not get a full trace every time. Please check configuration section for the reference.

Skip some traces. You may not want to get a full trace for all of your transactions. You can define a probability of detailed trace overview by setting a probability via `OTEL_TRACE_PROBABILITY` env variable. Be advised that Trace still will be processed and root span will be there for you. Also requests that are changing something in your application (POST, DELETE, PUT, PATCH) considered as critical and will be processed anyway.