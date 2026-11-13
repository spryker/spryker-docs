---
title: Extend AI Commerce agents with custom toolsets
description: Learn how to add project-level tools and toolsets that let AI Commerce agents read and change your own data, and how to do it safely.
last_updated: Aug 13, 2026
template: howto-guide-template
---

AI Commerce agents can only act on data that a *tool* exposes to them. A tool is a PHP class the AI model calls with arguments and gets a result back. Tools are grouped into named *toolsets*, and each agent or feature declares which toolsets it uses.

To let an agent work with data that no built-in tool covers — for example, your own entity — implement a tool, group it in a toolset, register the toolset, and add the toolset name to the feature that must use it.

This document describes how to extend an existing agent or feature. To add a completely new agent, see [Add a custom Back Office Assistant agent](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/add-custom-backoffice-assistant-agent.html).

## How toolsets are resolved

Every prompt request carries a list of toolset names. At runtime, AiFoundation matches those names against the toolset plugins registered in `AiFoundationDependencyProvider::getAiToolSetPlugins()` and passes the merged tools of all matching toolsets to the AI provider.

Two things follow from this:

- A toolset is only available to a feature if the feature's toolset name list contains its name. Registering the plugin alone does nothing.
- A toolset name that does not match a registered plugin is ignored without an error. If your tool is never called, first check that the name in the configuration matches `getName()` exactly.

Features expose their toolset names differently:

| FEATURE | WHERE TOOLSET NAMES COME FROM |
|---------|-------------------------------|
| Smart CMS Content Assistant | `AiCommerceConfig::getSmartCmsToolSetNames()`. Override it in `Pyz` to add names. |
| Back Office Assistant agents | Each agent plugin calls `PromptRequestTransfer::addToolSetName()` in `executeAgent()`. To change the list of an existing agent, override that agent plugin in `Pyz`. |

{% info_block warningBox "Security" %}

A tool is executable code that the AI model decides when to call, based on a model-generated argument list. Treat every tool as an untrusted, publicly reachable entry point:

- **Prefer read-only tools.** Only expose write, update, or delete operations when the use case genuinely requires them. A prompt injected through user-generated content — a product description, a customer note, an uploaded file — can make the model call any tool that is available to it.
- **Validate and constrain every argument.** The model can pass any value that fits the declared type. Validate arguments in `execute()` exactly as you would validate a request from the internet.
- **Enforce permissions inside the tool.** Tool execution does not inherit the Back Office user's ACL rules. Check permissions explicitly in `execute()` for anything sensitive.
- **Never return personal or secret data.** Everything a tool returns is sent to the AI provider and stored in the conversation history. Return only the fields the agent needs, and exclude credentials, tokens, and personal data.
- **Limit result size.** Apply a pagination limit, as `getSmartCmsContentItemLookupLimit()` does for Smart CMS, so a single call cannot send your entire catalog to the provider.
- **Catch exceptions.** Return a neutral error string instead of letting an exception surface, so internal details such as stack traces or table names are not exposed to the model.

{% endinfo_block %}

## 1) Implement the tool plugin

Create a plugin that implements `ToolPluginInterface` from `Spryker\Zed\AiFoundation\Dependency\Tools`:

| METHOD | PURPOSE |
|--------|---------|
| `getName()` | Returns the unique tool name the model uses to call the tool. |
| `getDescription()` | Describes what the tool does and when to use it. The model relies on this text to decide whether to call the tool, so be specific. |
| `getParameters()` | Returns the accepted parameters as `ToolParameter` objects, each with a name, a type (`string`, `integer`, `number`, `boolean`, `array`, or `object`), a description, and a required flag. |
| `execute()` | Runs the tool and returns the result. Return a JSON-encoded string so the model can parse the result reliably. |

The following read-only tool returns a single product by SKU:

**src/Pyz/Zed/AiCommerce/Communication/Plugin/AiFoundation/Tool/GetProductToolPlugin.php**

```php
<?php

namespace Pyz\Zed\AiCommerce\Communication\Plugin\AiFoundation\Tool;

use Spryker\Shared\Log\LoggerTrait;
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolParameter;
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Throwable;

/**
 * @method \Pyz\Zed\AiCommerce\Business\AiCommerceFacadeInterface getFacade()
 */
class GetProductToolPlugin extends AbstractPlugin implements ToolPluginInterface
{
    use LoggerTrait;

    protected const string TOOL_NAME = 'get_product';

    protected const string PARAMETER_SKU = 'sku';

    public function getName(): string
    {
        return static::TOOL_NAME;
    }

    public function getDescription(): string
    {
        return 'Returns the name, status, and price of a single product identified by its SKU. Use when the user asks about a specific product.';
    }

    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Tools\ToolParameterInterface>
     */
    public function getParameters(): array
    {
        return [
            new ToolParameter(static::PARAMETER_SKU, 'string', 'The SKU of the product to look up, for example "001_25904006".', true),
        ];
    }

    public function execute(...$arguments): mixed
    {
        $sku = $arguments[static::PARAMETER_SKU] ?? null;

        if (!is_string($sku) || $sku === '') {
            return (string)json_encode(['error' => 'A non-empty sku is required.']);
        }

        try {
            $productConcreteTransfer = $this->getFacade()->findProductBySku($sku);

            if ($productConcreteTransfer === null) {
                return (string)json_encode(['error' => 'Product not found.']);
            }

            return (string)json_encode([
                'sku' => $productConcreteTransfer->getSku(),
                'name' => $productConcreteTransfer->getName(),
                'isActive' => $productConcreteTransfer->getIsActive(),
            ]);
        } catch (Throwable $throwable) {
            $this->getLogger()->error('GetProductToolPlugin::execute() failed.', ['exception' => $throwable]);

            return (string)json_encode(['error' => 'An error occurred while retrieving the product.']);
        }
    }
}
```

