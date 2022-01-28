---
title: Reference information - return item states
description: This guide provides reference information on  return item states.
last_updated: Aug 27, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/return-item-states-reference-information
originalArticleId: 8155623f-8fa8-4f3c-aa5d-a5e5ebbafbfd
redirect_from:
  - /v6/docs/return-item-states-reference-information
  - /v6/docs/en/return-item-states-reference-information
related:
  - title: Return Management Feature Overview
    link: docs/scos/user/features/page.version/return-management-feature-overview/return-management-feature-overview.html
  - title: Managing Returns
    link: docs/scos/user/back-office-user-guides/page.version/sales/returns/managing-returns.html
---

Once a return has been created, it acquires the *Waiting for return* state. You can trigger the following states for the returns on the *Overview of Returns [Return ID]* page:

| Return state | Description |
| --- | --- |
| execute-return | Select this state if you accept the return. When triggering this state, the return status is changed to *Returned*. |
| refund  | Select this state if you have refunded the returned items. When triggering this state, the return status is changed to *Refunded*. |
| cancel-return | You can trigger this state after the *Waiting for return* state. Select this state if either customer changed their mind and doesn’t want to make the return any more, or you cancel the return due to the return policy, or for other reasons. When triggering this state, the return status is changed to *Canceled*. |
| ship-return | You can trigger this state after the *Cancel* return state. Select this state if you shipped the canceled return back to customer. The return status is changed to *Shipped to customer.* |
| delivery-return | You can trigger this state after the *Shipped to customer*. Select this state if the return has been delivered to customer. The return status is changed to *Delivered*. |
| close | You can trigger this state after the *Delivered* state. Select this state to close the return. The return status is changed to *Closed*. |
