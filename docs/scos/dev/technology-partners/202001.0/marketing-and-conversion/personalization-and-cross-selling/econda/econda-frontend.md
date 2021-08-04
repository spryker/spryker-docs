---
title: Econda - Frontend Integration
originalLink: https://documentation.spryker.com/v4/docs/econda-frontend-integration
redirect_from:
  - /v4/docs/econda-frontend-integration
  - /v4/docs/en/econda-frontend-integration
---

{% info_block infoBox "Info" %}
Check [this article](https://documentation.spryker.com/v4/docs/demoshops#spryker-commerce-os--scos-
{% endinfo_block %} to learn about Spryker Commerce OS (SCOS).)

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
