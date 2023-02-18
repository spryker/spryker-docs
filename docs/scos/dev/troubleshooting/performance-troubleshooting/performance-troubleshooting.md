---
title: {Performance Troubleshooting}
description: {Performance Troubleshooting}
template: howto-guide-template
---

#Performance Troubleshooting

This document describes how to start your performance optimization journey.

Performance optimization is like curing a disease. It has to start with the analysis, in our case profiling!

## Prerequisites

1. Make sure that you know and understand the problem.
   Example of not enough defined problem:
   “Web site is slow“.

Example of a well-defined problem:
“Web site is slow when I place an order with 25 products of the same SKU (SKU=001).
URL: {URL}
Credentials: {Instruction on how to get credentials}.”

If you do not have this information then request additional data from the person who reported that there is a problem.

2. Check profiling!
   You are free to choose any profiling tool you want.
   Here we will describe specific ones that we prefer.

### New Relic

1. Make sure that you have installed and enabled New Relic.
[Here](https://docs.spryker.com/docs/scos/dev/the-docker-sdk/202108.0/configuring-services.html#new-relic) you can find an instruction on how to do it.
Make sure to have an access to the New Relic.

2. Check if needed profiling exists. If no request/prepare your own one:
- Reproduce the problem on needed environment or request it to be reproduced by the customer.
  Notes:
- It takes [some time for the New Relic to show the profiling](https://docs.newrelic.com/docs/new-relic-solutions/solve-common-issues/troubleshooting/not-seeing-data/#:~:text=Solution,to%20automatically%20identify%20common%20issues.).
- If request is not meeting the criteria - it will not appear in New Relic.
- Be patient and read more on the [official web site](https://docs.newrelic.com/docs/apm/transactions/transaction-traces/troubleshooting-not-seeing-transaction-traces/).

3. Review the profiling.
Example: if the problem is with “place-order“ with 25 product items:

Check if you have profiling for needed action in New Relic.

- Go to ”Transactions“


- Select the needed time period on the top right side:


- Select the needed Transaction type (f.e. “Web“)


- Select “Sort By“ (f.e. “Most time consuming“)


- Check if you have needed action “place-order“ in the resulting list.
Click “See transaction table“ if needed




Note: If you have some problems with transaction grouping  - check this document - [New Relic transactions grouping by queue names | Spryker Documentation](https://docs.spryker.com/docs/scos/dev/guidelines/performance-guidelines/elastic-computing/new-relic-transaction-grouping-by-queue-names.html#group-transactions-by-queue-name)

Repeat for other sections, like “databases“, “external services“, etc.

Learn more on the official [New Relic website](https://newrelic.com/blog/how-to-relic/a-quick-guide-to-getting-started-with-new-relic).


TODO: add missing images from - https://spryker.atlassian.net/wiki/spaces/CORE/pages/3682566858/WIP+How+to+debug+performance+issues+or+performance+optimization+start+guide

### Blackfire

1. Check if needed profiling exists. If no request/prepare your own one:

- Make sure that you have installed and enabled Blackfire.
[Here](https://docs.spryker.com/docs/scos/dev/the-docker-sdk/202108.0/configuring-services.html#configuring-mailhog) you can find an instruction on how to do it.

- Reproduce the problem on needed environment or request it to be reproduced by the customer.

Notes:

- Be patient and read more on the [official web site](https://blackfire.io/docs/introduction).

2. Review the profiling:
- Check “Reccomendations“ section. It will show already some possible solutions.
- Check Callgraph:
  The left part will show time (excl., incl., calls).
  The right part will show the exact graph.


Note: Blackfire will group some actions, so after each round of optimization you will see more details in the report.
 3. Check other sections, like SQL, Propagation, etc. Read more on the [official documentation](https://blackfire.io/docs/php/training-resources/book/04-first-profile).

### Other

Feel free to use any other profile tooling.

## {Summary and the end result description}

<!---In a few sentences, summarize what the reader has just learned. Describe the end result they should obtain after executing the instructions of your HowTo.-->

## Next steps


1. Check that you have the latest performance releases.

2. Check that you implemented the performance recommendations:
- [General performance guidelines | Spryker Documentation](https://docs.spryker.com/docs/scos/dev/guidelines/performance-guidelines/general-performance-guidelines.html) 
- Architecture performance guidelines | Spryker Documentation 
- Frontend performance guidelines | Spryker Documentation

TODO: Add a link to a parent page and not every section separatly

3. If the problem is still not solved:

- Analise profiling:
  - Select the longest action under profiling. 
  - Optimise. 
  - Repeat.

## References (optional)

TODO: Can add parent link to performance guidelines

## Related topics

TODO: Can add parent link to performance guidelines
