---
title: Use structured responses with the AiFoundation module
description: Request and receive structured data from AI providers using Spryker Transfer objects
last_updated: Dec 24, 2025
keywords: foundation, ai, structured response, transfer, schema, json, openai, anthropic, prompt, validation
template: howto-guide-template
related:
  - title: AiFoundation module Overview
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-module.html
  - title: Use AI tools with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html
  - title: Transfer objects
    link: /docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html
---

This document describes how to use structured responses with the AiFoundation module to receive validated, type-safe data from AI providers in the format of Spryker Transfer objects.

## Overview

Structured responses enable AI providers to return data in a predefined schema defined by Spryker Transfer objects. Instead of receiving free-form text, you can request the AI to return data that matches your Transfer object structure, making it easier to integrate AI responses directly into your application workflows and business logic.

The AI provider validates the response against your Transfer schema and automatically maps the data to your Transfer object, ensuring type safety and data integrity.

## Prerequisites

- AiFoundation module installed and configured. For details, see [AiFoundation module Overview](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html).
- Transfer objects generated with `console transfer:generate`
- Configured AI provider that supports structured responses (OpenAI, Anthropic Claude)

{% info_block warningBox "Provider compatibility" %}

Not all AI providers support structured responses. Ensure your configured provider supports this feature. OpenAI and Anthropic Claude have native support for structured outputs.

{% endinfo_block %}

## Use cases

Structured responses are ideal for scenarios where you need predictable, validated data from AI:

### Product data extraction

Extract structured product information from unstructured descriptions:

```php
// Request AI to extract product attributes
$productDataTransfer = new ProductDataTransfer();
$response = $aiFoundationClient->prompt(
    (new PromptRequestTransfer())
        ->setPromptMessage(
            (new PromptMessageTransfer())->setContent($rawProductDescription)
        )
        ->setStructuredMessage($productDataTransfer)
);

/** @var \Generated\Shared\Transfer\ProductDataTransfer $extractedData */
$extractedData = $response->getStructuredMessage();
$sku = $extractedData->getSku();
$price = $extractedData->getPrice();
```

### Customer intent classification

Classify customer inquiries into predefined categories:

```php
// Request AI to categorize customer message
$categoryTransfer = new CustomerIntentTransfer();
$response = $aiFoundationClient->prompt(
    (new PromptRequestTransfer())
        ->setPromptMessage(
            (new PromptMessageTransfer())->setContent($customerMessage)
        )
        ->setStructuredMessage($categoryTransfer)
);

/** @var \Generated\Shared\Transfer\CustomerIntentTransfer $intent */
$intent = $response->getStructuredMessage();
$category = $intent->getCategory(); // 'support', 'sales', 'feedback'
$priority = $intent->getPriority(); // 'high', 'medium', 'low'
```

### Content generation with metadata

Generate content with structured metadata:

```php
// Request AI to generate content with SEO metadata
$contentTransfer = new ContentWithMetadataTransfer();
$response = $aiFoundationClient->prompt(
    (new PromptRequestTransfer())
        ->setPromptMessage(
            (new PromptMessageTransfer())->setContent('Write a product description for ' . $productName)
        )
        ->setStructuredMessage($contentTransfer)
);

/** @var \Generated\Shared\Transfer\ContentWithMetadataTransfer $content */
$content = $response->getStructuredMessage();
$description = $content->getDescription();
$keywords = $content->getKeywords(); // array of strings
$metaDescription = $content->getMetaDescription();
```

## Define Transfer objects for structured responses

Define Transfer objects in XML that represent the structure you expect from the AI provider.

### Example: Product analysis Transfer

Create a Transfer definition file `src/Pyz/Shared/YourModule/Transfer/your_module.transfer.xml`:

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="ProductAnalysis">
        <property name="productName" type="string" description="Name of the product"/>
        <property name="category" type="string" description="Product category"/>
        <property name="price" type="float" description="Estimated price"/>
        <property name="features" type="array" singular="feature" description="List of product features"/>
        <property name="targetAudience" type="string" description="Target customer segment"/>
        <property name="sentiment" type="ProductSentiment" description="Sentiment analysis of product reviews"/>
    </transfer>

    <transfer name="ProductSentiment">
        <property name="score" type="float" description="Sentiment score from -1 to 1"/>
        <property name="label" type="string" description="Sentiment label: positive, neutral, negative"/>
        <property name="confidence" type="float" description="Confidence level of sentiment analysis"/>
    </transfer>

</transfers>
```

Generate the Transfer classes:

```bash
console transfer:generate
```

This creates `ProductAnalysisTransfer` and `ProductSentimentTransfer` classes in `src/Generated/Shared/Transfer/`.

## Request structured responses

Use the `PromptRequestTransfer.structuredMessage` property to specify the Transfer object schema.

```php
<?php

namespace Pyz\Zed\YourModule\Business\Analyzer;

use Generated\Shared\Transfer\ProductAnalysisTransfer;
use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Spryker\Client\AiFoundation\AiFoundationClientInterface;

class ProductAnalyzer
{
    public function __construct(
        protected AiFoundationClientInterface $aiFoundationClient
    ) {
    }

