---
title: Agent Assist Feature Overview
originalLink: https://documentation.spryker.com/v3/docs/agent-assist-overview
redirect_from:
  - /v3/docs/agent-assist-overview
  - /v3/docs/en/agent-assist-overview
---

An **agent** is a person who helps customers to perform various activities in an online store. For example, a customer might call an agent and ask him/her to help choose a right product and assist in the buying process or even perform some actions in the web-shop for them. Say the customer is willing to add items to shopping list, or create a company, but can not do it for some reason. This is when the agent comes in and provides practical support by carrying out actions on customer's behalf in the web-shop.

The agent user can be created in the Back Office under _Users Control → User_.

{% info_block infoBox %}
In fact, any Back Office user can be agent, all you need to do for that is select the _This user is an agent check-box_ on the _User create/edit page_, and the user gets the Agent mark. See Adding New Users to learn more how to create a new agent user in the Admin UI.
{% endinfo_block %}

![zed-agent-assist.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Agent+Assist/Agent+Assist+Feature+Overview/zed-agent-assist.png){height="" width=""}

## How does it work?
To act on customer's behalf, the agent signs in to web-shop via `http://mysprykershop.com/agent/login` link with the agent account details and selects the right customer by typing their name or email in the customer search field.

![customer-assitent.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Agent+Assist/Agent+Assist+Feature+Overview/customer-assitent.png){height="" width=""}

Once necessary customer is found in the customer search field, the agent clicks **Confirm**.

{% info_block infoBox %}
This virtually logs the agent in to the web-shop under the selected customer, so he/she sees the webshop just the way the customer does: with all their wishlists, shopping lists etc., and can do anything the customer asked for.<br>If customer's cart is stored in the database (not in session
{% endinfo_block %}, the agent sees the cart and all its items as well.)

Having performed the necessary actions requested by the customer, the agent ends the customer assistance session by clicking **End Customer Assistance**.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Agent+Assist/Agent+Assist+Feature+Overview/customer-session.png){height="" width=""}
