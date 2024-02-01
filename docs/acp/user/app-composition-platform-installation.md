---
title: App Composition Platform installation
description: Learn how to install the App Orchestration Platform.
template: concept-topic-template
last_updated: Jan 09, 2024
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

- SCCOS product release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html) includes a basic ACP setup. All ACP modules (apps and platform) requiere updates.

- SCCOS product release [202311.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/release-notes-202311.0.html) or later: you can skip the configuration step described in this document.

{% info_block infoBox "Product version earlier than 202311.0" %}

If you were onboarded with a version older than product release [202211.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202211.0/release-notes-202211.0.html), [contact us](https://support.spryker.com/). 

{% endinfo_block %}

### Module updates for ACP

To get your project ACP-ready, it is important to make sure that your project modules are updated to the necessary versions.

#### ACP modules

Starting with the Spryker product release [202311.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/release-notes-202311.0.html), the ACP catalog is included by default in the Spryker Cloud Commerc OS product. However, you should still make sure that your Spryker project uses the latest versions of the following modules:

* `spryker/app-catalog-gui: ^1.4.1` or later
* `spryker/message-broker: ^1.10.0` or later
* `spryker/message-broker-aws: ^1.6.0` or later
* `spryker/session: ^4.15.1` or later
* `spryker/oauth-client: ^1.4.0` or later

#### App modules

{% info_block warningBox "Apps- and PBC-specific modules" %}

Depending on the specific ACP apps or [PBCs](/docs/pbc/all/pbc.html#acp-app-composition-platform-apps) you intend to use through ACP, you need to add or update the modules for each respective app or PBC as explained in the corresponding app guide.

{% endinfo_block %}

The Spryker ACP Apps are continuously enhanced and improved with new versions. Though you don't have to update the apps themselves, it might be at times necessary to perform minor updates of the app-related SCCOS modules to take full advantage of the latest app feature updates.

For each app you wish to use, ensure that you have the latest app-related SCOS modules installed. You can find this information in each app integration guide.

### Configure SCCOS

{% info_block infoBox "This step can be omitted for Product version later than 202311.0" %}

If your version is based on product release [202311.0](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/release-notes-202311.0.html) or later, you can skip this section. 

{% endinfo_block %}

Once you have made sure that your project modules are up-to-date, configure your SCCOS project to activate the ACP catalog in the Back Office. Do the following:

1. Define the configuration and add plugins to the following files:

<details>
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
$config[AppCatalogGuiConstants::APP_CATALOG_SCRIPT_URL] = $aopApplicationConfiguration['APP_CATALOG_SCRIPT_URL'] ?? '';

$aopAuthenticationConfiguration = json_decode(html_entity_decode((string)getenv('SPRYKER_AOP_AUTHENTICATION')), true);
$config[OauthAuth0Constants::AUTH0_CUSTOM_DOMAIN] = $aopAuthenticationConfiguration['AUTH0_CUSTOM_DOMAIN'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_ID] = $aopAuthenticationConfiguration['AUTH0_CLIENT_ID'] ?? '';
$config[OauthAuth0Constants::AUTH0_CLIENT_SECRET] = $aopAuthenticationConfiguration['AUTH0_CLIENT_SECRET'] ?? '';

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    // Here we will define the transport map accordingly to APP (PBC)
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    // Here we will define the receiver transport map accordingly to APP (PBC)
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    // Here we will define the sender transport map accordingly to APP (PBC)
];

// -------------------------------- ACP AWS --------------------------------------
$config[MessageBrokerAwsConstants::HTTP_CHANNEL_SENDER_BASE_URL] = getenv('SPRYKER_MESSAGE_BROKER_HTTP_CHANNEL_SENDER_BASE_URL') ?: '';
$config[MessageBrokerAwsConstants::HTTP_CHANNEL_RECEIVER_BASE_URL] = getenv('SPRYKER_MESSAGE_BROKER_HTTP_CHANNEL_RECEIVER_BASE_URL') ?: '';

$config[MessageBrokerConstants::IS_ENABLED] = (
    $config[MessageBrokerAwsConstants::HTTP_CHANNEL_SENDER_BASE_URL]
    && $config[MessageBrokerAwsConstants::HTTP_CHANNEL_RECEIVER_BASE_URL]
);

$config[OauthClientConstants::TENANT_IDENTIFIER]
    = $config[MessageBrokerConstants::TENANT_IDENTIFIER]
    = $config[MessageBrokerAwsConstants::CONSUMER_ID]
    = $config[AppCatalogGuiConstants::TENANT_IDENTIFIER]
    = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';
    
// ----------------------------------------------------------------------------
// ------------------------------ OAUTH ---------------------------------------
// ----------------------------------------------------------------------------
$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_MESSAGE_BROKER] = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_MESSAGE_BROKER] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_MESSAGE_BROKER] = 'aop-event-platform';

