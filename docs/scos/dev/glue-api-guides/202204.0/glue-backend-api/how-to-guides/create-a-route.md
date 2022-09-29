New Glue allows creation of plain routes directly to a controller. This might be useful in a variety of cases. For example, building a non-resource-based API or endpoints that do not need or cannot be adapted to use resources.

Custom routes are based on Symfony routing.

This guide will show the process of creation of the API endpoint using a custom route.

* * *

Let’s say we have a Storefront module named `FooApi` where we want to have a new backend API endpoint `/foo/bar` with GET and POST methods.

1\. Create a `FooBarController` with the action:

|     |
| --- |
| `\Pyz\Glue\FooApi\Controller\FooBarController` |
| ```<br><?php<br><br>namespace Pyz\Glue\FooApi\Controller;<br><br>use Generated\Shared\Transfer\GlueRequestTransfer;<br>use Generated\Shared\Transfer\GlueResponseTransfer;<br>use Spryker\Glue\Kernel\Backend\Controller\AbstractController;<br><br>class FooBarController extends AbstractController<br>{<br>    /**<br>     * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer<br>     *<br>     * @return \Generated\Shared\Transfer\GlueResponseTransfer<br>     */<br>    public function getCollectionAction(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer<br>    {<br>        // return $this->getFactory()->createFooBarReader()->readFooBar();<br>        return new GlueResponseTransfer();<br>    }<br>}<br>``` |

I will just return an empty response for now, but module’s Factory is available and can be used to access Processor models or external dependencies the same way it is done everywhere in Spryker.

Pay attention to the `AbstractController` you use, Storefront and Backend variation exists in Glue layer.

2\. Create `FooBarRouteProviderPlugin`:

|     |
| --- |
| `\Pyz\Glue\FooApi\Plugin\FooBarRouteProviderPlugin` |
| ```<br><?php<br><br>namespace Pyz\Glue\FooApi\Plugin;<br><br>use Pyz\Glue\FooApi\Controller\FooBarController;<br>use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface;<br>use Spryker\Glue\Kernel\Backend\AbstractPlugin;<br>use Symfony\Component\HttpFoundation\Request;<br>use Symfony\Component\Routing\Route;<br>use Symfony\Component\Routing\RouteCollection;<br><br>class FooBarRouteProviderPlugin extends AbstractPlugin implements RouteProviderPluginInterface<br>{<br>    public function addRoutes(RouteCollection $routeCollection): RouteCollection<br>    {<br>        $getRoute = (new Route('/foo/bar'))<br>            ->setDefaults([<br>                '_controller' => [FooBarController::class, 'getCollectionAction'],<br>                '_resourceName' => 'fooBar',<br>            ])<br>            ->setMethods(Request::METHOD_GET);<br><br>        $routeCollection->add('fooBarGetCollection', $getRoute);<br>        <br>        return $routeCollection;<br>    }<br>}<br>``` |

Note the `AbstractPlugin` specific to the storefront/backend that needs to be used.

4\. Create a controller to serve your request:

|     |
| --- |
| `Pyz\Glue\FooApi\Controller\FooBarController` |
| ```<br><?php<br><br>namespace Pyz\Glue\FooApi\Controller;<br><br>use Generated\Shared\Transfer\GlueRequestTransfer;<br>use Generated\Shared\Transfer\GlueResponseTransfer;<br>use Spryker\Glue\Kernel\Backend\Controller\AbstractController;<br>use Symfony\Component\HttpFoundation\Response;<br><br>class FooBarController extends AbstractController<br>{<br>    public function getCollectionAction(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer<br>    {<br>        return (new GlueResponseTransfer())<br>            ->setHttpStatus(Response::HTTP_OK);<br>    }<br>}<br>``` |

5\. Inject the `FooBarRouteProviderPlugin` into the `GlueBackendApiApplicationDependencyProvider`:

|     |
| --- |
| `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider` |
| ```<br>...<br>    /**<br>     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface><br>     */<br>    protected function getRouteProviderPlugins(): array<br>    {<br>        return [<br>            ...<br>            new FooBarRouteProviderPlugin(),<br>        ];<br>    }<br>...<br>``` |

5\. Run the console command to re-generate the Symfony router cache (reference this guide [\[FINAL\] Glue Storefront and Backend API applications integration](https://spryker.atlassian.net/wiki/spaces/CORE/pages/3289645630) to setup the command):

```
docker/sdk cli glue api:router:cache:warm-up
```

At this point the GET endpoint should be testable at `GET http://glue-backend.de.spryker.local/foo/bar`.

Here is the cURL command I tested successfully:

```
curl --location --request GET 'http://glue-backend.de.spryker.local/foo/bar' \
--header 'Accept: application/json'
```

* * *

Now let’s add a POST method to the same route.

6\. Add a method to a controller:

|     |
| --- |
| `\Pyz\Glue\FooApi\Controller\FooBarController` |
| ```<br>...<br>    /**<br>     * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer<br>     *<br>     * @return \Generated\Shared\Transfer\GlueResponseTransfer<br>     */<br>    public function postAction(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer<br>    {<br>        return new GlueResponseTransfer();<br>    }<br>``` |

7\. Add a new route to the same route provider plugin:

|     |
| --- |
| `\Pyz\Glue\FooApi\Plugin\FooBarRouteProviderPlugin` |
| ```<br>...<br>        $postRoute = (new Route('/foo/bar'))<br>            ->setDefaults([<br>                '_controller' => [FooBarController::class, 'postAction'],<br>            ])<br>            ->setMethods(Request::METHOD_POST);<br>        $routeCollection->add('fooBarPost', $postRoute);<br>...<br>``` |

8\. Reset the router cache again and test your POST request. Here is mine:

```
curl --location --request POST 'http://glue-backend.de.spryker.local/foo/bar' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "foo",
    "name": "bar"
}'
```