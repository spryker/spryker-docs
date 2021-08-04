---
title: Roadmap
originalLink: https://documentation.spryker.com/2021080/docs/roadmap
redirect_from:
  - /2021080/docs/roadmap
  - /2021080/docs/en/roadmap
---

**Updated: April 2021**
We at Spryker are happy to share our plans with you. The plans below are guidelines that give us direction  to continuously evolve and improve our product. However, we are also flexible, and we constantly listen and adapt. Therefore, our plans could change. So although we are good at fulfilling our commitments, we reserve the right to change our priorities, remove or add new features from time to time. If you are planning anything strategic based on this list, you might want to talk to us first, either by contacting your Spryker representative or one of our [Solution Partners](https://spryker.com/solution-partners/).

If you see a feature that you like, [create an idea in our Aha](https://spryker.ideas.aha.io/ideas/) and let us know why the feature is important to you.

{% info_block warningBox %}
The roadmap contains features and not architectural items, enhancements, technology updates, or any other strategic releases we are working on. We kindly ask you not to base any business decisions on these lists without consulting with us first.
{% endinfo_block %}

## Spryker Commerce OS

| Feature/Enhacement | Description |
| --- | --- |
|Configurable product | Support for products that need to be configured before the purchase:<ul><li>Interfaces to launch a 3rd party configurator from product details page</li><li>Attach/handover results of configuration to a cart item and persist in the order</li><li>A configurator can override product prices</li><li>Configurable product feature could be integrated with different CPQ systems (Configure, Price, Quote)</li></ul> |
| Enhanced security for Storefront login | <ul><li>Defining storefront password validation rules</li><li><li>Block login after x unsuccessful attempts</li></ul> |
|Click and Collect | <ul><li>Select pickup as a delivery method</li><li>Pickup in-store or other locations like lockers, affiliates, or warehouses</li><li>Allow customers to select a pickup time</li><li>A pickup location and time is confirmed by email and a collection code</li><li>Define and manage pickup locations</li><li>Manage the capacity of pickup slots</li></ul> |
|Service and appointment scheduling| <ul><li>Scheduling pickup appointments for Click and Collect</li><li>Support for selling services that require an appointment<li><li>Maintaining vendor’s calendar and available slots</li><li>Appointment cancelation and rescheduling</li></ul>|
|Pick and Collect application |<ul><li>Mobile application for store employees to keep track of order picking and collection</li><li>Best picking route configured per location</li><li>Order by order or “wave” picking approaches</li><li>Generating and exporting pick lists as PDF or HTML</li><li>Product substitution rules</li></ul>|
|Multistore - channels and stores|Channels decouple *what* you sell from *how* it is presented.<br>**Channels:**<ul><li>Create separate channels for desktop and mobile</li><li>Define a separate URL, UI theme, time zone, currency, and locale</li><li>Together with the Storefront as a service, create different Storefronts without the overhead of duplicating store data in Spryker</li></ul>**Stores:**<ul><li>Define catalog, prices, and promotions</li><li>Define business logic</li><li>Define store settings</li></ul>|
|API enhancements| <ul><li>New front-end APIs for B2C and B2B</li><li>OAuth 2.0 implementation</li><li>Back-end APIs</li></ul>|
|Back-Office UI improvements |<ul><li>Backoffice UI optimized for productivity</li><li>Better search and filter options</li><li>Bulk actions support</li><li>Built on atomic design principals</li><li>Easy to extend and use</li>|

                                             
## Spryker Cloud Commerce OS

| Feature/Enhacement | Description |
| --- | --- |
|Improved deployment process|<ul><li>**Azure support** - more tooling and a compatible CI pipeline</li><li>**Speed** - improved deploy speed to production: less than 15 minutes</li><li>**Tools** - additional Spryker QA tools to improve your software quality, like Spryker CI integration: sniffers, checks, and compliance control
</li></ul>|
|Improved self-service capabilities|<ul><li>**Gitops** - enables managed infrastructure by configuration files in the Git repository</li><li>**Environment** - spinning up environments</li><li>**Automation** - delivery pipelines automatically rollout changes to your infrastructure</li>|
|Data integration plattform|<ul><li>**Middleware as a Service** - allows you to connect to different applications in providing multiple standards and functions</li><li>**Resource management** - host and run your own applications and business logic</li><li>**Speed** - create integrations without having to write custom code for each new data integration.</li></ul>|
|Upgradability|<ul><li>**Speed** - spend less time on upgrading to new modules and features.</li><li>**Dependency checks** - allow you to quickly and seamlessly apply new Spryker capabilities.</li><li>**Flexibility** - get full benefits from the Spryker flexibility and adapt to ever changing market conditions.</li></ul>|

## Spryker Marketplace Suite

| Feature/Enhacement | Description |
| --- | --- |
| Integrating a Marketplace into Spryker | <ul><li>Fast time-to-market:<ul><li>out-of-the-box features</li><li>fast set up of complex structures thanks to available Capabilities in SCCOS</li><li>single platform with all functionality enables fast expansion</li></ul></li><li>Time and cost saving:<ul><li>maximum flexibility with the product</li><li>quickly adjust to market trends and new products</li></ul></li><li>Ownership:<ul><li>optimized Merchant onboarding</li><li>keep track of all Merchants activities</li></ul></li></ul> |
| Support of multiple Marketplace models | <ul><li>**Classic Marketplace** - Only 3rd party sellers offer products. Marketplace Operator manages the platform.</li><li>**Enterprise Marketplace** - both the Marketplace Operator and 3rd party sellers offer products. The Marketplace Operator also manages the platform.</li></ul>|
| Product and offers | <ul><li>Product data belongs to a Merchant</li><li>When multiple merchants sell the same product, they create offers</li><li>Each Merchant can define a different price for the same product</li></ul> |
| Split order | <ul><li>A Marketplace order can be split between multiple merchants, and multiple State Machines are in place</li><li>With multiple State Machines, an order can be independently fulfilled by different Merchants or the Operator, from different warehouses and at different times</li><li>All shipments get individual status updates and are trackable to ensure a happy end customer</li><li>End customer can request returns; Merchant and Operator can fulfill them</li></ul> |
|Marketplace Storefront|<ul><li>View a Merchant’s profile and their portfolio</li><li>Choose the best offer for a product from different Merchants</li><li>Buy from different Merchants in a single order</li><li></ul>|
|Merchant Portal |The Merchants can:<ul><li>Create their own offers for products already listed in the Marketplace</li><li>Create their own sets of products, including descriptions, images, etc.</li><li>Define prices, stock availability, and validity dates for the offers and products</li><li>Manage existing offers and products in the Merchant Portal</li><li>Contact customers directly in case of issues</li><li>Manage the status of their incoming and shipped orders</li></ul>|
| Back Office for the Operator |The Operator can: <ul><li>Ensure compliance with the Marketplace guidelines by managing Merchants in the Back Office </li><li>Manually approve Merchants, their Offers, Products, and Prices
</li><li></ul>| 
   
## Spryker Unified Commerce Suite

| Feature/Enhacement | Description |
| --- | --- |
|Customers with retail locations|<ul><li>Creates a consistent customer experience between online and offline environments</li><li>Online presence encourages in-store traffic</li><li></li><li>Customer’s journey crosses online and offline boundary: buy online and pickup in store, buy in a store and return online</li></ul>|
|Retail location profile |<ul><li>Each retail location has a profile that defines its location, open hours, and contact information. It is implemented using the Merchant Profile functionality of Spryker’s Marketplace.</li><li>Retail location information is also displayed in the storefront.</li><li>Employee of the store can login into the Merchant Portal to manage their orders or modify pricing and availability.</li></ul>|
|Store Locator |<ul><li>Customer can search for retail locations near her and select which store she wants to visit</li><li>Customer can search for location based on product availability</li><li>Customers can save their favorite location</li></ul>|

## FaaS

| Feature/Enhacement | Description |
| --- | --- |
| VueStorefront: State-of-the-Art PWA integrated with Spryker |The most-used PWA in the world directly integrated with Spryker as alternative frontend: <ul><li>Many powerful views and tools</li>Customizable<li>State of the art mobile friendly</li><li>App-like experience</li></ul>|
|Frontastic: PWA to empower the marketing people | "Frontend-as-a-Service" as the new PWA delivery: <ul><li>Easy and fast setup</li><li>Powerful platform for marketing people to structure and edit any aspect of a front end</li><li>Operated in the cloud</li></ul>|


## App Store

| Feature/Enhacement | Description |
| --- | --- |
| Making integrations simpler | The App Store will make creating integrations faster and make it fundamentally easier to integrate them into a project:<ul><li>Easier integrations: no or low code</li><li>3rd party contribution with apps and services</li><li>Transactional business model for integration usage</li></ul> |
|Connecting instead of installing integrations to SCCOS | Integrations will be hosted independently of SCCOS and will not have to be integrated into code, but connected to: <ul><li>Spryker will host integrations as PBCs</li><li>Integrations will be updated and maintained by Spryker or app providers</li><li>Will only work with SCCOS</li><li>Customizations are possible and must be maintained by projects</li></ul> |
| Accessing the App Store | App Store portal catalog will be a standalone application available via: <ul><li>SCCOS Back Office</li><li>Spryker Website (read only)</li></ul> |

Check out and [download the full version of the roadmap](https://hubs.ly/H0PdRfB0).
    

