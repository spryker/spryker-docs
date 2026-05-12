---
title: Custom Twig Functions for Yves
description: The article describes twig functions, its method signatures, and examples of their usage.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/custom-twig-functions-for-yves
originalArticleId: 04bc2269-b231-4d52-aa81-29a3cbb45655
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/custom-twig-functions-for-yves.html
  - /docs/scos/dev/front-end-development/yves/adding-and-using-external-libraries-in-yves.html
---

To improve developer experience, [Twig](https://twig.symfony.com/) functionality is extended with custom Twig functions. All the Twig extension implementations are located in the `ShopUi` module and can be found in `ShopUi/src/SprykerShop/Yves/ShopUi/Twig`.

| FUNCTION NAME | REQUIRED | DESCRIPTION | METHOD SIGNATURE | USAGE EXAMPLE |
| --- | --- | --- | --- | --- |
| `publicPath` | ✓ | <ul><li>Provides a safe way to access the `public` folder where compiled assets are located. Returns a string like:<br>`/assets/DE/default/css/yves_default.app.css.`</li><li>Also supports remote asset folders such as CDN resources. See [Custom Location for Static Assets](/docs/dg/dev/integrate-and-configure/integrate-custom-location-for-static-assets.html).</li></ul> | `function publicPath($relativePath: string): string`<ul><li>`$relativePath` - relative asset path</li></ul> | `{% raw %}{{{% endraw %} publicPath('css/yves_default.app.css') {% raw %}}}{% endraw %}`<br>`{% raw %}{{{% endraw %} publicPath('js/yves_default.runtime.js') {% raw %}}}{% endraw %}` |
| `model` | ✓ | Resolves a model path like `@ShopUi/models/{modelName}.twig`. | `function model($modelName: string): string`<ul><li>`$modelName` - model name</li></ul> | `{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}` |
| `atom` | ✓ | Resolves an atom path like `@{componentModule}/components/atoms/{componentName}/{componentName}.twig`. | `function atom($componentName: string, $componentModule: string = 'ShopUi'): string`<ul><li>`$componentName` - component name</li><li>`$componentModule` - Spryker module</li></ul> | `{% raw %}{%{% endraw %} include atom('checkbox') only {% raw %}%}{% endraw %}` |
| `molecule` | ✓ | Resolves a molecule path like `@{componentModule}/components/molecules/{componentName}/{componentName}.twig`. | `function molecule($componentName: string, $componentModule: string = 'ShopUi'): string`<ul><li>`$componentName` - component name</li><li>`$componentModule` - Spryker module</li></ul> | `{% raw %}{%{% endraw %} extends molecule('card') {% raw %}%}{% endraw %}` |
| `organism` | ✓ | Resolves an organism path like `@{componentModule}/components/organisms/{componentName}/{componentName}.twig`. | `function organism($componentName: string, $componentModule: string = 'ShopUi'): string`<ul><li>`$componentName` - component name</li><li>`$componentModule` - Spryker module</li></ul> | `{% raw %}{%{% endraw %} include organism('header') only {% raw %}%}{% endraw %}` |
| `template` | ✓ | Resolves a template path like `@{templateModule}/templates/{templateName}/{templateName}.twig`. | `function template($templateName: string, $templateModule: string = 'ShopUi'): string`<ul><li>`$templateName` - template name</li><li>`$templateModule` - Spryker module</li></ul> | `{% raw %}{%{% endraw %} extends template('widget') {% raw %}%}{% endraw %}`<br>`{% raw %}{%{% endraw %} extends template('page-layout-catalog', 'CatalogPage') {% raw %}%}{% endraw %}` |
| `view` | ✓ | Resolves a view path like `@{viewModule}/views/{viewName}/{viewName}.twig`. | `function view($viewName: string, $viewModule: string = 'ShopUi'): string`<ul><li>`$viewName` - view name</li><li>`$viewModule` - Spryker module</li></ul> | `{% raw %}{%{% endraw %} extends view('voucher-form', 'DiscountWidget') {% raw %}%}{% endraw %}` |
| `define` |  | Used for:<ul><li>creating a default object that can be changed from context</li><li>defining tags to pass properties for a component</li></ul>See [How the "define" Twig Tag is Working](/docs/dg/dev/frontend-development/{{page.version}}/define-twig-tag.html). | None | See **Usage Example: define** below. |
| `qa` |  | Returns a string like `data-qa="qa values here".` | `function qa($qaValues: string[] = []): string` | `{% raw %}{{{% endraw %} qa('submit-button') {% raw %}}}{% endraw %}` |
| `qa_*` | ✓ | Returns a string like `data-qa-name="{qa values}".` | `function qa_*($qaName: string, $qaValues: string[] = []): string`<ul><li>`$qaName` - name for the data structure</li></ul> | `{% raw %}{{{% endraw %} qa_additional('value') {% raw %}}}{% endraw %}` |


**Usage Example: define**

```twig
{% raw %}{%{% endraw %} define data = {
    items: _widget.productGroupItems,
} {% raw %}%}{% endraw %}
```
