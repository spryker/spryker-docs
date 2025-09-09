---
title: Spryker Engineer GPT
description: Spryker Engineer GPT boosts Spryker devs with AI code, best practices & feedback.
template: concept-topic-template
---

{% info_block warningBox %}

Before using a AI-related tools, consult with your legal department.

{% endinfo_block %}

## Introduction

Welcome to Spryker's Early Access Program where we value your feedback while our features are still under development. This guide will help you navigate through the program, understand the scope, provide feedback, and ultimately help us refine and improve our product.

## Spryker Engineer GPT

Spryker Engineer GPT is an innovative AI-powered assistant designed specifically for developers working with the Spryker Commerce OS. Currently in its beta phase, Spryker Engineer GPT aims to streamline Spryker project development, improve productivity, and ensure adherence to best practices.

We encourage you to *share your feedback* to help us refine and improve this tool.

You can find it here: [Spryker Engineer (beta)](https://chatgpt.com/g/g-tUbtx3IEQ-spryker-engineer-beta)

## Key Features and Use Cases

### 1. Code Snippet Generation

Spryker Engineer GPT generates accurate and compliant code snippets for common Spryker development tasks. Whether you're working on a Glue API, module facade, or business logic, this assistant provides ready-to-use PHP and XML code based on Spryker standards.

*Example Use Case:*
Creating facades and model structures for a new feature such as an image upload functionality in the Merchant Portal.

### 2. Adherence to Spryker Architecture

The assistant helps developers adhere to Spryker's architectural guidelines, such as stateless classes, PSR-4 compliance, and proper utilization of factories and facades.

*Example Use Case:*
Ensuring repository patterns, transfer objects, and Propel ORM schemas are correctly implemented.

### 3. Enhanced Productivity for Business Logic Implementation

By focusing on the business logic and offloading boilerplate code generation to Spryker Engineer GPT, developers can allocate more time to solving complex problems.

*Example Use Case:*
Designing a product discount feature by generating both backend logic and transfer definitions.

### 4. Improved Development Velocity

With Spryker Engineer GPT, developers can quickly set up new features, reducing the learning curve for newcomers to Spryker while maintaining high-quality output.

*Example Use Case:*
Onboarding new developers to a Spryker project and having them deliver quality work immediately using AI assistance.

### 5. Debugging and Refactoring Assistance

Spryker Engineer GPT can analyze existing code snippets, suggest improvements, and refactor them to align with best practices, ensuring maintainability.

*Example Use Case:*
Refactoring outdated module logic to align with modern Spryker standards.


## Usage Example

Can you provide the PHP Facade and model implementations for the Image Upload feature for the MerchantProductImage module as per the requirements outlined in Paragraph 3, adhering to Spryker's architectural standards?

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

## Feedback

Your feedback is invaluable! Share your experience and suggestions to help us shape the future of Spryker Engineer GPT at [Feedback Exchange Portal](https://portal.productboard.com/spryker/2-feedback-exchange).

## Early Access Program

Spryker's Early Access Program enables real-world testing of our product's new capabilities and tools. This initiative is key in refining and improving our product based on valuable feedback from our partners and customers. Note that early access releases of GPTs may be unsupported and are subject to change, potentially leading to modifications or discontinuation before a General Availability Release.

### How to Participate

You can start participating by simply chatting with the Spryker Cypress E2E Assistant.

### Running the Program

Onboarding: Just start chatting with the Spryker Cypress E2E Assistant. to get started.

Feedback Collection: We highly encourage you to provide feedback through surveys, interviews, or our Product Feedback Exchange.

Iteration and Improvement: Based on your feedback, we will continuously improve our GPTs.

### Program Shutdown Activities

We will announce the program shutdown 2 weeks in advance. After that, we will transition the tool to a General Availability Release, or discontinue it based on our analysis. Regardless of the outcome, we will communicate the next steps, learnings, and insights from the program.

Thank you for being a part of Spryker's journey towards continual improvement. We appreciate your time and invaluable feedback. Together, let's make our product better!