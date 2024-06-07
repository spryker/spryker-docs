---
title: Install Vertex
description: Find out how you can install Vertex in your Spryker shop
draft: true
last_updated: May 17, 2024
template: howto-guide-template
related:
  - title: Vertex
    link: docs/pbc/all/tax-management/page.version/vertex/vertex.html
redirect_from:
    - /docs/pbc/all/tax-management/202311.0/vertex/install-vertex.html
    - /docs/pbc/all/tax-management/202311.0/base-shop/vertex/install-vertex.html
    - /docs/pbc/all/tax-management/202400.0/third-party-integrations/vertex/install-vertex.html
    - /docs/pbc/all/tax-management/202311.0/third-party-integrations/vertex/install-vertex.html
    - /docs/pbc/all/tax-management/202311.0/base-shop/third-party-integrations/vertex/install-vertex.html
    - /docs/pbc/all/tax-management/202404.0/base-shop/third-party-integrations/vertex/install-vertex.html

---
This document describes how to integrate [Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/vertex.html) into a Spryker shop.

## Prerequisites

Before integrating Vertex, ensure the following prerequisites are met:

- Make sure your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

- The Vertex app catalog page lists specific packages that must be installed or upgraded before you can use the Vertex app. To check the list of the necessary packages, in the Back Office, go to **Apps**-> **Vertex**.
Ensure that your installation meets these requirements.

- Make sure that your deployment pipeline executes database migrations.

## Installation steps

To install Vertex, integrate the ACP connector module and the Vertex app:

1. [Integrate ACP connector module for tax calculation](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/integrate-the-acp-connector-module-for-tax-calculation.html)
2. [Integrate the Vertex app](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/integrate-the-vertex-app.html)
