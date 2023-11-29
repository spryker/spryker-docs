---
title: Inxmail API requests
description: Learn about the API requests for Inxmail in Spryker.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
    - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/customer-communication/inxmail/inxmail-api-requests.html
---

This document contains API requests for Inxmail.

`\SprykerEco\Zed\Inxmail\Business\Api\Adapter\EventAdapter` which extend `\SprykerEco\Zed\Inxmail\Business\Api\Adapter\AbstractAdapter` contains all needed data for sending data to Inxmail for events.

It sends the request via `&#xA0;\Generated\Shared\Transfer\InxmailRequestTransfer`
```xml
 <?xml version="1.0"?>
 <transfers xmlns="http://xsd.spryker.com"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://static.spryker.com http://static.spryker.com/transfer-01.xsd">

 <transfer name="InxmailRequest">
 <property name="event" type="string" />
 <property name="transactionId" type="string" />
 <property name="payload" type="array" />
 </transfer>

 </transfers>
 ```

The payload for customer loads from `\SprykerEco\Zed\Inxmail\Business\Mapper\Customer\AbstractCustomerMapper::getPayload` and for order from `\SprykerEco\Zed\Inxmail\Business\Mapper\Order\AbstractOrderMapper`. Abstract classes can be extended and changed in `\SprykerEco\Zed\Inxmail\Business\InxmailBusinessFactory.`

For right URL's to images in the email body you should extend `\SprykerEco\Zed\Inxmail\Business\Mapper\Order\AbstractOrderMapper` and implement protected method `getImageItemLink(ArrayObject $images)`.
