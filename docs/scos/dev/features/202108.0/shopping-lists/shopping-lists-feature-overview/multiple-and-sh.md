---
title: Multiple and Shared Shopping Lists overview
originalLink: https://documentation.spryker.com/2021080/docs/multiple-and-shared-shopping-lists-overview
redirect_from:
  - /2021080/docs/multiple-and-shared-shopping-lists-overview
  - /2021080/docs/en/multiple-and-shared-shopping-lists-overview
---

A shopping list is a list of the items that shoppers buy or plan to buy frequently or regularly. For example, a consumer can compile a shopping list of the products they purchase every week. Shopping lists allow a buyer to have a quick overview of the products they are planning to buy and the sum of money they are going to spend.

A shopping list is always saved, disregarding if a company user logs out and logs in again—the list is still available. The shopping list does not reserve products on stock, so adding an item to the shopping list does not affect item availability. However, a company user can easily convert any shopping list into a shopping cart to proceed with the Checkout.
There are two ways to create a shopping list:

* Through a [shopping list widget](https://documentation.spryker.com/docs/shopping-list-widget) in the header of the shop.
* From the *Shopping Lists* page in the *My Account* menu. See [Creating a shopping list](https://documentation.spryker.com/docs/shopping-lists-shop-guide#create-shopping-list) for more detailed instruction.

New items are added to shopping lists by clicking **Add to Shopping List** on the product details page.

Company users can create not just one but multiple shopping lists to be used for different needs or to purchase products at different periods.

{% info_block infoBox "Example" %}
For instance, these could be separate shopping lists for daily, weekly, and monthly purchases.
{% endinfo_block %}

The detailed information on managing shopping lists is covered in the [Shop User Guide](https://documentation.spryker.com/docs/shopping-lists-shop-guide).

## Permissions management for shared shopping lists
Users of companies with business units can **share** their shopping lists within the company business units. The shopping lists can either be shared with the entire business unit or its members. Company users can view shopping lists shared with them on the *My Account* -> *Shopping lists* page. The shopping lists can be shared by clicking **Share** on this page as well. The *Share [SHOPPING LIST NAME]* page consists of two sections: *Business Units* and *Users*. Here, the shopping list owner can select either the entire business unit or individual users to share the shopping list with.
To view how to share shopping lists with business units or its members, see the [Multiple and Shared Shopping Lists on the Storefront ](#multiple-and-shared-shopping-lists-on-the-storefront) section.

Three types of shopping list access rights can be granted:

* No access
* Read only
* Full access

### No Access
**No access** means that a shopping list is not shared and therefore can not be seen by a business unit/user.

### Read only
**_Read only_** permissions allows:

1. **Reading Shopping list**: On the *Shopping List View* page, the user sees a shopping list name, owner, access level (*Read only*), number of users the shopping list is shared with, as well as the table of items with the following information:

* Product image
* Product name
* SKU
* Product attribute
* Product options
* Product comments (see [Shopping List Notes](https://documentation.spryker.com/docs/shopping-list-notes) for more details)
* Quantity
* Item price
* Availability
* Actions: The **Add to Cart** button

{% info_block infoBox %}
Alternative products are not shown for discontinued products since they can not be basically added to the cart, and a user with *Read only* rights can not amend the shopping list by adding these products to it.
{% endinfo_block %}


2. **Changing quantity of items for adding to cart**: On the *Shopping List View* page, a user can change the item quantity to be added to cart.

3. **Printing a shopping list**: A user can print a shopping list from the *My Account*→*Shopping Lists* or page or from the *Shopping List View* page. For details, see [Multiple and Shared Shopping Lists on the Storefront ](#multiple-and-shared-shopping-lists-on-the-storefront).

4. **Adding shopping list items to cart**: A user can select the necessary which are available and add them to cart.

## Full access
**_Full access_** permissions allow:

1. Reading a shopping list: On the _Shopping List View_ page, the user sees the name of owner, access level (Full access), the number of users the shopping list is shared with, as well as the table of items with the following information:
   * Product image
   * Product name
   * SKU
   * Product attribute
   * Product options 
   * Product notes (see [Shopping List Notes](https://documentation.spryker.com/docs/shopping-list-notes) for more details)
   * Quantity
   * Item price
   * Availability
   * Actions: **Add to cart** icon, **Remove** button

{% info_block infoBox %}
Besides other products, a user with *Full access* rights is allowed to see alternatives for discontinued items, which can be added to the shopping list.
{% endinfo_block %}

2. **Changing the number of items for adding to cart**: On the *Shopping List View* page, the user can change the item quantity to be added to the cart.

3. **Printing a shopping list**: A user can print a shopping list from the *My Account*→*Shopping Lists* or page or from the *Shopping List View* page. For details, see [Multiple and Shared Shopping Lists on the Storefront ](#multiple-and-shared-shopping-lists-on-the-storefront).

4. **Editing a shopping list**: Having clicked **Edit**, the user is taken to the *Edit Shopping list* page.

5. **Changing quantity for a shopping list**: The number of items in the shopping list can be changed on the *Edit Shopping list* page.

6. **Sharing a shopping list**: A shopping list can be shared by clicking the **Share** button or the **Shared with** link.

7. **Deleting a shopping list**

8. **Deleting items in a shopping list**: The shopping list items can be deleted on the **Edit Shopping list** page.
![Shared full access](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview+v201907.0/shared-full-access.png){height="" width=""}

It is possible to grant different access rights on a shopping list to a business unit and users belonging to it. For example, a shopping list can be shared with *Read only* permissions to a business unit, but some of its users might be granted *Full access* permissions. In this case, these users will have *Full access* to the shopping list, whereas the rest of the business unit members will be entitled to *Read only* access.

## Search widget for shopping lists
Starting from v. 2019.03.0, it is possible to integrate the [Search Widget for Concrete Products](https://documentation.spryker.com/docs/search-widget-for-concrete-producs-overview-201903) feature. The search widget allows adding the products to the shopping list directly from the shopping list page. The shoppers do not need to go to product detail pages to add products to a list anymore.
:::(Warning)
Without the Search widget, you will not be able to search for products. Therefore, make sure that the Search Widget for Concrete Products feature is integrated into your project.
:::
![Search widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview+v201907.0/shopping-list-search-widget.png){height="" width=""}

## Subtotal for a shopping list
Starting from v.201907.0, every shopping list has Subtotal for all the items added to the shopping list according to the selected Price Mode and Currency.
![Subtotal for shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview+v201907.0/subtotal-for-shopping-list.png){height="" width=""}


## Multiple and Shared Shopping Lists on the Storefront 
<a name="multiple-and-shared-shopping-lists-on-the-storefront"></a> Company users can perform the following actions using the Multiple and Shared Shopping Lists feature on the Storefront:

<details>
<summary>Create, delete, and add a shopping list to cart</summary>

![create-delete-and-add-shopping-lists-to-cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/create-delete-add-to-cart-shopping-lists.gif){height="" width=""}

</details>

<details>

<summary>Edit shopping lists</summary>

![edit-shopping-lists](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/manage-shopping-lists.gif){height="" width=""}

</details>

<details>

<summary>Add products from the product details page to a shopping list</summary>

![add-products-from-the-product-detail-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/add-products-from-the-product-detail-page.gif){height="" width=""}

</details>


<details>

<summary>Dissmiss a shared shopping list, share and print a shopping list</summary>

![dismiss-share-and-print-a-shopping-list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview/dismiss-share-and-print-a-shopping-list.gif){height="" width=""}

</details>

## Current constraints
We do not support product options in Subtotal of the Shopping Lists. For example, a shopping list includes 3 office chairs, each of them cost €15. The subtotal will show €45 for 3 items. But if we add a product option, e.g., gift wrapping for €5 each to these three office chairs, the subtotal should display €60 (€15/chair + €5/gift wrapping * 3). However, the shopping list will display just the product price - €45.

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                 <li>Enable Multiple and Shared Shopping Lists in your project:</li>
                  <li><a href="https://documentation.spryker.com/docs/shopping-lists-feature-integration" class="mr-link">Integrate the Shopping Lists feature</li>
                 <li><a href="https://documentation.spryker.com/docs/prices-feature-integration" class="mr-link">Integrate the Prices feature into your project</a></li>
            </ul>
        </div>
         <!-- col3 -->
    </div>
</div>

