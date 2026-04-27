---
title:  PunchOut Gateway
description: Find out how PunchOut Gateway works in the Spryker Shop
last_updated: Apr 27, 2026
template: howto-guide-template
redirect_from:
  - /docs/integrations/custom-building-integrations/punchout-development-plan.html
---

The PunchOut Gateway module provides a basic implementation of OCI and cXML PunchOut flows for Spryker shops.

## Supported use cases

The current implementation supports any number of simultaneously active OCI and cXML connections in a single Spryker shop.

Support for the shop integration to iFrame can only be enabled globally for the whole shop, following [this guideline](/docs/pbc/all/punchout-gateway/integrate-punchout-gateway#support-iframe-embedding).  

For OCI flow, the cart is created for every new request. The first one is named `Punchout`, the second `Punchout 1` and so forth.
Cart cleanup functionality will be implemented in the following releases.

For cXML flow, a single cart is created or reused for each `BuyerCookie` value. 



### Additional links

[Integration guide](/docs/pbc/all/punchout-gateway/integrate-punchout-gateway.html) explains how to enable cXML and OCI PunchOut flows in your Spryker shop.

[Project Configuration](/docs/pbc/all/punchout-gateway/project-configuration-for-punchout-gateway.html) documentation for details about fine-tuning the integration on the project level.

