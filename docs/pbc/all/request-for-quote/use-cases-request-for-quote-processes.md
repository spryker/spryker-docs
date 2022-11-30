---
title: "Use cases: Request for Quote processes"
description: This document describes the use cases for Requests for Quote.
last_updated: Nov 15, 2022
template: concept-topic-template
---

This document describes the use cases of [Requests for Quote (RFQ)](/docs/pbc/all/request-for-quote/request-for-quote.html) and proposed solutions.

## Use Case 1: Long waiting time until Request for Quote (RFQ) gets processed

The request for quote process is currently not entirely efficient because it is manual. As a result, sometimes, customers have to wait for a long time until their RFQ gets approved or denied. 

### Solution

To solve this issue, merchants must react faster to quote requests. For example, they can take the following measures:
* Clarify the essential details upfront with customers.
* Automate the RFQ process where possible: create assignment criteria and define workflows with predefined thresholds per customer if needed.
* Notify customers about the processing of their RFQs through, for example, email with provided estimated delivery dates.
* Notify merchants about new or updated RFQ through, for example, email.

## Use Case 2: Marketplace customers must create separate carts and RFQs for each merchant

In Marketplace, if customers have several items from different merchants in their cart, they have to send an RFQ for each item separately. This means they have to create separate carts for products from different merchants they want to request quotes from. 

### Solution

To solve this issue, Spryker needs to introduce Marketplace support for RFQ. To achieve this, the following actions are required:
* Introduce the Split Quote feature so that different carts and quotes per merchant are automatically created.
* Display quote requests in Merchant Portal so that merchants can manage the requests (reply to the requests and change prices) or allow merchants to log in as an [agent assist](docs/scos/user/features/{{site.version}}/agent-assist-feature-overview.html) with the limitation of only seeing quote requests with their products or offers.
* Add support for frontend and backend APIs.
