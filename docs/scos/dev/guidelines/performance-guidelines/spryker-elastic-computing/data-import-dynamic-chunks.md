---
title: Data import dynamic chunks
description: Data import dynamic chunks
last_updated: May 16, 2022
template: concept-topic-template
---

Long-running PHP operations like data import may consume a considerable amount of memory during execution. However, in some cases, a significant amount of available memory is not used.

The following chart represents a memory consumption profile for a long-lasting PHP operation.

Legend:

* Blue: memory consumption of pure data read from source.

* Red: memory consumption peak produced by the data already processed before insertion.

* Steps in red: memory leak.



For bulk data imports we used to define batch size, like 2000 or 5000 items. On the prior image, memory consumption reaches the level that corresponds to the batch size, which leaves a lot of  unused memory.

Using less memory generates more I/O operations, which subsequently increases the operation's processing time. Having more data in memory for processing decreased number of I/O and the processing time.

## Dynamic memory allocation

To use the memory more efficiently the batch size is now calculated based on the amount of memory available for current thread. When memory is full by some threshold value processing of the current batch is performed.

The algorithm uses the following variables:
- Allowed total memory for PHP thread
- Currently used memory
- Maximum used memory during the execution of current thread
- Graduality factor
- Memory threshold percent

Implementation is based on a gradual principle for the calculation a memory threshold usage step-by-step.

## Graduality factor

Graduality factor is a number that defines how many steps a program needs to take before a maximum allowed memory usage is reached.

The larger the graduality factor is, the more approximation steps the program takes, and the higher the accuracy is. A smaller gradually factor allows to calculate the memory limit  faster but rougher.

## Memory threshold percent
Memory threshold percent is an integer that defines the percentage of available system memory that can be used for data import.

This is a protection from reaching out of all memory and crushing the program.

# Project enablement

For enabling data import dynamic chunks, see “Spryker elastic computing”.

# Implementation details
Class diagram
