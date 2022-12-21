---
title: App manifest
Descriptions: App Manifest is a set of JSON files that contain all the necessary information to register an application in the Application Tenant Registry Service and to display information about the application in the Application Catalog.
template: howto-guide-template
---
App manifest represents a set of JSON files that contain all the necessary information to register an application in the Application Tenant Registry Service (ATRS) and to display information about the application in the Application Catalog (AppCatalog).

For the manifest, make sure to follow these conditions:

- For each locale, a separate manifest file must be created. The file name must be the same as the locale name, for example, *en_US.json*. 
- The default directory for all the manifest files (all locales) is `/config/app/manifest`.

<details open>
<summary>Manifest example</summary>

```json
{
    "name": "App name",
    "provider": "App provider",
    "descriptionShort": "App short description",
    "description": "App long description",
    "url": "https://www.app-url.com",
    "isAvailable": true,
    "business_models": [
        "B2B",
        "B2C"
    ],
    "categories": [
        "PAYMENT"
    ],
    "pages":
    {
        "Overview": [
        {
            "title": "Advantages",
            "type": "list",
            "data": [
                "Advantage 1",
                "Advantage 2"
            ]
        },
        {
            "title": "Features",
            "type": "list",
            "data": [
                "Feature 1",
                "Feature 2"
            ]
        }]
    },
    "assets": [
    {
        "type": "icon",
        "url": "/assets/images/app_name/logo.svg"
    },
    {
        "type": "image",
        "url": "/assets/images/app_name/gallery/app_picture_1.jpeg"
    },
    {
        "type": "image",
        "url": "/assets/images/app_name/gallery/app_picture_1.png"
    }],
    "labels": [
        "Gold Partner"
    ],
    "resources": [
    {
        "title": "User Guide",
        "url": "https://link-to-user-guide.com",
        "type": "internal-documentation"
    }
    {
        "title": "Homepage",
        "url": "https://www.app-name.com/DE-de",
        "type": "homepage"
    }]
}
```
</details>

## Manifest file parts

|NAME   |DESCRIPTION   |EXAMPLE   |
|---|---|---|
|name   |The app's name.   |"name": "Payone"   |
|provider   |App provider's name (not visible on AppCatalog).   |"provider": "Payone"   |
|descriptionShort   |Short description displayed on the application tile in the application catalog page and at the top of the application detail page.   |"descriptionShort": "A single payment platform to accept payments anywhere on any device."   |
|description   |Full description of the app. New line symbols and HTML tags are not allowed.   |"description": "BS PAYONE GmbH is headquartered in Frankfurt am Main and is one of the leading omnichannel-payment providers in Europe. In addition to providing customer support to numerous Savings Banks (Sparkasse) the full-service payment service provider also provides cashless payment transaction services to more than 255,000 customers from stationary trade to the automated and holistic processing of e-commerce and mobile payments."   |
|url   |URL to a homepage of the application provider (not visible in the AppCatalog).   |"url": "https://www.payone.com/DE-en"   |
|isAvailable   |Shows if the application is currently available. Possible values:<br><ul><li>false—the application is not available, it’s not possible to connect and configure it.</li><li>true—the application is available, it’s possible to connect, configure, and use it.</li></ul>   |"isAvailable": true   |
|businessModels   |An array of suite types that are compatible with the application. Possible values:<ul><li>B2C</li><li>B2B</li><li>B2C_MARKETPLACE</li><li>B2B_MARKETPLACE</li></ul>|See *businessModels example* under this table.   |
|categories   |An array of categories that the application belongs to. Possible values:<ul><li>BI_ANALYTICS</li><li>CUSTOMER</li><li>LOYALTY</li><li>PAYMENT</li><li>PRODUCT_INFORMATION_SYSTEM</li><li>SEARCH</li><li>USER_GENERATED_CONTENT</li></ul>   |See *categories example* under this table.   |
|pages   |Adds additional content to the application detail page. This part contains an object with a page type and its blocks.<br>Possible page types (object keys):<ul><li>Overview</li><li>Legal</li></ul>Each page can contain no or multiple blocks. Each block should be specified by an object with the following keys:<ul><li>title—header of the block;</li><li>type—the way the data is displayed. Possible values:<ul><li>list<li>text</li></ul><li>data—information that is displayed inside the block. Can be a string, if *type=text*, or an array of strings if *type=list*.</li></ul>   |See *pages example* under this table.   |
|assets   |An array of objects represented as application assets. Each object has the following keys:<ul><li>type—type of the asset. Possible values:<ul><li>icon—displayed on the application tile and on top of the application detail page.</li><li>image—displayed in a carousel on the application detail page.</li><li>video—displayed in a carousel on the application detail page. Allows only videos hosted on https://wistia.com.</li></ul><li>url—a relative path to the asset. Possible extensions:<ul><li>jpeg</li><li>png</li><li>svg</li><li>url to a video hosted on https://wistia.com</li></ul></ul>   |See *assets example* under this table.   |
|labels   |An array of strings. Displays label icons on the application detail page according to the label. Possible values:<ul><li>Silver Partner</li><li>Gold Partner</li><li>New</li><li>Popular</li><li>Free Trial</li></ul>   |See *labels example* under this table.   |
|resources   |An array of objects represented as application resources (links, documents). The resource object has the following keys:<ul><li>title—name of the resource</li><li>url—full URL to the resource</li>type—type of the resource. Optional. The type affects a displayed icon. Possible values:<ul><li>internal-documentation</li><li>homepage</li><li>user-documentation</li><li>developer-documentation</li><li>release-notes</li></ul><li>fileType—type of the resource file (in case if the url leads to a file and if `type=internal-documentation`). Optional. The files are displayed directly in the AppCatalog, without redirecting to another page. Possible values:<ul><li>pdf</li><li>markdown</li></ul></ul>   |See *resources example* under this table.   |


