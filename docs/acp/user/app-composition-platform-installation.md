---
title: App Composition Platform installation
description: Learn how to install the App Orchestration Platform.
template: concept-topic-template
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-installation.html
---

This document describes how you can make your project ACP-ready and how you install ACP.

# Installing ACP in SCCOS

{% info_block warningBox "Prerequisite" %}

To be eligible for ACP, your project must be hosted in the Spryker Cloud.

{% endinfo_block %}

The ACP catalog is integrated into the Back Office and contains the list of applications you can connect to your shop.

You can access the ACP catalog only if you are a SCCOS customer and have been enabled for ACP. This means that your SCCOS environment needs to be properly set up and registered with ACP.

The installation process of ACP on SCCOS is also called *ACP enablement*. It involves multiple steps that require actions from both you and Spryker. The first step implies making your SCCOS project *ACP-ready*, meaning that the required ACP modules are up-to-date and the SCCOS Cloud environment is configured correctly. The second step is making your project *ACP-enabled* by registering your SCCOS project with the Spryker's ACP. This enables the ACP Catalog in the Back Office to interact with ACP, allowing you to browse, connect, and configure ACP applications for use with SCCOS.

The following diagram illustrates the different steps of the ACP enablement process and outlines the responsibilities for executing them.

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-05-24T14:49:42.621Z\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36\&quot; etag=\&quot;Qukq0BDP7WyFCnFGgsy6\&quot; version=\&quot;21.3.3\&quot;&gt;\n  &lt;diagram name=\&quot;Страница 1\&quot; id=\&quot;0AxMdV5PH_cISPjeI29k\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;2474\&quot; dy=\&quot;1116\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;0\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;827\&quot; pageHeight=\&quot;1169\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-32\&quot; value=\&quot;&amp;lt;b&amp;gt;&amp;lt;font color=&amp;quot;#ffffff&amp;quot;&amp;gt;Customer/SI&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#EB553c;strokeColor=#eb553c;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-80\&quot; y=\&quot;132\&quot; width=\&quot;80\&quot; height=\&quot;80\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-33\&quot; value=\&quot;&amp;lt;b&amp;gt;&amp;lt;font color=&amp;quot;#ffffff&amp;quot;&amp;gt;Spryker (OPS/ACP)&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#1ebea0;strokeColor=#1EBEA0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-80\&quot; y=\&quot;252\&quot; width=\&quot;80\&quot; height=\&quot;80\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-34\&quot; value=\&quot;\&quot; style=\&quot;endArrow=none;dashed=1;html=1;rounded=0;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry width=\&quot;50\&quot; height=\&quot;50\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;41\&quot; y=\&quot;332\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;41\&quot; y=\&quot;132\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-50\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-35\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-36\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-35\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;SCCOS is updated to the latest module versions required for ACP and Apps&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#EB553c;strokeColor=#eb553c;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;80\&quot; y=\&quot;132\&quot; width=\&quot;88\&quot; height=\&quot;88\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-51\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-36\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-37\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-36\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;SCCOS is configured to activate ACP catalog in the Back Office&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#EB553c;strokeColor=#eb553c;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;190\&quot; y=\&quot;132\&quot; width=\&quot;88\&quot; height=\&quot;88\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;fknyoAEU52s9SkgYHo2v-4\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-37\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-46\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-37\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;SCCOS environment variable keys are prepared&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#EB553c;strokeColor=#eb553c;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;300\&quot; y=\&quot;132\&quot; width=\&quot;88\&quot; height=\&quot;88\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;LKxQeUD1ZAAE0P82jiso-6\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-38\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-40\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-38\&quot; value=\&quot;&amp;lt;span style=&amp;quot;--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; border-color: var(--border-color);&amp;quot;&amp;gt;&amp;lt;font style=&amp;quot;--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; border-color: var(--border-color); font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;SCCOS environment variable keys are configured&amp;lt;/font&amp;gt;&amp;lt;/span&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#EB553c;strokeColor=#eb553c;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;410\&quot; y=\&quot;132\&quot; width=\&quot;90\&quot; height=\&quot;90\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-40\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;SCCOS is &amp;quot;&amp;lt;b&amp;gt;ACP-ready&amp;lt;/b&amp;gt;&amp;quot;&amp;lt;/font&amp;gt;\&quot; style=\&quot;rhombus;whiteSpace=wrap;html=1;fillColor=#EB553C;strokeColor=#EB553C;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;520\&quot; y=\&quot;128\&quot; width=\&quot;110\&quot; height=\&quot;98\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-56\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-43\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-45\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-43\&quot; value=\&quot;&amp;lt;font color=&amp;quot;#ffffff&amp;quot; style=&amp;quot;font-size: 9px;&amp;quot;&amp;gt;SCCOS is &amp;quot;&amp;lt;/font&amp;gt;&amp;lt;b style=&amp;quot;--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; border-color: var(--border-color); color: rgb(255, 255, 255); font-size: 9px;&amp;quot;&amp;gt;ACP-enabled&amp;lt;/b&amp;gt;&amp;lt;span style=&amp;quot;color: rgb(255, 255, 255); font-size: 9px;&amp;quot;&amp;gt;&amp;quot;&amp;lt;/span&amp;gt;\&quot; style=\&quot;rhombus;whiteSpace=wrap;html=1;fillColor=#EB553C;strokeColor=#EB553C;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;670\&quot; y=\&quot;129\&quot; width=\&quot;110\&quot; height=\&quot;98\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-45\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;&amp;amp;nbsp;&amp;lt;b&amp;gt;ACP&amp;lt;br&amp;gt;&amp;amp;nbsp;catalog&amp;lt;/b&amp;gt; can be fully used with SCCOS&amp;lt;/font&amp;gt;\&quot; style=\&quot;rhombus;whiteSpace=wrap;html=1;fillColor=#EB553C;strokeColor=#EB553C;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;810\&quot; y=\&quot;124\&quot; width=\&quot;110\&quot; height=\&quot;108\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;fknyoAEU52s9SkgYHo2v-5\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-46\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-47\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-46\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;Customer Cloud Infrastructure is updated with ACP components&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#1EBEA0;strokeColor=#1EBEA0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;300\&quot; y=\&quot;252\&quot; width=\&quot;88\&quot; height=\&quot;88\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-61\&quot; value=\&quot;\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-47\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-38\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-47\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;Values for Customer env variables are created based on Customer&amp;#39;s Cloud ACP components&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#1EBEA0;strokeColor=#1EBEA0;align=center;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;410\&quot; y=\&quot;252\&quot; width=\&quot;88\&quot; height=\&quot;88\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-60\&quot; style=\&quot;edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-48\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-43\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-48\&quot; value=\&quot;&amp;lt;font style=&amp;quot;font-size: 9px;&amp;quot; color=&amp;quot;#ffffff&amp;quot;&amp;gt;Register Customer SCCOS with ACP&amp;lt;/font&amp;gt;\&quot; style=\&quot;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#1EBEA0;strokeColor=#1EBEA0;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;600\&quot; y=\&quot;252\&quot; width=\&quot;88\&quot; height=\&quot;88\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AaxAhCZwYhS3f6JuZ0fs-59\&quot; value=\&quot;\&quot; style=\&quot;endArrow=classic;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;\&quot; parent=\&quot;1\&quot; source=\&quot;AaxAhCZwYhS3f6JuZ0fs-40\&quot; target=\&quot;AaxAhCZwYhS3f6JuZ0fs-48\&quot; edge=\&quot;1\&quot;&gt;\n          &lt;mxGeometry width=\&quot;50\&quot; height=\&quot;50\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;540\&quot; y=\&quot;282\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;560\&quot; y=\&quot;292\&quot; as=\&quot;targetPoint\&quot; /&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;575\&quot; y=\&quot;296\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

