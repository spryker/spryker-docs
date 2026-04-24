---
title:  PunchOut Gateway
description: Find out how how Punchout Gateway works in the Spryker Shop
last_updated: Apr 24, 2026
template: howto-guide-template
---

PunchOut Gateway module provides basic implementation 

## Support Use Cases

Current implementation supports any number of simultaneously active OCI and cXML connections inn one Spryker shop.

Support for the shop integration to iFrame can only be enabled globally for the whole shop, following [this guideline](/docs/pbc/all/punchout-gateway/integrate-punchout-gateway#support-iframe-embedding).  

For OCI flow, the cart is created for every new request. The first one is named `Punchout`, the second `Punchout 1` and so forth.
Cart cleanup functionality will be implemented in the following releases.

For cXML flow, a single cart is created or reused for each `BuyerCookie` value. 



### Additional links

Check [integration guide](docs/pbc/all/punchout-gateway/integrate-punchout-gateway) to integrate PunchOut Gateway module into your Spryker shop.

Check [project configuration](docs/pbc/all/punchout-gateway/project-configuration-for-punchout-gateway) documentation for details about fine-tuning the integration on the project level.

