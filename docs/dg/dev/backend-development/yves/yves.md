---
title: Yves overview
description: Explore Yves, a frontend application for delivering customer-facing features. Learn how Yves manages requests, renders pages, and integrates with backend services.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/back-end-development/yves/yves.html
related:
  - title: Yves overview
    link: docs/dg/dev/backend-development/yves/yves.html
  - title: Add translations for Yves
    link: docs/dg/dev/backend-development/yves/adding-translations-for-yves.html
  - title: CLI entry point for Yves
    link: docs/dg/dev/backend-development/yves/cli-entry-point-for-yves.html
  - title: Controllers and actions
    link: docs/dg/dev/backend-development/yves/controllers-and-actions.html
  - title: Implement URL routing in Yves
    link: docs/dg/dev/backend-development/yves/implement-url-routing-in-yves.html
  - title: Modular Frontend
    link: docs/dg/dev/backend-development/yves/modular-frontend.html
  - title: Yves bootstrapping
    link: docs/dg/dev/backend-development/yves/yves-bootstrapping.html
  - title: Yves routes
    link: docs/dg/dev/backend-development/yves/yves-routes.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


Yves is one of the application layers of the Spryker Commerce OS, providing the frontend functionality.

{% info_block infoBox %}

To learn more about the Spryker applications and their layers, see [Conceptual Overview](/docs/dg/dev/architecture/conceptual-overview.html)

{% endinfo_block %}

Yves is divided into two parts:

- The part with controllers, forms, and templates is covered in the following documents:
  - [Controllers and actions](/docs/dg/dev/backend-development/yves/controllers-and-actions.html)
  - [Modular Frontend](/docs/dg/dev/backend-development/yves/modular-frontend.html)
  - [Atomic Frontend](/docs/dg/dev/frontend-development/{{site.version}}/yves/atomic-frontend/atomic-frontend.html)
- Client part that provides access to the search and storage engine and the Zed application. See the following documents for more information on the Client:
  - [Client](/docs/dg/dev/backend-development/client/client.html)
  - [Implement a client](/docs/dg/dev/backend-development/client/implement-a-client.html)
