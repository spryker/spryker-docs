---
title: REST API reference
originalLink: https://documentation.spryker.com/v6/docs/rest-api-reference
redirect_from:
  - /v6/docs/rest-api-reference
  - /v6/docs/en/rest-api-reference
---

This document provides an overview of REST API endpoints provided by Spryker by default. For each endpoint, you will find its URL relative to the server, REST request parameters, as well as the appropriate request and response data formats.

{% info_block warningBox %}

This REST API reference is valid for [Master Suite](https://documentation.spryker.com/docs/master-suite) only. Not all the endpoints are available or are the same for B2B and B2C Demo Shops.

{% endinfo_block %}

<div id="swagger-ui"></div>

<div class="script-link-loader" data-tag-type = "link" data-src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui.css"></div>
<div class="script-link-loader" data-tag-type = "script" data-src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-standalone-preset.js"></div> 
<div class="script-link-loader" data-tag-type = "script" data-src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-bundle.js" ></div>


<div class="script-embed" data-code="window.onload = function() {
                console.log('start');
				const ui = SwaggerUIBundle({
					url: 'https://spryker.s3.eu-central-1.amazonaws.com/docs/Document+360/json/spryker_rest_api.schema_202090.json',
					dom_id: '#swagger-ui',
					deepLinking: true,
					presets: [
						SwaggerUIBundle.presets.apis,
						SwaggerUIStandalonePreset
					],
                     enableCORS: false,
					layout: 'BaseLayout',
                    supportedSubmitMethods: []
				})
                console.log(ui);
				window.ui = ui
			}">
</div>


