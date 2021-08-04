---
title: Registering a new Service
originalLink: https://documentation.spryker.com/2021080/docs/service
redirect_from:
  - /2021080/docs/service
  - /2021080/docs/en/service
---

Service is a Spryker application layer shared by the Client application layer, the Zed application layer, and Yves application layer. This service layer provides the ability to register a service once and have it applied to both layers. Usage is focused on level details (infrastructure layer). For example: encoding, text processing, and sanitization. Currently, there are already few `Util` bundles providing services (UtilText, UtilEncoding, etc.).

## How to use a Service
To support best practices, any services shared between bundles and applications (Yves, Zed, Client) that do not resolve high-level business processes should be moved to services. Services can be accessed with the locator: `$container->getLocator()->utilEncoding()->service()`.

### Service structure
When creating a new service, follow this file structure:
Under a newly-created module.

* src/Spryker/Service/ - root directory.
* src/Spryker/Service/DemoService.php - main locatable service class. Should extend Spryker\Service\Kernel\AbstractService.
* src/Spryker/Service/DemoServiceFactory.php - service factory class. Should extend Spryker\Service\Kernel\AbstractServiceFactory.
* src/Spryker/Service/DemoDependencyProvider - service dependency provider. Should extend Spryker\Service\Kernel\AbstractBundleDependencyProvider.

**Sample service class**:

```php
<?php
/**
 * @method \Spryker\Service\UtilEncoding\UtilEncodingServiceFactory getFactory()
 */
class UtilEncodingService extends AbstractService implements UtilEncodingServiceInterface
{

    /**
     * {@inheritdoc}
     *
     * @api
     *
     * @param string $jsonValue
     * @param int|null $options
     * @param int|null $depth
     *
     * @return string
     */
    public function encodeJson($jsonValue, $options = null, $depth = null)
    {
        return $this->getFactory()
            ->createJsonEncoder()
            ->encode($jsonValue, $options, $depth);
    }
}
?>
```

* After creating all mentioned files, run `vendor/bin/console dev:ide:generate-service-auto-completion` to have the service visible by our locator autocomplete.
