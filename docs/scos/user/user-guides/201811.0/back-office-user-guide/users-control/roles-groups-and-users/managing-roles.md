---
title: Managing Roles
originalLink: https://documentation.spryker.com/v1/docs/managing-roles
redirect_from:
  - /v1/docs/managing-roles
  - /v1/docs/en/managing-roles
---

This topic describes the procedures that you need to perform to create, edit, and delete roles.
***
To start working with roles, navigate to the **Users Control -> Roles** section.
***
## Creating a Role
To create a role: 
1. On the **Role list** table view page, click **Add new Role** in the top right corner. 
2. On the **Create new Role** page, enter the name of the role and click **Create**. 
This will redirect you to the **Edit Role** page where you define the permissions that this role will possess.
3. In the **Rule** section, enter and select the following and click **Add Rule**:
    * Bundle
    * Controller
    * Action
    * Permission

See [Adding Rules for Roles](https://documentation.spryker.com/v1/docs/managing-roles#adding-rules-for-roles) for information on how to create rules.
{% info_block warningBox "Note" %}
You can add from one to many rules to a specific role. Each time you click **Add rule**, the created rule appears in the **Assigned Rules** section.
{% endinfo_block %}

You have set up a role to be assigned to a group. 
***
**Tips & Tricks**
In case you need a specific role to have access to all sections, you can put an asterisk (*) value for a bundle, controller, and action. Add _allow for permission_. This will grant access to everything you see in Back Office and allow to perform any action.
***

## Editing a Role
To edit a role:

1. In the **Role list > Actions** column, click **Edit** for a specific role.  
2. On the **Edit Role** page, you can:
    1. Add more rules to the role.
    2. Delete the already assigned rule by clicking **Delete** in the **Assigned Rules > Actions** column.

### Adding Rules for Roles
In the **Roles** section of the **Edie Role** page, you can define what a user can or cannot do in the Admin UI. To restrict a user from accessing a specific action, you need to specify what bundle (module) and controller this action refers to.

#### Extracting the Bundle, Controller, and Action Values 

Information about bundles, controllers, and actions is contained in tabs in the Back Office, and can be retrieved from links. 

**Example**:
1. Go to **Products > Availability** section and click **View** in **Actions**. 
2. Check the link in your browser. It will look somewhat like this: `zed.de.b2b-demo-shop.local/availability-gui/index/view?id-product=152&id-store=1`
where: 

    * *availability-gui* is **bundle**, 
    * i*ndex* is **controller**,
    * *view* is **action**.

The bundle, controller and action values can also be found in the `navigation.xml` file either at 
at `/project/config/Zed/navigation.xml` or at ```https://github.com/spryker/[bundle_name]/src/Zed/[bundle_name]/communication/navigation.xml```. 
See example of the `navigation.xml` file of the AvailabilityGui module:

<details open>
<summary>navigation.xml</summary>
   
```
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <product>
        <pages>
            <AvailabilityGui>
                <label>Availability</label>
                <title>Availability</title>
                <bundle>availability-gui</bundle>
                <controller>index</controller>
                <action>index</action>
                <pages>
                    <product-availability>
                        <label>Product Availability</label>
                        <title>Product Availability</title>
                        <bundle>availability-gui</bundle>
                        <controller>index</controller>
                        <action>view</action>
                        <visible>0</visible>
                    </product-availability>

                    <stock-edit>
                        <label>Edit Stock</label>
                        <title>Edit Stock</title>
                        <bundle>availability-gui</bundle>
                        <controller>index</controller>
                        <action>edit</action>
                        <visible>0</visible>
                    </stock-edit>
                </pages>
            </AvailabilityGui>
        </pages>
    </product>
</config>
```
 <br>
</details>

{% info_block infoBox %}
Information about modules is available in their readme files. Check the [readme file of the AvailabilityGui](https://github.com/spryker/availability-gui/blob/master/README.md
{% endinfo_block %} module for example.)

#### Restricting User Access to Modules and Actions

You can restrict user access to all or specific modules and their actions. 
Keep in mind that user will not be able to perform actions on modules unless you explicitly allow them to. Therefore, if you want to restrict users from accessing particular modules/actions, first give them access to all modules, and then restrict access to specific ones. 

{% info_block warningBox %}
To allow access to all modules, type * in **Bundle**, **Controller** and **Action** fields, and select _allow_ in the **Permission** field.
{% endinfo_block %}

**Example**
Imagine you need to deny adding product attributes for a user. Do the following:
1. First, allow all actions for all modules for the user. For this, in **Rule** section of the **Edit Role** page, put `*` into fields **Bundle**, **Controller** and **Action**, and select _allow_ in the **Permission** field.
2.  Go to the page for which you want to restrict access: **Products > Attributes > Create Product Attributes**.

{% info_block infoBox %}
From the `zed.de.b2b-demo-shop.local/product-attribute-gui/attribute/create` link, you can already tell that:<br>
- _product-attribute-gui_ is bundle,<br>
- _attriubte_ is controller,<br>
- _create_ is action.<br>
You can verify the bundle, controller and action values in the [navigation.xml file ](https://github.com/spryker/product-attribute-gui/blob/master/src/Spryker/Zed/ProductAttributeGui/Communication/navigation.xml
{% endinfo_block %} of the product-attriubute-gui module under the *Create a Product Attribute* label:<br>
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Users+Control/Roles%2C+Groups+and+Users/Managing+Roles/Create+attribute.png){height="" width=""})

3. Go back to the **Edit Role** page and fill in the required fields:
**Bundle**: _product-attribute-gui_
**Controller**: _attriubte_
**Action**: _create_
**Permission**: _deny_
4. Click **Save**.

That's it! When the user with this role clicks **Create a Product Attribute**, they will get the **Access denied** view.
***
## Deleting a Role
To delete a role: 

1. In the **Role list > Actions** column, click **Delete** for the role that needs to be deleted.
2. This action will permanently delete the record. 
***
**Tips & Tricks**
While updating the role, you can initiate a new role creation flow.

To do that:
1. Click **Create role** in the top right corner of the **Edit Role** page. 
    The **Create new Role** page opens. 
2. Repeat the steps described in the [Creating a Role](https://documentation.spryker.com/v1/docs/managing-roles#creating-a-role) procedure.
***
**What's next?**
You need to create a group to assign this role to it. See the [Creating a Group](https://documentation.spryker.com/v1/docs/managing-groups#creating-a-group) section in _Managing Groups_.
