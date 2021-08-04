---
title: Step Engine - Creating a Breadcrumb Navigation
originalLink: https://documentation.spryker.com/v1/docs/step-engine-breadcrumb
redirect_from:
  - /v1/docs/step-engine-breadcrumb
  - /v1/docs/en/step-engine-breadcrumb
---

To set up breadcrumb navigation for a step collection, first, mark which steps you would like to have in your breadcrumb. To mark a step available for breadcrumb, implement `\Spryker\Yves\StepEngine\Dependency\Step\StepWithBreadcrumbInterface` in all the necessary steps.

The following example shows how to enable `MyStep` in the breadcrumb. The comments in each method describe their responsibilities.

<details open>
<summary>Click to expand the code sample</summary>
   
```
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
         * Return any string that will represent this step in the breadcrumb.
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
         * Return true if this step is enabled (e.g. clickable), false otherwise. It's
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
         * It's also possible to hide a step from the breadcrumb based on some conditions
         * by returning false in this method. It's recommended to check the require input
         * condition to align with the display logic of the step.
         */
        return !$this->requireInput($dataTransfer);
    }
    
    // also implement AbstractBaseStep methods...

}
```
 <br>
</details>

Once all the necessary steps implements `StepWithBreadcrumbInterface` the next thing to do is to generate the breadcrumb data. One thing you can do is to instantiate `\Spryker\Yves\StepEngine\Process\StepEngine` together with the optional `\Spryker\Yves\StepEngine\Process\StepBreadcrumbGenerator`. This will provide the stepBreadcrumb variable with an instance of `\Generated\Shared\Transfer\StepBreadcrumbsTransfer` for all the templates handled by the step engine. The `StepBreadcrumbsTransfer` stores all necessary data to be able to display the breadcrumb in a template.

Another thing you can do to generate the `StepBreadcrumbsTransfer` is to instantiate and use `\Spryker\Yves\StepEngine\Process\StepBreadcrumbGenerator` class manually. This can be useful to provide breadcrumb for pages which are not handled with the step engine itself.

The example below shows a template fragment how to render the breadcrumb with the provided `StepBreadcrumbsTransfer`.

```
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

