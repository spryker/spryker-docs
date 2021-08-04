---
title: Return Item States- Reference Information
originalLink: https://documentation.spryker.com/v5/docs/return-item-states-reference-information
redirect_from:
  - /v5/docs/return-item-states-reference-information
  - /v5/docs/en/return-item-states-reference-information
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
