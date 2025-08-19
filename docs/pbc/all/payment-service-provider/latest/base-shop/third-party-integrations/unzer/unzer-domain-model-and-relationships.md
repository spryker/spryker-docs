  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/unzer/unzer-domain-model-and-relationships.html
---
last_updated: Jun 22, 2022
description: This document describes domain model & relationships for Unzer in your Spryker based Projects.
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/payment/unzer/domain-model-and-relationships.html
  - /docs/pbc/all/payment-service-providers/unzer/unzer-domain-model-and-relationships.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/unzer/unzer-domain-model-and-relationships.html
  title: Unzer domain model and relationships
---

Every Sales Order is connected to a payment type (the payment method selected by the customer in the checkout process). You can capture as many times as you wish by your OMS state machine.

{% info_block infoBox "Note" %}

A refund is always done based on charge. A basket and metadata are extra information that is sent to Unzer to process payments.

{% endinfo_block %}

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#000000&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-06-17T13:40:09.944Z\&quot; agent=\&quot;5.0 (Macintosh)\&quot; etag=\&quot;yuQWbUApqeiZSYBLoYx-\&quot; version=\&quot;20.0.1\&quot; type=\&quot;device\&quot;&gt;&lt;diagram id=\&quot;Nslg4AZSgz0drwqTzxaH\&quot; name=\&quot;Page-1\&quot;&gt;7VlZc9owEP41zCQPZbDN+eg4SsgkhAw4U+ibihTbrbE8Qg6QX18ZS5EPDjMNMT2e0K52dXyfdtcSNcOar24pDN0BQdiv6Q20qhnXNV3X9F6X/8SadaLpGnqicKiHhJFSjL03LJQNoY08hBcZQ0aIz7wwq5yRIMAzltFBSskya/ZC/OysIXRwQTGeQb+o/eoh5opd6B2l72PPceXMWruX9MyhNBY7WbgQkWVKZYCaYVFCWNKaryzsx+BJXBK/mx297wujOGBlHO77YWfy1vvpz27A4AWw5wmIvohRFmwtN4wR378QCWUucUgAfaC0V5REAcLxqA0uuWzu86bGm3jlsUmqPY1N6q1YChhdT4THRlB9PzBja0E8jBjhKjXvAyGhHDFAZkwoF8HoDVNik2GAk44bz5eLWDBImTKcwwAlZpsOYRgvI9l5vN2dgEp0SERneA+KLXEwIXUw22PXe6edxwsmc8yB4H4U+5B5r9l1QHFwnXc7xS1vCHqPoNo4BdWNut5Ksa1luFbUT8UIpckpSXbZs1MB150quW6ehuvOf6632nWr5Fos8hX6kZipprd9vtwr5L3yphM3n8zpADza3M6ePgFpwOdL2Wxxu8B1p86dLIqRx+IGpOhSGn6nedf8gLlDmD1iS9djeBzCDQVL/vmQPXZiW5gyvNrPZBF54aA3Re0VHx9aV8hLVco1WZ/dVBlvN05EVqcMWVfm+B7Y2zG94Aywy8qR1XLI6r2qke0WkB0A27w2bbNysIyzA6tXAMt8tvvD0d03074bPlaOWPPsAlfeRz66pO6pqJ1DJTWplQMYrHNVtfC5rIqvqqmNamqqJm9xh4pqq8qiKle5P1FbfXN0e0Q1tWDIIoovz7Rc5vNUs/Kg0z896PS/M+iaf0TQneSKetxrxD/FtrYjH3wS3c1SOdZ8tMBDfPXIJNvDd49i+h3hF35WzjX75j+pq8++7d8Ox60nfUtElAtbLl2vZNjGwjodwzsCeiMqt42k/A6+PBz1kvGRMVz27aHajF18fBibD2DMVcMRh6ryoPrEewQX1WP+pi/1l4gBfgE=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