{% info_block warningBox "Info" %}

The actions and level of effort required to make your project ACP-ready may vary depending on the update status of your SCCOS module versions. However, the process of making your project ACP-enabled is always handled by Spryker.

{% endinfo_block %}

## Getting SCCOS ACP-ready

To make your project ACP-ready, different update steps are necessary depending on the template version on which your project was started:

- SCCOS product release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html): All the changes required for ACP readiness are already included, but you should still verify them at the project level.
- Older versions: To get the project ACP-ready, you should complete all steps described in this document.

{% info_block infoBox "Product version earlier than 202211.0" %}

If you were onboarded with a version older than product release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html), please [contact us](https://support.spryker.com/). 

{% endinfo_block %}

### 1. Module updates for ACP

To get your project ACP-ready, it is important to ensure that your project modules are updated to the necessary versions.

#### 1. ACP modules

Starting with the Spryker product release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html), the ACP catalog is included by default in the Spryker Cloud product. However, you should still make sure that your Spryker project uses the latest versions of the following modules:

* `spryker/app-catalog-gui: ^1.2.0` or higher
* `spryker/message-broker:^1.4.0` or higher
* `spryker/message-broker-aws:^1.3.2` or higher
* `spryker/session:^4.15.1` or higher

#### 2. App modules

{% info_block warningBox "Apps- and PBC-specific modules" %}

