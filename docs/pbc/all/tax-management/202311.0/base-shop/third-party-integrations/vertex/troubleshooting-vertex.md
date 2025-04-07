---
title: Troubleshooting Vertex
description: Troubleshoot issues related to the Vertex app
template: troubleshooting-guide-template
last_updated: Dec 4, 2023
---
This document contains common issues related to the Vertex app.

## Your project is using the default Spryker Tax feature and not tax calculated by Vertex

Make sure that you have added your configuration details. See [Configure Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/connect-vertex.html) for more details about configuring Vertex in the ACP catalog.
 
Also, make sure that the Vertex app is activated in the ACP catalog:

![activate-vertex](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/troubleshoot-vertex/activate-vertex.png)

You can also use the Vertex log files on your Vertex platform to check the logs on the Vertex side. To access the logs, go to **System -> Administration -> Log Files**.

## I don't know if the right address is being sent to Vertex

Ensure that you have the needed fields for the address in your country. For example, if you are in the US, ensure that a state field is on your address form on the Storefront. Alternatively, Vertex offers an [address cleansing product](https://www.vertexinc.com/solutions/products/vertex-o-series-address-cleansing) for the US only. It can be integrated into your project for address cleansing and validation. 
