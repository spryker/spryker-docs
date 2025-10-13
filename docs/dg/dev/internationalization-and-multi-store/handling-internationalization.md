---
title: "Handling internationalization"
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-internationalization
originalArticleId: ab5fb80c-57d6-44a7-a85f-41034cb5c3be
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-internationalization.html
---

In international business, it's important to fine-tune a shop's behavior according to the country. Functionality that needs to be configured:

- Design and layout
- Currency and price
- Tax calculation
- Languages
- Expense calculation
- Available Stocks from a different ERP/client
- Availability of shipment methods and providers
- Availability of payment methods and providers
- Order processing
- Format of time and numbers

At the same time, the product import from a PIM system cart calculation and the product structure is identical in all stores. Spryker offers full support to allow localization of the content from its web pages; this is done in an optimized manner that brings speed in rendering the web content.

## Store concept

To cope with these challenges, Spryker's architecture differentiates a project and a store level. That means coding and behavior can be defined on each level. Logic that is identical will be on the project level. Examples are the product structure or customer structure. At the same time, it's possible to define a store level, this will typically be used for each country the company operates in. This allows maintaining coding that is only relevant for the given store. The store will define design and layout, used currency, and price. We recommend you have a different store at least on the currency level.

## Internationalization vs localization

Internationalization is the process of building software so that it supports localization ( implementing the mechanisms to offer the content that corresponds to the users language and preferences). It's the step that comes before localization and settles the conventions where and how the localization resources must be stored. In other words, it means adapting the design and layout of your software product, so that it displays content that's adapted to the users' culture and language, such as translated text, cultural accepted images and layout.

Localization is adapting the design and layout of your software product so that it displays content that's adapted to the users culture and language, such as translated text, cultural accepted images, and layout. Its main focus is gathering the necessary resources and follow the conventions that are implemented through internationalization. This means that for each locale that's supported by the application, the application must have its corresponding resources.

A locale is a parameter that describes the users' language, country, and variant preferences (For example, for Belgium there are two locales available: `nl_BE` and `fr_BE`).

## Approaches to handling internationalization

| CHALLENGE | APPROACH |
| --- | --- |
| Design and layout | Use different templates in the CMS use store concept. |
| Currency and price | One currency per store, different price types possible. |
| Tax calculation | Different tax sets and rates can be maintained. |
| Languages | Glossary keys allow translation. Product information can be stored in locale specific attributes of *Product attributes*. Category Information can be stored in locale specific attributes of *Category*. |
| Expense calculation |  |
| Availability of stocks | Different stock types can be maintained. |
| Availability of shipment methods and providers |  |
| Availability of payment methods and providers |  |
| Order Processing | A state machine for every country or region can be defined. |
| Format of time and numbers |  |
