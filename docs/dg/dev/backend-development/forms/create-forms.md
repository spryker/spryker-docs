---
title: Create forms
description: Spryker uses Symfony forms; this tutorial will help you get started on working with forms.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-working-forms
originalArticleId: 8dba4520-ed55-4904-a84f-bc46c7ac3cfd
redirect_from:
  - /docs/scos/dev/back-end-development/forms/create-forms.html
  - docs/scos/dev/back-end-development/forms/creating-forms.html
related:
  - title: Forms
    link: docs/dg/dev/backend-development/forms/forms.html
---

Spryker uses Symfony forms; this tutorial helps you get started on working with forms and shows how to build a simple newsletter subscription form that contains a field for entering the email address and a submit button.

Follow the steps in these sections to create the newsletter subscription form:
* [Create FormType](/docs/dg/dev/backend-development/forms/create-forms.html#create-the-formtype-class)
* [Render a form](/docs/dg/dev/backend-development/forms/create-forms.html#render-forms)
* [Handle posted data](/docs/dg/dev/backend-development/forms/create-forms.html#handle-posted-data)

## Create the FormType class

The best practice is to create a `FormType` class for each form you need to handle. Here you define the fields contained in the form and the rules of validation.

Define the email field that has two constraints attached:
* It's a required field.
* It must be a valid email address.

**Code sample:**

```php
<?php
namespace Pyz\Yves\Newsletter\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class SubscriptionFormType extends AbstractType
{

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('email', EmailType::class, [
            'label' => 'Email',
            'constraints' => [
                new NotBlank(),
                new Email(),
            ],
        ]);
    }

}
```

To instantiate your form, use Symfony's `FormBuilder` in your module's factory, as in the following example:

```php
<?php
namespace Pyz\Yves\Newsletter;

use Pyz\Yves\Newsletter\Form\SubscriptionFormType;
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Yves\Kernel\AbstractFactory;

class NewsletterFactory extends AbstractFactory
{
    /**
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createSubscriptionForm()
    {
        return $this->getFormFactory()->create(SubscriptionFormType::class);
    }

    /**
     * @return \Symfony\Component\Form\FormFactory
     */
    public function getFormFactory()
    {
        return $this->getProvidedDependency(ApplicationConstants::FORM_FACTORY);
    }
}
```

## Render forms

To render your form in a template, pass the form to the template through the controller action:
* Get an instance of your form (using the factory method implemented above).
* Pass the form to the template.

```php
<?php
namespace Pyz\Yves\Newsletter\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;

/**
 * @method \Pyz\Yves\Newsletter\NewsletterFactory getFactory()
 */
class SubscriptionController extends AbstractController
{

    /**
     * @return array
     */
    public function indexAction()
    {
        $subscriptionForm = $this
            ->getFactory()
            ->createSubscriptionForm();

        return $this->viewResponse([
            'subscriptionForm' => $subscriptionForm->createView(),
        ]);
    }

}
```

In your template, add the form together with a submit button. Make sure you use the same string as in the controller action (`subscriptionForm`).


```twig
{% raw %}{{{% endraw %} form_start(subscriptionForm) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} form_widget(subscriptionForm.email) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} form_errors(subscriptionForm.email) {% raw %}}}{% endraw %}
  <input type="submit" value="Subscribe" />
{% raw %}{{{% endraw %} form_end(subscriptionForm) {% raw %}}}{% endraw %}
```

## Handle posted data

To handle the posted data, you need to extend the controller action to handle the request and check whether the form is valid when it's submitted. Here you can set up the page to which you want the user to be redirected after the form is submitted successfully.

```php
<?php
namespace Pyz\Yves\Newsletter\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;

/**
 * @method \Pyz\Yves\Newsletter\NewsletterFactory getFactory()
 */
class SubscriptionController extends AbstractController
{

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $subscriptionForm = $this
            ->getFactory()
            ->createSubscriptionForm()
            ->handleRequest($request);

       if ($subscriptionForm->isSubmitted() && $subscriptionForm->isValid()) {
            // Call the client for e.g. to save the subscriber.

            // Redirect to home page after successful subscription
            return $this->redirectResponseInternal('home');
        }

        return $this->viewResponse([
            'subscriptionForm' => $subscriptionForm->createView(),
        ]);
    }

}
```
