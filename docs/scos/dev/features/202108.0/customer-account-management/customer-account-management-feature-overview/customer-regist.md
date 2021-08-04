---
title: Customer Registration overview
originalLink: https://documentation.spryker.com/2021080/docs/customer-registration-overview
redirect_from:
  - /2021080/docs/customer-registration-overview
  - /2021080/docs/en/customer-registration-overview
---

In Spryker, customers registration are done via double opt-in. A double opt-in occurs when a user signs up, and an email with a registration confirmation link is sent to them. After they click the verification link, their account is activated and they can start using the online store as a registered customers.

{% info_block infoBox "Email verification" %}

There are multiple ways to register a customer. Regardless of a how a customer is registered, they always must verify their email address. 

{% endinfo_block %}

## Registration flows
There are four customer registration options:

* Regular registration
* Checkout registration
* Registration by creating an account in the Back Office
* Registration via Glue API
* Registration via import

### Regular registration

The *regular registration*  is the registration triggered from the registration page of *My Account* page on the Storefront. It is a two-step process:

1. A customer fills out the registration form and selects **Sign Up**. A message about the email verification is displayed.  

2. The customer selects the verification link in the email and gets redirected to the login page where the message about successful account activation is diplayed.

### Checkout registration 

*Checkout registration* is the registration triggered from the login checkout step. A customer puts products to cart as a guest user and proceeds to checkout. At the login checkout step, they choose to sign up. Then, they follow the [regular registration](#regular-registration). 


After checkout registration, the cart created by a customer as a guest user is converted into a registered user's cart and appears in the customer's list of carts.
:::

### Registration by creating an account in the Back Office


A Back Office user can register a customer by entering customer account details. The verification email is sent to the email address specified by the Back Office user. Until the customer verifies their account via the link in the email, in the Back Office, the status of their account is *Unverified*. Once they click the link, the status changes to *Verified*.

To learn how a Back Office user creates customer accounts, see [Creating customers](https://documentation.spryker.com/docs/en/managing-customers#creating-customers).

### Registration via Glue API

A developer can register a customer by passing their customer account details via Glue API. The verification email is sent to the email address passed in the registration request. The customer activates the account by verifying their email address. Alternatively, a developer can verify the customer's email address via Glue API. 

{% info_block infoBox "Verifying a customer's email address via Glue API" %}

A developer can verify a customer's email address via Glue API regardless of the way the account was created. 

{% endinfo_block %}

To learn how a developer creates customer accounts via Glue API, see [Create a customer](https://documentation.spryker.com/docs/managing-customers-via-glue-api#create-a-customer).

To learn how a developer confirms a customer's email address, see [Confirming customer registration](https://documentation.spryker.com/docs/confirming-customer-registration).

### Registration via import

A developer can register a customer by importing their customer account details. The verification email is snet to the email address specified in the import file. The customer activates the account by verifying their email address.


## If you are: 

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                 <li><a href="https://documentation.spryker.com/docs/file-details-customercsv" class="mr-link">Import customers</a></li> 
                <li><a href="https://documentation.spryker.com/docs/managing-customers-via-glue-api#create-a-customer" class="mr-link">Create a customer via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/confirming-customer-registration" class="mr-link">Confirm a customer registration via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/customer-account-management-feature-integration" class="mr-link">Enable Customer Registration by integrating the Customer Registration feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-customer-account-management-feature-integration" class="mr-link">Enable customer registration via Glue API by integrating the Customer Account Management Glue API</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-customers#creating-a-customer">Create a customer</a></li>
            </ul>
        </div>
    </div>
</div>
