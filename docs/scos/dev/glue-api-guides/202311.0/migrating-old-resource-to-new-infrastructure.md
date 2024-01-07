---
title: Migration of Legacy Glue API resource to Glue Storefront API infrastructure
description: The guide will walk you through the process of migration of Legacy Glue API resource to the Glue Storefront API infrastructure
last_updated: November 29, 2023
template: glue-api-storefront-guide-template
---
## Manual migration of existing Legacy Glue API to the new infrastructure

It’s possible to re-use existing resource code in most of the cases, by adjusting existing code and adding a few more classes from the new infrastructure. Those steps will be defined below.

The `AvailabilityNotificationRestApi` module was used as an example.

For the sake of reducing complexity, the module will be updated instead of creating a new on top. 

### Update dependencies

"spryker/glue-json-api-convention-extension": "^1.0.0" dependency MUST be added, due to the fact that all old resources were bound to the JSON:API convention.

### Create a new controller

Resource controller can only help us with the name (in order to not have names conflict) and with documentation annotations that can be re-used. Action method declaration is not suitable for us, due to different used classes types.

New controller should extend `Spryker\Glue\Kernel\Controller\AbstractStorefrontApiController` class instead of `Spryker\Glue\Kernel\Controller\AbstractController`

Method names can be taken from the original controller due to the same naming patter %http_verb%Action.

### Create a new resource plugin

Create a `GlueStorefrontApiApplication` directory in the `Plugin` directory. It will be used to store new resource plugins.

Old resource plugin can be used as a reference.

Abstract class MUST be changed from `Spryker\Glue\Kernel\AbstractPlugin` to `Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin`

Interface MUST be changed from `Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface` to `Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface`

`getResourceType()` method MUST be renamed to `getType()`.

`getController()` method return value MUST be changed from a regular string to FQCN (fully qualified class name) of the new correspondent controller.

### Adjust processor logic

The main complexity in the migration of the regular legacy resources would be an old models or "processors". Income and outcome transfers are deprecated and not supported by the Glue API infrastructure.

The code should be rather modified to use income transfers and prepare new outcome transfer or some additional mapper should be implemented to wrap old code execution.

We are going to provide first option as an example below.

#### Adjusting the old code

