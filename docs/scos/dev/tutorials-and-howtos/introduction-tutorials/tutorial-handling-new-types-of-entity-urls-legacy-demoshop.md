---
title: "Tutorial: Handling new types of entity URLs - Legacy Demoshop"
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/url-handling-new-entity
originalArticleId: a604a955-5745-46bf-9b12-b775ca853b8d
redirect_from:
  - /2021080/docs/url-handling-new-entity
  - /2021080/docs/en/url-handling-new-entity
  - /docs/url-handling-new-entity
  - /docs/en/url-handling-new-entity
  - /v6/docs/url-handling-new-entity
  - /v6/docs/en/url-handling-new-entity
  - /v5/docs/url-handling-new-entity
  - /v5/docs/en/url-handling-new-entity
  - /v4/docs/url-handling-new-entity
  - /v4/docs/en/url-handling-new-entity
  - /v3/docs/url-handling-new-entity
  - /v3/docs/en/url-handling-new-entity
  - /v2/docs/url-handling-new-entity
  - /v2/docs/en/url-handling-new-entity
  - /v1/docs/url-handling-new-entity
  - /v1/docs/en/url-handling-new-entity
---

This document shows how to handle URLs for other types of entities that Spryker core provides.

## Prerequisites

* Make sure the target entity is already in your database—the one to which you would like to assign URLs. In the following examples, this entity is called *`my_entity`*.
* To export your entities into the key-value storage (Redis), run a working storage collector.

{% info_block infoBox %}

<!-- uncomment if you add the link:

To create a new collector, see Collector.

-->

When you create the collector, make sure its resource type is called the same as your entity—in the following examples, it is *`my_entity`*.

{% endinfo_block %}

* When you finish collecting data in the key-value storage, you can start to assign URLs to them and work towards displaying them on the frontend.

## Prepare the database

1. Extend the `spy_url` table with a new foreign key to your entity table. Follow the existing naming convention for such columns. Prefix the name with `fk_resource_` and end with the name of the new entity—for example, `fk_resource_my_entity`.

2. The propel schema XML file must appear as follows:

**Pyz/Zed/MyBundle/Persistence/Propel/Schema/spy_url.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Url\Persistence" package="src.Orm.Zed.Url.Persistence">

    <table name="spy_url" phpName="SpyUrl">
        <column name="fk_resource_my_entity" type="INTEGER"/>
        <foreign-key name="spy_url-fk_resource_my_entity" foreignTable="my_entity" onDelete="CASCADE">
            <reference foreign="id_my_entity" local="fk_resource_my_entity"/>
       </foreign-key>
    </table>

    </database>
```

3. After adding the schema extension file, migrate the changes:

* `vendor/bin/console propel:diff`
* `vendor/bin/console propel:migrate`
* `vendor/bin/console propel:install`

## Prepare URL transfer object

1. Define a new property for `UrlTransfer`.

{% info_block infoBox %}

The name of the new property must match the name of the newly added database column's name but must be camel case formatted.

{% endinfo_block %}

The transfer definition XML must appear as follows:

**Pyz/Shared/MyBundle/Transfer/my_bundle.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

  <transfer name="Url">
      <property name="fkResourceMyEntity" type="int" />
    </transfer>

    </transfers>
```

2. Apply the change to the `UrlTransfer`:

```bash
vendor/bin/console transfer:generate
```

{% info_block infoBox %}

With the preceding steps, you have prepared both the database and the code to handle the URLs for the new type of entity.

{% endinfo_block %}

## Use the URL facade

To manipulate URLs, the URL module's public API is used: `\Spryker\Zed\Url\Business\UrlFacade`.

The methods there accept instances of `\Generated\Shared\Transfer\UrlTransfer`.

The code following snippet demonstrates how to create a new URL for *`my_entity`*.

```php
<?php

/**
 * @param string $url
 * @param int $idMyEntity
 * @param int $idLocale
 *
 * @return \Generated\Shared\Transfer\UrlTransfer
 */
public function createUrlForMyEntity($url, $idMyEntity, $idLocale)
{
    $urlTransfer = new UrlTransfer();
    $urlTransfer
        ->setUrl($url)
        ->setFkResourceMyEntity($idMyEntity)
        ->setFkLocale($idLocale);

    return $this->urlFacade->createUrl($urlTransfer);
}
```


{% info_block infoBox %}

The `\Spryker\Zed\Url\Business\UrlFacade::createUrl()` method persists a new URL in the database and also makes sure it is collected to the key-value storage the next time the URL collector runs.

{% endinfo_block %}

## Set up the frontend

To set up the frontend, in Yves, create a `Controller` class and make sure it is discoverable to the responsible router.

In the Spryker Legacy Demoshop, basic infrastructure is provided that automatically collects the new *`my_entity`* resource types to the key-value storage (Redis), and the `\Pyz\Yves\Collector\Plugin\Router\StorageRouter` matches URLs that are stored there.

This router gets a stack of `\Pyz\Yves\Collector\Creator\ResourceCreatorInterface` which handles the URL resource linked to the matching URLs.

{% info_block infoBox %}

This means that if a `URL /foo` is linked to a *`my_entity`* record, there must be a `ResourceCreator` for this URL that handles a *`my_entity`* type of resources and forwards the right information about the `Controller` to the `Router` that handles the request.

