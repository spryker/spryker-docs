---
title: Integrating Heidelpay
description: This article contains information on integrating the Heidelpay module into the Spryker Commerce OS.
last_updated: August 2, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-integration-scos
originalArticleId: 05ad4c88-a849-4d74-bdb3-898ab0b4e74a
redirect_from:
  - /2021080/docs/heidelpay-integration-scos
  - /2021080/docs/en/heidelpay-integration-scos
  - /docs/heidelpay-integration-scos
  - /docs/en/heidelpay-integration-scos
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/heidelpay/integrating-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/heidelpay/integrating-heidelpay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/heidelpay/integrate-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/heidelpay/integrating-heidelpay.html
  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html
related:
  - title: Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay.html
  - title: Integrating the Credit Card Secure payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-credit-card-secure-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/configure-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-direct-debit-payment-method-for-heidelpay.html
  - title: Integrating the Paypal Authorize payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-paypal-authorize-payment-method-for-heidelpay.html
  - title: Installing Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/install-heidelpay.html
  - title: Heidelpay workflow for errors
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay-workflow-for-errors.html
  - title: Integrating the Split-payment Marketplace payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-split-payment-marketplace-payment-method-for-heidelpay.html
  - title: Integrating the Easy Credit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-easy-credit-payment-method-for-heidelpay.html
---

{% info_block errorBox %}

Heidelpay is not compatible with [gift cards](/docs/pbc/all/gift-cards/{{page.version}}/gift-cards.html). We are working on a solution.

{% endinfo_block %}

To integrate Heidelpay, follow the steps below:

## Back-end Integration

1. Add sub form plugins and payment method handlers:

**Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider**

```php
 protected function addSubFormPluginCollection(Container $container): Container
{
	$container[self::PAYMENT_SUB_FORMS] = function () {
		$subFormPluginCollection = new SubFormPluginCollection();
		...
		$subFormPluginCollection->add(new HeidelpaySofortSubFormPlugin());
		$subFormPluginCollection->add(new HeidelpayPaypalAuthorizeSubFormPlugin());
		$subFormPluginCollection->add(new HeidelpayPaypalDebitSubFormPlugin());
		$subFormPluginCollection->add(new HeidelpayIdealSubFormPlugin());
		$subFormPluginCollection->add(new HeidelpayCreditCardSecureSubFormPlugin());

		return $subFormPluginCollection;
	};

	return $container;
}

protected function addPaymentMethodHandlerPluginCollection(Container $container):
{
	$container[self::PAYMENT_METHOD_HANDLER] = function () {
		$stepHandlerPluginCollection = new StepHandlerPluginCollection();
		...
		$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_SOFORT);
		$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_PAYPAL_AUTHORIZE);
		$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_PAYPAL_DEBIT);
		$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_IDEAL);
		$stepHandlerPluginCollection->add(new HeidelpayCreditCardHandlerPlugin(), PaymentTransfer::HEIDELPAY_CREDIT_CARD_SECURE);

		return $stepHandlerPluginCollection;
	};

	return $container;
}
```

2. Add route provider plugin:

**\Pyz\Yves\Router\RouterDependencyProvider**

```php
protected function getRouteProvider(): array
{
	return [
		...
		new HeidelpayRouteProviderPlugin(),
	];
}
```

3. Add checkout plugins:

**\Pyz\Zed\Checkout\CheckoutDependencyProvider**

```php
 protected function getCheckoutOrderSavers(Container $container)
{
	$plugins = [
		...
		new HeidelpaySaveOrderPlugin(),
	];

	return $plugins;
}

protected function getCheckoutPostHooks(Container $container)
{
	return [
		...
		new HeidelpayPostSavePlugin(),
	];
}
```

4. Add OMS commands and conditions:

**\Pyz\Zed\Oms\OmsDependencyProvider**