    public function analyzeProduct(string $productDescription): ProductAnalysisTransfer
    {
        $promptRequest = (new PromptRequestTransfer())
            ->setAiConfigurationName('openai')
            ->setPromptMessage(
                (new PromptMessageTransfer())->setContent(
                    sprintf('Analyze this product: %s', $productDescription)
                )
            )
            ->setStructuredMessage(new ProductAnalysisTransfer())
            ->setMaxRetries(2);

        $promptResponse = $this->aiFoundationClient->prompt($promptRequest);

        if ($promptResponse->getIsSuccessful() !== true) {
            // Handle errors
            $errors = $promptResponse->getErrors();
            throw new AnalysisFailedException('Failed to analyze product');
        }

        /** @var \Generated\Shared\Transfer\ProductAnalysisTransfer $analysis */
        $analysis = $promptResponse->getStructuredMessage();

        return $analysis;
    }
}
```

## Handle structured responses

The AI Foundation validates and maps the response to your Transfer object automatically.

### Success handling

When `PromptResponseTransfer.isSuccessful` is `true`, the structured response is available:

```php
$promptResponse = $this->aiFoundationClient->prompt($promptRequest);

if ($promptResponse->getIsSuccessful() === true) {
    /** @var \Generated\Shared\Transfer\ProductAnalysisTransfer $analysis */
    $analysis = $promptResponse->getStructuredMessage();

    // The type matches the Transfer you provided in the request
    // Access properties with full type safety
    $productName = $analysis->getProductName(); // string
    $features = $analysis->getFeatures(); // array
    $sentiment = $analysis->getSentiment(); // ProductSentimentTransfer|null

    // Work with nested Transfer objects
    if ($sentiment !== null) {
        $sentimentScore = $sentiment->getScore(); // float
        $sentimentLabel = $sentiment->getLabel(); // string
    }
}
```

### Retry configuration

Configure retry attempts for improved reliability:

```php
$promptRequest = (new PromptRequestTransfer())
    ->setPromptMessage($message)
    ->setStructuredMessage($transfer)
    ->setMaxRetries(3); // Retry up to 3 times on failure
```

The client automatically retries failed requests up to `maxRetries` times before returning with `isSuccessful = false`.

## Transfer object property types

Structured responses support all Spryker Transfer property types:

### Scalar types

```xml
<transfer name="Example">
    <property name="stringValue" type="string"/>
    <property name="intValue" type="int"/>
    <property name="floatValue" type="float"/>
    <property name="boolValue" type="bool"/>
</transfer>
```

### Arrays

```xml
<transfer name="Example">
    <property name="tags" type="string[]" singular="tag" description="Array of strings"/>
    <property name="metadata" type="array" singular="metadata" description="Associative array"/>
</transfer>
```

### Nested Transfer objects

```xml
<transfer name="Order">
    <property name="customer" type="Customer" description="Customer information"/>
    <property name="items" type="OrderItem[]" singular="item" description="Order line items"/>
</transfer>

<transfer name="Customer">
    <property name="name" type="string"/>
    <property name="email" type="string"/>
</transfer>

<transfer name="OrderItem">
    <property name="sku" type="string"/>
    <property name="quantity" type="int"/>
    <property name="price" type="float"/>
</transfer>
```

### Collections

For collections of Transfer objects, use the array notation with `[]`:

```xml
<transfer name="AnalysisResult">
    <property name="products" type="ProductData[]" singular="product" description="List of products"/>
</transfer>

<transfer name="ProductData">
    <property name="name" type="string"/>
    <property name="category" type="string"/>
</transfer>
```

In code, collections are accessed as `ArrayObject`:

```php
/** @var \Generated\Shared\Transfer\AnalysisResultTransfer $result */
$result = $promptResponse->getStructuredMessage();

foreach ($result->getProducts() as $product) {
    echo $product->getName(); // Each element is ProductDataTransfer
}
```

## Best practices

### Design focused Transfer schemas

Create Transfer objects specifically for AI responses rather than reusing business logic Transfers:

```xml
<!-- Good: Focused schema for AI -->
<transfer name="ProductExtractionResult">
    <property name="name" type="string"/>
    <property name="category" type="string"/>
    <property name="price" type="float"/>
</transfer>

<!-- Avoid: Complex business Transfer with many optional fields -->
<transfer name="ProductEntity" strict="true">
    <property name="idProduct" type="int"/>
    <property name="fkProductAbstract" type="int"/>
    <!-- ... many other fields ... -->
</transfer>
```

### Provide clear property descriptions

Use descriptions to guide the AI provider:

```xml
<transfer name="CustomerIntent">
    <property name="category" type="string" description="Category: support, sales, or feedback"/>
    <property name="priority" type="string" description="Priority level: high, medium, or low"/>
    <property name="requiresHumanReview" type="bool" description="Whether this inquiry requires human review"/>
</transfer>
```

### Validate AI responses

Always check `isSuccessful` and validate critical data:

```php
if ($promptResponse->getIsSuccessful() !== true) {
    return $this->handleFailure($promptResponse->getErrors());
}

/** @var \Generated\Shared\Transfer\ProductAnalysisTransfer $analysis */
$analysis = $promptResponse->getStructuredMessage();

// Validate critical fields
if ($analysis->getPrice() === null || $analysis->getPrice() <= 0) {
    throw new InvalidPriceException('AI returned invalid price');
}
```

### Use appropriate retry counts

Configure retries based on request importance:

```php
// Critical business logic: more retries
$promptRequest->setMaxRetries(3);

// Non-critical features: fewer retries
$promptRequest->setMaxRetries(1);
```

### Avoid deeply nested Transfer objects

Prefer flat Transfer structures over deeply nested ones for AI responses. Deeply nested structures increase complexity and make null handling cumbersome.

## Limitations

### Provider-specific constraints

Different AI providers have varying limitations on structured responses:

- Maximum schema complexity
- Supported data types
- Nesting depth limits
- Array size limits

Test with your specific provider to understand constraints.

### Performance considerations

Structured responses may have higher latency than regular text responses due to validation overhead. Consider this when implementing real-time features.

### Schema evolution

Changes to Transfer schemas may affect AI responses. Test thoroughly when modifying Transfer definitions used in production AI requests.