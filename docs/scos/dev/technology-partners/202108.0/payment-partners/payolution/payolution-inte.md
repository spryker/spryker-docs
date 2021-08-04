---
title: Payolution - Integration into a project
originalLink: https://documentation.spryker.com/2021080/docs/payolution-integration-into-project
redirect_from:
  - /2021080/docs/payolution-integration-into-project
  - /2021080/docs/en/payolution-integration-into-project
---

{% info_block errorBox %}

There is currently an issue when using giftcards with Payolution. Our team is developing a fix for it.

{% endinfo_block %}

## Prerequisites
Before proceeding with the integration, make sure you have [installed and configured](https://documentation.spryker.com/docs/payolution-configuration) the Payolution module.

## Frontend Integration
To show Payolution on Frontend, extend the payment view:

**src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig**

 ```php
 {% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm
    },
    title: 'checkout.step.payment.title' | trans,
    customForms: {}
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
            },
            customForms: data.customForms
        }
    } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} for name, choices in data.form.paymentSelection.vars.choices {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set paymentProviderIndex = loop.index0 {% raw %}%}{% endraw %}
                <h5>{% raw %}{{{% endraw %} ('checkout.payment.provider.' ~ name) | trans {% raw %}}}{% endraw %}</h5>
                <ul>
                    {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
                        <li class="list__item spacing-y clear">
                            {% raw %}{%{% endraw %} embed molecule('form') with {
                                data: {
                                    form: data.form[data.form.paymentSelection[key].vars.value],
                                    enableStart: false,
                                    enableEnd: false,
                                    customForms: data.customForms
                                },
                                embed: {
                                    index: loop.index ~ '-' ~ paymentProviderIndex,
                                    toggler: data.form.paymentSelection[key]
                                }
                            } only {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
                                    {% raw %}{{{% endraw %} form_row(embed.toggler, {
                                        required: false,
                                        component: molecule('toggler-radio'),
                                        attributes: {
                                            'target-class-name': 'js-payment-method-' ~ embed.index,
                                        }
                                    }) {% raw %}}}{% endraw %}
                                    {% raw %}{%{% endraw %} set templateName = data.form.vars.template_path | replace('/', '-') {% raw %}%}{% endraw %}
                                    {% raw %}{%{% endraw %} set viewName = data.form.vars.template_path | split('/') {% raw %}%}{% endraw %}

                                    <div class="col col--sm-12 is-hidden js-payment-method-{% raw %}{{{% endraw %}embed.index{% raw %}}}{% endraw %}">
                                        <div class="col col--sm-12 col--md-6">
                                            {% raw %}{%{% endraw %} if 'Payolution' in data.form.vars.template_path {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} include view(viewName[1], viewName[0]) with {
                                                    form: data.form.parent
                                                } only {% raw %}%}{% endraw %}
                                            {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                                                {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
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
