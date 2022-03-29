---
title: CMS Block Widget feature integration
description: The CMS Block Widget feature allows adding content snippets to a page. This guide walks you through the process of integrating the feature into your project.
last_updated: Mar 5, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/cms-block-widget-integration
originalArticleId: 4f07d658-f333-44d6-ba37-ea59798e0906
redirect_from:
  - /v4/docs/cms-block-widget-integration
  - /v4/docs/en/cms-block-widget-integration
---

## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| CMS |202001.0  |

### 1) Install the required modules using Composer

#### Implementation

Run the following command(s) to install the required modules:
`composer require spryker/cms-content-widget-cms-block-connector:"^1.0.0" --update-with-dependencie`

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

|Module|Expected Directory|
|--- |--- |
|`CmsContentWidgetCmsBlockConnector`|`vendor/spryker/cms-content-widget-cms-block-connector`|

{% endinfo_block %}


### 2) Set up Configuration

#### Implementation

Add the following configuration to your project:

**src/Pyz/Zed/CmsContentWidget/CmsContentWidgetConfig.php**

```php
<?php

namespace Pyz\Zed\CmsContentWidget;
 
use Spryker\Shared\CmsContentWidgetCmsBlockConnector\ContentWidgetConfigurationProvider\CmsContentWidgetCmsBlockConnectorConfigurationProvider;
use Spryker\Zed\CmsContentWidget\CmsContentWidgetConfig as SprykerCmsContentConfig;
 
class CmsContentWidgetConfig extends SprykerCmsContentConfig
{
	/**
	* {@inheritdoc}
	*
	* @return array|\Spryker\Shared\CmsContentWidget\Dependency\CmsContentWidgetConfigurationProviderInterface[]
	*/
	public function getCmsContentWidgetConfigurationProviders()
	{
		return [
			CmsContentWidgetCmsBlockConnectorConfigurationProvider::FUNCTION_NAME => new CmsContentWidgetCmsBlockConnectorConfigurationProvider(),
		];
}
```

{% info_block warningBox "Verification" %}

Verify that the new `cms_block` option is visible in the widget drop-down on the CMS Block Editor in Zed UI.

{% endinfo_block %}


### 3) Set up Widgets

#### Implementation

Add the following plugin to your project:

|Plugin  | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `CmsBlockContentWidgetPlugin`| Creates a new Widget for editing CMS Blocks. |None  | `Spryker\Yves\CmsContentWidgetCmsBlockConnector\Plugin` |

**src/Pyz/Yves/CmsContentWidget/CmsContentWidgetDependencyProvider.php**

```php
<?php
 
namespace Pyz\Yves\CmsContentWidget;
 
use Spryker\Shared\CmsContentWidgetCmsBlockConnector\ContentWidgetConfigurationProvider\CmsContentWidgetCmsBlockConnectorConfigurationProvider;
use Spryker\Yves\CmsContentWidget\CmsContentWidgetDependencyProvider as SprykerCmsContentWidgetDependencyProvider;
use Spryker\Yves\CmsContentWidgetCmsBlockConnector\Plugin\CmsContentWidget\CmsBlockContentWidgetPlugin;
 
class CmsContentWidgetDependencyProvider extends SprykerCmsContentWidgetDependencyProvider
{
	/**
	* {@inheritdoc}
	*
	* @return \Spryker\Yves\CmsContentWidget\Dependency\CmsContentWidgetPluginInterface[]
	*/
	public function getCmsContentWidgetPlugins()
	{
		return [
			CmsContentWidgetCmsBlockConnectorConfigurationProvider::FUNCTION_NAME => new CmsBlockContentWidgetPlugin(
				new CmsContentWidgetCmsBlockConnectorConfigurationProvider()
			),
		];
	}
}
```

{% info_block warningBox "Verification" %}

1. Create two new CMS blocks:
   - BlockA - Add some text to it.
   - BlockB - Add a `cms_block(['BlockA']` reference to it.
2. Add BlockB to a CMS Page.<br>3. Verify that the new `cms_block` option is rendered correctly in Yves when viewing the new CMS Page.

{% endinfo_block %}
