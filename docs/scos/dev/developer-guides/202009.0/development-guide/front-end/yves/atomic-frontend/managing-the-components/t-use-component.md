---
title: Using a Component
originalLink: https://documentation.spryker.com/v6/docs/t-use-component
redirect_from:
  - /v6/docs/t-use-component
  - /v6/docs/en/t-use-component
---

To use a component, in Spryker Shop, you need to add it to a layout template (Twig file). Components can be added to other components (except atoms), views, page templates and widgets. There are two possible strategies for this purpose: **include** and **embed**. In the following document, we shall review both of them.

## Helper Functions
Before adding a component, you need to locate it. There are 3 helper functions provided for this purpose. They are implemented the same way. Use the one that matches the component you want to add.

* atom (name, module)
* molecule (name, module)
* organism (name, module)

The functions are implemented similarly and have the same arguments:

* **name** (required) - specifies the component name,
* **module** (optional) - specifies the name of the Spryker module where the component is implemented. Use this argument if you have two or more components with the same name and at the same level in different modules. If you do not pass this argument, _ShopUi_ is used by default.

The function returns the fully qualified component name that can be used in Twig, for example:

`molecule('new-component-counter')` returns
`@ShopUi/components/molecules/new-component-counter/new-component-counter.twig`

`organism('some-name', 'CartPage')` returns
`@CartPage/components/organisms/some-name/some-name.twig`

## Arguments
_Include_ or _Embed_ needs to be called with 2 arguments:

* `with {}` - defines the context to pass to the component;
* `only` - **Important**: This mandatory attribute closes the context so that everything you pass via with {} is passed to the included object **only**.

The `with{}` attribute must pass the objects and variables that are defined in the component. They need to follow the contracts defined by the component itself. The most important of them is the **data** object that defines the data contract.

{% info_block errorBox %}
It is important to always pass **required** properties, otherwise, the component you are including will fail.
{% endinfo_block %}

The most common attributes to include are:

* `data` (required) - specifies the data passed to the component;
* `attributes` (optional) - specifies the attributes to be passed;
* `class` (optional) - used to inject custom class names into the component tag,
* `modifiers` (optional) - used to enable component modifiers.

{% info_block infoBox %}
For more details, see section _Twig_ in [Atomic Frontend](https://documentation.spryker.com/v4/docs/atomic-frontend#twig
{% endinfo_block %}.)

## Include
By including a component, you place it on a page as is. Each component has the `data`, `attributes` and other properties that allows passing the necessary information to configure it, but apart from that, you cannot change it. The outlook of the component depends only on configuration. By including an element, you also pass the context of the page where it is added.
The following block demonstrates how to include component `new-component-counter`.

```php
{% raw %}{%{% endraw %} include molecule('new-component-counter') with {
    class: 'custom-classname',
    modifiers: ['big'],
    data: {
        name: 'Counting a tags...',
        description: 'How many links are there on this page?'
    },
    attributes: {
        'element-selector': 'a'
    }
} only {% raw %}%}{% endraw %}
```

{% info_block infoBox %}
See component implementation in [How To Create a Component](/docs/scos/dev/developer-guides/202001.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-create-compon
{% endinfo_block %}.)

Now, let us have a look at the embedded element on the page:

![Embedded element](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/embedded-element.png){height="" width=""}

## Embed
Embedding gives you more freedom with components. It allows you to modify the template of the component you include and even add additional elements to it. For example, you can add or remove blocks, arrange them differently etc. Unlike including, context is not passed via the embed statement, so you need to define the required contracts explicitly.

The following example shows how to embed  block to component `new-component-counter`. For this purpose, we need to do the following:

1. Add a new object called embed to the list of data that we pass. The object has one property, `message`, with the value of the actual message that will be displayed.
2. Change the template of the source component. To change the outlook of the component, we change its Twig template. In the below example, we remove everything from block `counter` and add our new message instead.

The resulting Twig will look as follows:

```php
{% raw %}{%{% endraw %} embed molecule('new-component-counter') with {
    class: 'custom-classname',
    modifiers: ['big'],
    data: {
        name: 'Counting a tags...',
        description: 'How many links are there on this page?'
    },
    attributes: {
        'element-selector': 'a'
    },
    embed: {
        message: 'Woohoo!'
    }
} only {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
        {% raw %}{{{% endraw %}parent(){% raw %}}}{% endraw %}
        {% raw %}{{{% endraw %}embed.message{% raw %}}}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
    {% raw %}{%{% endraw %} block counter {% raw %}%}{% endraw %}
        <strong class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__counter {% raw %}{{{% endraw %}config.jsName{% raw %}}}{% endraw %}__counter"></strong>
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
```

{% info_block infoBox %}
You can find the original Twig of the component in the _Create Component Template_ section of [HowTo - Create a Component](/docs/scos/dev/developer-guides/202001.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-create-compon
{% endinfo_block %}.)

Now, let us check how it looks like on the page.

![Updated embedded element](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/updated-embedded-element.png){height="" width=""}
