---
title: Managing roles
description: Use the procedures to create, update or delete the role, add a rule for the role, and assign the role to a group in the Back Office.
last_updated: Aug 2, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-roles
originalArticleId: 646ae8f6-32b9-440d-8cdf-c720d046de25
redirect_from:
  - /2021080/docs/managing-roles
  - /2021080/docs/en/managing-roles
  - /docs/managing-roles
  - /docs/en/managing-roles
---


### Adding rules for roles

In the *Roles* section of the *Edit Role* page, you can define what a user can or cannot do in the Admin UI. To restrict a user from accessing a specific action, specify what bundle (module) and controller this action refers to.

#### Extracting the bundle, controller, and action values

Information about bundles, controllers, and actions is contained in tabs in the Back Office, and can be retrieved from links.

**Example**:
1. Go to the *Products* > *Availability* section and click **View** in **Actions**.
2. Check the link in your browser. It looks somewhat like this: `zed.de.b2b-demo-shop.local/availability-gui/index/view?id-product=152&id-store=1`
where:

    * *availability-gui* is **bundle**,
    * *index* is **controller**,
    * *view* is **action**.



#### Restricting user access to modules and actions

You can restrict user access to all or specific modules and their actions.
Keep in mind that user is able to perform actions on modules unless you explicitly allow them to. Therefore, if you want to restrict users from accessing particular modules/actions, first give them access to all modules, and then restrict access to specific ones.

{% info_block warningBox %}

To allow access to all modules, type * in *Bundle*, *Controller* and *Action* fields, and select _allow_ in the *Permission* field.

{% endinfo_block %}

**Example**
Imagine you need to deny adding product attributes for a user. Do the following:
1. First, allow all actions for all modules for the user. For this, in *Rule* section of the *Edit Role* page, put `*` into fields **Bundle**, **Controller** and **Action**, and select _allow_ in the *Permission* field.
2.  Go to the page for which you want to restrict access: **Products** > **Attributes** > **Create Product Attributes**.

{% info_block infoBox %}

From the `zed.de.b2b-demo-shop.local/product-attribute-gui/attribute/create` link, you can already tell that:<br>
- _product-attribute-gui_ is bundle,<br>
- _attribute_ is controller,<br>
- _create_ is action.<br>
You can verify the bundle, controller and action values in the [navigation.xml file ](https://github.com/spryker/product-attribute-gui/blob/master/src/Spryker/Zed/ProductAttributeGui/Communication/navigation.xml) of the product-attribute-gui module under the *Create a Product Attribute* label:<br>
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Users+Control/Roles%2C+Groups+and+Users/Managing+Roles/Create+attribute.png)

{% endinfo_block %}

3. Go back to the *Edit Role* page and fill in the required fields:
* **Bundle**: _product-attribute-gui_
* **Controller**: _attriubute_
* **Action**: _create_
* **Permission**: _deny_
4. Click **Save**.

That's it! When the user with this role clicks **Create a Product Attribute**, they get the *Access denied* view.

## Reference information: Creating and editing roles

The following table describes the attributes that are used when creating or updating a role.

| ATTRIBUTE | DESCRIPTION|
| --- | --- |
| Name | Unique name for the role, i.e., _Category Manager Role_. |
|Bundle  | Bundle, in other words, is a module. It is used to identify what module a specific user can or cannot manage. See for information on  |
|Controller  | This identifies the controller responsible for the bundle. |
| Action | This identifies what action can be performed for a specific module.  |
| Permission | Can be either "allow" or "deny". |

## Deleting roles

To delete a role:

1. In the *Role list* > *Actions* column, click **Delete** for the role that needs to be deleted.
This action permanently deletes the record.

**Tips & tricks**
<br>While updating the role, you can initiate a new role creation flow.
<br>To do that:
1.  In the top right corner of the *Edit Role* page, click **Create role**.
    The *Create new Role* page opens.
2. Repeat the steps described in the [Creating roles](#creating-roles) procedure.

**What's next?**
<br>You need to create a group to assign this role to it. See the [Creating groups](/docs/scos/user/back-office-user-guides/{{page.version}}/users/roles-groups-and-users/managing-groups.html#creating-groups) section in _Managing Groups_.
