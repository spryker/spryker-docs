---
title: Quotation Process + Approval Process feature integration
description: Install the Quotation Process + Approval Process features in your project.
last_updated: Jan 25, 2022
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/quotation-process-approval-process-feature-integration
originalArticleId: 127edbbd-6c59-4aed-826f-66b7b41022c5
redirect_from:
  - /2021080/docs/quotation-process-approval-process-feature-integration
  - /2021080/docs/en/quotation-process-approval-process-feature-integration
  - /docs/quotation-process-approval-process-feature-integration
  - /docs/en/quotation-process-approval-process-feature-integration
---

This document describes how to integrate the Quotation process + Approval Process feature into a Spryker project.

## Install feature core

Follow the steps below to install the Quotation process + Approval Process feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME              | VERSION          | INTEGRATION GUIDE |
|-------------------|------------------|------------------|
| Quotation Process | {{page.version}} | [Quotation Process feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quotation-process-feature-integration.html) |
| Approval Process  | {{page.version}} | [Approval Process feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/approval-process-feature-integration.html) |

### 1) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| QuoteApprovalQuoteRequestQuoteCheckPlugin | Checks if the "Request For Quote" button should be shown on the cart page or not. | None | Spryker\Client\QuoteApproval\Plugin\QuoteRequest |
| QuoteRequestQuoteApprovalUnlockPreCheckPlugin | Prevents quote unlock  by approval process when it is in quotation process. | None | Spryker\Zed\QuoteRequest\Communication\Plugin\QuoteApproval |
| QuoteApprovalQuoteRequestPreCreateCheckPlugin | Checks if the quote doesn't have the status `waiting`. | None | Spryker\Zed\QuoteApproval\Communication\Plugin\QuoteRequest |

**src/Pyz/Client/QuoteRequest/QuoteRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Client\QuoteRequest;

use Spryker\Client\QuoteApproval\Plugin\QuoteRequest\QuoteApprovalQuoteRequestQuoteCheckPlugin;
use Spryker\Client\QuoteRequest\QuoteRequestDependencyProvider as SprykerQuoteRequestDependencyProvider;

class QuoteRequestDependencyProvider extends SprykerQuoteRequestDependencyProvider
{
    /**
     * @return \Spryker\Client\QuoteRequestExtension\Dependency\Plugin\QuoteRequestQuoteCheckPluginInterface[]
     */
    protected function getQuoteRequestQuoteCheckPlugins(): array
    {
        return [
            new QuoteApprovalQuoteRequestQuoteCheckPlugin(),
        ];
    }
}
```

**src/Pyz/Client/QuoteApproval/QuoteApprovalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\QuoteApproval;

use Spryker\Zed\QuoteApproval\QuoteApprovalDependencyProvider as SprykerQuoteApprovalDependencyProvider;
use Spryker\Zed\QuoteRequest\Communication\Plugin\QuoteApproval\QuoteRequestQuoteApprovalUnlockPreCheckPlugin;

class QuoteApprovalDependencyProvider extends SprykerQuoteApprovalDependencyProvider
{
    /**
     * @return \Spryker\Zed\QuoteApprovalExtension\Dependency\Plugin\QuoteApprovalUnlockPreCheckPluginInterface[]
     */
    protected function getQuoteApprovalUnlockPreCheckPlugins(): array
    {
        return [
            new QuoteRequestQuoteApprovalUnlockPreCheckPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/QuoteRequest/QuoteRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\QuoteRequest;

use Spryker\Zed\QuoteApproval\Communication\Plugin\QuoteRequest\QuoteApprovalQuoteRequestPreCreateCheckPlugin;
use Spryker\Zed\QuoteRequest\QuoteRequestDependencyProvider as SprykerQuoteRequestDependencyProvider;

class QuoteRequestDependencyProvider extends SprykerQuoteRequestDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\QuoteRequestExtension\Dependency\Plugin\QuoteRequestPreCreateCheckPluginInterface>
     */
    protected function getQuoteRequestPreCreateCheckPlugins(): array
    {
        return [
            new QuoteApprovalQuoteRequestPreCreateCheckPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that the **Request For Quote** button is not available on the **Cart** page when the quote is in the status *Waiting*.

Make sure that when you have locked cart after quotation process and request approval for this cart, the cart should stay locked even if approver declined it.

{% endinfo_block %}