Depending on the specific ACP apps or [PBCs](/docs/pbc/all/pbc.html) you intend to use via ACP, you will need to add or update the modules for each respective app or PBC as explained in the corresponding app guide.

{% endinfo_block %}

The Spryker ACP Apps are continuously enhanced and improved with new versions. Though you don't have to update the apps themselves, it might be at times necessary to perform minor updates of the app-related SCCOS modules to take full advantage of the latest app feature updates.

For [each app](https://docs.spryker.com/docs/acp/user/intro-to-acp/acp-overview.html#supported-apps) you wish to use, ensure that you have the latest app-related SCCOS modules installed.

### 2. Configure SCCOS

{% info_block infoBox "This step can be omitted for Product version later than 202211.0" %}

If your version is based on product release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html) or newer, you can skip this section! 

{% endinfo_block %}

Once you have ensured that your project modules are up-to-date, proceed to configure your SCCOS project to activate the ACP catalog in the Back Office using the following steps:

1. Define the configuration and add plugins to the following files:

<details open>
<summary>config/Shared/config_default.php</summary>

```php
use Spryker\Shared\AppCatalogGui\AppCatalogGuiConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\MessageBrokerAws\MessageBrokerAwsConstants;
use Spryker\Shared\OauthAuth0\OauthAuth0Constants;
use Spryker\Shared\OauthClient\OauthClientConstants;
use Spryker\Shared\Store\StoreConstants;
use Spryker\Zed\OauthAuth0\OauthAuth0Config;

...

// ----------------------------------------------------------------------------
// ------------------------------ ACP -----------------------------------------
// ----------------------------------------------------------------------------
$aopApplicationConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_APPLICATION')), true);
$config[KernelConstants::DOMAIN_WHITELIST] = array_merge(
    $config[KernelConstants::DOMAIN_WHITELIST],
    $aopApplicationConfiguration['APP_DOMAINS'] ?? [],
);
$config[StoreConstants::STORE_NAME_REFERENCE_MAP] = $aopApplicationConfiguration['STORE_NAME_REFERENCE_MAP'] ?? [];
$config[AppCatalogGuiConstants::APP_CATALOG_SCRIPT_URL] = $aopApplicationConfiguration['APP_CATALOG_SCRIPT_URL'] ?? '';

$aopAuthenticationConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_AUTHENTICATION')), true);
$config[OauthAuth0Constants::AUTH0_CUSTOM_DOMAIN] = $aopAuthenticationConfiguration['AUTH0_CUSTOM_DOMAIN'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_ID] = $aopAuthenticationConfiguration['AUTH0_CLIENT_ID'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_SECRET] = $aopAuthenticationConfiguration['AUTH0_CLIENT_SECRET'] ?? '';

$config[MessageBrokerConstants::CHANNEL_TO_TRANSPORT_MAP] =
$config[MessageBrokerAwsConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    // Here we will define the receiver transport map accordinally to APP (PBC)
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    // Here we will define the sender transport map accordinally to APP (PBC)
];

$aopInfrastructureConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_INFRASTRUCTURE')), true);

$config[MessageBrokerAwsConstants::SQS_RECEIVER_CONFIG] = json_encode($aopInfrastructureConfiguration['SPRYKER_MESSAGE_BROKER_SQS_RECEIVER_CONFIG'] ?? []);
$config[MessageBrokerAwsConstants::HTTP_SENDER_CONFIG] = $aopInfrastructureConfiguration['SPRYKER_MESSAGE_BROKER_HTTP_SENDER_CONFIG'] ?? [];

// ----------------------------------------------------------------------------
// ------------------------------ OAUTH ---------------------------------------
// ----------------------------------------------------------------------------
$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_MESSAGE_BROKER] = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_MESSAGE_BROKER] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_MESSAGE_BROKER] = 'aop-event-platform';

$config[AppCatalogGuiConstants::OAUTH_PROVIDER_NAME] = OauthAuth0Config::PROVIDER_NAME;
$config[AppCatalogGuiConstants::OAUTH_GRANT_TYPE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[AppCatalogGuiConstants::OAUTH_OPTION_AUDIENCE] = 'aop-atrs';

$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_PAYMENT_AUTHORIZE] = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_PAYMENT_AUTHORIZE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_PAYMENT_AUTHORIZE] = 'aop-app';
```
</details>

