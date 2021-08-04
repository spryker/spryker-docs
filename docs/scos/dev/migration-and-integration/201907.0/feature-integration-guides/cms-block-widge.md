---
title: CMS Block Widget Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/cms-block-widget-integration
redirect_from:
  - /v3/docs/cms-block-widget-integration
  - /v3/docs/en/cms-block-widget-integration
---

## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| CMS |201903.0  |

### 1) Install the Required Modules Using Composer
#### Implementation
Run the following command(s) to install the required modules:
`composer require spryker/cms-content-widget-cms-block-connector:"^1.0.0" --update-with-dependencie`

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`CmsContentWidgetCmsBlockConnector`</td><td>`vendor/spryker/cms-content-widget-cms-block-connector`</td></tr></tbody></table>
{% endinfo_block %}


### 2) Set up Configuration
#### Implementation
Add the following configuration to your project:
<details open>
<summary>src/Pyz/Zed/CmsContentWidget/CmsContentWidgetConfig.php</summary>

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
<br>
</details>

{% info_block warningBox "Verification" %}
Verify that the new `cms_block` option is visible in the widget drop-down on the CMS Block Editor in Zed UI.
{% endinfo_block %}


### 3) Set up Widgets
#### Implementation
Add the following plugin to your project:

|Plugin  | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `CmsBlockContentWidgetPlugin`| Creates a new Widget for editing CMS Blocks. |None  | `Spryker\Yves\CmsContentWidgetCmsBlockConnector\Plugin` |

<details open>
<summary>src/Pyz/Yves/CmsContentWidget/CmsContentWidgetDependencyProvider.php</summary>

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
<br>
</details>

{% info_block warningBox "Verification" %}
1. Create two new CMS blocks:</br><ul><li>BlockA - Add some text to it.</li><li>BlockB - Add a <var>cms_block(['BlockA']
{% endinfo_block %}</var> reference to it.</li></ul></br>2. Add BlockB to a CMS Page.</br>3. Verify that the new `cms_block` option is rendered correctly in Yves when viewing the new CMS Page.)


