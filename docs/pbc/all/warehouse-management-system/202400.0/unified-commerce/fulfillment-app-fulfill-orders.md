## Picking using the Fulfillment App

Follow the guide below to learn how to pick order items using our Fulfillment App.
The Fulfillment App allows warehouse users to start the picking process for a picklist, and easily mark items in the picklist as picked or not found. Once the picking process is complete the state in the State Machine is updated to Picking Finished. To set up State Machine configuration, go (here)[https://docs.spryker.com/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-push-notification-feature.html#set-up-configuration]. This feature improves inventory accuracy and reduces the likelihood of incorrect orders being shipped to customers.
A subprocess for DummyPayment01 below describes in detail the state transition for the sales order line item:
blob:https://spryker.atlassian.net/b2217778-7e66-429f-9722-9fc81dd8f994#media-blob-url=true&id=1fdc71f1-23d7-4873-815f-12f2521637cb&contextId=364968&collection=
The detailed process is available in this format:
blob:https://spryker.atlassian.net/9b5c9218-65b1-4356-9126-0dcdb1390423#media-blob-url=true&id=fdcecf2b-c6d3-4aaa-b618-cf62fe1be370&contextId=364968&collection=
1) Open the `Picklist` section of the App, and tap `Start Picking` on the picklist you wish to fulfill.
blob:https://spryker.atlassian.net/5299c618-423e-4a67-9d9a-a55867b83276#media-blob-url=true&id=45f1ceb8-39a5-4d4d-8760-7fcbf15ac400&collection=&contextId=364968&height=1440&width=720&alt=
2) Select the correct amount of items for the picklist from the warehouse; make sure they are all accounted for and taken care of.
blob:https://spryker.atlassian.net/4421fc84-c2b4-49ef-a44f-5de35ea6f7c4#media-blob-url=true&id=1b730e39-be9e-45a1-82cd-c4503df91194&collection=&contextId=364968&width=490&height=589&alt=
3) Once you've picked all the items, there should be no items under `Not Picked`. Click `Finish Picking` to conclude the picking process.
blob:https://spryker.atlassian.net/a8d6e343-fc9a-4691-9494-e7bd9ff8c589#media-blob-url=true&id=46e0b172-f86a-42a5-986e-8efe99239b4d&collection=&contextId=364968&width=483&height=655&alt=
On a project level, the state machine can be updated to include cancellation flow for items that were not found during the picking process.
