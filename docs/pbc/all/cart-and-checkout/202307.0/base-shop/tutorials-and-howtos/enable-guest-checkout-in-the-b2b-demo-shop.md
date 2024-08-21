---
title: Enable guest checkout in the B2B Demo Shop
description: Learn how to enable guest checkout in B2B Demo Shop.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-enable-guest-checkout-in-b2b-demo-shop
originalArticleId: 669e5e5c-f26a-484c-ab68-4588c701aa99
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-enable-guest-checkout-in-b2b-demo-shop.html
  - /docs/pbc/all/cart-and-checkout/202307.0/base-shop/tutorials-and-howtos/howto-enable-guest-checkout-in-b2b-demo-shop.html
related:
  - title: Checkout steps
    link: docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/checkout/checkout-steps.html
---

As B2B environments usually implement complex business logic, in the [B2B Demo Shop](/docs/about/all/b2b-suite.html), guest users cannot check out by default. However, in some cases, you may need guest checkout to be enabled.

{% info_block infoBox "Exemplary implementation" %}

The implementation described in this document is exemplary and may require additional development on the project level.

{% endinfo_block %}

## Enable guest checkout

1. In the `is_restricted` column of the `spy_unauthenticated_customer_access` table, set `0` for `add-to-cart` and `order-place-submit` content types.
2. Remove customer permissions:
    1. In the Back Office, go to **Customers&nbsp;<span aria-label="and then">></span> Customer Access**.
    2. Clear all the permissions.
    ![customer-permissions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+enable+guest+checkout+in+B2B+Demo+Shop/customer-permissions.png)
    3. Select **Save**. The page refreshes with the success message displayed.

3. In `​Pyz\Client\Permission\PermissionDependencyProvider.php`, remove or comment `​PlaceOrderWithAmountUpToPermissionPlugin()`​.

4. In the `CheckoutPage` module, create `src/Pyz/Yves/CheckoutPage/Theme/default/views/login/login.twig`:

<details><summary markdown='span'>src/Pyz/Yves/CheckoutPage/Theme/default/views/login/login.twig</summary>

```twig
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    isGuest: _view.guestForm.vars.value and (_view.guestForm.vars.value.customer and _view.guestForm.vars.value.customer.isGuest),
    forms: {
        registration: _view.registerForm,
        guest: _view.guestForm,
        login: _view.loginForm
    }
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    <ul class="list">
        <li class="list__item spacing-y">
            {% raw %}{%{% endraw %} include molecule('toggler-radio') with {
                data: {
                    label: 'checkout.customer.proceed_as_user' | trans,
                },
                attributes: {
                    id: 'register',
                    checked: not data.isGuest,
                    name: 'checkoutProceedAs',
                    'target-class-name': 'js-login__register',
                },
            } only {% raw %}%}{% endraw %}
        </li>
        <li class="list__item">
            {% raw %}{%{% endraw %} include molecule('toggler-radio') with {
                data: {
                    label: 'checkout.customer.proceed_as_guest' | trans,
                },
                attributes: {
                    id: 'guest',
                    checked: data.isGuest,
                    name: 'checkoutProceedAs',
                    'target-class-name': 'js-login__guest',
                },
            } only {% raw %}%}{% endraw %}
        </li>
    </ul>

    <div class="grid">
        <div class="col col--sm-12 col--lg-6">
            <div class="box">
                {% raw %}{%{% endraw %} include molecule('form') with {
                    class: 'js-login__register' ~ (data.isGuest ? ' is-hidden' : ''),
                    data: {
                        title: 'customer.registration.title' | trans,
                        form: data.forms.registration,
                        submit: {
                            enable: true,
                            text: 'forms.submit.register' | trans
                        }
                    },
                    qa: 'register-form'
                } only {% raw %}%}{% endraw %}

                {% raw %}{%{% endraw %} include molecule('form') with {
                    class: 'js-login__guest' ~ (data.isGuest ? '' : ' is-hidden'),
                    data: {
                        title: 'checkout.customer.order_as_guest' | trans,
                        form: data.forms.guest,
                        submit: {
                            enable: true
                        }
                    }
                } only {% raw %}%}{% endraw %}
            </div>
        </div>

        <div class="col col--sm-12 col--lg-6">
            {% raw %}{%{% endraw %} embed molecule('form') with {
                class: 'box',
                data: {
                    form: data.forms.login,
                    layout: {
                        email: 'col col--sm-6',
                        password: 'col col--sm-6'
                    },
                    submit: {
                        enable: true,
                        text: 'forms.submit.login' | trans
                    },
                    cancel: {
                        enable: true
                    }
                }
            } only {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} block cancel {% raw %}%}{% endraw %}
                    <a href="{% raw %}{{{% endraw %} url('password/forgotten') {% raw %}}}{% endraw %}" {% raw %}{{{% endraw %}qa('customer-forgot-password-link'){% raw %}}}{% endraw %}>
                        {% raw %}{{{% endraw %} 'forms.forgot-password' | trans {% raw %}}}{% endraw %}
                    </a>
                {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
        </div>
    </div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
</details>

5. In `src/Pyz/Yves/CheckoutPage/Theme/default/views/summary/summary.twig`, adjust the form definition by replacing `enable: data.isPlaceableOrder and can('WriteSharedCartPermissionPlugin', data.cart.idQuote)` with the following:
```twig
enable: data.isPlaceableOrder
and can('SeeOrderPlaceSubmitPermissionPlugin')
and (not is_granted('ROLE_USER') or can('WriteSharedCartPermissionPlugin', data.cart.idQuote)),
```

After this, you can check out as a guest user.

After adding items to cart, use the `https://mysprykershop/en/cart` custom URL for checkout.
