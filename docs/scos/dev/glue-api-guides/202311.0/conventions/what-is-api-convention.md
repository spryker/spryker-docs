---
title: What is a Glue API convention?
description: This document will describe what is convention in the Glue API and how it impacts your resources.
last_updated: December 12, 2023
template: howto-guide-template
---

Convention defines how request and response should look like in order to use something that is agreed in the industry and focus on your application rather than on response format. Using convention allows to users that are not familiar with your API, to start to use it faster as the way how to use it is familiar to them.

## Using API conventions in Spryker

Spryker is using conventions for its API application. But existing Glue API application using them a bit differently.
[Legacy Glue API](/docs/scos/dev/glue-api-guides/{{page.version}}/old-glue-infrastructure/glue-rest-api.html) is tightly coupled with a [JSON:API](https://jsonapi.org/) convention. So all your endpoints will follow this convention in any case and you have no control over it.
Glue Storefront API and Glue Backend API on the other hand are uncoupled from any convention. It allows to use one of [OOTB conventions](/docs/scos/dev/glue-api-guides/{{page.version}}/conventions/default-conventions.html) or don't use any convention at all and request and response will be formatted according to provided headers and available encoder/decoders.

## Content negotiation

Content negotiation is a process that will try to understand in what format request was sent and in what format client is waiting for the response. Also by this we can understand a convention that client want to use.
Spryker is trying to check if your request uses specific `Content-type` or `Accept` header and if it finds that it's convention specific, e.g. `application/vnd.api+json` for JSON:API it will use it to hijack a request flow and use convention specific formatters and validators first.
If those headers are not a convention ones, `no convention` approach will be used instead and request and response formats will be selected from same `Content-type` and `Accept` headers. Wildcards can be used in the content negotiation to get any supported format. E.g. if your `Accept` header looks like `application/*`, the first appropriate formatter (most likely `application/json`) will be used to format response. If OOTB formatters are not covering your needs you can always add more by implementing `\Spryker\Glue\GlueApplication\Encoder\Response\ResponseEncoderStrategyInterface` interface.
Example of JSON formatter:
```php
<?php

namespace Spryker\Glue\GlueApplication\Encoder\Response;

use Generated\Shared\Transfer\GlueResponseTransfer;
use Spryker\Glue\GlueApplication\Dependency\Service\GlueApplicationToUtilEncodingServiceInterface;

/**
 * @method \Spryker\Glue\GlueApplication\GlueApplicationFactory getFactory()
 */
class JsonResponseEncoderStrategy implements ResponseEncoderStrategyInterface
{
    /**
     * @var string
     */
    protected const ACCEPTED_CONTENT_TYPE = 'application/json';

    /**
     * @var \Spryker\Glue\GlueApplication\Dependency\Service\GlueApplicationToUtilEncodingServiceInterface
     */
    protected GlueApplicationToUtilEncodingServiceInterface $utilEncodingService;

    /**
     * @param \Spryker\Glue\GlueApplication\Dependency\Service\GlueApplicationToUtilEncodingServiceInterface $utilEncodingService
     */
    public function __construct(GlueApplicationToUtilEncodingServiceInterface $utilEncodingService)
    {
        $this->utilEncodingService = $utilEncodingService;
    }

    /**
     * {@inheritDoc}
     * - Return format that mean the JSON encoder can be used.
     *
     * @return string
     */
    public function getAcceptedType(): string
    {
        return static::ACCEPTED_CONTENT_TYPE;
    }

    /**
     * {@inheritDoc}
     * - Transforms given content into JSON format and sets to the `GlueResponseTransfer.content`.
     * - Sets `Content-Type=application/json` to the `GlueResponseTransfer.meta`.
     *
     * @param mixed $content
     * @param \Generated\Shared\Transfer\GlueResponseTransfer $glueResponseTransfer
     *
     * @return \Generated\Shared\Transfer\GlueResponseTransfer
     */
    public function encode($content, GlueResponseTransfer $glueResponseTransfer): GlueResponseTransfer
    {
        $glueResponseTransfer->addMeta('Content-Type', static::ACCEPTED_CONTENT_TYPE);
        $glueResponseTransfer->setContent($this->utilEncodingService->encodeJson($content));

        return $glueResponseTransfer;
    }
}

```

## How to make your resource convention specific?

Resources in `Glue Glue API` can be convention specific. This also means that they cannot be used if provided `Content-type` or `Accept` headers have doesn't match to the one that convention awaits. E.g. if you have a resource that defined as `JSON:API` convention resource, it will not be available with request with `application/json` in the `Content-type` or `Accept` headers. A client will get a `404` error instead.
In order to make your resource convention specific you need to just use convention resource interface for your Resource Plugin.

In the example below you can see that resource plugin is implementing `Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface` interface that means that this resource will be available for request with proper headers and that all request and response data will be formatted according the convention itself.
```php
<?php

namespace Spryker\Glue\ExampleBackendApi\Plugin\GlueApplication;

use Spryker\Glue\GlueApplication\Plugin\GlueApplication\Backend\AbstractResourcePlugin;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface;

class ExampleBackendApiResourcePlugin extends AbstractResourcePlugin implements JsonApiResourceInterface
{
...
}
```

## Summary

Using conventions in API design is a powerful approach to make the interfaces more understandable and consistent for clients. It allows developers to focus on core business logic rather than the intricacies of request and response handling, as conventions automate much of the data formatting and standard operations. This leads to more efficient development and a smoother interaction experience for the Glue API users.
