---
title: Econda
originalLink: https://documentation.spryker.com/v1/docs/econda
redirect_from:
  - /v1/docs/econda
  - /v1/docs/en/econda
---

## Partner Information

[ABOUT ECONDA](https://www.econda.de/) 
High performance in E-commerce is our daily bread - yours too? Econda collects billions of E-commerce data from thousands of online shops for more than 1000 customers throughout the world, on a daily basis. We store the data, enrich it and provide instant reports – we compile the user profile and product recommendations and return this to the online shops in real time. Of course all in line with data protection. We manage the flood of data for our customers using the latest methods and cutting edge technology, helping them to capitalize on their E-commerce data. 

YOUR ADVANTAGES: 

* Spryker Industry Partner – <b>interface to Spryker</b>
* data ownership with customers,<b>TÜV certified data protection</b>, according to the EU data protection regulations (in force as of 05/2018) and eprivacy regulation
* <b>web and app data acquisitions</b>, Tag Management
* <b>cross-channel and cross-device tracking, analyses and personalization</b>
* <b>data imports and exports</b> from third party systems with automated matching
* all in <b>real time</b>: analyses, recommendations and personalization
* <b>item-2-item recommendations</b>, thanks to the most innovative data mining and machine learning process (up to 25% of turnover share with good recommendations)
* <b>personalization and individualization</b> with the very latest KI methods (up to 40% increase in turnover share, an increase of up to 800% in mailing success.) 

## Prerequisites

Our Econda module offers the integration with these services for the application you are building using Spryker.

To integrate with Econda, you will need to connect your Econda account. If you do not have an Econda account please contact [Econda Sales](mailto:sales@econda.com?subject=Sales Request from a Spryker Contact).

To enable Econda tracking for your application, you need to download a personalized JavaScript library from the Econda Analytics Configuration menu (you can find the detailed instructions on the [Econda website](https://support.econda.de/display/MONDE/Tracking-Bibliothek+herunterladen)).

For [cross sell widgets](econda-cross-sell), we will demonstrate integration of JS SDK that you can download from the [Econda website](http://downloads.econda.de/support/releases/js-sdk/current/econda-recommendations.php).

Please refer to [Econda](http://www.econda.de/) documentation on how to customize your Econda widgets.

Some examples can be found at [http://downloads.econda.de/support/releases/js-sdk/current/examples/](http://downloads.econda.de/support/releases/js-sdk/current/examples/)

Details on how to work with Javascript and templates in Spryker can be found in [Front-End Guide](/docs/scos/dev/developer-guides/201811.0/development-guide/front-end/miscellaneous-guides/user-interface-).

Econda module uses collectors to [export data to CSV](/docs/scos/dev/technology-partners/201811.0/marketing-and-conversion/personalization-and-cross-selling/econda/econda-export-c). Please read more about Collectors.

## Installation

### Composer Dependency

To enable the Econda module provided by Spryker OS, use [Composer](https://getcomposer.org/):

```php
composer require spryker-eco/econda
```

### Econda JS Library and SDK

Download a personalized JavaScript library from the Econda Analytics Configuration menu by following instructions at [https://support.econda.de/display/MONDE/Tracking-Bibliothek+herunterladen](https://support.econda.de/display/MONDE/Tracking-Bibliothek+herunterladen) and Econda JS SDK from [http://downloads.econda.de/support/releases/js-sdk/current/econda-recommendations.php](http://downloads.econda.de/support/releases/js-sdk/current/econda-recommendations.php)

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-forms hubspot-forms--docs">
<div class="hubspot-form" id="hubspot-partners-1">
            <div class="script-embed" data-code="
                                            hbspt.forms.create({
				                                portalId: '2770802',
				                                formId: '163e11fb-e833-4638-86ae-a2ca4b929a41',
              	                                onFormReady: function() {
              		                                const hbsptInit = new CustomEvent('hbsptInit', {bubbles: true});
              		                                document.querySelector('#hubspot-partners-1').dispatchEvent(hbsptInit);
              	                                }
				                            });
            "></div>
</div>
</div>

