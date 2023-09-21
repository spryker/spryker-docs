---
title: Data Exchange
description: 
template: concept-topic-template
---

Data exchange refers to the process of transferring data between Spryker and third-party systems. Spryker offers various solutions to facilitate data exchange between a Spryker-based project and third-party systems, ensuring compatibility, consistency, quality, and security of your data.

There are four options to import and export data in Spryker: 

- Via the Data Importers and Data Exporters: availble in SCCOS by default.
- Via the Data Exchnage API: availble in SCCOS by default.
- Via the Spryker Middleware powered by Alumio:
    - Via the Spryker integration apps.
    - Via custom integrations using the existing Alumio connectors.
    - Via custom integration apps using the SDK to build own connectors.

## Data Importers and Data Exporters
The Data Importers and Data Exporters available in SCCOS by default, let you bring external data into and send data from SCCOS, in CSV format. The Data Importers and Exporters require customization for each project, and ongoing development effort.

We recommend using the Data Importers and exporters in the following cases:

- You need a cost-effective solution, which is included to SCCOS by default.
- You can wait up to a few weeks till the project importers are set up and ready to use.
- You have the developer resources who can do coding at the project level upon initial setup of the data importers.
- You have the developer resources who can do coding at the project level wherever you need to make changes to the existing data importers an exporters or troubleshoot issues.
- Your project isn't affected by some limitations of the data importers and exporters, like missing data orchestration (no dependency management), no delta synchronization, minimum error logging.

For more information on data importers and exporters, see [LINK TO SECTION WITH DATA IMPORTERS AND EXPORTERS]
## Data Exchange API

Data exchange API is a robust API that facilitates real-time data transfers, ensuring data is always current across all integrated platforms.

TBD:
QUESTIONS:

1. How business users can use it
2. In what cases we recommend using the Data Exchange API (can it be used independently, without Alumio middleware?)

## Spryker Middleware Powered by Alumio

The Spryker Middleware powered by Alumio, is a cloud-based integration Platform as a Service (iPaaS). It lets you exchange data between your Spryker system and third-party systems via a user-friendly interface.
The Spryker Middleware Powered by Alumio isn't a part of SCCOS by default. To obtain it, reach out to [Spryker support](https://spryker.com/support/).
 
With the Spryker Middleware powered by Alumio, the data exchange process looks like this:

1. Transfer of data from the source system via the API connector. The data is transferred in the real-time, which ensures that the data is always current across all integrated platforms.
2. Data is fed into Alumio and transformed there.
3. Transfer of data to the target system via the API connector.

For more details about the Spryker Middleware Powered by Alumio, see [LINK]

The Spryker Middleware Powered by Alumio is the foundation of the Spryker Integration Apps. You can also use it to build custom integrations.

### Spryker Integration Apps

The Integration Apps let you import data between your Spryker system and third-party systems quickly, without any development effort, and without the need to configure mapping and transformation of data, as the configurations are preset.

To exchange data between a Spryker system and a third-party system with an integration app, you need to do the following:

