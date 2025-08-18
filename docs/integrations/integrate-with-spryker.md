---
title: Integrate with Spryker
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: July 9, 2025
template: default
layout: custom_new
---

<div class="content_box">Integrating third-party services into a Spryker project is a crucial part of extending and customizing your commerce solution to meet unique business needs. Whether you're connecting payment providers, logistics systems, marketing tools, or customer support platforms, Spryker offers a flexible and scalable architecture designed to support smooth integrations. This article describes the various methods available for integrating external systems with Spryker, from using APIs and middleware to leveraging Spryker's modular architecture.</div>

## Spryker integrations

Spryker integrations are connections between a Spryker commerce system and external third-party services or internal enterprise systems. These integrations allow Spryker to exchange data, trigger actions, and extend its functionality beyond the core platform to create a tailored and scalable commerce solution.

Spryker's modular architecture is built to support a wide range of integrations, whether you're connecting to payment gateways, ERP systems, CRMs, PIMs, shipping providers, or marketing tools. Integrations can range from simple REST API connections to complex, event driven data flows.

At their core, integrations follow these design principles:

- Decoupled: Don't interfere with the core logic.

- Scalable: Ready to handle growth and high-volume transactions.

- Maintainable: Easy to update or swap out services when needed.

- Customizable: Flexible to fit unique business requirements.


## Integration methods

 <div class="cst_cards_3">

  <div class="cst_card">
    <div class="cst_card_image"><img src="/images/integrations/int_eco.png" alt="Icon for Spryker Eco Modules"></div>
    <div class="cst_card_title">ECO modules</div>
    <div class="cst_card_desc">Spryker Eco Modules are prebuilt, reusable integration packages that connect Spryker with popular third-party services and tools. They help teams save development time and ensure reliable integrations.</div>
    <a class="cst_card_button" href="eco-modules"> Find out more </a>
  </div>

  <div class="cst_card">
    <div class="cst_card_image"><img src="/images/integrations/int_acp.png" alt="Icon for Spryker App Composition Platform"></div>
    <div class="cst_card_title">Spryker ACP</div>
    <div class="cst_card_desc">The Spryker App Composition Platform is a low code, cloud native solution that enables seamless integration of third-party applications into your Spryker project. </div>
    <a class="cst_card_button" href="app-composition-platform-apps"> Find out more </a>
  </div>

  <div class="cst_card">
    <div class="cst_card_image"><img src="/images/integrations/int_custom_build.png" alt="Icon for Spryker Custom Building Integrations"></div>
    <div class="cst_card_title">Custom build</div>
    <div class="cst_card_desc">For more tailored or business specific needs, you can build custom integrations directly in your project code.</div>
    <a class="cst_card_button" href="custom-building-integrations/custom-build-integrations-with-spryker"> Find out more </a>
  </div>

  <div class="cst_card">
    <div class="cst_card_image"><img src="/images/integrations/int_api.png" alt="Icon for Spryker GLUE APIs"></div>
    <div class="cst_card_title">Spryker APIs</div>
    <div class="cst_card_desc">Spryker APIs—primarily the Glue API—provide a RESTful interface for interacting with the Spryker Commerce OS. They enable external systems, services, and frontend applications to communicate with Spryker in a structured, secure way.</div>
    <a class="cst_card_button" href="spryker-glue-api/getting-started-with-apis/getting-started-with-apis"> Find out more </a>
  </div>

  <div class="cst_card">
    <div class="cst_card_image"><img src="/images/integrations/int_community_contributions.png" alt="Icon for Spryker Community Contributions"></div>
    <div class="cst_card_title">Community contributions</div>
    <div class="cst_card_desc">Spryker has an active developer community that contributes to the ecosystem by sharing modules, integrations, and improvements.</div>
    <a class="cst_card_button" href="community-contributions"> Find out more </a>
  </div>
 </div>


## How integrations work

Integrations connect external services to your Spryker project through modular, decoupled components. These can be built and used by any of the described integration methods depending on your use case and needs.
