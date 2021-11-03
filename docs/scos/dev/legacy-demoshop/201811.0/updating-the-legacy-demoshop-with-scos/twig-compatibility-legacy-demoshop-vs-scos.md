---
title: Twig Compatibility:Legacy Demoshop vs SCOS
description: Use the guide to learn how to configure the Twig variables passed to the global Twig namespace in the demoshop.
last_updated: Aug 27, 2020
template: howto-guide-template
originalLink: https://documentation.spryker.com/v6/docs/twig-compatibility-mode-demoshop-vs-suite
originalArticleId: ca84f253-0b8f-451d-a25d-4e2e818e2753
redirect_from:
  - /v6/docs/twig-compatibility-mode-demoshop-vs-suite
  - /v6/docs/en/twig-compatibility-mode-demoshop-vs-suite
  - /v5/docs/twig-compatibility-mode-demoshop-vs-suite
  - /v5/docs/en/twig-compatibility-mode-demoshop-vs-suite
  - /v4/docs/twig-compatibility-mode-demoshop-vs-suite
  - /v4/docs/en/twig-compatibility-mode-demoshop-vs-suite
  - /v3/docs/twig-compatibility-mode-demoshop-vs-suite
  - /v3/docs/en/twig-compatibility-mode-demoshop-vs-suite
  - /v2/docs/twig-compatibility-mode-demoshop-vs-suite
  - /v2/docs/en/twig-compatibility-mode-demoshop-vs-suite
  - /v1/docs/twig-compatibility-mode-demoshop-vs-suite
  - /v1/docs/en/twig-compatibility-mode-demoshop-vs-suite
related:
  - title: Making the Legacy Demoshop Compatible with the Modular Frontend
    link: docs/scos/dev/migration-and-integration/page.version/updating-the-legacy-demoshop-with-scos/making-the-legacy-demoshop-compatible-with-the-modular-frontend.html
  - title: Making the Legacy Demoshop Compatible with the Atomic Frontend
    link: docs/scos/dev/migration-and-integration/page.version/updating-the-legacy-demoshop-with-scos/making-the-legacy-demoshop-compatible-with-the-atomic-frontend.html
  - title: Setting up ShopUiCompatibility Module in the Legacy Demoshop
    link: docs/scos/dev/migration-and-integration/page.version/updating-the-legacy-demoshop-with-scos/setting-up-shopuicompatibility-module-in-the-legacy-demoshop.html
---

In the SCOS, all variables available in the Twig templates can be accessed from the `_view` variable. In the Demoshop we used a different technique and passed the Twig variables to the global Twig namespace directly. The following code examples will help to understand the difference.

**Demoshop controller:**

```php
...
public function fooAction(): array
{
    return $this->viewResponse([
        'varA' => 'value-a',
    ]);
}
```

**Demoshop Twig file:**

```html
<div>
    <p>The value of varA is {% raw %}{{{% endraw %} varA {% raw %}}}{% endraw %}</p>
</div>
```
As you can see in this example, the key (`varA`) passed from the controller to the template is used one-to-one to retrieve the value inside the template.

We changed this behavior in the SCOS, as already mentioned, to keep the global scope of Twig clean. See the following example:

**SCOS controller:**

```php
use SprykerYvesKernelViewView;
...
public function fooAction(): View
{
    return $this->view([
        'varA' => 'value-a',
    ]);
}
...
```
**SCOS Twig file:**

```html
<div>
    <p>The value of varA is {% raw %}{{{% endraw %} _view.varA {% raw %}}}{% endraw %}</p>
</div>
```
The view object here is limited to the current template scope.

## How to Use a SCOS Feature Within the Demoshop

Not to be forced to update all the Twig files and variables usages, we added a configuration option that can be used to pass all the variables to the global Twig scope.

**ShopApplicationConfig:**

```php
<?php

/**
* Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
* Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
*/

namespace SprykerShopYvesShopApplication;

use SprykerYvesKernelAbstractBundleConfig;

class ShopApplicationConfig extends AbstractBundleConfig
{
    ...

    /**
     * @return bool
     */
    public function useViewParametersToRenderTwig(): bool
    {
        return false;
    }
}
```

When this method has been changed in your project so it returns `true` instead of `false`, the way of Demoshop accessing the Twig variable can be used if the `View` class from the SCOS is used.

```php
<div>
    <p>The value of varA is {% raw %}{{{% endraw %} _view.varA {% raw %}}}{% endraw %}</p>
</div>
```

and

```php
<div>
    <p>The value of varA is {% raw %}{{{% endraw %} varA {% raw %}}}{% endraw %}</p>
</div>
```

can now be used to access variables in Twig.

For more information on Demoshop vs Suite compatibility, see [Making Demoshop Compatible with Shop App, Atomic Design, P&amp;S](/docs/scos/dev/migration-and-integration/202009.0/updating-the-legacy-demoshop-with-scos/making-the-legacy-demoshop-compatible-with-the-modular-frontend.html).
