---
title: Voucher Codes- Reference Information
originalLink: https://documentation.spryker.com/v4/docs/voucher-codes-reference-information
redirect_from:
  - /v4/docs/voucher-codes-reference-information
  - /v4/docs/en/voucher-codes-reference-information
---

This topic describes the information that you need to know when working with voucher codes in the **Voucher code** tab.
***
You enter and select the following attributes on the **Edit Discount > Voucher code** tab:

| Attribute | Description |  
| --- | --- |
| **Quantity** | The number of vouchers you need to generate. |  
| **Custom code** | When generating a single voucher code, you can enter it manually. If you want to create multiple codes at once, add a "Random Generated Code Length" to the custom code.|  
| **Add Random Generated Code Length** | This value defines the number of random characters to be added to the custom code. If you do not add any custom value, you can just select this value. The system will generate the codes with the length you select. |  
| **Max number of uses (0 = Infinite usage)** | Defines the maximum number of times a voucher code can be redeemed in a cart. |  

Use the placeholder **[code]** to indicate the position you want random characters to be added to. 
</br>**For example:**
   * **123[code]** (the randomly generated code will be added right after the custom code);
   *  **[code]123** (the randomly generated code will be added in front of the custom code).
***
**Maximum number of uses**
| Value | Behavior |  
| --- | --- | 
| **0** | Infinitely redeemable. |  
| **1** | The voucher can be redeemed once. |  
| **n > 1** | The voucher can be redeemed _n_ times. |  

![Voucher code](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Voucher+Codes:+Reference+Information/voucher-code.png){height="" width=""}

***
**Voucher Code Pool**
The voucher codes of a discount are all contained in the same voucher code pool. One customer may only redeem one voucher code per pool per cart.
