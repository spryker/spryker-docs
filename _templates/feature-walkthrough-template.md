---
title: {Meta name}
description: {Meta description}
template: feature-walkthrough-template
---

<!--- Feature summary. Short and precise explanation of what the feature brings in terms of functionality.
-->


<!--- Feel free to drop the following part if the User doc is not yet published-->
{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [enter the feature name here](enter the link to the user guide of this feature here) for business users.
{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the {Feature name} feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/1789259c-a652-4e9c-a1ad-d5f598de43f6.png?utm_medium=live&utm_source=custom)
<!--
Diagram content:
    -The module dependency graph SHOULD contain all the modules that are specified in the feature  (don't confuse with the module in the epic)
    - The module dependency graph MAY contain other module that might be useful or required to show
Diagram styles:
    - The diagram SHOULD be drown with the same style as the example in this doc
    - Use the same distance between boxes, the same colors, the same size of the boxes
Table content:
    - The table that goes after diagram SHOULD contain all the modules that are present on the diagram
    - The table should provide the role each module plays in this feature
-->
| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| {Module name} | {Module description}    |

## Domain model

The following schema illustrates the {Feature name} domain model:

<!--
- Domain model SHOULD contain all the entities that were adjusted or introduced by the feature.
- All the new connections SHOULD also be shown and highlighted properly
- Make sure to follow the same style as in the example
-->
![Domain Model](https://confluence-connect.gliffy.net/embed/image/8b8e20ec-f509-4117-827d-983dc9dc03f8.png?utm_medium=live&utm_source=custom)

## {Optional} A custom title
<!--
- Here you CAN cover the features technical topic in more details, if needed.
- A diagram SHOULD be placed to make the content easier to grasp
-->

## {Optional} Learn more
<!-- Should contain links to the nested docs, in case the feature is split into multiple subdocuments-->
- [{Name of the page}]({link to the page})


## Related Developer documents
<!-- Usually filled by a technical writer. You can omit this part -->

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [{Integration guide name}]({Integration guide link})          | [{Glue API guide name}]({Glue API guide link})          | [{Import file name}]({import file link})           | {Any doc related to this feature should be placed here}  |
