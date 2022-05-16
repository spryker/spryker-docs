---
title: Data Import dynamic chunks
description: This guideline explains how to Data Import dynamic chunks feature is implemented.
last_updated: May 16, 2022
template: concept-topic-template
---

# Status quo
Some PHP-performed long lasting operation (such as data import) may consume considerable amount memory during script execution. In best case scenario, the memory usage keeps a steady level until the end of the execution. In some cases, a significant amount of available memory is not used.

The following chart represents a memory consumption profile for a long lasting PHP operation.

**Legend**
**blue** - memory consumption of pure data read from source.

**red** - memory consumption peak produced by the data already processed before insertion.

**steps on red** - memory leak.

# Problem statement

During data import in bulk mode we always have defined batch size (2000, 5000 items etc). As we can see from the image above, memory consumption will only reach the level corresponding to the batch size. And this way we still have a lot of unused memory.

Using less memory creates the main issue here: operation wall time is increased due to the number of I/O operations. Having more data in memory for processing leads to decreased number of I/O thus to decreased wall time of the operation as well.

# Goal

The goal is to increase a memory consumption and this way to decrease the number of I/O operations and decrease wall time of the operation.

# Solution

In order to use the memory more efficiently new approach was introduced. The batch size now is calculated based on the amount of memory, available from the system which is left for current thread. And only when memory is full by some threshold value database insert is performed.

Algorithm operates over several variables
- Allowed total memory for PHP thread
- Currently used memory (at the moment)
- Used memory peak during execution of this thread

Implementation is based on a gradual principle when we reach a memory threshold usage step-by-step.

Two variables are also important here:
- Graduality factor
- Memory threshold percent

### Graduality factor
Gradually factor is a number representing how many steps we need to approach maximum allowed memory usage for our program.

The larger a gradually factor is, the more approximation steps will be taken, but the accuracy is higher. A smaller gradually factor makes application work faster but rougher.

### Memory threshold percent
This is an integer value which means how many percents of available from the system memory we can use for data import purposes.

This is a protection from reaching out of all memory and crushing the program.

# Project enablement

For enabling data import dynamic chunks, please see “Spryker elastic computing” document.

# Implementation details
Class diagram