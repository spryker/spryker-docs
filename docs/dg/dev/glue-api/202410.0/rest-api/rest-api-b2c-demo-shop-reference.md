---
title: REST API B2C Demo Shop reference
description: This page provides an exhaustive reference for the REST API endpoints present in the Spryker B2C demo Shop by default with the corresponding parameters and data formats.
last_updated: May 10, 2022
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/rest-api-reference
originalArticleId: 4f1c673e-8917-40ed-a88e-8710a00aec8a
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/rest-api-reference.html
  - /docs/scos/dev/glue-api-guides/202200.0/rest-api-reference.html
  - /docs/scos/dev/glue-api-guides/202108.0/rest-api-reference.html
  - /docs/scos/dev/glue-api-guides/202212.0/rest-api-b2c-reference.html
  - /docs/scos/dev/glue-api-guides/202204.0/rest-api-b2c-reference.html
  - /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/rest-api-b2c-demo-shop-reference.html
  - /docs/dg/dev/glue-api/202410.0/old-glue-infrastructure/rest-api-b2c-demo-shop-reference

related:
  - title: Reference information- GlueApplication errors
    link: docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions -->

{% info_block warningBox %}

This is a document related to the Old Glue infrastructure. For the new one, see [Decoupled Glue API](/docs/dg/dev/glue-api/{{page.version}}/decoupled-glue-api.html)

{% endinfo_block %}

This document provides an overview of REST API endpoints provided by the Spryker B2C Demo Shop by default. For each endpoint, you will find its URL relative to the server, REST request parameters, as well as the appropriate request and response data formats.

<div id="swagger-ui"></div>

{% raw %}
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-standalone-preset.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-bundle.js"></script>
<script>
const swaggerContainer = document.getElementById('swagger-ui');
if(swaggerContainer) {
    console.log('start'); const ui = SwaggerUIBundle({
        url: 'https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/glue-api-guides/202204.0/b2c_spryker_rest_api.schema.json',
        dom_id: '#swagger-ui', deepLinking: true, presets: [
            SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset
        ],
        enableCORS: false, layout: 'BaseLayout', supportedSubmitMethods: []
    });
    console.log(ui); window.ui = ui
}
</script>
{% endraw %}