If there is no `ResourceCreator` registered for the *`my_entity`* resource type, an HTTP `404 Page not found` status code is issued.

{% endinfo_block %}

To create an instance of `ResourceCreatorInterface` that provides information to a controller to handle URLs for your custom entity and register `ResourceCreator` in the `StorageRouter`, follow this example:

**Code sample**

<!-- Get the code sample used in Suite-->

```php
<?php
namespace Pyz\Yves\MyBundle\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;

class MyEntityController extends AbstractController
{

    /**
     * @param array $data
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function indexAction(array $myEntityData)
    {
        // here you can handle the request for the entity that was matched with the requested URL.
        return $this->jsonResponse($myEntityData);
    }

}
```

1. Implement the `ResourceCreator` that connects the router to your controller.

<details><summary markdown='span'>Code sample:</summary>

```php
<?php

namespace Pyz\Yves\MyBundle\ResourceCreator;

use Pyz\Yves\Collector\Creator\AbstractResourceCreator;
use Silex\Application;
use Spryker\Yves\Kernel\BundleControllerAction;
use Spryker\Yves\Kernel\Controller\BundleControllerActionRouteNameResolver;

class MyEntityResourceCreator extends AbstractResourceCreator
{

  /**
   * @return string
   */
  public function getType()
  {
      return 'my_entity'; // Name of the URL resource type which normally should also match with the name of the entity to handle.
  }

  /**
   * @param \Silex\Application $application
   * @param array $data
   *
   * @return array
   */
  public function createResource(Application $application, array $data)
  {
      $bundleControllerAction = new BundleControllerAction('MyBundle', 'MyEntity', 'index');
      $routeResolver = new BundleControllerActionRouteNameResolver($bundleControllerAction);
      $service = $this->createServiceForController($application, $bundleControllerAction, $routeResolver);

      return [
          '_controller' => $service,
          '_route' => $routeResolver->resolve(),
          'meta' => $data,
      ];
  }

}
```

</details>

3. Create a simple factory and a plugin to provide the `ResourceCreator` to the `Collector` module. Use plugins to communicate between modules in Yves.

**Code sample**

```php
<?php

namespace Pyz\Yves\MyBundle;

use Pyz\Yves\MyBundle\ResourceCreator\MyEntityResourceCreator;
use Spryker\Yves\Kernel\AbstractFactory;

class MyBundleFactory extends AbstractFactory
{
    /**
     * @return MyEntityResourceCreator
     */
    public function createMyEntityResourceCreator()
    {
        return new MyEntityResourceCreator();
    }
}
```

**Code sample**

```php
<?php

namespace Pyz\Yves\MyBundle\Plugin;

use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\MyBundle\MyBundleFactory getFactory()
 */
class MyEntityResourceCreatorPlugin extends AbstractPlugin
{

    /**
     * @return \Pyz\Yves\MyBundle\ResourceCreator\MyEntityResourceCreator
     */
    public function createMyEntityResourceCreator()
    {
        return $this->getFactory()->createMyEntityResourceCreator();
    }

}
```

4. In `\Pyz\Yves\Collector\CollectorDependencyProvider`, provide the plugin to the `Collector` module:

```php
<?php

namespace Pyz\Yves\Collector;

use Pyz\Yves\MyBundle\Plugin\MyEntityResourceCreatorPlugin;
use Spryker\Yves\Kernel\AbstractBundleDependencyProvider;
use Spryker\Yves\Kernel\Container;

class CollectorDependencyProvider extends AbstractBundleDependencyProvider
{

    const PLUGIN_MY_ENTITY_RESOURCE_CREATOR = 'PLUGIN_MY_ENTITY_RESOURCE_CREATOR';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function providePlugins(Container $container)
    {
        // ...

        $container[self::PLUGIN_MY_ENTITY_RESOURCE_CREATOR] = function () {
            $productResourceCreatorPlugin = new MyEntityResourceCreatorPlugin();

            return $productResourceCreatorPlugin->createMyEntityResourceCreator();
        };

        return $container;
    }

}
```

1. In `\Pyz\Yves\Collector\CollectorFactory` add the plugin to the `ResourceCreator` stack, which `StorageRouter` uses for matching resources.

**Code sample**

```php
<?php

namespace Pyz\Yves\Collector;

use Pyz\Yves\Collector\Mapper\ParameterMerger;
use Pyz\Yves\Collector\Mapper\UrlMapper;
use Spryker\Yves\Kernel\AbstractFactory;

class CollectorFactory extends AbstractFactory
{

   /**
    * @return \Pyz\Yves\Collector\Creator\ResourceCreatorInterface[]
    */
   public function createResourceCreators()
   {
       return [
           // ...
           $this->createMyEntityResourceCreator(),
       ];
   }

   /**
    * @return Pyz\Yves\MyBundle\ResourceCreator\MyEntityResourceCreator
    */
   protected function createMyEntityResourceCreator()
   {
       return $this->getProvidedDependency(CollectorDependencyProvider::PLUGIN_MY_ENTITY_RESOURCE_CREATOR);
   }

}
```

## Next steps

You can open the URLs in Yves for the new entities that already have assigned URLs and have collected to the key-value storage as described above.

Next, you can do the following:

* Handle the request in the new controller properly.
* Create some twig templates and display the page in a well formatted way.
* Or anything that requirements bring.
