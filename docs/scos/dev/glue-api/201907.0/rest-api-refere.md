---
title: REST API Reference
originalLink: https://documentation.spryker.com/v3/docs/rest-api-reference
redirect_from:
  - /v3/docs/rest-api-reference
  - /v3/docs/en/rest-api-reference
---

This document provides an overview of REST API endpoints provided by Spryker by default. For each endpoint, you will find its URL relative to the server, REST request parameters, as well as the appropriate request and response data formats.

<div id="swagger-ui"></div>

<div class="script-link-loader" data-tag-type = "link" data-src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui.css"></div>
<div class="script-link-loader" data-tag-type = "script" data-src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-standalone-preset.js"></div> 
<div class="script-link-loader" data-tag-type = "script" data-src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-bundle.js" ></div>


<div class="script-embed" data-code="window.onload = function() {
                console.log('start');
				const ui = SwaggerUIBundle({
					url: 'https://borjomi.herokuapp.com/schema',
					dom_id: '#swagger-ui',
					deepLinking: true,
					presets: [
						SwaggerUIBundle.presets.apis,
						SwaggerUIStandalonePreset
					],
					layout: 'BaseLayout',
                    supportedSubmitMethods: []
				})
                console.log(ui);
				window.ui = ui
			}">
</div>


