---
title: Customer Registration overview
originalLink: https://documentation.spryker.com/v6/docs/customer-registration-overview
redirect_from:
  - /v6/docs/customer-registration-overview
  - /v6/docs/en/customer-registration-overview
---

For the new customers registration in a Spryker shop, double opt-in is used. The double opt-in means that when new customers register with your shop, they are required to confirm their email. That is, when they submit the registration form, they receive an email with a confirmation link they must click to verify their account. Only after they click the verification link in the email, they can start using the online store as registered customers.

{% info_block infoBox "Info" %}

Customers must always verify their email addresses, irrespective of the fact how they got registered: [by themselves on the Storefront](https://documentation.spryker.com/docs/shop-guide-creating-an-account), [by a Back Office user in the Back Office](https://documentation.spryker.com/docs/en/managing-customers#creating-a-customer), or [via the Glue API](https://documentation.spryker.com/docs/en/customers#create-a-customer).

{% endinfo_block %}

## Registration flows
There are four customer registration options:

* Regular registration
* Checkout registration
* Customer registration by a Back Office user in the Back Office
* Registration via the API

The *regular customer registration* implies registration triggered from the registration page of *My Account* on the Storefront. In this case, the registration flow is as follows:

1. Having populated all the necessary fields and clicked **Sign Up**, a customer sees the message saying that they must verify their account via the email sent. 

2. The customer clicks on the verification link in the email and turns out on a login page with the message saying that the account is verified.

*Checkout customer registration* implies that customer registers during the checkout. This means that the customer puts products to cart as a guest user, and at the [Login step of the checkout](https://documentation.spryker.com/docs/shop-guide-login-step), chooses to sign up. The registration flow is then the same as for the regular registration. 

{% info_block infoBox "Info" %}

When registering during the checkout, the cart, that the customer created as the guest user, is converted to the registered user’s cart and appears in the customer’s list of shopping carts. The customer proceeds to checkout as a registered user already.

{% endinfo_block %}

A customer can also be *registered by a Back Office User*. In this case, the customer also receives the double opt-in email for verification. Until the customer verifies their account via the link in the email, their status is *Unverified* in the Back Office. Once the customer clicked the verification link, the status changes to *Verified*.

See [Creating a Customer](https://documentation.spryker.com/docs/en/managing-customers#creating-a-customer) for details on how a Back Office user can create a customer.

Likewise, if a customer gets *registered via an API*, they also receive the double opt-in email with the verification link. They must verify their account by clicking the link in the email, before you can [authenticate them via API](https://documentation.spryker.com/docs/authentication-and-authorization#user-authentication).

See [Authentication and Authorization](https://documentation.spryker.com/docs/authentication-and-authorization#authentication-and-authorization) for details on registration via API.


## If you are: 

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/customers#create-a-customer" class="mr-link">Create a customer via API</a></li>
                <li><a href="https://documentation.spryker.com/docs/customer-account-management-feature-integration" class="mr-link">Enable customer registration by integrating the Customer Registration feature into your project</a></li> 
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-customers#creating-a-customer">Create a customer in the Back Office </a></li>
            </ul>
        </div>
    </div>
</div>
