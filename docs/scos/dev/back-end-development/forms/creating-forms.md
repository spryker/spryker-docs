---
title: Creating Forms
description: Spryker uses Symfony forms; this tutorial will help you get started on working with forms.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-working-forms
originalArticleId: 8dba4520-ed55-4904-a84f-bc46c7ac3cfd
redirect_from:
  - /2021080/docs/t-working-forms
  - /2021080/docs/en/t-working-forms
  - /docs/t-working-forms
  - /docs/en/t-working-forms
  - /v6/docs/t-working-forms
  - /v6/docs/en/t-working-forms
  - /v5/docs/t-working-forms
  - /v5/docs/en/t-working-forms
  - /v4/docs/t-working-forms
  - /v4/docs/en/t-working-forms
  - /v3/docs/t-working-forms
  - /v3/docs/en/t-working-forms
  - /v2/docs/t-working-forms
  - /v2/docs/en/t-working-forms
  - /v1/docs/t-working-forms
  - /v1/docs/en/t-working-forms
---

<!--used to be: http://spryker.github.io/tutorials/yves/working-with-forms/ -->
Spryker uses Symfony forms; this tutorial will help you get started on working with forms.

You will build a simple newsletter subscription form that contains a field for entering the email address and a submit button.

Follow the steps described below to create the newsletter subscription form:

* [Create the FormType](/docs/scos/dev/back-end-development/forms/creating-forms.html#create-the-formtype)
* [Render the Form](/docs/scos/dev/back-end-development/forms/creating-forms.html#render-the-form)
* [Post the Data](/docs/scos/dev/back-end-development/forms/creating-forms.html#post-the-data)

## Create the FormType
The best practice is to create a `FormType` class for each form you need to handle. Here you will define the fields contained in the form and the rules of validation.

In our case, we need to define the email field that has two constraints attached:

* it’s a required field
* it must be a valid email address

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

To instantiate your form, use Symfony’s `FormBuilder` in your module’s factory, as in the example bellow:

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

## Render the Form
To render your form in a template, pass the form to the template through the controller action:

* get an instance of your form (using the factory method implemented above)
* pass the form to the template

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

Add the form in your template together with a submit button; make sure you use the same string as in the controller action (`subscriptionForm`).


```php
{% raw %}{{{% endraw %} form_start(subscriptionForm) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} form_widget(subscriptionForm.email) {% raw %}}}{% endraw %}
    {% raw %}{{{% endraw %} form_errors(subscriptionForm.email) {% raw %}}}{% endraw %}
  <input type="submit" value="Subscribe" />
{% raw %}{{{% endraw %} form_end(subscriptionForm) {% raw %}}}{% endraw %}
```

## Post the Data
To handle the posted data, we’ll need to extend the controller action to handle the request and check if the form is valid when it’s being submitted. Here you can setup the page to which you want the user to be redirected after the form is being successfully submitted.

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
