---
title: Tutorial - Hello World - Legacy Demoshop
originalLink: https://documentation.spryker.com/v4/docs/hello-world-legacy
redirect_from:
  - /v4/docs/hello-world-legacy
  - /v4/docs/en/hello-world-legacy
---

<!--used to be: http://spryker.github.io/challenge/hello-world/-->

## Challenge Description
Build a **HelloWorld**  module in Yves that will render the `Hello World!` string on the page.

## Manually building the HelloWorld module in Yves

1. Create a module folder in Yves under `src/Pyz/Yves/`. This will be the location for all the module  files.
2. Create an `IndexController` (as extension of `AbstractController`) including an `indexAction()` action under `src/Pyz/Yves/HelloWorld/Controller/`. This controller action will be called when URL is requested.
3. Create a Twig template in the presentation layer `src/Pyz/Yves/HelloWorld/Theme/default/index/index.twig`. The template is needed to show information in the browser.
4. Create a controller provider for our module  and register `URL /hello-world` in it. URL Routing gives additional details on doing this.
5. Add the controller provider to `YvesBootstrap::getControllerProviderStack()`. This ensures that the defined controller is correctly routed by Silex.
6. Open the newly created page [http://www.de.demoshop.local/hello-world](http://www.de.demoshop.local/hello-world).

## Using Code Generator

{% info_block infoBox %}
To save even more time, you can use code generator from development tools shipped with Spryker Code Generator.
{% endinfo_block %}

1. To generate an Yves skeleton of the module  just execute:
```bash
console code:generate:module:yves HelloWorld
```
2. Check the generated `HelloWorldControllerProvider`, the Yves route should look like this:
This registers our controller action under `/hello-world` URL.
```php
<?php
$this->createController('/hello-world', 'hello-world', 'HelloWorld', 'Index', 'index');
```
3. Change body of the `IndexController::indexAction` method in our module  to return some value to our template:
```php
<?php
return [
    'helloWorld' => 'Hello World!'
];
```
4. Now open the generated `index.twig` template of our module . Let’s extend the template from the base application layout and render variable helloWorld we are returning in the controller:
```php
{% raw %}{%{% endraw %} extends "@application/layout/layout.twig" {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block title {% raw %}%}{% endraw %}
    <h3>{% raw %}{{{% endraw %} helloWorld {% raw %}}}{% endraw %}</h3>
{% raw %}{%{% endraw %} endblock %
```
5. Add the controller provider to `YvesBootstrap::getControllerProviderStack()`. This ensures that the defined controller is correctly routed by Silex.
6. Now we can test the results. Open `/hello-world` URL in your browser, you should see “Hello World!” in the page’s header section.
7. Optionally, run `vendor/bin/console dev:ide:generate-auto-completion` to also get IDE type hinting for the new module .

We value people who contribute to improvement of our documentation:

Thank you to: [Petar Atanasov](https://github.com/PetarAtanasov) for taking the time to provide us with your feedback (December 2017).

{% info_block warningBox %}
You too can be credited in our documentation by stating that you wish to be mentioned when you send us feedback. Click **Edit on Github** (top right
{% endinfo_block %} to send feedback for this page.)

<!-- See also:

[Best Practices - Twig Templates](https://documentation.spryker.com/front-end_developer_guide/legacy_demoshop/twig_templates/twig-best-practices.htm) -->
