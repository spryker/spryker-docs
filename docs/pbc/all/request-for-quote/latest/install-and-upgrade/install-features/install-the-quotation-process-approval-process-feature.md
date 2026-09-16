---
title: Install the Quotation Process + Approval Process feature
description: Learn how to Install the Quotation Process + Approval Process features in your Spryker based project.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/quotation-process-approval-process-feature-integration
originalArticleId: 127edbbd-6c59-4aed-826f-66b7b41022c5
redirect_from:
  - /2021080/docs/quotation-process-approval-process-feature-integration
  - /2021080/docs/en/quotation-process-approval-process-feature-integration
  - /docs/quotation-process-approval-process-feature-integration
  - /docs/en/quotation-process-approval-process-feature-integration
  - /docs/scos/dev/feature-integration-guides/202311.0/quotation-process-approval-process-feature-integration.html
  - /docs/pbc/all/request-for-quote/202204.0/install-and-upgrade/install-features/install-the-quotation-process-approval-process-feature.html
---
This document describes how to install the Quotation process + Approval Process feature.

## Install feature core

Follow the steps below to install the Quotation process + Approval Process feature core.

### Prerequisites

Install the required features:

| NAME              | VERSION          | INSTALLATION GUIDE |
|-------------------|------------------|------------------|
| Quotation Process | {{page.release_tag}} | [Install the Quotation Process feature](/docs/pbc/all/request-for-quote/latest/install-and-upgrade/install-features/install-the-quotation-process-feature.html) |
| Approval Process  | {{page.release_tag}} | [Install the Approval Process feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-approval-process-feature.html) |

### 1) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| QuoteApprovalQuoteRequestQuoteCheckPlugin | Checks if the "Request For Quote" button should be shown on the cart page or not. | None | Spryker\Client\QuoteApproval\Plugin\QuoteRequest |
| QuoteRequestQuoteApprovalUnlockPreCheckPlugin | Prevents quote unlock  by approval process when it's in quotation process. | None | Spryker\Zed\QuoteRequest\Communication\Plugin\QuoteApproval |
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