Original model code
```php
<?php

namespace Spryker\Glue\AvailabilityNotificationsRestApi\Processor\Subscriber;

use Generated\Shared\Transfer\AvailabilityNotificationSubscriptionTransfer;
use Generated\Shared\Transfer\LocaleTransfer;
use Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToAvailabilityNotificationClientInterface;
use Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToStoreClientInterface;
use Spryker\Glue\AvailabilityNotificationsRestApi\Processor\RestResponseBuilder\AvailabilityNotificationsRestResponseBuilderInterface;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface;

class AvailabilityNotificationSubscriber implements AvailabilityNotificationSubscriberInterface
{
    /**
     * @var \Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToAvailabilityNotificationClientInterface
     */
    protected $availabilityNotificationClient;

    /**
     * @var \Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToStoreClientInterface
     */
    protected $storeClient;

    /**
     * @var \Spryker\Glue\AvailabilityNotificationsRestApi\Processor\RestResponseBuilder\AvailabilityNotificationsRestResponseBuilderInterface
     */
    protected $availabilityNotificationsRestResponseBuilder;

    /**
     * @param \Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToAvailabilityNotificationClientInterface $availabilityNotificationClient
     * @param \Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToStoreClientInterface $storeClient
     * @param \Spryker\Glue\AvailabilityNotificationsRestApi\Processor\RestResponseBuilder\AvailabilityNotificationsRestResponseBuilderInterface $availabilityNotificationsRestResponseBuilder
     */
    public function __construct(
        AvailabilityNotificationsRestApiToAvailabilityNotificationClientInterface $availabilityNotificationClient,
        AvailabilityNotificationsRestApiToStoreClientInterface $storeClient,
        AvailabilityNotificationsRestResponseBuilderInterface $availabilityNotificationsRestResponseBuilder
    ) {
        $this->availabilityNotificationClient = $availabilityNotificationClient;
        $this->storeClient = $storeClient;
        $this->availabilityNotificationsRestResponseBuilder = $availabilityNotificationsRestResponseBuilder;
    }

    /**
     * @uses \Spryker\Glue\AvailabilityNotificationsRestApi\Plugin\GlueApplication\AvailabilityNotificationsResourceRoutePlugin::getResourceAttributesClassName()
     *
     * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function subscribe(RestRequestInterface $restRequest): RestResponseInterface
    {
        $locale = $restRequest->getMetadata()->getLocale();
        $localeTransfer = (new LocaleTransfer())->setLocaleName($locale);
        $storeTransfer = $this->storeClient->getCurrentStore();
        $restUser = $restRequest->getRestUser();
        $customerReference = $restUser
            ? $restUser->getNaturalIdentifier()
            : null;

        /**
         * @var \Generated\Shared\Transfer\RestAvailabilityNotificationRequestAttributesTransfer $restAvailabilityNotificationRequestAttributesTransfer
         */
        $restAvailabilityNotificationRequestAttributesTransfer = $restRequest->getResource()->getAttributes();

        $availabilityNotificationSubscriptionTransfer = (new AvailabilityNotificationSubscriptionTransfer())
            ->fromArray($restAvailabilityNotificationRequestAttributesTransfer->toArray(), true)
            ->setLocale($localeTransfer)
            ->setStore($storeTransfer)
            ->setCustomerReference($customerReference);

        $availabilityNotificationSubscriptionResponseTransfer = $this->availabilityNotificationClient->subscribe($availabilityNotificationSubscriptionTransfer);

        if (!$availabilityNotificationSubscriptionResponseTransfer->getIsSuccess()) {
            return $this->availabilityNotificationsRestResponseBuilder->createSubscribeErrorResponse($availabilityNotificationSubscriptionResponseTransfer);
        }

        return $this->availabilityNotificationsRestResponseBuilder->createAvailabilityNotificationResponse($availabilityNotificationSubscriptionResponseTransfer->getAvailabilityNotificationSubscriptionOrFail());
    }
}

```

