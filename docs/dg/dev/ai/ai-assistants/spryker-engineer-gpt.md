---
title: Spryker Engineer GPT
description: Spryker Engineer GPT boosts Spryker devs with AI code, best practices & feedback.
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/ai-assistants/spryker-engineer-gpt
---

{% info_block warningBox %}

Before using AI tools, consult with your legal department.

{% endinfo_block %}


Spryker Engineer GPT is an innovative AI-powered assistant designed specifically for developers working with the Spryker Commerce OS. Currently in its beta phase, Spryker Engineer GPT aims to streamline Spryker project development, improve productivity, and ensure adherence to best practices.

The following sections describe GPT's features and use cases.

## Code snippet generation

Spryker Engineer GPT generates accurate and compliant code snippets for common Spryker development tasks. Whether you're working on a Glue API, module facade, or business logic, this assistant provides ready-to-use PHP and XML code based on Spryker standards.

Example use case: Creating facades and model structures for a new feature–for example, image upload functionality in the Merchant Portal.

## Adherence to Spryker architecture

The assistant helps developers adhere to Spryker's architectural guidelines, such as stateless classes, PSR-4 compliance, and proper utilization of factories and facades.

Example use case: Ensuring repository patterns, transfer objects, and Propel ORM schemas are correctly implemented.

## Enhanced productivity for business logic implementation

By focusing on the business logic and offloading boilerplate code generation to Spryker Engineer GPT, developers can allocate more time to solving complex problems.

Example use case: Designing a product discount feature by generating both backend logic and transfer definitions.

## Improved development velocity

With Spryker Engineer GPT, developers can quickly set up new features, reducing the learning curve for newcomers to Spryker while maintaining high-quality output.

Example use case: Onboarding new developers to a Spryker project and having them deliver quality work immediately using AI assistance.

## Debugging and refactoring assistance

Spryker Engineer GPT can analyze existing code snippets, suggest improvements, and refactor them to align with best practices, ensuring maintainability.

Example use case: Refactoring outdated module logic to align with modern Spryker standards.



## Usage example

Prompt: Provide the PHP Facade and model implementations for the Image Upload feature for the MerchantProductImage module

Output: 

```php
//MerchantProductImageFacade.php
<?php

namespace Spryker\Zed\MerchantProductImage\Business;

use Generated\Shared\Transfer\ProductImageUploadRequestTransfer;
use Generated\Shared\Transfer\ProductImageUploadResponseTransfer;

class MerchantProductImageFacade
{
.  /**
     * Specification:
     * - Handles image upload for a product.
     * - Accepts a DTO with merchant ID, product SKU, image set ID, and raw image data.
     * - Routes the request to the respective model for processing.
     * - Returns a response transfer indicating success or error reasons.
     *
     * @param \Generated\Shared\Transfer\ProductImageUploadRequestTransfer $productImageUploadRequestTransfer
     *
     * @return \Generated\Shared\Transfer\ProductImageUploadResponseTransfer
     */
    public function uploadProductImages(ProductImageUploadRequestTransfer $productImageUploadRequestTransfer): ProductImageUploadResponseTransfer
    {
        return $this->getFactory()->createProductImageUploader()->uploadImages($productImageUploadRequestTransfer);
    }

}

//ProductImageUploader.php
<?php

namespace Spryker\Zed\MerchantProductImage\Business\Model;

use Generated\Shared\Transfer\ProductImageUploadRequestTransfer;
use Generated\Shared\Transfer\ProductImageUploadResponseTransfer;

class ProductImageUploader
{
...<here GPT provides an actual implementation>
}

//Transfer definition
<transfer name="ProductImageUploadRequest">
    <property name="merchantId" type="int" />
    <property name="sku" type="string" />
    <property name="imageSetId" type="int" />
    <property name="rawImages" type="array" />
</transfer>

<transfer name="ProductImageUploadResponse">
    <property name="isSuccessful" type="bool" />
    <property name="errorMessage" type="string" />
</transfer>
```

## Access

You can find it here: [Spryker Engineer GPT](https://chatgpt.com/g/g-tUbtx3IEQ-spryker-engineer-beta)



{% include dg/early-access-program.md %}
























































