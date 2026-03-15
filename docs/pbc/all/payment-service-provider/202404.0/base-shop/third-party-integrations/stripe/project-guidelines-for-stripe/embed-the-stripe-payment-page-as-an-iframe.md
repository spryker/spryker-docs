---
title: Embed the Stripe payment page as an iframe
description: Learn how to implement Stripe using ACP
last_updated: Nov 8, 2024
template: howto-guide-template
redirect_from:
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html

---

By default, the Stripe App payment flow assumes that the payment page is on another domain. When users place an order, they're redirected to the Stripe payment page. To improve the user experience, you can embed the Stripe payment page directly into your website as follows:


1. Create or update `src/Pyz/Zed/Payment/PaymentConfig.php` with the following configuration:

```php
namespace Pyz\Zed\Payment;

class PaymentConfig extends \Spryker\Zed\Payment\PaymentConfig
{
    public function getStoreFrontPaymentPage(): string
    {        
        // Please make sure that domain is whitelisted in the config_default.php `$config[KernelConstants::DOMAIN_WHITELIST]`
        return '/payment'; //or any other URL on your storefront domain e.g. https://your-site.com/payment-with-stripe
    }
}
```

In this setup, the redirect URL is added as a `url` query parameter to the URL you've specified in the `getStoreFrontPaymentPage()` method; the value of the parameter is base64-encoded.
Example: `/payment?url=base64-encoded-URL-for-iframe-src`.


2. Depending on your frontend setup, create a page to render the Stripe payment page in one of the following ways:

* Use the following minimal page, which can be set up with any frontend technology.
* With a third-party frontend, follow the documentation of your framework to create a page to render the Stripe payment page using query parameters from the redirect URL provided in the Glue API `POST /checkout` response.
* With Yves, follow [Create an Yves page for rendering the Stripe payment page](#create-an-yves-page-for-rendering-the-stripe-payment-page).

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Order payment page</title>
</head>
<body>
<iframe src="<?php echo base64_decode($_GET['url']) ?>" width="100%" height="700px" style="border:0"></iframe>
</body>
</html>
```


## Create an Yves page for rendering the Stripe payment page


1. Create a controller to render the payment page:

**src/Pyz/Yves/PaymentPage/Controller/PaymentController.php**
```php

namespace Pyz\Yves\PaymentPage\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Spryker\Yves\Kernel\View\View;
use Symfony\Component\HttpFoundation\Request;

class PaymentController extends AbstractController
{
    /**
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(Request $request): View
    {
        return $this->view(
            [
                'iframeUrl' => base64_decode($request->query->getString('url', '')),
            ],
            [],
            '@PaymentPage/views/payment.twig',
        );
    }
}

```

2. Create a template for the page:

**src/Pyz/Yves/PaymentPage/Theme/default/views/payment.twig**
```twig
{% raw %}
{% extends template('page-layout-checkout', 'CheckoutPage') %}

{% define data = {
    iframeUrl: _view.iframeUrl,
    title: 'Order Payment' | trans,
} %}

{% block content %}
    <iframe  src="{{ data.iframeUrl }}" class="payment-iframe" style="border:0; display:block; width:100%; height:700px"></iframe>
{% endblock %}
{% endraw %}
```

3. Create a route for the controller:

**src/Pyz/Yves/PaymentPage/Plugin/Router/EmbeddedPaymentPageRouteProviderPlugin.php**
```php
namespace Pyz\Yves\PaymentPage\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class EmbeddedPaymentPageRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    /**
     * @param \Symfony\Component\Routing\RouteCollection $routeCollection
     *
     * @return \Symfony\Component\Routing\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/payment', 'PaymentPage', 'Payment', 'indexAction');
        $routeCollection->add('payment-page', $route);

        return $routeCollection;
    }
}
```

4. In `src/Pyz/Yves/Router/RouterDependencyProvider.php`, add a router plugin to `RouterDependencyProvider::getRouteProvider()`.