The adjusted model example
```php
<?php

namespace Spryker\Glue\AvailabilityNotificationsRestApi\Processor\Subscriber;

use Generated\Shared\Transfer\AvailabilityNotificationSubscriptionResponseTransfer;
use Generated\Shared\Transfer\AvailabilityNotificationSubscriptionTransfer;
use Generated\Shared\Transfer\GlueErrorTransfer;
use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResourceTransfer;
use Generated\Shared\Transfer\GlueResponseTransfer;
use Generated\Shared\Transfer\LocaleTransfer;
use Generated\Shared\Transfer\RestAvailabilityNotificationsAttributesTransfer;
use Generated\Shared\Transfer\RestErrorMessageTransfer;
use Spryker\Glue\AvailabilityNotificationsRestApi\AvailabilityNotificationsRestApiConfig;
use Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToAvailabilityNotificationClientInterface;
use Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToStoreClientInterface;
use Spryker\Glue\AvailabilityNotificationsRestApi\Processor\RestResponseBuilder\AvailabilityNotificationsRestResponseBuilderInterface;
use Spryker\Glue\OauthApi\OauthApiConfig;
use Symfony\Component\HttpFoundation\Response;

class AvailabilityNotificationApiSubscriber implements AvailabilityNotificationApiSubscriberInterface
{
    /**
     * @var \Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToAvailabilityNotificationClientInterface
     */
    protected $availabilityNotificationClient;

    /**
     * @var \Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToStoreClientInterface
     */
    protected $storeClient;

    /**
     * @var \Spryker\Glue\AvailabilityNotificationsRestApi\AvailabilityNotificationsRestApiConfig
     */
    protected $config;

    /**
     * @param \Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToAvailabilityNotificationClientInterface $availabilityNotificationClient
     * @param \Spryker\Glue\AvailabilityNotificationsRestApi\Dependency\Client\AvailabilityNotificationsRestApiToStoreClientInterface $storeClient
     */
    public function __construct(
        AvailabilityNotificationsRestApiToAvailabilityNotificationClientInterface $availabilityNotificationClient,
        AvailabilityNotificationsRestApiToStoreClientInterface $storeClient,
        AvailabilityNotificationsRestResponseBuilderInterface $availabilityNotificationsRestResponseBuilder,
        AvailabilityNotificationsRestApiConfig $config,
    ) {
        $this->availabilityNotificationClient = $availabilityNotificationClient;
        $this->storeClient = $storeClient;
        $this->config = $config;
    }


    /**
     * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer
     *
     * @return \Generated\Shared\Transfer\GlueResponseTransfer
     */
    public function subscribe(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer
    {
        //Locale was get from the GlueRequestTransfer directly
        $locale = $glueRequestTransfer->getLocale();
        $localeTransfer = (new LocaleTransfer())->setLocaleName($locale);
        $storeTransfer = $this->storeClient->getCurrentStore();

        //User also can be fetched from the GlueRequestTransfer too
        $glueRequestUserTransfer = $glueRequestTransfer->getRequestUser();
        $customerReference = $glueRequestUserTransfer?->getNaturalIdentifier();

        /**
         * @var \Generated\Shared\Transfer\RestAvailabilityNotificationRequestAttributesTransfer $restAvailabilityNotificationRequestAttributesTransfer
         */
        $restAvailabilityNotificationRequestAttributesTransfer = $glueRequestTransfer->getResource()->getAttributes();

        $availabilityNotificationSubscriptionTransfer = (new AvailabilityNotificationSubscriptionTransfer())
            ->fromArray($restAvailabilityNotificationRequestAttributesTransfer->toArray(), true)
            ->setLocale($localeTransfer)
            ->setStore($storeTransfer)
            ->setCustomerReference($customerReference);

        $availabilityNotificationSubscriptionResponseTransfer = $this->availabilityNotificationClient->subscribe($availabilityNotificationSubscriptionTransfer);

        //Response mapped to the GlueResponseTransfer. For the sake of visibility code will be in this class.
        if (!$availabilityNotificationSubscriptionResponseTransfer->getIsSuccess()) {
            return $this->createSubscribeErrorResponse($availabilityNotificationSubscriptionResponseTransfer);
        }

        return $this->createSubscribeResponse($availabilityNotificationSubscriptionResponseTransfer);
    }

    protected function createSubscribeErrorResponse(AvailabilityNotificationSubscriptionResponseTransfer $availabilityNotificationSubscriptionResponseTransfer): GlueResponseTransfer
    {
        $errorPayload = $this->config->getErrorIdentifierToRestErrorMapping()[$availabilityNotificationSubscriptionResponseTransfer->getErrorMessage()] ?? $this->config->getDefaultSubscribeRestError();

        return (new GlueResponseTransfer())
            ->setHttpStatus($errorPayload[RestErrorMessageTransfer::STATUS])
            ->addError(
                (new GlueErrorTransfer())
                    ->setStatus($errorPayload[RestErrorMessageTransfer::STATUS])
                    ->setMessage($errorPayload[RestErrorMessageTransfer::DETAIL])
                    ->setCode($errorPayload[RestErrorMessageTransfer::CODE]),
            );
    }

    protected function createSubscribeResponse(AvailabilityNotificationSubscriptionResponseTransfer $availabilityNotificationSubscriptionResponseTransfer): GlueResponseTransfer
    {
        $restAvailabilityNotificationsAttributesTransfer = $this
            ->availabilityNotificationMapper
            ->mapAvailabilityNotificationSubscriptionTransferToRestAvailabilityNotificationsAttributesTransfer(
                $availabilityNotificationSubscriptionResponseTransfer->getAvailabilityNotificationSubscriptionOrFail(),
                new RestAvailabilityNotificationsAttributesTransfer(),
            );
        
        return (new GlueResponseTransfer())
            ->setHttpStatus(Response::HTTP_OK)
            ->addResource((new GlueResourceTransfer())
                ->setType(OauthApiConfig::RESOURCE_TOKEN)
                ->setAttributes($restAvailabilityNotificationsAttributesTransfer)
            );
    }
}

```
By making this steps, we can make a  resource from Legacy Glue API available in Glue Storefront API.
