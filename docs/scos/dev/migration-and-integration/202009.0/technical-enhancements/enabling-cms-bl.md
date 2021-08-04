---
title: Enabling CMS block widget
originalLink: https://documentation.spryker.com/v6/docs/enabling-cms-block-widget
redirect_from:
  - /v6/docs/enabling-cms-block-widget
  - /v6/docs/en/enabling-cms-block-widget
---

This document describes how to enable CMS block widget in a Spryker project. 

{% info_block infoBox %}

CMS block widgets are outdated. We recommed using [slots](https://documentation.spryker.com/docs/templates-slots-feature-overview#slot) which are part of the [CMS feature](https://documentation.spryker.com/docs/cms). For integration instructions, see [CMS feature integration](https://documentation.spryker.com/docs/cms-feature-integration-guide)

{% endinfo_block %}

## Prerequisites
Install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| CMS |master  |

### 1) Install the required modules using Composer

Install the required modules:
```bash
composer require spryker/cms-content-widget-cms-block-connector:"^1.0.0" --update-with-dependencie
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:
|Module| Expected Directory|
|---|---| 
| CmsContentWidgetCmsBlockConnector| vendor/spryker/cms-content-widget-cms-block-connector|

{% endinfo_block %}

### 2) Set up configuration

Set up the following configuration:

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

Make sure that the `cms_block` option is displayed in the Back Office:
1. Go to **Content** > **Blocks**
2. Select **Edit Placeholder** next to a block.
3. Check that, in the widget drop-down menu, the `cms_block` option is displayed.

{% endinfo_block %}

### 3) Set up widgets

Add the following plugin to your project:

|Plugin  | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `CmsBlockContentWidgetPlugin`| Creates a new widget for editing CMS Blocks. |None  | `Spryker\Yves\CmsContentWidgetCmsBlockConnector\Plugin` |

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

1. Create the CMS blocks:
    * BlockA with some text.
    * BlockB with the code: `{% raw %}{{{% endraw %} cms_block(['BlockA']) {% raw %}}}{% endraw %}`.    
2. Add BlockB to a CMS Page.
3. Make sure that the CMS block widget is rendered correctly on the Storefront.

{% endinfo_block %}
    
    
    
    
    
    
    
    
    
