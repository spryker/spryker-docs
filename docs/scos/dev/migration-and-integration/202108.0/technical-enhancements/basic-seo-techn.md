---
title: Basic SEO techniques integration guide
originalLink: https://documentation.spryker.com/2021080/docs/basic-seo-techniques-integration-guide
redirect_from:
  - /2021080/docs/basic-seo-techniques-integration-guide
  - /2021080/docs/en/basic-seo-techniques-integration-guide
---

To improve the visibility of your Spryker-based shop for the search engines, you should optimize your project for them. The very first step towards the SEO of your project pages' content is the proper usage of headings on the pages and microdata usage. For details, see [Basic SEO techniques to use in your project](https://documentation.spryker.com/docs/basic-seo-techniques-to-use-in-your-project).

To apply the basic SEO techniques such as improved headings structure and use of microdata in your project, follow the steps below.

## Prerequisites
To start the integration, overview and install the necessary features:
| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | 202009.0 | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |

## 1) Update the required SprykerShop modules using Composer
Run the following command to update the required modules:
```bash
COMPOSER_MEMORY_LIMIT=-1 composer update spryker-shop/money-widget spryker-shop/price-product-volume-widget spryker-shop/product-review-widget spryker-shop/shop-ui spryker-shop/catalog-page spryker-shop/configurable-bundle-page spryker-shop/multi-cart-widget spryker-shop/product-alternative-widget spryker-shop/product-detail-page spryker-shop/product-replacement-for-widget spryker-shop/product-search-widget spryker-shop/shopping-list-page spryker-shop/shopping-list-widget spryker-shop/wishlist-page --with-dependencies
```
{% info_block warningBox "Verification" %}


Ensure that the following modules have been updated:

| Module | Directory |
| --- | --- |
| CatalogPage | vendor/spryker-shop/catalog-page |
| ConfigurableBundlePage | vendor/spryker-shop/configurable-bundle-page |
| MoneyWidget  | vendor/spryker-shop/money-widget |
| MultiCartWidget  | vendor/spryker-shop/multi-cart-widget |
| PriceProductVolumeWidget  | vendor/spryker-shop/price-product-volume-widget |
| ProductAlternativeWidget  | vendor/spryker-shop/product-alternative-widget |
| ProductDetailPage  | vendor/spryker-shop/product-detail-page |
| ProductReplacementForWidget  | vendor/spryker-shop/product-replacement-for-widget |
| ProductReviewWidget  | vendor/spryker-shop/product-review-widget |
| ProductSearchWidget  | vendor/spryker-shop/product-search-widget |
| ShopUi  | vendor/spryker-shop/shop-ui |
| ShoppingListPage  | vendor/spryker-shop/shopping-list-page |
| ShoppingListWidget  | vendor/spryker-shop/shopping-list-widget |
| WishlistPage  | vendor/spryker-shop/wishlist-page |

{% endinfo_block %}

## 2) Adjust the twig layout of modules on the project level

After updating the modules, you need to adjust the layout of the overwritten modules on the project level `src/Pyz/Yves`. 

Depending on whether you use the B2C or the B2B Demo Shop, make the layout adjustments as described below.

### B2C Demoshop

For the B2C Demo Shop, adjust the layout of the modules as follows:

#### ConfigurableBundlePage
In `src/Pyz/Yves/ConfigurableBundlePage/Theme/default/components/molecules/selected-product-list/selected-product-list.twig:7`:
```
<h4 class="col spacing-right spacing-right--bigger">{% raw %}{{{% endraw %} data.configurableBundleTemplateStorage.slots[idSlot].name | trans {% raw %}}}{% endraw %}</h4>
```
change the `h4` heading to `h2` and add the `title title--h4 `CSS classes:

