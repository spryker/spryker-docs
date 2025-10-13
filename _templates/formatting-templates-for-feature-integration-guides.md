# Formatting templates for feature integration guides

This document describes the formatting templates for different elements of the [Feature integration guide template](feature-integration-guide-template.md).

## Code snippets

To a code snippet with up to 35 lines, apply the following formatting:

**{path/to/the/file}**
```{language}

{code}

```

To a code snippet with more than 35 lines, apply the following formatting:

<details>
  <summary>{path/to/the/file}</summary>

```{language}

{code}

```

</details>

## Inline code

Use inline code only when it appears in text. For example, compare the content of *PLUGIN** and *SPECIFICATION* columns:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|ProductConfigurationSynchronizationDataRepositoryPlugin |Allows synchronizing the content of the entire `spy_product_configuration_storage` table into the storage. | |  |Spryker\Zed\ProductConfigurationStorage\Communication\Plugin\Synchronization |
| ProductConfigurationCheckoutPreConditionPlugin | Returns `true` if all product configuration items in a quote are complete. Otherwise, returns `false`. |  | Spryker\Zed\ProductConfiguration\Communication\Plugin\Checkout |
