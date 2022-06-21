---
title: Integrating SDK commands to PhpStorm command line tools
description: You can make the Spryker SDK available for the PhpStorm.
template: task-topic-template
---

To make all the Spryker SDK commands available to PhpStorm, do the following:

1. Within your project, run `spryker-sdk sdk:php:create-phpstorm-config`. 
   This generates the custom XML configuration file for the PhpStorm command line tools. The XML resides in `.idea/commandlinetools/Custom_Spryker_Sdk.xml`.
2. To enable the Spryker SDK integration, restart PhpStorm.

Now, all SDK commands should be available within PhpStorm from the command line tool that you can launch by pressing `Shift+Cmd+X` or double-pressing `Ctrl`.