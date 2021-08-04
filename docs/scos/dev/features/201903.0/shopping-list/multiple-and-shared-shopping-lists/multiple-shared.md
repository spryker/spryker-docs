---
title: Multiple and Shared Shopping Lists Overview
originalLink: https://documentation.spryker.com/v2/docs/multiple-shared-shopping-list-overview
redirect_from:
  - /v2/docs/multiple-shared-shopping-list-overview
  - /v2/docs/en/multiple-shared-shopping-list-overview
---

Shopping list is a list of the items that shoppers buy or plan to buy frequently or on a regular basis. For example, a consumer can compile a shopping list of the products they purchase every week.

## Creating and Managing (Multiple) Shopping Lists

There are two ways to create a shopping list:

* through a [shopping list widget](/docs/scos/dev/features/201903.0/shopping-list/shopping-list-widget/shopping-list-w) in the header of site
* from *Shopping Lists* page in *My Account* menu

New items are added to shopping lists by clicking **Add to Shopping List** on the product details page.

Customers can create not just one, but **multiple shopping lists** to be used for different needs or to purchase products at different time periods.

{% info_block infoBox %}
These could be, for instance, separate shopping lists for daily, weekly and monthly purchases.
{% endinfo_block %}

After a shopping list has been created, it appears in the shopping lists table on *Shopping Lists* page in *My Account*. To place an order, customers simply select the check box next to each shopping list, the items of which they wish to order, and click **Add selected to cart**.

The table with shopping lists shows details for each of the lists, including:

* Name of shopping list owner, i.e. person who created the shopping list
* Creation date
* Possible actions to manage shopping lists: [edit](#edit), [print](/docs/scos/dev/features/201903.0/shopping-list/printing-a-shopping-list/printing-shoppi), [delete](#deleted), [share](#share), [dismiss](#dismiss) (for shared shopping lists)

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/lists-table.png){height="" width=""}


When clicking **Edit**<a name="edit"></a> for a shopping list, the customer is taken to *Edit shopping list* page, where they can:

* Rename shopping list
* Remove shopping list items
* View shopping list access rights granted to them
* Change quantity of items in the shopping list
* Add comments to items (check [Shopping list notes](/docs/scos/dev/features/201903.0/shopping-list/shopping-list-notes/shopping-list-n) for more details)
* [Delete](#deleted) the shopping list

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/edit-shopping-list.png){height="" width=""}


## Permissions Management for Shared Shopping Lists

Users of companies with business units can **share** <a name="share"></a>their shopping lists within the company business units. The shopping lists can either be shared with the entire business unit, or its individual members. Customers can view shopping lists shared with them, on *My Account->Shopping lists* page. The shopping lists can be shared  by clicking **Share** at this page as well. The *Share [SHOPPING LIST NAME]* page consists of two sections: Business Units and Users. Here, the shopping list owner can select either entire business units, or individual users to share the shopping list with.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/share-shopping-list.png){height="" width=""}


There are three types of shopping list access rights that can be granted

* no access
* read only
* full access

### No Access

**No access** means that shopping list is not shared and therefore can not be seen by a business unit/user.

### Read only

**Read only** permissions allows:

1. **Reading Shopping list**: On the *Shopping List View* page, the user sees shopping list name, owner, access level (*Read only*), number of users the shopping list is shared with, as well as table of items with the following information:

* Product image
* Product name
* SKU
* Product attribute
* Product options 
* Product comments (see [Shopping List Notes](/docs/scos/dev/features/201903.0/shopping-list/shopping-list-notes/shopping-list-n) for more details)
* Quantity
* Item price
* Availability
* Actions: **Add to Cart** button

{% info_block infoBox %}
Alternative products are not shown for discontinued products, since they can not be basically added to cart, and user with *Read Only* rights can not amend shopping list by adding these products to it.
{% endinfo_block %}

2. **Changing quantity of items for adding to cart**: On the *Shopping List View* page, the user can change the item quantity to be added to cart

3. **Printing shopping list**: Check [Printing Shopping list](/docs/scos/dev/features/201903.0/shopping-list/printing-a-shopping-list/printing-shoppi) to learn how it works

4. **Adding shopping list items to cart**: The user can select the necessary which are available and add them to cart

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/shared-read-only.png){height="" width=""}


### Full access

**Full access** permissions allows:

1. **Reading Shopping list**: On the *Shopping List View* page, the user sees the name of owner, access level (*Full access*), number of users the shopping list is shared with, as well as table of items with the following information:
  - Product image
  - Product name
  - SKU
  - Product attribute
  - Product options 
  - Product notes (see [Shopping List Notes](/docs/scos/dev/features/201903.0/shopping-list/shopping-list-notes/shopping-list-n) for more details)
  - Quantity
  - Item price
  - Availability
  - Actions:**Add to cart** icon,**Remove** button 

{% info_block infoBox %}
Besides other products, user with *Full access* rights is allowed to see  alternatives for discontinued items, which can be added to the shopping list.
{% endinfo_block %}
2. **Changing quantity of items for adding to cart**: On the *Shopping List View* page, user can change the item quantity to be added to cart
3. **Printing shopping list**: See [Printing a Shopping List](/docs/scos/dev/features/201903.0/shopping-list/printing-a-shopping-list/printing-shoppi) to learn how it works
4. **Editing shopping list**: Having clicked **Edit**, the user is taken to *Edit Shopping list* page
5. **Changing quantity for changing it for shopping list**: The amount of items in the shopping list can be changed on *Edit Shopping list* page
6. **Sharing shopping list**: The shopping list can be shared by clicking *Share* button or *Shared with* link
7. **[Deleting shopping list](#deleted)**
8. **Deleting items in shopping list**: The shopping list items can be deleted on *Edit Shopping list* page

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/shared-full-access.png){height="" width=""}


It is possible to grant different access rights on shopping list to a business unit and users belonging to it. For example, a shopping list can be shared with *Read only* permissions to a business unit, but some of its users might be granted *Full access* permissions. In this case, these users will have *Full access* for the shopping list, whereas the rest of the business unit members will be entitled to *Read only* access.

If user does not need a list, that has been shared with them, it is possible to remove it from their shopping lists and thus cancel the sharing. To do so, the user clicks **Dismiss** <a name="dismiss"></a>on *Shopping Lists* page in *Actions* next to the respective shared shopping list. It is possible to dismiss sharing shopping lists with both *Read only* and *Full access* rights. Own shopping lists can not be dismissed.

A shopping list can be **deleted**<a name="deleted"></a> on *Shopping Lists* and *Shopping List Edit* pages.

{% info_block warningBox %}
Deleting a shared shopping list also deletes it for users it has been shared with.
{% endinfo_block %}
