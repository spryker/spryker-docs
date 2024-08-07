---
title: Custom Twig Functions for Yves
description: The article describes twig functions, its method signatures, and examples of their usage.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/custom-twig-functions-for-yves
originalArticleId: 04bc2269-b231-4d52-aa81-29a3cbb45655
redirect_from:
  - /2021080/docs/custom-twig-functions-for-yves
  - /2021080/docs/en/custom-twig-functions-for-yves
  - /docs/custom-twig-functions-for-yves
  - /docs/en/custom-twig-functions-for-yves
  - /v6/docs/custom-twig-functions-for-yves
  - /v6/docs/en/custom-twig-functions-for-yves
  - /v5/docs/custom-twig-functions-for-yves
  - /v5/docs/en/custom-twig-functions-for-yves
  - /v4/docs/custom-twig-functions-for-yves
  - /v4/docs/en/custom-twig-functions-for-yves
  - /docs/scos/dev/front-end-development/yves/adding-and-using-external-libraries-in-yves.html
  - /docs/scos/dev/front-end-development/202307.0/yves/custom-twig-functions-for-yves.html

---

To improve developer experience, [Twig](https://twig.symfony.com/) functionality has been extended with the new Twig functions introduced. All the Twig extension implementations are located in the `ShopUi` module and can be found in `ShopUi/src/SprykerShop/Yves/ShopUi/Twig`.

| FUNCTION NAME | DESCRIPTION | METHOD SIGNATURE | USAGE EXAMPLE |
| --- | --- | --- | --- |
| `publicPath` | <ul><li>Provides a safe way to access the `public` folder where compiled assets are located. Returns a string in the following format:<br>`{publicAssetsPath}{namespaceName}{themeName}{relativeAssetPath}.` For example, `/assets/DE/default/css/yves_default.app.css.`<br>The string is used internally to resolve a component/resource location within a provided module. </li><li>Provides a safe way to access a remote folder where compiled assets are located, e.g. a CDN (Content Delivery Network) resource. See [Custom Location for Static Assets](/docs/dg/dev/integrate-and-configure/integrate-custom-location-for-static-assets.html) for more details.</li></ul> | `function publicPath($relativePath: string): string`<ul><li>`$relativePath` - relative asset path (*required*). </li></ul>| `{% raw %}{{{% endraw %} publicPath('css/yves_default.app.css') {% raw %}}}{% endraw %}`<br>`{% raw %}{{{% endraw %} publicPath('js/yves_default.runtime.js') {% raw %}}}{% endraw %}` |
| `model` | Resolves a model path and returns a string in the following format:<br> `@ShopUi/models/{modelName}.twig`. | `function model($modelName: string): string`<ul><li>`$modelName` - model name (*required*).</li></ul> | `{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}` |
| `atom` | Resolves an atom path and returns a string in the following format:<br>`@{componentModule}/components/atoms/{componentName}/{componentName}.twig`. | `function atom($componentName: string, $componentModule: string = ‘ShopUi’): string`<ul><li>`$componentName` - component name (required).</li><li>`$componentModule` - Spryker module in which the component is located (*optional*). If not specified, `ShopUi` is used.</li></ul> | `{% raw %}{%{% endraw %} include atom('checkbox') only {% raw %}%}{% endraw %}` |
| `molecule` | Resolves a molecule path and returns a string in the following format:<br>`@{componentModule}/components/molecules/{componentName}/{componentName}.twig`. | `function molecule($componentName: string, $componentModule: string = ‘ShopUi’): string`<ul><li>`$componentName` - component name (*required*).</li><li>`$componentModule` - Spryker module in which the component is located (*optional*). If not specified, `ShopUi` is used.</li></ul> | `{% raw %}{%{% endraw %} extends molecule('card') {% raw %}%}{% endraw %}` |
| `organism` | Resolves an organism path and returns a string in the following format:<br>`@{componentModule}/components/organisms/{componentName}/{componentName}.twig`. | `function organism($componentName: string, $componentModule: string = ‘ShopUi’): string`<ul><li>`$componentName` - component name (*required*).</li><li>`$componentModule` - Spryker module in which the component is located (*optional*). If not specified, `ShopUi` is used.</li></ul> | `{% raw %}{%{% endraw %} include organism('header') only {% raw %}%}{% endraw %}` |
| `template` | Resolves a template path and returns a string in the following format:<br>`@{templateModule}/templates/{templateName}/{templateName}.twig`. | `function template($templateName: string, $templateModule: string = ‘ShopUi’): string`<ul><li>`$templateName` - template name (*required*).</li><li>`$templateModule` - Spryker module in which the template is located (optional). If not specified, `ShopUi` is used.</li></ul> | `{% raw %}{%{% endraw %} extends template('widget') {% raw %}%}{% endraw %}`<br>`{% raw %}{%{% endraw %} extends template('page-layout-catalog', 'CatalogPage') {% raw %}%}{% endraw %}` |
| `view` | Resolves a view path and returns a string in the following format:<br>`@{viewModule}/views/{viewName}/{viewName}.twig`. | `function view($viewName: string, $viewModule: string = ‘ShopUi’): string`<ul><li>`$viewName` - view name (*required*).</li><li>`$viewModule` - Spryker module in which the view is located (optional). If not specified, `ShopUi` is used.</li></ul> | `{% raw %}{%{% endraw %} extends view('voucher-form', 'DiscountWidget') {% raw %}%}{% endraw %}` |
| `define` | This function is used for:<ul><li>creating a default object that can be changed from an incoming context;</li><li>defining tags used to pass properties and contract for a specific component.</li></ul>For more information, see [How the "define" Twig Tag is Working](/docs/dg/dev/frontend-development/{{page.version}}/define-twig-tag.html). | None | See **Usage Example: define** below.|
| `qa` | Returns a string in the following format: `data-qa="qa values here".` | `function qa($qaValues: string[] = []): string` | `{% raw %}{{{% endraw %} qa('submit-button') {% raw %}}}{% endraw %}` |
| `qa_* ` | Returns a string in the following format: `data-qa-name=“{qa values}”.` | `function qa_*($qaName: string, $qaValues: string[] = []): string`<ul><li>`$qaName` - specifies the name to add in the left side of the data structure.</li></ul> | `{% raw %}{{{% endraw %} qa_additional('value') {% raw %}}}{% endraw %}` |

**Usage Example: define**

```twig
{% raw %}{%{% endraw %} define data = {
    items: _widget.productGroupItems,
} {% raw %}%}{% endraw %}
```