2. In the `navigation.xml` file, add one more navigation item:

<details open>
<summary>config/Zed/navigation.xml</summary>

```xml
...
  <app-catalog-gui>
      <label>Apps</label>
      <title>Apps</title>
      <icon>fa-cubes</icon>
      <bundle>app-catalog-gui</bundle>
      <controller>index</controller>
      <action>index</action>
  </app-catalog-gui>
...    
```
</details>

3. In the `MessageBrokerDependencyProvider.php` file, enable the following module plugins:

<details open>
<summary>src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\CorrelationIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TimestampMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TransactionIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\ValidationMiddlewarePlugin;
use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\MessageBrokerAws\Communication\Plugin\MessageBroker\Receiver\AwsSqsMessageReceiverPlugin;
use Spryker\Zed\MessageBrokerAws\Communication\Plugin\MessageBroker\Sender\HttpMessageSenderPlugin;
use Spryker\Zed\OauthClient\Communication\Plugin\MessageBroker\AccessTokenMessageAttributeProviderPlugin;
use Spryker\Zed\Session\Communication\Plugin\MessageBroker\SessionTrackingIdMessageAttributeProviderPlugin;
use Spryker\Zed\Store\Communication\Plugin\MessageBroker\CurrentStoreReferenceMessageAttributeProviderPlugin;
use Spryker\Zed\Store\Communication\Plugin\MessageBroker\StoreReferenceMessageValidatorPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageSenderPluginInterface>
     */
    public function getMessageSenderPlugins(): array
    {
        return [
            new HttpMessageSenderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageReceiverPluginInterface>
     */
    public function getMessageReceiverPlugins(): array
    {
        return [
            new AwsSqsMessageReceiverPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageAttributeProviderPluginInterface>
     */
    public function getMessageAttributeProviderPlugins(): array
    {
        return [
            new CorrelationIdMessageAttributeProviderPlugin(),
            new TimestampMessageAttributeProviderPlugin(),
            new CurrentStoreReferenceMessageAttributeProviderPlugin(),
            new AccessTokenMessageAttributeProviderPlugin(),
            new TransactionIdMessageAttributeProviderPlugin(),
            new SessionTrackingIdMessageAttributeProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MiddlewarePluginInterface>
     */
    public function getMiddlewarePlugins(): array
    {
        return [
            new ValidationMiddlewarePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageValidatorPluginInterface>
     */
    public function getExternalValidatorPlugins(): array
    {
        return [
            new StoreReferenceMessageValidatorPlugin(),
        ];
    }
}
```
</details>

4. In the `MessageBrokerConfig.php` file, adjust the following module config:

<details open>
<summary>src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MessageBroker;

use Generated\Shared\Transfer\MessageAttributesTransfer;
use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * Defines attributes which should not be logged.
     *
     * @api
     *
     * @return array<string>
     */
    public function getProtectedMessageAttributes(): array
    {
        return [
            MessageAttributesTransfer::AUTHORIZATION,
        ];
    }
}
```
</details>

5. In the `OauthClientDependencyProvider.php` file, enable the following module plugins:

In the MessageBrokerConfig.php, adjust the following module config:
<details open>
<summary>src/Pyz/Zed/OauthClient/OauthClientDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OauthClient;

use Spryker\Zed\OauthAuth0\Communication\Plugin\OauthClient\Auth0OauthAccessTokenProviderPlugin;
use Spryker\Zed\OauthClient\OauthClientDependencyProvider as SprykerOauthClientDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\OauthClient\CurrentStoreReferenceAccessTokenRequestExpanderPlugin;

class OauthClientDependencyProvider extends SprykerOauthClientDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OauthClientExtension\Dependency\Plugin\OauthAccessTokenProviderPluginInterface>
     */
    protected function getOauthAccessTokenProviderPlugins(): array
    {
        return [
            new Auth0OauthAccessTokenProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthClientExtension\Dependency\Plugin\AccessTokenRequestExpanderPluginInterface>
     */
    protected function getAccessTokenRequestExpanderPlugins(): array
    {
        return [
            new CurrentStoreReferenceAccessTokenRequestExpanderPlugin(),
        ];
    }
}
```
</details>

### 3. Update the SCCOS deploy.yml file

This section describes the variables that you must configure for use within your SCCOS AWS environment.

You need to define the environment variables in the `deploy.yml` file of *each* SCCOS environment like testing, staging, and production. There will be multiple general environment variables that in turn will contain several configurations. 

{% info_block warningBox "Warning" %}

It is crucial to specify the keys for the environment variables. The infrastructure values, such as `SPRYKER_AOP_INFRASTRUCTURE` and `STORE_NAME_REFERENCE_MAP` are provided by Spryker OPS upon request.

{% endinfo_block %}

<details open>
<summary>General structure</summary>

```json
ENVIRONMENT_VARIABLE_NAME_A: '{
  "CONFIGURATION_KEY_A":"SOME_VALUE_A",
  "CONFIGURATION_KEY_B":"SOME_VALUE_B"
}'
```
</details>

<details open>
<summary>Data structure example for a demo environment connected to the Spryker ACP production</summary>

```json
#AOP
SPRYKER_AOP_APPLICATION: '{
  "APP_CATALOG_SCRIPT_URL": "https://app-catalog.atrs.spryker.com/loader",
  "STORE_NAME_REFERENCE_MAP": {"DE": "tenant_messages_for_store_reference_AOP_Demo_Production-DE.fifo", "AT": "tenant_messages_for_store_reference_AOP_Demo_Production-AT.fifo"},
  "APP_DOMAINS": [
      "os.apps.aop.spryker.com",
      "*.bazaarvoice.com"
  ]
}'

SPRYKER_AOP_INFRASTRUCTURE: '{
  "SPRYKER_MESSAGE_BROKER_HTTP_SENDER_CONFIG": {
        "endpoint":"https:\/\/events.atrs.spryker.com\/events\/tenant"
  },
  "SPRYKER_MESSAGE_BROKER_SQS_RECEIVER_CONFIG": {
    "default": {
        "endpoint":"https:\/\/sqs.eu-central-1.amazonaws.com",
        "region":"eu-central-1",
        "auto_setup":false,
        "buffer_size":1
    },
      "DE": {
        "queue_name":"tenant_messages_for_store_reference_AOP_Demo_Production-DE.fifo"
    },
    "AT": {
        "queue_name":"tenant_messages_for_store_reference_AOP_Demo_Production-AT.fifo"
    }
  }
}'
```
</details>

#### General configurations: SPRYKER_AOP_APPLICATION variable

The configuration key `APP_CATALOG_SCRIPT_URL`is the URL for the App-Tenant-Registry-Service (ATRS) and path to the JS script to load the ACP catalog.

Example of the production ATRS_HOST and path:

```json
https://app-catalog.atrs.spryker.com/loader
```

The configuration key: `STORE_NAME_REFERENCE_MAP` is the StoreReference mapping to the appropriate Spryker store.

{% info_block infoBox "Spryker OPS" %}

The StoreReference mapping is created by Spryker OPS, and they provide you with the corresponding values to be added to your deploy.yml file.

{% endinfo_block %}


Example of demo stores for DE and AT:

```json
{"DE": "tenant_messages_for_store_reference_AOP_Demo_Production-DE", "AT": "tenant_messages_for_store_reference_AOP_Demo_Production-AT"}
```

The configuration key `APP_DOMAINS` designates the app domains used in redirects.

{% info_block infoBox "Spryker OPS" %}

The app domains are provided by Spryker OPS.

{% endinfo_block %}


Example of the app domain values:

```json
[
  "os.apps.aop.spryker.com",
  "*.bazaarvoice.com"
]
```
#### Message Broker configuration: SPRYKER_AOP_INFRASTRUCTURE variable

The configuration key `SPRYKER_MESSAGE_BROKER_SQS_RECEIVER_CONFIG` is for the receiver configuration. The queues must be defined for each store, or a default queue for all stores is to be defined.

{% info_block infoBox "Spryker OPS" %}

The queues are created by Spryker OPS, and they provide you with the corresponding values to be added to your deploy.yml file.

{% endinfo_block %}

Example of the receiver configuration for the Spryker production environment:

```json
{
  "default": {
    "endpoint":"https://sqs.eu-central-1.amazonaws.com",
    "auto_setup":false, "buffer_size":1
  },
  "DE": {
    "queue_name":"tenant_messages_for_store_reference_AOP_Demo_Production-DE.fifo"
  },
  "<Store Reference>": {
    "queue_name":"queue_name_for_store_reference_<Store>"
  }
}
```

Example of the `SPRYKER_MESSAGE_BROKER_HTTP_SENDER_CONFIG` configuration key value:

```json
{
    "endpoint":"https://events.atrs.spryker.com/events/tenant"
}
```

## Next steps after the ACP-readiness

After configuring the files, updating all modules, and adding the requested keys with their corresponding values provided by Spryker OPS to the `deploy.yml` file, the SCCOS codebase is now up-to-date. Once redeployed, your environment is ACP-ready.

The next step is to get your newly updated and deployed ACP-ready SCCOS environment ACP-enabled. The ACP enablement step is fully handled by Spryker and implies registration of your ACP-ready SCCOS environment with ACP by connecting it with the ACP App-Tenant-Registry-Service (ATRS) as well as the Event Platform (EP), so that the ACP catalog is able to work with SCCOS.

To get your project ACP-enabled, contact the [Spryker support](https://spryker.com/support/).

Once all the steps of the ACP-enablement process are completed, the ACP catalog appears in the Back Office:

![acp-catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop-catalog.png)

Once your projecrt is ACP-enabled, you can start integrating the apps:

- [Integrate Algolia](/docs/pbc/all/search/{{site.version}}/base-shop/third-party-integrations/integrate-algolia.html)
- [Integrate Payone](/docs/pbc/all/payment-service-provider/{{site.version}}/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html)
- [Integrate Usercentrics](/docs/pbc/all/usercentrics/integrate-usercentrics.html)
- [Integrate Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/integrate-bazaarvoice.html)
