---
title: "Use cases: Request for Quote processes"
description: Some great use cases for the Spryker Request for Quote feature and how you can use them in your Spryker based b2b project.
last_updated: Nov 15, 2022
template: concept-topic-template
redirect_from:
- /docs/pbc/all/request-for-quote/202204.0/use-cases-request-for-quote-processes.html
---


## Use case 1: Long waiting time until Request for Quote gets processed

The [Request for Quote](/docs/pbc/all/request-for-quote/{{site.version}}/request-for-quote.html) (RFQ) process is currently not fully efficient because it's manual. As a result, sometimes customers have to wait a long time until their RFQ gets approved or denied.

### Solution

To solve this issue, merchants may need to react faster to quote requests. For example, they can take the following measures:
- Clarify the essential details ahead of time with customers.
- Automate the RFQ process where possible: create assignment criteria and define workflows with predefined thresholds per customer if needed.
- Notify customers about the processing of their RFQs—for example through an email with the provided estimated delivery dates.
- Notify merchants about new or updated RFQs through email or other means.

## Use case 2: Marketplace customers must create separate carts and RFQs for each merchant

In Marketplace, if customers have several items from different merchants in their cart, they have to send an RFQ for each item separately. This means they have to create separate carts for products from different merchants they want to request quotes from.

### Solution

To solve this issue, Spryker needs to introduce Marketplace support for RFQ. To achieve this, the following actions are required:
- Introduce the Split Quote feature so that different carts and quotes per merchant are automatically created.
- Display quote requests in Merchant Portal so that merchants can manage the requests—for example, replying to the requests and changing prices—or allow merchants to log in as an [agent](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html) with the limitation of only seeing quote requests for their products or offers.
- Add support for frontend and backend APIs.
