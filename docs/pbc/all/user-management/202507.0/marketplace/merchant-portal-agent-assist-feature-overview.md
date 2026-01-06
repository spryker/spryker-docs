---
title: Merchant Portal Agent Assist feature overview
description: An agent in Merchant Portal helps merchants to perform activities in the Merchant Portal
last_updated: Jan 14 2024
template: concept-topic-template
---

The Merchant Portal Agent Assist feature enables Marketplace operators to impersonate merchant users.
A Merchant Agent is a Marketplace operator user with deep product knowledge who can help merchants perform different activities in the Merchant Portal on behalf of the merchants.

Here are some examples of when Marketplace operator users could assist merchants by logging in to the Merchant portal with the Agent permissions:

- A merchant needs help with order processing or any other feature like creating or editing products and offers in the Merchant Portal.
- New merchants are onboarded to the Marketplace. An operator could make necessary pre-configurations or create certain things like account information, products, and offers.
- Merchants provide feedback on aspects of the portal that can be improved for a better user experience.

## Setting up a Merchant Agent

To act as a Merchant Agent, the Marketplace Operator user must have the Agent permissions assigned to them in the Back Office. See [Create users](/docs/pbc/all/user-management/latest/marketplace/back-office-create-users.html) for information on how to do that.

![merchant-agent-in-the-back-office](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/user-management/marketplace/merchant-portal-agent-assist-feature-overview/agent-merchant-in-bo.png)

## Agent Assist in Merchant Portal

To act on a merchant's behalf, the Merchant Agent signs in to the Merchant Portal with the Merchant Agent credentials on a dedicated Agent Assist Login page and finds the necessary merchant user. To impersonate this user, the agent clicks **Assist User**, and then **Confirm** to impersonate them.
This logs the agent into the selected merchant account so they see the Merchant Portal as the merchant user does. To finish the merchant assistance session, the agent clicks **End User Assistance**.

This is how the Agent Assist in Merchant Portal feature works in the Merchant Portal:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/user-management/marketplace/merchant-portal-agent-assist-feature-overview/agent-merchant-in-merchant-portal.mp4" type="video/mp4">
  </video>
</figure>

## Related Developer Documents

[Install the Merchant Portal Agent Assist feature](/docs/pbc/all/user-management/latest/marketplace/install-and-upgrade/install-the-merchant-portal-agent-assist-feature.html)
