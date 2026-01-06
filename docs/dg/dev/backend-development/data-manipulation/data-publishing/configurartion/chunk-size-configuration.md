---
title: Chunk size configuration
description: Improve performance and stability in Spryker by using chunking for bulk operations. Configure chunk sizes for events and queues to optimize memory use, throughput, and resilience.
last_updated: Sep 18, 2025
template: howto-guide-template
---


Spryker uses chunking to manage large datasets during bulk operations, such as publishing events or sending messages to queues. Instead of sending all data at once, the system splits it into smaller chunks. This approach improves performance, reduces memory usage, and prevents timeouts or crashes during processing.

Chunking is primarily used in two scenarios:

- Event system: When triggering publish events

- Queue system: When sending messages to RabbitMQ or another queue provider


<!-- draw.io diagram -->
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;dark-mode&quot;:&quot;auto&quot;,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;ac.draw.io\&quot; agent=\&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36\&quot; version=\&quot;28.2.3\&quot;&gt;\n  &lt;diagram id=\&quot;OwtX2WE343LPe51k21Z6\&quot; name=\&quot;Page-1\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1239\&quot; dy=\&quot;15\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;827\&quot; pageHeight=\&quot;1169\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-1\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;strokeColor=#33CCA6;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;830\&quot; y=\&quot;1542.75\&quot; width=\&quot;820\&quot; height=\&quot;235.51\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-2\&quot; value=\&quot;\&quot; style=\&quot;shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;rotation=90;fillColor=#33CCA6;opacity=40;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;996.7699999999999\&quot; y=\&quot;1460\&quot; width=\&quot;118.32\&quot; height=\&quot;416.08\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-3\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;dashed=1;fillColor=default;opacity=50;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1051.1099999999997\&quot; y=\&quot;1629.73\&quot; width=\&quot;162.89\&quot; height=\&quot;80\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-4\&quot; value=\&quot;Message\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1061.6099999999997\&quot; y=\&quot;1641.32\&quot; width=\&quot;62.89\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-5\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 10px;&amp;quot;&amp;gt;Message&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1140.6099999999997\&quot; y=\&quot;1641.32\&quot; width=\&quot;62.89\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-6\&quot; value=\&quot;Message\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;953.9999999999999\&quot; y=\&quot;1641.32\&quot; width=\&quot;62.89\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-7\&quot; value=\&quot;Message\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;865.9999999999999\&quot; y=\&quot;1641.32\&quot; width=\&quot;62.89\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-8\&quot; value=\&quot;\&quot; style=\&quot;verticalLabelPosition=bottom;shadow=0;dashed=1;align=center;html=1;verticalAlign=top;strokeWidth=3;shape=mxgraph.mockup.markup.line;strokeColor=#FFFFFF;rotation=90;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;883.1899999999999\&quot; y=\&quot;1660.3600000000001\&quot; width=\&quot;121.27\&quot; height=\&quot;20\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-9\&quot; value=\&quot;\&quot; style=\&quot;verticalLabelPosition=bottom;shadow=0;dashed=1;align=center;html=1;verticalAlign=top;strokeWidth=3;shape=mxgraph.mockup.markup.line;strokeColor=#FFFFFF;rotation=90;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;972.16\&quot; y=\&quot;1658.4\&quot; width=\&quot;117.32\&quot; height=\&quot;20\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-10\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 10px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Chunk&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1101.85\&quot; y=\&quot;1605.73\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-11\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 10px;&amp;quot;&amp;gt;&amp;lt;span&amp;gt;Message Queue&amp;lt;/span&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=0\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;987.9999999999999\&quot; y=\&quot;1581.68\&quot; width=\&quot;110\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-12\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=classicThin;endFill=1;exitX=0.455;exitY=0;exitDx=0;exitDy=0;exitPerimeter=0;\&quot; parent=\&quot;1\&quot; source=\&quot;dQrSTI_mmpNdN6wkRnZ8-2\&quot; target=\&quot;dQrSTI_mmpNdN6wkRnZ8-15\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;1275.7199999999998\&quot; y=\&quot;1663.33\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;1330.7199999999998\&quot; y=\&quot;1663.33\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-13\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classicThin;endFill=1;exitX=0.991;exitY=0.422;exitDx=0;exitDy=0;exitPerimeter=0;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;1477.23\&quot; y=\&quot;1650.27\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;1543.8899999999999\&quot; y=\&quot;1649.75\&quot; as=\&quot;targetPoint\&quot; /&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;1543.8899999999999\&quot; y=\&quot;1650.75\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-14\&quot; value=\&quot;&amp;lt;font style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;font style=&amp;quot;font-size: 8px;&amp;quot;&amp;gt;Database&amp;lt;/font&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;strokeWidth=2;html=1;shape=mxgraph.flowchart.database;whiteSpace=wrap;fillColor=#33CCA6;strokeColor=#FFFFFF;fontColor=#000000;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1566.8899999999999\&quot; y=\&quot;1624.75\&quot; width=\&quot;55\&quot; height=\&quot;70\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-15\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1338.31\&quot; y=\&quot;1582.75\&quot; width=\&quot;120\&quot; height=\&quot;160\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-16\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 10px;&amp;quot;&amp;gt;Chunk&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1268.8899999999999\&quot; y=\&quot;1637.75\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-17\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 10px;&amp;quot;&amp;gt;DB Transactions&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1480.2199999999998\&quot; y=\&quot;1607.75\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-18\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 10px;&amp;quot;&amp;gt;Message&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1366.1099999999997\&quot; y=\&quot;1596.73\&quot; width=\&quot;62.89\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-19\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 10px;&amp;quot;&amp;gt;Message&amp;lt;/font&amp;gt;\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1366.87\&quot; y=\&quot;1669.26\&quot; width=\&quot;62.89\&quot; height=\&quot;60\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-20\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 10px;&amp;quot;&amp;gt;&amp;lt;span&amp;gt;Processing&amp;lt;/span&amp;gt;&amp;lt;/font&amp;gt;\&quot; style=\&quot;text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=0\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;1343.31\&quot; y=\&quot;1555.7\&quot; width=\&quot;110\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;dQrSTI_mmpNdN6wkRnZ8-21\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classicThin;endFill=1;exitX=0.991;exitY=0.422;exitDx=0;exitDy=0;exitPerimeter=0;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;1477.23\&quot; y=\&quot;1670.27\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;1543.8899999999999\&quot; y=\&quot;1669.75\&quot; as=\&quot;targetPoint\&quot; /&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;1543.8899999999999\&quot; y=\&quot;1670.75\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>


 
## Benefits of chunking

