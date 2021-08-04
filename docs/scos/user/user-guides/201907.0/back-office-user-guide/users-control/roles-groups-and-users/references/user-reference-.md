---
title: User- Reference Information
originalLink: https://documentation.spryker.com/v3/docs/user-reference-information
redirect_from:
  - /v3/docs/user-reference-information
  - /v3/docs/en/user-reference-information
---

This topic contains the reference information that you need to know when working in the **Users Control > Users** section.
***
## User Page
On the **Users** page, you see the following:
* Users' emails and first and last names
* Last login date and status
* Identifier of an agent user
* Actions that you can perform
***
## Agent User

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
{% endinfo_block %}{height="40" width="40"})
***
## Create and Edit User Page Attributes
The following table describes the attributes that are used when creating or updating a user.

| Attribute |Description  |
| --- | --- |
|**Email**| The email that is going to be used by this user to log in to Back Office.  |
|**Password**| The password that is going to be used by this user to log in to Back Office.  |
|**Repeat Password**| The same value that you enter for the **Password** field. |
|**First Name**| The first name of the team member for which the user is being created. |
|**Last Name**| The last name of the team member for which the user is being created. |
|**Assigned Groups**|The list of all groups that are currently available in the system. You can select from one to many values by selecting the appropriate checkboxes. |
|**Agent**| Identifies if this is a user agent. See the _Agent User_ section above. |
|**Interface Language**|The list of the available languages. This defines in what language the user will see the Back Office interface. Once the account language is changed, the respective user will see that their interface is translated into the corresponding language upon their next login.|
|**Status**|**Available on the Edit User page only**</br>Identifies if this user is in active status. All records are **Active** upon creation by default. The available values are: **active** (meaning able to log in to Back Office), **blocked** (the user is not able to log in), **deleted** (the user is not able to log in)|
