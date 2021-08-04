---
title: Braintree - Integration into a project
originalLink: https://documentation.spryker.com/v6/docs/braintree-integration
redirect_from:
  - /v6/docs/braintree-integration
  - /v6/docs/en/braintree-integration
---

{% info_block errorBox %}

There is currently an issue when using giftcards with Braintree. Our team is developing a fix for it.

{% endinfo_block %}

## Prerequisites

Before proceeding with the integration, make sure you have [installed and configured](https://documentation.spryker.com/docs/braintree-configuration) the Braintree module.

## Frontend integration

**src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig**
```js
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm
    },
 
    title: 'checkout.step.payment.title' | trans
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} embed molecule('form') with {
        class: 'box',
        data: {
            form: data.forms.payment,
            options: {
                attr: {
                    id: 'payment-form'
                }
            },
            submit: {
                enable: true,
                text: 'checkout.step.summary' | trans
            },
            cancel: {
                enable: true,
                url: data.backUrl,
                text: 'general.back.button' | trans
            }
        }
    } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} for name, choices in data.form.paymentSelection.vars.choices {% raw %}%}{% endraw %}
                <h5>{% raw %}{{{% endraw %} ('checkout.payment.provider.' ~ name) | trans {% raw %}}}{% endraw %}</h5>
 
                <ul class="list spacing-y">
                    {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
                        <li class="list__item spacing-y clear">
                            {% raw %}{%{% endraw %} embed molecule('form') with {
                                data: {
                                    form: data.form[data.form.paymentSelection[key].vars.value],
                                    enableStart: false,
                                    enableEnd: false,
                                    layout: {
                                        'card_expires_month': 'col col--sm-4',
                                        'card_expires_year': 'col col--sm-8'
                                    }
                                },
                                embed: {
                                    toggler: data.form.paymentSelection[key]
                                }
                            } only {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
                                    {% raw %}{%{% endraw %} set templateName = data.form.vars.template_path | replace('/', '-') {% raw %}%}{% endraw %}
                                    {% raw %}{%{% endraw %} set viewName = data.form.vars.template_path | split('/') {% raw %}%}{% endraw %}
 
                                    {% raw %}{{{% endraw %} form_row(embed.toggler, {
                                        required: false,
                                        component: molecule('toggler-radio'),
                                        attributes: {
                                            'target-selector': '.js-payment-method-' ~ templateName,
                                            'class-to-toggle': 'is-hidden'
                                        }
                                    }) {% raw %}}}{% endraw %}
 
                                    <div class="col col--sm-12 is-hidden js-payment-method-{% raw %}{{{% endraw %} templateName {% raw %}}}{% endraw %}">
                                        <div class="col col--sm-12 col--md-6">
                                            {% raw %}{%{% endraw %} if 'Braintree' in data.form.vars.template_path {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} include view(viewName[1], viewName[0]) with {
                                                    form: data.form.parent
                                                } only {% raw %}%}{% endraw %}
                                            {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                                                {% raw %}{{{% endraw %}parent(){% raw %}}}{% endraw %}
                                            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                                        </div>
                                    </div>
                                {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                            {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
                        </li>
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                </ul>
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

Add to `summary.twig`:
```js
{% raw %}{%{% endraw %} define data = {
    ...
    forms: {
        summary: _view.summaryForm,
        shipment: _view.checkoutShipmentForm
    },
    ...
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} embed molecule('form') with {
    class: 'box',
    data: {
        form: data.forms.shipment,
        submit: {
            enable: can('SeeOrderPlaceSubmitPermissionPlugin'),
            text: 'summary.step.add.shipment' | trans
        },
        cancel: {
            enable: false,
            }
        },
        embed: {
            overview: data.overview
        }
    } only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
```