- Performance optimization: Processing multiple items in one go reduces the overhead associated with starting and stopping processes, establishing connections, or executing queries. This can lead to significantly higher throughput.

- Memory management: While processing more items at once might seem counterintuitive for memory, if done correctly–using batch inserts and updates, re-using database connections–it can be more memory-efficient than many individual operations. However, too large a chunk can cause memory exhaustion.

- Stability and resilience: In some cases, processing in smaller, manageable chunks can make the system more robust against transient errors or memory spikes, as a failure affects only a portion of the data, not the entire large dataset.


## Chunk size configuration

Spryker provides constants to configure chunk sizes for different contexts, primarily for message queues and event processing.

### Chunk size per queue

This configuration is used to define specific chunk sizes for different message queues. It's an associative array where keys are queue names and values are the desired integer chunk sizes.

You typically define or override this in your `config/Shared/config_default.php`.


```php
<?php
use Spryker\Shared\Queue\QueueConstants;
// ... other configurations
$config[QueueConstants::QUEUE_MESSAGE_CHUNK_SIZE_MAP] = [
    'publish' => 500, // Process 500 messages from 'order-create-queue' at once
    'publish.translation' => 100, 
    'publish.page_product_abstract' => 1000, 
    // Add more queue specific chunk sizes as needed
];
```

Queue names:


![queue-names](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/chunk-size-configuration.md/queue-names.png)

For example, when a consumer runs for `publish`, it attempts to fetch and process up to 500 messages in a single execution cycle. This is useful when different queues contain messages of varying complexity or size, allowing for fine-grained control.

### Event chunk size

This configuration defines a default or global chunk size for all event processing. Events in Spryker are often published to a queue and then processed by consumers that handle these events.

Similarly to `QueueConstants`, this is typically set in `config/Shared/config_default.php`.


```php
<?php
use Spryker\Shared\Event\EventConstants;
// ... other configurations
// Defines the default chunk size for event processing if not overridden by a specific queue config
$config[EventConstants::EVENT_CHUNK] = 200;
```

This sets the number of events that a general event consumer will try to process in one go. If a specific event-related queue also has an entry in `QUEUE_MESSAGE_CHUNK_SIZE_MAP`, the more specific queue setting takes precedence for that particular queue.

## Chunk size

There is no one-size-fits-all value. You should tune chunk size based on your system's parameters:

- Available memory
- CPU performance
- Storage and database latency
- Message size and complexity

### General guidelines

- Start with a safe value like `100-500`
- Monitor memory usage and processing time
- If memory usage is low and CPU idle, increase the chunk size
- If you hit memory limits or performance issues, reduce it

You can also profile processing time per chunk and adjust chunk size for maximum throughput without overloading the system.

### Default chunk size value

If no custom chunk size is defined, the system defaults to a chunk size of 500.

You can find the default values in the following constants within the core configuration:

```php
Spryker\Zed\Event\EventConfig::DEFAULT_EVENT_MESSAGE_CHUNK_SIZE
Spryker\Zed\Event\EventConfig::ENQUEUE_EVENT_MESSAGE_CHUNK_SIZE
```


