---
title: Registering a new service
description: Service is a Spryker application layer shared by the Client application layer, the Zed application layer, and Yves application layer.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/back-end-development/messages-and-errors/registering-a-new-service.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


The Service Application represents Spryker's multi-purpose library. A service can be used in all other applications, like Yves or Zed. A service can contain only reusable lightweight stateless business logic with no reliance on database or storage connections. All required data should be provided as an input. Usage is focused on level details (infrastructure layer)—for example, encoding, text processing, and sanitization. There are a few `Util` existing bundles providing services: UtilText and UtilEncoding.

## Using a service

To support best practices, any services shared between bundles and applications (Yves, Zed, Client) that do not resolve high-level business processes are moved to services. You can access services with the locator: `$container->getLocator()->utilEncoding()->service()`.

### Service structure

When creating a new service, under a newly created module, follow this file structure:

- `src/Spryker/Service/`: Root directory.
- `src/Spryker/Service/DemoService.php`: Main locatable service class. Should extend `Spryker/Service/Kernel/AbstractService`.
- `src/Spryker/Service/DemoServiceFactory.php`: Service factory class. Should extend `Spryker/Service/Kernel/AbstractServiceFactory`.
- `src/Spryker/Service/DemoDependencyProvider`: Service dependency provider. Extends `Spryker/Service/Kernel/AbstractBundleDependencyProvider`.

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

After creating all mentioned files, make the service visible by the locator autocompletion:

```bash
vendor/bin/console dev:ide:generate-service-auto-completion
```
