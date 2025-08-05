This document describes how to install the [ProductManagementAi](https://github.com/spryker-eco/product-management-ai) feature.

## Install feature core <!-- Skip if there won't be a frontend section in the doc -->

Follow the steps below to install the ImageSearchAi feature core.

### Prerequisites

### 1) Install the required modules
<!--Provide one or more console commands with the exact latest version numbers of all required modules. If the Composer command contains the modules that are not related to the current feature, move them to the [prerequisites](#prerequisites).-->

<!--When "composer require" includes a "Spryker Feature" (github.com/spryker-feature), then it always needs to be "dev-master" version. For regular modules, use regular versions.-->

```bash
composer require spryker-eco/product-management-ai:"^0.1.1" --update-with-dependencies
```

**Verification**

Make sure the following modules have been installed:

| MODULE              | EXPECTED DIRECTORY <!--for public Demo Shops--> |
|---------------------|-------------------------------------------------|
| OpenAi              | vendor/spryker-eco/open-ai                      |
| ProductManagementAi | vendor/spryker-eco/product-management-ai        |

---

### Set up database schema
<!--If the feature has transfer object definition changes, merge the steps as described in [Set up database schema and transfer objects](#set-up-database-schema-and-transfer-objects). Provide code snippets with DB schema changes, describing the changes before each code snippet. Provide the console commands to apply the changes in project and core. -->

Set up database schema as follows:

1. Adjust the schema definition so entity changes trigger events:

| AFFECTED ENTITY | TRIGGERED EVENTS |
|-----------------|------------------|
| SpyProductImage | *                |

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductImage\Persistence" package="src.Orm.Zed.ProductImage.Persistence">

    <table name="spy_product_image">
        <column name="alt_text" type="VARCHAR" size="255" required="false"/>
    </table>

</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

**Verification**
<!--Describe how a developer can check they have completed the step correctly.-->

<!--Each step needs verification to make sure that the customer did not skip anything unintentionally.
The verification needs to cover the entire "step".
The verification step often needs to use an example domain, use
 - "mysprykershop.com"
 - "zed.mysprykershop.com"
 - "glue.mysprykershop.com"
domains according to your requirements.-->

Make sure that following changes have been applied by checking your database:

| DATABASE ENTITY   | TYPE     | EVENT |
|-------------------|----------|-------|
| spy_product_image | alt_text | *     |

---

### Set up transfer objects
<!--Provide the following with a description before each item:
* Code snippets with DB schema changes.
* Code snippets with transfer schema changes.
* The console command to apply the changes in project and core. -->

Set up transfer objects as follows:

```bash
console transfer:generate
```

**Verification**

Make sure the following changes have been triggered in transfer objects:

| TRANSFER   | TYPE  | EVENT   | PATH                    |
| ---------- |-------|---------|-------------------------|
| AiTranslatorRequest | class | created | src/Generated/Transfer/AiTranslatorRequest |
| AiTranslatorResponse | class | created | src/Generated/Transfer/AiTranslatorResponse |
| ProductImage | class | updated | src/Generated/Transfer/ProductImage |
| ProductImageStorage | class | updated | src/Generated/Transfer/ProductImageStorage |
| Category | class | updated | src/Generated/Transfer/Category |
| CategoryCollection | class | updated | src/Generated/Transfer/CategoryCollection |
| ProductAbstract | class | updated | src/Generated/Transfer/ProductAbstract |
| Locale | class | updated | src/Generated/Transfer/Locale |

---

### Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN   | SPECIFICATION                                            | PREREQUISITES   | NAMESPACE |
| -------- |----------------------------------------------------------| --------------- | --------- |
| ProductCategoryProductAbstractPostCreatePlugin | Adds action on product abstract post create event.       | | SprykerEco\Yves\ImageSearchAi\Plugin\Router |
| ProductCategoryProductAbstractAfterUpdatePlugin | Adds action on product abstract after update event.      | | SprykerEco\Yves\ImageSearchAi\Plugin\Router |
| ProductCategoryAbstractFormExpanderPlugin | Expands `ProductAbstractForm`.                           | | SprykerEco\Yves\ImageSearchAi\Plugin\Router |
| ImageAltTextProductConcreteEditFormExpanderPlugin | Expands `ProductConcreteEditForm` with `alt_text` field. | | SprykerEco\Yves\ImageSearchAi\Plugin\Router |
| ImageAltTextProductAbstractFormExpanderPlugin | Expands `ProductAbstractForm` with `alt_text` field.     | | SprykerEco\Yves\ImageSearchAi\Plugin\Router |
| ImageAltTextProductConcreteFormExpanderPlugin | Expands `ProductConcreteForm` with `alt_text` field.     | | SprykerEco\Yves\ImageSearchAi\Plugin\Router |

**src/Pyz/Zed/Product/ProductDependencyProvider.php**
```php
    /**
     * The order of execution is important to support Inherited scope and sub-entity functionality
     *
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPostCreatePluginInterface>
     */
    protected function getProductAbstractPostCreatePlugins(): array
    {
        return [
            ...
            new ProductCategoryProductAbstractPostCreatePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginUpdateInterface>
     */
    protected function getProductAbstractAfterUpdatePlugins(Container $container): array
    {
        return [
            ...
            new ProductCategoryProductAbstractAfterUpdatePlugin(),
        ];
    }
```

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

```php
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteEditFormExpanderPluginInterface>
     */
    protected function getProductConcreteEditFormExpanderPlugins(): array
    {
        return [
            ...
            new ImageAltTextProductConcreteEditFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormExpanderPluginInterface>
     */
    protected function getProductAbstractFormExpanderPlugins(): array
    {
        return [
            ...
            new ProductCategoryAbstractFormExpanderPlugin(),
            new ImageAltTextProductAbstractFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormExpanderPluginInterface>
     */
    protected function getProductConcreteFormExpanderPlugins(): array
    {
        return [
            ...
            new ImageAltTextProductConcreteFormExpanderPlugin(),
        ];
    }
```

**src/Pyz/Zed/ProductManagement/Presentation/Add/index.twig**

```twig
{% raw %}
{% extends '@Spryker:ProductManagement/Add/index.twig' %}

{% block content %}
    {{ parent() }}

    {% include '@SprykerEco:ProductManagementAi/_partials/product-management-ai-modals.twig' %}
{% endblock %}
{% endraw %}
```

**src/Pyz/Zed/ProductManagement/Presentation/Edit/index.twig**

```twig
{% raw %}
{% extends '@Spryker:ProductManagement/Edit/index.twig' %}

{% block content %}
    {{ parent() }}

    {% include '@SprykerEco:ProductManagementAi/_partials/product-management-ai-modals.twig' %}
{% endblock %}
{% endraw %}
```

**src/Pyz/Zed/ProductManagement/Presentation/Product/_partials/general-tab.twig**

```twig
{% raw %}
{% extends '@Spryker:ProductManagement/Product/_partials/general-tab.twig' %}

{% block descriptionField %}
    {% embed '@Gui/Partials/localized-ibox.twig' with {'collapsed': (not loop.first), 'localeName': locale.localeName} %}
        {% block content %}
            {% for input in form[formKey] %}
                {% embed '@SprykerEco:ProductManagementAi/_partials/ai-translation-trigger.twig' %}
                    {% block input %}
                        <div class="form-group {% if input.vars.errors|length %}has-error{% endif %}">
                            {{ form_label(input) }}
                            {{ form_widget(input, {'attr': {'class': 'name-translation js-infomational-field'}}) }}
                            {{ form_errors(input) }}
                        </div>
                    {% endblock %}
                {% endembed %}
            {% endfor %}
        {% endblock %}
    {% endembed %}
{% endblock %}

{% block description %}
{{ parent() }}

    {% include '@SprykerEco:ProductManagementAi/_partials/category-modal-trigger.twig' %}
{% endblock %}
{% endraw %}
```

To apply the changes, run the following command:

```bash
console frontend:build:backoffice
```

**Verification**

Login to backoffice, go to product abstract create/update page and make sure that fields `name`, `description` and `categories` have new icon to open an AI Assistant popup. Also, make sure that on tab Images a new field `Alt Text` is displayed.
