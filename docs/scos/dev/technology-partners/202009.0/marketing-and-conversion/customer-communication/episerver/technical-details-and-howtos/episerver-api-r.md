---
title: Episerver - API Requests
originalLink: https://documentation.spryker.com/v6/docs/episerver-api-requests
redirect_from:
  - /v6/docs/episerver-api-requests
  - /v6/docs/en/episerver-api-requests
---

`\SprykerEco\Zed\Episerver\Business\Api\Adapter\EpiserverApiAdapter` contains all needed data for sending it to Episerver for events.

It sends the request via `\Generated\Shared\Transfer\EpiserverRequestTransfer`

**OmsDependencyProvider**

```html
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd" >
 
    <transfer name="EpiserverResponse">
        <property name="isSuccessful" type="bool" />
        <property name="status" type="int" />
    </transfer>
 
    <transfer name="EpiserverRequest">
        <property name="authorizationCode" type="string" />
        <property name="operationType" type="string" />
        <property name="payload" type="array" />
    </transfer>
 
</transfers>
```

The payload for Customer loads from `\SprykerEco\Zed\Episerver\Business\Mapper\Customer\CustomerMapper::buildPayload`, for Order from `\SprykerEco\Zed\Episerver\Business\Mapper\Order\AbstractOrderMapper` and for Newsletter from `\SprykerEco\Zed\Episerver\Business\Mapper\Customer\CustomerNewsletterMapper`.

The abstract classes can be extended and changed in `\SprykerEco\Zed\Episerver\Business\EpiserverBusinessFactory`.
