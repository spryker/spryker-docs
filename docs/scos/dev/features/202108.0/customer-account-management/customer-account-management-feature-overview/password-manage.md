---
title: Password Management overview
originalLink: https://documentation.spryker.com/2021080/docs/password-management-overview
redirect_from:
  - /2021080/docs/password-management-overview
  - /2021080/docs/en/password-management-overview
---

*Password Management* enables Spryker admins to manage customer account passwords. It also allows B2B and B2C Shoppers to manage their own account passwords. 

When you create a customer account in the Back Office, you do not enter the password. Instead, you can select to send a password reset email to the customer account’s email address. This way, the customer knows that the account has been created and they need to reset the password to access it. See [Creating a Customer](https://documentation.spryker.com/docs/managing-customers#creating-a-customer) to learn how Spryker admin sends password reset emails when creating customer accounts.

You can create customer accounts by [importing](https://documentation.spryker.com/docs/importing-data-with-configuration-file#console-commands-to-run-import) a [customer.csv file](https://documentation.spryker.com/docs/file-details-customercsv). In this case, you can specify the passwords of the customer accounts to import, but it’s not mandatory. If you do not specify the passwords, you can send password reset emails to the customers without passwords by running `console customer:password:set`. Also, you can send password reset emails to all customers by running console `customer:password:reset`. See [Importing Data with a Configuration File](https://documentation.spryker.com/docs/importing-data-with-configuration-file#importing-data-with-a-configuration-file) to learn how a developer can import customer data.

With the help of [Glue API](https://documentation.spryker.com/docs/glue-rest-api), you can change and reset customer account passwords. This can be useful when you want to use a single authentication in all the apps connected to your shop. See [Changing Customer’s Password](https://documentation.spryker.com/docs/customer-password#change-a-customer-s-password) and [Resetting Customer’s Password](https://documentation.spryker.com/docs/customer-password#reset-a-customers-password) to learn how a developer can do it.

On the Storefront, it is mandatory to enter a password when creating a customer account. After the account is created, you can update the password in the customer account or request a password reset via email. See [Changing Account Password](https://documentation.spryker.com/docs/shop-guide-customer-profile#changing-customer-account-password) to learn how B2B and B2C Shoppers can change account passwords.





## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                  <li><a href="https://documentation.spryker.com/docs/customer-account-management-feature-integration" class="mr-link">Enable Password Management by integrating the Customer Account Management feature</a></li>
                 <li><a href="https://documentation.spryker.com/docs/glue-api-customer-account-management-feature-integration" class="mr-link">Enable Glue API password management by integrating the Customer Account Management Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/customer-password#change-a-customer-s-password" class="mr-link">Change a customer’s password via Glue API</a></li>
                                <li><a href="https://documentation.spryker.com/docs/customer-password#reset-a-customer-s-password" class="mr-link">Reset a customer’s password via Glue API</a></li>
            </ul>
        </div>
           </div>  
     </div>