- Provision the Spryker Middleware Powered by Alumio.
- Provision the Spryker Integration Apps you need.
- Make minimum adjustments to the existing mapping and transformation of data.

 Reach out to [Spryker support](https://spryker.com/support/) with the request regarding the Spryker Middleware Powered by Alumio and the Integration Apps.

We recommend considering Integration Apps for data exchange in the following cases:

- You require a quick setup of the data exchange process, which should take up to a few hours.
- You don't have the developer resources to do the coding job upon initial setup.
- You don't have the developer resources to do the coding job when you need to update mapping or configuration settings.
- You need a pre-configured mapping and transformation of data for exchange between Spryker and a third-party system so you would have to make minimum adjustments.
- For your project, it is important that the data exchange solution allows for the the proper data orchestration like dependency management, error handling and logging, entity mapping, integration variable management, .CSV file validation, health monitoring, etc.

With the Spryker Integration Apps, the data exchange process like this:

Note to PMs: Here is a draw.io diagram created from image here: https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_86

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-09-15T10:48:20.145Z\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0\&quot; etag=\&quot;vccAdnJTitFcpkWpDDUS\&quot; version=\&quot;21.7.5\&quot;&gt;\n  &lt;diagram name=\&quot;Page-1\&quot; id=\&quot;qpjZvBENKJwdBAig7GPo\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1050\&quot; dy=\&quot;558\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;850\&quot; pageHeight=\&quot;1100\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-1\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Spryker&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;10\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-3\&quot; value=\&quot;&amp;lt;div align=&amp;quot;left&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/div&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;170\&quot; y=\&quot;120\&quot; width=\&quot;460\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-4\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Third-party system&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;650\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-7\&quot; value=\&quot;&amp;lt;b&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;API connector&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;180\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-8\&quot; value=\&quot;&amp;lt;font color=&amp;quot;#ffffff&amp;quot; style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Mapping and transformation&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1EBEA0;strokeColor=#1EBEA0;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;310\&quot; y=\&quot;170\&quot; width=\&quot;180\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-11\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;API connector&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;500\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-12\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Alumio middleware&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;130\&quot; width=\&quot;150\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-13\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Available by default&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;320\&quot; width=\&quot;130\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

Spryker provides Early Access to the Akeneo PIM Integration App. This Integration App allows for product import from Akeneo to Spryker. The connector between Spryker and Akeneo is set up in a configurable way. Once new objects such as categories, attributes, or product are created in Akeneo, they are transformed in the Alumio middleware before the data is transferred to Spryker via the Spryker Middleware Powered by Alumio. 

The middleware allows customers to configure data which is to be transferred to Spryker. For example, attributes and super attributes. 

{% info_block infoBox "Info" %}

Akeneo handles the so-called “cold data”. Cold data is product information directly linked to the product that describes product properties. The Akeneo PIM Integration App does not include the transfer of “hot data” such as stock or pricing. 

{% endinfo_block %}

For details on how to import data from Akeneo to Spryker, see [Akeneo PIM](LINK)

### Custom Integration Apps with Alumio connectors

In cases where there are no integration apps for data exchange, you can build them yourself using the Spryker Alumio Middleware. Alumio provides a number of built-in API connectors to third-party systems that you can use to build integrations between these systems and Spryker. Check the available connectors for Spryker on the [Alumio web-site](https://www.alumio.com/platforms/spryker). 

To build custom integrations you need:

1. Provision the Spryker Middleware Powered by Alumio.
2. Enable the API connectors offered by Alumio.
3. Build the mapping and transformation of data. Initial configuration of data mapping and transformation usually takes up to a few days, changing them takes up to a few hours.

With Custom Integration Apps, the data exchange process like this:

Note to PMs: Here is a draw.io diagram created from image here: https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_124

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-09-15T12:14:31.926Z\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0\&quot; etag=\&quot;15WX3vxtew5KXKrEpewD\&quot; version=\&quot;21.7.5\&quot;&gt;\n  &lt;diagram name=\&quot;Page-1\&quot; id=\&quot;qpjZvBENKJwdBAig7GPo\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1050\&quot; dy=\&quot;558\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;850\&quot; pageHeight=\&quot;1100\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-1\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Spryker or third-party system&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;10\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-3\&quot; value=\&quot;&amp;lt;div align=&amp;quot;left&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/div&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;170\&quot; y=\&quot;120\&quot; width=\&quot;460\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-4\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Third-party system&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;650\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-7\&quot; value=\&quot;&amp;lt;b&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;API connector&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;180\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-8\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Mapping and transformation&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1EBEA0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;310\&quot; y=\&quot;170\&quot; width=\&quot;180\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-11\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;API connector&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;500\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-12\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Alumio middleware&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;130\&quot; width=\&quot;150\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-13\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Available by default&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;320\&quot; width=\&quot;130\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>


We recommend building Custom Integration Apps with the existing Alumio connectors in the following cases:
- There is no Spryker Integration App for the system you need. However, Alumio offers a connector for this system.
- You require a quick setup of the data exchange process, which should take up to a few days.
- You don't have the developer resources to do the coding job upon initial setup.
- You don't have the developer resources to do the coding job when you need to update mapping or configuration settings.
- You have a tech-savy person who can configure mapping of data for exchange between Spryker and a third-party system.
- For your project, it is important that the data exchange solution allows for the proper data orchestration like dependency management, error handling and logging, entity mapping, integration variable management, .CSV file validation, health monitoring, etc.

For more details on how to manage integrations and exchange data in the Alumio platform, see [LINK]

### Custom Integration Apps with custom connectors

If you have legacy systems or systems of old versions with which you need to exchange data and for which Alumio does not provide a connector, you can still build you integration apps. You can build a connector to these systems, as Spryker Middleware Powered by Alumio includes an SDK to build own connectors.

To build an integration app for a legacy system, you need:

1. Provision the Spryker Middleware Powered by Alumio.
2. Build a connector to the legacy system using the SDK from the Spryker Middleware Powered by Alumio. Building a connector with SDK usually takes up to a few weeks.
3. Build the mapping and transformation of data. Initial configuration of data mapping and transformation usually takes up to a few days, changing them takes up to a few hours.

With the Integration Apps with custom connectors, the data exchange process like this:

Note to PMs: Here is a draw.io diagram created from image here: https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_140

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-09-15T12:16:06.824Z\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0\&quot; etag=\&quot;E12CFu3MBn2MwiOheu46\&quot; version=\&quot;21.7.5\&quot;&gt;\n  &lt;diagram name=\&quot;Page-1\&quot; id=\&quot;qpjZvBENKJwdBAig7GPo\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1050\&quot; dy=\&quot;558\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;850\&quot; pageHeight=\&quot;1100\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-1\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Spryker or third-party system&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;10\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-3\&quot; value=\&quot;&amp;lt;div align=&amp;quot;left&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/div&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;170\&quot; y=\&quot;120\&quot; width=\&quot;460\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-4\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Legacy system&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;650\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-7\&quot; value=\&quot;&amp;lt;b&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;API connector&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;180\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-8\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Mapping and transformation&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1EBEA0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;310\&quot; y=\&quot;170\&quot; width=\&quot;180\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-11\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;API connector&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;500\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-12\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Alumio middleware&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;130\&quot; width=\&quot;150\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-13\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Available by default&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;320\&quot; width=\&quot;130\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

We recommend building Custom Integration Apps with the connectors created using the SDK in cases when Alumio does not have the connectors to the system with which you want to exchange data. Even though you need a developer to build a connector for such systems, this solution is still faster and in the long term more cost-efficient than the default data importer and exporters.