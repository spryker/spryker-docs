---
title: Managing returns
originalLink: https://documentation.spryker.com/2021080/docs/managing-returns
redirect_from:
  - /2021080/docs/managing-returns
  - /2021080/docs/en/managing-returns
---

After a [return](https://documentation.spryker.com/2021080/docs/return-management-feature-overview) has been [created by a Back Office User](https://documentation.spryker.com/2021080/docs/managing-orders#creating-a-return) or by a [Shop User](https://documentation.spryker.com/2021080/docs/shop-guide-creating-a-return), it appears on the *Orders > Returns* page. On this page, you can manage the returns as follows:

* View the return details
* Set the return statuses
* Print the return slip

---

## Prerequisites

To start managing returns, navigate to **Sales** > **Returns**.

## Viewing returns

{% info_block infoBox "Info" %}

Returns of the registered and guest users have different return references. See [the Returns section](https://documentation.spryker.com/2021080/docs/managing-orders#returns-section) for details on the return references.

{% endinfo_block %}
To view details on a return, in the *Actions* column of the return, click **View**. This takes you to the *Return Overview [Return Reference]* page, where you can view the return details, set the return statuses and print the return slip as described below.

### Reference information: Viewing returns

This section contains reference information from the *List of Returns* and *Overview of Return [Return Reference]* pages.

#### List of Returns page

On the *List of Returns* page, you see the following:

* Return reference
* Order reference
* Return Products (number of the sales order items that were returned)
* Return Date
* State
* Actions

By default, the last created return goes on top of the table. However, you can sort and search the list of returns.

All columns with headers having arrows in the *List of Returns* table are sortable.

**Actions Column**

All the return management options that you can invoke from the *Actions* column on the *List of Returns* page are described in the following table.

| ACTION | DESCRIPTION |
| --- | --- |
| View | Takes you to the *Overview of Return: [Return Reference]* page. Here, you can find all the information about the chosen review. |
| Print Slip | Takes you to the print version of the return slip. |

#### Overview of Return [Return Reference] page

The following table describes the attributes on the *Overview of Return [Return Reference]* page when you view a return.

**Returned Items section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Product | List of all items included in the return. |
| Quantity | Product quantity. |
| Price | Product price. |
| Price | Total amount paid for the item. |
| State | Return state for the item. |
| Trigger event | List of all states of the return in the sales order items. |
| Trigger all matching states | States that you can trigger for all items in the return at once. |

**Total section**

The *Total* section displays the total amount of items to be returned.

**General Information section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Order Reference | Reference number of the order. |
| Return Reference | Reference number of the return. |
| Return Date | Date when the return was created. |
| State | State of the return. |

**Customer section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Customer reference | Reference of the customer. |
| Name | Customer name. |
| Email | Customer’s email address. |

## Setting return statuses

You can either accept the returns created by the Back Office users or by the customers or cancel them if the returns are no longer relevant, can not be made due to the Return Policy, or for another reason. 

To set and track the return statuses, you trigger the return states. 

To trigger the return states:

1. On the *Returns* page, click **View** in the *Actions* column. This takes you to the *Return Overview [Return Reference]* page.

2. In the *Trigger all matching state* section, click the necessary state. The return state changes, and the new states that you can trigger appear.
![Trigger states](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Returns/trigger-status.png){height="" width=""}
 
{% info_block infoBox "Info" %}

The triggered return states are reflected in the [customer account on the Storefront](https://documentation.spryker.com/2021080/docs/shop-guide-creating-a-return), informing customers about the statuses of their returns.<!--- You can rename the default statuses that display on the Storefront so they would make more sense for the Storefront users. See *Display Custom Names for Order Item States on the Storefront* for details on how to do that.-->

{% endinfo_block %}

**Tips & tricks**

To trigger the return states for all the items in the return, click the states at the *Trigger all matching states* field. To trigger the return states for individual items of the return, trigger the states in the *Trigger event* column for the necessary items. 

### Reference information: Setting return statuses

Once a return has been created, it acquires the *Waiting for return* state. You can trigger the following states for the returns on the *Overview of Returns [Return ID]* page:

| RETURN STATE | DESCRIPTION |
| --- | --- |
| execute-return | Select this state if you accept the return. When triggering this state, the return status is changed to *Returned*. |
| refund  | Select this state if you have refunded the returned items. When triggering this state, the return status is changed to *Refunded*. |
| cancel-return | You can trigger this state after the *Waiting for return* state. Select this state if either the customer doesn’t want to make the return anymore, or you cancel the return due to the return policy, or for other reasons. When triggering this state, the return status is changed to *Canceled*. |
| ship-return | You can trigger this state after the *Cancel* return state. Select this state if you shipped the canceled return back to the customer. The return status is changed to *Shipped to customer.* |
| delivery-return | You can trigger this state after *Shipped to customer*. Select this state if the return has been delivered to the customer. The return status is changed to *Delivered*. |
| close | You can trigger this state after the *Delivered* state. Select this state to close the return. The return status is changed to *Closed*. |

## Printing a return slip
For all returns, irrespective of their statuses, you can print the automatically generated [return slip](https://documentation.spryker.com/2021080/docs/return-management-feature-overview#return-slip). 

To print the return slip:

* In the *Actions* column on the *List of Returns* page, click **Print slip**. 
* On the *Return Overview [Return Reference]* page, click **Print Return Slip**.

This takes you to the page with the print version of the return slip.

