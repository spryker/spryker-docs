---
title: Integrating Econda
description: Learn how you can integrate Spryker Third Party Econda in to your Spryker Cloud Commerce OS based projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/econda-integration-into-project
originalArticleId: c4cff442-13cf-4c1e-ad8e-95457220cc85
redirect_from:
  - /docs/scod/user/technology-partners/202204.0/marketing-and-conversion/personalization-and-cross-selling/econda/econda-integration-into-project.html
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/personalization-and-cross-selling/econda/integrating-econda.html
  - /docs/scos/dev/technology-partner-guides/202311.0/marketing-and-conversion/personalization-and-cross-selling/econda/integrating-econda.html
  - /docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/personalization-and-cross-selling/econda/integrating-econda.html
---

To integrate Econda, do the following.

## Prerequisites

Our Econda module offers the integration with these services for the application you are building using Spryker.

To integrate with Econda, you will need to connect your Econda account. If you do not have an Econda account  contact [Econda Sales](mailto:sales@econda.com?subject=SalesRequest from a Spryker Contact).

To enable Econda tracking for your application, you need to download a personalized JavaScript library from the Econda Analytics Configuration menu (you can find the detailed instructions on the [Econda website](https://support.econda.de/display/MONDE/Tracking-Bibliothek+herunterladen)).

For [cross sell widgets](/docs/pbc/all/product-relationship-management/{{page.version}}/third-party-integrations/econda/integrate-econda-cross-selling.html), we will demonstrate integration of JS SDK that you can download from the [Econda website](http://downloads.econda.de/support/releases/js-sdk/current/econda-recommendations.php).

Refer to [Econda](http://www.econda.de/) documentation on how to customize your Econda widgets.

Some examples can be found at [https://www.econda.de/](https://www.econda.de/)

Details on how to work with Javascript and templates in Spryker can be found in the [Front-End guide](/docs/dg/dev/frontend-development/{{page.version}}/yves/atomic-frontend/atomic-frontend.html).

Econda module uses collectors to [export data to CSV](/docs/pbc/all/product-relationship-management/{{page.version}}/third-party-integrations/econda/export-econda-data.html). Read more about Collectors.

### Econda JS Library and SDK

Download a personalized JavaScript library from the Econda Analytics Configuration menu by following instructions at [https://support.econda.de/display/MONDE/Tracking-Bibliothek+herunterladen](https://support.econda.de/display/MONDE/Tracking-Bibliothek+herunterladen) and Econda JS SDK from [http://downloads.econda.de/support/releases/js-sdk/current/econda-recommendations.php](http://downloads.econda.de/support/releases/js-sdk/current/econda-recommendations.php)

## Include Econda Libraries and Scripts for Tracking and Cross-sell

Econda scripts are recommended to be connected at all the shop pages. To implement that:

1. Place Econda libraries into `project/frontend/assets/scripts` folder.
2. Add path to folder to webpack in `frontend/configs/development.js`.

**development.js**

```js
CopyWebpackPlugin([
    ...
        {
            from: `${appSettings.paths.assets}/scripts`,
			to: 'scripts',
			ignore: ['*.gitkeep']
		}
    ...
```

3. Extend `page-layout-main.twig` scripts block.

**page-layout-main.twig**

```xml
{% raw %}{%{% endraw %} block footerScripts {% raw %}%}{% endraw %}
        {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
            <script src="{% raw %}{{{% endraw %}publicPath('scripts/emos2.js'){% raw %}}}{% endraw %}"></script>
		    <script src="{% raw %}{{{% endraw %}publicPath('scripts/json/json2.js'){% raw %}}}{% endraw %}"></script>
		    <script src="{% raw %}{{{% endraw %}publicPath('scripts/ecwidget/econdawidget.js'){% raw %}}}{% endraw %}"></script>
		    <script src="{% raw %}{{{% endraw %}publicPath('scripts/econda-recommendations.js'){% raw %}}}{% endraw %}"></script>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

 ## Econda Cross Sell Integration
Extend `ProductController` on the project level.

**ProductController**

```php
<?php

namespace Pyz\Yves\ProductDetailPage\Controller;

use Spryker\Shared\Config\Config;
use SprykerEco\Shared\Econda\EcondaConstants;
use SprykerShop\Yves\ProductDetailPage\Controller\ProductController as SprykerProductController;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends SprykerProductController
{
	/**
	 * @param array $productData
	 * @param \Symfony\Component\HttpFoundation\Request $request
	 *
	 * @return array
	 */
	protected function executeDetailAction(array $productData, Request $request): array
	{
		$productViewTransfer = $this->getFactory()
			->getProductStorageClient()
			->mapProductStorageData($productData, $this->getLocale(), $this->getSelectedAttributes($request));

		$this->assertProductRestrictions($productViewTransfer);

		return [
			'product' => $productViewTransfer,
			'productUrl' => $this->getProductUrl($productViewTransfer),
			'econdaAccountId' => Config::get(EcondaConstants::ACCOUNT_ID),
		];
	}
}
```

Add a new field `econdaAccountId` to the `pdp.twig` file on the project level and extend product-detail molecule calling:

```html
{% raw %}{%{% endraw %} define data = {
	product: _view.product,
	productUrl: _view.productUrl,
	econdaAccountId: _view.econdaAccountId,
	...
} {% raw %}%}{% endraw %}


{% raw %}{%{% endraw %} include molecule('product-detail', 'ProductDetailPage') with {
	class: 'box',
	data: {
		description: data.product.description,
		attributes: data.product.attributes,
		product: data.product,
		econdaAccountId: data.econdaAccountId
	}
} only {% raw %}%}{% endraw %}
```

To add Cross Sell Widget you should include Econda Cross-sell-widget molecule to the product detail page in `product-detail.twig` and add required data field:

**product-detail.twig**

```html
{% raw %}{%{% endraw %} define data = {
	...
	product: required,
	econdaAccountId: required,
	category: {name: 'test'}
	...
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} include molecule('econda-cross-sell-widget', 'Econda') with {
	data: {
		product: data.product,
		category: data.category,
		econdaAccountId: data.econdaAccountId
	}
} only {% raw %}%}{% endraw %}
```

## Econda Analytics

As Econda analytic script `emos2.js` is connected, it will automatically send default statistic (visits, activity). To specify statistics:

Include `econda-tracker.twig` molecule to the page you need to track and pass specific data to send to analytics. For example product views analytic on product detail page:
product -detail.twig

**product -detail.twig**

```html
{% raw %}{%{% endraw %} include molecule('econda-tracker', 'Econda') with {
	data: {
		product: data.product,
		content: '/catalog/' ~ ((data.category is not null) ? data.category.name ~ '/' : '') ~ data.product.name,
		category: data.category
	}
} only {% raw %}%}{% endraw %}
```

This implementation will collect product information, viewed page, category and send it to econda product views statistics.

You can refer to data contract in  `econda-tracker.twig` to send another specific information.
