---
title: "Step engine: Create breadcrumb navigation"
description: This document shows how to step up breadcrumb navigation for a step collection
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/step-engine-breadcrumb
originalArticleId: d3fefd59-8373-4c05-9e3e-6a5aa2678d08
redirect_from:
  - /2021080/docs/step-engine-breadcrumb
  - /2021080/docs/en/step-engine-breadcrumb
  - /docs/step-engine-breadcrumb
  - /docs/en/step-engine-breadcrumb
  - /v6/docs/step-engine-breadcrumb
  - /v6/docs/en/step-engine-breadcrumb
  - /v5/docs/step-engine-breadcrumb
  - /v5/docs/en/step-engine-breadcrumb
  - /v4/docs/step-engine-breadcrumb
  - /v4/docs/en/step-engine-breadcrumb
  - /v3/docs/step-engine-breadcrumb
  - /v3/docs/en/step-engine-breadcrumb
  - /v2/docs/step-engine-breadcrumb
  - /v2/docs/en/step-engine-breadcrumb
  - /v1/docs/step-engine-breadcrumb
  - /v1/docs/en/step-engine-breadcrumb
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/step-engine/step-engine-creating-a-breadcrumb-navigation.html
related:
  - title: "Step engine: Use case scenario"
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/step-engine/step-engine-use-case-scenario.html
  - title: "Step engine: Workflow overview"
    link: docs/pbc/all/order-management-system/page.version/base-shop/datapayload-conversion/step-engine/step-engine-workflow-overview.html
---

This document shows how to step up breadcrumb navigation for a step collection.

To set up breadcrumb navigation for a step collection, follow these steps:

1. Mark the steps want to have in your breadcrumb. To mark a step available for breadcrumb, implement `\Spryker\Yves\StepEngine\Dependency\Step\StepWithBreadcrumbInterface` in all the necessary steps.

The following example shows how to enable `MyStep` in the breadcrumb. The comments in each method describe their responsibilities.

<details><summary>Code sample</summary>

```php
<?php

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\StepEngine\Dependency\Step\AbstractBaseStep;
use Spryker\Yves\StepEngine\Dependency\Step\StepWithBreadcrumbInterface;

class MyStep extends AbstractBaseStep implements StepWithBreadcrumbInterface
{

    /**
     * @return string
     */
    public function getBreadcrumbItemTitle()
    {
        /*
         * Return any string that represents this step in the breadcrumb.
         */
        return 'Entry step';
    }

    /**
     * @param AbstractTransfer $dataTransfer
     *
     * @return bool
     */
    public function isBreadcrumbItemEnabled(AbstractTransfer $dataTransfer)
    {
        /*
         * Return true if this step is enabled (for example, clickable); false otherwise. It's
         * recommended to check the post condition to align with the status logic of
         * the step.
         */
        return $this->postCondition($dataTransfer);
    }

    /**
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $dataTransfer
     *
     * @return bool
     */
    public function isBreadcrumbItemHidden(AbstractTransfer $dataTransfer)
    {
        /*
         * You can hide a step from the breadcrumb based on some conditions
         * by returning false in this method. It's recommended to check the require input
         * condition to align with the display logic of the step.
         */
        return !$this->requireInput($dataTransfer);
    }

    // also implement AbstractBaseStep methods...

}
```

</details>

2. Once `StepWithBreadcrumbInterface` is implemented in all the necessary steps, generate the breadcrumb data.

You can instantiate `\Spryker\Yves\StepEngine\Process\StepEngine` together with optional `\Spryker\Yves\StepEngine\Process\StepBreadcrumbGenerator`. This provides the `stepBreadcrumb` variable with an instance of `\Generated\Shared\Transfer\StepBreadcrumbsTransfer` for all the templates handled by the step engine. The `StepBreadcrumbsTransfer` object stores all necessary data to display the breadcrumb in a template.

To generate `StepBreadcrumbsTransfer`, instantiate and use the `\Spryker\Yves\StepEngine\Process\StepBreadcrumbGenerator` class manually. This can be useful to provide a breadcrumb for pages that are not handled by the step engine itself.

The following example shows a template fragment of how to render the breadcrumb with the provided `StepBreadcrumbsTransfer` object.

```php
<ul>
    {% raw %}{%{% endraw %} for stepBreadcrumbItem in stepBreadcrumb.items {% raw %}%}{% endraw %}
        <li class="{% raw %}{%{% endraw %} if stepBreadcrumbItem.isActive {% raw %}%}{% endraw %}active{% raw %}{%{% endraw %} elseif not stepBreadcrumbItem.isEnabled {% raw %}%}{% endraw %}disabled{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}">
            {% raw %}{%{% endraw %} if stepBreadcrumbItem.isEnabled and not stepBreadcrumbItem.isActive {% raw %}%}{% endraw %}
                <a href="{% raw %}{{{% endraw %} url(stepBreadcrumbItem.route) {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} stepBreadcrumbItem.title | trans {% raw %}}}{% endraw %}</a>
            {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                {% raw %}{{{% endraw %} stepBreadcrumbItem.title | trans {% raw %}}}{% endraw %}
            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
        </li>
    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
</ul>
```
