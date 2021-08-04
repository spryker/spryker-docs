---
title: Standard Filters Backend and Frontend Technical Details
originalLink: https://documentation.spryker.com/2021080/docs/standard-filters-backend-and-frontend-technical-details
redirect_from:
  - /2021080/docs/standard-filters-backend-and-frontend-technical-details
  - /2021080/docs/en/standard-filters-backend-and-frontend-technical-details
---

## Backend Technical Details
The backend part of Standard Filters feature is located in the following modules:

1. ProductCategoryFilter (`spryker/product-category-filter`),
2. ProductCategoryFilterGui (`spryker/product-category-filter-gui`),
3. ProductCategoryFilterStorage (`spryker/product-category-filter-storage`).

Category Filters management is described in the [Back Office guide](https://documentation.spryker.com/docs/managing-category-filters).

## Frontend Technical Details
CatalogPage module (`spryker-shop/catalog-page`) provides all applicable product filters and a basic set of templates, used by all pages.

The core of each page is `page-layout-catalog.twig`, which extends another global template - `page-layout-main.twig`.

The general look of the `page-layout-catalog.twig` template is shown below:

<details open>
<summary>src/Pyz/Yves/CatalogPage/Theme/default/templates/page-layout-catalog/page-layout-catalog.twig</summary>

```twig
{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define config = {
    name: 'filter-section',
    tag: 'section',
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
    facets: [],
    filterPath: null,
    categories: [],
    isEmptyCategoryFilterValueVisible: null,
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} set isContentPresent = data.facets | length > 0 {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block class {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %}  parent() {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if isContentPresent {% raw %}%}{% endraw %}
        <h3 class="{% raw %}{{{% endraw %} config.name ~ '__title' {% raw %}}}{% endraw %} is-hidden-lg-xxl">{% raw %}{{{% endraw %} 'catalog.filter.and.sorting.button' | trans {% raw %}}}{% endraw %}</h3>
        <button class="{% raw %}{{{% endraw %} config.name ~ '__close' {% raw %}}}{% endraw %} is-hidden-lg-xxl js-catalog-filters-trigger">
            {% raw %}{%{% endraw %} include atom('icon') with {
                data: {
                    name: 'cross',
                },
            } only {% raw %}%}{% endraw %}
        </button>
 
        <div class="{% raw %}{{{% endraw %} config.name ~ '__sorting ' ~ config.jsName ~ '__sorting' {% raw %}}}{% endraw %} is-hidden-lg-xxl"></div>
        <div class="{% raw %}{{{% endraw %} config.name ~ '__holder' {% raw %}}}{% endraw %}">
            {% raw %}{%{% endraw %} for filter in data.facets {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set filterHasValues = filter.values is not defined or filter.values | length > 0 {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set togglerClass = '' {% raw %}%}{% endraw %}
 
                {% raw %}{%{% endraw %} if filterHasValues {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} block filters {% raw %}%}{% endraw %}
 
                        {% raw %}{%{% endraw %} if filter.config.type == 'price-range' and can('SeePricePermissionPlugin') is empty {% raw %}%}{% endraw %}
 
                        {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                            <div class="{% raw %}{{{% endraw %} config.name ~ '__item' {% raw %}}}{% endraw %} {% raw %}{%{% endraw %} if filter.name == 'category' {% raw %}%}{% endraw %}{% raw %}{{{% endraw %} config.name ~ '__item--hollow' {% raw %}}}{% endraw %}{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}">
                                <h6 class="{% raw %}{{{% endraw %} config.name ~ '__item-title toggler-accordion__item ' ~ config.jsName ~ '__trigger' ~ '-' ~ filter.name{% raw %}}}{% endraw %} {% raw %}{%{% endraw %} if filter.name == 'category' {% raw %}%}{% endraw %}{% raw %}{{{% endraw %} 'is-hidden-lg-xxl' {% raw %}}}{% endraw %}{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}">
                                    {% raw %}{{{% endraw %} ('product.filter.' ~ filter.name | lower) | trans {% raw %}}}{% endraw %}
                                    {% raw %}{%{% endraw %} include atom('icon') with {
                                        class: 'toggler-accordion__icon',
                                        modifiers: ['small'],
                                        data: {
                                            name: 'caret-down',
                                        },
                                    } only {% raw %}%}{% endraw %}
                                </h6>
                                {% raw %}{%{% endraw %} set contentModifier = filter.name == 'category' ? config.name ~ '__item-content--hollow' : '' {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} set hiddenClassToToggleSections = filter.name == 'category' ? 'is-hidden-sm-md' : 'is-hidden' {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} set toglerClass = config.name ~ '__item-content ' ~ config.jsName ~ '__' ~ filter.name ~ ' ' ~ hiddenClassToToggleSections ~ ' ' ~ contentModifier {% raw %}%}{% endraw %}
 
                                {% raw %}{%{% endraw %} include [
                                    molecule('filter-' ~ filter.config.name, 'CatalogPage'),
                                    molecule('filter-' ~ filter.config.type, 'CatalogPage'),
                                    ] ignore missing with {
                                    data: {
                                        filterPath: data.filterPath,
                                        categories: data.categories,
                                        filter: filter,
                                        parameter: filter.config.parameterName | default(''),
                                        min: filter.min | default(0),
                                        max: filter.max | default(0),
                                        activeMin: filter.activeMin | default(0),
                                        activeMax: filter.activeMax | default(0),
                                        isEmptyCategoryFilterValueVisible: data.isEmptyCategoryFilterValueVisible,
                                    },
                                    class: toglerClass,
                                } only {% raw %}%}{% endraw %}
 
                                {% raw %}{%{% endraw %} include molecule('toggler-click') with {
                                    attributes: {
                                        'trigger-selector': '.' ~ config.jsName ~ '__trigger-' ~ filter.name,
                                        'target-selector': '.' ~ config.jsName ~ '__' ~ filter.name,
                                        'class-to-toggle': hiddenClassToToggleSections,
                                        'trigger-class-to-toggle': 'active',
                                    },
                                } only {% raw %}%}{% endraw %}
                            </div>
                        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        </div>
 
        <button type="submit" class="button button--expand button--big {% raw %}{{{% endraw %} config.name ~ '__button' {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} 'catalog.filter.button' | trans {% raw %}}}{% endraw %}</button>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
<br>
</details>
```twig
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
    products: required,
    facets: required,
    category: null,
    categories: [],
    categoryId: null,
    filterPath: null,
    viewMode: null,
 
    pagination: {
        currentPage: required,
        maxPage: required,
        parameters: app.request.query.all(),
        paginationPath: app.request.getPathInfo(),
        showAlwaysFirstAndLast: true
    }
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} macro renderBreadcrumbSteps(categoryNode, isLastLeaf, filterPath) {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} import _self as self {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} set categoryUrl = categoryNode.url | default {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} set categoryUrl = filterPath is not empty ? url(filterPath, {categoryPath: categoryUrl}) : categoryUrl {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} set categoryLabel = categoryNode.name | default {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} set categoryParentNodes = categoryNode.parents | default {% raw %}%}{% endraw %}
 
    {% raw %}{%{% endraw %} if categoryParentNodes is not empty {% raw %}%}{% endraw %}
        {% raw %}{{{% endraw %} self.renderBreadcrumbSteps(categoryParentNodes | first, false, filterPath) {% raw %}}}{% endraw %}
 
        {% raw %}{%{% endraw %} if not isLastLeaf {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} include molecule('breadcrumb-step') with {
                data: {
                    url: categoryUrl,
                    label: categoryLabel
                }
            } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endmacro {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block breadcrumbs {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} import _self as self {% raw %}%}{% endraw %}
 
    {% raw %}{%{% endraw %} embed molecule('breadcrumb') with {
        embed: {
            breadcrumbs: self.renderBreadcrumbSteps(data.category, false, data.filterPath)
        }
    } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block breadcrumbs {% raw %}%}{% endraw %}
            {% raw %}{{{% endraw %} embed.breadcrumbs {% raw %}}}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block contentClass {% raw %}%}{% endraw %}page-layout-main page-layout-main--catalog-page{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    <form method="GET" class="grid grid--gap js-form-input-default-value-disabler__catalog-form page-layout-main--catalog-page-content">
        {% raw %}{%{% endraw %} block form {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} include molecule('form-input-default-value-disabler') with {
                attributes: {
                    'form-selector': '.js-form-input-default-value-disabler__catalog-form',
                    'input-selector': '.js-form-input-default-value-disabler__catalog-input'
                }
            } only {% raw %}%}{% endraw %}
 
            <div class="col col--sm-12 col--lg-4 col--xl-3">
                {% raw %}{%{% endraw %} block filterBar {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} include molecule('view-mode-switch', 'CatalogPage') with {
                        class: 'is-hidden-sm-md',
                        data: {
                            viewMode: data.viewMode
                        }
                    } only {% raw %}%}{% endraw %}
 
                    <button class="button button--justify button--additional js-catalog-filters-trigger is-hidden-lg-xxl spacing-bottom spacing-bottom--big">
                        {% raw %}{{{% endraw %} 'catalog.filter.and.sorting.button' | trans {% raw %}}}{% endraw %}
                        {% raw %}{%{% endraw %} include atom('icon') with {
                            modifiers: ['filter'],
                            data: {
                                name: 'filter'
                            }
                        } only {% raw %}%}{% endraw %}
                    </button>
 
                    {% raw %}{%{% endraw %} include molecule('toggler-click') with {
                        attributes: {
                            'trigger-selector': '.js-catalog-filters-trigger',
                            'target-selector': '.js-filter-section',
                            'class-to-toggle': 'is-hidden-sm-md',
                            'fix-body': 'true',
                            'class-to-fix-body': 'is-locked-mobile'
                        }
                    } only {% raw %}%}{% endraw %}
 
                    {% raw %}{%{% endraw %} include organism('filter-section', 'CatalogPage') with {
                        class: 'is-hidden-sm-md',
                        data: {
                            facets: data.facets,
                            filterPath: data.filterPath,
                            categories: data.categories
                        }
                    } only {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
            </div>
 
            <div class="col col--sm-12 col--lg-8 col--xl-9">
                <div class="grid grid--column-mob-reverse">
                    <div class="col col--sm-12">
                        <div class="grid grid--justify grid--nowrap">
                            <div class="col col--lg-12">
                                {% raw %}{%{% endraw %} include molecule('sort', 'CatalogPage') only {% raw %}%}{% endraw %}
                            </div>
                            <div class="col">
                                {% raw %}{%{% endraw %} include molecule('view-mode-switch', 'CatalogPage') with {
                                    class: 'is-hidden-lg-xxl',
                                    data: {
                                        viewMode: data.viewMode
                                    }
                                } only {% raw %}%}{% endraw %}
                            </div>
                        </div>
                    </div>
                    <div class="col col--sm-12">
                        {% raw %}{%{% endraw %} include organism('active-filter-section', 'CatalogPage') with {
                            data: {
                                facets: data.facets
                            }
                        } only {% raw %}%}{% endraw %}
                    </div>
                </div>
 
                <div class="grid grid--stretch grid--gap">
                    {% raw %}{%{% endraw %} for product in data.products {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} widget 'CatalogPageProductWidget' args [
                            product,
                            data.viewMode
                        ] only {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                </div>
 
                {% raw %}{%{% endraw %} include molecule('pagination') with {
                    data: data.pagination
                } only {% raw %}%}{% endraw %}
            </div>
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    </form>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
<br>
</details>

Standard product filters are represented in the form of filter-section organism (`filter-section.twig` in particular) inclusion.

Related code is located in the `filterBar` section, as shown below (extra code removed):

src/Pyz/Yves/CatalogPage/Theme/default/templates/page-layout-catalog/page-layout-catalog.twig

```twig
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    <form method="GET" class="grid grid--gap js-form-input-default-value-disabler__catalog-form page-layout-main--catalog-page-content">
        {% raw %}{%{% endraw %} block form {% raw %}%}{% endraw %}
            <div class="col col--sm-12 col--lg-4 col--xl-3">
                {% raw %}{%{% endraw %} block filterBar {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} include organism('filter-section', 'CatalogPage') with {
                        class: 'is-hidden-sm-md',
                        data: {
                            facets: data.facets,
                            filterPath: data.filterPath,
                            categories: data.categories
                        }
                    } only {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
            </div>
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    </form>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

When you look closer to the `filter-section.twig` template, you may notice, that this template is responsible for rendering both Filters and Categories (another feature):

<details open>
<summary>src/Pyz/Yves/CatalogPage/Theme/default/components/organisms/filter-section/filter-section.twig</summary>

```twig
{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define config = {
    name: 'filter-section',
    tag: 'section',
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
    facets: [],
    filterPath: null,
    categories: [],
    isEmptyCategoryFilterValueVisible: null,
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} set isContentPresent = data.facets | length > 0 {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block class {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %}  parent() {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if isContentPresent {% raw %}%}{% endraw %}
        <h3 class="{% raw %}{{{% endraw %} config.name ~ '__title' {% raw %}}}{% endraw %} is-hidden-lg-xxl">{% raw %}{{{% endraw %} 'catalog.filter.and.sorting.button' | trans {% raw %}}}{% endraw %}</h3>
        <button class="{% raw %}{{{% endraw %} config.name ~ '__close' {% raw %}}}{% endraw %} is-hidden-lg-xxl js-catalog-filters-trigger">
            {% raw %}{%{% endraw %} include atom('icon') with {
                data: {
                    name: 'cross',
                },
            } only {% raw %}%}{% endraw %}
        </button>
 
        <div class="{% raw %}{{{% endraw %} config.name ~ '__sorting ' ~ config.jsName ~ '__sorting' {% raw %}}}{% endraw %} is-hidden-lg-xxl"></div>
        <div class="{% raw %}{{{% endraw %} config.name ~ '__holder' {% raw %}}}{% endraw %}">
            {% raw %}{%{% endraw %} for filter in data.facets {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set filterHasValues = filter.values is not defined or filter.values | length > 0 {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set togglerClass = '' {% raw %}%}{% endraw %}
 
                {% raw %}{%{% endraw %} if filterHasValues {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} block filters {% raw %}%}{% endraw %}
 
                        {% raw %}{%{% endraw %} if filter.config.type == 'price-range' and can('SeePricePermissionPlugin') is empty {% raw %}%}{% endraw %}
 
                        {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                            <div class="{% raw %}{{{% endraw %} config.name ~ '__item' {% raw %}}}{% endraw %} {% raw %}{%{% endraw %} if filter.name == 'category' {% raw %}%}{% endraw %}{% raw %}{{{% endraw %} config.name ~ '__item--hollow' {% raw %}}}{% endraw %}{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}">
                                <h6 class="{% raw %}{{{% endraw %} config.name ~ '__item-title toggler-accordion__item ' ~ config.jsName ~ '__trigger' ~ '-' ~ filter.name{% raw %}}}{% endraw %} {% raw %}{%{% endraw %} if filter.name == 'category' {% raw %}%}{% endraw %}{% raw %}{{{% endraw %} 'is-hidden-lg-xxl' {% raw %}}}{% endraw %}{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}">
                                    {% raw %}{{{% endraw %} ('product.filter.' ~ filter.name | lower) | trans {% raw %}}}{% endraw %}
                                    {% raw %}{%{% endraw %} include atom('icon') with {
                                        class: 'toggler-accordion__icon',
                                        modifiers: ['small'],
                                        data: {
                                            name: 'caret-down',
                                        },
                                    } only {% raw %}%}{% endraw %}
                                </h6>
                                {% raw %}{%{% endraw %} set contentModifier = filter.name == 'category' ? config.name ~ '__item-content--hollow' : '' {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} set hiddenClassToToggleSections = filter.name == 'category' ? 'is-hidden-sm-md' : 'is-hidden' {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} set toglerClass = config.name ~ '__item-content ' ~ config.jsName ~ '__' ~ filter.name ~ ' ' ~ hiddenClassToToggleSections ~ ' ' ~ contentModifier {% raw %}%}{% endraw %}
 
                                {% raw %}{%{% endraw %} include [
                                    molecule('filter-' ~ filter.config.name, 'CatalogPage'),
                                    molecule('filter-' ~ filter.config.type, 'CatalogPage'),
                                    ] ignore missing with {
                                    data: {
                                        filterPath: data.filterPath,
                                        categories: data.categories,
                                        filter: filter,
                                        parameter: filter.config.parameterName | default(''),
                                        min: filter.min | default(0),
                                        max: filter.max | default(0),
                                        activeMin: filter.activeMin | default(0),
                                        activeMax: filter.activeMax | default(0),
                                        isEmptyCategoryFilterValueVisible: data.isEmptyCategoryFilterValueVisible,
                                    },
                                    class: toglerClass,
                                } only {% raw %}%}{% endraw %}
 
                                {% raw %}{%{% endraw %} include molecule('toggler-click') with {
                                    attributes: {
                                        'trigger-selector': '.' ~ config.jsName ~ '__trigger-' ~ filter.name,
                                        'target-selector': '.' ~ config.jsName ~ '__' ~ filter.name,
                                        'class-to-toggle': hiddenClassToToggleSections,
                                        'trigger-class-to-toggle': 'active',
                                    },
                                } only {% raw %}%}{% endraw %}
                            </div>
                        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        </div>
 
        <button type="submit" class="button button--expand button--big {% raw %}{{{% endraw %} config.name ~ '__button' {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} 'catalog.filter.button' | trans {% raw %}}}{% endraw %}</button>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
<br>
</details>

As you may see from the code snippet below, this part is responsible for rendering a single filter (extra code removed):

src/Pyz/Yves/CatalogPage/Theme/default/components/organisms/filter-section/filter-section.twig

```twig
{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if isContentPresent {% raw %}%}{% endraw %}
        <div class="{% raw %}{{{% endraw %} config.name ~ '__holder' {% raw %}}}{% endraw %}">
            {% raw %}{%{% endraw %} for filter in data.facets {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} if filterHasValues {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} block filters {% raw %}%}{% endraw %}
 
                        {% raw %}{%{% endraw %} if filter.config.type == 'price-range' and can('SeePricePermissionPlugin') is empty {% raw %}%}{% endraw %}
 
                        {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                            <div class="{% raw %}{{{% endraw %} config.name ~ '__item' {% raw %}}}{% endraw %} {% raw %}{%{% endraw %} if filter.name == 'category' {% raw %}%}{% endraw %}{% raw %}{{{% endraw %} config.name ~ '__item--hollow' {% raw %}}}{% endraw %}{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}">
                                {% raw %}{%{% endraw %} include [
                                    molecule('filter-' ~ filter.config.name, 'CatalogPage'),
                                    molecule('filter-' ~ filter.config.type, 'CatalogPage'),
                                    ] ignore missing with {
                                    data: {
                                        filterPath: data.filterPath,
                                        categories: data.categories,
                                        filter: filter,
                                        parameter: filter.config.parameterName | default(''),
                                        min: filter.min | default(0),
                                        max: filter.max | default(0),
                                        activeMin: filter.activeMin | default(0),
                                        activeMax: filter.activeMax | default(0),
                                        isEmptyCategoryFilterValueVisible: data.isEmptyCategoryFilterValueVisible,
                                    },
                                    class: toglerClass,
                                } only {% raw %}%}{% endraw %}
                            </div>
                        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        </div>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

Thus, each filter is being rendered by another molecule according to its name and type.

You can see the list of all available filters by going into `vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules` directory.