The tool validates the SKU before use, returns only three fields, and converts any exception into a neutral message. Apply the same three rules to every tool you add.

{% info_block warningBox "Warning" %}

If you expose write operations — creating, updating, or deleting data — the model can trigger them without a human confirming the action. Restrict such tools to non-critical entities, validate every argument against an allowlist of permitted values, and check the acting user's permissions inside `execute()`.

{% endinfo_block %}

## 2) Implement the toolset plugin

Group the tools in a toolset by implementing `ToolSetPluginInterface` from `Spryker\Zed\AiFoundation\Dependency\Tools`. Group tools that belong to the same domain, so an agent can enable them together:

**src/Pyz/Zed/AiCommerce/Communication/Plugin/AiFoundation/ProductInfoToolSetPlugin.php**

```php
<?php

namespace Pyz\Zed\AiCommerce\Communication\Plugin\AiFoundation;

use Pyz\Zed\AiCommerce\Communication\Plugin\AiFoundation\Tool\GetProductToolPlugin;
use Spryker\Zed\AiFoundation\Dependency\Tools\ToolSetPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class ProductInfoToolSetPlugin extends AbstractPlugin implements ToolSetPluginInterface
{
    protected const string TOOL_SET_PRODUCT_INFO = 'product_info_tools';

    public function getName(): string
    {
        return static::TOOL_SET_PRODUCT_INFO;
    }

    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Tools\ToolPluginInterface>
     */
    public function getTools(): array
    {
        return [
            new GetProductToolPlugin(),
        ];
    }
}
```

## 3) Register the toolset plugin

Add the toolset plugin to the array returned by `AiFoundationDependencyProvider::getAiToolSetPlugins()`:

**src/Pyz/Zed/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiFoundation;

use Pyz\Zed\AiCommerce\Communication\Plugin\AiFoundation\ProductInfoToolSetPlugin;
use Spryker\Zed\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Tools\ToolSetPluginInterface>
     */
    protected function getAiToolSetPlugins(): array
    {
        return [
            // ... existing toolset plugins
            new ProductInfoToolSetPlugin(),
        ];
    }
}
```

## 4) Enable the toolset for a feature

Registering the plugin makes the toolset resolvable, but a feature only receives its tools once the toolset name is in the feature's list.

### Smart CMS Content Assistant

Override `getSmartCmsToolSetNames()` in your project configuration and keep the built-in names, so the content item lookup tool stays available:

**src/Pyz/Zed/AiCommerce/AiCommerceConfig.php**

```php
<?php

namespace Pyz\Zed\AiCommerce;

use SprykerFeature\Zed\AiCommerce\AiCommerceConfig as SprykerFeatureAiCommerceConfig;

class AiCommerceConfig extends SprykerFeatureAiCommerceConfig
{
    /**
     * @uses \Pyz\Zed\AiCommerce\Communication\Plugin\AiFoundation\ProductInfoToolSetPlugin::TOOL_SET_PRODUCT_INFO
     *
     * @return array<string>
     */
    public function getSmartCmsToolSetNames(): array
    {
        return array_merge(parent::getSmartCmsToolSetNames(), [
            'product_info_tools',
        ]);
    }
}
```

### Back Office Assistant agents

Built-in agents add their toolset names in `executeAgent()`. To give an existing agent an additional toolset, extend that agent plugin in `Pyz`, add the extra name, and register your plugin instead of the built-in one in `AiCommerceDependencyProvider::getBackofficeAssistantAgentPlugins()`. For instructions on registering agent plugins, see [Add a custom Back Office Assistant agent](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/add-custom-backoffice-assistant-agent.html).

## 5) Adjust the system prompt

Tools alone do not guarantee the model uses them as intended. The system prompt sets the rules the model follows when it decides which tool to call, so review it whenever you add tools.

`AiCommerceConfig` exposes the prompt templates for the Smart PIM features — translation, category suggestion, content improvement, and image alt text — through methods such as `getContentImproverPromptTemplate()`. Each reads a Configuration Management value and falls back to the built-in template when the value is empty. Override the corresponding method or set the configuration value to state which tool to use, when to use it, and what the model must never do with the returned data.

Keep the placeholders of the original template. Removing a `%s` placeholder breaks the `sprintf()` call that builds the final prompt.

Because prompts are resolved per AI configuration, a prompt change affects every feature bound to that configuration. For how features map to configurations and providers, see [Configure multiple AI providers for AI Commerce](/docs/dg/dev/ai/ai-commerce/configure-multiple-ai-providers.html).

{% info_block warningBox "Warning" %}

A system prompt is a guideline, not a security control. The model can be steered away from prompt instructions by injected content, so never rely on the prompt alone to prevent a tool from being misused. Enforce every restriction that matters in the tool's `execute()` method.

{% endinfo_block %}

## 6) Verify the toolset

1. Trigger the feature you enabled the toolset for, with a request that requires the new tool.
2. Check the AI interaction audit log to confirm the tool was called with the expected arguments. For details, see [AI Interaction Audit Logs](/docs/dg/dev/ai/ai-foundation/ai-foundation-audit-logs.html).

If the tool is never called, verify the following:

- The toolset name in the feature configuration matches the toolset plugin's `getName()` exactly.
- The toolset plugin is registered in `AiFoundationDependencyProvider::getAiToolSetPlugins()`.
- The tool description states clearly when the tool applies. A vague description is the most common reason a model ignores a tool.