```php
public function provideBusinessLayerDependencies(Container $container)
{
	$container = parent::provideBusinessLayerDependencies($container);
	$container = $this->addCommandPlugins($container);
	$container = $this->addConditionPlugins($container);

	return $container;
}
protected function addConditionPlugins(Container $container): Container
{
	$container[self::CONDITION_PLUGINS] = function () {
		$conditionCollection = new ConditionCollection();
		$conditionCollection->add(new IsAuthorizationCompletedPlugin(), 'Heidelpay/IsAuthorizationCompleted');
		$conditionCollection->add(new IsDebitCompletedPlugin(), 'Heidelpay/IsDebitCompleted');
		$conditionCollection->add(new IsCaptureApprovedPlugin(), 'Heidelpay/IsCaptureApproved');

		return $conditionCollection;
	};

	return $container;
}

protected function addCommandPlugins(Container $container): Container
{
	$container[self::COMMAND_PLUGINS] = function () {
		$commandCollection = new CommandCollection();
		$commandCollection->add(new SendOrderConfirmationPlugin(), 'Oms/SendOrderConfirmation');
		$commandCollection->add(new SendOrderShippedPlugin(), 'Oms/SendOrderShipped');
		$commandCollection->add(new AuthorizePlugin(), 'Heidelpay/Authorize');
		$commandCollection->add(new DebitPlugin(), 'Heidelpay/Debit');
		$commandCollection->add(new CapturePlugin(), 'Heidelpay/Capture');

		return $commandCollection;
	};

	return $container;
}
```

## Front-end Integration

To make Heidelpay module work with your project, it's necessary to extend the frontend part:

**tsconfig.json**

```json
 "include": [
 "./vendor/spryker/spryker-shop/**/*",
 "./vendor/spryker-eco/**/*",
 "./src/Pyz/Yves/**/*"
],
```

**frontend/settings.js**

```bash
 // eco folders
eco: {
 // all modules
 modules: './vendor/spryker-eco'
},
...
 componentEntryPoints: {
 // absolute dirs in which look for
 dirs: [
 ...
 path.join(context, paths.eco.modules),
 ...
 ],
 ```

**src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig**

```twig
 ...

{% raw %}{%{% endraw %} define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm,
    },
    title: 'checkout.step.payment.title' | trans,
    customForms: {
        'heidelpay/sofort': ['sofort', 'heidelpay'],
        'heidelpay/credit-card-secure': ['credit-card-secure', 'heidelpay'],
    },
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} embed molecule('form') with {
        class: 'box',
        data: {
            form: data.forms.payment,
            options: {
                attr: {
                    id: 'payment-form',
                },
            },
            submit: {
                enable: true,
                isSingleClickEnforcerEnabled: false,
                text: 'checkout.step.summary' | trans,
                class: 'button button--success js-payone-credit-card__submit',
            },
            cancel: {
                enable: true,
                url: data.backUrl,
                text: 'general.back.button' | trans,
            },
        },
        embed: {
            customForms: data.customForms,
        },
    } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block errors {% raw %}%}{% endraw %}
            {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
            {% raw %}{{{% endraw %} form_errors(data.form.paymentSelection) {% raw %}}}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} for name, choices in data.form.paymentSelection.vars.choices %}
                {% raw %}{%{% endraw %} set paymentProviderIndex = loop.index0 {% raw %}%}{% endraw %}
                <h5>{% raw %}{{{% endraw %} name | trans {% raw %}}}{% endraw %}</h5>
                <ul>
                    {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
                        <li class="list__item spacing-y clear">
                            {% raw %}{%{% endraw %} embed molecule('form') with {
                                data: {
                                    form: data.form[data.form.paymentSelection[key].vars.name],
                                    enableStart: false,
                                    enableEnd: false,
                                },
                                embed: {
                                    customForms: embed.customForms,
                                    index: loop.index ~ '-' ~ paymentProviderIndex,
                                    toggler: data.form.paymentSelection[key],
                                },
                            } only {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
                                    {% raw %}{{{% endraw %} form_row(embed.toggler, {
                                        required: false,
                                        component: molecule('toggler-radio'),
                                        attributes: {
                                            'target-class-name': 'js-payment-method-' ~ embed.index,
                                        }
                                    }) {% raw %}}}{% endraw %}
                                    <div class="col col--sm-12 is-hidden js-payment-method-{{embed.index}}">
                                        <div class="col col--sm-12 col--md-6">
                                            {% raw %}{%{% endraw %} if embed.customForms[data.form.vars.template_path] is not defined {% raw %}%}{% endraw %}
                                                {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
                                            {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} set viewName = embed.customForms[data.form.vars.template_path] | first {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} set moduleName = embed.customForms[data.form.vars.template_path] | last {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} include view(viewName, moduleName) ignore missing with {
                                                    form: data.form.parent
                                                } only %}
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

**src/Pyz/Yves/Twig/TwigConfig.php**

```twig
 protected function addCoreTemplatePaths(array $paths)
{
 ...
 $paths[] = APPLICATION_VENDOR_DIR . '/spryker-eco/%1$s/src/SprykerEco/Yves/%1$s/Theme/' . $themeName;

 return $paths;
}
```
