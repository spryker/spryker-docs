---
title: Performance and Scalability
originalLink: https://documentation.spryker.com/v1/docs/performance-scalability
redirect_from:
  - /v1/docs/performance-scalability
  - /v1/docs/en/performance-scalability
---

Spryker Commerce OS was built to enable the development of high performance e-commerce applications that are able to support an extremely high number of unique visitors. However, no application can be both, light and heavy, at the same time.

Therefore, we have two applications: Yves and Zed. Both communicate with each other using remote procedure calls. Both use dedicated data stores and therefore no cache is needed. Complex business logic operations are handled by the back-end application.

{% info_block infoBox "Fast execution time " %}
Depending on the servers performance, the execution time for the front-end application is around 50ms, which is fast enough to run any commerce application using a small infrastructure, even with a high amount of daily visitors.
{% endinfo_block %}

Scalability, as an integral part of the core architecture, is achieved by separating of the front-end (Yves) and back-end (Zed) applications. A shared-nothing architecture, ensures that every node of Yves has its own instance of the client-side data stores. New nodes can be easily added or removed ad hoc.

## Yves and Zed

{% info_block infoBox "Separation of Responsibilities " %}
The back end is only required for more complex business logic such as cart calculations and payments.
{% endinfo_block %}


### Yves
Yves is the slimline front-end application that gets its data from a fast **Key-Value storage** like Redis, and a **Search storage** like Elasticsearch.

It runs on the Silex micro-framework and uses Twig as its templating engine. It has no connection to the database in Zed.

Some of the key features:

* Based on Silex and Twig
* Redis for storage
* Elasticsearch for full-text search and facet navigation
* Multi-language support
* Shared session storage
* SEO friendly

### Zed
Zed is more of a heavy-duty back-end application. Like Yves, it runs on the Silex micro-framework and uses Twig. Zed main purpose is to take care of business logic, persistent data, and to connect to external systems.

Some of the key features:

* Based on Silex and Twig
* MySQL and PostgreSQL support
* UI framework
* Database schema management and migrations
* Advanced cron-job scheduling with Jenkins
* CLI tools
* OMS Code Management Tools
* Application Integrity Checks

## Data Synchronization

{% info_block infoBox "No full page cache problems " %}
Our front-end works without a full page cache. This allows continuous updates and avoids the problems of outdated product information – so tracking, stock information and all the other details are always up to date.
{% endinfo_block %}

In order for Yves to display any data, the data has to be first aggregated and exported.

The synchronization happens in 3 steps:

* Touch
* Collect
* Export

Refer to Collector and Touch documentation for details.

## Disabling Yves/Zed Authentication
If you deploy Zed in a private network so that is only accessible from Yves, then you might want to disable the authentication mechanism for each request that is made from Yves to Zed. To disable authentication on requests that are made from Yves to Zed, add the following config:

```php
<?php
...
$config[AuthConstants::AUTH_ZED_ENABLED] = false;
```

Next, provide a simple collection of `ServiceProviders` to be able to send requests to Zed. Override the `ZedBootstrap::getInternalCallServiceProvider` operation and provide these dependencies:

```php
<?php
...
protected function getInternalCallServiceProvider()
{
  return $this->getProvidedDependency(ApplicationDependencyProvider::INTERNAL_CALL_SERVICE_PROVIDER);
}
...
```

and also for the `ApplicationDependencyProvider`:

```php
<?php

namespace Spryker\Zed\Application;

...

class ApplicationDependencyProvider extends AbstractBundleDependencyProvider
{
   const INTERNAL_CALL_SERVICE_PROVIDER = 'INTERNAL_CALL_SERVICE_PROVIDER';
   ...
   protected function getInternalCallServiceProvider(Container $container)
    {
        return [
            new LogServiceProvider(),
            new PropelServiceProvider(),
            new RequestServiceProvider(),
            new SslServiceProvider(),
            new ServiceControllerServiceProvider(),
            new RoutingServiceProvider(),
            new MvcRoutingServiceProvider(),
            new SilexRoutingServiceProvider(),
            $this->getGatewayServiceProvider(),
            new NewRelicServiceProvider(),
            new HttpFragmentServiceProvider(),
            new SubRequestServiceProvider(),
        ];
    }
    ...
}
```
