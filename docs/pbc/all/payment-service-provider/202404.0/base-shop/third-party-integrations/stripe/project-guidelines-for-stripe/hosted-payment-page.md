---
title: Project guidelines for Stripe - Hosted Payment Page
description: Learn how to implement Stripe using ACP
last_updated: Nov 8, 2024
template: howto-guide-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
redirect_from:
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/integrate-stripe.html

---

### Implementing Stripe checkout as a hosted payment page

If you have rewritten `@CheckoutPage/views/payment/payment.twig` on the project level, do the following:

1. Make sure that a form molecule uses the following code for the payment selection choices:

```twig
{% raw %}

{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    {% embed molecule('form') with {
        data: {
            form: data.form[data.form.paymentSelection[key].vars.name],
            ...
        }
    {% endembed %}
{% endfor %}
{% endraw %}       
```

2. If you want to change the default payment provider or method names, do the following:
   1. Make sure the names are translated in your payment step template:

```twig
{% raw %}
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    <h5>{{ name | trans }}</h5>
{% endfor %}
{% endraw %}
```

    2. Add translations to your glossary data import file:

```csv
...
Stripe,Pay Online with Stripe,en_US
```
    3. Run the data import command for the glossary:

```bash
console data:import glossary
```

### Further reading

* [OMS configuration](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/oms.html)
* [Implementing Stripe for checkout in a headless application](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/headless.html)
* [Implementing Stripe payment page using an iframe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/iframe.html)
* [Refund handling with Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/refund.html)
* [Retrieving and using payment details from Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/payment-details.html)
* [Sending additional data to Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/send-additional-data-to-stripe.html)