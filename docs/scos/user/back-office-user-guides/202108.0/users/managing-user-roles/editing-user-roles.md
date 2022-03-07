---
title: Editing user roles
description: Learn how to edit roles in the Back Office.
template: back-office-user-guide-template
---

This document describes how to edit roles in the Back Office.

## Prerequisites

To start working with roles, go to **Users** > **User Roles**.

Review the [reference information](#reference-information-editing-roles) before you start, or look up the necessary information as you go through the process.

## Editing roles

1. On the **User Roles** page, click **Edit** next to the role you want to edit.
2. In the **Role** pane, update the **NAME** and click **Save**.
3. In the **Rule** pane, enter a **BUNDLE**.
4. Enter a **CONTROLLER**.
5. Enter an **ACTION**.
6. Select a **PERMISSION**
7. Click **Add Rule**.
      The page refreshes with the success message displayed and the ruled displayed in the **Assigned Rules** section.
8. Repeat steps 3-7 until you add all the needed rules.
9. In the **Assigned Rules** section, delete one or more rules by clicking **Delete** next to the rules you want to delete.

After you update the name, add or delete a rule, the changes are saved automatically. After you finish editing the role, to go back to the list of roles, in the top right corner, click **< List of roles**.

### Reference information: Editing roles

The following table describes the attributes you enter and select when editing roles:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Unique identifier of the role. You use this name to assign roles when managing users. |
| BUNDLE | Depending on the **PERMISSION**, allows or denies access to a part of a module. You can look up this value in a URL. For example, in `https://backoffice.de.b2b-demo-shop.local/product-attribute-gui/attribute/create`, `product-attribute-gui` is a bundle. |
| CONTROLLER | Depending on the **PERMISSION**, allows or denies access to a part of a module. You can look up this value in a URL. For example, in `https://backoffice.de.b2b-demo-shop.local/product-attribute-gui/attribute/create`, `attribute` is a controller. |
| ACTION | Depending on the **PERMISSION**, allows or denies access to a part of a module. You can look up this value in a URL. For example, in `https://backoffice.de.b2b-demo-shop.local/product-attribute-gui/attribute/create`, `create` is an action.
| PERMISSION | Denies or allows access to the **BUNDLE**, **CONTROLLER**, and **ACTION**. |


**Tips and tricks**

 To allow or deny access for all of the bundles, controllers or actions, enter `*` in the needed field.

 The bundle, controller, and action values can also be found in the `navigation.xml` file either at
 at `/project/config/Zed/navigation.xml` or at ```https://github.com/spryker/[bundle_name]/src/Zed/[bundle_name]/communication/navigation.xml```.
 See the example of the `navigation.xml` file of the AvailabilityGui module:

 <details open>
 <summary markdown='span'>navigation.xml</summary>

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

 Information about modules is available in their readme files. Check the [readme file of the AvailabilityGui](https://github.com/spryker/availability-gui/blob/master/README.md) module for example.

 {% endinfo_block %}
