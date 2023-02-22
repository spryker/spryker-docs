---
title: Not optimised composer for Production env
description: Not optimised composer for Production env
template: troubleshooting-guide-template
---
Coming soon
<!---
## Problem

All pages are slow on Production.

## Cause

Possible cause is not optimised composer for Production env. 

So let's take a look at the next profile.

TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566977/Not+optimised+composer+for+Production+env


Here we see a lot of “file_exists“ checks and “findFilewithExtension“. How to optimise it?

## Solution

Optimise composer autoload, follow Spryker [General performance guidelines | Spryker Documentation](https://docs.spryker.com/docs/scos/dev/guidelines/performance-guidelines/general-performance-guidelines.html#opcache-activation)  and/or composer guidelines [Autoloader optimization - Composer](https://getcomposer.org/doc/articles/autoloader-optimization.md#optimization-level-1-class-map-generation)

f.e. "Call dump-autoload with -o / --optimize“

The resulting profile will look like this after running the command defined in the guidelines: 

TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566977/Not+optimised+composer+for+Production+env

As you see 2 most time-consuming points are gone.

The comparison view looks like this: 

TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566977/Not+optimised+composer+for+Production+env

We optimised 40% of all time on the SAME action and reduced  “file_exists“ checks and “findFilewithExtension“.

If we carefully check the official documentation we can find more possible optimizations:

f.e. “Call dump-autoload with -a / --classmap-authoritative“

This is what profiling looks like after running this command:

TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566977/Not+optimised+composer+for+Production+env

Here is not clear what exactly got updated, so let's check the comparison:

TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566977/Not+optimised+composer+for+Production+env

Way more actions got removed from the profiling result and time optimized on 87%! from the initial report.

Pretty impressive for only following the performance guidelines.



Of course, everything comes with its own price, so please check trades-offs on the official website - [Autoloader optimization - Composer](https://getcomposer.org/doc/articles/autoloader-optimization.md#optimization-level-1-class-map-generation)
--->