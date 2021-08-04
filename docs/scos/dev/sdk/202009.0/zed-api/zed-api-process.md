---
title: Zed API processor stack
originalLink: https://documentation.spryker.com/v6/docs/zed-api-processor-stack
redirect_from:
  - /v6/docs/zed-api-processor-stack
  - /v6/docs/en/zed-api-processor-stack
---

## Request and Pre Processing

We now need to decide further on the URL format. Should this be extension driven, which is easier to browse, or HTTP header driven, for example? What kind of URL query string transformation do we need, what kind of header parsing is required?

In order to keep this flexible for our customers, we provide a basic pre and post stack for processing the incoming request and the outgoing response.

Let’s start with the request and pre-processing. Inside the Api module’s `ApiBusinessFactory` class, you can define your pre and post stack:

```php
<?php
    /*
     * @return \Spryker\Zed\Api\Business\Model\Processor\Pre\PreProcessorInterface[]
     */
    protected function getPreProcessorStack(): array
    {
        $stack = parent::getPreProcessorStack();
        // Add your own or customize completely
        
        return $stack;
    }

```

The order matters. Each processor works based on the `ApiRequestTransfer` hydrating of the previous processors.

So usually, you first parse your URL and extract the actual path after the API prefix.

The `PathPreProcessor` takes the URL `/api/rest/customers/1.json?...` and extracts `customers/1.json` as a path element.

The `FormatTypeByPathPreProcessor` would extract the .json extension for format resolution.

After that, the `ResourcePreProcessor`, `ResourceMethodPreProcessor` and `ResourceParametersPreProcessor` take care of mapping the remaining elements to the right resource and method. They also prepare the basic params.

Finally, we then prepare the CRUD methods with concrete params based on the payload, URL query strings, headers or alike. If you want to provide pagination, sorting, filtering, and more for your “find” action, you can hook in processors to translate your request to the `filterTransfer`.

## Response and Post Processing

Similarly, the post processing stack can further hydrate the `ApiResponseTransfer` before returning it. Any custom headers you need to add to the response, you can add here based on the request or persistence data. You can also set or adjust response codes (“HTTP Status Codes”) and add special meta data to the response.

```php
<?php
    /*
     * @return \Spryker\Zed\Api\Business\Model\Processor\Post\PostProcessorInterface[]
     */
    protected function getPostProcessorStack(): array
    {
        $stack = parent::getPostProcessorStack();
        // Add your own or customize completely
                
        return $stack;
    }
```

## Summary

The processors in these stacks are deliberately very lax and easy to replace as each API implementation requires custom headers, parsing and mapping. By replacing the core processors or adding your own, you can map any incoming request to the underlying API dispatcher.

### Customizing OPTIONS Request
The options request by default will return the configured array of HTTP methods for collection vs item.

| URI | Type  | Methods  |
| --- | --- | --- |
|  / | collection | OPTIONS, GET, POST |
|  /{id/slug} | item  | OPTIONS, GET, PATCH, DELETE |

When you need to customize this per resource, add the `getHttpMethodsForItem()` and `getHttpMethodsForCollection()` methods to your `ApiResourcePlugin` classes by implementing the `Spryker\Zed\Api\Dependency\Plugin\OptionsForItemInterface` and `Spryker\Zed\Api\Dependency\Plugin\OptionsForCollectionInterface` interfaces for these plugins.

The result is that the return values of the above mentioned methods will then be used instead.

```php
<?php
/**
 * @param array $params
 *
 * @return array
 */
public function getHttpMethodsForItem(array $params): array {
    return [...];
}

/**
 * @param array $params
 *
 * @return array
 */
public function getHttpMethodsForItem(array $params): array {
    return [...];
}
```

You can omit the HTTP method OPTIONS as this will be auto-appended to the stack of methods.