```
<h2 class="title title--h4 col spacing-right spacing-right--bigger">{% raw %}{{{% endraw %} data.configurableBundleTemplateStorage.slots[idSlot].name | trans {% raw %}}}{% endraw %}</h2>
```
#### CustomerPage
In  `src/Pyz/Yves/CustomerPage/Theme/default/components/molecules/title-box/title-box.twig:15`:
```
<h5 class="title title--uppercase title--h6 col">{% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}</h5>
```
change the `h5` heading to `h2`:
```
<h2 class="title title--uppercase title--h6 col">{% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}</h2>
```
#### PriceProductVolumeWidget
In `src/Pyz/Yves/PriceProductVolumeWidget/Theme/default/components/molecules/volume-price/volume-price.twig:15`:
```
<span class="{% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__price {% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__price">
  {% raw %}{{{% endraw %} data.amount | money {% raw %}}}{% endraw %}
</span>
```
Add the `meta` tag before the `span` tag and introduce the `itemprop` and `content microdata` directives to it:
```
<meta itemprop="priceCurrency" content="{% raw %}{{{% endraw %} currencyIsoCode() {% raw %}}}{% endraw %}">
<span itemprop="price" content="{% raw %}{{{% endraw %} data.amount | moneyRaw {% raw %}}}{% endraw %}" class="{% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__price {% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__price">
    {% raw %}{{{% endraw %} data.amount | money {% raw %}}}{% endraw %}
</span>
```
#### ProductDetailPage
1. In `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig:41`:
```
<h1 class="title title--product title--h2">{% raw %}{{{% endraw %} productName {% raw %}}}{% endraw %}</h1>
```
introduce the `itemprop` microdata directive to the `h1` heading and add the `link` tag after it:
```
<h1 itemprop="name" class="title title--product title--h2">{% raw %}{{{% endraw %} productName {% raw %}}}{% endraw %}</h1>
<link itemprop="url" href="{% raw %}{{{% endraw %} data.product.url {% raw %}}}{% endraw %}">
```
2. In `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-detail/product-detail.twig:34`:
```
{% raw %}{%{% endraw %} block contentText {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if embed.description is not empty {% raw %}%}{% endraw %}
        {% raw %}{{{% endraw %} embed.description {% raw %}}}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    <div class="spacing-top spacing-top--bigger">{% raw %}{{{% endraw %} 'product.attribute.sku' | trans {% raw %}}}{% endraw %}: {% raw %}{{{% endraw %} embed.sku {% raw %}}}{% endraw %}</div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
wrap the `{% raw %}{{{% endraw %} embed.description {% raw %}}}{% endraw %}` and `{% raw %}{{{% endraw %} embed.sku {% raw %}}}{% endraw %}` content  to the `span` tags with the `itemprop` microdata directives: 

```
{% raw %}{%{% endraw %} block contentText {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if embed.description is not empty {% raw %}%}{% endraw %}
        <span itemprop="description">{% raw %}{{{% endraw %} embed.description {% raw %}}}{% endraw %}</span>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    <div class="spacing-top spacing-top--bigger">{% raw %}{{{% endraw %} 'product.attribute.sku' | trans {% raw %}}}{% endraw %}: <span itemprop="sku">{% raw %}{{{% endraw %} embed.sku {% raw %}}}{% endraw %}</span></div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

#### ProductReviewWidget

1. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review-average-display/review-average-display.twig:12`, introduce the new optional attributes `itemscope`, `itemtype`, and `itemprop`:

```
{% raw %}{%{% endraw %} define attributes = {
    itemscope: '',
    itemtype: 'http://schema.org/AggregateRating',
    itemprop: 'aggregateRating',
} {% raw %}%}{% endraw %}
```
2. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review-average-display/review-average-display.twig:21`, add the `span` tag with `itemscope`, `itemprop`, and `itemtype` microdata directives. Introduce the `meta` tags inside the `span` tag:

```
<span itemscope itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating">
    <meta itemprop="ratingValue" content="{% raw %}{{{% endraw %} data.summary.averageRating {% raw %}}}{% endraw %}">
    <meta itemprop="bestRating" content="{% raw %}{{{% endraw %} data.summary.maximumRating {% raw %}}}{% endraw %}">
    <meta itemprop="reviewCount" content="{% raw %}{{{% endraw %} data.summary.totalReview {% raw %}}}{% endraw %}">
</span>
```
3. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review/review.twig:17`, introduce the new optional attributes `itemscope`, `itemtype`, and `itemprop`:
```
{% raw %}{%{% endraw %} define attributes = {
    itemscope: '',
    itemtype: 'https://schema.org/Review',
    itemprop: 'review',
} {% raw %}%}{% endraw %}
```
4. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review/review.twig:25`:
```
<div class="title title--pdp-review title--medium">{% raw %}{{{% endraw %} data.summary | e('html') {% raw %}}}{% endraw %}</div>
```
add the `itemprop` microdata directive to the `div` tag:
```
<div itemprop="name" class="title title--pdp-review title--medium">{% raw %}{{{% endraw %} data.summary | e('html') {% raw %}}}{% endraw %}</div>
```
5. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review/review.twig:40`:
```
{% raw %}{{{% endraw %} 'page.product.by' | trans {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} data.nickname | e('html'){% raw %}}}{% endraw %} - {% raw %}{{{% endraw %} data.createdAt {% raw %}}}{% endraw %}
```
wrap the `{% raw %}{{{% endraw %} data.nickname | e('html'){% raw %}}}{% endraw %}` and `{% raw %}{{{% endraw %} data.createdAt {% raw %}}}{% endraw %}` content to the `span` tags with the `itemprop` microdata directives: 

```
{% raw %}{{{% endraw %} 'page.product.by' | trans {% raw %}}}{% endraw %} <span itemprop="author">{% raw %}{{{% endraw %} data.nickname | e('html'){% raw %}}}{% endraw %}</span> - <span itemprop="datePublished">{% raw %}{{{% endraw %} data.createdAt {% raw %}}}{% endraw %}</span>
```
6. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review/review.twig:43`:
```
<div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__description">
    {% raw %}{{{% endraw %} data.description | e('html'){% raw %}}}{% endraw %}
</div>
```
introduce the `itemprop` microdata directive to the `div` tag:
```
<div itemprop="reviewBody" class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__description">
    {% raw %}{{{% endraw %} data.description | e('html'){% raw %}}}{% endraw %}
</div>
```
7. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/organisms/review-summary/review-summary.twig:51`:
```
<h3 class="title title--review-summary title--regular">{% raw %}{{{% endraw %} 'product_review.product_reviews' | trans {% raw %}}}{% endraw %}</h3>
```
change the `h3` heading to `h2` and add the `title--h3` CSS class:

```
<h2 class="title title--h3 title--review-summary title--regular">{% raw %}{{{% endraw %} 'product_review.product_reviews' | trans {% raw %}}}{% endraw %}</h2>
```
8. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/views/product-review-display/product-review-display.twig:9`, add the `span` tag with `itemscope`, `itemprop`, and `itemtype` microdata directives. Introduce the `meta` tags inside the `span` tag:

```
<span itemscope itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating">
    <meta itemprop="ratingValue" content="{% raw %}{{{% endraw %} data.value {% raw %}}}{% endraw %}">
    <meta itemprop="bestRating" content="{% raw %}{{{% endraw %} data.maxValue {% raw %}}}{% endraw %}">
</span>
```
#### ShopUi

1. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/jumbotron/jumbotron.twig:23`:
```
<h4 class="{% raw %}{{{% endraw %} component.renderClass(config.name ~ '__sub-headline', modifiers) {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} data.subHeadline {% raw %}}}{% endraw %}</h4>
```
change the `h4` heading to `h2` and add the `title--h4` CSS class:
```
<h2 class="{% raw %}{{{% endraw %} component.renderClass(config.name ~ '__sub-headline', modifiers) {% raw %}}}{% endraw %} title title--h4">{% raw %}{{{% endraw %} data.subHeadline {% raw %}}}{% endraw %}</h2>
```
2. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/money-price/money-price.twig:6`:
```
<span class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__amount {% raw %}{{{% endraw %} defaultPriceJsName {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %}- data.amount | money(true, data.currencyIsoCode) -{% raw %}}}{% endraw %}
</span>
```
introduce the `itemprop` and `content` microdata directives to the `div` tag and add the `meta` tag inside, before the `{% raw %}{{{% endraw %}- data.amount | money(true, data.currencyIsoCode) -{% raw %}}}{% endraw %}` content:

```
<span itemprop="price" content="{% raw %}{{{% endraw %} data.amount | moneyRaw {% raw %}}}{% endraw %}" class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__amount {% raw %}{{{% endraw %} defaultPriceJsName {% raw %}}}{% endraw %}">
    <meta itemprop="priceCurrency" content="{% raw %}{{{% endraw %} currencyIsoCode() {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %}- data.amount | money(true, data.currencyIsoCode) -{% raw %}}}{% endraw %}
</span>
```
3. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.twig:83`:
```
<a class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__overlay {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__link-detail-page" href="{% raw %}{{{% endraw %} data.url {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
</a>
```
introduce the `itemprop` microdata directive to the `a` tag:

```
<a itemprop="url" class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__overlay {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__link-detail-page" href="{% raw %}{{{% endraw %} data.url {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
</a>
```
4. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-item/toggler-item.twig:28`:
```
<h4 class="{% raw %}{{{% endraw %} titleClasses {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} component.renderClass(config.name ~ '__title', modifiers) {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} data.triggerClass {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} titleActiveClass {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} titleReadOnlyClass {% raw %}}}{% endraw %}" {% raw %}{{{% endraw %} targetAttribute {% raw %}}}{% endraw %}>{% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}</h4>
```
change the `h4` heading to `h2`:
```
<h2 class="{% raw %}{{{% endraw %} titleClasses {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} component.renderClass(config.name ~ '__title', modifiers) {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} data.triggerClass {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} titleActiveClass {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} titleReadOnlyClass {% raw %}}}{% endraw %}" {% raw %}{{{% endraw %} targetAttribute {% raw %}}}{% endraw %}>{% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}</h2>
```
5. In `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig:93`:
```
<div class="container">
  ...
</div>
```
introduce the `itemscope` and `itemtype` microdata directives to the `div` tag:

```
<div itemscope itemtype="https://schema.org/Product" class="container">
  ...
</div>
```

#### WishlistPage
1. In `src/Pyz/Yves/WishlistPage/Theme/default/views/wishlist-detail/wishlist-detail.twig:33`:
```
<h6>{% raw %}{{{% endraw %} 'customer.account.wishlist.empty' | trans {% raw %}}}{% endraw %}</h6>
```
change the `h6` heading to the span tag and add the `title title--h6` CSS class:

```
<span class="title title--h6">{% raw %}{{{% endraw %} 'customer.account.wishlist.empty' | trans {% raw %}}}{% endraw %}</span>
```
2. In `src/Pyz/Yves/WishlistPage/Theme/default/views/wishlist-overview-update/wishlist-overview-update.twig:19`:

```
<h6>{% raw %}{{{% endraw %} 'customer.account.wishlist.overview.empty' | trans {% raw %}}}{% endraw %}</h6>
```
change the `h6` heading to the `span` tag and add the `title title--h6` CSS class:

```
<span class="title title--h6">{% raw %}{{{% endraw %} 'customer.account.wishlist.overview.empty' | trans {% raw %}}}{% endraw %}</span>
```
3. In `src/Pyz/Yves/WishlistPage/Theme/default/views/wishlist-overview/wishlist-overview.twig:27`:
```
<h6>{% raw %}{{{% endraw %} 'customer.account.wishlist.overview.empty' | trans {% raw %}}}{% endraw %}</h6>
```
change the `h6` heading to the span tag and add the `title title--h6` CSS class:

```
<span class="title title--h6">{% raw %}{{{% endraw %} 'customer.account.wishlist.overview.empty' | trans {% raw %}}}{% endraw %}</span>
```

#### Customer overview acceptance test adjustment

Finally, adjust the customer overview acceptance test: 

In `tests/PyzTest/Yves/Customer/Presentation/CustomerOverviewCest.php::39`:
```
$i->see(CustomerOverviewPage::BOX_HEADLINE_ORDERS, 'h5');
$i->see(CustomerOverviewPage::BOX_HEADLINE_PROFILE, 'h5');
$i->see(CustomerOverviewPage::BOX_HEADLINE_NEWSLETTER, 'h5');
```
сhange checking the `h5` heading to `h2`:
```
$i->see(CustomerOverviewPage::BOX_HEADLINE_ORDERS, 'h2');
$i->see(CustomerOverviewPage::BOX_HEADLINE_PROFILE, 'h2');
$i->see(CustomerOverviewPage::BOX_HEADLINE_NEWSLETTER, 'h2');\
```

### B2В Demoshop
For the B2В Demo Shop, adjust the layout of the modules as follows:

#### CatalogPage
In `src/Pyz/Yves/CatalogPage/Theme/default/components/organisms/filter-section/filter-section.twig:35`:

```
<h6 class="{% raw %}{{{% endraw %} config.name ~ '__item-title toggler-accordion__item ' ~ config.jsName ~ '__trigger' ~ '-' ~ filter.name {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} itemTitleClass {% raw %}}}{% endraw %}"
    data-toggle-target=".{% raw %}{{{% endraw %} config.jsName ~ '__' ~ filter.name {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} ('product.filter.' ~ filter.name | lower) | trans {% raw %}}}{% endraw %}
    {% raw %}{%{% endraw %} include atom('icon') with {
        class: 'toggler-accordion__icon',
        modifiers: ['small'],
        data: {
            name: 'caret-down',
        },
    } only {% raw %}%}{% endraw %}
</h6>
```
change the `h6` heading to `h2` and add the `title title--h6` CSS classes:

```
<h2 class="title title--h6 {% raw %}{{{% endraw %} config.name ~ '__item-title toggler-accordion__item ' ~ config.jsName ~ '__trigger' ~ '-' ~ filter.name {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} itemTitleClass {% raw %}}}{% endraw %}"
  data-toggle-target=".{% raw %}{{{% endraw %} config.jsName ~ '__' ~ filter.name {% raw %}}}{% endraw %}">
  {% raw %}{{{% endraw %} ('product.filter.' ~ filter.name | lower) | trans {% raw %}}}{% endraw %}
  {% raw %}{%{% endraw %} include atom('icon') with {
      class: 'toggler-accordion__icon',
      modifiers: ['small'],
      data: {
          name: 'caret-down',
      },
  } only {% raw %}%}{% endraw %}
</h2>
```
#### ConfigurableBundlePage
1. In `src/Pyz/Yves/ConfigurableBundlePage/Theme/default/components/molecules/configured-bundle-total/configured-bundle-total.twig:4`:
```
<h4 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title col col--sm-8 spacing spacing--reset">{% raw %}{{{% endraw %}- 'configurable_bundle_page.configurator.summary_page_total' | trans -{% raw %}}}{% endraw %}</h4>
```
change the `h4` heading to `h2` and add the `title title--h4` CSS classes:

```
<h2 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title title title--h4 col col--sm-8 spacing spacing--reset">{% raw %}{{{% endraw %}- 'configurable_bundle_page.configurator.summary_page_total' | trans -{% raw %}}}{% endraw %}</h2>
```
2. In `src/Pyz/Yves/ConfigurableBundlePage/Theme/default/components/molecules/selected-product-list/selected-product-list.twig:7`:
```
<h4 class="col">{% raw %}{{{% endraw %} data.configurableBundleTemplateStorage.slots[idSlot].name | trans {% raw %}}}{% endraw %}</h4>
```
change the `h4` heading to `h2` and add the `title title--h4` CSS classes:

```
<h2 class="title title--h4 col">{% raw %}{{{% endraw %} data.configurableBundleTemplateStorage.slots[idSlot].name | trans {% raw %}}}{% endraw %}</h2>
```
3. In `src/Pyz/Yves/ConfigurableBundlePage/Theme/default/views/slots/slots.twig:7`:
```
<h3 class="spacing-bottom spacing-bottom--big">{% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}</h3>
```
change the `h3` heading to `h1` and add the `title title--h3` CSS classes:
```
<h1 class="title title--h3 spacing-bottom spacing-bottom--big">{% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}</h1>
```
#### PriceProductVolumeWidget
In `src/Pyz/Yves/PriceProductVolumeWidget/Theme/default/components/molecules/volume-price/volume-price.twig:12`:

```
<span class="{% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__price {% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__price">
    {% raw %}{{{% endraw %} data.amount | money {% raw %}}}{% endraw %}
</span>
```
introduce the `itemprop` and `content` microdata directives to the `span` tag and add the `meta` tag inside the `span` tag:

```
<span itemprop="price" content="{% raw %}{{{% endraw %} data.amount | moneyRaw {% raw %}}}{% endraw %}" class="{% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__price {% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__price">
    <meta itemprop="priceCurrency" content="{% raw %}{{{% endraw %} currencyIsoCode() {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} data.amount | money {% raw %}}}{% endraw %}
</span>
```
#### ProductAlternativeWidget
1. In `src/Pyz/Yves/ProductAlternativeWidget/Theme/default/components/molecules/alternative-products-table/alternative-products-table.twig:17`:
```
<h3 class="spacing-bottom spacing-bottom--reset">{% raw %}{{{% endraw %} 'product_alternative_widget.alternative_for' | trans {% raw %}}}{% endraw %}</h3>
<h4 class="title title--sub">{% raw %}{{{% endraw %} data.item.name {% raw %}}}{% endraw %}</h4>
```
change the `h3` heading to `h2` and add the `title title--h3` CSS classes. Then change the `h4` heading to `h3` and add the `title title--h4 CSS` classes:

```
<h2 class="title title--h3 spacing-bottom spacing-bottom--reset">{% raw %}{{{% endraw %} 'product_alternative_widget.alternative_for' | trans {% raw %}}}{% endraw %}</h2>
<h3 class="title title--h4 title--sub">{% raw %}{{{% endraw %} data.item.name {% raw %}}}{% endraw %}</h3>
```
2. In `src/Pyz/Yves/ProductAlternativeWidget/Theme/default/components/molecules/product-alternative-slider/product-alternative-slider.twig:12`:

```
<h4 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title">
    {% raw %}{{{% endraw %} 'product_alternative_widget.product_alternative' | trans {% raw %}}}{% endraw %}
</h4>
```
change the `h4` heading to `h2` and add the `title title--h4` CSS classes:

```
<h2 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title title title--h4">
    {% raw %}{{{% endraw %} 'product_alternative_widget.product_alternative' | trans {% raw %}}}{% endraw %}
</h2>
```

#### ProductDetailPage
1. In `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig:43`:
```
<div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__brand-sku-wrapper">
    {% raw %}{%{% endraw %} if brand is not empty {% raw %}%}{% endraw %}
        <div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__brand-name">{% raw %}{{{% endraw %}brand{% raw %}}}{% endraw %}</div>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    <div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__sku">{% raw %}{{{% endraw %} 'product.attribute.sku' | trans {% raw %}}}{% endraw %}: {% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}</div>
</div>
```
introduce the `itemprop` microdata directive to `div` and wrap the `{% raw %}{{{% endraw %} sku {% raw %}}}{% endraw %}` content to the `span` tag with the `itemprop` microdata directive: 
```
<div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__brand-sku-wrapper">
    {% raw %}{%{% endraw %} if brand is not empty {% raw %}%}{% endraw %}
        <div itemprop="brand" class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__brand-name">{% raw %}{{{% endraw %} brand {% raw %}}}{% endraw %}</div>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    <div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__sku">{% raw %}{{{% endraw %} 'product.attribute.sku' | trans {% raw %}}}{% endraw %}: <span itemprop="sku">{% raw %}{{{% endraw %} sku {% raw %}}}{% endraw %}</span></div>
</div>
```
2. In `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig:80`:
```
<h4 class="product-bundle__name">{% raw %}{{{% endraw %} item.name {% raw %}}}{% endraw %}</h4>
```
change the `h4` heading to `h2` and add the `title title--h4` CSS classes:
```
<h2 class="product-bundle__name title title--h4">{% raw %}{{{% endraw %} item.name {% raw %}}}{% endraw %}</h2>
```
3. In `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-detail/product-detail.twig:19`:
```
<h4 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title title--mobile-toggler-section js-pdp-section__trigger" data-toggle-target='.js-pdp-section__target-description'>{% raw %}{{{% endraw %} 'product.attribute.long_description' | trans {% raw %}}}{% endraw %}</h4>
<div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__description js-pdp-section__target-description is-hidden-sm-md">
    {% raw %}{{{% endraw %} data.description | raw {% raw %}}}{% endraw %}
</div>
```
change the `h4` heading to `h2` and add the `title title--h4` CSS classes. Introduce the `itemprop` microdata directive to the following `div` tag:

```
<h2 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title title title--h4 title--mobile-toggler-section js-pdp-section__trigger" data-toggle-target='.js-pdp-section__target-description'>{% raw %}{{{% endraw %} 'product.attribute.long_description' | trans {% raw %}}}{% endraw %}</h2>
<div itemprop="description" class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__description js-pdp-section__target-description is-hidden-sm-md">
    {% raw %}{{{% endraw %} data.description | raw {% raw %}}}{% endraw %}
</div>
```
4. In `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-detail/product-detail.twig:26`:

```
<h4 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title title--mobile-toggler-section js-pdp-section__trigger" data-toggle-target='.js-pdp-section__target-details'>{% raw %}{{{% endraw %} 'page.product.details' | trans {% raw %}}}{% endraw %}</h4>
```
change the `h4` heading to `h2` and add the `title title--h4` CSS classes:

```
<h2 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title title title--h4 title--mobile-toggler-section js-pdp-section__trigger" data-toggle-target='.js-pdp-section__target-details'>{% raw %}{{{% endraw %} 'page.product.details' | trans {% raw %}}}{% endraw %}</h2>
```
5. In `src/Pyz/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig:20`:
```
<h3 itemprop="name" class="page-info__title">
    {% raw %}{%{% endraw %} widget 'ProductAbstractLabelWidget' args [data.product.idProductAbstract] only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} include molecule('label-group', 'ProductLabelWidget') with {
                modifiers: ['pdp'],
                data: {
                    labels: labels
                }
            } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} data.product.name {% raw %}}}{% endraw %}
</h3>
```
change the `h3` heading to `h1` and add the `title title--h3` CSS classes:

```
<h1 itemprop="name" class="page-info__title title title--h3">
    {% raw %}{%{% endraw %} widget 'ProductAbstractLabelWidget' args [data.product.idProductAbstract] only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} include molecule('label-group', 'ProductLabelWidget') with {
                modifiers: ['pdp'],
                data: {
                    labels: labels
                }
            } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} data.product.name {% raw %}}}{% endraw %}
</h1>
```

#### ProductReplacementForWidget
In `src/Pyz/Yves/ProductReplacementForWidget/Theme/default/views/product-replacement-for-list/product-replacement-for-list.twig:6`:
```
<h4 class="product-replacement__title">
    {% raw %}{{{% endraw %} 'replacement_for_widget.replacement_for' | trans {% raw %}}}{% endraw %}
</h4>
```
change the `h4` heading to `h2` and add the `title title--h4` CSS classes:

```
<h2 class="product-replacement__title title title--h4">
    {% raw %}{{{% endraw %} 'replacement_for_widget.replacement_for' | trans {% raw %}}}{% endraw %}
</h2>
```

#### ProductReviewWidget
1. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review-average-display/review-average-display.twig:18` add the `span` tag with the `itemscope`, `itemprop`, and `itemtype` microdata directives. Introduce the `meta` tags inside the `span` tag:
```
<span itemscope itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating">
    <meta itemprop="ratingValue" content="{% raw %}{{{% endraw %} data.summary.averageRating {% raw %}}}{% endraw %}">
    <meta itemprop="bestRating" content="{% raw %}{{{% endraw %} data.summary.maximumRating {% raw %}}}{% endraw %}">
    <meta itemprop="reviewCount" content="{% raw %}{{{% endraw %} data.summary.totalReview {% raw %}}}{% endraw %}">
</span>
```
2. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review/review.twig:5`:
```
{% raw %}{{{% endraw %} data.summary | e('html') {% raw %}}}{% endraw %}
```
wrap the `{% raw %}{{{% endraw %} data.summary | e('html') {% raw %}}}{% endraw %}` content to the `span` tags with the `itemprop` microdata directive: 

```
<span itemprop="name">{% raw %}{{{% endraw %} data.summary | e('html') {% raw %}}}{% endraw %}</span>
```
3. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/review/review.twig:19`:

```
<div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__author">
    {% raw %}{{{% endraw %} data.nickname | e('html'){% raw %}}}{% endraw %} -
    {% raw %}{{{% endraw %} data.createdAt {% raw %}}}{% endraw %}
</div>
<div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__description">
    {% raw %}{{{% endraw %} data.description | e('html'){% raw %}}}{% endraw %}
</div>
```
wrap the `{% raw %}{{{% endraw %} data.nickname | e('html'){% raw %}}}{% endraw %}`, `{% raw %}{{{% endraw %} data.createdAt {% raw %}}}{% endraw %}` content  to the `span` tags with the `itemprop` microdata directives. Add the `itemprop` microdata directive to the following `div` tag: 
```
<div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__author">
    <span itemprop="author">{% raw %}{{{% endraw %} data.nickname | e('html'){% raw %}}}{% endraw %}</span> -
    <span itemprop="datePublished">{% raw %}{{{% endraw %} data.createdAt {% raw %}}}{% endraw %}</span>
</div>
<div itemprop="reviewBody" class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__description">
    {% raw %}{{{% endraw %} data.description | e('html'){% raw %}}}{% endraw %}
</div>
```
4. In `src/Pyz/Yves/ProductReviewWidget/Theme/default/views/product-review-display/product-review-display.twig:10` add the `span` tag with `itemscope`, `itemprop` and `itemtype` microdata directives. Introduce the `meta` tags inside the `span` tag:
```
<span itemscope itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating">
    <meta itemprop="ratingValue" content="{% raw %}{{{% endraw %} data.value {% raw %}}}{% endraw %}">
    <meta itemprop="bestRating" content="{% raw %}{{{% endraw %} data.maxValue {% raw %}}}{% endraw %}">
</span>
```
#### ProductSearchWidget
In `src/Pyz/Yves/ProductSearchWidget/Theme/default/views/product-quick-add/product-quick-add.twig:29`:
```
<h5 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title spacing-bottom spacing-bottom--big {% raw %}{{{% endraw %} data.verticalLayout ? '' : config.name ~ '__title--row' {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}
</h5>
```
change the `h5` heading to `h2` and add the `title title--h5` CSS classes:
```
<h2 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__title title title--h5 spacing-bottom spacing-bottom--big {% raw %}{{{% endraw %} not data.verticalLayout ? config.name ~ '__title--row' {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}
</h2>
```

#### ShopUi
1. In `src/Pyz/Yves/ShopUi/Theme/default/components/atoms/title/title.scss:1`:
```
@mixin shop-ui-title($name: '.title') {
    #{$name} {
        ...

        @content;
    }
}

@include shop-ui-title;
```
change overriding of the `shop-ui-title` mixin to `include` from the core level:
```
@include shop-ui-title {
    ...
}
```
2. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/jumbotron/jumbotron.twig:27`:
```
<h4 class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__text">{% raw %}{{{% endraw %} data.subHeadline {% raw %}}}{% endraw %}</h4>
```
change the `h4` heading to `h2` and add the `title title--h4` CSS classes:
```
<h2 class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__text title title--h4">{% raw %}{{{% endraw %} data.subHeadline {% raw %}}}{% endraw %}</h2>
```
3. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/money-price/money-price.twig:13`:
```
<span class="{% raw %}{{{% endraw %} component.renderClass(config.name ~ '__amount', modifiers) {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} amountClassName {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} defaultPriceJsName {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} data.amount | money(true, data.currencyIsoCode) {% raw %}}}{% endraw %}
</span>
```
introduce the `itemprop` and `content` microdata directives to the `span` tag and add the `meta` tag inside the `span`:
```
<span itemprop="price" content="{% raw %}{{{% endraw %} data.amount | moneyRaw {% raw %}}}{% endraw %}" class="{% raw %}{{{% endraw %} component.renderClass(config.name ~ '__amount', modifiers) {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} amountClassName {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} defaultPriceJsName {% raw %}}}{% endraw %}">
    <meta itemprop="priceCurrency" content="{% raw %}{{{% endraw %} currencyIsoCode() {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} data.amount | money(true, data.currencyIsoCode) {% raw %}}}{% endraw %}
</span>
```
4. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-card-item/product-card-item.twig:23` introduce the new optional attributes itemscope and itemtype:
```
{% raw %}{%{% endraw %} define attributes = {
    itemscope: '',
    itemtype: 'https://schema.org/Product',
} {% raw %}%}{% endraw %}
```
5. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-card-item/product-card-item.twig:38`:
```
<a href="{% raw %}{{{% endraw %} data.listItem.url {% raw %}}}{% endraw %}" title="{% raw %}{{{% endraw %} data.listItem.name {% raw %}}}{% endraw %}">
    {% raw %}{%{% endraw %} include molecule('product-item-image') with {
        modifiers: data.imageModifiers,
        data: {
            name: data.listItem.name | default,
            image: imageUrl,
        },
    } only {% raw %}%}{% endraw %}
</a>
```
introduce the `itemprop` microdata directive to the `a` tag:
```
<a itemprop="url" href="{% raw %}{{{% endraw %} data.listItem.url {% raw %}}}{% endraw %}" title="{% raw %}{{{% endraw %} data.listItem.name {% raw %}}}{% endraw %}">
    {% raw %}{%{% endraw %} include molecule('product-item-image') with {
        modifiers: data.imageModifiers,
        data: {
            name: data.listItem.name | default,
            image: imageUrl,
        },
    } only {% raw %}%}{% endraw %}
</a>
```
6. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-card-item/product-card-item.twig:67`:
```
<h6>
    <a href="{% raw %}{{{% endraw %} data.listItem.url {% raw %}}}{% endraw %}" class="{% raw %}{{{% endraw %} component.renderClass(config.name ~ '__title', modifiers) {% raw %}}}{% endraw %}" title="{% raw %}{{{% endraw %} data.listItem.name {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} data.listItem.name {% raw %}}}{% endraw %}</a>
</h6>
```
change the `h6` heading to the div tag and add the `title title--h6` CSS classes to the `a` tag inside. Also, introduce the `itemprop` microdata directive to the `a` tag:
```
<div>
    <a href="{% raw %}{{{% endraw %} data.listItem.url {% raw %}}}{% endraw %}" class="{% raw %}{{{% endraw %} component.renderClass(config.name ~ '__title', modifiers) {% raw %}}}{% endraw %} title title--h6" title="{% raw %}{{{% endraw %} data.listItem.name {% raw %}}}{% endraw %}" itemprop="name">{% raw %}{{{% endraw %} data.listItem.name {% raw %}}}{% endraw %}</a>
</div>
```
7. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-card-item/product-card-item.twig:74`:
```
<small class="text-secondary">{% raw %}{{{% endraw %} 'cart.item.sku' | trans {% raw %}}}{% endraw %}: {% raw %}{{{% endraw %} data.listItem.sku {% raw %}}}{% endraw %}</small>
```
wrap the `{% raw %}{{{% endraw %} data.listItem.sku {% raw %}}}{% endraw %}` content to the `span` tags with the `itemprop` microdata directives: 

```
<small class="text-secondary">{% raw %}{{{% endraw %} 'cart.item.sku' | trans {% raw %}}}{% endraw %}: <span itemprop="sku">{% raw %}{{{% endraw %} data.listItem.sku {% raw %}}}{% endraw %}</span></small>
```
8. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item-attributes/product-item-attributes.twig:19`:
```
<li class="list__item list__item--inline spacing-right spacing-right--biggest">
    <strong>{% raw %}{{{% endraw %}- ('product.attribute.' ~ attribute) | trans -{% raw %}}}{% endraw %}: </strong>
    {% raw %}{%{% endraw %} if ('product.attribute.' ~ attribute) | trans == 'Color' {% raw %}%}{% endraw %}
        <span class="{% raw %}{{{% endraw %} config.name{% raw %}}}{% endraw %}__color text-secondary" style="background-color: {% raw %}{{{% endraw %} data.listItem.attributes[attribute] {% raw %}}}{% endraw %}">
            {% raw %}{{{% endraw %} data.listItem.attributes[attribute] {% raw %}}}{% endraw %}
        </span>
    {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
        <span class="text-secondary">
            {% raw %}{{{% endraw %} data.listItem.attributes[attribute] {% raw %}}}{% endraw %}
        </span>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
</li>
```
introduce the `itemprop`, `itemscope`, and `itemtype`  microdata directives to the `li` tag. Wrap the `{% raw %}{{{% endraw %}- ('product.attribute.' ~ attribute) | trans -{% raw %}}}{% endraw %}` content to the `span` tags with the `itemprop` microdata directives. Introduce the `itemprop` microdata directives to the `span` tags with `{% raw %}{{{% endraw %} data.listItem.attributes[attribute] {% raw %}}}{% endraw %}` content:

```
<li itemprop="additionalProperty" itemscope itemtype="https://schema.org/PropertyValue" class="list__item list__item--inline spacing-right spacing-right--biggest">
    <strong><span itemprop="name">{% raw %}{{{% endraw %}- ('product.attribute.' ~ attribute) | trans -{% raw %}}}{% endraw %}</span>: </strong>
    {% raw %}{%{% endraw %} if ('product.attribute.' ~ attribute) | trans == 'Color' {% raw %}%}{% endraw %}
        <span itemprop="value" class="{% raw %}{{{% endraw %} config.name{% raw %}}}{% endraw %}__color text-secondary" style="background-color: {% raw %}{{{% endraw %} data.listItem.attributes[attribute] {% raw %}}}{% endraw %}">
            {% raw %}{{{% endraw %} data.listItem.attributes[attribute] {% raw %}}}{% endraw %}
        </span>
    {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
        <span itemprop="value" class="text-secondary">
            {% raw %}{{{% endraw %} data.listItem.attributes[attribute] {% raw %}}}{% endraw %}
        </span>
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
</li>
```
9. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.twig:9` introduce the new optional attributes `itemscope` and `itemtype`:
```
{% raw %}{%{% endraw %} define attributes = {
    itemscope: '',
    itemtype: 'https://schema.org/Product',
    'default-price-color-class-name': 'text-alt',
} {% raw %}%}{% endraw %}
```
10. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.twig:31`:
```
<a class="{% raw %}{{{% endraw %} component.renderClass(config.name ~ '__overlay', modifiers) {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__name {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__link-detail-page" href="{% raw %}{{{% endraw %} data.url {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} data.name {% raw %}}}{% endraw %}
</a>
```
introduce the `itemprop` microdata directive to the `a` tag:
```
<a itemprop="name" class="{% raw %}{{{% endraw %} component.renderClass(config.name ~ '__overlay', modifiers) {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__name {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__link-detail-page" href="{% raw %}{{{% endraw %} data.url {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} data.name {% raw %}}}{% endraw %}
</a>
```
11. In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.twig:85`:
```
<a class="button button--expand button--hollow {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__link-detail-page" href="{% raw %}{{{% endraw %} path(data.url) {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} 'product.view' | trans {% raw %}}}{% endraw %}
</a>
```
introduce the `itemprop` microdata directive to the `a` tag:
```
<a itemprop="url" class="button button--expand button--hollow {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__link-detail-page" href="{% raw %}{{{% endraw %} path(data.url) {% raw %}}}{% endraw %}">
    {% raw %}{{{% endraw %} 'product.view' | trans {% raw %}}}{% endraw %}
</a>
```
12. In `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig:168`:
```
<div class="content-wrap">
    ...
</div>
```
introduce the `itemscope` and `itemtype`  microdata directives to the `div` tag:

```
<div itemscope itemtype="https://schema.org/Product" class="content-wrap">
    ...
</div>
```
13. In `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig:177`:
```
<h3 class="page-info__title">{% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}</h3>
```
сhange the `h3` heading to `h1`  and add the `title title--h3` CSS classes:
```
<h1 class="page-info__title title title--h3 ">{% raw %}{{{% endraw %} data.title {% raw %}}}{% endraw %}</h1>
```
#### ShoppingListPage

In `src/Pyz/Yves/ShoppingListPage/Theme/default/views/shopping-list/shopping-list.twig:30`:
```
<h2>{% raw %}{{{% endraw %} data.shoppingList.name {% raw %}}}{% endraw %}</h2>
```
change the `h2` heading to `h1`  and add the `title title--h2` CSS classes:
```
<h1 class="title title--h2">{% raw %}{{{% endraw %} data.shoppingList.name {% raw %}}}{% endraw %}</h1>
```
## 3) Clean cache

Having completed all the steps above, clean the cache to be sure that the twig adjustments are applied properly.

If the project’s environment of the project is *Vagrant*, run:
```bash
console c:e 
```
If the project’s environment is *Docker*, run:
```bash
docker/sdk cli console c:e
```