<details>
<summary>businessModels example</summary>

```json
"business_models": [
  "B2B",
  "B2C"
]
```
</details>

<details>
<summary>categories example</summary>

```json
"categories": [
  "PAYMENT"
]
```
</details>

<details>
<summary>pages example</summary>

```json
{
    ...
    "pages": 
    {
        "Overview": [
        {
            "title": "Advantages",
            "type": "list",
            "data": [
                "One solution, one partner, one contract. Simple & efficient. Technical processing and financial services from a single source.",
                "International payment processing. Access to international and local payment methods.",
                "Automatic debtor management. Effective accounting support through transaction allocation and reconciliation.",
                "Credit entries independent of payment type. Fast returns management. With automated refunds.",
                "Short time to market thanks to plug'n pay 1-click checkout and seamless integration. For an increasing conversion rate."
            ]
        },
        {
            "title": "Available Payment Methods (Credit Card)",
            "type": "list",
            "data": [
                "Authorization",
                "Preauthorization and Capture",
                "3DS",
                "PCI DSS Compliance via SAQ A"
            ]
        },
        {
            "title": "Available Payment Methods (PayPal)",
            "type": "text",
            "data": "Preauthorization and Capture"
        }]
    }
    ...
}
```
</details>

<details>
<summary>assets example</summary>

```json
"assets": [
  {
    "type": "icon",
    "url": "/assets/images/payone/logo.svg"
  },
  {
    "type": "image",
    "url": "/assets/images/payone/gallery/Payone_2.jpeg"
  },
  {
    "type": "image",
    "url": "/assets/images/payone/gallery/Payone_3.png"
  }
]
```
</details>

<details>
<summary>labels example</summary>

```json
"labels": [
  "Gold Partner"
]
```
</details>

<details>
<summary>resources example</summary>

```json
"resources": [
  {
    "title": "User Guide",
    "url": "https://raw.githubusercontent.com/spryker/spryker-docs/aop-docs/docs/acp/user/apps/payone.md",
    "type": "internal-documentation",
    "fileType": "markdown"
  },
  {
    "title": "Homepage",
    "url": "https://www.payone.com/DE-en",
    "type": "homepage"
  }
]
```
</details>

Here is how these parts are integrated in the application tile:

![application-tile](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-manifest/app-tile.png)

Here is how these parts are integrated on the application detail page:

![application-details-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-manifest/app-details-page.png)

## What's next
[App configuration manifests](/docs/acp/user/app-configuration.html)
