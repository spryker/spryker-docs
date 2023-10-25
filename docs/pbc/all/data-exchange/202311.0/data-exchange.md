---
title: Data Exchange
description: General information about the data exchange options.
template: concept-topic-template
---

Data Exchange refers to the process of transferring data between Spryker and third-party systems. Spryker offers various solutions to facilitate data exchange between a Spryker-based solution and third-party systems, ensuring compatibility, consistency, quality, and security of your data.

Spryker offers the following options to import and export data: 

- Data Importers and Data Exporters: available in Spryker Cloud Commerce OS (SCCOS) by default
- Data Exchange API: available in SCCOS by default
- Spryker Middleware powered by Alumio:
    - Spryker Integration Apps
    - Custom integrations using the existing Alumio connectors
    - Custom integration apps using the Alumio SDK to build your own connectors


## Data Importers and Data Exporters

Data Importers and Data Exporters are tools that let you bring external data into and send data from SCCOS, using .CSV files.  Data Importers and Data Exporters are part of the SCCOS platform core.
Data Importers and Data Exporters require extensive customization development for each project and ongoing development effort, which makes them less suitable for demanding data exchange.

For information on how Data importers and Exporters work, see [Data import](/docs/scos/dev/data-import/202307.0/data-import.html) and [Data export](/docs/scos/dev/data-export/202307.0/data-export.html).

## Data Exchange API

Data Exchange API is a dynamic database API that facilitates data transfer in real-time, ensuring data is always current across all integrated platforms. It's part of the SCCOS platform core.

Data Exchange API lets you build, customize, and manage APIs tailored to your specific business requirements through a user interface.

The main benefits of the Data Exchange API include the following:

- No coding is required: The API endpoints are created from the user interface.
- Rapid API generation: The APIs are generated within minutes.
- Flexibility and customization: You can tailor APIs to your needs. You can define parameters to ensure compatibility with your systems.
- Real-time updates: The infrastructure supports dynamic changes, so you can modify APIs on the fly. 
- Security and Access Control: The infrastructure incorporates strong security measures and access controls, which safeguards sensitive information.

We recommend considering the Data Exchange API in the following cases:

- You want to implement a data integration via API with a middleware that's not [Alumio](https://www.alumio.com).
- You want to create your own data integration engine via API, without using any middleware software.

## Spryker Middleware Powered by Alumio

The Spryker Middleware powered by Alumio is a cloud-based integration Platform as a Service (iPaaS). It lets you exchange data between your Spryker system and third-party systems via a user-friendly interface.
The Spryker Middleware Powered by Alumio isn't a part of SCCOS by default. To obtain it, reach out to [Spryker support](https://spryker.com/support/).
 
With the Spryker Middleware powered by Alumio, the data exchange process looks like this:

1. Transfer of data from the source system via the API connector. The data is transferred in real-time, which ensures that the data is always current across all integrated platforms.
2. Data is fed into Alumio and transformed there.
3. Transfer of data to the target system via the API connector.

<!--For more details about the Spryker Middleware Powered by Alumio, see [LINK].-->

