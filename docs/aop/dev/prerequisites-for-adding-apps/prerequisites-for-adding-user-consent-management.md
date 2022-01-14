---
title: Prerequisites for adding user consent management
description: Learn about the steps you need to take before you can start working with consent managers through AOP.
template: howto-guide-template
---

This document describes the prerequisites for using consent managers through AOP

### Required modules:

* spryker/cms-slot
* spryker/asset-external
* spryker/asset-external-storage
* spryker-shop/asset-external-widget
* spryker/event
* spryker/event-aws-sns-broker (?)

### Event listeners:

* AssetExternalStorageEventSubscriber (`\Spryker\Zed\AssetExternalStorage\Communication\Plugin\Event\Subscriber\AssetExternalStorageEventSubscriber`)
* AssetExternalSubscriber (`\Spryker\Zed\AssetExternal\Communication\Plugin\Event\Subscriber\AssetExternalSubscriber`)

### Rabbit MQ queues:

* sync.storage.cms

### CMS Slots:

* external-asset-header-top

Example of a data import line:
```csv
@ShopUi/templates/page-blank/page-blank.twig,external-asset-header-top,SprykerAssetExternal,"External header top","In the very top position in the header of all pages",1 `
```

### CMS Slot content plugins:

* SprykerAssetExternal: \SprykerShop\Yves\AssetExternalWidget\Plugin\ShopCmsSlot\AssetExternalWidgetCmsSlotContentPlugin

