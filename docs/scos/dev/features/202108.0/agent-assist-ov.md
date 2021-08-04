---
title: Agent Assist feature overview
originalLink: https://documentation.spryker.com/2021080/docs/agent-assist-overview
redirect_from:
  - /2021080/docs/agent-assist-overview
  - /2021080/docs/en/agent-assist-overview
---

An *agent* is a person with unrivaled product knowledge who can help customers perform different activities in the Storefront. For example, a customer might call an agent and ask them to help choose the right product or assist with the buying process or even perform some actions in the Storefront on their behalf. Say, a customer wants to add items to a shopping list or create a company but cannot do it for some reason. This is when the agent steps in and provides practical support acting on the customer's behalf.



## Setting up an agent user

Every agent user is a Back Office user. When creating or editing a Back Office user, you can make them an agent assist by selecting this option.

A Back Office user can create an agent user in **Users** > **Users**.

To learn more about managing agent users in Back Office, see [https://documentation.spryker.com/docs/managing-users](https://documentation.spryker.com/docs/managing-users) 

![zed-agent-assist.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Agent+Assist/Agent+Assist+Feature+Overview/zed-agent-assist.png)

## Agent Assit feature on the Storefront

To act on a customer's behalf, the agent signs in at `https://mysprykershop.com/agent/login` with the agent account details and searches for the desired customer by typing their name or email in the customer search field.

![customer-assitent.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Agent+Assist/Agent+Assist+Feature+Overview/customer-assitent.png)

Once they find the desired customer, they select **Confirm** to impersonate them.

This logs the agent into the selected customer account, so they see the shop the way the customer does and can do anything the customer asks for. If a customer's cart is stored in the database, the agent can see and manage the cart and its items. If the cart is stored only in the customer's session, the agent can't manage it.

After performing all the requested actions, the agent ends the customer assistance session by selecting **End Customer Assistance**.

<!-- ![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Agent+Assist/Agent+Assist+Feature+Overview/customer-session.png) -->

This is how the Agent Assist feature works on the Spryker Demo Shop Storefront:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Agent+Assist/Agent+Assist+Feature+Overview/shop-guide-managing-agent-account.gif)


Check out this video tutorial on setting up an Agent user in a B2B company account:
<iframe src="https://spryker.wistia.com/medias/5zraqrascy" title="Agent Assist" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/authenticating-as-an-agent-assist" class="mr-link">Authenticate as an agent assist via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/searching-by-customers-as-an-agent-assist" class="mr-link">Search by customers as an agent assist via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/impersonating-customers-as-an-agent-assist" class="mr-link">Impersonate customers as an agent assist via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-agent-assist-authentication-tokens" class="mr-link">Manage agent assist authentication tokens via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/agent-assist-feature-integration" class="mr-link">Integrate the Agent Assist feature</a></li>
                <li>Integrate the Agent Assist API:</li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-agent-assist-feature-integration" class="mr-link">Integrate the Agent Assist Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/customer-account-management-agent-assist-feature-integration" class="mr-link">Integrate the Customer Account Management + Agent Assist feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/customer-account-management-feature-integration" class="mr-link">Integrate the Customer Account Management feature</a></li>
            </ul>
        </div>
         <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-users#creating-users" class="mr-link">Create an agent user</a></li>
               </ul>
        </div>
        </div>
</div>