The Spryker Middleware Powered by Alumio is the foundation of the Spryker Integration Apps. You can also use it to build [custom integrations](#custom-integrations-with-alumio-connectors).

### Spryker Integration Apps

The Integration Apps let you import data between your Spryker system and third-party systems without any development effort and without the need to configure mapping and transformation of data, as the configurations are preset.

To exchange data between a Spryker system and a third-party system with an Integration App, you need to do the following:

- Have a user account on Spryker Middleware Powered by Alumio. 
- Have the Integration App you need deployed in the Spryker Middleware powered by Alumio platform.
- Make minimum adjustments to the existing mapping and transformation of data.

Reach out to [Spryker support](https://spryker.com/support/) or to your Customer Success Manager if you need access to the Spryker Middleware Powered by Alumio and the Integration Apps.

We recommend considering Integration Apps for data exchange in the following cases:

- You require a quick setup of the data exchange process, which should take up to a few hours.
- You need a pre-configured mapping and transformation of data for exchange between Spryker and a third-party system, so you would have to make minimum adjustments.
- For your project, it's important that the data exchange solution allows for the proper data orchestration like dependency management, error handling and logging, entity mapping, health monitoring, etc.

With the Spryker Integration Apps, the data exchange process looks like this:

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-09-15T10:48:20.145Z\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0\&quot; etag=\&quot;vccAdnJTitFcpkWpDDUS\&quot; version=\&quot;21.7.5\&quot;&gt;\n  &lt;diagram name=\&quot;Page-1\&quot; id=\&quot;qpjZvBENKJwdBAig7GPo\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1050\&quot; dy=\&quot;558\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;850\&quot; pageHeight=\&quot;1100\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-1\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Spryker&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;10\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-3\&quot; value=\&quot;&amp;lt;div align=&amp;quot;left&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/div&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;170\&quot; y=\&quot;120\&quot; width=\&quot;460\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-4\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Third-party system&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;650\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-7\&quot; value=\&quot;&amp;lt;b&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;API connector&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;180\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-8\&quot; value=\&quot;&amp;lt;font color=&amp;quot;#ffffff&amp;quot; style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Mapping and transformation&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1EBEA0;strokeColor=#1EBEA0;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;310\&quot; y=\&quot;170\&quot; width=\&quot;180\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-11\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;API connector&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;500\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-12\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Alumio middleware&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;130\&quot; width=\&quot;150\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-13\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Available by default&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;320\&quot; width=\&quot;130\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

Spryker provides Early Access to the Akeneo PIM Integration App<!--LINK-->. This Integration App allows to import products from Akeneo PIM to Spryker Cloud Commerce OS. The connector between Spryker and Akeneo is set up in a configurable way. Once new objects such as categories, attributes, or products are created or updated in Akeneo, they are transformed in the Alumio platform before the data is transferred to the Spryker Cloud Commerce OS. 

The middleware allows customers to configure data that is to be transferred to Spryker, for example, attributes and super attributes. 

{% info_block infoBox "Cold data handling" %}

Akeneo handles the so-called “cold data”. Cold data is product information directly linked to the product that describes product properties. The Akeneo PIM Integration App doesn't include the transfer of “hot data” such as stock or pricing. 

{% endinfo_block %}

<!--For details on how to import data from Akeneo to Spryker, see [Configure Akeneo PIM integration app](LINK).-->

### Custom integrations with Alumio connectors

In cases where there are no integration apps for data exchange with the third-party system you need, you can build them yourself using the Alumio platform. Alumio provides a number of built-in API connectors to third-party systems that you can use to build integrations between these systems and Spryker. Check the available connectors for Spryker on the [Alumio website](https://www.alumio.com/platforms/spryker). 

With custom integrations, the data exchange process looks like this:

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-09-15T12:14:31.926Z\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0\&quot; etag=\&quot;15WX3vxtew5KXKrEpewD\&quot; version=\&quot;21.7.5\&quot;&gt;\n  &lt;diagram name=\&quot;Page-1\&quot; id=\&quot;qpjZvBENKJwdBAig7GPo\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1050\&quot; dy=\&quot;558\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;850\&quot; pageHeight=\&quot;1100\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-1\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Spryker or third-party system&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;10\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-3\&quot; value=\&quot;&amp;lt;div align=&amp;quot;left&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/div&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;170\&quot; y=\&quot;120\&quot; width=\&quot;460\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-4\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Third-party system&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;650\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-7\&quot; value=\&quot;&amp;lt;b&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;API connector&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;180\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-8\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Mapping and transformation&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1EBEA0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;310\&quot; y=\&quot;170\&quot; width=\&quot;180\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-11\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;API connector&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;500\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-12\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Alumio middleware&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;130\&quot; width=\&quot;150\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-13\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Available by default&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;320\&quot; width=\&quot;130\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>


We recommend building custom integrations with the existing Alumio connectors in the following cases:
- There is no Spryker Integration App for the system you need to integrate with. However, Alumio offers a connector for this system.
- You require a quick setup of the data exchange process, which should take up to a few days.
- You have a tech-savvy user who can configure the mapping of data for exchange between Spryker and a third-party system.
- For your project, it's important that the data exchange solution allows for the proper data orchestration like dependency management, error handling and logging, entity mapping, integration variable management, .CSV file validation, health monitoring, etc.

For more details on how to manage integrations and exchange data in the Alumio platform, see the following information provided by Alumio:
- [The Basic Parts Of A Connector Package In Alumio](https://support.alumio.com/support/solutions/articles/80001031213-the-basic-parts-of-a-connector-package-in-alumio)
- [How To Use The Alumio Connector Packages](https://forum.alumio.com/t/how-to-use-the-alumio-connector-packages/219) 
- List of Alumio standard Connector Packages: [Latest iPaaS Connector Packages](https://forum.alumio.com/c/ipaas-connector-packages/27)

### Custom integrations with custom connectors

If you have legacy systems or old version systems with which you need to exchange data and for which Alumio doesn't provide a connector, you can still build your own connector to these systems, as Alumio platform includes an Alumio SDK to build connectors.

{% info_block warningBox "Check before implementation" %}

Before beginning to implement any custom connector, double check if the connector with the third-party system you want to integrate with is on the list of existing Alumio standard connectors: [Alumio iPaasS Connector Packages](https://forum.alumio.com/c/ipaas-connector-packages/27). This list is continuously updated.
If the system you wish to integrate with isn't on the list, you can submit a request for the implementation of a standard connector. This will give you an opportunity to assess if it aligns with your project timelines. For details on how to submit the request, refer to [How do I request a new connector package?](https://forum.alumio.com/t/how-do-i-request-a-new-connector-package/148).

{% endinfo_block %}


To build a data integration for a legacy system, you need to do the following:

1. Have a user account on Spryker Middleware powered by Alumio.
2. Build a connector to the legacy system using the Alumio SDK. Building a connector with the Alumio SDK usually takes up to a few weeks.
3. Build the mapping and transformation of data. Initial configuration of data mapping and transformation usually takes up to a few days, and changing them takes up to a few hours.

With the data integration with custom connectors, the data exchange process looks like this:

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-09-15T12:16:06.824Z\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0\&quot; etag=\&quot;E12CFu3MBn2MwiOheu46\&quot; version=\&quot;21.7.5\&quot;&gt;\n  &lt;diagram name=\&quot;Page-1\&quot; id=\&quot;qpjZvBENKJwdBAig7GPo\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1050\&quot; dy=\&quot;558\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;850\&quot; pageHeight=\&quot;1100\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-1\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Spryker or third-party system&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;10\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-3\&quot; value=\&quot;&amp;lt;div align=&amp;quot;left&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/div&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;170\&quot; y=\&quot;120\&quot; width=\&quot;460\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-4\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Legacy system&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;650\&quot; y=\&quot;120\&quot; width=\&quot;140\&quot; height=\&quot;140\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-7\&quot; value=\&quot;&amp;lt;b&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;API connector&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;180\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-8\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Mapping and transformation&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1EBEA0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;310\&quot; y=\&quot;170\&quot; width=\&quot;180\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-11\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;API connector&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;500\&quot; y=\&quot;170\&quot; width=\&quot;120\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-12\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Alumio middleware&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;130\&quot; width=\&quot;150\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;0fdFtbv5UAPoxwbvzn1O-13\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Available by default&amp;lt;br&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#1ebea0;strokeColor=#1ebea0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;325\&quot; y=\&quot;320\&quot; width=\&quot;130\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

We recommend building custom integrations with the connectors created using the Alumio SDK, in cases where Alumio doesn't have the connectors to the system you want to exchange data with. Even though you need a developer to build a connector for such systems, most of the time, this solution is still faster and, in the long term, more cost-efficient than, for example, using the default Data Importers and Data Exporters.

For information on how to build Alumio connectors with the Alumio SDK, check the Alumio documentation: [Creating Alumio Connector Packages](https://forum.alumio.com/t/creating-alumio-connector-packages/252).