$config[AppCatalogGuiConstants::OAUTH_PROVIDER_NAME] = OauthAuth0Config::PROVIDER_NAME;
$config[AppCatalogGuiConstants::OAUTH_GRANT_TYPE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[AppCatalogGuiConstants::OAUTH_OPTION_AUDIENCE] = 'aop-atrs';
```
</details>

2. In the `navigation.xml` file, add one more navigation item:

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

3. In the `MessageBrokerDependencyProvider.php` file, enable the following module plugins:

{% info_block infoBox "Deprecated plugins" %}

Make sure that you have no deprecated plugins enabled. Ideally, the content of each of the methods listed below should exactly match the provided example.

{% endinfo_block %}

<details>
<summary>src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\CorrelationIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TenantActorMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TimestampMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\TransactionIdMessageAttributeProviderPlugin;
use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBroker\ValidationMiddlewarePlugin;
use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\MessageBrokerAws\Communication\Plugin\MessageBroker\Sender\HttpChannelMessageSenderPlugin;
use Spryker\Zed\OauthClient\Communication\Plugin\MessageBroker\AccessTokenMessageAttributeProviderPlugin;
use Spryker\Zed\Session\Communication\Plugin\MessageBroker\SessionTrackingIdMessageAttributeProviderPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageSenderPluginInterface>
     */
    public function getMessageSenderPlugins(): array
    {
        return [
            new HttpChannelMessageSenderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageReceiverPluginInterface>
     */
    public function getMessageReceiverPlugins(): array
    {
        return [
            new HttpChannelMessageReceiverPlugin(),
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
            new AccessTokenMessageAttributeProviderPlugin(),
            new TransactionIdMessageAttributeProviderPlugin(),
            new SessionTrackingIdMessageAttributeProviderPlugin(),
            new TenantActorMessageAttributeProviderPlugin(),
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
}
```
</details>

4. In the `MessageBrokerAwsDependencyProvider.php` file, enable the following module plugins:

<details>
<summary>src/Pyz/Zed/MessageBrokerAws/MessageBrokerAwsDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MessageBrokerAws;

use Spryker\Zed\MessageBroker\Communication\Plugin\MessageBrokerAws\Expander\ConsumerIdHttpChannelMessageConsumerRequestExpanderPlugin;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsDependencyProvider as SprykerMessageBrokerAwsDependencyProvider;
use Spryker\Zed\OauthClient\Communication\Plugin\MessageBrokerAws\HttpChannelRequestExpanderPlugin;

class MessageBrokerAwsDependencyProvider extends SprykerMessageBrokerAwsDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MessageBrokerAwsExtension\Dependency\Plugin\HttpChannelMessageReceiverRequestExpanderPluginInterface>
     */
    protected function getHttpChannelMessageReceiverRequestExpanderPlugins(): array
    {
        return [
            new ConsumerIdHttpChannelMessageReceiverRequestExpanderPlugin(),
            new AccessTokenHttpChannelMessageReceiverRequestExpanderPlugin(),
        ];
    }
}
```
</details>

5. In the `OauthClientDependencyProvider.php` file, enable the following module plugins:

{% info_block infoBox "Deprecated plugins" %}

Make sure that you have no deprecated plugins enabled. Ideally, the content of each of the methods listed below should exactly match the provided example.

{% endinfo_block %}

<details>
<summary>src/Pyz/Zed/OauthClient/OauthClientDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\OauthClient;

use Spryker\Zed\MessageBroker\Communication\Plugin\OauthClient\TenantIdentifierAccessTokenRequestExpanderPlugin;
use Spryker\Zed\OauthAuth0\Communication\Plugin\OauthClient\Auth0OauthAccessTokenProviderPlugin;
use Spryker\Zed\OauthAuth0\Communication\Plugin\OauthClient\CacheKeySeedAccessTokenRequestExpanderPlugin;
use Spryker\Zed\OauthClient\OauthClientDependencyProvider as SprykerOauthClientDependencyProvider;

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
            new CacheKeySeedAccessTokenRequestExpanderPlugin(),
            new TenantIdentifierAccessTokenRequestExpanderPlugin(),
        ];
    }
}
```
</details>

## Next steps after the ACP-readiness

After configuring the files and updating all modules, the SCCOS codebase is now up-to-date. Once redeployed, your environment will be ACP-ready.

The next step is to get your newly updated and deployed ACP-ready SCCOS environment ACP-enabled. The ACP enablement step is fully handled by Spryker and implies the registration of your ACP-ready SCCOS environment with ACP by connecting it with the ACP App-Tenant-Registry-Service (ATRS) as well as the Event Platform (EP) so that the ACP catalog is able to work with SCCOS.

To get your project ACP-enabled, contact the [Spryker support](https://spryker.com/support/).

Once all the steps of the ACP-enablement process are completed, the ACP catalog appears in the Back Office:

![acp-catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop-catalog.png)
