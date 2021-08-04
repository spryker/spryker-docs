---
title: Comments Feature Overview
originalLink: https://documentation.spryker.com/v3/docs/comments-feature-overview
redirect_from:
  - /v3/docs/comments-feature-overview
  - /v3/docs/en/comments-feature-overview
---

The Comments feature provides the ability for online owners to add Comments Widget. The widget allows the customers to leave comments, special requests or instructions to any entity in the Spryker shop and tag these comments depending on your project specification. 

An **Entity** is a unit or a component that has some properties and may have relationships with other entities within a system. So, in terms of Spryker Commerce OS, an entity is represented by a Shopping Cart, a Shopping List, a CMS page, etc. It is where the Comments Widget can be located.

As an example of this generic solution, we have implemented Comments on the Shopping Cart page.

Comments help multiple customers to have a dialog on the cart contents. How does it work? Let's imagine a situation where you have a company account and three HR members (HR assistant, HR manager and the head of HR department) who are responsible for purchasing the products for the whole office. They share the same shopping cart. The HR assistant adds the products to the shopping cart and includes a comment requesting to review the shopping cart by an HR manager. With the help of comments, they decide on the final quantity of the products and finalize the shopping cart contents. After the shopping cart is ready, HR manager adds a comment for the head of HR department to approve the total price. By means of the conversation in the cart comments, the head of the department makes the latest corrections to the cart's contents and attaches the important comments concerning the shipping of some products to the shopping cart. From now on, HR assistant can proceed to Checkout. The attached comments will be available on the Checkout page and if the order is successfully placed - in the order history.

Thus, the Comments feature enables your B2B customers to effectively communicate and discuss the purchases with colleagues, thereby improve customer satisfaction and speed up the process by avoiding additional communication outside of the context.

## Comments Widget
Within the Comments feature, we have created the Comments Widget. The widget can be placed on any entity page, in our case - it is a Shopping Cart page. 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Comments/comments-shopping-cart.png){height="" width=""}

Company users can perform the following actions using the Comment Widget:

* [Add a comment](https://documentation.spryker.com/v3/docs/managing-comments-shop-guide#adding-a-comment-to-the-cart)
* [Edit a comment](https://documentation.spryker.com/v3/docs/managing-comments-shop-guide#editing-a-comment-in-the-cart)
* [\(Un\)Tag a comment](https://documentation.spryker.com/v3/docs/managing-comments-shop-guide#-un-tagging-a-comment-in-the-cart)
* [\(Un\)Filter comments per tag](https://documentation.spryker.com/v3/docs/managing-comments-shop-guide#-un-filtering-a-comment-in-the-cart)
* [Remove the comment](https://documentation.spryker.com/v3/docs/managing-comments-shop-guide#removing-a-comment)

The comment contains the following information:

* Company user's name
* Date when the comment was left
* Contents of the comment
* Comment Tag

Company users can add comments to a shared cart in both Read-only and Full Access permissions. A user can also add a comment before submitting the order, on the Checkout Summary page:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Comments/checkout-summary-page-comment.png){height="" width=""}

as well as post factum, after the order has been placed, on the Order History page:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Comments/order-history-comments.png){height="" width=""}

{% info_block warningBox "Note" %}
When reordering the existing order, the comments attached to the order are not duplicated.
{% endinfo_block %}
When the order with the attached comments is placed, the Back Office user can view it with the comments in the Back Office > Orders section. 

### Comment Tags
Every comment may be tagged.
**Tags** are keywords associated with the comments. The tags are added to group the comments sharing a similar idea or topic. For example, you may have several comments where colleagues have covered the details on how the order should be delivered, so you may tag these comments with "Delivery" tag for convenience. Also, in the drop-down menu, you can filter the comments according to tags added.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Comments/filter-tags.png){height="" width=""}

{% info_block warningBox "Note" %}
To create a new tag, see [HowTo - Add a New Tag for Comment](/docs/scos/dev/tutorials/201907.0/howtos/ht-adding-new-t
{% endinfo_block %}.)

### Module Relations in the Comments Feature
Module Relations in the Comments feature are represented in the following schema:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Comments/techspec-comments-module-diagram.png){height="" width=""}
