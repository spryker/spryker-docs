---
title: Gift Cards Schema
originalLink: https://documentation.spryker.com/2021080/docs/db-schema-gift-cards
redirect_from:
  - /2021080/docs/db-schema-gift-cards
  - /2021080/docs/en/db-schema-gift-cards
---


## Gift Cards

### Gift Card Code

{% info_block infoBox %}
Enable your customers to buy gift cards with flexible amounts of money and to give it to friends as a gift. They can apply it like a voucher code during checkout and pay their whole orders or a part of it.
{% endinfo_block %})

{% info_block errorBox %}
Gift cards are not Discounts!
{% endinfo_block %}
![Gift cards](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Gift+Cards+Schema/gift-card.png){height="" width=""}

**Structure**:

* A Gift Card has a name and a code that can be entered by the Customer.

  - *value* - The money value of the Gift Card.
  - *currency* - Ever Gift Card has a fixed currency.


### Gift Card Product

{% info_block infoBox %}
A Gift Card Product is a regular product in the shop which represents a Gift Card that Customer can buy.
{% endinfo_block %}
![Gift card product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Gift+Cards+Schema/gift-card-product.png){height="" width=""}

**Structure**:

* **Gift Card Abstract Configuration**:

  - The Abstract Product represents a specific type of Gift Cards with a code pattern (e.g. "XMAS-")
  - *code_pattern* - Pattern that is used to create the unique code of the produced Gift Card after the purchase

* **Gift Card Configuration**:

  - The Concrete Product represents a specific value that will be used to produce the Gift Card (e.g. "5 Euro")
  - *value* - This is the money value which will be used to produce the Gift Card


### Gift Card Balance and Payment

{% info_block infoBox %}
Gift Cards are used to pay orders. If the Grand Total is higher than the Gift Card Amount then there is some left over. This is saved as a balance.
{% endinfo_block %}
![Gift card balance and payment](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Gift+Cards+Schema/gift-card-purchase-payment.png){height="" width=""}

**Structure**:

* Each Gift Card can be used for multiple Sales Orders. The applied amount is saved into *spy_gift_card_balance_log* per Sales Order. So to retrieve the used amount these rows need to be summed up. There is no way to refund a balance. In case of a refund, the system needs to create another Gift Card.
* When a Sales Order is saved then the table *spy_sales_payment* contains all used Payment Methods. As the Gift Card is a Payment Method, this needs to be saved here as well.
* There is an additional table *spy_payment_gift_card* which holds the used code.
