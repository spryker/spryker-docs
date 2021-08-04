---
title: RatePay - How to Disable Address Updates from the Backend Application
originalLink: https://documentation.spryker.com/v6/docs/ratepay-disable-address-updates
redirect_from:
  - /v6/docs/ratepay-disable-address-updates
  - /v6/docs/en/ratepay-disable-address-updates
---

To disable updates on addresses from the backend application, follow the steps described below:

**Step 1**:

* Overwrite on project side
`/vendor/spryker/spryker/Bundles/Sales/src/Spryker/<br>Zed/Sales/Presentation/Detail/boxes/addresses.twig`
* Remove ' `Edit`' button

**Step 2**:

* Overwrite on project side
`/vendor/spryker/spryker/Bundles/Sales/src/Spryker/<br>Zed/Sales/Communication/Controller/EditController.php`
* Disable ' `addressAction`'
