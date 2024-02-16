---
title: Custom Twig functions for Zed
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/custom-twig-functions-for-zed
originalArticleId: 573c0374-a901-44e1-8996-348f40292e5c
redirect_from:
  - /docs/scos/dev/front-end-development/202311.0/zed/custom-twig-functions-for-zed.html
  - /docs/scos/dev/front-end-development/zed/custom-twig-functions-for-zed.html

---

To improve developer experience, [Twig](https://twig.symfony.com/) functionality is extended with custom Twig functions. All the Twig extension implementations are located in the `Gui` module and can be found in `Pyz\Zed\Twig\TwigDependencyProvider`.

<details>
<summary>Pyz\Zed\Twig\TwigDependencyProvider</summary>

```php
namespace Pyz\Zed\Twig;

...

use Spryker\Zed\Gui\Communication\Plugin\Twig\AssetsPathTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\BackActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\CreateActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\EditActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\RemoveActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Action\ViewActionButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\ButtonGroupTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Form\SubmitButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\BackTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\CreateTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\EditTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\RemoveTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\Buttons\Table\ViewTableButtonTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\FormRuntimeLoaderTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\GuiFilterTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\GuiTwigLoaderPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\TabsTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\UrlDecodeTwigPlugin;
use Spryker\Zed\Gui\Communication\Plugin\Twig\UrlTwigPlugin;

...

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [

            ...

            new AssetsPathTwigPlugin(),
            new TabsTwigPlugin(),
            new UrlTwigPlugin(),
            new UrlDecodeTwigPlugin(),
            new PanelTwigPlugin(),
            new ModalTwigPlugin(),
            // navigation buttons
            new ButtonGroupTwigPlugin(),
            new BackActionButtonTwigPlugin(),
            new CreateActionButtonTwigPlugin(),
            new ViewActionButtonTwigPlugin(),
            new EditActionButtonTwigPlugin(),
            new RemoveActionButtonTwigPlugin(),
            // table row buttons
            new EditTableButtonTwigPlugin(),
            new BackTableButtonTwigPlugin(),
            new CreateTableButtonTwigPlugin(),
            new ViewTableButtonTwigPlugin(),
            new RemoveTableButtonTwigPlugin(),
            // Form buttons
            new SubmitButtonTwigPlugin(),
        ];
    }
  }
```
</details>

| FUNCTION NAME | DESCRIPTION | METHOD SIGNATURE | USAGE EXAMPLE |
| --- | --- | --- | --- |
| `assetsPath` | <ul><li>Provides a safe way to access the `public` folder where compiled assets are located. Returns a string in the following format: <br>`{publicAssetsPath}{namespaceName}{themeName}{relativeAssetPath}`. For example, `/assets/css/spryker-zed-gui-main.js`.<br>`/assets/css/spryker-zed-gui-main.css`.<br>The string is used internally to resolve a component/resource location within a provided module.</li><li>Provides a safe way to access a remote folder where compiled assets are located—for example, a Content Delivery Network (CDN) resource. For more details, see [Custom Location for Static Assets](/docs/dg/dev/integrate-and-configure/integrate-custom-location-for-static-assets.html) f.</li></ul> | `function assetsPath($relativePath: string): string`<ul><li>`$relativePath` - relative asset path (*required*).</li></ul> | `{% raw %}{{{% endraw %} assetsPath('js/spryker-zed-gui-main.js') {% raw %}}}{% endraw %}`<br>`{% raw %}{{{% endraw %} assetsPath('css/spryker-zed-gui-main.css') {% raw %}}}{% endraw %}` |
| `url` | Generates an internal URL from a path string and converts special characters into HTML entities. | `function url($url: string, $query: array, $options: array): string`<ul><li>`$url` - relative URL (*required*).</li><li>`$query` - query string (*optional*). The default value is `[]`.</li><li>`$options` - additional options (*optinal*). The default value is `[]`.</li></ul> | `{% raw %}{{{% endraw %} url('{url}', {'id': id}) {% raw %}}}{% endraw %}` |
| `urldecode` | Encodes the URL. | `function urldecode($url: string): string`<ul><li>`$url`- URL string to be decoded (*required*).</li></ul> | `{% raw %}{{{% endraw %} urldecode('{url}') {% raw %}}}{% endraw %}` |
| `tabs` | Renders tabs upon navs and cards internally by the defined template - `@Gui/Tabs/tabs.twig`. | `function tabs($tabsViewTransfer: TabsViewTransfer, $context: array): string`<ul><li>`$tabsViewTransfer` - data transfer object that contains the tabs to be rendered (*required*).</li><li>`$context` - array of parameters to pass to the template (*optional*). The default value is `[]`.</li></ul> | `{% raw %}{{{% endraw %} tabs(contentTabs, {'contentForm' : contentForm}) {% raw %}}}{% endraw %}` |
| `panel` | Renders basic panel box by the defined template: `@Gui/Panel/panel.twig`. | `function panel($title: string, $content: string, $options: array, $footer string): string`<ul><li>`$title` - panel title (*required*).</li><li>`$content` - panel content (*required*).</li><li>`$options` - panel additional options (*optional*), e.g `noWrap`.  The default value is `null`.</li><li>`$footer` - panel footer (*optional*). The default value is `null`.</li></ul> | `{% raw %}{{{% endraw %} panel('key.to.translate'|trans, block('block'), {'noWrap': true}) {% raw %}}}{% endraw %}` |
| `modal` | Renders dialog to your site for lightboxes, user notifications, or completely custom content by defined template: `@Gui/Modal/modal.twig`. | `function modal($title: string, $content: string, $footer: string, $extraData: string): string`<ul><li>`$title` - modal window title (*required*).</li><li>`$content` - modal window content (*required*).</li><li>`$footerModal` window footer (*optional*). The default value is `null`.</li><li>`$extraData` - sets additional options:<ul><li>`class`</li><li>`id`</li><li>`noWrap`</li><li>`collapsable`</li><li>`collapsed`</li></ul></li></ul> | `{% raw %}{{{% endraw %} modal('key.to.translate|trans', 'content'){% raw %}}}{% endraw %}` |
| `listGroup` | Renders a custom list group to display a series of content: `@Gui/ListGroup/list-group.twig`. | `function listGroup($items: array): string`<ul><li>`$items` - array of items to render (*required*).</li></ul> | `{% raw %}{{{% endraw %} listGroup(items) {% raw %}}}{% endraw %}` |
| `backActionButton` | Generates a custom action button. | `function ($url: string, $title: string, $options: array): string`<ul><li>`$url` - relative URL (*required*).</li><li>`$title` - name (*required*).</li><li>`$options` - sets additional options (*optional*). The default value is `[]`. The options are:<ul><li>`id`</li><li>`class`</li><li>`default_css_classes`</li><li>`button_class`</li><li>`icon`</li></ul></li></ul> | `{% raw %}{{ backActionButton('/user', 'key.to.translate' | trans) }}{% endraw %}` |
| `createActionButton` | Generates a custom action button. | `function ($url: string, $title: string, $options: array): string`<ul><li>`$url` - relative URL (*required*).</li><li>`$title` - name (*required*).</li><li>`$options` - sets additional options (*optional*). The default value is `[]`. The options are:<ul><li>`id`</li><li>`class`</li><li>`default_css_classes`</li><li>`button_class`</li><li>`icon`</li></ul></li></ul> | `{% raw %}{{ createActionButton('/user/create', 'key.to.translate' | trans) }}{% endraw %}` |
| `editActionButton` | Generates a custom action button. | `function ($url: string, $title: string, $options: array): string`<ul><li>`$url` - relative URL (*required*).</li><li>`$title` - name (*required*).</li><li>`$options` - sets additional options (*optional*). The default value is `[]`. The options are:<ul><li>`id`</li><li>`class`</li><li>`default_css_classes`</li><li>`button_class`</li><li>`icon`</li></ul></li></ul> | `{% raw %}{{ editActionButton(url('/user/edit', {'id-user': idUser}), 'key.to.translate' | trans) }}{% endraw %}` |
| `removeActionButton` | Generates a custom action button. | `function ($url: string, $title: string, $options: array): string`<ul><li>`$url` - relative URL (*required*).</li><li>`$title` - name (*required*).</li><li>`$options` - sets additional options (*optional*). The default value is `[]`. The options are:<ul><li>`id`</li><li>`class`</li><li>`default_css_classes`</li><li>`button_class`</li><li>`icon`</li></ul></li></ul> | `{% raw %}{{ removeActionButton(url('/user/delete', {'id-user': userId}), 'key.to.translate' | trans) }}{% endraw %}` |
| `viewActionButton` | Generates a custom action button. | `function ($url: string, $title: string, $options: array): string`<ul><li>`$url` - relative URL (*required*).</li><li>`$title` - name (*required*).</li><li>`$options` - sets additional options (*optional*). The default value is `[]`. The options are:<ul><li>`id`</li><li>`class`</li><li>`default_css_classes`</li><li>`button_class`</li><li>`icon`</li></ul></li></ul> | `{% raw %}{{ viewActionButton('/user/view', 'key.to.translate' | trans) }}{% endraw %}` |
| `submit_button` | Renders a custom submit button by the defined template: `@Gui/Form/button/submit_button.twig`. | `function ($value: string, $attr: array): string`<ul><li>`$value` - defines the initial button value (*required*).</li><li>`$attr` - defines button attributes (*optional*). The default value is `[]`.</li></ul> | `{% raw %}{{ submit_button('key.to.transfer|trans', {}) }}{% endraw %}` |
| `groupActionButtons` | Generates a group of action buttons. | `function ($buttons: array, $title: string, $options: array): string` | `{% raw %}{%{% endraw %} set linksData = {`<br>`{'url' : '/gui/create', 'title' : 'key.to.trans | trans'},`<br>`{'url' : '/gui/edit', 'title' : 'key.to.trans | trans'}`<br>`} {% raw %}%}{% endraw %}`<br>`{% raw %}{{ groupActionButtons(linksData,'key.to.translate' | trans) }}{% endraw %}` |
