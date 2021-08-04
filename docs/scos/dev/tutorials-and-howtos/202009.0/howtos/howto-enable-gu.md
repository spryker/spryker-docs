---
title: HowTo - Enable guest checkout in B2B Demo Shop
originalLink: https://documentation.spryker.com/v6/docs/howto-enable-guest-checkout-in-b2b-demo-shop
redirect_from:
  - /v6/docs/howto-enable-guest-checkout-in-b2b-demo-shop
  - /v6/docs/en/howto-enable-guest-checkout-in-b2b-demo-shop
---

As B2B environments usually implement complex business logics, in the [B2B Demo Shop](https://documentation.spryker.com/docs/b2b-suite), guest users cannot check out by default. In some cases, you might need guest checkout to be enabled.

{% info_block infoBox "Examplary implementation" %}

The implementation described in this document is examplary and may require additional development on the project level.

{% endinfo_block %}




To enable guest checkout:

1. In the `is_restricted` column of the `spy_unauthenticated_customer_access` table, set `0` for `add-to-cart` and `order-place-submit` content types.

2. Remove customer permissions:
    1. In the Back Office, go to **Customers** > **Customer Access**.
    2. Clear all the permissions.
    ![customer-permissions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+enable+guest+checkout+in+B2B+Demo+Shop/customer-permissions.png){height="" width=""}
    3. Select **Save**
    This refreshes the page with the success message displayed. 

3. In `​ Pyz\Client\Permission\PermissionDependencyProvider.php`, remove or comment `​PlaceOrderWithAmountUpToPermissionPlugin()`​.

4. DevVM-based instace: to sync code changes, run `vagrant halt && vagrant up`.

5. In CheckoutPage module, create `src/Pyz/Yves/CheckoutPage/Theme/default/views/login/login.twig`.
<details open>
    <summary>src/Pyz/Yves/CheckoutPage/Theme/default/views/login/login.twig</summary>

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



6. In `src/Pyz/Yves/CheckoutPage/Theme/default/views/summary/summary.twig` adjust the form definition by replacing `enable: data.isPlaceableOrder and can('WriteSharedCartPermissionPlugin', data.cart.idQuote),` with the following:
```twig
enable: data.isPlaceableOrder
and can('SeeOrderPlaceSubmitPermissionPlugin')
and (not is_granted('ROLE_USER') or can('WriteSharedCartPermissionPlugin', data.cart.idQuote)),
```

Now you can check out as a guest user. After adding items to cart, use the `http://yves.de.spryker.local/en/cart` custom URL for checkout. 







