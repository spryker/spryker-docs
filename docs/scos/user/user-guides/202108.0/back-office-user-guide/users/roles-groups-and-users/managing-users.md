---
title: Managing users
originalLink: https://documentation.spryker.com/2021080/docs/managing-users
redirect_from:
  - /2021080/docs/managing-users
  - /2021080/docs/en/managing-users
---

This topic describes how to manage users.

To start managing users, go to **Users** > **Users**.

You can do the following:
* Create a new user record
* Assign customers to a specific user
* Edit a user
* Deactivate/activate a user
* Delete a user from the system

## Creating users

You have already done the primary setup (you have created a [role](https://documentation.spryker.com/docs/managing-roles) and [group](https://documentation.spryker.com/docs/managing-groups)), so now it is time to add an actual user record to the system.

To create a user record:
1. In the top right corner of the *User* page, click **Add New User**.
2. Enter and select the following attributes:

    * E-mail, Password, Repeat Password
    * First Name and Last Name
    * Assigned groups
    * Agent
    * Interface language
         
3. Click **Create**.

That's it. The created user record appears on the *Users* page.    

**Tips & tricks**
There is a way to initiate a create-new-user flow while editing a user record. To do that, on the *Edit User* page, in the top right corner, click **Add User**.

## Editing users

To edit a user:
1. In *Users List* > *Action* column, click **Edit**  if you want to change user's details. 
2. Click **Update**.

## Reference information: Createing and editing users

This section describes attributes you see, select, and enter when creating and editing users.

### Agent user

While creating or editing a user, you can make a specific user to be an agent. 

This is very helpful for Customer Service and Sales departments. 

**Who is an agent user?**
This is a user that can do the same actions in the online store as a regular buyer.

**Why this option is needed?**
Let's pretend that there is a customer that needs assistance with his order. He needs a store representative to find the needed items in the catalog and submit an order on his behalf. This is exactly what an agent can do.

**How this can be done?**
An agent user goes to Yves using _/agent/login_ at the end of the online store URL and logins with their Back Office credentials. 

In the **Search** field on the top, he searches for the customer email. Once found, clicks **Confirm** on the right. 

Since now he can perform the same actions as a regular customer. Once all needed actions are done and the order is placed, he clicks **End Customer Assistance**. 
{% info_block infoBox %}
Click to see how it looks on Yves.</br>![Agent User](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Users+Control/User:+Reference+Information/Agent+User.gif
{% endinfo_block %}

### Creating and editing user page attributes

The following table describes the attributes used when creating or updating a user.

| ATTRIBUTES | DESCRIPTION  |
| --- | --- |
| Email | Email that is going to be used by this user to log in to Back Office.  |
| Password | Password that is going to be used by this user to log in to Back Office.  |
| Repeat Password | The same value that you enter for the **Password** field. |
|First Name| FIrst name of the team member for which the user is being created. |
|Last Name| Last name of the team member for which the user is being created. |
| Assigned Groups |List of all groups that are currently available in the system. You can select from one to many values by selecting the appropriate checkboxes. |
| Agent | Identifies if this is a user agent. See the _Agent User_ section above. |
| Interface Language |List of the available languages. This defines in what language the user will see the Back Office interface. Once the account language is changed, the respective user will see that their interface is translated into the corresponding language upon their next login.|
| Status |**Available on the Edit User page only**</br>Identifies if this user is in active status. All records are **Active** upon creation by default. The available values are: **active** (meaning able to log in to Back Office), **blocked** (the user is not able to log in), **deleted** (the user is not able to log in)|

## Assigning customers to users

The *Assign Customers* option is used to assign store customers' records to the Back office user records. This is done to enable the Back Office user to preview the CMS Pages in the online store (see [CMS Pages](https://documentation.spryker.com/docs/managing-cms-pages#previewing-cms-pages) set of topics).
 
To assign a customer:
1. Navigate to the *Users* page.
2. In the *Users List* > *Action* column, select **Assign Customers**. 
3. In the *List of customers* > *Select customers to assign* table, select the check-box next to the customer you want to assign (multiple customers can be selected).
4. Click **Save**.
{% info_block infoBox "A customer cannot be assigned to multiple users at a time.)

**Tips & tricks**
To de-assign a customer: 
1. On the *Assign Customers to User* page, scroll down to the *Assigned customer*s table.
2. Remove the check-box next to the customer(s) that needs to become unassigned, and click **Save**.

## Activating and deactivating users

To activate or deactivate a user:
1. In the *Users List* > *Action* column, click **Activate** (or **Deactivate**).
@(Info" %}

{% endinfo_block %}(If a user has deactivated themselves, this user will get logged out immediately and the message about the successful deactivation will be shown)
2. The status in the _Status_ column will be changed to *Active* or *Deactivated* depending on the action you performed.
 
 ## Deleting users 
 
To delete a user:
 1. In the *Users List* > *Action* column, click **Delete**.
2. On the *Warning* page, click **Delete** to confirm the action.
{% info_block infoBox %}
The user's status in the _Status_ column will change to _Deleted_; however, the user still stays in the *Users List* table. If the user has deleted themselves, this user will get logged out immediately and the message about the successful deletion will be shown.
{% endinfo_block %}

