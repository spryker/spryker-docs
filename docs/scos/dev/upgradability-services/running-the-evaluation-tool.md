This document describes how to check if code is compliant with Spryker’s and industry standards using the Evaluation tool.

## Prerequisites

To start working with the Evaluation tool, connect to the Docker SDK CLI container:

```bash
docker/sdk cli
```

Get general information about the tool:

```bash
1evaluator
```

## Running a full evaluation

To perform a full evaluation, run the evaluation tool without any options:

```bash
evaluator evaluate
```

## Running a particular check

To run a particular check, use the `--filter` option with one or more names of the desired check. For example, to run the PHPStan check, run the following command:

```bash
evaluator evaluate --filter=phpstan
```

{% info_block infoBox "" %}

To check the up-to-date list of checks, run the following command:

```bash
evaluator evaluate -h
```

{% endinfo_block %}


## Updating the evaluation tool

To update the evaluation tool to the latest version, run the following command:

```bash
composer update spryker-sdk/evaluator
```
